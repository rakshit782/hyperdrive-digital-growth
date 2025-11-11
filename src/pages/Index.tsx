
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import CaseStudies from "@/components/CaseStudies";
import CTA from "@/components/CTA";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    console.log('✅ Index page mounted successfully');
    return () => console.log('Index page unmounted');
  }, []);

  console.log('🔄 Index page rendering...');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <Stats />
      <CaseStudies />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
