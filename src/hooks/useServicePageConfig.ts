
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ServicePageConfig {
  id: string;
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

const defaultConfigs: Record<string, Partial<ServicePageConfig>> = {
  amazon: {
    title: 'Amazon PPC That Drives Results',
    subtitle: '',
    heroDescription: 'Dominate Amazon search results and maximize your ROI with our expert PPC management and optimization services.',
    primaryButtonText: 'Get Free Amazon Audit',
    secondaryButtonText: 'View Case Studies',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/amazon-case-studies',
    services: [
      {
        title: 'Product Listing Optimization',
        description: 'Optimize your product listings for maximum visibility and conversion with keyword-rich titles, bullets, and descriptions.',
        icon: 'Package',
        gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
      },
      {
        title: 'Sponsored Product Ads',
        description: 'Drive targeted traffic to your products with optimized Sponsored Product campaigns that convert browsers into buyers.',
        icon: 'Target',
        gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
      },
      {
        title: 'Campaign Management',
        description: 'Full-service campaign management with continuous optimization, bid adjustments, and performance monitoring.',
        icon: 'BarChart3',
        gradient: 'bg-gradient-to-r from-green-500 to-blue-500'
      }
    ],
    benefits: [
      {
        title: 'Proven Results',
        description: 'Average 300% increase in Amazon sales within 90 days of optimization.',
        icon: 'TrendingUp',
        color: 'bg-green-500'
      },
      {
        title: 'Fast Setup',
        description: 'Get your Amazon campaigns optimized and running within 24-48 hours.',
        icon: 'Zap',
        color: 'bg-blue-500'
      },
      {
        title: 'Expert Team',
        description: 'Certified Amazon advertising specialists with years of marketplace experience.',
        icon: 'Users',
        color: 'bg-purple-500'
      }
    ],
    ctaTitle: 'Ready to Dominate Amazon?',
    ctaDescription: 'Get a free audit of your Amazon advertising performance and discover opportunities to increase your sales.',
    ctaButtonText: 'Get Your Free Amazon Audit',
    ctaButtonUrl: '/free-audit'
  },
  walmart: {
    title: 'Walmart Connect Advertising',
    subtitle: '',
    heroDescription: 'Maximize your Walmart marketplace success with expert Walmart Connect advertising management and optimization.',
    primaryButtonText: 'Get Free Walmart Audit',
    secondaryButtonText: 'View Case Studies',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/walmart-case-studies',
    services: [
      {
        title: 'Sponsored Products',
        description: 'Drive targeted traffic to your Walmart listings with optimized Sponsored Product campaigns that increase visibility and sales.',
        icon: 'ShoppingCart',
        gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
      },
      {
        title: 'Search Brand Amplifier',
        description: 'Increase brand awareness and drive traffic with Search Brand Amplifier campaigns across Walmart\'s marketplace.',
        icon: 'Target',
        gradient: 'bg-gradient-to-r from-green-500 to-blue-500'
      },
      {
        title: 'Performance Optimization',
        description: 'Continuous campaign optimization with bid management, keyword research, and performance analysis.',
        icon: 'BarChart3',
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
      }
    ],
    benefits: [
      {
        title: 'Marketplace Expertise',
        description: 'Deep understanding of Walmart\'s unique advertising platform and customer behavior.',
        icon: 'TrendingUp',
        color: 'bg-green-500'
      },
      {
        title: 'Rapid Implementation',
        description: 'Get your Walmart campaigns live and optimized within 48 hours of onboarding.',
        icon: 'Zap',
        color: 'bg-blue-500'
      },
      {
        title: 'Dedicated Support',
        description: 'Dedicated Walmart advertising specialists focused on your success.',
        icon: 'Users',
        color: 'bg-purple-500'
      }
    ],
    ctaTitle: 'Ready to Grow on Walmart?',
    ctaDescription: 'Get a free audit of your Walmart advertising performance and discover opportunities for growth.',
    ctaButtonText: 'Get Your Free Walmart Audit',
    ctaButtonUrl: '/free-audit'
  },
  meta: {
    title: 'Meta Advertising That Converts',
    subtitle: '',
    heroDescription: 'Reach your ideal customers on Facebook and Instagram with targeted campaigns that drive engagement and sales.',
    primaryButtonText: 'Get Free Meta Audit',
    secondaryButtonText: 'View Case Studies',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/meta-case-studies',
    services: [
      {
        title: 'Audience Targeting',
        description: 'Reach your ideal customers with laser-focused audience targeting based on demographics, interests, and behaviors.',
        icon: 'Target',
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-500'
      },
      {
        title: 'Custom Campaigns',
        description: 'Develop custom Facebook and Instagram campaigns tailored to your specific business goals and target audience.',
        icon: 'Users',
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
      },
      {
        title: 'Performance Analytics',
        description: 'Track, analyze, and optimize your campaigns with detailed performance reporting and actionable insights.',
        icon: 'BarChart3',
        gradient: 'bg-gradient-to-r from-green-500 to-blue-500'
      }
    ],
    benefits: [
      {
        title: 'Proven Results',
        description: 'Average 200% increase in ROAS for our Meta clients within 90 days.',
        icon: 'TrendingUp',
        color: 'bg-green-500'
      },
      {
        title: 'Fast Setup',
        description: 'Get your campaigns live and optimized within 24-48 hours of onboarding.',
        icon: 'Zap',
        color: 'bg-blue-500'
      },
      {
        title: 'Dedicated Support',
        description: 'Dedicated account managers provide personalized support and guidance.',
        icon: 'Heart',
        color: 'bg-purple-500'
      }
    ],
    ctaTitle: 'Ready to Transform Your Social Media Advertising?',
    ctaDescription: 'Get a free audit of your current Meta advertising performance and discover opportunities for growth.',
    ctaButtonText: 'Claim Your Free Audit',
    ctaButtonUrl: '/free-audit'
  }
};

export const useServicePageConfig = () => {
  const [configs, setConfigs] = useState<Record<string, ServicePageConfig>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .eq('setting_type', 'service_page');

      if (error) throw error;

      const configMap: Record<string, ServicePageConfig> = {};
      
      // Initialize with defaults
      Object.keys(defaultConfigs).forEach(serviceType => {
        configMap[serviceType] = {
          id: '',
          serviceType,
          ...defaultConfigs[serviceType]
        } as ServicePageConfig;
      });

      // Override with saved configs
      data?.forEach(setting => {
        if (setting.setting_value && typeof setting.setting_value === 'object') {
          const config = setting.setting_value as any;
          configMap[setting.setting_key] = {
            id: setting.id,
            serviceType: setting.setting_key,
            ...config
          };
        }
      });

      setConfigs(configMap);
    } catch (error) {
      console.error('Error fetching service page configs:', error);
      toast({
        title: "Error",
        description: "Failed to load service page configurations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (serviceType: string, config: ServicePageConfig) => {
    try {
      const configData = {
        title: config.title,
        subtitle: config.subtitle,
        heroDescription: config.heroDescription,
        primaryButtonText: config.primaryButtonText,
        secondaryButtonText: config.secondaryButtonText,
        primaryButtonUrl: config.primaryButtonUrl,
        secondaryButtonUrl: config.secondaryButtonUrl,
        services: config.services,
        benefits: config.benefits,
        ctaTitle: config.ctaTitle,
        ctaDescription: config.ctaDescription,
        ctaButtonText: config.ctaButtonText,
        ctaButtonUrl: config.ctaButtonUrl
      };

      if (config.id) {
        // Update existing
        const { error } = await supabase
          .from('website_settings')
          .update({
            setting_value: configData,
            updated_at: new Date().toISOString()
          })
          .eq('id', config.id);

        if (error) throw error;
      } else {
        // Create new
        const { data, error } = await supabase
          .from('website_settings')
          .insert({
            setting_key: serviceType,
            setting_type: 'service_page',
            setting_value: configData
          })
          .select()
          .single();

        if (error) throw error;
        
        config.id = data.id;
      }

      setConfigs(prev => ({
        ...prev,
        [serviceType]: config
      }));

      toast({
        title: "Success",
        description: "Service page configuration saved successfully",
      });
    } catch (error) {
      console.error('Error saving service page config:', error);
      toast({
        title: "Error",
        description: "Failed to save service page configuration",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  return {
    configs,
    loading,
    saveConfig,
    refetch: fetchConfigs
  };
};
