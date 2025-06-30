
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

const AccountManagement = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('account-management');
  const { configs } = useServicePageConfig();
  
  const config = configs['account-management'] || {
    title: 'Account Management Services',
    subtitle: 'Professional E-commerce Account Oversight',
    heroDescription: 'Let our experts manage your e-commerce accounts while you focus on growing your business. We provide comprehensive account management across all major platforms.',
    primaryButtonText: 'Get Free Consultation',
    secondaryButtonText: 'View Our Process',
    ctaTitle: 'Ready for Professional Management?',
    ctaDescription: 'Get your free account audit and discover how we can optimize your e-commerce operations.',
    ctaButtonText: 'Get Free Audit'
  };

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Account Management Services - Professional E-commerce Management"
          description="Expert account management for Amazon, Walmart, and other e-commerce platforms. Focus on growth while we handle the details."
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
        title="Account Management Services - Professional E-commerce Management"
        description="Expert account management for Amazon, Walmart, and other e-commerce platforms. Focus on growth while we handle the details."
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center"
              alt="Account Management Services"
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
