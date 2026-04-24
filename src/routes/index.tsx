import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Gallery } from "@/components/site/Gallery";
import { SynergyMap } from "@/components/site/SynergyMap";
import { Resonance } from "@/components/site/Resonance";
import { PeerCohort } from "@/components/site/PeerCohort";
import { Amenities } from "@/components/site/Amenities";
import { DayHere } from "@/components/site/DayHere";
import { Leadership } from "@/components/site/Leadership";
import { SevenDecisions } from "@/components/site/SevenDecisions";
import { Process } from "@/components/site/Process";
import { ConciergeForm } from "@/components/site/ConciergeForm";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanctuary Southeast | Real medicine, worth coming back to" },
      {
        name: "description",
        content:
          "Real medicine, in a place worth coming back to — among peers who already understand. A private medical-wellness retreat in the Blue Ridge.",
      },
      { property: "og:title", content: "Sanctuary Southeast | Real medicine, worth coming back to" },
      {
        property: "og:description",
        content:
          "Real medicine, in a place worth coming back to — among peers who already understand. A private medical-wellness retreat in the Blue Ridge.",
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
        <Resonance />
        <PeerCohort />
        <Amenities />
        <DayHere />
        <Leadership />
        <SevenDecisions />
        <Process />
        <ConciergeForm />
      </main>
      <Footer />
    </>
  );
}
