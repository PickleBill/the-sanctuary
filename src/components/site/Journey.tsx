import { useEffect, useRef, useState } from "react";
import meditation from "@/assets/journey-1-meditation.jpg";
import horse from "@/assets/journey-2-horse.jpg";
import cello from "@/assets/journey-3-cello.jpg";
import sauna from "@/assets/journey-4-sauna.jpg";
import chef from "@/assets/journey-5-chef.jpg";
import porch from "@/assets/journey-6-porch.jpg";
import clinical from "@/assets/journey-7-clinical.jpg";
import stars from "@/assets/journey-8-stars.jpg";

/**
 * v3.3 — "The Journey"
 *
 * Replaces the old building-photo Gallery. Eight moments, asymmetric bento.
 * - Auto-Ken-Burns slow pan on every visible tile (mobile-first; no input needed)
 * - Sibling-desaturate kept on desktop hover for focus grammar
 * - Lightbox kept for deep-look
 *
 * Show, don't tell — six headers, twelve italic captions, no paragraphs.
 */

type Moment = {
  src: string;
  eyebrow: string;
  title: string;
  caption: string;
  long: string;
  alt: string;
};

const moments: Moment[] = [
  {
    src: meditation,
    eyebrow: "Introspection",
    title: "Dawn on the trail",
    caption: "Mist, oaks, a single seat in the canopy.",
    long: "The first hour of the day belongs to no one but the visitor. A meditation pavilion sited where the ridge breaks the mist — most mornings, you arrive before anyone else does.",
    alt: "A figure meditating on a fog-soft mountain trail at dawn",
  },
  {
    src: horse,
    eyebrow: "Activation",
    title: "An hour with a horse",
    caption: "Equine work. No résumé required.",
    long: "Equestrian therapy with a senior trainer — quiet, structured, demanding in ways no boardroom is. The horse does not care what you do for a living. That is the point.",
    alt: "A hand resting tenderly on a chestnut horse's neck at golden hour",
  },
  {
    src: cello,
    eyebrow: "Soul",
    title: "The great room hour",
    caption: "A cellist plays. The room listens.",
    long: "On select evenings, a chamber musician plays in the great room. No audience seating. No applause. The music is part of the architecture — restoration that asks nothing of you.",
    alt: "A cellist playing in a grand great room at dusk",
  },
  {
    src: sauna,
    eyebrow: "Restoration",
    title: "Cedar steam",
    caption: "Heat first. Then breath. Then quiet.",
    long: "Cedar sauna, cold plunge, infrared. The body's reset button, on a working schedule. Used twice daily by most residents within a week of arrival.",
    alt: "A cedar sauna door swinging open with steam pouring out",
  },
  {
    src: chef,
    eyebrow: "Hospitality",
    title: "Plated as care",
    caption: "Designed by a metabolic dietitian. Plated like a tasting menu.",
    long: "A private chef working from a metabolic dietitian's brief, served at a single long table. Hospitality in the form of medicine — and medicine in the form of hospitality.",
    alt: "A chef plating a beautifully composed dish",
  },
  {
    src: porch,
    eyebrow: "Belonging",
    title: "On the porch, after",
    caption: "Two chairs. One ridge. The conversation you didn't know you needed.",
    long: "The unscheduled hour, after dinner. Two chairs facing the long fold of the mountains. Fellow residents. The conversation you didn't know you needed, with someone who's sat in your chair.",
    alt: "Two figures sitting in Adirondack chairs on a porch overlooking the Blue Ridge at sunset",
  },
  {
    src: clinical,
    eyebrow: "Medicine",
    title: "Hospitality-grade clinical",
    caption: "The best room in any building is the one you don't notice.",
    long: "Procedure room, infusion bay, recovery suite. Finished to a standard most hospitals cannot match. Board-certified physicians on the estate; sub-specialty consults arranged within twenty-four hours.",
    alt: "A gleaming empty modern clinical wellness suite",
  },
  {
    src: stars,
    eyebrow: "Wonder",
    title: "Eleven o'clock, the ridge",
    caption: "The one quiet thing.",
    long: "Past the last cottage light, the sky takes back the night. The Milky Way carves the eastern ridge. Most residents sit out there for an hour, then come in.",
    alt: "The Milky Way over a Blue Ridge mountain silhouette at night",
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.15 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function MomentTile({
  moment,
  className = "",
  delay = 0,
  onOpen,
  index,
}: {
  moment: Moment;
  className?: string;
  delay?: number;
  onOpen: () => void;
  index: number;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <figure
      ref={ref}
      className={`journey-tile group relative overflow-hidden bg-card transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Expand ${moment.title}`}
        className="block w-full h-full text-left"
      >
        <div className="w-full h-full overflow-hidden relative">
          <img
            src={moment.src}
            alt={moment.alt}
            loading="lazy"
            width={1280}
            height={1280}
            className="w-full h-full object-cover journey-tile-img"
            style={{ animationDelay: `${index * 1.4}s` }}
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 38%, color-mix(in oklab, var(--navy) 55%, transparent) 68%, color-mix(in oklab, var(--navy) 92%, transparent) 100%)",
          }}
          aria-hidden
        />
        <figcaption className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-7 text-ivory">
          <p className="small-caps text-amber mb-1.5 text-[10px] tracking-[0.28em] text-on-image">
            {moment.eyebrow}
          </p>
          <h3
            className="font-serif text-lg sm:text-xl lg:text-2xl mb-1.5 hang-punct text-luxe"
            style={{ fontWeight: 600, lineHeight: 1.12, letterSpacing: "-0.018em" }}
          >
            {moment.title}
          </h3>
          <p className="editorial-italic text-[13px] sm:text-[14px] text-ivory max-w-md leading-snug text-on-image">
            {moment.caption}
          </p>
        </figcaption>
      </button>
    </figure>
  );
}

