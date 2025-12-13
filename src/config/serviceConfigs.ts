
export interface ServicePageConfig {
  serviceType: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonUrl: string;
  services: Array<{
    title: string;
    description: string;
    icon: string;
    gradient: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
}

export const amazonConfig: ServicePageConfig = {
  serviceType: 'amazon',
  title: 'Advertising Management for Amazon Sellers',
  subtitle: 'Expert PPC & Marketplace Optimization',
  heroDescription: 'Maximize your sales on Amazon with our proven advertising strategies. We help brands achieve 350% average sales growth through expert PPC management, listing optimization, and strategic campaign planning. We are not affiliated with or endorsed by Amazon.',
  primaryButtonText: 'Get Free Audit',
  secondaryButtonText: 'View Success Stories',
  primaryButtonUrl: '/contact',
  secondaryButtonUrl: '/amazon-case-studies',
  services: [
    {
      title: 'PPC Campaign Management',
      description: 'Strategic campaign setup and optimization for maximum ROI and visibility.',
      icon: 'Target',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      title: 'Listing Optimization',
      description: 'Optimize product titles, descriptions, and images for better conversions.',
      icon: 'FileText',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Keyword Research',
      description: 'Advanced keyword analysis to dominate search results and increase visibility.',
      icon: 'Search',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Competitor Analysis',
      description: 'Deep competitor insights to gain strategic advantages and market positioning.',
      icon: 'BarChart3',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    }
  ],
  benefits: [
    {
      title: 'Proven Results',
      description: '350% average sales increase across all client accounts within 90 days.',
      icon: 'TrendingUp',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Experienced Team',
      description: 'Advertising specialists with years of marketplace experience.',
      icon: 'Users',
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Data-Driven Approach',
      description: 'Advanced analytics and optimization for maximum performance.',
      icon: 'BarChart3',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: '24/7 Monitoring',
      description: 'Continuous campaign monitoring and optimization for peak performance.',
      icon: 'Clock',
      color: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ],
  ctaTitle: 'Ready to Grow Your Amazon Business?',
  ctaDescription: 'Get your free advertising audit and discover how we can help grow your sales. We are not affiliated with or endorsed by Amazon.',
  ctaButtonText: 'Get Free Audit',
  ctaButtonUrl: '/contact'
};

export const googleConfig: ServicePageConfig = {
  serviceType: 'google-advertising',
  title: 'Google Advertising Management',
  subtitle: 'Expert Google Ads & Search Marketing',
  heroDescription: 'Drive targeted traffic and conversions with strategic Google Ads campaigns. We help businesses achieve exceptional ROI through expert PPC management and search marketing optimization.',
  primaryButtonText: 'Get Free Google Audit',
  secondaryButtonText: 'View Success Stories',
  primaryButtonUrl: '/contact',
  secondaryButtonUrl: '/case-studies',
  services: [
    {
      title: 'Google Ads Management',
      description: 'Strategic campaign setup and optimization for maximum ROI and visibility.',
      icon: 'Target',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Search Engine Marketing',
      description: 'Comprehensive SEM strategies to dominate search results.',
      icon: 'Search',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Keyword Research',
      description: 'Advanced keyword analysis to target high-converting search terms.',
      icon: 'FileText',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      title: 'Performance Analytics',
      description: 'Detailed reporting and insights to optimize campaign performance.',
      icon: 'BarChart3',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    }
  ],
  benefits: [
    {
      title: 'High ROI',
      description: '450% average return on ad spend across all Google campaigns.',
      icon: 'DollarSign',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Expert Management',
      description: 'Google certified specialists managing your campaigns 24/7.',
      icon: 'Users',
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Conversion Focus',
      description: '60% average improvement in conversion rates.',
      icon: 'TrendingUp',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'Quality Score',
      description: '8.5+ average quality score across all managed accounts.',
      icon: 'Star',
      color: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ],
  ctaTitle: 'Ready to Dominate Google Search?',
  ctaDescription: 'Get your free Google Ads audit and discover how we can maximize your search marketing ROI.',
  ctaButtonText: 'Get Free Audit',
  ctaButtonUrl: '/contact'
};
