import { useEffect, useRef, useState } from "react";
import frame1 from "@/assets/hero-frame-1-meditation.jpg";
import frame2 from "@/assets/hero-frame-2-golf.jpg";
import frame3 from "@/assets/hero-frame-3-sauna.jpg";

/**
 * v3.3 — Cinemagraph Hero
 *
 * 3 generated still frames cross-fading on a 14s cycle, each panning slowly
 * (Ken Burns). Looks like a video, ships like 3 JPEGs. Reduced-motion holds
 * on frame 1.
 *
 * Headline locked: "The room is the medicine. / Care, in the company of peers."
 * Mini-network whisper preserved at bottom-left.
 */

const FRAMES = [
  { src: frame1, alt: "A figure meditating on a stone platform overlooking a misty Blue Ridge dawn" },
  { src: frame2, alt: "Two anonymous figures walking a sun-drenched mountain golf fairway at sunrise" },
  { src: frame3, alt: "Cedar sauna interior with steam pouring through a half-open glass door" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function Hero() {
  const [revealed, setRevealed] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduce(!!mq?.matches);
  }, []);

  // Cycle frames every ~5s (14s for full 3-frame round)
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => {
      setActiveFrame((i) => (i + 1) % FRAMES.length);
    }, 5000);
    return () => window.clearInterval(t);
  }, [reduce]);

  return (
    <section
      className="relative flex items-center overflow-hidden bg-navy"
      style={{ minHeight: "100svh" }}
    >
      {/* Cinemagraph stack — three frames cross-fade with Ken Burns */}
      <div className="absolute inset-0">
        {FRAMES.map((f, i) => (
          <img
            key={i}
            src={f.src}
            alt={i === 0 ? f.alt : ""}
            aria-hidden={i !== 0}
            width={1920}
            height={1280}
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            className={`hero-frame absolute inset-0 w-full h-full object-cover ${
              i === activeFrame ? "hero-frame-active" : ""
            }`}
            style={{
              opacity: i === activeFrame ? 1 : 0,
              transition: "opacity 1800ms cubic-bezier(0.22, 1, 0.36, 1)",
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette stack — heavier left wash for headline contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--navy) 72%, transparent) 0%, color-mix(in oklab, var(--navy) 38%, transparent) 42%, color-mix(in oklab, var(--navy) 88%, transparent) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 22% 50%, color-mix(in oklab, var(--navy) 38%, transparent) 0%, transparent 55%, color-mix(in oklab, var(--navy) 55%, transparent) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-28 sm:pt-32 pb-28 lg:pb-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 xl:col-span-7">
            <p
              className={`eyebrow mb-6 lg:mb-7 transition-all duration-1000 ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              Blue Ridge, North Carolina
            </p>

            <h1
              className={`font-serif text-ivory mb-7 lg:mb-9 transition-all duration-1000 delay-150 hang-punct ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                fontSize: "clamp(2.0rem, 1.2rem + 5.2vw, 5.75rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.022em",
                fontWeight: 500,
              }}
            >
              <span className="block">The room is the medicine.</span>
              <span
                className="block text-ivory/85 editorial-italic"
                style={{ fontWeight: 400 }}
              >
                Care, in the company of peers.
              </span>
            </h1>

            <span
              aria-hidden
              className={`block h-px bg-amber mb-8 lg:mb-9 transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-500 ${
                revealed ? "w-20 sm:w-24 opacity-100" : "w-0 opacity-0"
              }`}
            />

            <p
              className={`text-ivory/85 max-w-xl mb-10 sm:mb-12 transition-all duration-1000 delay-300 leading-relaxed ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                fontSize: "var(--text-lead)",
                color: "color-mix(in oklab, var(--ivory) 90%, transparent)",
              }}
            >
              A private medical-wellness sanctuary where executives, surgeons, judges, and founders restore in the company of peers who&rsquo;ve sat in the same chair.
            </p>

            <div
              className={`transition-all duration-1000 delay-500 ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <button
                  onClick={() => scrollToId("concierge-form")}
                  className="group cta-glow relative w-full sm:w-auto bg-amber text-amber-foreground px-8 py-[18px] sm:py-5 min-h-[52px] hover:-translate-y-0.5 transition-transform duration-500 overflow-hidden"
                >
                  <span className="small-caps tracking-[0.22em] text-[12px] relative z-10">
                    Request the Clinical Dossier
                  </span>
                </button>
                <a
                  href="tel:+18005550199"
                  className="w-full sm:w-auto px-2 py-3 min-h-[44px] text-ivory/90 hover:text-amber transition-colors duration-500 flex items-center justify-center sm:justify-start gap-3"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="opacity-80"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="small-caps tracking-[0.22em] text-[12px]">
                    Speak With Intake · 24/7
                  </span>
                </a>
              </div>

              <button
                onClick={() => scrollToId("cohort")}
                className="mt-8 sm:mt-9 text-ivory/55 hover:text-amber transition-colors duration-500 small-caps text-[11px] tracking-[0.24em] flex items-center gap-3 group"
              >
                <span aria-hidden className="block w-6 h-px bg-ivory/30 group-hover:bg-amber transition-colors" />
                <span>Meet the room</span>
                <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-4 xl:col-span-5" aria-hidden />
        </div>
      </div>

      {/* Frame indicator dots — bottom-right whisper */}
      <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-20 flex items-center gap-1.5">
        {FRAMES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveFrame(i)}
            aria-label={`Show scene ${i + 1}`}
            className={`h-px transition-all duration-500 ${
              i === activeFrame ? "w-6 bg-amber" : "w-3 bg-ivory/30"
            }`}
          />
        ))}
      </div>

      <MiniNetwork />

      <style>{`
        @keyframes heroFrameDrift {
          0%   { transform: scale(1.05) translate3d(0, 0, 0); }
          50%  { transform: scale(1.12) translate3d(-1.5%, -1%, 0); }
          100% { transform: scale(1.05) translate3d(0, 0, 0); }
        }
        .hero-frame {
          animation: heroFrameDrift 24s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .cta-glow { transition: box-shadow 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms ease; }
        .cta-glow:hover {
          box-shadow:
            inset 0 0 0 1px color-mix(in oklab, var(--amber-foreground) 35%, transparent),
            inset 0 0 24px color-mix(in oklab, var(--amber-foreground) 22%, transparent),
            0 8px 30px -10px color-mix(in oklab, var(--amber) 65%, transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-frame { animation: none !important; transform: scale(1.02) !important; }
        }
      `}</style>
    </section>
  );
}

