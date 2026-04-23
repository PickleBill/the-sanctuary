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
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="eyebrow mb-5">
            <span className="luxe-rule mr-3" /> The Process
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-primary-foreground">
            Stealth intake. Considered care.
          </h2>
          <p className="mt-6 text-primary-foreground/70 text-base lg:text-lg leading-relaxed">
            Four quiet steps from first contact to first morning on the estate. Each step carries its own privacy invariant — written, not implied.
          </p>
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
  return (
    <li
      ref={ref}
      className={`relative pl-[72px] md:pl-28 pb-12 lg:pb-16 last:pb-0 transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Numeral plate */}
      <div className="absolute left-0 top-0 w-[52px] md:w-[64px] h-[52px] md:h-[64px] flex items-center justify-center bg-primary border border-amber/40">
        <span
          className="font-serif text-amber tabular"
          style={{ fontSize: "clamp(1.25rem, 0.9rem + 1vw, 1.75rem)", fontWeight: 400 }}
        >
          {step.num}
        </span>
      </div>

      <h3
        className="font-serif text-primary-foreground mb-3"
        style={{ fontSize: "var(--text-h4)", lineHeight: 1.2, fontWeight: 500 }}
      >
        {step.title}
      </h3>
      <p className="text-[15px] lg:text-base text-primary-foreground/75 leading-relaxed max-w-2xl mb-4">
        {step.desc}
      </p>
      <p className="flex items-start gap-3 max-w-2xl">
        <span className="luxe-rule mt-[10px] shrink-0" aria-hidden />
        <span className="editorial-italic text-[12px] lg:text-[13px] text-primary-foreground/55 leading-relaxed">
          <span className="small-caps text-amber/80 not-italic mr-2 tracking-[0.22em] text-[10px]">
            Privacy invariant
          </span>
          {step.invariant}
        </span>
      </p>
    </li>
  );
}
