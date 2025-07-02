
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
      
      <div className="space-y-20 md:space-y-32">
        {/* Enhanced Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-slate-50 via-green-50 to-blue-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    🛒 Walmart Connect Certified
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-green-900 to-blue-900 bg-clip-text text-transparent mb-6 leading-tight">
                  {config?.title || 'Dominate Walmart Marketplace'}
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                  {config?.heroDescription || 'Achieve 380% revenue growth with expert Walmart Connect advertising strategies and marketplace optimization tailored for success.'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => window.location.href = '/free-audit'}
                  >
                    {config?.primaryButtonText || 'Get Free Walmart Audit'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => window.location.href = '/case-studies'}
                  >
                    {config?.secondaryButtonText || 'View Case Studies'}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">380%</div>
                    <div className="text-sm text-slate-600">Revenue Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">40%</div>
                    <div className="text-sm text-slate-600">Market Share</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">4.8/5</div>
                    <div className="text-sm text-slate-600">Customer Rating</div>
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
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Excel on Walmart's Growing Marketplace
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Tap into Walmart's massive customer base with strategic advertising campaigns that drive sales and build brand recognition.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
