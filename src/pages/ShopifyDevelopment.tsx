
import { Code, Palette, Zap, Monitor } from 'lucide-react';
import UnifiedServicePage from '@/components/UnifiedServicePage';

const ShopifyDevelopment = () => {
  const features = [
    {
      title: 'Custom Development',
      description: 'Bespoke Shopify solutions tailored to your needs',
      icon: Code,
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Theme Customization',
      description: 'Performance and conversion-focused theme updates',
      icon: Palette,
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'Performance Optimization',
      description: 'Speed optimization and technical improvements',
      icon: Zap,
      gradient: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    },
    {
      title: 'Technical Support',
      description: 'Ongoing maintenance and technical assistance',
      icon: Monitor,
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    }
  ];

  return (
    <UnifiedServicePage
      serviceType="shopify-development"
      title="Shopify Development Services"
      subtitle="Performance & Conversion Optimization"
      heroDescription="Professional Shopify development services including custom themes, app integration, and performance optimization to maximize your store's potential."
      primaryButtonText="Start Development"
      secondaryButtonText="View Portfolio"
      primaryButtonUrl="/contact"
      secondaryButtonUrl="/case-studies"
      ctaTitle="Ready to Transform Your Store?"
      ctaDescription="Get custom Shopify development that drives conversions and delivers exceptional user experience."
      ctaButtonText="Start Development Today"
      ctaButtonUrl="/contact"
      seoTitle="Custom Shopify Development - Performance & Conversion Optimization"
      seoDescription="Professional Shopify development services including custom themes, app integration, and performance optimization to maximize your store's potential."
      heroImage="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=center"
      heroImageAlt="Shopify Development"
      badgeText="Shopify Development Experts"
      badgeIcon="🛍️"
      gradientClass="bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/20"
      primaryColor="green"
      secondaryColor="emerald"
      features={features}
    />
  );
};

export default ShopifyDevelopment;
