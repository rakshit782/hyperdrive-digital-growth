
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ModernHero from "@/components/ModernHero";
import ModernServices from "@/components/ModernServices";
import ModernReviews from "@/components/ModernReviews";
import ModernFeatures from "@/components/ModernFeatures";
import ScrollingLogos from "@/components/ScrollingLogos";
import ModernCTA from "@/components/ModernCTA";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="AMZ AD SCOUT - Expert Amazon, Walmart & Meta Advertising Agency"
        description="Scale your business with AMZ AD SCOUT's expert Amazon advertising, Walmart advertising, Meta ads, complete account management, and Shopify development & optimization services."
        keywords="Amazon advertising, Walmart advertising, Meta ads, PPC management, Shopify development, ecommerce growth"
      />
      <div className="min-h-screen">
        <Header />
        <ModernHero />
        <ScrollingLogos />
        <ModernServices />
        <ModernFeatures />
        <ModernReviews />
        <ModernCTA />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
