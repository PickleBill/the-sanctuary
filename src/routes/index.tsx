import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Resonance } from "@/components/site/Resonance";
import { Cohort } from "@/components/site/Cohort";
import { Gallery } from "@/components/site/Gallery";
import { JourneyStrip } from "@/components/site/JourneyStrip";
import { SynergyMap } from "@/components/site/SynergyMap";
import { Amenities } from "@/components/site/Amenities";
import { Leadership } from "@/components/site/Leadership";
import { SevenDecisions } from "@/components/site/SevenDecisions";
import { Process } from "@/components/site/Process";
import { ConciergeForm } from "@/components/site/ConciergeForm";
import { Footer } from "@/components/site/Footer";
import { AmbientAudio } from "@/components/site/AmbientAudio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Sanctuary | Care, in the company of peers — Blue Ridge, North Carolina" },
      {
        name: "description",
        content:
          "The room is the medicine. A private medical-wellness sanctuary in the Blue Ridge for executives, surgeons, judges, and founders.",
      },
      { property: "og:title", content: "The Sanctuary | Blue Ridge, North Carolina" },
      {
        property: "og:description",
        content:
          "Care, in the company of peers. One family in residence at a time, in the Blue Ridge.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-home.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-home.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      {/*
        v3.9 reset — order locked:
        Hero → Resonance → Cohort → Gallery (Estate) → JourneyStrip
        → SynergyMap (Week) → Amenities → Leadership → SevenDecisions
        → Process → ConciergeForm.
        Journey was removed in this pass — JourneyStrip already covers
        "a day, in pictures" and Journey duplicated the same beat.
      */}
      <main>
        <Hero />
        <Resonance />
        <Cohort />
        <Gallery />
        <JourneyStrip />
        <SynergyMap />
        <Amenities />
        <Leadership />
        <SevenDecisions />
        <Process />
        <ConciergeForm />
      </main>
      <Footer />
      <AmbientAudio />
    </>
  );
}
