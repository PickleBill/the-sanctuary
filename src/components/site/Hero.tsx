import { useEffect, useState } from "react";
import frame1 from "@/assets/hero-frame-1-meditation.jpg";
import frame2 from "@/assets/hero-frame-2-golf.jpg";
import frame3 from "@/assets/hero-frame-3-sauna.jpg";

/**
 * v3.6 — Cinemagraph Hero
 *
 * 3 frames cross-fading. Headline at weight 700. No frame-indicator dots.
 * No mini-network. Just type, photo, and one CTA.
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
      style={{ minHeight: "min(100svh, 760px)" }}
    >
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

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--navy) 78%, transparent) 0%, color-mix(in oklab, var(--navy) 48%, transparent) 42%, color-mix(in oklab, var(--navy) 92%, transparent) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 22% 50%, color-mix(in oklab, var(--navy) 55%, transparent) 0%, transparent 60%, color-mix(in oklab, var(--navy) 65%, transparent) 100%)",
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
              className={`font-serif text-ivory mb-7 lg:mb-9 transition-all duration-1000 delay-150 hang-punct text-luxe ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                fontSize: "clamp(2.0rem, 1.2rem + 5.4vw, 6rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontWeight: 700,
              }}
            >
              <span className="block">The room is the medicine.</span>
              <span
                className="block text-ivory editorial-italic"
                style={{ fontWeight: 400, letterSpacing: "-0.022em" }}
              >
                Care, in the company of peers.
              </span>
            </h1>

            {/* The ONE permitted decorative hairline — amber rule under hero headline */}
            <span
              aria-hidden
              className={`block h-px bg-amber mb-8 lg:mb-9 transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-500 ${
                revealed ? "w-20 sm:w-24 opacity-100" : "w-0 opacity-0"
              }`}
            />

            <p
              className={`text-ivory max-w-xl mb-10 sm:mb-12 transition-all duration-1000 delay-300 leading-relaxed text-on-image ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                fontSize: "var(--text-lead)",
                color: "color-mix(in oklab, var(--ivory) 96%, transparent)",
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
                  className="group cta-glow cta-flame relative w-full sm:w-auto bg-amber text-amber-foreground px-8 py-[18px] sm:py-5 min-h-[52px] hover:-translate-y-0.5 transition-transform duration-300 overflow-hidden font-semibold"
                >
                  <span className="small-caps tracking-[0.24em] text-[12px] relative z-10">
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
                className="mt-8 sm:mt-9 text-ivory/70 hover:text-amber transition-colors duration-500 small-caps text-[11px] tracking-[0.24em] flex items-center gap-3 group"
              >
                <span>Meet the room</span>
                <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-4 xl:col-span-5" aria-hidden />
        </div>
      </div>

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
