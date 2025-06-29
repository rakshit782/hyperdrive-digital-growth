
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServicePageLayout from "@/components/ServicePageLayout";
import { useServiceData } from "@/hooks/useServiceData";
import { useServicePageConfig } from "@/hooks/useServicePageConfig";

const MetaAdvertising = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('meta');
  const { configs } = useServicePageConfig();
  
  const config = configs.meta;

  return (
    <>
      <SEOHead 
        title="Meta Advertising Management - Facebook & Instagram Ads"
        description="Expert Meta advertising management for Facebook and Instagram. Drive brand awareness and sales with our proven social media strategies."
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

export default MetaAdvertising;
