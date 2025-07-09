
import { Users, Heart, Target, Share2 } from 'lucide-react';
import UnifiedServicePage from '@/components/UnifiedServicePage';

const MetaAdvertising = () => {
  const features = [
    {
      title: 'Facebook Ads',
      description: 'Targeted advertising campaigns on the world\'s largest social network',
      icon: Users,
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Instagram Ads',
      description: 'Visual storytelling through engaging Instagram advertising campaigns',
      icon: Heart,
      gradient: 'bg-gradient-to-r from-pink-500 to-purple-500'
    },
    {
      title: 'Audience Development',
      description: 'Build and optimize custom audiences for maximum campaign effectiveness',
      icon: Target,
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Creative Strategy',
      description: 'Compelling ad creatives that capture attention and drive conversions',
      icon: Share2,
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ];

  return (
    <UnifiedServicePage
      serviceType="meta-advertising"
      title="Meta Advertising Services"
      subtitle="Facebook & Instagram Ads Management"
      heroDescription="Drive engagement, increase conversions, and grow your business with targeted social media advertising on Facebook and Instagram."
      primaryButtonText="Get Free Meta Audit"
      secondaryButtonText="View Case Studies"
      primaryButtonUrl="/free-audit"
      secondaryButtonUrl="/case-studies"
      ctaTitle="Ready to Scale Your Social Media Advertising?"
      ctaDescription="Get a free Meta advertising audit and discover how we can help you reach more customers and drive more conversions."
      ctaButtonText="Get Free Meta Audit"
      ctaButtonUrl="/free-audit"
      seoTitle="Meta Advertising Services - Facebook & Instagram Ads Management"
      seoDescription="Professional Meta advertising services for Facebook and Instagram. Drive engagement, increase conversions, and grow your business with targeted social media advertising."
      heroImage="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop&crop=center"
      heroImageAlt="Meta Advertising Services"
      badgeText="Meta Certified"
      badgeIcon="📱"
      gradientClass="bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/20"
      primaryColor="blue"
      secondaryColor="purple"
      features={features}
    />
  );
};

export default MetaAdvertising;
