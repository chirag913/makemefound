import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Why from "@/components/sections/Why";
import FinalCTA from "@/components/sections/FinalCTA";
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
        <Process />
        <Why />
        <FinalCTA />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
    </>
  );
}
