
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicePageLayout from "@/components/ServicePageLayout";
import { useSelectedContent } from "@/hooks/useSelectedContent";

const ShopifyIntegration = () => {
  const selectedContent = useSelectedContent('shopify-integration');

  const pageConfig = {
    serviceType: 'shopify-integration',
    heroTitle: 'Shopify Integration Services',
    heroSubtitle: 'Seamless Platform Connections',
    heroDescription: 'Connect your Shopify store with marketing platforms, automation tools, and analytics systems for streamlined operations and better performance.',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center',
    ctaText: 'Start Integration',
    services: [
      {
        title: 'Platform Integration',
        description: 'Connect Shopify with marketing and analytics platforms',
        icon: '🔗'
      },
      {
        title: 'Data Synchronization',
        description: 'Real-time data sync across all connected systems',
        icon: '🔄'
      },
      {
        title: 'Automated Workflows',
        description: 'Set up automated processes for efficiency',
        icon: '⚡'
      },
      {
        title: 'Custom Solutions',
        description: 'Tailored integrations for specific business needs',
        icon: '🛠️'
      }
    ],
    benefits: [
      'Seamless platform connections',
      'Real-time data synchronization',
      'Automated workflow setup',
      'Custom integration solutions',
      'Technical support included'
    ],
    stats: [
      { label: 'Integrations', value: '50+', description: 'Platform connections' },
      { label: 'Data Accuracy', value: '99.9%', description: 'Synchronization accuracy' },
      { label: 'Setup Time', value: '24hr', description: 'Average setup time' },
      { label: 'Uptime', value: '99.9%', description: 'System reliability' }
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

export default ShopifyIntegration;
