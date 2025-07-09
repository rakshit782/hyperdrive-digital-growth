
import { ShoppingCart, Award, Monitor, Target } from 'lucide-react';
import UnifiedServicePage from '@/components/UnifiedServicePage';

const AmazonAdvertising = () => {
  const features = [
    {
      title: 'Sponsored Products',
      description: 'Target customers actively searching for your products',
      icon: ShoppingCart,
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      title: 'Sponsored Brands',
      description: 'Increase brand awareness with headline search ads',
      icon: Award,
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Sponsored Display',
      description: 'Retarget customers with display advertising',
      icon: Monitor,
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'DSP Campaigns',
      description: 'Programmatic advertising for maximum reach',
      icon: Target,
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    }
  ];

  return (
    <UnifiedServicePage
      serviceType="amazon-advertising"
      title="Amazon Advertising Services"
      subtitle="Boost Your Sales & Dominate Your Competition"
      heroDescription="Professional Amazon PPC management services to increase sales, improve rankings, and maximize your ROI with proven advertising strategies."
      primaryButtonText="Get Free Amazon Audit"
      secondaryButtonText="View Case Studies"
      primaryButtonUrl="/free-audit"
      secondaryButtonUrl="/case-studies"
      ctaTitle="Ready to Dominate Amazon?"
      ctaDescription="Get a free Amazon advertising audit and discover how we can boost your sales and rankings."
      ctaButtonText="Get Free Audit"
      ctaButtonUrl="/free-audit"
      seoTitle="Amazon Advertising Services - Boost Your Sales on Amazon"
      seoDescription="Professional Amazon PPC management services. Increase sales, improve rankings, and dominate your competition with our proven Amazon advertising strategies."
      heroImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center"
      heroImageAlt="Amazon Advertising Services"
      badgeText="Amazon Ads Certified"
      badgeIcon="🛒"
      gradientClass="bg-gradient-to-br from-orange-50 via-red-50/30 to-yellow-50/20"
      primaryColor="orange"
      secondaryColor="red"
      features={features}
    />
  );
};

export default AmazonAdvertising;
