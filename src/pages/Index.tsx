
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Stats />
      <CaseStudies />
      <CTA />
      <Contact />
    </div>
  );
};

export default Index;
