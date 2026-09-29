import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Approach from "@/components/sections/Approach";
import Examples from "@/components/sections/Examples";
import Solutions from "@/components/sections/Solutions";
import Process from "@/components/sections/Process";
import Evidence from "@/components/sections/Evidence";
import Technology from "@/components/sections/Technology";
import FAQ, { FAQ_ITEMS } from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Problem />
        <Approach />
        <Examples />
        <Solutions />
        <Process />
        <Evidence />
        <Technology />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
