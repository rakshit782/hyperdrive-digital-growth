
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicePageLayout from "@/components/ServicePageLayout";
import { useSelectedContent } from "@/hooks/useSelectedContent";

const ShopifyDevelopment = () => {
  const selectedContent = useSelectedContent('shopify-development');

  return (
    <>
      <Header />
      <ServicePageLayout 
        title="Custom Shopify Development"
        subtitle="Performance & Conversion Optimization"
        heroDescription="Professional Shopify development services including custom themes, app integration, and performance optimization to maximize your store's potential."
        primaryButtonText="Start Development"
        secondaryButtonText="View Case Studies"
        primaryButtonUrl="/contact"
        secondaryButtonUrl="/case-studies"
        stats={[
          { id: '1', service_type: 'shopify-development', stat_label: 'Page Speed', stat_value: '+300%', stat_description: 'Performance improvement' },
          { id: '2', service_type: 'shopify-development', stat_label: 'Conversion Rate', stat_value: '+85%', stat_description: 'Average increase' },
          { id: '3', service_type: 'shopify-development', stat_label: 'Projects', stat_value: '200+', stat_description: 'Completed developments' },
          { id: '4', service_type: 'shopify-development', stat_label: 'Client Rating', stat_value: '4.9/5', stat_description: 'Average satisfaction' }
        ]}
        caseStudies={selectedContent.caseStudies}
        reviews={selectedContent.reviews}
        services={[
          {
            title: 'Custom Development',
            description: 'Bespoke Shopify solutions tailored to your needs',
            icon: 'Code',
            gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
          },
          {
            title: 'Theme Optimization',
            description: 'Performance and conversion-focused theme updates',
            icon: 'Palette',
            gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
          },
          {
            title: 'App Integration',
            description: 'Seamless third-party app integration and setup',
            icon: 'Plug',
            gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
          },
          {
            title: 'Performance Tuning',
            description: 'Speed optimization and technical improvements',
            icon: 'Zap',
            gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
          }
        ]}
        benefits={[
          {
            title: 'Custom Development Solutions',
            description: 'Get completely custom Shopify solutions built from the ground up',
            icon: 'Code',
            color: 'bg-blue-500'
          },
          {
            title: 'Performance Optimization',
            description: 'Optimize your store for maximum speed and performance',
            icon: 'Zap',
            color: 'bg-green-500'
          },
          {
            title: 'Mobile-Responsive Design',
            description: 'Ensure your store looks perfect on all devices',
            icon: 'Smartphone',
            color: 'bg-purple-500'
          },
          {
            title: 'SEO-Friendly Structure',
            description: 'Built with SEO best practices for better search rankings',
            icon: 'Search',
            color: 'bg-orange-500'
          },
          {
            title: 'Ongoing Technical Support',
            description: 'Continuous support to keep your store running smoothly',
            icon: 'Headphones',
            color: 'bg-cyan-500'
          }
        ]}
        ctaTitle="Ready to Transform Your Store?"
        ctaDescription="Get custom Shopify development that drives conversions and delivers exceptional user experience."
        ctaButtonText="Start Development"
        ctaButtonUrl="/contact"
      />
      <Footer />
    </>
  );
};

export default ShopifyDevelopment;
