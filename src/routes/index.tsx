import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Gallery } from "@/components/site/Gallery";
import { SynergyMap } from "@/components/site/SynergyMap";
import { Amenities } from "@/components/site/Amenities";
import { Leadership } from "@/components/site/Leadership";
import { Process } from "@/components/site/Process";
import { ConciergeForm } from "@/components/site/ConciergeForm";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanctuary Southeast | Private Medical-Wellness Retreat in the Blue Ridge" },
      {
        name: "description",
        content:
          "Swiss-standard clinical discretion in the Blue Ridge. A private medical-wellness retreat for executives and high-net-worth families. One family in residence at a time.",
      },
      { property: "og:title", content: "Sanctuary Southeast | Private Medical-Wellness Retreat in the Blue Ridge" },
      {
        property: "og:description",
        content:
          "Swiss-standard clinical discretion in the Blue Ridge. One family in residence at a time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <SynergyMap />
        <Amenities />
        <Leadership />
        <Process />
        <ConciergeForm />
      </main>
      <Footer />
    </>
  );
}
