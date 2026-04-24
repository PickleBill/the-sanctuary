import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Sanctuary Southeast" },
      { name: "description", content: "How Sanctuary Southeast safeguards the privacy of every guest and inquiry." },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Privacy Policy | Sanctuary Southeast" },
      { property: "og:description", content: "How Sanctuary Southeast safeguards the privacy of every guest and inquiry." },
      { property: "og:url", content: "https://the-sanctuary.lovable.app/privacy-policy" },
      { property: "og:image", content: "https://the-sanctuary.lovable.app/og-privacy.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://the-sanctuary.lovable.app/og-privacy.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://the-sanctuary.lovable.app/privacy-policy" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-28 bg-background">
        <article className="mx-auto max-w-3xl px-6 lg:px-10">
          <Link to="/" className="text-xs tracking-[0.24em] uppercase text-amber hover:text-foreground transition-colors">← Return to Estate</Link>
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground mt-8 mb-10">Privacy Policy</h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>Sanctuary Southeast operates under the strictest standards of medical and personal confidentiality. No guest record is created, transmitted, or stored without explicit instruction.</p>
            <p>All staff are bound by perpetual non-disclosure agreements. Inquiry data is encrypted at rest and in transit, accessible only to our executive intake team.</p>
            <p>We do not sell, share, or market guest information under any circumstance. Inquiry records are purged from our systems within 30 days unless you elect to proceed with an admission.</p>
            <p>For questions regarding our privacy practices, please contact our concierge directly.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
