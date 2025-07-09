
import { Target, Search, FileText, BarChart3 } from 'lucide-react';
import UnifiedServicePage from '@/components/UnifiedServicePage';

const GoogleAdvertising = () => {
  const features = [
    {
      title: 'Google Ads Management',
      description: 'Strategic campaign setup and optimization for maximum ROI and visibility',
      icon: Target,
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Search Engine Marketing',
      description: 'Comprehensive SEM strategies to dominate search results',
      icon: Search,
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Keyword Research',
      description: 'Advanced keyword analysis to target high-converting search terms',
      icon: FileText,
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      title: 'Performance Analytics',
      description: 'Detailed reporting and insights to optimize campaign performance',
      icon: BarChart3,
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    }
  ];

  return (
    <UnifiedServicePage
      serviceType="google-advertising"
      title="Google Advertising Services"
      subtitle="Expert Google Ads & Search Marketing"
      heroDescription="Drive targeted traffic and conversions with strategic Google Ads campaigns. We help businesses achieve exceptional ROI through expert PPC management and search marketing optimization."
      primaryButtonText="Get Free Google Audit"
      secondaryButtonText="View Success Stories"
      primaryButtonUrl="/free-audit"
      secondaryButtonUrl="/case-studies"
      ctaTitle="Ready to Dominate Google Search?"
      ctaDescription="Get your free Google Ads audit and discover how we can maximize your search marketing ROI."
      ctaButtonText="Get Free Audit"
      ctaButtonUrl="/free-audit"
      seoTitle="Google Advertising Management - Expert Google Ads Services"
      seoDescription="Professional Google advertising management services. Drive targeted traffic and maximize ROI with our proven Google Ads strategies."
      heroImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center"
      heroImageAlt="Google Advertising Management"
      badgeText="Google Ads Certified"
      badgeIcon="🎯"
      gradientClass="bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-50/20"
      primaryColor="red"
      secondaryColor="orange"
      features={features}
    />
  );
};

export default GoogleAdvertising;
