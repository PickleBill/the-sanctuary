import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Resonance } from "@/components/site/Resonance";
import { Cohort } from "@/components/site/Cohort";
import { Gallery } from "@/components/site/Gallery";
import { SynergyMap } from "@/components/site/SynergyMap";
import { Amenities } from "@/components/site/Amenities";
import { Leadership } from "@/components/site/Leadership";
import { SevenDecisions } from "@/components/site/SevenDecisions";
import { Process } from "@/components/site/Process";
import { ConciergeForm } from "@/components/site/ConciergeForm";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanctuary Southeast | The room is the medicine — A private medical-wellness sanctuary in the Blue Ridge" },
      {
        name: "description",
        content:
          "The room is the medicine. Care, in the company of peers — a private medical-wellness sanctuary in the Blue Ridge for executives, surgeons, judges, and founders.",
      },
      { property: "og:title", content: "Sanctuary Southeast | The room is the medicine" },
      {
        property: "og:description",
        content:
          "Care, in the company of peers. One family in residence at a time, in the Blue Ridge.",
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
        <Resonance />
        <Cohort />
        <Gallery />
        <SynergyMap />
        <Amenities />
        <Leadership />
        <SevenDecisions />
        <Process />
        <ConciergeForm />
      </main>
      <Footer />
    </>
  );
}
