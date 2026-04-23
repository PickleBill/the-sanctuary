import { useEffect, useRef, useState } from "react";

type Pair = {
  id: string;
  index: string;
  clinical: { title: string; desc: string };
  holistic: { title: string; desc: string };
  synthesis: string;
};

const pairs: Pair[] = [
  {
    id: "supervision-coaching",
    index: "01",
    clinical: {
      title: "24/7 Medical Supervision",
      desc: "Board-certified physicians and nursing staff on-site continuously.",
    },
    holistic: {
      title: "Executive Coaching",
      desc: "Confidential 1:1 sessions with C-suite-experienced practitioners.",
    },
    synthesis: "Clinical safety, executive cadence.",
  },
  {
    id: "genetic-nutrition",
    index: "02",
    clinical: {
      title: "Genetic Testing",
      desc: "Personalized pharmacology informed by your individual genome.",
    },
    holistic: {
      title: "Gourmet Nutrition",
      desc: "Private chef cuisine designed by metabolic and functional dietitians.",
    },
    synthesis: "Your genome, on the plate.",
  },
  {
    id: "neuro-plunge",
    index: "03",
    clinical: {
      title: "Neuro-Feedback",
      desc: "Advanced brain-mapping to recalibrate executive function and rest.",
    },
    holistic: {
      title: "Cold Plunge & Sauna",
      desc: "Daily contrast therapy paired with somatic recovery rituals.",
    },
    synthesis: "Nervous system, retrained.",
  },
  {
    id: "psychiatry-equestrian",
    index: "04",
    clinical: {
      title: "Integrative Psychiatry",
      desc: "Trauma-informed care from leaders in addiction medicine.",
    },
    holistic: {
      title: "Equestrian & Nature Therapy",
      desc: "Quiet, embodied work conducted across our private acreage.",
    },
    synthesis: "Insight, embodied.",
  },
];

function Plate({
  side,
  index,
  title,
  desc,
  active,
  dimmed,
  onEnter,
  onLeave,
}: {
  side: "clinical" | "holistic";
  index: string;
  title: string;
  desc: string;
  active: boolean;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const align = side === "clinical" ? "lg:text-right lg:items-end" : "lg:text-left lg:items-start";
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={() => (active ? onLeave() : onEnter())}
      tabIndex={0}
      role="button"
      aria-pressed={active}
      className={[
        "group relative flex flex-col gap-3 px-6 py-6 lg:px-10 lg:py-9",
        "border-t border-white/10 cursor-pointer outline-none",
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        align,
        active ? "bg-white/[0.04]" : "",
        dimmed ? "opacity-30" : "opacity-100",
      ].join(" ")}
    >
      <div className="flex items-baseline gap-3 lg:flex-row-reverse lg:[&>*]:order-none">
        <span className="small-caps text-ivory/45 text-[10px] tracking-[0.32em]">
          {side === "clinical" ? "Clinical" : "Holistic"} · <span className="tabular">{index}</span>
        </span>
      </div>
      <h4
        className="font-serif text-ivory leading-[1.15]"
        style={{ fontSize: "var(--text-h4)", fontWeight: 500 }}
      >
        {title}
      </h4>
      <div
        className={[
          "h-px w-12 bg-amber transition-all duration-700",
          side === "clinical" ? "lg:self-end" : "lg:self-start",
          active ? "w-24 opacity-100" : "opacity-50",
        ].join(" ")}
      />
      <p
        className={[
          "text-sm text-ivory/65 leading-relaxed max-w-sm",
          "transition-all duration-700",
          active ? "opacity-100 max-h-32 mt-1" : "opacity-0 max-h-0 overflow-hidden",
        ].join(" ")}
      >
        {desc}
      </p>
    </div>
  );
}

