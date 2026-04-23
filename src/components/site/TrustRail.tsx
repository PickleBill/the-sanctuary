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
      className="bg-secondary border-t border-border"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 lg:py-14">
        {/* Single eyebrow — same family as every other section header */}
        <div className="flex items-center gap-3 mb-8 lg:mb-10">
          <span className="luxe-rule" aria-hidden />
          <p className="small-caps text-amber text-[11px] tracking-[0.28em]">
            Confidentiality &amp; Compliance
          </p>
        </div>

        {/* Plates: no inter-cell hairlines on mobile (one column = no need),
            crisp 1px structure on tablet+ via gap-px on a darker bed.
            Eliminates the "noise grid" effect on phones. */}
        <dl className="grid grid-cols-1 gap-y-px sm:grid-cols-2 sm:gap-px lg:grid-cols-4 sm:bg-border">
          {plates.map((p) => (
            <div key={p.label} className="bg-secondary p-6 lg:p-7 border-b border-border/50 sm:border-b-0 last:border-b-0">
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
