import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import TargetClients from "@/components/sections/TargetClients";
import WhyMakeMeFound from "@/components/sections/WhyMakeMeFound";
import Technology from "@/components/sections/Technology";
import DemoCampaign from "@/components/sections/DemoCampaign";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <TargetClients />
        <WhyMakeMeFound />
        <Technology />
        <DemoCampaign />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