export function SynergyMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const active = pairs.find((p) => p.id === activeId) ?? null;

  return (
    <section
      ref={sectionRef}
      id="synergy"
      className="relative py-28 lg:py-40 bg-navy text-ivory scroll-mt-24 overflow-hidden"
    >
      {/* ambient glow — reduced from 60% to 25% per /quieter pass */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 25%, color-mix(in oklab, var(--amber) 6%, transparent), transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading — /distill: one thing this section says is "two disciplines, one program."
            Strip the "Hover any modality…" instruction; let interaction be discovered. */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <p className="eyebrow mb-5 !text-amber">
            <span className="luxe-rule mr-3" /> The Synergy Map
          </p>
          <h2
            className="font-serif text-ivory leading-[1.06]"
            style={{
              fontSize: "clamp(2rem, 1.5rem + 3vw, 3.75rem)",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Medicine and meaning,
            <br />
            <span className="editorial-italic text-ivory/75" style={{ fontWeight: 400 }}>
              composed as one program.
            </span>
          </h2>
          <p className="text-ivory/55 mt-7 leading-relaxed max-w-lg mx-auto editorial-italic" style={{ fontSize: "var(--text-body)" }}>
            Every clinical intervention is paired with an embodied counterpart.
          </p>
        </div>

        {/* Canvas */}
        <div className="relative">
          {/* Centerline axis (desktop only) */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--amber) 50%, transparent) 12%, color-mix(in oklab, var(--amber) 50%, transparent) 88%, transparent)",
            }}
          />

          {/* Column headers */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] gap-0 mb-2">
            <div className="text-right pr-10">
              <p className="eyebrow !text-ivory/40">Clinical Foundation</p>
            </div>
            <div className="w-px" />
            <div className="text-left pl-10">
              <p className="eyebrow !text-ivory/40">Holistic Restoration</p>
            </div>
          </div>

          {/* Rows */}
          <div className="relative">
            {pairs.map((pair, i) => {
              const isActive = activeId === pair.id;
              const isDimmed = activeId !== null && !isActive;
              return (
                <div
                  key={pair.id}
                  className={[
                    "grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-stretch",
                    "transition-opacity duration-1000",
                    visible ? "opacity-100" : "opacity-0 translate-y-4",
                  ].join(" ")}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {/* Clinical plate */}
                  <Plate
                    side="clinical"
                    index={pair.index}
                    title={pair.clinical.title}
                    desc={pair.clinical.desc}
                    active={isActive}
                    dimmed={isDimmed}
                    onEnter={() => setActiveId(pair.id)}
                    onLeave={() => setActiveId(null)}
                  />

                  {/* Filament + node — line draws in from left at row entry */}
                  <div className="hidden lg:flex relative w-24 items-center justify-center">
                    {/* Horizontal filament with /animate filament-draw */}
                    <div
                      className={[
                        "absolute left-0 right-0 h-px transition-colors duration-500",
                        isActive ? "bg-amber" : "bg-ivory/15",
                        visible ? "filament-draw" : "scale-x-0",
                      ].join(" ")}
                      style={{
                        animationDelay: `${500 + i * 140}ms`,
                        transformOrigin: "left center",
                      }}
                    />
                    {/* Node diamond — restrained shadow per /quieter */}
                    <span
                      className={[
                        "relative z-10 block w-2 h-2 rotate-45 transition-all duration-500",
                        isActive
                          ? "bg-amber scale-150"
                          : "bg-amber/55",
                      ].join(" ")}
                      style={
                        isActive
                          ? { boxShadow: "0 0 12px color-mix(in oklab, var(--amber) 45%, transparent)" }
                          : undefined
                      }
                    />
                  </div>

                  {/* Holistic plate */}
                  <Plate
                    side="holistic"
                    index={pair.index}
                    title={pair.holistic.title}
                    desc={pair.holistic.desc}
                    active={isActive}
                    dimmed={isDimmed}
                    onEnter={() => setActiveId(pair.id)}
                    onLeave={() => setActiveId(null)}
                  />

                  {/* Mobile pairing — vertical filament between the two plates */}
                  <div
                    aria-hidden
                    className="lg:hidden col-span-1 flex items-center justify-center py-3"
                  >
                    <span
                      className={[
                        "block w-px transition-all duration-500",
                        isActive ? "bg-amber h-10" : "bg-amber/30 h-6",
                      ].join(" ")}
                    />
                  </div>

                  {/* Mobile pairing badge — own row with breathing room so it never collides with the next eyebrow */}
                  {isActive && (
                    <div className="lg:hidden col-span-1 px-6 pt-2 pb-8 mb-2 border-b border-amber/20">
                      <div className="flex items-start gap-3">
                        <span className="text-amber pt-1.5 text-xs leading-none">◆</span>
                        <p className="editorial-italic font-serif text-base text-ivory/90 leading-snug">
                          {pair.synthesis}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {/* Bottom border for last row */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]">
              <div className="border-t border-white/10" />
              <div className="hidden lg:block w-24" />
              <div className="border-t border-white/10" />
            </div>
          </div>

          {/* Floating synthesis chip (desktop) */}
          <div
            aria-live="polite"
            className={[
              "hidden lg:flex absolute left-1/2 -translate-x-1/2 -bottom-8",
              "items-center gap-3 px-6 py-3 bg-navy border border-amber/40",
              "transition-all duration-500",
              active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
            ].join(" ")}
          >
            <span className="text-amber text-xs">◆</span>
            <p className="font-serif text-sm text-ivory italic">
              {active?.synthesis ?? ""}
            </p>
          </div>
        </div>

        {/* Credibility strip — pulled closer (mt-20 instead of mt-32) so it
            reads as the closer of the same thought, not a stranded footer. */}
        <div className="mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 border-y border-white/10">
          {[
            { figure: "4:1", label: "Staff-to-Guest Ratio" },
            { figure: "90", label: "Day Median Program" },
            { figure: "1", label: "Guest in Residence at a Time" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-navy px-8 py-12 text-center"
            >
              <p
                className="font-serif text-ivory mb-3 tabular"
                style={{ fontSize: "var(--text-h2)", lineHeight: 1, fontWeight: 500 }}
              >
                {stat.figure}
              </p>
              <p className="small-caps text-ivory/55 text-[11px] tracking-[0.28em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
