
import { Link, BarChart3, TrendingUp, Zap } from 'lucide-react';
import UnifiedServicePage from '@/components/UnifiedServicePage';

const ShopifyIntegration = () => {
  const features = [
    {
      title: 'Payment Gateways',
      description: 'Seamless integration with multiple payment processors',
      icon: Link,
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Analytics & Tracking',
      description: 'Comprehensive tracking setup for marketing analysis',
      icon: BarChart3,
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Marketing Tools',
      description: 'Connect with powerful marketing automation platforms',
      icon: TrendingUp,
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'Performance Optimization',
      description: 'Speed and performance integrations for better UX',
      icon: Zap,
      gradient: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    }
  ];

  return (
    <UnifiedServicePage
      serviceType="shopify-integration"
      title="Shopify Integration Services"
      subtitle="Connect & Optimize Your E-commerce Stack"
      heroDescription="Maximize your Shopify store's potential with seamless integrations. Connect payment gateways, marketing tools, analytics, and third-party apps for a complete e-commerce solution."
      primaryButtonText="Start Integration"
      secondaryButtonText="View Integrations"
      primaryButtonUrl="/contact"
      secondaryButtonUrl="/case-studies"
      ctaTitle="Ready to Connect Your Store?"
      ctaDescription="Let us integrate the tools you need to grow your Shopify business."
      ctaButtonText="Start Integration Today"
      ctaButtonUrl="/contact"
      seoTitle="Shopify Integration Services - Connect Your Store"
      seoDescription="Professional Shopify integration services. Connect payment gateways, analytics, marketing tools, and third-party apps to optimize your store."
      heroImage="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center"
      heroImageAlt="Shopify Integration Services"
      badgeText="Shopify Integration Experts"
      badgeIcon="🔗"
      gradientClass="bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20"
      primaryColor="blue"
      secondaryColor="indigo"
      features={features}
    />
  );
};

export default ShopifyIntegration;
