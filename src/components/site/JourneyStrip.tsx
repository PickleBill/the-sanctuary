import { useEffect, useRef, useState } from "react";
import day1 from "@/assets/day-1-rise.jpg";
import day2 from "@/assets/day-2-clinic.jpg";
import day3 from "@/assets/day-3-trail.jpg";
import day4 from "@/assets/day-4-sauna.jpg";
import day5 from "@/assets/day-5-table.jpg";
import day6 from "@/assets/day-6-stars.jpg";

/**
 * v3.3 — JourneyStrip — "A day, told in six pictures."
 *
 * Horizontal full-bleed rail of 6 portrait moments stitched by a single amber
 * filament that draws as the rail scrolls. Mobile snap-scrolls one card at a
 * time. Desktop drifts under parallax. Six images. Twelve words. No paragraph.
 */

const moments = [
  { src: day1, time: "6:14 AM", word: "Rise", alt: "Dawn tea on a windowsill above the mountains" },
  { src: day2, time: "9:00 AM", word: "Clinic", alt: "A quiet morning consultation room" },
  { src: day3, time: "1:30 PM", word: "Trail", alt: "Walking a sun-dappled forest trail" },
  { src: day4, time: "5:00 PM", word: "Sauna", alt: "A cedar sauna door, warm amber inside" },
  { src: day5, time: "7:30 PM", word: "Table", alt: "A long farmhouse table set for dinner" },
  { src: day6, time: "10:00 PM", word: "Stars", alt: "The Milky Way over the ridge" },
];

export function JourneyStrip() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = rail.scrollWidth - rail.clientWidth;
        setProgress(max > 0 ? Math.min(1, Math.max(0, rail.scrollLeft / max)) : 0);
      });
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      rail.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey-strip"
      className="relative bg-navy py-20 sm:py-24 lg:py-32 scroll-mt-24 overflow-hidden"
    >
      <span aria-hidden className="section-filament-top" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-10 lg:mb-14">
        <div
          className={`max-w-3xl transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="eyebrow text-amber/90 mb-5">A Day in Residence</p>
          <h2
            className="font-serif text-ivory hang-punct"
            style={{
              fontSize: "clamp(1.875rem, 1.4rem + 2.6vw, 3.25rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Sunrise to stars.
            <span className="block editorial-italic text-ivory/70" style={{ fontWeight: 400 }}>
              Six moments. Twelve words.
            </span>
          </h2>
        </div>
      </div>

      {/* Full-bleed rail */}
      <div className="relative">
        {/* Single amber filament drawn as you scroll */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-1/2 h-px bg-amber/30 pointer-events-none"
          style={{ transform: "translateY(-50%)" }}
        >
          <span
            className="block h-px bg-amber origin-left"
            style={{
              width: "100%",
              transform: `scaleX(${0.06 + progress * 0.94})`,
              transformOrigin: "left center",
              transition: "transform 200ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        </div>

        <div
          ref={railRef}
          className="journey-rail flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto snap-x snap-mandatory px-6 lg:px-10 pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {moments.map((m, i) => (
            <figure
              key={m.word}
              className="journey-rail-card snap-center shrink-0 relative overflow-hidden bg-navy"
              style={{
                width: "clamp(260px, 78vw, 380px)",
                aspectRatio: "3 / 4",
              }}
            >
              <img
                src={m.src}
                alt={m.alt}
                loading={i < 2 ? "eager" : "lazy"}
                width={800}
                height={1067}
                className="w-full h-full object-cover journey-rail-img"
                style={{ animationDelay: `${i * 0.6}s` }}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--navy) 55%, transparent) 70%, color-mix(in oklab, var(--navy) 92%, transparent) 100%)",
                }}
              />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-ivory">
                <p className="small-caps text-amber text-[10px] tracking-[0.28em] mb-1.5 tabular text-on-image">
                  {m.time}
                </p>
                <p
                  className="font-serif editorial-italic text-luxe"
                  style={{
                    fontSize: "clamp(1.5rem, 1.2rem + 1.6vw, 2rem)",
                    fontWeight: 500,
                    lineHeight: 1,
                  }}
                >
                  {m.word}
                </p>
              </figcaption>
            </figure>
          ))}
          {/* Trailing spacer so the last card can snap nicely */}
          <div aria-hidden className="shrink-0 w-2 sm:w-6 lg:w-10" />
        </div>

        {/* Progress dots — small ledger of where you are in the day */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {moments.map((_, i) => {
              const active = Math.round(progress * (moments.length - 1)) === i;
              return (
                <span
                  key={i}
                  aria-hidden
                  className={`h-px transition-all duration-500 ${
                    active ? "w-8 bg-amber" : "w-4 bg-ivory/25"
                  }`}
                />
              );
            })}
          </div>
          <p className="hidden sm:block small-caps text-ivory/45 text-[10px] tracking-[0.28em] tabular">
            <span className="text-amber/80">{String(Math.round(progress * (moments.length - 1)) + 1).padStart(2, "0")}</span>
            <span className="text-ivory/30"> / {String(moments.length).padStart(2, "0")}</span>
          </p>
        </div>
      </div>

      <style>{`
        .journey-rail::-webkit-scrollbar { display: none; }
        @keyframes railKenBurns {
          0%   { transform: scale(1.04) translate3d(0, 0, 0); }
          50%  { transform: scale(1.1) translate3d(-1.2%, -0.8%, 0); }
          100% { transform: scale(1.04) translate3d(0, 0, 0); }
        }
        .journey-rail-img {
          animation: railKenBurns 18s ease-in-out infinite;
          will-change: transform;
        }
        .journey-rail-card {
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          .journey-rail-card:hover { transform: translateY(-4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .journey-rail-img { animation: none !important; transform: scale(1.02); }
        }
      `}</style>
    </section>
  );
}
