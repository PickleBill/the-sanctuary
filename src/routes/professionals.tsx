import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/professionals")({
  head: () => ({
    meta: [
      { title: "For Healthcare Professionals | Sanctuary Southeast" },
      {
        name: "description",
        content:
          "Referral protocol, outcomes posture, and direct contact with clinical leadership for interventionists, concierge physicians, family-office advisors, and trusts-and-estates counsel.",
      },
      { property: "og:title", content: "For Healthcare Professionals | Sanctuary Southeast" },
      {
        property: "og:description",
        content:
          "A clinical reference page for licensed referring practitioners. We do not pay referral fees.",
      },
    ],
  }),
  component: ProfessionalsPage,
});

function ProfessionalsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* Header */}
        <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 border-b border-border">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <p className="eyebrow mb-5">
              <span className="luxe-rule mr-3" /> For Licensed Practitioners
            </p>
            <h1
              className="font-serif text-foreground mb-7 hang-punct"
              style={{
                fontSize: "var(--text-h1)",
                lineHeight: 1.04,
                letterSpacing: "-0.022em",
                fontWeight: 500,
              }}
            >
              A clinical reference,
              <span
                className="block editorial-italic text-foreground/70"
                style={{ fontWeight: 400 }}
              >
                printable in one page.
              </span>
            </h1>
            <p className="text-lead max-w-2xl">
              For interventionists, concierge physicians, addiction
              psychiatrists, family-office advisors, and trusts-and-estates
              counsel. The cases you trust us with become the standard we hold
              ourselves to.
            </p>
          </div>
        </section>

        {/* Referral Protocol Card — the printable summary the brief calls for.
             Bordered plate at the top of the page so the four commitments are
             screen-shootable in a single tap. */}
        <section className="py-16 lg:py-20 bg-secondary border-b border-border">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <p className="small-caps text-amber text-[11px] tracking-[0.24em] mb-6">
              The Referral Protocol — at a glance
            </p>
            <div className="border border-foreground/15 bg-background">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-foreground/15">
                <ProtocolCommitment
                  figure="30 min"
                  title="Clinician callback"
                  body="A masters-level clinician returns the first call within thirty minutes — day, night, weekend, holiday."
                />
                <ProtocolCommitment
                  figure="24 hr"
                  title="Signed BAA in your inbox"
                  body="Mutual BAA executed within one business day, before any PHI moves between offices."
                />
                <ProtocolCommitment
                  figure="72 hr"
                  title="Written admission decision"
                  body="Admitted, declined, or pending — in writing — within three business days of inquiry."
                />
                <ProtocolCommitment
                  figure="$0"
                  title="Referral fees, ever"
                  body="No cash, no honoraria, no services rendered. Anti-Kickback Statute and AIS code, in plain English."
                />
              </div>
            </div>
            <p className="mt-6 text-muted-foreground text-[13px] lg:text-[14px] leading-relaxed max-w-2xl">
              This is the entire commercial relationship, on one page. The
              clinical relationship is below.
            </p>
          </div>
        </section>

        {/* Referral protocol — full procedural detail */}
        <Block title="Referral Protocol" eyebrow="The Process">
          <ol className="space-y-6 max-w-2xl">
            <ProtocolStep n="I" title="Direct correspondence">
              Encrypted email or secure message to the Clinical Director. No portal account required for the first exchange.
            </ProtocolStep>
            <ProtocolStep n="II" title="Clinical handoff call">
              A 30-minute peer call with the Medical Director and your office, scheduled within 48 hours of inquiry.
            </ProtocolStep>
            <ProtocolStep n="III" title="Written acknowledgement">
              You receive a written acknowledgement of the case status — admitted, declined, or pending — within five business days.
            </ProtocolStep>
            <ProtocolStep n="IV" title="Closed-loop follow-up">
              At program completion, with the principal's written consent, we return a discharge summary to your office in the format your EMR prefers.
            </ProtocolStep>
          </ol>
        </Block>

        {/* Outcomes posture */}
        <Block title="Outcomes Posture" eyebrow="What we measure" dark>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            <Stat figure="90 days" label="Median program length" />
            <Stat figure="4 : 1" label="Clinical staff to guest ratio" />
            <Stat figure="12 / 24" label="Month follow-up cadence" />
            <Stat figure="100%" label="Cases reviewed personally by the Medical Director" />
          </div>
          <p className="mt-12 max-w-2xl text-primary-foreground/70 leading-relaxed text-sm">
            We do not publish aggregate outcome statistics on the marketing site. Per case, we share what is methodologically sound and what the principal has consented to disclose. Standardized measures (PHQ-9, GAD-7, AUDIT, DAST) are administered at intake, midpoint, discharge, and 12 months — available to your office on request.
          </p>
        </Block>

        {/* Encrypted exchange */}
        <Block title="Encrypted Document Exchange" eyebrow="Secure intake">
          <p className="max-w-2xl text-muted-foreground leading-relaxed">
            For records, releases, and clinical correspondence we operate a TLS-encrypted document exchange separate from the marketing site. Access credentials are issued one-to-one, never shared. Request access via the Clinical Director below.
          </p>
        </Block>

        {/* Direct contact */}
        <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <p className="small-caps text-amber text-[11px] tracking-[0.32em] mb-5">
              Direct Contact
            </p>
            <h2
              className="font-serif mb-8"
              style={{ fontSize: "var(--text-h2)", lineHeight: 1.05, fontWeight: 500 }}
            >
              The Clinical Director answers professional inquiries personally.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl">
              <div>
                <p className="small-caps text-primary-foreground/55 text-[11px] tracking-[0.32em] mb-2">
                  Direct Line
                </p>
                <a
                  href="tel:+18005550199"
                  className="font-serif text-2xl text-primary-foreground hover:text-amber transition-colors tabular block"
                >
                  +1 (800) 555-0199
                </a>
                <p className="text-xs text-primary-foreground/55 mt-2 italic">
                  Ask for the Clinical Director — masters-level clinician, 24/7.
                </p>
              </div>
              <div>
                <p className="small-caps text-primary-foreground/55 text-[11px] tracking-[0.32em] mb-2">
                  Encrypted Email
                </p>
                <a
                  href="mailto:clinical@sanctuarysoutheast.com"
                  className="font-serif text-xl text-primary-foreground hover:text-amber transition-colors block break-all"
                >
                  clinical@sanctuarysoutheast.com
                </a>
                <p className="text-xs text-primary-foreground/55 mt-2 italic">
                  PGP key on request. Response within four hours.
                </p>
              </div>
            </div>

            <div className="mt-14">
              <Link
                to="/"
                className="text-[11px] tracking-[0.28em] uppercase font-medium text-primary-foreground/70 hover:text-amber transition-colors small-caps"
              >
                ← Return to the Estate
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Block({
  title,
  eyebrow,
  children,
  dark = false,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={`py-20 lg:py-28 border-b ${
        dark
          ? "bg-primary text-primary-foreground border-primary-foreground/10"
          : "bg-background border-border"
      }`}
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="small-caps text-amber text-[11px] tracking-[0.32em] mb-3">
              {eyebrow}
            </p>
            <h2
              className="font-serif"
              style={{ fontSize: "var(--text-h3)", lineHeight: 1.1, fontWeight: 500 }}
            >
              {title}
            </h2>
          </div>
          <div className="lg:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

function ProtocolStep({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-6">
      <span
        className="font-serif text-amber shrink-0 tabular"
        style={{ fontSize: "var(--text-h4)", lineHeight: 1, fontWeight: 400, width: "2ch" }}
      >
        {n}
      </span>
      <div>
        <h3 className="font-serif text-foreground mb-2" style={{ fontSize: "var(--text-h4)", fontWeight: 500 }}>
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </li>
  );
}

function Stat({ figure, label }: { figure: string; label: string }) {
  return (
    <div>
      <p
        className="font-serif text-primary-foreground tabular mb-2"
        style={{ fontSize: "var(--text-h2)", lineHeight: 1, fontWeight: 500 }}
      >
        {figure}
      </p>
      <p className="small-caps text-primary-foreground/55 text-[11px] tracking-[0.28em]">
        {label}
      </p>
    </div>
  );
}

function ProtocolCommitment({
  figure,
  title,
  body,
}: {
  figure: string;
  title: string;
  body: string;
}) {
  return (
    <div className="p-8 lg:p-10">
      <p
        className="font-serif text-amber tabular mb-3"
        style={{
          fontSize: "clamp(1.75rem, 1.4rem + 1.4vw, 2.25rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontWeight: 500,
        }}
      >
        {figure}
      </p>
      <h3
        className="font-serif text-foreground mb-2"
        style={{
          fontSize: "var(--text-h4)",
          letterSpacing: "-0.014em",
          fontWeight: 500,
        }}
      >
        {title}
      </h3>
      <p className="text-muted-foreground text-[14px] leading-relaxed">{body}</p>
    </div>
  );
}
