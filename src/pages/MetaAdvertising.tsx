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
import { ArrowRight, Users, Target, BarChart3, Megaphone } from "lucide-react";

const MetaAdvertising = () => {
  const { stats } = useServiceData('meta');
  const { configs } = useServicePageConfig();
  const { caseStudies, reviews } = useSelectedContent('meta');
  
  const config = configs.meta;

  const features = [
    {
      icon: Users,
      title: "Audience Mastery",
      description: "Advanced audience targeting and lookalike campaigns to reach your ideal customers on Facebook and Instagram."
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Laser-focused ad targeting using Meta's powerful demographic, interest, and behavioral data."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Comprehensive tracking and optimization to maximize your Meta advertising ROI and conversions."
    },
    {
      icon: Megaphone,
      title: "Creative Excellence",
      description: "High-converting ad creatives and copy that resonate with your target audience and drive action."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Meta Advertising Management - Facebook & Instagram Ads"
        description="Expert Meta advertising management for Facebook and Instagram. Drive brand awareness and sales with our proven social media strategies."
      />
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  📱 Meta Advertising Specialists
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-6 leading-tight">
                {config?.title || 'Scale Your Business with Meta Advertising'}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                {config?.heroDescription || 'Achieve 650% average ROAS with expert Facebook and Instagram advertising campaigns that convert prospects into loyal customers.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => window.location.href = '/free-audit'}
                >
                  {config?.primaryButtonText || 'Get Free Meta Audit'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.location.href = '/case-studies'}
                >
                  {config?.secondaryButtonText || 'View Success Stories'}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">650%</div>
                  <div className="text-sm text-slate-600">Average ROAS</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">-55%</div>
                  <div className="text-sm text-slate-600">Cost Per Lead</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">300%</div>
                  <div className="text-sm text-slate-600">Reach Increase</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop&crop=center"
                alt="Meta Advertising Management"
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
              Master Meta Advertising with Expert Strategy
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Leverage the power of Facebook and Instagram to reach billions of potential customers with precision targeting and compelling creatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
      <ServiceStatsGrid stats={stats} serviceType="Meta Advertising" />

      {/* Case Studies Section */}
      <ServiceCaseStudiesGrid caseStudies={caseStudies} />

      {/* Reviews Section */}
      <ServiceReviewsGrid reviews={reviews} />

      {/* CTA Section */}
      <ServiceCTA 
        title={config?.ctaTitle || 'Ready to Scale with Meta?'}
        description={config?.ctaDescription || 'Get your free Meta advertising audit and discover how we can 10x your social media ROI.'}
        buttonText={config?.ctaButtonText || 'Get Free Audit'}
        serviceType="Meta Advertising"
      />

      <Footer />
    </>
  );
};

export default MetaAdvertising;
