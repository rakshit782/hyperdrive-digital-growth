
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

        // Fetch case studies for this service
        const allCaseStudies = await localDB.findAll('case_studies');
        const serviceCaseStudies = allCaseStudies.filter((cs: any) => 
          cs.service_type === serviceType || cs.services?.includes(serviceType)
        );

        // Fetch stats for this service
        const allStats = await localDB.findAll('stats');
        const serviceStats = allStats.filter((stat: any) => stat.service_type === serviceType);

        // If no specific stats exist, create default ones
        const defaultStats: ServiceStat[] = serviceStats.length > 0 ? serviceStats : [
          {
            id: `${serviceType}-1`,
            service_type: serviceType,
            stat_label: 'Success Rate',
            stat_value: '95%',
            stat_description: 'Client satisfaction rate',
            icon_name: 'TrendingUp'
          },
          {
            id: `${serviceType}-2`,
            service_type: serviceType,
            stat_label: 'Growth',
            stat_value: '+200%',
            stat_description: 'Average performance increase',
            icon_name: 'BarChart3'
          },
          {
            id: `${serviceType}-3`,
            service_type: serviceType,
            stat_label: 'Experience',
            stat_value: '5+ Years',
            stat_description: 'Industry expertise',
            icon_name: 'Award'
          },
          {
            id: `${serviceType}-4`,
            service_type: serviceType,
            stat_label: 'Projects',
            stat_value: '100+',
            stat_description: 'Completed successfully',
            icon_name: 'CheckCircle'
          }
        ];

        // Fetch reviews (general reviews for now)
        const allReviews = await localDB.findAll('reviews');
        const serviceReviews: ServiceReview[] = allReviews.length > 0 ? allReviews.slice(0, 6) : [
          {
            id: '1',
            client_name: 'Sarah Johnson',
            company: 'TechCorp Inc.',
            rating: 5,
            review_text: 'Outstanding service and exceptional results. Highly recommend!',
            service_type: serviceType
          },
          {
            id: '2',
            client_name: 'Michael Chen',
            company: 'GrowthCo',
            rating: 5,
            review_text: 'Professional team with excellent communication and delivery.',
            service_type: serviceType
          }
        ];

        setData({
          caseStudies: serviceCaseStudies,
          stats: defaultStats,
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

    fetchServiceData();
  }, [serviceType]);

  return data;
}
