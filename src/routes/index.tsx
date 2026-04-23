import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Gallery } from "@/components/site/Gallery";
import { SynergyMap } from "@/components/site/SynergyMap";
import { Amenities } from "@/components/site/Amenities";
import { Process } from "@/components/site/Process";
import { ConciergeForm } from "@/components/site/ConciergeForm";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanctuary Southeast | Private Executive Recovery Retreat" },
      {
        name: "description",
        content:
          "Discrete, ultra-luxury addiction recovery for executives and high-net-worth individuals in the Southeast. Clinical excellence meets five-star hospitality.",
      },
      { property: "og:title", content: "Sanctuary Southeast | Private Executive Recovery Retreat" },
      {
        property: "og:description",
        content:
          "Discrete, ultra-luxury addiction recovery for executives and high-net-worth individuals. Clinical excellence meets five-star hospitality.",
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
        <Process />
        <ConciergeForm />
      </main>
      <Footer />
    </>
  );
}
