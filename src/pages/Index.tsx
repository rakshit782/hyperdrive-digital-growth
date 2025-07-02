
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClienteleCarousel from "@/components/ClienteleCarousel";
import Services from "@/components/Services";
import CircularReviews from "@/components/CircularReviews";
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
        <div className="space-y-12">
          <Hero />
          <ClienteleCarousel />
          <Services />
          <CircularReviews />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
