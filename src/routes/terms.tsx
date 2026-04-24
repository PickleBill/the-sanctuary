import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms | Sanctuary Southeast" },
      { name: "description", content: "Terms governing the use of Sanctuary Southeast services and communications." },
      { property: "og:title", content: "Terms | Sanctuary Southeast" },
      { property: "og:description", content: "Terms governing the use of Sanctuary Southeast services and communications." },
      { property: "og:image", content: "/og-terms.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-terms.jpg" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-28 bg-background">
        <article className="mx-auto max-w-3xl px-6 lg:px-10">
          <Link to="/" className="text-xs tracking-[0.24em] uppercase text-amber hover:text-foreground transition-colors">← Return to Estate</Link>
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground mt-8 mb-10">Terms of Service</h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>Use of this website constitutes acknowledgement of these terms. Information presented is informational and does not constitute medical advice or guarantee admission.</p>
            <p>All clinical engagements are governed by individual treatment agreements executed at intake. Programs and amenities are subject to change at the discretion of our medical leadership.</p>
            <p>Sanctuary Southeast reserves the right to decline any inquiry that falls outside our clinical scope or community standards.</p>
            <p>For full terms applicable to admission, refer to documents provided during the private consultation process.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
