
import { useState, useEffect } from 'react';

interface ServicePageConfig {
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

const defaultConfigs: Record<string, ServicePageConfig> = {
  amazon: {
    serviceType: 'amazon',
    title: 'Amazon Advertising Management',
    subtitle: 'Expert Amazon PPC & Marketplace Optimization',
    heroDescription: 'Maximize your Amazon sales with our proven advertising strategies. We help brands achieve 350% average sales growth through expert PPC management, listing optimization, and strategic campaign planning.',
    primaryButtonText: 'Get Free Amazon Audit',
    secondaryButtonText: 'View Success Stories',
    primaryButtonUrl: '/contact',
    secondaryButtonUrl: '/amazon-case-studies',
    services: [
      {
        title: 'Amazon PPC Management',
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
        title: 'Expert Team',
        description: 'Certified Amazon advertising specialists with years of marketplace experience.',
        icon: 'Users',
        color: 'bg-gradient-to-r from-blue-500 to-indigo-500'
      },
      {
        title: 'Data-Driven Approach',
        description: 'Advanced analytics and AI-powered optimization for maximum performance.',
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
    ctaTitle: 'Ready to Dominate Amazon?',
    ctaDescription: 'Get your free Amazon advertising audit and discover how we can triple your sales in 90 days.',
    ctaButtonText: 'Get Free Audit',
    ctaButtonUrl: '/contact'
  },
  walmart: {
    serviceType: 'walmart',
    title: 'Walmart Advertising Management',
    subtitle: 'Walmart Connect & Marketplace Expertise',
    heroDescription: 'Grow your business on Walmart marketplace with our expert advertising strategies. We help brands achieve 380% average revenue growth through Walmart Connect optimization and strategic marketplace positioning.',
    primaryButtonText: 'Get Free Walmart Audit',
    secondaryButtonText: 'View Case Studies',
    primaryButtonUrl: '/contact',
    secondaryButtonUrl: '/walmart-case-studies',
    services: [
      {
        title: 'Walmart Connect Ads',
        description: 'Strategic sponsored product and brand campaigns for maximum visibility.',
        icon: 'Megaphone',
        gradient: 'bg-gradient-to-r from-blue-600 to-blue-800'
      },
      {
        title: 'Marketplace Optimization',
        description: 'Complete product listing and catalog optimization for better performance.',
        icon: 'Settings',
        gradient: 'bg-gradient-to-r from-green-500 to-green-700'
      },
      {
        title: 'Inventory Management',
        description: 'Strategic inventory planning and logistics optimization for Walmart.',
        icon: 'Package',
        gradient: 'bg-gradient-to-r from-purple-500 to-purple-700'
      },
      {
        title: 'Performance Analytics',
        description: 'Advanced reporting and insights to drive continuous improvement.',
        icon: 'Analytics',
        gradient: 'bg-gradient-to-r from-orange-500 to-orange-700'
      }
    ],
    benefits: [
      {
        title: 'Marketplace Leadership',
        description: '40% average market share captured in client product categories.',
        icon: 'Crown',
        color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
      },
      {
        title: 'Revenue Growth',
        description: '380% average revenue increase for Walmart marketplace clients.',
        icon: 'TrendingUp',
        color: 'bg-gradient-to-r from-green-500 to-emerald-500'
      },
      {
        title: 'Operational Excellence',
        description: '3x improvement in inventory turnover and operational efficiency.',
        icon: 'Zap',
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
      },
      {
        title: 'Customer Satisfaction',
        description: '4.8/5 average customer rating across all managed listings.',
        icon: 'Star',
        color: 'bg-gradient-to-r from-purple-500 to-pink-500'
      }
    ],
    ctaTitle: 'Ready to Conquer Walmart?',
    ctaDescription: 'Get your free Walmart marketplace audit and learn how we can multiply your revenue.',
    ctaButtonText: 'Get Free Audit',
    ctaButtonUrl: '/contact'
  },
  meta: {
    serviceType: 'meta',
    title: 'Meta Advertising Management',
    subtitle: 'Facebook & Instagram Advertising Excellence',
    heroDescription: 'Drive explosive growth with our Meta advertising expertise. We help businesses achieve 650% average ROAS through strategic Facebook and Instagram campaigns that convert prospects into customers.',
    primaryButtonText: 'Get Free Meta Audit',
    secondaryButtonText: 'View Success Stories',
    primaryButtonUrl: '/contact',
    secondaryButtonUrl: '/meta-case-studies',
    services: [
      {
        title: 'Facebook Advertising',
        description: 'Strategic Facebook ad campaigns designed for maximum reach and conversions.',
        icon: 'Facebook',
        gradient: 'bg-gradient-to-r from-blue-600 to-blue-800'
      },
      {
        title: 'Instagram Marketing',
        description: 'Visual storytelling and engagement strategies that drive real results.',
        icon: 'Instagram',
        gradient: 'bg-gradient-to-r from-pink-500 to-purple-600'
      },
      {
        title: 'Audience Targeting',
        description: 'Advanced audience research and targeting for precise customer acquisition.',
        icon: 'Target',
        gradient: 'bg-gradient-to-r from-green-500 to-emerald-600'
      },
      {
        title: 'Creative Optimization',
        description: 'High-converting ad creatives and A/B testing for optimal performance.',
        icon: 'Palette',
        gradient: 'bg-gradient-to-r from-orange-500 to-red-600'
      }
    ],
    benefits: [
      {
        title: 'Exceptional ROAS',
        description: '650% average return on ad spend across all Meta campaigns.',
        icon: 'DollarSign',
        color: 'bg-gradient-to-r from-green-500 to-emerald-500'
      },
      {
        title: 'Cost Efficiency',
        description: '55% average reduction in cost per lead through optimization.',
        icon: 'TrendingDown',
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
      },
      {
        title: 'Conversion Excellence',
        description: '45% average improvement in conversion rates for all clients.',
        icon: 'ArrowUp',
        color: 'bg-gradient-to-r from-purple-500 to-pink-500'
      },
      {
        title: 'Audience Expansion',
        description: '300% average increase in qualified audience reach and engagement.',
        icon: 'Users',
        color: 'bg-gradient-to-r from-orange-500 to-red-500'
      }
    ],
    ctaTitle: 'Ready to Scale with Meta?',
    ctaDescription: 'Get your free Meta advertising audit and discover how we can 10x your social media ROI.',
    ctaButtonText: 'Get Free Audit',
    ctaButtonUrl: '/contact'
  }
};

export const useServicePageConfig = () => {
  const [configs, setConfigs] = useState(defaultConfigs);
  const [loading, setLoading] = useState(false);

  const saveConfig = async (serviceType: string, config: ServicePageConfig) => {
    // This would save to a database in a real implementation
    setConfigs(prev => ({
      ...prev,
      [serviceType]: config
    }));
    
    // Save to localStorage for persistence
    localStorage.setItem(`servicePageConfig_${serviceType}`, JSON.stringify(config));
  };

  const refetch = () => {
    // Load from localStorage if available
    Object.keys(defaultConfigs).forEach(serviceType => {
      const saved = localStorage.getItem(`servicePageConfig_${serviceType}`);
      if (saved) {
        try {
          const config = JSON.parse(saved);
          setConfigs(prev => ({
            ...prev,
            [serviceType]: config
          }));
        } catch (error) {
          console.error('Error loading saved config:', error);
        }
      }
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return { configs, loading, saveConfig, refetch };
};
