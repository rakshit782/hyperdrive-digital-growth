
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
import { ArrowRight, UserCheck, BarChart3, Shield, Settings, Target, TrendingUp } from "lucide-react";

const AccountManagement = () => {
  const { caseStudies, stats, reviews } = useServiceData('account-management');
  const { configs } = useServicePageConfig();
  
  const config = configs['account-management'] || {
    title: 'Expert Account Management Services',
    subtitle: 'Focus on Growth While We Handle the Operations',
    heroDescription: 'Let our certified e-commerce specialists manage your accounts across Amazon, Walmart, and other major marketplaces. We handle the complexities so you can focus on scaling your business.',
    primaryButtonText: 'Get Free Account Audit',
    secondaryButtonText: 'View Our Process',
    ctaTitle: 'Ready for Professional Management?',
    ctaDescription: 'Get your comprehensive account audit and discover how we can optimize your e-commerce operations for maximum profitability.',
    ctaButtonText: 'Start Your Free Audit'
  };

  const features = [
    {
      icon: UserCheck,
      title: "Dedicated Account Specialists",
      description: "Your dedicated team of certified marketplace experts handle all day-to-day operations and optimization tasks."
    },
    {
      icon: BarChart3,
      title: "Performance Monitoring",
      description: "Real-time monitoring of your account health, metrics, and performance with proactive issue resolution."
    },
    {
      icon: Shield,
      title: "Compliance & Protection",
      description: "Ensure your accounts stay compliant with platform policies and protect against suspensions or violations."
    },
    {
      icon: Settings,
      title: "Complete Operations Management",
      description: "From inventory management to customer service, we handle all operational aspects of your accounts."
    },
    {
      icon: Target,
      title: "Strategic Growth Planning",
      description: "Data-driven strategies to expand your presence and increase market share across all platforms."
    },
    {
      icon: TrendingUp,
      title: "Revenue Optimization",
      description: "Continuous optimization of pricing, listings, and campaigns to maximize your revenue potential."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Professional Account Management Services - E-commerce Experts"
        description="Expert account management for Amazon, Walmart, and other e-commerce platforms. Dedicated specialists handle operations while you focus on growth."
      />
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                  🎯 Certified Account Specialists
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-emerald-900 to-blue-900 bg-clip-text text-transparent mb-6 leading-tight">
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
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
                  <div className="text-2xl font-bold text-slate-900">99.5%</div>
                  <div className="text-sm text-slate-600">Uptime Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">24/7</div>
                  <div className="text-sm text-slate-600">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">250%</div>
                  <div className="text-sm text-slate-600">Avg Growth</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center"
                alt="Account Management Services"
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
              Complete E-commerce Account Management
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive approach ensures your accounts are optimized, compliant, and continuously growing while you focus on strategic business decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
      <ServiceStatsGrid stats={stats} serviceType="Account Management" />

      {/* Case Studies Section */}
      <ServiceCaseStudiesGrid caseStudies={caseStudies} />

      {/* Reviews Section */}
      <ServiceReviewsGrid reviews={reviews} />

      {/* CTA Section */}
      <ServiceCTA 
        title={config.ctaTitle}
        description={config.ctaDescription}
        buttonText={config.ctaButtonText}
        serviceType="Account Management"
      />

      <Footer />
    </>
  );
};

export default AccountManagement;
