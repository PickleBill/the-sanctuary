import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "I",
    title: "Confidential Inquiry",
    desc: "A discreet first conversation with our intake director — names optional, no obligations.",
    invariant: "No records created.",
  },
  {
    num: "II",
    title: "Private Clinical Review",
    desc: "Independent medical assessment conducted under strict confidentiality, on your schedule, in person or via encrypted video.",
    invariant: "Findings retained only in the clinical EMR — never on the marketing systems.",
  },
  {
    num: "III",
    title: "Bespoke Program Design",
    desc: "Your program is composed across clinical, holistic, and executive workstreams — written for one family, not a cohort.",
    invariant: "Program documents shared encrypted; nothing leaves the estate.",
  },
  {
    num: "IV",
    title: "Quiet Arrival",
    desc: "Private transport from CLT or AVL, sealed perimeter, sanctuary that begins the moment the gate closes behind you.",
    invariant: "Staff under universal NDA. Identity disclosed only to those who must know.",
  },
];

function useInView<T extends HTMLElement>(threshold = 0.2) {
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

export function Process() {
  return (
    <section
      id="process"
      className="py-28 lg:py-40 bg-primary text-primary-foreground scroll-mt-24 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative">
        {/* /shape: header in left 8/12 columns, asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 lg:mb-20">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5">The Process</p>
            <h2
              className="font-serif text-primary-foreground mb-7 hang-punct"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 3vw, 3.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              Stealth intake.
              <span className="block editorial-italic text-primary-foreground/70" style={{ fontWeight: 400 }}>
                Considered care.
              </span>
            </h2>
            <p className="text-primary-foreground/65 leading-relaxed max-w-xl" style={{ fontSize: "var(--text-body)" }}>
              Four quiet steps from first contact to first morning on the estate. Each step carries its own privacy invariant — written, not implied.
            </p>
            {/* Geography — quiet catchment line, per investor thesis catchment map */}
            <p className="mt-6 text-primary-foreground/55 leading-relaxed max-w-xl text-[14px] lg:text-[15px]">
              Ninety minutes from Charlotte. Direct flights from Atlanta, Nashville, New York, and Washington into Asheville Regional. Private aviation handled estate-side.
            </p>
            {/* Cover-story footnote — single italic line, treated as marginalia */}
            <p className="mt-6 editorial-italic text-primary-foreground/45 max-w-xl text-[13px] lg:text-[14px] leading-relaxed">
              For correspondence and travel, we operate as the Sanctuary Wellness &amp; Longevity Institute.
            </p>
          </div>
        </div>

        {/* Vertical filament timeline */}
        <ol className="relative max-w-4xl">
          {/* Center filament */}
          <svg
            aria-hidden
            className="absolute left-[25px] md:left-[31px] top-2 bottom-2 w-px overflow-visible"
            preserveAspectRatio="none"
          >
            <line
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="100%"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 6"
              className="text-amber/50"
            />
          </svg>

          {steps.map((s, i) => (
            <Step key={s.num} step={s} index={i} />
          ))}
        </ol>

        {/* v3.7 — explicit close-the-loop CTA so the entire process has an obvious next step */}
        <div className="mt-16 lg:mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("concierge-form");
              const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
              el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
            }}
            className="cta-flame group inline-flex items-center gap-3 bg-amber text-amber-foreground px-7 py-4 small-caps text-[11px] tracking-[0.28em] font-semibold hover:-translate-y-0.5 transition-transform duration-300"
          >
            Begin a private conversation
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          <a
            href="tel:+18005550199"
            className="small-caps text-[11px] tracking-[0.24em] text-primary-foreground/70 hover:text-amber transition-colors tabular"
          >
            Or speak with intake — 24/7 · +1 (800) 555-0199
          </a>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const { ref, inView } = useInView<HTMLLIElement>(0.25);
  const jumpToForm = () => {
    const el = document.getElementById("concierge-form");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };
  return (
    <li
      ref={ref}
      className={`relative pl-[72px] md:pl-28 pb-12 lg:pb-16 last:pb-0 transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Numeral plate — now a button that jumps to the concierge form */}
      <button
        type="button"
        onClick={jumpToForm}
        aria-label={`Begin ${step.title}`}
        className="group absolute left-0 top-0 w-[52px] md:w-[64px] h-[52px] md:h-[64px] flex items-center justify-center bg-primary border border-amber/35 hover:border-amber hover:bg-amber transition-all duration-300"
      >
        <span
          className="drop-figure text-amber group-hover:text-amber-foreground transition-colors duration-300"
          style={{ fontSize: "clamp(1.5rem, 1.1rem + 1.4vw, 2rem)", fontWeight: 400 }}
        >
          {step.num}
        </span>
      </button>

      <h3
        className="font-serif text-primary-foreground mb-3 hang-punct"
        style={{ fontSize: "var(--text-h4)", lineHeight: 1.18, fontWeight: 500, letterSpacing: "-0.012em" }}
      >
        {step.title}
      </h3>
      <p className="text-[15px] lg:text-base text-primary-foreground/72 leading-[1.65] max-w-2xl mb-5">
        {step.desc}
      </p>
      {/* Privacy invariant — visually subordinate per /quieter and /distill */}
      <p className="max-w-2xl">
        <span className="editorial-italic text-[12px] lg:text-[13px] text-primary-foreground/50 leading-relaxed">
          <span className="small-caps text-amber/70 not-italic mr-2 tracking-[0.18em] text-[10px]">
            Privacy invariant
          </span>
          {step.invariant}
        </span>
      </p>
    </li>
  );
}
