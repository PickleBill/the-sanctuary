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
      tabIndex={0}
      className={[
        "group relative flex flex-col gap-3 px-6 py-7 lg:px-10 lg:py-9",
        "border-t border-white/10 cursor-default outline-none",
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        align,
        active ? "bg-white/[0.04]" : "",
        dimmed ? "opacity-30" : "opacity-100",
      ].join(" ")}
    >
      <div className="flex items-baseline gap-3 lg:flex-row-reverse lg:[&>*]:order-none">
        <span className="text-amber/70 text-[0.65rem] font-medium tracking-[0.32em]">
          {side === "clinical" ? "CLINICAL" : "HOLISTIC"} · {index}
        </span>
      </div>
      <h4 className="font-serif text-xl lg:text-2xl text-ivory leading-tight">
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
          "text-sm text-ivory/60 leading-relaxed max-w-sm",
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
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, color-mix(in oklab, var(--amber) 10%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <p className="eyebrow mb-5 !text-amber">
            <span className="luxe-rule mr-3" /> The Synergy Map — Two Disciplines, One Protocol
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory leading-[1.1]">
            Medicine and meaning,
            <br />
            <span className="italic text-ivory/80">composed as one program.</span>
          </h2>
          <p className="text-ivory/60 mt-6 text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
            Every clinical intervention is paired with an embodied counterpart.
            Hover any modality to reveal its synthesis.
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

                  {/* Filament + node */}
                  <div className="hidden lg:flex relative w-24 items-center justify-center">
                    {/* Horizontal filament */}
                    <div
                      className={[
                        "absolute left-0 right-0 h-px transition-all duration-700",
                        isActive
                          ? "bg-amber opacity-100"
                          : "bg-ivory/20 opacity-60",
                      ].join(" ")}
                      style={{
                        transform: visible ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "center",
                        transitionDelay: `${600 + i * 120}ms`,
                      }}
                    />
                    {/* Node diamond */}
                    <span
                      className={[
                        "relative z-10 block w-2 h-2 rotate-45 transition-all duration-500",
                        isActive
                          ? "bg-amber scale-150 shadow-[0_0_18px_rgba(180,83,9,0.7)]"
                          : "bg-amber/50",
                      ].join(" ")}
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

                  {/* Mobile pairing badge */}
                  {isActive && (
                    <div className="lg:hidden col-span-1 px-6 pb-6 -mt-2">
                      <p className="text-xs text-amber tracking-[0.28em] uppercase">
                        ◆ {pair.synthesis}
                      </p>
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

        {/* Credibility strip */}
        <div className="mt-32 lg:mt-40 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 border-y border-white/10">
          {[
            { figure: "4:1", label: "Staff-to-Guest Ratio" },
            { figure: "90", label: "Day Median Program" },
            { figure: "1", label: "Guest in Residence at a Time" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-navy px-8 py-10 text-center"
            >
              <p className="font-serif text-4xl lg:text-5xl text-ivory mb-2">
                {stat.figure}
              </p>
              <p className="eyebrow !text-ivory/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
