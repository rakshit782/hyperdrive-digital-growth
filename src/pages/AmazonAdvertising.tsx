
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServicePageLayout from "@/components/ServicePageLayout";
import { useServiceData } from "@/hooks/useServiceData";
import { useServicePageConfig } from "@/hooks/useServicePageConfig";

const AmazonAdvertising = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('amazon');
  const { configs } = useServicePageConfig();
  
  const config = configs.amazon;

  if (!config) {
    return (
      <>
        <SEOHead 
          title="Amazon PPC Management - Expert Amazon Advertising Services"
          description="Professional Amazon PPC management services. Increase sales, improve ROAS, and dominate Amazon search with our proven advertising strategies."
        />
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Amazon PPC Management - Expert Amazon Advertising Services"
        description="Professional Amazon PPC management services. Increase sales, improve ROAS, and dominate Amazon search with our proven advertising strategies."
      />
      <Header />
      <ServicePageLayout
        title={config.title}
        subtitle={config.subtitle}
        heroDescription={config.heroDescription}
        primaryButtonText={config.primaryButtonText}
        secondaryButtonText={config.secondaryButtonText}
        primaryButtonUrl={config.primaryButtonUrl}
        secondaryButtonUrl={config.secondaryButtonUrl}
        stats={stats}
        caseStudies={caseStudies}
        reviews={reviews}
        services={config.services}
        benefits={config.benefits}
        ctaTitle={config.ctaTitle}
        ctaDescription={config.ctaDescription}
        ctaButtonText={config.ctaButtonText}
        ctaButtonUrl={config.ctaButtonUrl}
        loading={loading}
      />
      <Footer />
    </>
  );
};

export default AmazonAdvertising;
