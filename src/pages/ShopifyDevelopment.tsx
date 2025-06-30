
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
import { ArrowRight, Code, Palette, Zap, ShoppingCart, Smartphone, Globe } from "lucide-react";

const ShopifyDevelopment = () => {
  const { caseStudies, stats, reviews } = useServiceData('shopify-development');
  const { configs } = useServicePageConfig();
  
  const config = configs['shopify-development'] || {
    title: 'Custom Shopify Development',
    subtitle: 'Build High-Converting E-commerce Stores',
    heroDescription: 'Create stunning, high-performance Shopify stores that convert visitors into customers. Our expert developers build custom themes, apps, and integrations tailored to your business needs.',
    primaryButtonText: 'Start Your Project',
    secondaryButtonText: 'View Our Work',
    ctaTitle: 'Ready to Build Your Dream Store?',
    ctaDescription: 'Get your free Shopify development consultation and discover how we can create the perfect e-commerce solution for your business.',
    ctaButtonText: 'Get Free Consultation'
  };

  const features = [
    {
      icon: Code,
      title: "Custom Theme Development",
      description: "Bespoke Shopify themes built from scratch to match your brand identity and business requirements perfectly."
    },
    {
      icon: Palette,
      title: "UI/UX Design Excellence",
      description: "Beautiful, intuitive designs that enhance user experience and maximize conversion rates across all devices."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Lightning-fast loading speeds and optimal performance for better SEO rankings and user satisfaction."
    },
    {
      icon: ShoppingCart,
      title: "Advanced E-commerce Features",
      description: "Custom functionality including product configurators, subscription systems, and advanced checkout flows."
    },
    {
      icon: Smartphone,
      title: "Mobile-First Development",
      description: "Responsive designs that work flawlessly on all devices, ensuring seamless shopping experiences everywhere."
    },
    {
      icon: Globe,
      title: "Third-Party Integrations",
      description: "Seamless integration with payment gateways, shipping providers, marketing tools, and business systems."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Custom Shopify Development Services - Expert E-commerce Solutions"
        description="Professional Shopify development services. Custom themes, apps, and integrations for high-converting e-commerce stores that drive sales."
      />
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-green-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  🛍️ Shopify Plus Partners
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-green-900 to-teal-900 bg-clip-text text-transparent mb-6 leading-tight">
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
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
                  <div className="text-2xl font-bold text-slate-900">500+</div>
                  <div className="text-sm text-slate-600">Stores Built</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">98%</div>
                  <div className="text-sm text-slate-600">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">2.5s</div>
                  <div className="text-sm text-slate-600">Avg Load Time</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-500 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center"
                alt="Shopify Development Services"
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
              Complete Shopify Development Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From concept to launch, we provide end-to-end Shopify development services that transform your vision into a powerful e-commerce platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
