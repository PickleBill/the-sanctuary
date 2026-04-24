import { useEffect, useMemo, useRef, useState } from "react";

/**
 * v3.2 — "The Cohort"
 *
 * The peer-network made visible. Replaces the static PeerCohort word-list with
 * a living constellation: anonymous nodes drifting on a navy field, connected
 * by amber filaments that draw and fade. Hover a node to reveal the category.
 *
 * Pure SVG + requestAnimationFrame. No canvas, no library. ≤32 nodes.
 * Reduced-motion: static graph, hover-only reveals, no drift, no auto-filaments.
 */

const ROLES = [
  "Founder · raised Series C",
  "Surgeon · Mayo",
  "Federal Judge",
  "Trustee · family office",
  "Olympian · retired",
  "Operator · two exits",
  "Author · NYT bestseller",
  "Parent · principal of two",
  "Managing Partner · law",
  "Public Official",
  "Venture GP",
  "CEO · public company",
  "Chief of Staff",
  "Cardiologist",
  "Headmaster",
  "Chairman · holding co.",
  "Conductor",
  "Foundation President",
  "Architect · principal",
  "Diplomat · former",
  "Producer · feature film",
  "Fund Manager",
  "Chief Justice · state",
  "Founder · second time",
  "Editor-in-Chief",
  "Investor · early-stage",
  "Pediatric Oncologist",
  "Rector",
];

type Node = {
  id: number;
  role: string;
  // Normalized 0..1 position (we map to viewBox)
  x: number;
  y: number;
  // Drift velocity (per second, normalized units)
  vx: number;
  vy: number;
  // Phase offset for subtle pulsing
  phase: number;
};

type Filament = {
  a: number;
  b: number;
  // Lifecycle 0..1 (draws 0->0.5, fades 0.5->1)
  t: number;
  duration: number; // ms
  born: number; // ms timestamp
};

const VIEW_W = 800;
const VIEW_H = 480;

function buildNodes(): Node[] {
  // Quasi-grid jitter so nodes are well-distributed but not regular.
  const cols = 7;
  const rows = 4;
  const total = Math.min(28, ROLES.length);
  const out: Node[] = [];
  for (let i = 0; i < total; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols) % rows;
    const baseX = (c + 0.5) / cols;
    const baseY = (r + 0.5) / rows;
    const jitterX = (Math.sin(i * 12.9898) * 0.5 + 0.5 - 0.5) * 0.08;
    const jitterY = (Math.cos(i * 78.233) * 0.5 + 0.5 - 0.5) * 0.08;
    const angle = (i * 137.5) % 360;
    const speed = 0.004 + ((i * 13) % 7) * 0.0008;
    out.push({
      id: i,
      role: ROLES[i % ROLES.length],
      x: baseX + jitterX,
      y: baseY + jitterY,
      vx: Math.cos((angle * Math.PI) / 180) * speed,
      vy: Math.sin((angle * Math.PI) / 180) * speed,
      phase: (i * 0.37) % (Math.PI * 2),
    });
  }
  return out;
}

