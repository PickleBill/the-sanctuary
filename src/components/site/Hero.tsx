import { useEffect, useRef, useState } from "react";
import heroAerial from "@/assets/hero-estate-aerial.jpg";

/**
 * v1.6 — repositioned. Privacy is the floor, not the headline.
 * The new line sells the room (peers + restoration), not the fence.
 *
 * Cinematic additions (controlled, not noisy):
 *   1. Layered parallax on scroll — base image drifts slower than the vignette,
 *      creating fake depth without a second asset.
 *   2. Filament burn-in — amber hairline draws under the headline on mount.
 *   3. Mist particle ribbon — single canvas, ≤14 motes, opacity ≤0.18, slow drift.
 *      Disabled at prefers-reduced-motion. FPS-budgeted.
 *
 * Mobile fix: headline switched from max-width measure to per-line spans so
 * the roman/italic split lands cleanly at 360–414px without 4-line breaks.
 */

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function useParallax() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

function MistCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const N = 14;
    const motes = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: 0.4 + Math.random() * 0.55,
      r: 30 + Math.random() * 80,
      vx: 0.00003 + Math.random() * 0.00006,
      o: 0.06 + Math.random() * 0.1,
    }));

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx * dt;
        if (m.x > 1.1) m.x = -0.1;
        const px = m.x * w;
        const py = m.y * h;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, m.r);
        // Ivory mist with amber under-warmth
        grad.addColorStop(0, `rgba(248, 250, 252, ${m.o})`);
        grad.addColorStop(0.6, `rgba(248, 250, 252, ${m.o * 0.4})`);
        grad.addColorStop(1, "rgba(248, 250, 252, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-70"
    />
  );
}

export function Hero() {
  const [revealed, setRevealed] = useState(false);
  const scrollY = useParallax();

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Layered parallax — base image translates slower than the foreground vignette
  const baseY = scrollY * 0.18;
  const vignetteY = scrollY * 0.06;

  return (
    <section
      className="relative flex items-center overflow-hidden bg-navy"
      style={{ minHeight: "100svh" }}
    >
      {/* Base image — slow Ken Burns drift + scroll parallax */}
      <img
        src={heroAerial}
        alt="Aerial twilight view of a private Blue Ridge mountain estate with infinity pool, equestrian stables, and ancient white oaks under a misty ridgeline at golden hour"
        width={1920}
        height={1280}
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover hero-drift"
        style={{ transform: `translate3d(0, ${baseY}px, 0)` }}
      />

      {/* Mist ribbon — the one /overdrive moment, FPS-budgeted, opacity-capped */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <MistCanvas />
      </div>

      {/* Vignette stack — re-tuned for guaranteed headline contrast on mobile */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--navy) 62%, transparent) 0%, color-mix(in oklab, var(--navy) 28%, transparent) 38%, color-mix(in oklab, var(--navy) 82%, transparent) 100%)",
          transform: `translate3d(0, ${vignetteY}px, 0)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 55%, transparent 32%, color-mix(in oklab, var(--navy) 50%, transparent) 100%)",
        }}
        aria-hidden
      />

      {/* Asymmetric weighted grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 xl:col-span-7">
            <p
              className={`eyebrow mb-5 lg:mb-7 transition-all duration-1000 ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <span className="luxe-rule mr-3" /> Blue Ridge, North Carolina
            </p>

            <h1
              className={`font-serif text-ivory mb-6 lg:mb-8 transition-all duration-1000 delay-150 hang-punct ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                fontSize: "clamp(2.5rem, 1.7rem + 4.4vw, 5.75rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.022em",
                fontWeight: 500,
              }}
            >
              <span className="block">Care worth coming to.</span>
              <span
                className="block text-ivory/85 editorial-italic"
                style={{ fontWeight: 400 }}
              >
                Among peers who understand.
              </span>
            </h1>

            {/* Filament burn-in — brand signature motion, fires once */}
            <span
              aria-hidden
              className={`block h-px bg-amber mb-7 lg:mb-9 transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-500 ${
                revealed ? "w-24 opacity-100" : "w-0 opacity-0"
              }`}
            />

            <p
              className={`text-ivory/85 max-w-xl mb-9 sm:mb-12 transition-all duration-1000 delay-300 leading-relaxed ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                fontSize: "var(--text-lead)",
                color: "color-mix(in oklab, var(--ivory) 88%, transparent)",
              }}
            >
              A private medical-wellness sanctuary in the Blue Ridge for high-functioning leaders. Clinical depth. Restorative beauty. The quiet company of others who&rsquo;ve sat in your chair.
            </p>

            {/* CTAs — primary amber + intake line + new tertiary "see what a week looks like" */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <button
                  onClick={() => scrollToId("concierge-form")}
                  className="group relative w-full sm:w-auto bg-amber text-amber-foreground px-8 py-5 min-h-[56px] hover:-translate-y-0.5 transition-transform duration-500 overflow-hidden"
                >
                  <span className="small-caps tracking-[0.22em] text-[12px] relative z-10">
                    Request the Clinical Dossier
                  </span>
                  {/* Filament underline — draws on hover */}
                  <span
                    aria-hidden
                    className="absolute left-4 right-4 bottom-2 h-px bg-amber-foreground/60 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  />
                </button>
                <a
                  href="tel:+18005550199"
                  className="w-full sm:w-auto px-2 py-3 min-h-[48px] text-ivory/90 hover:text-amber transition-colors duration-500 flex items-center justify-center sm:justify-start gap-3"
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

              {/* Tertiary — quiet text link to "A Day Here" */}
              <button
                onClick={() => scrollToId("day-here")}
                className="mt-7 sm:mt-8 text-ivory/55 hover:text-amber transition-colors duration-500 italic text-[15px] flex items-center gap-2 group"
              >
                <span>or — see what a week here actually looks like</span>
                <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-4 xl:col-span-5" aria-hidden />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToId("gallery")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-ivory/70 small-caps text-[11px] tracking-[0.4em] flex flex-col items-center gap-3 group"
        aria-label="Scroll to estate"
      >
        <span className="group-hover:text-amber transition-colors">Scroll</span>
        <span className="block w-px h-10 bg-ivory/40 relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 bg-amber animate-[scrollPulse_2.4s_ease-in-out_infinite]" />
        </span>
      </button>

      <style>{`
        @keyframes scrollPulse {
          0% { transform: translateY(-100%); }
          60% { transform: translateY(280%); }
          100% { transform: translateY(280%); }
        }
        @keyframes heroDrift {
          0%   { transform: scale(1.04) translate3d(0, 0, 0); }
          50%  { transform: scale(1.10) translate3d(-1.2%, -0.8%, 0); }
          100% { transform: scale(1.04) translate3d(0, 0, 0); }
        }
        .hero-drift {
          animation: heroDrift 90s ease-in-out infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-drift, [class*="animate-["] { animation: none !important; transform: scale(1.02) !important; }
        }
      `}</style>
    </section>
  );
}
