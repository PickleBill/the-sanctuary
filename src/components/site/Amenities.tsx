import { useEffect, useRef, useState } from "react";
import suite from "@/assets/gallery-suite-v2.jpg";
import grounds from "@/assets/gallery-grounds-v2.jpg";
import boardroom from "@/assets/gallery-boardroom-v2.jpg";
import clinical from "@/assets/gallery-clinical-v2.jpg";
import pickleball from "@/assets/amenity-pickleball.jpg";

/**
 * v3.3 — Amenities + Building deck
 *
 * The five executive commitments stay as a horizontal ledger.
 * Below them, the four building photographs from the old Gallery now live
 * here as a quiet four-up "the buildings, briefly" deck — context for the
 * commitments above without re-staging them as a hero. Imagery first, copy
 * minimal. Show, don't tell.
 */

const items = [
  {
    num: "I",
    title: "The Chairman's Cottage",
    desc: "A detached residence on the estate. One guest. A hardened private office with encrypted comms and conference-grade fiber. The same clinical team. None of the interruption — for the principal who cannot be away.",
  },
  {
    num: "II",
    title: "Discretion, by default",
    desc: "Universal NDAs, encrypted channels, private arrival. The privacy is so complete you stop thinking about it — which is the point.",
  },
  {
    num: "III",
    title: "Things worth doing again",
    desc: "Fly fishing on private water. A quiet round at the club. Pickleball at golden hour with a peer who outranks the small talk. An hour with a horse who doesn't care what you do for a living.",
  },
  {
    num: "IV",
    title: "Food you would order on purpose",
    desc: "A private chef working from a metabolic dietitian's brief. Plated as hospitality. Designed as medicine.",
  },
  {
    num: "V",
    title: "Family, brought back",
    desc: "On-site lodging for spouses and counsel. Family-systems sessions led by senior clinicians. The conversation you've been postponing, made possible.",
  },
];

const buildings = [
  { src: suite, label: "The Suite", caption: "Where the day begins.", alt: "A serene private suite with mountain light" },
  { src: grounds, label: "The Grounds", caption: "Forty acres, one family.", alt: "The Blue Ridge grounds at golden hour" },
  { src: pickleball, label: "The Court", caption: "Pickleball at golden hour.", alt: "A private pickleball court at sunset, paddles waiting on a wooden bench" },
  { src: boardroom, label: "The Office", caption: "Conference-grade fiber, hardened comms.", alt: "A private executive office with warm wood paneling" },
  { src: clinical, label: "The Clinic", caption: "Hospitality, dressed as medicine.", alt: "A discreet clinical wellness suite" },
];