export function Cohort() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const nodesRef = useRef<Node[]>(buildNodes());
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

  // Animation loop — only when visible and motion allowed
  useEffect(() => {
    if (!visible || reduceMotion) return;
    let raf = 0;
    let last = performance.now();
    let lastFilament = performance.now();

    const step = (now: number) => {
      const dt = Math.min(64, now - last) / 1000; // seconds, capped
      last = now;
      const nodes = nodesRef.current;

      // Drift nodes, bounce softly off edges
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0.04 || n.x > 0.96) n.vx *= -1;
        if (n.y < 0.06 || n.y > 0.94) n.vy *= -1;
      }

      // Spawn a filament every ~3s
      if (now - lastFilament > 2800 && filamentsRef.current.length < 4) {
        const a = Math.floor(Math.random() * nodes.length);
        let b = Math.floor(Math.random() * nodes.length);
        if (b === a) b = (b + 1) % nodes.length;
        filamentsRef.current.push({
          a,
          b,
          t: 0,
          duration: 3200,
          born: now,
        });
        lastFilament = now;
      }

      // Advance filament lifecycles, drop expired
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

  // Compute hover-revealed adjacency
  const hoveredNeighbors = useMemo(() => {
    if (hoverId == null) return [] as number[];
    const nodes = nodesRef.current;
    const hovered = nodes[hoverId];
    if (!hovered) return [];
    const dists = nodes
      .filter((n) => n.id !== hoverId)
      .map((n) => ({
        id: n.id,
        d: Math.hypot(n.x - hovered.x, n.y - hovered.y),
      }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 4)
      .map((n) => n.id);
    return dists;
  }, [hoverId]);

  // Keyboard nav
  const onSvgKey = (e: React.KeyboardEvent<SVGSVGElement>) => {
    const nodes = nodesRef.current;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setHoverId((id) => (id == null ? 0 : (id + 1) % nodes.length));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setHoverId((id) => (id == null ? 0 : (id - 1 + nodes.length) % nodes.length));
    } else if (e.key === "Escape") {
      setHoverId(null);
    }
  };

  const nodes = nodesRef.current;
  const hoveredNode = hoverId != null ? nodes[hoverId] : null;

  return (
    <section
      ref={sectionRef}
      id="cohort"
      className="relative bg-navy py-24 sm:py-28 lg:py-36 scroll-mt-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
              className="text-ivory/80 leading-relaxed mb-6"
              style={{ fontSize: "var(--text-lead)", lineHeight: 1.55 }}
            >
              Anonymous, by design. Each point on this map is a recent resident — a peer who walked in carrying weight you would recognize.
            </p>
            <p
              className="text-ivory/60 leading-relaxed"
              style={{ fontSize: "var(--text-body)" }}
            >
              Touch a point. Let the room introduce itself.
            </p>
            <p className="mt-8 text-xs text-ivory/40 italic leading-relaxed max-w-sm">
              No names. No faces. We never confirm a particular guest. Some of them now refer their friends.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative w-full">
              <svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                className="w-full h-auto outline-none"
                role="img"
                aria-label="A constellation of anonymous peer residents. Use arrow keys to navigate."
                tabIndex={0}
                onKeyDown={onSvgKey}
                onMouseLeave={() => setHoverId(null)}
              >
                <defs>
                  <radialGradient id="cohort-node-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="var(--amber)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Auto-drawn filaments (idle conversation) */}
                {!reduceMotion &&
                  filamentsRef.current.map((f, i) => {
                    const a = nodes[f.a];
                    const b = nodes[f.b];
                    if (!a || !b) return null;
                    // Opacity envelope: fade in 0..0.4, hold 0.4..0.7, fade out 0.7..1
                    let op = 0;
                    if (f.t < 0.4) op = f.t / 0.4;
                    else if (f.t < 0.7) op = 1;
                    else op = 1 - (f.t - 0.7) / 0.3;
                    op = Math.max(0, Math.min(1, op)) * 0.45;
                    return (
                      <line
                        key={i}
                        x1={a.x * VIEW_W}
                        y1={a.y * VIEW_H}
                        x2={b.x * VIEW_W}
                        y2={b.y * VIEW_H}
                        stroke="var(--amber)"
                        strokeWidth={0.6}
                        opacity={op}
                      />
                    );
                  })}

                {/* Hover-revealed filaments */}
                {hoveredNode &&
                  hoveredNeighbors.map((nid) => {
                    const b = nodes[nid];
                    if (!b) return null;
                    return (
                      <line
                        key={`h-${nid}`}
                        x1={hoveredNode.x * VIEW_W}
                        y1={hoveredNode.y * VIEW_H}
                        x2={b.x * VIEW_W}
                        y2={b.y * VIEW_H}
                        stroke="var(--amber)"
                        strokeWidth={0.9}
                        opacity={0.75}
                        style={{
                          transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1)",
                        }}
                      />
                    );
                  })}

                {/* Nodes */}
                {nodes.map((n) => {
                  const isHover = hoverId === n.id;
                  const isNeighbor = hoveredNeighbors.includes(n.id);
                  const dim = hoverId != null && !isHover && !isNeighbor;
                  const cx = n.x * VIEW_W;
                  const cy = n.y * VIEW_H;
                  return (
                    <g
                      key={n.id}
                      style={{
                        cursor: "pointer",
                        transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1)",
                        opacity: dim ? 0.3 : 1,
                      }}
                      onMouseEnter={() => setHoverId(n.id)}
                      onFocus={() => setHoverId(n.id)}
                      tabIndex={-1}
                    >
                      {/* Glow halo on hover */}
                      {isHover && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={18}
                          fill="url(#cohort-node-glow)"
                        />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHover ? 4.5 : isNeighbor ? 3.6 : 3}
                        fill={isHover || isNeighbor ? "var(--amber)" : "var(--ivory)"}
                        opacity={isHover ? 1 : isNeighbor ? 0.95 : 0.85}
                        style={{
                          transition: "r 500ms cubic-bezier(0.22,1,0.36,1), fill 500ms ease",
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Category label — fades in beneath the constellation */}
              <div className="mt-6 min-h-[3.5rem] sm:min-h-[3rem]">
                <p
                  className={`small-caps text-amber text-[11px] tracking-[0.28em] mb-2 transition-opacity duration-500 ${
                    hoveredNode ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Recent resident
                </p>
                <p
                  className={`font-serif editorial-italic text-ivory/90 transition-opacity duration-500 ${
                    hoveredNode ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ fontSize: "var(--text-h4)", fontWeight: 400 }}
                >
                  {hoveredNode ? hoveredNode.role : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
