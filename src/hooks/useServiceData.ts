
import { useState, useEffect } from 'react';
import { localDB } from '@/utils/localStorageDB';

export interface ServiceCaseStudy {
  id: string;
  title: string;
  description: string;
  industry?: string;
  client_name?: string;
  image_url?: string;
  results: Record<string, string>;
  service_type: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceStat {
  id: string;
  service_type: string;
  stat_label: string;
  stat_value: string;
  stat_description: string;
  icon_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceReview {
  id: string;
  client_name: string;
  company: string;
  rating: number;
  review_text: string;
  avatar_url?: string;
  results_achieved?: string;
  service_type?: string;
  created_at?: string;
  updated_at?: string;
}

interface ServiceData {
  caseStudies: ServiceCaseStudy[];
  stats: ServiceStat[];
  reviews: ServiceReview[];
  loading: boolean;
  error: string | null;
}

const getServiceSpecificData = (serviceType: string) => {
  const serviceConfigs = {
    'account-management': {
      stats: [
        { label: 'Client Retention', value: '98%', description: 'Client satisfaction rate', icon: 'Users' },
        { label: 'Revenue Growth', value: '+150%', description: 'Average client growth', icon: 'TrendingUp' },
        { label: 'Response Time', value: '<2hrs', description: 'Average response time', icon: 'Clock' },
        { label: 'Managed Accounts', value: '200+', description: 'Successfully managed', icon: 'Shield' }
      ],
      caseStudy: {
        title: 'Strategic Account Growth Success',
        description: 'Transformed a mid-size company\'s account management strategy, resulting in exceptional growth and client satisfaction.',
        industry: 'SaaS Technology',
        results: {
          'Client Retention': '+45%',
          'Revenue Growth': '+180%',
          'Account Satisfaction': '+95%',
          'Response Time': '-70%'
        }
      },
      reviews: [
        {
          client_name: 'Jennifer Martinez',
          company: 'TechFlow Solutions',
          rating: 5,
          review_text: 'Outstanding account management that transformed our business operations. The strategic approach and attention to detail exceeded all expectations.',
          results_achieved: 'Increased efficiency by 200% and client satisfaction by 95%'
        },
        {
          client_name: 'David Thompson',
          company: 'Growth Dynamics',
          rating: 5,
          review_text: 'Professional team with incredible expertise. Our account performance improved dramatically within the first month.',
          results_achieved: 'Revenue growth of 150% and operational excellence'
        }
      ]
    },
    'shopify-integration': {
      stats: [
        { label: 'Integrations', value: '50+', description: 'Successfully completed', icon: 'Link' },
        { label: 'Automation Rate', value: '95%', description: 'Process automation', icon: 'Zap' },
        { label: 'Data Sync', value: '99.9%', description: 'Accuracy rate', icon: 'RefreshCw' },
        { label: 'Setup Time', value: '24hrs', description: 'Average integration time', icon: 'Clock' }
      ],
      caseStudy: {
        title: 'Complete Platform Integration Success',
        description: 'Integrated multiple marketing platforms with Shopify, creating seamless automation and data synchronization.',
        industry: 'E-commerce Retail',
        results: {
          'Integration Speed': '+300%',
          'Data Accuracy': '99.9%',
          'Automation Level': '95%',
          'Setup Time': '-80%'
        }
      },
      reviews: [
        {
          client_name: 'Sarah Chen',
          company: 'Modern Retail Co',
          rating: 5,
          review_text: 'Seamless integration that connected all our platforms perfectly. The automation saves us hours every day.',
          results_achieved: 'Reduced manual work by 80% and improved data accuracy'
        },
        {
          client_name: 'Mike Rodriguez',
          company: 'Digital Commerce Hub',
          rating: 5,
          review_text: 'Expert integration services that transformed our workflow. Everything works together flawlessly now.',
          results_achieved: 'Complete workflow automation and real-time data sync'
        }
      ]
    },
    'shopify-development': {
      stats: [
        { label: 'Store Speed', value: '+200%', description: 'Performance improvement', icon: 'Zap' },
        { label: 'Conversion Rate', value: '+85%', description: 'Average increase', icon: 'TrendingUp' },
        { label: 'Custom Features', value: '100+', description: 'Developed successfully', icon: 'Code' },
        { label: 'Client Satisfaction', value: '99%', description: 'Happy clients', icon: 'Star' }
      ],
      caseStudy: {
        title: 'Custom Shopify Development Excellence',
        description: 'Built a completely custom Shopify solution with advanced features, resulting in exceptional performance and user experience.',
        industry: 'Fashion E-commerce',
        results: {
          'Page Speed': '+250%',
          'Conversion Rate': '+120%',
          'Mobile Performance': '+180%',
          'User Experience': '+200%'
        }
      },
      reviews: [
        {
          client_name: 'Amanda Foster',
          company: 'Fashion Forward',
          rating: 5,
          review_text: 'Incredible custom development that took our store to the next level. The performance improvements are remarkable.',
          results_achieved: 'Page speed increased 250% and conversions up 120%'
        },
        {
          client_name: 'Robert Kim',
          company: 'Premium Goods',
          rating: 5,
          review_text: 'Top-tier Shopify development with attention to every detail. Our store now performs better than ever.',
          results_achieved: 'Complete store transformation with exceptional results'
        }
      ]
    }
  };

  return serviceConfigs[serviceType as keyof typeof serviceConfigs] || serviceConfigs['account-management'];
};

export function useServiceData(serviceType: string): ServiceData {
  const [data, setData] = useState<ServiceData>({
    caseStudies: [],
    stats: [],
    reviews: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));

        // Get service-specific configuration
        const serviceConfig = getServiceSpecificData(serviceType);
        
        // Generate stats with proper IDs
        const serviceStats: ServiceStat[] = serviceConfig.stats.map((stat, index) => ({
          id: `${serviceType}-stat-${index + 1}`,
          service_type: serviceType,
          stat_label: stat.label,
          stat_value: stat.value,
          stat_description: stat.description,
          icon_name: stat.icon,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));

        // Generate case study
        const serviceCaseStudy: ServiceCaseStudy = {
          id: `${serviceType}-case-1`,
          title: serviceConfig.caseStudy.title,
          description: serviceConfig.caseStudy.description,
          industry: serviceConfig.caseStudy.industry,
          client_name: 'Confidential Client',
          service_type: serviceType,
          results: serviceConfig.caseStudy.results,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        // Generate reviews
        const serviceReviews: ServiceReview[] = serviceConfig.reviews.map((review, index) => ({
          id: `${serviceType}-review-${index + 1}`,
          client_name: review.client_name,
          company: review.company,
          rating: review.rating,
          review_text: review.review_text,
          results_achieved: review.results_achieved,
          service_type: serviceType,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));

        setData({
          caseStudies: [serviceCaseStudy],
          stats: serviceStats,
          reviews: serviceReviews,
          loading: false,
          error: null
        });

      } catch (error) {
        console.error('Error fetching service data:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load service data'
        }));
      }
    };

    if (serviceType) {
      fetchServiceData();
    }
  }, [serviceType]);

  return data;
}
