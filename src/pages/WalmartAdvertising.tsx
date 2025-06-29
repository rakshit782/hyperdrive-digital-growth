
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceStatsGrid from "@/components/ServiceStatsGrid";
import ServiceReviewsGrid from "@/components/ServiceReviewsGrid";
import ServiceCaseStudiesGrid from "@/components/ServiceCaseStudiesGrid";
import ServiceCTA from "@/components/ServiceCTA";
import { useServiceData } from "@/hooks/useServiceData";
import { useServicePageConfig } from "@/hooks/useServicePageConfig";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const WalmartAdvertising = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('walmart');
  const { configs } = useServicePageConfig();
  
  const config = configs.walmart;

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Walmart Advertising Management - Walmart Connect Experts"
          description="Professional Walmart advertising management services. Boost your Walmart sales with expert Walmart Connect campaign optimization and management."
        />
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Walmart Advertising Management - Walmart Connect Experts"
        description="Professional Walmart advertising management services. Boost your Walmart sales with expert Walmart Connect campaign optimization and management."
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
            {config?.title || 'Walmart Advertising Management'}
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-6">
            {config?.subtitle || 'Walmart Connect & Marketplace Expertise'}
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
            {config?.heroDescription || 'Grow your business on Walmart marketplace with our expert advertising strategies. We help brands achieve 380% average revenue growth through Walmart Connect optimization and strategic marketplace positioning.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => window.location.href = '/free-audit'}
            >
              {config?.primaryButtonText || 'Get Free Walmart Audit'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => window.location.href = '/walmart-case-studies'}
            >
              {config?.secondaryButtonText || 'View Case Studies'}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ServiceStatsGrid stats={stats} serviceType="Walmart" />

      {/* Case Studies Section */}
      <ServiceCaseStudiesGrid caseStudies={caseStudies} />

      {/* Reviews Section */}
      <ServiceReviewsGrid reviews={reviews} />

      {/* CTA Section */}
      <ServiceCTA 
        title={config?.ctaTitle || 'Ready to Conquer Walmart?'}
        description={config?.ctaDescription || 'Get your free Walmart marketplace audit and learn how we can multiply your revenue.'}
        buttonText={config?.ctaButtonText || 'Get Free Audit'}
        serviceType="Walmart"
      />

      <Footer />
    </>
  );
};

export default WalmartAdvertising;