function Lightbox({ moment, onClose }: { moment: Moment; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const scrollToForm = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("concierge-form");
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, 80);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 lb-fade"
      role="dialog"
      aria-modal="true"
      aria-label={moment.title}
    >
      <button
        className="absolute inset-0 bg-navy/85 lb-backdrop"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-0 max-h-[92vh] overflow-y-auto lb-panel">
        <div className="lg:col-span-7 bg-navy">
          <img
            src={moment.src}
            alt={moment.alt}
            className="w-full h-full object-cover"
            style={{ maxHeight: "92vh" }}
          />
        </div>
        <div className="lg:col-span-5 bg-background p-8 lg:p-10 flex flex-col">
          <p className="small-caps text-amber text-[11px] tracking-[0.28em] mb-3">
            {moment.eyebrow}
          </p>
          <h3
            className="font-serif text-foreground mb-5 hang-punct"
            style={{ fontSize: "var(--text-h3)", lineHeight: 1.1, fontWeight: 500, letterSpacing: "-0.02em" }}
          >
            {moment.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-8" style={{ fontSize: "var(--text-body)" }}>
            {moment.long}
          </p>
          <div className="mt-auto flex flex-col sm:flex-row gap-3">
            <button
              onClick={scrollToForm}
              className="flex-1 bg-amber text-amber-foreground px-5 py-3 small-caps text-[11px] tracking-[0.24em] hover:-translate-y-0.5 transition-transform duration-500"
            >
              Speak With Intake
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-border px-5 py-3 small-caps text-[11px] tracking-[0.24em] text-foreground/70 hover:border-foreground/40 hover:text-foreground transition-colors duration-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 lg:top-6 lg:right-6 w-10 h-10 flex items-center justify-center text-ivory/70 hover:text-amber transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <style>{`
        @keyframes lbBackdrop { from { backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px); opacity: 0; } to { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); opacity: 1; } }
        @keyframes lbPanel    { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .lb-fade     { animation: lbBackdrop 380ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .lb-backdrop { animation: lbBackdrop 380ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .lb-panel    { animation: lbPanel 380ms cubic-bezier(0.22, 1, 0.36, 1) both; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) {
          .lb-fade, .lb-backdrop, .lb-panel { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

export function Journey() {
  const [openMoment, setOpenMoment] = useState<Moment | null>(null);

  return (
    <section id="journey" className="relative py-24 lg:py-36 bg-background scroll-mt-24">
      <span aria-hidden className="section-filament-top" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 lg:mb-16">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5">The Journey</p>
            <h2
              className="font-serif text-foreground mb-7 hang-punct"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 3vw, 3.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              Eight moments,
              <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
                of a real day here.
              </span>
            </h2>
            <p
              className="text-muted-foreground leading-relaxed max-w-xl"
              style={{ fontSize: "var(--text-body)" }}
            >
              Adventure and introspection. Activation and restoration. The room is the medicine — and these are some of the rooms inside it.
            </p>
          </div>
        </div>

        {/* 8-tile asymmetric bento.
            Mobile: simple stacked grid w/ 1-2 columns.
            Desktop: 12-col asymmetric mosaic. */}
        <div className="journey-grid grid grid-cols-2 lg:grid-cols-12 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[200px] gap-3 sm:gap-4 lg:gap-5">
          <MomentTile
            moment={moments[0]}
            className="col-span-2 row-span-2 lg:col-span-5 lg:row-span-3"
            onOpen={() => setOpenMoment(moments[0])}
            index={0}
          />
          <MomentTile
            moment={moments[1]}
            className="col-span-1 row-span-1 lg:col-span-4 lg:row-span-2"
            delay={80}
            onOpen={() => setOpenMoment(moments[1])}
            index={1}
          />
          <MomentTile
            moment={moments[2]}
            className="col-span-1 row-span-1 lg:col-span-3 lg:row-span-2"
            delay={160}
            onOpen={() => setOpenMoment(moments[2])}
            index={2}
          />
          <MomentTile
            moment={moments[3]}
            className="col-span-1 row-span-1 lg:col-span-3 lg:row-span-2"
            delay={240}
            onOpen={() => setOpenMoment(moments[3])}
            index={3}
          />
          <MomentTile
            moment={moments[4]}
            className="col-span-1 row-span-1 lg:col-span-4 lg:row-span-2"
            delay={320}
            onOpen={() => setOpenMoment(moments[4])}
            index={4}
          />
          <MomentTile
            moment={moments[5]}
            className="col-span-2 row-span-2 lg:col-span-7 lg:row-span-2"
            delay={400}
            onOpen={() => setOpenMoment(moments[5])}
            index={5}
          />
          <MomentTile
            moment={moments[6]}
            className="col-span-1 row-span-1 lg:col-span-5 lg:row-span-2"
            delay={480}
            onOpen={() => setOpenMoment(moments[6])}
            index={6}
          />
          <MomentTile
            moment={moments[7]}
            className="col-span-1 row-span-1 lg:col-span-7 lg:row-span-2"
            delay={560}
            onOpen={() => setOpenMoment(moments[7])}
            index={7}
          />
        </div>

        <style>{`
          @keyframes journeyKenBurns {
            0%   { transform: scale(1.02) translate3d(0, 0, 0); }
            50%  { transform: scale(1.09) translate3d(-1.5%, -1%, 0); }
            100% { transform: scale(1.02) translate3d(0, 0, 0); }
          }
          .journey-tile {
            content-visibility: auto;
            contain-intrinsic-size: 200px 200px;
          }
          .journey-tile-img {
            animation: journeyKenBurns 22s ease-in-out infinite;
            will-change: transform;
            transition: transform 1.6s ease-out;
          }
          @media (hover: hover) and (pointer: fine) {
            .journey-tile:hover .journey-tile-img { animation-play-state: paused; transform: scale(1.07); }
            .journey-grid:hover .journey-tile { filter: saturate(0.42) brightness(0.92); transition: filter 600ms cubic-bezier(0.22, 1, 0.36, 1); }
            .journey-grid .journey-tile:hover { filter: saturate(1) brightness(1); }
          }
          @media (prefers-reduced-motion: reduce) {
            .journey-tile-img { animation: none !important; transform: scale(1.02); }
            .journey-grid:hover .journey-tile { filter: none; }
          }
        `}</style>
      </div>

      {openMoment && <Lightbox moment={openMoment} onClose={() => setOpenMoment(null)} />}
    </section>
  );
}
