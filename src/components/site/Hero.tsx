import { useEffect, useState } from "react";
import heroAerial from "@/assets/hero-estate-aerial.jpg";

/**
 * v1.5 /distill + /quieter: rotation removed. One signature image carries
 * the brand. Slow Ken Burns drift (90s) is imperceptible but alive.
 * Vignette stops re-tuned to guarantee headline contrast on any viewport,
 * including the bright sky band on mobile portrait.
 */

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative flex items-center overflow-hidden bg-navy"
      style={{ minHeight: "100svh" }}
    >
      {/* Single signature image — slow Ken Burns drift (90s, imperceptible) */}
      <img
        src={heroAerial}
        alt="Aerial twilight view of a private Blue Ridge mountain estate with infinity pool, equestrian stables, and ancient white oaks under a misty ridgeline at golden hour"
        width={1920}
        height={1280}
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover hero-drift"
      />

      {/* Vignette stack — re-tuned for guaranteed headline contrast on mobile.
          Top brace stronger to mask sky-band brightness; bottom anchor preserved. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--navy) 62%, transparent) 0%, color-mix(in oklab, var(--navy) 28%, transparent) 38%, color-mix(in oklab, var(--navy) 82%, transparent) 100%)",
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

      {/* Asymmetric weighted grid — content sits in 7 of 12 columns, left-anchored. */}
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
              className={`font-serif text-ivory mb-6 lg:mb-8 transition-all duration-1000 delay-150 hang-punct hero-headline ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                fontSize: "clamp(2.25rem, 1.6rem + 4vw, 5.5rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.022em",
                fontWeight: 500,
              }}
            >
              Swiss-standard clinical discretion
              <span
                className="block text-ivory/85 editorial-italic"
                style={{ fontWeight: 400 }}
              >
                in the Blue Ridge.
              </span>
            </h1>
            <p
              className={`text-lead text-ivory/85 max-w-xl mb-9 sm:mb-12 transition-all duration-1000 delay-300 editorial-italic ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ color: "color-mix(in oklab, var(--ivory) 86%, transparent)", fontWeight: 400 }}
            >
              A private medical-wellness retreat for the high-functioning leader who refuses to compromise on privacy or care. One family in residence at a time.
            </p>

            {/* Single primary CTA + quiet secondary phone line. Pro link demoted to navbar. */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <button
                  onClick={() => scrollToId("concierge-form")}
                  className="w-full sm:w-auto bg-amber text-amber-foreground px-8 py-5 min-h-[56px] hover:-translate-y-0.5 transition-transform duration-500"
                >
                  <span className="small-caps tracking-[0.22em] text-[12px]">
                    Request the Clinical Dossier
                  </span>
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
            </div>
          </div>
          {/* Right column intentionally empty — negative space lets the photo carry */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-5" aria-hidden />
        </div>
      </div>

      {/* Pulsing scroll indicator — reclaims the space the slide labels used to occupy */}
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
        /* Mobile: tighten headline to prevent awkward 4-line breaks at narrow widths */
        .hero-headline { max-width: 18ch; }
        @media (min-width: 1024px) {
          .hero-headline { max-width: 22ch; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-drift, [class*="animate-["] { animation: none !important; transform: scale(1.02) !important; }
        }
      `}</style>
    </section>
  );
}
