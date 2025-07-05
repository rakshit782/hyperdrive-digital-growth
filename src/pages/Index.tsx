
import Header from "@/components/Header";
import DynamicHero from "@/components/DynamicHero";
import ClienteleCarousel from "@/components/ClienteleCarousel";
import Services from "@/components/Services";
import CircularReviews from "@/components/CircularReviews";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="Expert Amazon, Walmart & Meta Advertising Agency | Drive Sales Growth"
        description="Leading advertising agency specializing in Amazon PPC, Walmart Connect, and Meta ads. Boost your ROI with our proven strategies."
        keywords="Amazon advertising, Walmart advertising, Meta ads, PPC management, e-commerce marketing, digital advertising agency"
      />
      <div className="min-h-screen">
        <Header />
        
        {/* Admin Dashboard Link - Only show for authenticated users */}
        <div className="fixed bottom-4 right-4 z-50">
          <Link to="/dashboard">
            <Button variant="secondary" size="sm" className="shadow-lg">
              <Settings className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </Link>
        </div>

        <div className="space-y-12">
          <DynamicHero />
          <ClienteleCarousel />
          <Services />
          <CircularReviews />
          <FAQ />
          <CTA />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
