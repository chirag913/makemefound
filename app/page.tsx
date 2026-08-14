import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import AISearchVisibility from "@/components/sections/AISearchVisibility";
import HowItWorks from "@/components/sections/HowItWorks";
import AuditPreview from "@/components/sections/AuditPreview";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import WhoWeHelp from "@/components/sections/WhoWeHelp";
import Offer from "@/components/sections/Offer";
import Results from "@/components/sections/Results";
import WhyMakeMeFound from "@/components/sections/WhyMakeMeFound";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Problem />
        <AISearchVisibility />
        <HowItWorks />
        <AuditPreview />
        <Services />
        <About />
        <WhoWeHelp />
        <Offer />
        <Results />
        <WhyMakeMeFound />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
