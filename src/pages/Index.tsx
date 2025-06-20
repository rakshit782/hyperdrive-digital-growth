
import Header from "@/components/Header";
import ModernHero from "@/components/ModernHero";
import ModernServices from "@/components/ModernServices";
import ModernReviews from "@/components/ModernReviews";
import ModernCTA from "@/components/ModernCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-white">
        <Header />
        <ModernHero />
        <ModernServices />
        <ModernReviews />
        <ModernCTA />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
