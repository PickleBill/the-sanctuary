import { useEffect, useRef, useState } from "react";
import suite from "@/assets/gallery-suite-v2.jpg";
import boardroom from "@/assets/gallery-boardroom-v2.jpg";
import grounds from "@/assets/gallery-grounds-v2.jpg";
import clinical from "@/assets/gallery-clinical-v2.jpg";
import trail from "@/assets/day-3-trail.jpg";
import court from "@/assets/amenity-pickleball.jpg";
import horse from "@/assets/journey-2-horse.jpg";
import sauna from "@/assets/day-4-sauna.jpg";

/**
 * v3.9.1 — Eight-panel Estate mosaic (restored from v3.7).
 *
 * Layout (12-col, lg+):
 *   Row A: Suite (col 7, row-span-2, tall) · Grounds (col 5)
 *   Row B: ↑ Suite continues             · Horse  (col 5)
 *   Row C: Trail (col 6)                 · Sauna  (col 6)
 *   Row D: Court (col 3) · Boardroom (col 3) · Clinical (col 3) · empty (col 3)
 *     → on lg we use col 4/4/4 across the bottom row to keep tiles
 *       wide enough to read. Final layout below.
 *
 * Mobile collapses to a single column with each tile at aspect-[4/5].
 *
 * Polish kept from v3.8:
 *   - Slow Ken Burns drift (paused for prefers-reduced-motion).
 *   - Sibling-desaturate-on-hover magic moment.
 *   - Title underline draws on hover; corner expand glyph on desktop.
 *   - Mobile-persistent amber "Open →" chip top-right.
 *   - Lightbox unchanged.
 */

type Frame = {
  src: string;
  title: string;
  caption: string;
  long: string;
};

