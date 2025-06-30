
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicePageLayout from "@/components/ServicePageLayout";
import { useSelectedContent } from "@/hooks/useSelectedContent";

const ShopifyDevelopment = () => {
  const selectedContent = useSelectedContent('shopify-development');

  const pageConfig = {
    serviceType: 'shopify-development',
    heroTitle: 'Custom Shopify Development',
    heroSubtitle: 'Performance & Conversion Optimization',
    heroDescription: 'Professional Shopify development services including custom themes, app integration, and performance optimization to maximize your store\'s potential.',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center',
    ctaText: 'Start Development',
    services: [
      {
        title: 'Custom Development',
        description: 'Bespoke Shopify solutions tailored to your needs',
        icon: '💻'
      },
      {
        title: 'Theme Optimization',
        description: 'Performance and conversion-focused theme updates',
        icon: '🎨'
      },
      {
        title: 'App Integration',
        description: 'Seamless third-party app integration and setup',
        icon: '🔌'
      },
      {
        title: 'Performance Tuning',
        description: 'Speed optimization and technical improvements',
        icon: '⚡'
      }
    ],
    benefits: [
      'Custom development solutions',
      'Performance optimization',
      'Mobile-responsive design',
      'SEO-friendly structure',
      'Ongoing technical support'
    ],
    stats: [
      { label: 'Page Speed', value: '+300%', description: 'Performance improvement' },
      { label: 'Conversion Rate', value: '+85%', description: 'Average increase' },
      { label: 'Projects', value: '200+', description: 'Completed developments' },
      { label: 'Client Rating', value: '4.9/5', description: 'Average satisfaction' }
    ]
  };

  return (
    <>
      <Header />
      <ServicePageLayout 
        config={pageConfig}
        caseStudies={selectedContent.caseStudies}
        reviews={selectedContent.reviews}
      />
      <Footer />
    </>
  );
};

export default ShopifyDevelopment;
