import { useEffect, useRef, useState } from "react";

/**
 * The Seven Decisions — keyed to the criteria HNW principals and their
 * advisors actually weigh (per investor thesis vol II). Visual emphasis
 * carries the weight: Privacy 30% and Speed 20% get the larger plates.
 *
 * Composition: an asymmetric mosaic, not a uniform grid. The four heaviest
 * criteria sit in the top two rows at full editorial scale; the three
 * lighter ones tuck into a quieter strip below.
 */

type Decision = {
  weight: number; // 0–30
  label: string;
  headline: string; // first half (roman)
  italic: string; // completion (italic)
  body: string;
};

const decisions: Decision[] = [
  {
    weight: 30,
    label: "Privacy",
    headline: "Universal NDAs.",
    italic: "Cover-story by default.",
    body:
      "Every clinician, housekeeper, driver, and contractor signs the same NDA on day one. Mail, deliveries, and travel manifests carry the Sanctuary Wellness & Longevity Institute name — never the clinical line.",
  },
  {
    weight: 20,
    label: "Speed of admission",
    headline: "Thirty-minute callback.",
    italic: "Decision in 24–72 hours.",
    body:
      "A masters-level clinician returns the first call within thirty minutes, day or night. From inquiry to a written admission decision, three business days at the outside.",
  },
  {
    weight: 15,
    label: "Clinical reputation",
    headline: "Named leadership.",
    italic: "On the line.",
    body:
      "The Medical Director and Clinical Director are the brand. Both are board-certified, both review every case personally, and both answer professional inquiries directly.",
  },
  {
    weight: 12,
    label: "Business continuity",
    headline: "A cottage with a desk.",
    italic: "Encrypted comms.",
    body:
      "The Chairman's Cottage is built for the principal who cannot disappear. Secure workspace, hardened video, scheduled windows for trusted counterparties.",
  },
  {
    weight: 10,
    label: "Family program",
    headline: "Concurrent, not bolted on.",
    italic: "",
    body:
      "Spouse and adult-child intensives run on the estate during the principal's program. Separate residence, shared clinical team, integrated weekly conjoint sessions.",
  },
  {
    weight: 8,
    label: "Location",
    headline: "Blue Ridge corridor.",
    italic: "",
    body:
      "Ninety minutes from Charlotte. Direct flights from Atlanta, Nashville, New York, and DC into Asheville Regional. Private aviation handled estate-side.",
  },
  {
    weight: 5,
    label: "Aftercare",
    headline: "Two-year horizon.",
    italic: "",
    body:
      "Discharge is the midpoint, not the finish. Twelve and twenty-four month follow-up cadence with the same clinical team, in person or by encrypted call.",
  },
];

function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function SevenDecisions() {
  const heavy = decisions.slice(0, 4); // Privacy, Speed, Clinical, Continuity
  const lighter = decisions.slice(4); // Family, Location, Aftercare

  return (
    <section
      id="seven-decisions"
      className="py-28 lg:py-40 bg-background scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header — same asymmetric 8/12 pattern */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 lg:mb-20">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5">
              <span className="luxe-rule mr-3" /> What Principals Weigh
            </p>
            <h2
              className="font-serif text-foreground mb-7 hang-punct"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 3vw, 3.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              Seven decisions.
              <span
                className="block editorial-italic text-foreground/70"
                style={{ fontWeight: 400 }}
              >
                Half of them are privacy and speed.
              </span>
            </h2>
            <p
              className="text-muted-foreground leading-relaxed max-w-xl"
              style={{ fontSize: "var(--text-body)" }}
            >
              Families and their advisors weigh seven things when choosing a
              residential program. We built Sanctuary Southeast around the
              order of operations they actually use — not the order brochures
              prefer.
            </p>
          </div>
        </div>

        {/* Heavy four — 12-col asymmetric mosaic.
             Privacy + Speed get 7/5, Clinical + Continuity get 5/7. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-border mb-px">
          <DecisionCard d={heavy[0]} className="lg:col-span-7" emphasis />
          <DecisionCard d={heavy[1]} className="lg:col-span-5" emphasis />
          <DecisionCard d={heavy[2]} className="lg:col-span-5" emphasis />
          <DecisionCard d={heavy[3]} className="lg:col-span-7" emphasis />
        </div>

        {/* Lighter three — quieter horizontal strip */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
          {lighter.map((d) => (
            <DecisionCard key={d.label} d={d} className="" />
          ))}
        </div>
      </div>
    </section>
  );
}

function DecisionCard({
  d,
  className,
  emphasis = false,
}: {
  d: Decision;
  className: string;
  emphasis?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  return (
    <div
      ref={ref}
      className={`bg-background ${className} transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`w-full text-left ${
          emphasis ? "p-10 lg:p-14" : "p-8 lg:p-10"
        } group transition-colors hover:bg-secondary/40`}
      >
        {/* Weight indicator + label — small-caps, tabular */}
        <div className="flex items-baseline justify-between mb-6">
          <p className="small-caps text-foreground/55 text-[11px] tracking-[0.24em]">
            {d.label}
          </p>
          <p
            className="tabular text-foreground/35 text-[11px]"
            aria-label={`${d.weight} percent of the decision`}
          >
            {String(d.weight).padStart(2, "0")}
            <span className="text-foreground/25"> / 100</span>
          </p>
        </div>

        {/* Headline — same roman-then-italic pattern as section heads */}
        <h3
          className="font-serif text-foreground mb-5 hang-punct"
          style={{
            fontSize: emphasis
              ? "clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)"
              : "var(--text-h4)",
            lineHeight: 1.12,
            letterSpacing: "-0.018em",
            fontWeight: 500,
          }}
        >
          {d.headline}
          {d.italic ? (
            <span
              className="block editorial-italic text-foreground/65"
              style={{ fontWeight: 400 }}
            >
              {d.italic}
            </span>
          ) : null}
        </h3>

        {/* Expand affordance — quiet amber line + caption that flips on open */}
        <div className="flex items-center gap-3">
          <span
            className={`block h-px bg-amber transition-all duration-500 ${
              open ? "w-16" : "w-8 group-hover:w-12"
            }`}
            aria-hidden
          />
          <span className="small-caps text-foreground/55 group-hover:text-amber transition-colors text-[10px] tracking-[0.28em]">
            {open ? "Less" : "More"}
          </span>
        </div>

        {/* Inline expansion — height-animated, smooth, respects reduced-motion via global guard */}
        <div
          className={`overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-out ${
            open ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <p
            className="text-muted-foreground leading-relaxed max-w-prose"
            style={{ fontSize: "var(--text-small)" }}
          >
            {d.body}
          </p>
        </div>
      </button>
    </div>
  );
}
