
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

const ShopifyDevelopment = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('shopify-development');
  const { configs } = useServicePageConfig();
  
  const config = configs['shopify-development'] || {
    title: 'Shopify Development Services',
    subtitle: 'Custom Store Development & Optimization',
    heroDescription: 'Build high-converting Shopify stores that drive sales and provide exceptional user experiences. From custom themes to advanced functionality, we create stores that scale.',
    primaryButtonText: 'Start Your Project',
    secondaryButtonText: 'View Portfolio',
    ctaTitle: 'Ready to Build Your Dream Store?',
    ctaDescription: 'Get your free Shopify development consultation and discover how we can create the perfect store for your business.',
    ctaButtonText: 'Get Free Consultation'
  };

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Shopify Development Services - Custom Store Development"
          description="Expert Shopify development services. Custom themes, apps, and optimizations for high-converting e-commerce stores."
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
        title="Shopify Development Services - Custom Store Development"
        description="Expert Shopify development services. Custom themes, apps, and optimizations for high-converting e-commerce stores."
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center"
              alt="Shopify Development Services"
              className="w-full max-w-md mx-auto rounded-2xl shadow-lg object-cover"
              style={{ aspectRatio: '4/3' }}
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
            {config.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-6">
            {config.subtitle}
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
            {config.heroDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => window.location.href = '/free-audit'}
            >
              {config.primaryButtonText}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => window.location.href = '/case-studies'}
            >
              {config.secondaryButtonText}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ServiceStatsGrid stats={stats} serviceType="Shopify Development" />

      {/* Case Studies Section */}
      <ServiceCaseStudiesGrid caseStudies={caseStudies} />

      {/* Reviews Section */}
      <ServiceReviewsGrid reviews={reviews} />

      {/* CTA Section */}
      <ServiceCTA 
        title={config.ctaTitle}
        description={config.ctaDescription}
        buttonText={config.ctaButtonText}
        serviceType="Shopify Development"
      />

      <Footer />
    </>
  );
};

export default ShopifyDevelopment;
