import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LEADERS } from "@/components/site/Leadership";

export const Route = createFileRoute("/professionals")({
  head: () => ({
    meta: [
      { title: "For Healthcare Professionals | Sanctuary Southeast" },
      {
        name: "description",
        content:
          "A one-page clinical reference for interventionists, concierge physicians, family-office advisors, and trusts-and-estates counsel. We do not pay referral fees.",
      },
      { property: "og:title", content: "For Healthcare Professionals | Sanctuary Southeast" },
      {
        property: "og:description",
        content:
          "A clinical reference page for licensed referring practitioners. We do not pay referral fees.",
      },
      { property: "og:image", content: "/og-professionals.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-professionals.jpg" },
    ],
  }),
  component: ProfessionalsPage,
});

function ProfessionalsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* 1 — Masthead: named clinical leadership */}
        <section className="pt-40 pb-20 lg:pt-48 lg:pb-28">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <p className="small-caps text-amber text-[11px] tracking-[0.32em] mb-5">
              For Licensed Practitioners
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
            <p
              className="text-muted-foreground leading-relaxed max-w-2xl"
              style={{ fontSize: "var(--text-lead)" }}
            >
              Named clinical leadership. Anti-kickback in plain English. Protocol on the next page. Direct line at the bottom.
            </p>

            <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
              {LEADERS.map((l) => (
                <div key={l.role} className="flex gap-6">
                  <div className="w-24 lg:w-28 shrink-0">
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={l.img}
                        alt={`Portrait of the ${l.role}`}
                        loading="lazy"
                        width={512}
                        height={640}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="small-caps text-amber text-[11px] tracking-[0.24em] mb-2">
                      {l.role}
                    </p>
                    <h2
                      className="font-serif text-foreground mb-2"
                      style={{ fontSize: "var(--text-h4)", lineHeight: 1.1, fontWeight: 500 }}
                    >
                      {l.name}
                    </h2>
                    <p className="small-caps text-foreground/75 text-[10px] tracking-[0.2em] tabular leading-relaxed">
                      {l.credentials}
                    </p>
                    <p className="text-[13px] text-muted-foreground italic leading-relaxed mt-2">
                      {l.formerly}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2 — Transparency: anti-kickback in plain English */}
        <section className="py-20 lg:py-28 bg-secondary">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <p className="small-caps text-amber text-[11px] tracking-[0.32em] mb-5">
              Transparency
            </p>
            <h2
              className="font-serif text-foreground mb-7 hang-punct"
              style={{ fontSize: "var(--text-h2)", lineHeight: 1.06, fontWeight: 500, letterSpacing: "-0.02em" }}
            >
              We do not pay
              <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
                referral fees.
              </span>
            </h2>
            <p
              className="text-muted-foreground leading-relaxed max-w-2xl"
              style={{ fontSize: "var(--text-body)" }}
            >
              No cash, no honoraria, no services rendered, no marketing reciprocity. The Anti-Kickback Statute is a floor, not a ceiling — we operate well above it. The only thing we ask of a referring clinician is the same thing they ask of us: judgment held to one standard, regardless of who is in the room.
            </p>
          </div>
        </section>

        {/* 3 — Intake: one-paragraph protocol */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <p className="small-caps text-amber text-[11px] tracking-[0.32em] mb-5">
              Intake Protocol
            </p>
            <h2
              className="font-serif text-foreground mb-7 hang-punct"
              style={{ fontSize: "var(--text-h2)", lineHeight: 1.06, fontWeight: 500, letterSpacing: "-0.02em" }}
            >
              From inquiry
              <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
                to written decision.
              </span>
            </h2>
            <p
              className="text-foreground/85 leading-relaxed max-w-2xl"
              style={{ fontSize: "var(--text-body)" }}
            >
              A masters-level clinician returns the first call within thirty minutes — day, night, weekend, holiday. A mutual BAA is in your inbox within one business day, before any PHI moves between offices. A peer call with the Medical Director is scheduled within forty-eight hours. A written admission decision — admitted, declined, or pending — follows within seventy-two hours of inquiry. At program completion, with the principal's written consent, a discharge summary returns to your office in the format your EMR prefers.
            </p>
          </div>
        </section>

        {/* 4 — Contact */}
        <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <p className="small-caps text-amber text-[11px] tracking-[0.32em] mb-5">
              Direct Contact
            </p>
            <h2
              className="font-serif mb-10"
              style={{ fontSize: "var(--text-h2)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.02em" }}
            >
              The Clinical Director
              <span className="block editorial-italic text-primary-foreground/70" style={{ fontWeight: 400 }}>
                answers personally.
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl">
              <div>
                <p className="small-caps text-primary-foreground/55 text-[11px] tracking-[0.32em] mb-2">
                  Direct Line · 24/7
                </p>
                <a
                  href="tel:+18005550199"
                  className="font-serif text-2xl text-primary-foreground hover:text-amber transition-colors tabular block"
                >
                  +1 (800) 555-0199
                </a>
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
                  PGP key on request.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="/clinical-dossier.pdf"
                download
                className="border border-amber/60 px-7 py-4 min-h-[52px] small-caps text-[11px] tracking-[0.28em] text-primary-foreground hover:bg-amber hover:text-amber-foreground transition-colors duration-500 text-center flex items-center justify-center"
              >
                Download the Clinical Dossier
              </a>
              <Link
                to="/"
                className="px-7 py-4 min-h-[52px] small-caps text-[11px] tracking-[0.28em] text-primary-foreground/70 hover:text-amber transition-colors duration-500 text-center flex items-center justify-center"
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