export function Amenities() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="amenities" className="relative py-28 lg:py-40 bg-background scroll-mt-24">
      {/* Section-boundary filament */}
      <span aria-hidden className="section-filament-top" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* /shape: header in 8/12 columns; matches every other section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 lg:mb-16">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5">Executive Amenities</p>
            <h2
              className="font-serif text-foreground mb-7 hang-punct"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 3vw, 3.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              Designed for the
              <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
                modern leader.
              </span>
            </h2>
            <p
              className="text-foreground/75 leading-relaxed max-w-xl"
              style={{ fontSize: "var(--text-body)" }}
            >
              Five quiet commitments — some clinical, some hospitable, all designed to make a serious month of work feel like a place you would want to come back to.
            </p>
            <p className="mt-5 font-serif editorial-italic text-foreground/65 max-w-xl" style={{ fontSize: "var(--text-body)" }}>
              You will rise to a quiet bell.
            </p>
          </div>
        </div>

        {/* Desktop: horizontal ledger */}
        <div className="hidden md:block">
          <div
            ref={scrollerRef}
            className="overflow-x-auto -mx-6 lg:-mx-10 px-6 lg:px-10 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            <ol className="flex gap-px bg-border w-max">
              {items.map((it, i) => (
                <li
                  key={it.num}
                  className="bg-background snap-start group transition-colors duration-700 hover:bg-primary w-[420px] lg:w-[480px] p-10 lg:p-12 flex flex-col"
                >
                  <div className="flex items-baseline justify-between mb-8">
                    <p
                      className="font-serif text-amber leading-none"
                      style={{ fontSize: "var(--text-h2)", fontWeight: 400, letterSpacing: "-0.02em" }}
                    >
                      {it.num}
                    </p>
                    <p className="small-caps text-foreground/55 group-hover:text-ivory/70 transition-colors text-[11px] tracking-[0.24em] tabular">
                      {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </p>
                  </div>
                  <h3
                    className="font-serif text-foreground group-hover:text-ivory mb-5 transition-colors"
                    style={{ fontSize: "var(--text-h4)", lineHeight: 1.15, fontWeight: 500 }}
                  >
                    {it.title}
                  </h3>
                  <p className="text-sm lg:text-base text-foreground/70 leading-relaxed group-hover:text-ivory/85 transition-colors">
                    {it.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Numeric counter only — no progress rule per v2.0 subtraction pass */}
          <div className="mt-10 flex justify-end">
            <p className="small-caps text-foreground/55 text-[11px] tracking-[0.28em] tabular">
              <span className="text-amber">{String(Math.round(progress * (items.length - 1)) + 1).padStart(2, "0")}</span>
              <span className="text-foreground/35"> / {String(items.length).padStart(2, "0")}</span>
            </p>
          </div>
        </div>

        {/* Mobile: vertical timeline. */}
        <ol className="md:hidden grid grid-cols-1 gap-px bg-border">
          {items.map((it, i) => (
            <li key={it.num} className="bg-background px-6 py-8 group">
              <div className="flex items-baseline justify-between mb-5">
                <p
                  className="font-serif text-amber leading-none"
                  style={{ fontSize: "clamp(2rem, 7vw, 2.5rem)", fontWeight: 400, letterSpacing: "-0.02em" }}
                >
                  {it.num}
                </p>
                <p className="small-caps text-foreground/55 text-[10px] tracking-[0.32em] tabular">
                  <span className="text-amber">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-foreground/35"> / {String(items.length).padStart(2, "0")}</span>
                </p>
              </div>
              <h3
                className="font-serif mb-3 text-foreground hang-punct"
                style={{ fontSize: "var(--text-h4)", lineHeight: 1.18, fontWeight: 500 }}
              >
                {it.title}
              </h3>
              <p className="text-[15px] text-foreground/75 leading-relaxed">{it.desc}</p>
            </li>
          ))}
        </ol>

        {/* ────────────────────────────────────────────────────────────────
            Building deck — the four originals, demoted to context.
            Quiet four-up grid. Image-led, two-line caption per tile.
            ──────────────────────────────────────────────────────────────── */}
        <div className="mt-20 lg:mt-28 pt-12 lg:pt-16 border-t border-border">
          <div className="flex items-baseline justify-between mb-8 lg:mb-10">
            <p className="eyebrow">The estate, briefly</p>
            <p className="hidden sm:block small-caps text-foreground/45 text-[10px] tracking-[0.28em] tabular">
              Five rooms · One estate
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {buildings.map((b, i) => (
              <figure
                key={b.label}
                className="amenity-tile group relative overflow-hidden bg-card aspect-[4/5]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <img
                  src={b.src}
                  alt={b.alt}
                  loading="lazy"
                  className="w-full h-full object-cover amenity-tile-img"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--navy) 55%, transparent) 72%, color-mix(in oklab, var(--navy) 92%, transparent) 100%)",
                  }}
                />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-ivory">
                  <p className="small-caps text-amber text-[9px] sm:text-[10px] tracking-[0.28em] mb-1 text-on-image">
                    {b.label}
                  </p>
                  <p className="editorial-italic text-[12px] sm:text-[13px] leading-snug text-ivory text-on-image">
                    {b.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes amenityKenBurns {
            0%   { transform: scale(1.02) translate3d(0, 0, 0); }
            50%  { transform: scale(1.08) translate3d(-1%, -0.6%, 0); }
            100% { transform: scale(1.02) translate3d(0, 0, 0); }
          }
          .amenity-tile-img {
            animation: amenityKenBurns 26s ease-in-out infinite;
            will-change: transform;
            transition: transform 1.4s ease-out;
          }
          @media (hover: hover) and (pointer: fine) {
            .amenity-tile:hover .amenity-tile-img {
              animation-play-state: paused;
              transform: scale(1.06);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .amenity-tile-img { animation: none !important; transform: scale(1.02); }
          }
        `}</style>
      </div>
    </section>
  );
}
