import { useEffect, useRef, useState } from "react";

/**
 * v3.6 — The Five That Matter (was Seven Decisions).
 *
 * Compressed to 5 cards. Body text always visible (no expand/collapse).
 * Topped by ONE signature provocation: "We do not pay referral fees."
 */

type Decision = {
  label: string;
  headline: string;
  italic: string;
  body: string;
};

const decisions: Decision[] = [
  {
    label: "Privacy",
    headline: "Universal NDAs.",
    italic: "Cover-story by default.",
    body:
      "Federal 42 CFR Part 2 protects substance-use records above the HIPAA standard. Every clinician, housekeeper, driver, and contractor signs the same NDA on day one. Correspondence runs under the Sanctuary Wellness & Longevity Institute DBA. Your name is never on a clinical envelope unless you ask for it to be.",
  },
  {
    label: "Speed of admission",
    headline: "Thirty-minute callback.",
    italic: "Decision in 24–72 hours.",
    body:
      "A masters-level clinician returns the first call within thirty minutes, day or night. From inquiry to a written admission decision, three business days at the outside.",
  },
  {
    label: "Clinical reputation",
    headline: "Named leadership.",
    italic: "On the line.",
    body:
      "The Medical Director and Clinical Director are the brand. Both are board-certified, both review every case personally, and both answer professional inquiries directly.",
  },
  {
    label: "Business continuity",
    headline: "A cottage with a desk.",
    italic: "Encrypted comms.",
    body:
      "The Chairman's Cottage is a detached residence with a hardened workspace — secure video, encrypted email. Trusted counterparties scheduled into windows. Most principals keep a quiet two-hour daily window. The clinical program is composed around the window, not the other way around.",
  },
  {
    label: "Family program",
    headline: "Concurrent. Not bolted on.",
    italic: "",
    body:
      "Spouse and adult-child intensives run on the estate during the principal's program. Separate residence, shared clinical team, integrated weekly conjoint sessions.",
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
  return (
    <section
      id="seven-decisions"
      className="py-24 lg:py-36 bg-background scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* PROVOCATION CARD — the brand's clearest single moment */}
        <Provocation />

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 lg:mb-20 mt-24 lg:mt-28">
          <div className="lg:col-span-9">
            <p className="eyebrow mb-5">What Principals Weigh</p>
            <h2
              className="font-serif text-foreground hang-punct"
              style={{
                fontSize: "clamp(2rem, 1.4rem + 2.8vw, 3.75rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.024em",
                fontWeight: 650,
              }}
            >
              Five that matter.
              <span
                className="block editorial-italic text-foreground/70"
                style={{ fontWeight: 400 }}
              >
                Privacy and speed lead.
              </span>
            </h2>
            <p
              className="text-foreground/80 leading-relaxed max-w-2xl mt-7"
              style={{ fontSize: "var(--text-body)" }}
            >
              Families and their advisors weigh five things when choosing a residential program. We built around the order they actually use.
            </p>
          </div>
        </div>

        {/* 5 cards in mosaic — Privacy 7, Speed 5, Clinical 4, Continuity 4, Family 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-border">
          <DecisionCard d={decisions[0]} className="lg:col-span-7" emphasis />
          <DecisionCard d={decisions[1]} className="lg:col-span-5" emphasis />
          <DecisionCard d={decisions[2]} className="lg:col-span-4" />
          <DecisionCard d={decisions[3]} className="lg:col-span-4" />
          <DecisionCard d={decisions[4]} className="lg:col-span-4" />
        </div>

        {/* Quiet footer — Aftercare + Location compressed */}
        <p className="mt-10 text-sm text-muted-foreground italic max-w-3xl leading-relaxed">
          Ninety minutes from Charlotte. Two-year aftercare horizon. Both included.
        </p>
      </div>
    </section>
  );
}

function Provocation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`relative bg-navy text-ivory p-10 sm:p-14 lg:p-20 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Subtle ember wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(60% 80% at 80% 50%, color-mix(in oklab, var(--ember) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="relative max-w-3xl">
        <p className="eyebrow text-amber mb-6">A signature commitment</p>
        <p
          className="font-serif text-ivory editorial-italic text-luxe"
          style={{
            fontSize: "clamp(2rem, 1.4rem + 3.4vw, 4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.028em",
            fontWeight: 600,
          }}
        >
          &ldquo;We do not pay referral fees.&rdquo;
        </p>
        <p
          className="mt-6 font-serif text-ivory/85 leading-snug max-w-xl"
          style={{ fontSize: "var(--text-lead)", fontWeight: 400 }}
        >
          — and the only metric we publish is how often we say no.
        </p>
      </div>
    </div>
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
  return (
    <div
      ref={ref}
      className={`bg-background ${className} transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${emphasis ? "p-10 lg:p-14" : "p-8 lg:p-10"}`}
    >
      <p className="small-caps text-amber text-[11px] tracking-[0.28em] mb-5 font-semibold">
        {d.label}
      </p>
      <h3
        className="font-serif text-foreground mb-5 hang-punct"
        style={{
          fontSize: emphasis
            ? "clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)"
            : "var(--text-h4)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          fontWeight: 650,
        }}
      >
        {d.headline}
        {d.italic ? (
          <span
            className="block editorial-italic text-foreground/70"
            style={{ fontWeight: 400 }}
          >
            {d.italic}
          </span>
        ) : null}
      </h3>
      <p
        className="text-foreground/75 leading-relaxed max-w-prose"
        style={{ fontSize: "var(--text-small)" }}
      >
        {d.body}
      </p>
    </div>
  );
}