/**
 * Mini-network whisper — 5 amber nodes drift bottom-left, single filament
 * connecting two at a time. ~30% opacity. Hint of the Cohort below.
 */
function MiniNetwork() {
  const [reduce, setReduce] = useState(false);
  const [, setTick] = useState(0);
  const nodesRef = useRef(
    [0, 1, 2, 3, 4].map((i) => ({
      x: 0.1 + i * 0.18 + Math.sin(i * 1.7) * 0.04,
      y: 0.4 + Math.cos(i * 2.3) * 0.3,
      vx: 0.005 + (i % 3) * 0.002,
      vy: (i % 2 === 0 ? 1 : -1) * 0.003,
    })),
  );
  const linkRef = useRef({ a: 0, b: 2, born: 0, duration: 3600 });

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduce(!!mq?.matches);
  }, []);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const ns = nodesRef.current;
      for (const n of ns) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0.05 || n.x > 0.95) n.vx *= -1;
        if (n.y < 0.15 || n.y > 0.85) n.vy *= -1;
      }
      const link = linkRef.current;
      if (now - link.born > link.duration) {
        link.a = Math.floor(Math.random() * ns.length);
        link.b = (link.a + 1 + Math.floor(Math.random() * (ns.length - 1))) % ns.length;
        link.born = now;
      }
      setTick((t) => (t + 1) % 1_000_000);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const ns = nodesRef.current;
  const link = linkRef.current;
  const t = reduce ? 0.5 : Math.min(1, (performance.now() - link.born) / link.duration);
  let op = 0;
  if (t < 0.4) op = t / 0.4;
  else if (t < 0.7) op = 1;
  else op = 1 - (t - 0.7) / 0.3;
  op = Math.max(0, Math.min(1, op)) * 0.5;

  const W = 280;
  const H = 100;
  const a = ns[link.a];
  const b = ns[link.b];

  return (
    <svg
      aria-hidden
      className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 z-10 pointer-events-none opacity-30"
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
    >
      {a && b && (
        <line
          x1={a.x * W}
          y1={a.y * H}
          x2={b.x * W}
          y2={b.y * H}
          stroke="var(--amber)"
          strokeWidth={0.6}
          opacity={op}
        />
      )}
      {ns.map((n, i) => (
        <circle
          key={i}
          cx={n.x * W}
          cy={n.y * H}
          r={2.5}
          fill="var(--amber)"
          opacity={0.85}
        />
      ))}
    </svg>
  );
}