const frames: Frame[] = [
  {
    src: suite,
    title: "Private Suite",
    caption:
      "Single-occupancy residence wings with bespoke linens, library nooks, and a personal concierge.",
    long:
      "Each suite is dressed for a single principal. Bespoke linens, an in-room library curated to the guest's interests, blackout drapes for jet-lagged arrivals, and a concierge who is the same person from check-in to discharge. There is no front desk. There is no posted schedule. The room your assistant would book if she knew exactly what you needed.",
  },
  {
    src: grounds,
    title: "Therapeutic Grounds",
    caption:
      "Two hundred acres of oak-shaded gardens, walking meditations, and quiet water.",
    long:
      "Two hundred and twelve acres of mature white-oak canopy, a stocked pond, three miles of soft-surface walking trails, and a meditation pavilion sited where the morning mist breaks across the ridge. You will walk this ridge more than you expect to. The land does most of the work.",
  },
  {
    src: horse,
    title: "Morning Ride",
    caption:
      "A small string of quiet horses, an unhurried hour at the ridgeline.",
    long:
      "A short ride before breakfast — a quiet, well-mannered string, an hour out and back on the south ridgeline. Coffee waiting at the trailhead. For some guests it becomes the favorite hour of the week; for others, never opted into. Available on request, never on a clock.",
  },
  {
    src: trail,
    title: "The Trail",
    caption:
      "Three miles of soft-surface trail through white-oak canopy.",
    long:
      "The trail is the program's quiet spine. Three soft-surface miles, marked at the half-mile and looped twice for an unhurried hour. Walked alone before breakfast or with a clinician at noon — most of the breakthroughs in any week here happen somewhere along it. The land does most of the work.",
  },
  {
    src: sauna,
    title: "Sauna & Recovery",
    caption:
      "Cedar sauna, cold plunge, and a long room for nothing in particular.",
    long:
      "A finished cedar sauna sits at the lower garden, paired with a cold plunge and a long, sun-lit recovery room with reformer mats and one good chair. Used after the trail, before dinner, or simply when the day deserves a pause.",
  },
  {
    src: court,
    title: "The Court",
    caption:
      "Pickleball at golden hour, with a peer who outranks the small talk.",
    long:
      "A private court tucked beyond the orchard, fenced in cedar so it disappears from the main lawns. Played at golden hour with a small circle of peers in residence — the kind of game that ends with a long conversation on the bench, not a scoreboard. Paddles waiting; we'll bring the cold towels.",
  },
  {
    src: boardroom,
    title: "Executive Boardroom",
    caption:
      "Sound-proofed, encrypted spaces for uninterrupted leadership.",
    long:
      "Acoustically sealed, hardened against signal interception, with redundant fiber and a secure video stack vetted by an outside firm. Built for the principal who cannot disappear. Scheduled use windows protect the rest of the program — for the calls you can't miss, and the discipline to use it sparingly.",
  },
  {
    src: clinical,
    title: "Clinical Wellness Suite",
    caption:
      "Five-star medical environments staffed by board-certified specialists.",
    long:
      "Procedure room, infusion bay, and recovery suite finished to a standard most hospitals cannot match. Board-certified physicians on the estate; sub-specialty consults arranged within twenty-four hours when called for. Medicine, dressed like hospitality.",
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

function FramePanel({
  frame,
  className = "",
  delay = 0,
  driftDelay = 0,
  onOpen,
}: {
  frame: Frame;
  className?: string;
  delay?: number;
  driftDelay?: number;
  onOpen: () => void;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <figure
      ref={ref}
      className={`gallery-panel group relative overflow-hidden bg-card transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Expand ${frame.title}`}
        className="block w-full h-full text-left"
      >
        <div className="w-full h-full overflow-hidden relative">
          <img
            src={frame.src}
            alt={frame.title}
            loading="lazy"
            decoding="async"
            width={1280}
            height={960}
            className="gallery-kenburns w-full h-full object-cover"
            style={{ animationDelay: `${driftDelay}s` }}
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, color-mix(in oklab, var(--navy) 78%, transparent) 100%)",
          }}
          aria-hidden
        />

        {/* Mobile-persistent "Open" chip — tells touch users this is interactive */}
        <span
          aria-hidden
          className="absolute top-4 right-4 lg:hidden inline-flex items-center gap-1.5 bg-amber/95 text-amber-foreground px-3 py-1.5 small-caps text-[10px] tracking-[0.22em] font-semibold"
        >
          Open <span aria-hidden>→</span>
        </span>

        <figcaption className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-ivory transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="small-caps text-amber/85 mb-2 text-[11px] tracking-[0.24em]">
                {frame.title.split(" ")[0]}
              </p>
              <h3
                className="font-serif text-xl lg:text-2xl mb-2 hang-punct gallery-title relative inline-block"
                style={{ fontWeight: 500, lineHeight: 1.12, letterSpacing: "-0.012em" }}
              >
                {frame.title}
              </h3>
              <p className="text-[14px] text-ivory/75 max-w-md leading-[1.6]">
                {frame.caption}
              </p>
            </div>
            {/* Expand affordance — quiet plus icon, ember on hover */}
            <span
              className="hidden lg:inline-flex shrink-0 items-center justify-center w-10 h-10 border border-ivory/30 group-hover:border-ember group-hover:bg-ember/10 transition-colors duration-500"
              aria-hidden
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ivory group-hover:text-ember transition-colors">
                <path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" />
              </svg>
            </span>
          </div>
        </figcaption>
      </button>
    </figure>
  );
}

