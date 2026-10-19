import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import Why from "@/components/sections/Why";
import FinalCTA from "@/components/sections/FinalCTA";
import KineticBand from "@/components/sections/KineticBand";
import Spotlight from "@/components/Spotlight";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${SITE_NAME} services`,
  itemListElement: ["Long-form YouTube Editing", "Short-form Repurposing", "Content Packaging"].map((name, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@type": "Service", name, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } },
  })),
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Services />
        <Work />
        <KineticBand />
        <Process />
        <Why />
        <FinalCTA />
      </main>
      <Footer />
      <Spotlight />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
    </>
  );
}
