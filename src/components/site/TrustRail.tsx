/**
 * v1.5 — Trust + Consent rail above the Concierge Form.
 *
 * Conversion lives here: HNW principals (and especially their advisors)
 * scan for compliance posture before submitting anything. Four quiet
 * plates in tabular small-caps language. No icons, no badges yet —
 * those wait on real Joint Commission / NAATP / LegitScript credentials.
 *
 * /distill: each plate carries one fact, one citation. No marketing voice.
 */

const plates = [
  {
    label: "HIPAA Posture",
    body:
      "This intake form does not collect PHI. Clinical conversations occur on encrypted channels off this site.",
  },
  {
    label: "42 CFR Part 2",
    body:
      "Substance-use treatment records receive heightened federal protection. We comply with both standards in full.",
  },
  {
    label: "Licensure",
    body:
      "Licensed by the North Carolina Department of Health and Human Services. Joint Commission accreditation in process.",
  },
  {
    label: "No Referral Fees",
    body:
      "We do not pay or accept referral fees. Fully compliant with the federal anti-kickback statute, 42 USC §1320a-7b.",
  },
];

export function TrustRail() {
  return (
    <section
      aria-label="Compliance and confidentiality posture"
      className="bg-secondary"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 lg:py-16">
        <p className="eyebrow mb-8 lg:mb-10">Confidentiality &amp; Compliance</p>

        {/* Plates: pure whitespace rhythm, no border grid per v2.0 subtraction pass */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-10">
          {plates.map((p) => (
            <div key={p.label}>
              <dt className="small-caps text-foreground/65 text-[11px] tracking-[0.24em] mb-3">
                {p.label}
              </dt>
              <dd
                className="text-muted-foreground leading-[1.6]"
                style={{ fontSize: "var(--text-small)" }}
              >
                {p.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
