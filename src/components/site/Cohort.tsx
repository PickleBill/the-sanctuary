import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { matchPeer } from "@/server/cohort.functions";
import { COHORT_ROLES } from "@/lib/cohort/roles";

/**
 * v3.3 → v3.4 — "The Cohort"
 *
 * v3.3: Mobile-first rebuild — 40 nodes, auto-tour, denser filaments, larger taps.
 * v3.4: When a visitor has completed a Resonance reading, the constellation
 *       quietly highlights ONE node that resonates with what they wrote
 *       (matchPeer server function via Gemini Flash + tool calling).
 *
 * Pure SVG + requestAnimationFrame. No canvas, no library.
 * Reduced-motion: static graph, hover-only reveals, no drift, no auto-tour.
 */

const ROLES = COHORT_ROLES;

type Node = {
  id: number;
  role: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
};

type Filament = {
  a: number;
  b: number;
  t: number;
  duration: number;
  born: number;
};

const VIEW_W_DESKTOP = 800;
const VIEW_H_DESKTOP = 480;
const VIEW_W_MOBILE = 480;
const VIEW_H_MOBILE = 600;

function buildNodes(isMobile: boolean): Node[] {
  // Adapt grid to viewport so distribution is even on both shapes.
  const cols = isMobile ? 5 : 8;
  const rows = isMobile ? 8 : 5;
  const total = Math.min(40, ROLES.length);
  const out: Node[] = [];
  const round = (v: number) => Math.round(v * 10000) / 10000;
  for (let i = 0; i < total; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols) % rows;
    const baseX = (c + 0.5) / cols;
    const baseY = (r + 0.5) / rows;
    const jitterX = (Math.sin(i * 12.9898) * 0.5 + 0.5 - 0.5) * 0.07;
    const jitterY = (Math.cos(i * 78.233) * 0.5 + 0.5 - 0.5) * 0.07;
    const angle = (i * 137.5) % 360;
    // 30% faster drift than v3.2
    const speed = 0.0052 + ((i * 13) % 7) * 0.001;
    out.push({
      id: i,
      role: ROLES[i % ROLES.length],
      x: round(baseX + jitterX),
      y: round(baseY + jitterY),
      vx: round(Math.cos((angle * Math.PI) / 180) * speed),
      vy: round(Math.sin((angle * Math.PI) / 180) * speed),
      phase: round((i * 0.37) % (Math.PI * 2)),
    });
  }
  return out;
}

