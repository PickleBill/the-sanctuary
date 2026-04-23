import { useEffect, useState } from "react";
import heroAerial from "@/assets/hero-estate-aerial.jpg";
import heroResidence from "@/assets/hero-residence.jpg";
import heroEquestrian from "@/assets/hero-equestrian.jpg";
import heroArrival from "@/assets/hero-arrival.jpg";

const slides = [
  {
    src: heroAerial,
    alt: "Aerial twilight view of a private Blue Ridge mountain estate with infinity pool, equestrian stables, and ancient white oaks under a misty ridgeline at golden hour",
    label: "The Estate",
  },
  {
    src: heroResidence,
    alt: "The principal residence at blue hour — modern stone and cedar architecture with floor-to-ceiling windows opening onto a terraced infinity pool overlooking the Blue Ridge",
    label: "The Residence",
  },
  {
    src: heroEquestrian,
    alt: "Private equestrian arena and stone stables at golden hour with two horses grazing in a fenced pasture beneath ancient oak trees",
    label: "The Stables",
  },
  {
    src: heroArrival,
    alt: "Misty morning at the private estate gate — century-old oak allée and stone gatehouse",
    label: "The Arrival",
  },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Layered slides with Ken Burns drift */}
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          width={1920}
          height={1280}
          fetchPriority={i === 0 ? "high" : "auto"}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1800ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: i === index ? "scale(1.06)" : "scale(1.0)",
            transition:
              "opacity 1800ms cubic-bezier(0.22,1,0.36,1), transform 9000ms linear",
          }}
        />
      ))}

      {/* Cinematic gradient + vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--navy) 60%, transparent) 0%, color-mix(in oklab, var(--navy) 30%, transparent) 40%, color-mix(in oklab, var(--navy) 88%, transparent) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, color-mix(in oklab, var(--navy) 55%, transparent) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-24 w-full">
        <div className="max-w-3xl">
          <p
            className={`eyebrow text-amber mb-7 transition-all duration-1000 ${
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="luxe-rule mr-3" /> <span className="small-caps">Sanctuary Southeast</span> · Blue Ridge, North Carolina
          </p>
          <h1
            className={`font-serif text-ivory mb-8 transition-all duration-1000 delay-150 ${
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              fontSize: "clamp(2.25rem, 1.6rem + 4vw, 5.5rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              fontWeight: 500,
              maxWidth: "22ch",
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
            className={`text-lead text-ivory/85 max-w-2xl mb-10 sm:mb-12 transition-all duration-1000 delay-300 ${
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ color: "color-mix(in oklab, var(--ivory) 88%, transparent)" }}
          >
            A private medical-wellness retreat for the high-functioning leader who refuses to compromise on privacy or care. One family in residence at a time.
          </p>

          {/* Single primary CTA + quiet secondary phone line. Healthcare professionals demoted to text link. */}
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
                className="w-full sm:w-auto px-2 py-3 min-h-[44px] text-ivory/90 hover:text-amber transition-colors duration-500 flex items-center justify-center sm:justify-start gap-3"
              >
                <span className="luxe-rule" aria-hidden />
                <span className="small-caps tracking-[0.22em] text-[12px]">
                  Speak With Intake · 24/7
                </span>
              </a>
            </div>
            <button
              onClick={() => scrollToId("leadership")}
              className="mt-6 text-[11px] tracking-[0.24em] uppercase font-medium text-ivory/55 hover:text-amber transition-colors duration-500 underline underline-offset-[6px] decoration-ivory/25 hover:decoration-amber"
            >
              For Healthcare Professionals
            </button>
          </div>
        </div>
      </div>

      {/* Slide indicator + label */}
      <div className="absolute bottom-10 left-6 lg:left-10 z-10 flex items-center gap-4">
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.label}
              aria-label={`Show ${s.label}`}
              onClick={() => setIndex(i)}
              className={`h-px transition-all duration-700 ${
                i === index ? "w-12 bg-amber" : "w-6 bg-ivory/40 hover:bg-ivory/70"
              }`}
            />
          ))}
        </div>
        <span className="text-ivory/70 small-caps text-[11px] tracking-[0.32em]">
          {slides[index].label}
        </span>
      </div>

      {/* Pulsing scroll indicator */}
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
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-["] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
