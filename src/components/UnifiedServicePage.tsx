
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import CaseStudyPopup from '@/components/CaseStudyPopup';
import HeroSection from '@/components/UnifiedServicePage/HeroSection';
import FeaturesSection from '@/components/UnifiedServicePage/FeaturesSection';
import StatsSection from '@/components/UnifiedServicePage/StatsSection';
import CaseStudiesSection from '@/components/UnifiedServicePage/CaseStudiesSection';
import CTASection from '@/components/UnifiedServicePage/CTASection';
import { useServiceData, ServiceCaseStudy } from '@/hooks/useServiceData';

interface UnifiedServicePageProps {
  serviceType: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonUrl: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  heroImageAlt: string;
  badgeText: string;
  badgeIcon: string;
  gradientClass: string;
  primaryColor: string;
  secondaryColor: string;
  features: Array<{
    icon: any;
    title: string;
    description: string;
    gradient: string;
  }>;
}

const UnifiedServicePage = ({
  serviceType,
  title,
  subtitle,
  heroDescription,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonUrl,
  secondaryButtonUrl,
  ctaTitle,
  ctaDescription,
  ctaButtonText,
  ctaButtonUrl,
  seoTitle,
  seoDescription,
  heroImage,
  heroImageAlt,
  badgeText,
  badgeIcon,
  gradientClass,
  primaryColor,
  secondaryColor,
  features
}: UnifiedServicePageProps) => {
  const { caseStudies, stats } = useServiceData(serviceType);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ServiceCaseStudy | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCaseStudyClick = (caseStudy: ServiceCaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCaseStudy(null);
  };

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} />
      <div className={`min-h-screen ${gradientClass}`}>
        <Header />
        
        <div className="space-y-12">
          <HeroSection
            title={title}
            subtitle={subtitle}
            heroDescription={heroDescription}
            primaryButtonText={primaryButtonText}
            secondaryButtonText={secondaryButtonText}
            primaryButtonUrl={primaryButtonUrl}
            secondaryButtonUrl={secondaryButtonUrl}
            heroImage={heroImage}
            heroImageAlt={heroImageAlt}
            badgeText={badgeText}
            badgeIcon={badgeIcon}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />

          <FeaturesSection
            title={title}
            features={features}
          />

          <StatsSection
            stats={stats}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />

          <CaseStudiesSection
            title={title}
            caseStudies={caseStudies}
            serviceType={serviceType}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onCaseStudyClick={handleCaseStudyClick}
          />

          <CTASection
            ctaTitle={ctaTitle}
            ctaDescription={ctaDescription}
            ctaButtonText={ctaButtonText}
            ctaButtonUrl={ctaButtonUrl}
          />
        </div>
      </div>
      <Footer />

      {selectedCaseStudy && (
        <CaseStudyPopup
          caseStudy={selectedCaseStudy}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default UnifiedServicePage;
