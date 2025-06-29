
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServicePageLayout from "@/components/ServicePageLayout";
import { useServiceData } from "@/hooks/useServiceData";
import { useServicePageConfig } from "@/hooks/useServicePageConfig";

const WalmartAdvertising = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('walmart');
  const { configs } = useServicePageConfig();
  
  const config = configs.walmart;

  return (
    <>
      <SEOHead 
        title="Walmart Advertising Management - Walmart Connect Experts"
        description="Professional Walmart advertising management services. Boost your Walmart sales with expert Walmart Connect campaign optimization and management."
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

export default WalmartAdvertising;
