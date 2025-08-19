
import { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import * as LucideIcons from 'lucide-react';

interface UnifiedServicePageProps {
  serviceType: string;
  defaultTitle?: string;
  defaultSubtitle?: string;
  defaultHeroDescription?: string;
  defaultPrimaryButtonText?: string;
  defaultSecondaryButtonText?: string;
  defaultPrimaryButtonUrl?: string;
  defaultSecondaryButtonUrl?: string;
  defaultCtaTitle?: string;
  defaultCtaDescription?: string;
  defaultCtaButtonText?: string;
  defaultCtaButtonUrl?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultHeroImage?: string;
  defaultHeroImageAlt?: string;
  defaultBadgeText?: string;
  defaultBadgeIcon?: string;
  defaultGradientClass?: string;
  defaultPrimaryColor?: string;
  defaultSecondaryColor?: string;
  features: Array<{
    icon: any;
    title: string;
    description: string;
    gradient: string;
  }>;
  // Accept all the props that service pages pass
  title?: string;
  subtitle?: string;
  heroDescription?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonUrl?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  heroImage?: string;
  heroImageAlt?: string;
  badgeText?: string;
  badgeIcon?: string;
  gradientClass?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

interface ServicePageData {
  service_type: string;
  title: string;
  subtitle: string;
  description: string;
  hero_image: string;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
}

interface ServiceCard {
  id: string;
  service_type: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
  sort_order: number;
  is_active: boolean;
}

const UnifiedServicePage = ({
  serviceType,
  defaultTitle = 'Service Page',
  defaultSubtitle = 'Professional Services',
  defaultHeroDescription = 'Professional service description',
  defaultPrimaryButtonText = 'Get Started',
  defaultSecondaryButtonText = 'Learn More',
  defaultPrimaryButtonUrl = '/contact',
  defaultSecondaryButtonUrl = '/case-studies',
  defaultCtaTitle = 'Ready to Get Started?',
  defaultCtaDescription = 'Contact us today to learn more about our services.',
  defaultCtaButtonText = 'Get Started',
  defaultCtaButtonUrl = '/contact',
  defaultSeoTitle = 'Professional Services',
  defaultSeoDescription = 'Professional service description for SEO',
  defaultHeroImage = 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center',
  defaultHeroImageAlt = 'Service Image',
  defaultBadgeText = 'Professional Service',
  defaultBadgeIcon = '🚀',
  defaultGradientClass = 'bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20',
  defaultPrimaryColor = 'blue',
  defaultSecondaryColor = 'indigo',
  features,
  // Accept props passed by service pages
  title: propTitle,
  subtitle: propSubtitle,
  heroDescription: propHeroDescription,
  primaryButtonText: propPrimaryButtonText,
  secondaryButtonText: propSecondaryButtonText,
  primaryButtonUrl: propPrimaryButtonUrl,
  secondaryButtonUrl: propSecondaryButtonUrl,
  ctaTitle: propCtaTitle,
  ctaDescription: propCtaDescription,
  ctaButtonText: propCtaButtonText,
  ctaButtonUrl: propCtaButtonUrl,
  seoTitle: propSeoTitle,
  seoDescription: propSeoDescription,
  heroImage: propHeroImage,
  heroImageAlt: propHeroImageAlt,
  badgeText: propBadgeText,
  badgeIcon: propBadgeIcon,
  gradientClass: propGradientClass,
  primaryColor: propPrimaryColor,
  secondaryColor: propSecondaryColor,
}: UnifiedServicePageProps) => {
  const { caseStudies, stats } = useServiceData(serviceType);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ServiceCaseStudy | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pageData, setPageData] = useState<ServicePageData | null>(null);
  const [serviceCards, setServiceCards] = useState<ServiceCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        // Fetch page data
        const { data: pageDataRes } = await supabase
          .from('service_pages')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .single();

        // Fetch service cards with proper type conversion
        const { data: cardsRes } = await supabase
          .from('service_cards')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        setPageData(pageDataRes);
        
        // Convert the features from Json to string[] if needed
        const convertedCards = cardsRes?.map(card => ({
          ...card,
          features: Array.isArray(card.features) ? card.features : []
        })) || [];
        
        setServiceCards(convertedCards);
      } catch (error) {
        console.error('Error fetching page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [serviceType]);

  const handleCaseStudyClick = (caseStudy: ServiceCaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCaseStudy(null);
  };

  // Convert service cards to features format
  const dynamicFeatures = serviceCards.map(card => {
    // Get icon component from Lucide Icons
    const IconComponent = (LucideIcons as any)[card.icon] || LucideIcons.Star;
    
    return {
      title: card.title,
      description: card.description,
      icon: IconComponent,
      gradient: card.gradient || 'bg-gradient-to-r from-blue-500 to-indigo-500'
    };
  });

  // Use dynamic features if available, otherwise fall back to default features
  const finalFeatures = dynamicFeatures.length > 0 ? dynamicFeatures : features;

  // Use page data if available, otherwise use props, then defaults
  const title = pageData?.title || propTitle || defaultTitle;
  const subtitle = pageData?.subtitle || propSubtitle || defaultSubtitle;
  const heroDescription = pageData?.description || propHeroDescription || defaultHeroDescription;
  const seoTitle = pageData?.meta_title || propSeoTitle || defaultSeoTitle;
  const seoDescription = pageData?.meta_description || propSeoDescription || defaultSeoDescription;
  const heroImage = pageData?.hero_image || propHeroImage || defaultHeroImage;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} />
      <div className={propGradientClass || defaultGradientClass}>
        <Header />
        
        <div className="space-y-12">
          <HeroSection
            title={title}
            subtitle={subtitle}
            heroDescription={heroDescription}
            primaryButtonText={propPrimaryButtonText || defaultPrimaryButtonText}
            secondaryButtonText={propSecondaryButtonText || defaultSecondaryButtonText}
            primaryButtonUrl={propPrimaryButtonUrl || defaultPrimaryButtonUrl}
            secondaryButtonUrl={propSecondaryButtonUrl || defaultSecondaryButtonUrl}
            heroImage={heroImage}
            heroImageAlt={propHeroImageAlt || defaultHeroImageAlt}
            badgeText={propBadgeText || defaultBadgeText}
            badgeIcon={propBadgeIcon || defaultBadgeIcon}
            primaryColor={propPrimaryColor || defaultPrimaryColor}
            secondaryColor={propSecondaryColor || defaultSecondaryColor}
          />

          <FeaturesSection
            title={title}
            features={finalFeatures}
          />

          <StatsSection
            stats={stats}
            primaryColor={propPrimaryColor || defaultPrimaryColor}
            secondaryColor={propSecondaryColor || defaultSecondaryColor}
          />

          <CaseStudiesSection
            title={title}
            caseStudies={caseStudies}
            serviceType={serviceType}
            primaryColor={propPrimaryColor || defaultPrimaryColor}
            secondaryColor={propSecondaryColor || defaultSecondaryColor}
            onCaseStudyClick={handleCaseStudyClick}
          />

          <CTASection
            ctaTitle={propCtaTitle || defaultCtaTitle}
            ctaDescription={propCtaDescription || defaultCtaDescription}
            ctaButtonText={propCtaButtonText || defaultCtaButtonText}
            ctaButtonUrl={propCtaButtonUrl || defaultCtaButtonUrl}
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
