
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicePageLayout from "@/components/ServicePageLayout";
import { useServiceData } from "@/hooks/useServiceData";

const ShopifyIntegration = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('shopify-integration');

  return (
    <>
      <Header />
      <ServicePageLayout 
        title="Shopify Integration Services"
        subtitle="Seamless Platform Connections"
        heroDescription="Connect your Shopify store with marketing platforms, automation tools, and analytics systems for streamlined operations and better performance."
        primaryButtonText="Start Integration"
        secondaryButtonText="View Case Studies"
        primaryButtonUrl="/contact"
        secondaryButtonUrl="/case-studies"
        stats={stats}
        caseStudies={caseStudies}
        reviews={reviews}
        loading={loading}
        services={[
          {
            title: 'Platform Integration',
            description: 'Connect Shopify with marketing and analytics platforms',
            icon: 'Link',
            gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500'
          },
          {
            title: 'Data Synchronization',
            description: 'Real-time data sync across all connected systems',
            icon: 'RefreshCw',
            gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
          },
          {
            title: 'Automated Workflows',
            description: 'Set up automated processes for efficiency',
            icon: 'Zap',
            gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
          },
          {
            title: 'Custom Solutions',
            description: 'Tailored integrations for specific business needs',
            icon: 'Settings',
            gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
          }
        ]}
        benefits={[
          {
            title: 'Seamless Platform Connections',
            description: 'Connect all your favorite tools and platforms effortlessly',
            icon: 'Link',
            color: 'bg-blue-500'
          },
          {
            title: 'Real-time Data Synchronization',
            description: 'Keep all your data in sync across platforms automatically',
            icon: 'RefreshCw',
            color: 'bg-green-500'
          },
          {
            title: 'Automated Workflow Setup',
            description: 'Set up automated processes to save time and reduce errors',
            icon: 'Zap',
            color: 'bg-purple-500'
          },
          {
            title: 'Custom Integration Solutions',
            description: 'Get custom integrations built specifically for your needs',
            icon: 'Settings',
            color: 'bg-orange-500'
          },
          {
            title: 'Technical Support Included',
            description: 'Ongoing technical support to keep everything running smoothly',
            icon: 'Headphones',
            color: 'bg-cyan-500'
          }
        ]}
        ctaTitle="Ready to Integrate Your Store?"
        ctaDescription="Connect your Shopify store with all your essential tools and start automating your workflow."
        ctaButtonText="Start Integration"
        ctaButtonUrl="/contact"
      />
      <Footer />
    </>
  );
};

export default ShopifyIntegration;
