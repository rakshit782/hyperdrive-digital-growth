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
    primaryButtonUrl: '/free-audit',
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
    ctaButtonUrl: '/free-audit'
  },
  walmart: {
    serviceType: 'walmart',
    title: 'Walmart Advertising Management',
    subtitle: 'Walmart Connect & Marketplace Expertise',
    heroDescription: 'Grow your business on Walmart marketplace with our expert advertising strategies. We help brands achieve 380% average revenue growth through Walmart Connect optimization and strategic marketplace positioning.',
    primaryButtonText: 'Get Free Walmart Audit',
    secondaryButtonText: 'View Case Studies',
    primaryButtonUrl: '/free-audit',
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
        icon: 'BarChart3',
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
    ctaButtonUrl: '/free-audit'
  },
  meta: {
    serviceType: 'meta',
    title: 'Meta Advertising Management',
    subtitle: 'Facebook & Instagram Advertising Excellence',
    heroDescription: 'Drive explosive growth with our Meta advertising expertise. We help businesses achieve 650% average ROAS through strategic Facebook and Instagram campaigns that convert prospects into customers.',
    primaryButtonText: 'Get Free Meta Audit',
    secondaryButtonText: 'View Success Stories',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/case-studies',
    services: [
      {
        title: 'Facebook Advertising',
        description: 'Strategic Facebook ad campaigns designed for maximum reach and conversions.',
        icon: 'Users',
        gradient: 'bg-gradient-to-r from-blue-600 to-blue-800'
      },
      {
        title: 'Instagram Marketing',
        description: 'Visual storytelling and engagement strategies that drive real results.',
        icon: 'Camera',
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
    ctaButtonUrl: '/free-audit'
  },
  'account-management': {
    serviceType: 'account-management',
    title: 'Account Management Services',
    subtitle: 'Professional E-commerce Account Oversight',
    heroDescription: 'Let our experts manage your e-commerce accounts while you focus on growing your business. We provide comprehensive account management across all major platforms with dedicated specialists.',
    primaryButtonText: 'Get Free Consultation',
    secondaryButtonText: 'View Our Process',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/case-studies',
    services: [
      {
        title: 'Account Optimization',
        description: 'Continuous optimization of your marketplace accounts for maximum performance.',
        icon: 'Settings',
        gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
      },
      {
        title: 'Performance Monitoring',
        description: '24/7 monitoring and reporting on all your e-commerce metrics and KPIs.',
        icon: 'BarChart3',
        gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
      },
      {
        title: 'Issue Resolution',
        description: 'Rapid response to account issues, policy violations, and marketplace problems.',
        icon: 'Shield',
        gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
      },
      {
        title: 'Strategic Planning',
        description: 'Long-term strategic planning and growth recommendations for your accounts.',
        icon: 'Target',
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
      }
    ],
    benefits: [
      {
        title: 'Time Freedom',
        description: 'Save 40+ hours per week by letting experts manage your accounts.',
        icon: 'Clock',
        color: 'bg-gradient-to-r from-blue-500 to-indigo-500'
      },
      {
        title: 'Expert Management',
        description: 'Dedicated specialists with years of marketplace experience.',
        icon: 'Users',
        color: 'bg-gradient-to-r from-green-500 to-emerald-500'
      },
      {
        title: 'Proactive Monitoring',
        description: '24/7 account monitoring and immediate issue resolution.',
        icon: 'Shield',
        color: 'bg-gradient-to-r from-orange-500 to-red-500'
      },
      {
        title: 'Growth Focus',
        description: 'Strategic guidance to scale your business across platforms.',
        icon: 'TrendingUp',
        color: 'bg-gradient-to-r from-purple-500 to-pink-500'
      }
    ],
    ctaTitle: 'Ready for Professional Management?',
    ctaDescription: 'Get your free account audit and discover how we can optimize your e-commerce operations.',
    ctaButtonText: 'Get Free Audit',
    ctaButtonUrl: '/free-audit'
  },
  'shopify-integration': {
    serviceType: 'shopify-integration',
    title: 'Shopify Integration Services',
    subtitle: 'Seamless E-commerce Platform Connections',
    heroDescription: 'Connect your Shopify store with Amazon, Walmart, and other marketplaces. We handle complex integrations so you can sell everywhere without the technical headaches.',
    primaryButtonText: 'Get Integration Quote',
    secondaryButtonText: 'View Integrations',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/case-studies',
    services: [
      {
        title: 'Marketplace Integration',
        description: 'Connect Shopify to Amazon, Walmart, eBay, and other major marketplaces.',
        icon: 'Link',
        gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
      },
      {
        title: 'Inventory Sync',
        description: 'Real-time inventory synchronization across all connected platforms.',
        icon: 'RefreshCw',
        gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
      },
      {
        title: 'Order Management',
        description: 'Centralized order processing and fulfillment across all channels.',
        icon: 'ShoppingCart',
        gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
      },
      {
        title: 'Data Analytics',
        description: 'Unified reporting and analytics across all integrated platforms.',
        icon: 'BarChart3',
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
      }
    ],
    benefits: [
      {
        title: 'Multi-Channel Sales',
        description: 'Sell on multiple platforms with a single inventory system.',
        icon: 'Globe',
        color: 'bg-gradient-to-r from-blue-500 to-indigo-500'
      },
      {
        title: 'Automated Sync',
        description: 'Automatic inventory and pricing updates across all channels.',
        icon: 'RefreshCw',
        color: 'bg-gradient-to-r from-green-500 to-emerald-500'
      },
      {
        title: 'Reduced Errors',
        description: 'Eliminate manual data entry and reduce human errors.',
        icon: 'Shield',
        color: 'bg-gradient-to-r from-orange-500 to-red-500'
      },
      {
        title: 'Scalable Growth',
        description: 'Easily expand to new marketplaces as your business grows.',
        icon: 'TrendingUp',
        color: 'bg-gradient-to-r from-purple-500 to-pink-500'
      }
    ],
    ctaTitle: 'Ready to Expand Your Reach?',
    ctaDescription: 'Get your free integration consultation and discover how we can connect your store to major marketplaces.',
    ctaButtonText: 'Get Free Consultation',
    ctaButtonUrl: '/free-audit'
  },
  'shopify-development': {
    serviceType: 'shopify-development',
    title: 'Shopify Development Services',
    subtitle: 'Custom Store Development & Optimization',
    heroDescription: 'Build high-converting Shopify stores that drive sales and provide exceptional user experiences. From custom themes to advanced functionality, we create stores that scale.',
    primaryButtonText: 'Start Your Project',
    secondaryButtonText: 'View Portfolio',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/case-studies',
    services: [
      {
        title: 'Custom Theme Development',
        description: 'Unique, brand-focused themes designed for maximum conversions.',
        icon: 'Palette',
        gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
      },
      {
        title: 'App Development',
        description: 'Custom Shopify apps to extend functionality and improve user experience.',
        icon: 'Smartphone',
        gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
      },
      {
        title: 'Performance Optimization',
        description: 'Speed optimization and mobile responsiveness for better conversions.',
        icon: 'Zap',
        gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
      },
      {
        title: 'Migration Services',
        description: 'Seamless migration from other platforms to Shopify without data loss.',
        icon: 'ArrowRight',
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
      }
    ],
    benefits: [
      {
        title: 'High Conversions',
        description: '85% average increase in conversion rates with our custom stores.',
        icon: 'TrendingUp',
        color: 'bg-gradient-to-r from-green-500 to-emerald-500'
      },
      {
        title: 'Lightning Fast',
        description: '95+ PageSpeed scores and under 2-second load times.',
        icon: 'Zap',
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
      },
      {
        title: 'Mobile First',
        description: 'Perfect mobile experience with responsive design principles.',
        icon: 'Smartphone',
        color: 'bg-gradient-to-r from-purple-500 to-pink-500'
      },
      {
        title: 'SEO Optimized',
        description: 'Built-in SEO best practices for better search rankings.',
        icon: 'Search',
        color: 'bg-gradient-to-r from-orange-500 to-red-500'
      }
    ],
    ctaTitle: 'Ready to Build Your Dream Store?',
    ctaDescription: 'Get your free Shopify development consultation and discover how we can create the perfect store for your business.',
    ctaButtonText: 'Get Free Consultation',
    ctaButtonUrl: '/free-audit'
  },
  'website-development': {
    serviceType: 'website-development',
    title: 'Website Development Services',
    subtitle: 'Custom Web Solutions That Convert',
    heroDescription: 'Create powerful, responsive websites that drive results. From corporate sites to complex web applications, we build digital solutions that grow with your business.',
    primaryButtonText: 'Start Your Project',
    secondaryButtonText: 'View Our Work',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/case-studies',
    services: [
      {
        title: 'Custom Web Development',
        description: 'Fully custom websites built with modern technologies and best practices.',
        icon: 'Code',
        gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
      },
      {
        title: 'Responsive Design',
        description: 'Mobile-first design approach ensuring perfect experience on all devices.',
        icon: 'Smartphone',
        gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
      },
      {
        title: 'CMS Integration',
        description: 'Easy-to-use content management systems for effortless updates.',
        icon: 'Edit',
        gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
      },
      {
        title: 'SEO Optimization',
        description: 'Built-in SEO best practices for maximum search engine visibility.',
        icon: 'Search',
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
      }
    ],
    benefits: [
      {
        title: 'High Performance',
        description: '98+ performance scores and lightning-fast load times.',
        icon: 'Zap',
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
      },
      {
        title: 'Lead Generation',
        description: '400% average increase in qualified leads from new websites.',
        icon: 'TrendingUp',
        color: 'bg-gradient-to-r from-green-500 to-emerald-500'
      },
      {
        title: 'Mobile Excellence',
        description: 'Perfect mobile experience with 98+ mobile performance scores.',
        icon: 'Smartphone',
        color: 'bg-gradient-to-r from-purple-500 to-pink-500'
      },
      {
        title: 'SEO Ready',
        description: 'Built with SEO best practices for better search rankings.',
        icon: 'Search',
        color: 'bg-gradient-to-r from-orange-500 to-red-500'
      }
    ],
    ctaTitle: 'Ready to Transform Your Online Presence?',
    ctaDescription: 'Get your free website consultation and discover how we can create a powerful digital solution for your business.',
    ctaButtonText: 'Get Free Consultation',
    ctaButtonUrl: '/free-audit'
  }
};

export const useServicePageConfig = () => {
  const [configs, setConfigs] = useState(defaultConfigs);
  const [loading, setLoading] = useState(false);

  const saveConfig = async (serviceType: string, config: ServicePageConfig) => {
    setConfigs(prev => ({
      ...prev,
      [serviceType]: config
    }));
    
    localStorage.setItem(`servicePageConfig_${serviceType}`, JSON.stringify(config));
  };

  const refetch = () => {
    setLoading(true);
    try {
      // Ensure we start with default configs
      let newConfigs = { ...defaultConfigs };
      
      Object.keys(defaultConfigs).forEach(serviceType => {
        const saved = localStorage.getItem(`servicePageConfig_${serviceType}`);
        if (saved) {
          try {
            const config = JSON.parse(saved);
            newConfigs = {
              ...newConfigs,
              [serviceType]: { ...defaultConfigs[serviceType], ...config }
            };
          } catch (error) {
            console.error('Error loading saved config for', serviceType, ':', error);
          }
        }
      });
      
      setConfigs(newConfigs);
    } catch (error) {
      console.error('Error in refetch:', error);
      // Keep default configs on error
      setConfigs(defaultConfigs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { configs, loading, saveConfig, refetch };
};
