
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
import { ArrowRight, TrendingUp, Target, Zap, Award } from "lucide-react";

const AmazonAdvertising = () => {
  const { stats } = useServiceData('amazon');
  const { configs } = useServicePageConfig();
  const { caseStudies, reviews } = useSelectedContent('amazon');
  
  const config = configs.amazon;

  const features = [
    {
      icon: TrendingUp,
      title: "Performance Optimization",
      description: "Advanced bid management and keyword optimization to maximize your Amazon advertising ROI."
    },
    {
      icon: Target,
      title: "Strategic Targeting",
      description: "Precision audience targeting across Sponsored Products, Brands, and Display campaigns."
    },
    {
      icon: Zap,
      title: "Campaign Automation",
      description: "Smart automation tools to scale your campaigns while maintaining optimal performance."
    },
    {
      icon: Award,
      title: "Brand Domination",
      description: "Complete brand protection and market domination strategies on Amazon marketplace."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Amazon Advertising Management - Expert Amazon PPC Services"
        description="Professional Amazon advertising management services. Increase sales, improve ROAS, and dominate Amazon search with our proven PPC strategies."
      />
      <Header />
      
      {/* Enhanced Hero Section with New Typography */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-minimal relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium font-body">
                  🚀 Amazon PPC Experts
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
                {config?.title || 'Dominate Amazon with Expert PPC Management'}
              </h1>
              <p className="text-xl text-minimal leading-relaxed mb-8 max-w-xl font-body">
                {config?.heroDescription || 'Transform your Amazon presence with data-driven advertising strategies that deliver 350% average sales growth and 4.2x ROAS.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-lg text-white px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => window.location.href = '/free-audit'}
                >
                  {config?.primaryButtonText || 'Get Free Amazon Audit'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.location.href = '/case-studies'}
                >
                  {config?.secondaryButtonText || 'View Success Stories'}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading text-slate-900">350%</div>
                  <div className="text-sm text-minimal font-body">Avg Sales Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading text-slate-900">4.2x</div>
                  <div className="text-sm text-minimal font-body">Average ROAS</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading text-slate-900">98%</div>
                  <div className="text-sm text-minimal font-body">Client Satisfaction</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-left">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center"
                alt="Amazon Advertising Management"
                className="relative w-full rounded-3xl shadow-2xl object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Typography */}
      <section className="py-16 bg-white">
        <div className="container-minimal">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
              Why Choose Our Amazon Advertising Services?
            </h2>
            <p className="text-xl text-minimal max-w-3xl mx-auto font-body">
              We combine cutting-edge technology with proven strategies to deliver exceptional results for your Amazon business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-minimal leading-relaxed font-body">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ServiceStatsGrid stats={stats} serviceType="Amazon Advertising" />

      {/* Case Studies Section */}
      <ServiceCaseStudiesGrid caseStudies={caseStudies} />

      {/* Reviews Section */}
      <ServiceReviewsGrid reviews={reviews} />

      {/* CTA Section */}
      <ServiceCTA 
        title={config?.ctaTitle || 'Ready to Dominate Amazon?'}
        description={config?.ctaDescription || 'Get your free Amazon advertising audit and discover how we can triple your sales in 90 days.'}
        buttonText={config?.ctaButtonText || 'Get Free Audit'}
        serviceType="Amazon Advertising"
      />

      <Footer />
    </>
  );
};

export default AmazonAdvertising;
