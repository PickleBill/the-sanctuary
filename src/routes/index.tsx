import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Gallery } from "@/components/site/Gallery";
import { SynergyMap } from "@/components/site/SynergyMap";
import { ChairmansCottage } from "@/components/site/ChairmansCottage";
import { Resonance } from "@/components/site/Resonance";
import { PeerCohort } from "@/components/site/PeerCohort";
import { Amenities } from "@/components/site/Amenities";
import { DayHere } from "@/components/site/DayHere";
import { Leadership } from "@/components/site/Leadership";
import { SevenDecisions } from "@/components/site/SevenDecisions";
import { Process } from "@/components/site/Process";
import { Objections } from "@/components/site/Objections";
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
        <ChairmansCottage />
        <Resonance />
        <PeerCohort />
        <Amenities />
        <DayHere />
        <Leadership />
        <SevenDecisions />
        <Process />
        <Objections />
        <ConciergeForm />
      </main>
      <Footer />
    </>
  );
}