export function Cohort() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [badgePulse, setBadgePulse] = useState(0);
  const manualUntilRef = useRef<number>(0);

  // v3.4 — matched peer (server function picks one role index that resonates
  // with what the visitor wrote in the Resonance reading)
  const matchPeerFn = useServerFn(matchPeer);
  const [matchedId, setMatchedId] = useState<number | null>(null);
  const [matchRationale, setMatchRationale] = useState<string>("");
  const matchRequestedRef = useRef(false);

  // Build nodes once (regenerate if mobile/desktop changes)
  const nodesRef = useRef<Node[]>(buildNodes(false));
  const [nodesVersion, setNodesVersion] = useState(0);
  const filamentsRef = useRef<Filament[]>([]);
  const [, setTick] = useState(0);

  // Detect reduced motion
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduceMotion(!!mq?.matches);
    const handler = () => setReduceMotion(!!mq?.matches);
    mq?.addEventListener?.("change", handler);
    return () => mq?.removeEventListener?.("change", handler);
  }, []);

  // Detect viewport (mobile vs desktop) — drives viewBox + node geometry
  useEffect(() => {
    const mq = window.matchMedia?.("(max-width: 1023px)");
    const apply = () => {
      const m = !!mq?.matches;
      setIsMobile(m);
      nodesRef.current = buildNodes(m);
      setNodesVersion((v) => v + 1);
    };
    apply();
    mq?.addEventListener?.("change", apply);
    return () => mq?.removeEventListener?.("change", apply);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // v3.4 — On reveal, if the visitor has completed a Resonance reading, ask the
  // server to pick a peer role index that resonates. Lights up that node.
  useEffect(() => {
    if (!visible || matchRequestedRef.current) return;
    matchRequestedRef.current = true;
    let cancelled = false;
    try {
      const r = localStorage.getItem("ss_resonance");
      const i = localStorage.getItem("ss_intent");
      if (!r) return;
      const parsedR = JSON.parse(r) as { text?: string };
      const parsedI = i ? (JSON.parse(i) as { signal?: string }) : null;
      if (!parsedR?.text || parsedR.text.trim().length < 2) return;
      (async () => {
        try {
          const result = await matchPeerFn({
            data: {
              text: parsedR.text!.slice(0, 600),
              intentSignal: parsedI?.signal,
            },
          });
          if (cancelled) return;
          if (
            typeof result.roleIndex === "number" &&
            result.roleIndex >= 0 &&
            result.roleIndex < nodesRef.current.length
          ) {
            setMatchedId(result.roleIndex);
            setMatchRationale(result.rationale ?? "");
          }
        } catch (err) {
          // Silent — the constellation is decorative when the match fails.
          console.warn("[cohort] matchPeer failed", err);
        }
      })();
    } catch {
      /* ignore */
    }
    return () => {
      cancelled = true;
    };
  }, [visible, matchPeerFn]);

  useEffect(() => {
    if (!visible || reduceMotion) return;
    let raf = 0;
    let last = performance.now();
    let lastFilament = performance.now();

    const step = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const nodes = nodesRef.current;

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0.04 || n.x > 0.96) n.vx *= -1;
        if (n.y < 0.06 || n.y > 0.94) n.vy *= -1;
      }

      // Denser filaments: every 1.6s, max 7 concurrent
      if (now - lastFilament > 1600 && filamentsRef.current.length < 7) {
        const a = Math.floor(Math.random() * nodes.length);
        let b = Math.floor(Math.random() * nodes.length);
        if (b === a) b = (b + 1) % nodes.length;
        filamentsRef.current.push({
          a,
          b,
          t: 0,
          duration: 3000,
          born: now,
        });
        lastFilament = now;
      }

      filamentsRef.current = filamentsRef.current.filter((f) => {
        f.t = (now - f.born) / f.duration;
        return f.t < 1;
      });

      setTick((t) => (t + 1) % 1_000_000);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, reduceMotion]);

  // Auto-tour on mobile: cycle through nodes every 2.4s
  // Tap takes over for 8s, then auto resumes.
  useEffect(() => {
    if (!visible || reduceMotion || !isMobile) return;
    const tick = window.setInterval(() => {
      const now = performance.now();
      if (now < manualUntilRef.current) return;
      const nodes = nodesRef.current;
      setActiveId((id) => {
        const next = id == null ? 0 : (id + 1) % nodes.length;
        return next;
      });
      setBadgePulse((p) => p + 1);
    }, 2400);
    return () => window.clearInterval(tick);
  }, [visible, reduceMotion, isMobile]);

  // First mobile reveal: kick off immediately so users see motion on land
  useEffect(() => {
    if (!visible || !isMobile || reduceMotion) return;
    if (activeId == null) {
      setActiveId(0);
      setBadgePulse((p) => p + 1);
    }
  }, [visible, isMobile, reduceMotion, activeId]);

  // Compute neighbors for the active node
  const activeNeighbors = useMemo(() => {
    if (activeId == null) return [] as number[];
    const nodes = nodesRef.current;
    const active = nodes[activeId];
    if (!active) return [];
    return nodes
      .filter((n) => n.id !== activeId)
      .map((n) => ({
        id: n.id,
        d: Math.hypot(n.x - active.x, n.y - active.y),
      }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .map((n) => n.id);
    // nodesVersion is read indirectly via nodesRef on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, nodesVersion]);

  const onSvgKey = (e: React.KeyboardEvent<SVGSVGElement>) => {
    const nodes = nodesRef.current;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      manualUntilRef.current = performance.now() + 8000;
      setActiveId((id) => (id == null ? 0 : (id + 1) % nodes.length));
      setBadgePulse((p) => p + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      manualUntilRef.current = performance.now() + 8000;
      setActiveId((id) => (id == null ? 0 : (id - 1 + nodes.length) % nodes.length));
      setBadgePulse((p) => p + 1);
    } else if (e.key === "Escape") {
      setActiveId(null);
    }
  };

  const handleNodeActivate = (id: number) => {
    manualUntilRef.current = performance.now() + 8000;
    setActiveId(id);
    setBadgePulse((p) => p + 1);
  };

  const VIEW_W = isMobile ? VIEW_W_MOBILE : VIEW_W_DESKTOP;
  const VIEW_H = isMobile ? VIEW_H_MOBILE : VIEW_H_DESKTOP;
  const NODE_R_BASE = isMobile ? 7 : 4.5;
  const NODE_R_HOVER = isMobile ? 9 : 6;
  const NODE_R_NEIGHBOR = isMobile ? 7.5 : 5;
  const HALO_R = isMobile ? 26 : 20;

  const nodes = nodesRef.current;
  const activeNode = activeId != null ? nodes[activeId] : null;

  return (
    <section
      ref={sectionRef}
      id="cohort"
      className="relative bg-navy py-20 sm:py-28 lg:py-36 scroll-mt-24 overflow-hidden"
    >
      {/* Section-boundary filament — top */}
      <span aria-hidden className="section-filament-top" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="lg:col-span-5">
            <p className="eyebrow text-amber/90 mb-5">The Cohort</p>
            <h2
              className="font-serif text-ivory mb-7 hang-punct"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 3vw, 3.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              The room is
              <span className="block editorial-italic text-ivory/70" style={{ fontWeight: 400 }}>
                already talking.
              </span>
            </h2>
            <p
              className="text-ivory/90 leading-relaxed mb-6"
              style={{ fontSize: "var(--text-lead)", lineHeight: 1.55 }}
            >
              Anonymous, by design. Each point on this map is a recent resident — a peer who walked in carrying weight you would recognize.
            </p>
            <p className="mt-8 text-sm text-ivory/65 italic leading-relaxed max-w-sm">
              No names. No faces. We never confirm a particular guest. Some of them now refer their friends.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative w-full">
              <svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                className="w-full h-auto outline-none cohort-svg"
                role="img"
                aria-label="A constellation of anonymous peer residents. Use arrow keys to navigate."
                tabIndex={0}
                onKeyDown={onSvgKey}
                onMouseLeave={() => {
                  if (!isMobile) setActiveId(null);
                }}
              >
                <defs>
                  <radialGradient id="cohort-node-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="var(--amber)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Auto-drawn filaments (idle conversation) */}
                {!reduceMotion &&
                  filamentsRef.current.map((f, i) => {
                    const a = nodes[f.a];
                    const b = nodes[f.b];
                    if (!a || !b) return null;
                    let op = 0;
                    if (f.t < 0.4) op = f.t / 0.4;
                    else if (f.t < 0.7) op = 1;
                    else op = 1 - (f.t - 0.7) / 0.3;
                    op = Math.max(0, Math.min(1, op)) * 0.5;
                    return (
                      <line
                        key={i}
                        x1={a.x * VIEW_W}
                        y1={a.y * VIEW_H}
                        x2={b.x * VIEW_W}
                        y2={b.y * VIEW_H}
                        stroke="var(--amber)"
                        strokeWidth={0.7}
                        opacity={op}
                      />
                    );
                  })}

                {/* Active node filaments to neighbors */}
                {activeNode &&
                  activeNeighbors.map((nid) => {
                    const b = nodes[nid];
                    if (!b) return null;
                    return (
                      <line
                        key={`h-${nid}`}
                        x1={activeNode.x * VIEW_W}
                        y1={activeNode.y * VIEW_H}
                        x2={b.x * VIEW_W}
                        y2={b.y * VIEW_H}
                        stroke="var(--amber)"
                        strokeWidth={1.1}
                        opacity={0.85}
                        style={{
                          transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1)",
                        }}
                      />
                    );
                  })}

                {/* Nodes */}
                {nodes.map((n) => {
                  const isActive = activeId === n.id;
                  const isNeighbor = activeNeighbors.includes(n.id);
                  const dim = activeId != null && !isActive && !isNeighbor;
                  const cx = n.x * VIEW_W;
                  const cy = n.y * VIEW_H;
                  return (
                    <g
                      key={n.id}
                      style={{
                        cursor: "pointer",
                        transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1)",
                        opacity: dim ? 0.28 : 1,
                      }}
                      onMouseEnter={() => {
                        if (!isMobile) handleNodeActivate(n.id);
                      }}
                      onClick={() => handleNodeActivate(n.id)}
                      onFocus={() => handleNodeActivate(n.id)}
                      tabIndex={-1}
                    >
                      {isActive && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={HALO_R}
                          fill="url(#cohort-node-glow)"
                        />
                      )}
                      {/* Invisible larger hit target on mobile for tap accuracy */}
                      {isMobile && (
                        <circle cx={cx} cy={cy} r={16} fill="transparent" />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isActive ? NODE_R_HOVER : isNeighbor ? NODE_R_NEIGHBOR : NODE_R_BASE}
                        fill={isActive || isNeighbor ? "var(--amber)" : "var(--ivory)"}
                        opacity={isActive ? 1 : isNeighbor ? 0.95 : 0.85}
                        style={{
                          transition: "r 500ms cubic-bezier(0.22,1,0.36,1), fill 500ms ease",
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Reveal panel — always visible on mobile (auto-tour fills it) */}
              <div className="mt-6 min-h-[5rem] sm:min-h-[4rem]">
                <div className="flex items-baseline gap-3 mb-2">
                  <p
                    className={`small-caps text-amber text-[11px] tracking-[0.28em] transition-opacity duration-500 ${
                      activeNode ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Recent resident
                  </p>
                  {activeNode && (
                    <span
                      key={badgePulse}
                      className="cohort-badge inline-flex items-center gap-1.5 px-2 py-[3px] border border-amber/40 text-[9px] tracking-[0.22em] uppercase text-amber/90"
                    >
                      <span aria-hidden className="block w-1.5 h-1.5 rounded-full bg-amber cohort-badge-dot" />
                      In residence
                    </span>
                  )}
                </div>
                <p
                  key={`${activeId}-${badgePulse}`}
                  className={`font-serif editorial-italic text-ivory/95 cohort-role-rise ${
                    activeNode ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ fontSize: "var(--text-h4)", fontWeight: 400 }}
                >
                  {activeNode ? activeNode.role : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cohortRoleRise {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cohort-role-rise {
          animation: cohortRoleRise 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes cohortBadgePulse {
          0%   { box-shadow: 0 0 0 0 color-mix(in oklab, var(--amber) 60%, transparent); }
          70%  { box-shadow: 0 0 0 8px color-mix(in oklab, var(--amber) 0%, transparent); }
          100% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--amber) 0%, transparent); }
        }
        .cohort-badge {
          animation: cohortBadgePulse 1200ms cubic-bezier(0.22, 1, 0.36, 1) 1;
        }
        @keyframes cohortDotPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.4); }
        }
        .cohort-badge-dot { animation: cohortDotPulse 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cohort-role-rise, .cohort-badge, .cohort-badge-dot { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