function Lightbox({ frame, onClose }: { frame: Frame; onClose: () => void }) {
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
      aria-label={frame.title}
    >
      <button
        className="absolute inset-0 bg-navy/85 lb-backdrop"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-0 max-h-[92vh] overflow-y-auto lb-panel">
        <div className="lg:col-span-7 bg-navy">
          <img
            src={frame.src}
            alt={frame.title}
            className="w-full h-full object-cover"
            style={{ maxHeight: "92vh" }}
          />
        </div>
        <div className="lg:col-span-5 bg-background p-8 lg:p-10 flex flex-col">
          <p className="small-caps text-amber text-[11px] tracking-[0.28em] mb-3">
            {frame.title.split(" ")[0]}
          </p>
          <h3
            className="font-serif text-foreground mb-5 hang-punct"
            style={{ fontSize: "var(--text-h3)", lineHeight: 1.1, fontWeight: 500, letterSpacing: "-0.02em" }}
          >
            {frame.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-8" style={{ fontSize: "var(--text-body)" }}>
            {frame.long}
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

export function Gallery() {
  const [openFrame, setOpenFrame] = useState<Frame | null>(null);

  return (
    <section id="gallery" className="py-28 lg:py-40 bg-background scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 lg:mb-20">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5">The Estate</p>
            <h2
              className="font-serif text-foreground mb-7 hang-punct"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 3vw, 3.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              A sanctuary
              <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
                worth coming to.
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl" style={{ fontSize: "var(--text-body)" }}>
              Two hundred private acres in the Blue Ridge — gated, composed for a single family in residence at a time. Stone-and-cedar architecture, century-old oaks, an infinity pool that reads the ridgeline, and a dining room that fills, most nights, with quiet conversation.
            </p>
          </div>
        </div>

        {/*
          v3.9.1 mosaic, 12-col on desktop:
          Row A: Suite (7, row-span-2, tall) · Grounds (5)
          Row B: ↑ Suite continues          · Horse  (5)
          Row C: Trail (6)                  · Sauna  (6)
          Row D: Court (4) · Boardroom (4) · Clinical (4)
        */}
        <div className="gallery-grid grid grid-cols-1 lg:grid-cols-12 auto-rows-auto gap-4 lg:gap-6">
          {/* 1 — Suite (tall) */}
          <FramePanel
            frame={frames[0]}
            className="lg:col-span-7 lg:row-span-2 aspect-[4/5] lg:aspect-auto lg:min-h-[680px]"
            driftDelay={0}
            onOpen={() => setOpenFrame(frames[0])}
          />
          {/* 2 — Grounds */}
          <FramePanel
            frame={frames[1]}
            className="lg:col-span-5 aspect-[4/3]"
            delay={120}
            driftDelay={3}
            onOpen={() => setOpenFrame(frames[1])}
          />
          {/* 3 — Horse */}
          <FramePanel
            frame={frames[2]}
            className="lg:col-span-5 aspect-[4/3]"
            delay={200}
            driftDelay={6}
            onOpen={() => setOpenFrame(frames[2])}
          />
          {/* 4 — Trail */}
          <FramePanel
            frame={frames[3]}
            className="lg:col-span-6 aspect-[4/3]"
            delay={280}
            driftDelay={9}
            onOpen={() => setOpenFrame(frames[3])}
          />
          {/* 5 — Sauna */}
          <FramePanel
            frame={frames[4]}
            className="lg:col-span-6 aspect-[4/3]"
            delay={360}
            driftDelay={12}
            onOpen={() => setOpenFrame(frames[4])}
          />
          {/* 6 — Court */}
          <FramePanel
            frame={frames[5]}
            className="lg:col-span-4 aspect-[4/3]"
            delay={440}
            driftDelay={15}
            onOpen={() => setOpenFrame(frames[5])}
          />
          {/* 7 — Boardroom */}
          <FramePanel
            frame={frames[6]}
            className="lg:col-span-4 aspect-[4/3]"
            delay={520}
            driftDelay={18}
            onOpen={() => setOpenFrame(frames[6])}
          />
          {/* 8 — Clinical */}
          <FramePanel
            frame={frames[7]}
            className="lg:col-span-4 aspect-[4/3]"
            delay={600}
            driftDelay={21}
            onOpen={() => setOpenFrame(frames[7])}
          />
        </div>

        {/* Magic moment: hovering one panel desaturates its siblings to focus the eye.
            Title underline draws beneath the hovered title. */}
        <style>{`
          @media (hover: hover) and (pointer: fine) {
            .gallery-grid:hover .gallery-panel { filter: saturate(0.4) brightness(0.92); transition: filter 600ms cubic-bezier(0.22, 1, 0.36, 1); }
            .gallery-grid .gallery-panel:hover { filter: saturate(1) brightness(1); }
          }
          .gallery-title::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: -3px;
            height: 1.5px;
            background: var(--amber);
            transform: scaleX(0);
            transform-origin: left center;
            transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .gallery-panel:hover .gallery-title::after { transform: scaleX(1); }
          @media (prefers-reduced-motion: reduce) {
            .gallery-grid:hover .gallery-panel { filter: none; }
            .gallery-title::after { display: none; }
          }
        `}</style>

      </div>

      {openFrame && <Lightbox frame={openFrame} onClose={() => setOpenFrame(null)} />}
    </section>
  );
}
