
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AuthorizedPartners from "@/components/AuthorizedPartners";
import ClienteleCarousel from "@/components/ClienteleCarousel";
import ModernServices from "@/components/ModernServices";
import ModernFeatures from "@/components/ModernFeatures";
import CircularReviews from "@/components/CircularReviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="Expert Amazon, Walmart & Meta Advertising Agency | Drive Sales Growth"
        description="Leading advertising agency specializing in Amazon PPC, Walmart Connect, and Meta ads. Boost your ROI with our proven strategies. Free audit available!"
        keywords="Amazon advertising, Walmart advertising, Meta ads, PPC management, e-commerce marketing, digital advertising agency"
      />
      <div className="min-h-screen">
        <Header />
        <AuthorizedPartners />
        <div className="space-y-20 md:space-y-32">
          <Hero />
          <ClienteleCarousel />
          <ModernServices />
          <ModernFeatures />
          <CircularReviews />
          <FAQ />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
