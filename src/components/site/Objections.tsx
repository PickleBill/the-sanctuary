import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * "What clients ask before they say yes."
 *
 * Three objections, each one selected because it's the highest-leverage
 * worry inside a known buyer concern (per investor thesis vol II §7).
 * Editorial accordion — quiet, single-open, no "FAQ" framing because
 * this is not a help center, it's the spine of the buying conversation.
 */

type Objection = {
  question: string;
  answer: React.ReactNode;
};

const objections: Objection[] = [
  {
    question: "I cannot be away from my work for thirty days.",
    answer: (
      <>
        <p className="mb-4">
          You will not be. The Chairman's Cottage is a detached residence with a
          hardened workspace — secure video, encrypted email, a printer behind a
          sealed door. Trusted counterparties are scheduled into windows; nothing
          is improvised.
        </p>
        <p>
          Most principals keep a quiet two-hour daily window. Some keep none.
          The clinical program is composed around the window, not the other
          way around.
        </p>
      </>
    ),
  },
  {
    question: "People will find out.",
    answer: (
      <>
        <p className="mb-4">
          Two layers stand between you and disclosure. The first is federal:
          42 CFR Part 2 protects substance-use treatment records at a higher
          standard than HIPAA; even a subpoena will not reach them without a
          court order specifically naming you.
        </p>
        <p className="mb-4">
          The second is operational: for correspondence, billing, travel, and
          contractor invoices, we operate under a separate DBA — the Sanctuary
          Wellness &amp; Longevity Institute. Your name is never on a clinical
          envelope unless you ask for it to be.
        </p>
        <p>
          Every staff member — clinical and non-clinical — signs a universal
          NDA on day one.
        </p>
      </>
    ),
  },
  {
    question: "Swiss programs are the gold standard.",
    answer: (
      <>
        <p className="mb-4">
          They are excellent, and they are also a passport, a visa, a long
          flight, a foreign EMR, and a forty-percent currency premium. The
          residential rate at the most-named Zurich program runs near
          $109,000 per week.
        </p>
        <p>
          We deliver a domestic equivalent at roughly sixty percent of the
          Zurich rate, with American-board-certified clinicians, no visa
          logistics, and a ninety-minute drive from a major hub. The
          discretion is structural, not geographic.
        </p>
      </>
    ),
  },
];

export function Objections() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="objections"
      className="py-28 lg:py-40 bg-secondary border-t border-border scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header — same asymmetric 8/12 pattern */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 lg:mb-20">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5">Before You Say Yes</p>
            <h2
              className="font-serif text-foreground mb-7 hang-punct"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 3vw, 3.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              Three questions principals
              <span
                className="block editorial-italic text-foreground/70"
                style={{ fontWeight: 400 }}
              >
                ask in the first call.
              </span>
            </h2>
            <p
              className="text-muted-foreground leading-relaxed max-w-xl"
              style={{ fontSize: "var(--text-body)" }}
            >
              Answered the way the Clinical Director answers them on the
              phone — without brochure language, without disclaimers.
            </p>
          </div>
        </div>

        {/* Accordion — tall hairline rules, generous internal space */}
        <div className="lg:col-start-3 lg:col-span-10 max-w-4xl mx-auto">
          {objections.map((o, i) => {
            const isOpen = open === i;
            return (
              <div
                key={o.question}
                className="border-t border-border last:border-b"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-baseline justify-between gap-6 py-7 lg:py-9 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-serif text-foreground hang-punct"
                    style={{
                      fontSize: "clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)",
                      lineHeight: 1.18,
                      letterSpacing: "-0.014em",
                      fontWeight: 500,
                    }}
                  >
                    <span
                      className="editorial-italic text-foreground/70 mr-3"
                      style={{ fontWeight: 400 }}
                    >
                      &ldquo;
                    </span>
                    {o.question}
                    <span
                      className="editorial-italic text-foreground/70 ml-1"
                      style={{ fontWeight: 400 }}
                    >
                      &rdquo;
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-foreground/45 transition-transform duration-500 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-9 lg:pb-12 pr-12 lg:pr-24 text-muted-foreground leading-[1.7] max-w-prose">
                      {o.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
