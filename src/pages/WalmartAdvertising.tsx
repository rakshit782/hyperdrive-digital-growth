
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceStatsGrid from "@/components/ServiceStatsGrid";
import ServiceReviewsGrid from "@/components/ServiceReviewsGrid";
import ServiceCaseStudiesGrid from "@/components/ServiceCaseStudiesGrid";
import ServiceCTA from "@/components/ServiceCTA";
import { useServiceData } from "@/hooks/useServiceData";
import { useServicePageConfig } from "@/hooks/useServicePageConfig";
import { useSelectedContent } from "@/hooks/useSelectedContent";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, TrendingUp, Star, Package } from "lucide-react";

const WalmartAdvertising = () => {
  const { stats } = useServiceData('walmart');
  const { configs } = useServicePageConfig();
  const { caseStudies, reviews } = useSelectedContent('walmart');
  
  const config = configs.walmart;

  const features = [
    {
      icon: ShoppingCart,
      title: "Walmart Connect Mastery",
      description: "Expert management of Walmart's advertising platform to maximize your marketplace visibility and sales."
    },
    {
      icon: TrendingUp,
      title: "Revenue Acceleration",
      description: "Proven strategies that deliver 380% average revenue growth through optimized campaigns and bidding."
    },
    {
      icon: Star,
      title: "Brand Excellence",
      description: "Build brand authority and customer trust with strategic positioning and review management."
    },
    {
      icon: Package,
      title: "Inventory Optimization",
      description: "Smart inventory management and fulfillment strategies to maintain competitive advantage."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Walmart Advertising Management - Walmart Connect Experts"
        description="Professional Walmart advertising management services. Boost your Walmart sales with expert Walmart Connect campaign optimization and management."
      />
      <Header />
      
      <div className="space-y-32">
        {/* Enhanced Hero Section with proper spacing */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container-standard relative px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8">
                  <span className="inline-flex items-center px-6 py-3 bg-green-50 text-green-700 rounded-full text-sm font-medium font-body border border-green-100">
                    🛒 Walmart Connect Certified
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-dark mb-8 leading-tight">
                  {config?.title || 'Dominate Walmart Marketplace'}
                </h1>
                <p className="text-xl text-minimal leading-relaxed mb-10 max-w-xl font-body">
                  {config?.heroDescription || 'Achieve 380% revenue growth with expert Walmart Connect advertising strategies and marketplace optimization tailored for success.'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-12">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => window.location.href = '/free-audit'}
                  >
                    {config?.primaryButtonText || 'Get Free Walmart Audit'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white text-dark px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => window.location.href = '/case-studies'}
                  >
                    {config?.secondaryButtonText || 'View Case Studies'}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200/60">
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">380%</div>
                    <div className="text-sm text-minimal font-body mt-1">Revenue Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">40%</div>
                    <div className="text-sm text-minimal font-body mt-1">Market Share</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">4.8/5</div>
                    <div className="text-sm text-minimal font-body mt-1">Customer Rating</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-3xl opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=center"
                  alt="Walmart Advertising Management"
                  className="relative w-full rounded-3xl shadow-2xl object-cover h-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container-standard px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6">
                Excel on Walmart's Growing Marketplace
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                Tap into Walmart's massive customer base with strategic advertising campaigns that drive sales and build brand recognition.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-dark mb-4">{feature.title}</h3>
                    <p className="text-minimal leading-relaxed font-body">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <ServiceStatsGrid stats={stats} serviceType="Walmart Advertising" />

        {/* Case Studies Section */}
        <ServiceCaseStudiesGrid caseStudies={caseStudies} />

        {/* Reviews Section */}
        <ServiceReviewsGrid reviews={reviews} />

        {/* CTA Section */}
        <ServiceCTA 
          title={config?.ctaTitle || 'Ready to Conquer Walmart?'}
          description={config?.ctaDescription || 'Get your free Walmart marketplace audit and learn how we can multiply your revenue.'}
          buttonText={config?.ctaButtonText || 'Get Free Audit'}
          serviceType="Walmart Advertising"
        />
      </div>

      <Footer />
    </>
  );
};

export default WalmartAdvertising;
