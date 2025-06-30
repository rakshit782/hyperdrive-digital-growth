
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
import { ArrowRight, Link, RefreshCw, Database, Shield, Zap, Settings } from "lucide-react";

const ShopifyIntegration = () => {
  const { caseStudies, stats, reviews } = useServiceData('shopify-integration');
  const { configs } = useServicePageConfig();
  
  const config = configs['shopify-integration'] || {
    title: 'Shopify Integration Services',
    subtitle: 'Connect Your Store to Major Marketplaces',
    heroDescription: 'Seamlessly connect your Shopify store with Amazon, Walmart, eBay, and other major marketplaces. We handle complex integrations so you can sell everywhere without the technical complexity.',
    primaryButtonText: 'Get Integration Quote',
    secondaryButtonText: 'View Integrations',
    ctaTitle: 'Ready to Expand Your Reach?',
    ctaDescription: 'Get your free integration consultation and discover how we can connect your store to major marketplaces for maximum sales potential.',
    ctaButtonText: 'Get Free Consultation'
  };

  const features = [
    {
      icon: Link,
      title: "Multi-Channel Connections",
      description: "Connect your Shopify store to Amazon, Walmart, eBay, Etsy, and other major marketplaces with seamless integrations."
    },
    {
      icon: RefreshCw,
      title: "Real-Time Synchronization",
      description: "Automatic synchronization of inventory, orders, and product data across all connected platforms in real-time."
    },
    {
      icon: Database,
      title: "Centralized Management",
      description: "Manage all your sales channels from one central dashboard with unified reporting and analytics."
    },
    {
      icon: Shield,
      title: "Data Security & Compliance",
      description: "Enterprise-grade security and compliance with platform requirements to protect your business data."
    },
    {
      icon: Zap,
      title: "Automated Workflows",
      description: "Streamlined processes for order fulfillment, inventory updates, and customer communications across all channels."
    },
    {
      icon: Settings,
      title: "Custom API Development",
      description: "Custom API solutions for unique business requirements and specialized third-party integrations."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Shopify Integration Services - Connect to Major Marketplaces"
        description="Expert Shopify integration services for Amazon, Walmart, eBay and other marketplaces. Seamless connections, automated inventory sync, and unified management."
      />
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  🔗 Integration Specialists
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
                {config.title}
              </h1>
              <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-6">
                {config.subtitle}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                {config.heroDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">99.9%</div>
                  <div className="text-sm text-slate-600">Uptime Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">15+</div>
                  <div className="text-sm text-slate-600">Marketplaces</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">300%</div>
                  <div className="text-sm text-slate-600">Sales Increase</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center"
                alt="Shopify Integration Services"
                className="relative w-full rounded-3xl shadow-2xl object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Integration Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our expert team handles complex marketplace integrations, ensuring your products reach customers across all major platforms while maintaining data consistency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ServiceStatsGrid stats={stats} serviceType="Shopify Integration" />

      {/* Case Studies Section */}
      <ServiceCaseStudiesGrid caseStudies={caseStudies} />

      {/* Reviews Section */}
      <ServiceReviewsGrid reviews={reviews} />

      {/* CTA Section */}
      <ServiceCTA 
        title={config.ctaTitle}
        description={config.ctaDescription}
        buttonText={config.ctaButtonText}
        serviceType="Shopify Integration"
      />

      <Footer />
    </>
  );
};

export default ShopifyIntegration;
