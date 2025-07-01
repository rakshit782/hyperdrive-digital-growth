
import { useState, useEffect } from 'react';
import { localDB } from '@/utils/localStorageDB';

interface ServiceData {
  caseStudies: any[];
  stats: any[];
  reviews: any[];
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
        const serviceCaseStudies = allCaseStudies.filter(cs => 
          cs.service_type === serviceType || cs.services?.includes(serviceType)
        );

        // Fetch stats for this service
        const allStats = await localDB.findAll('stats');
        const serviceStats = allStats.filter(stat => stat.service_type === serviceType);

        // If no specific stats exist, create default ones
        const defaultStats = serviceStats.length > 0 ? serviceStats : [
          {
            id: `${serviceType}-1`,
            service_type: serviceType,
            stat_label: 'Success Rate',
            stat_value: '95%',
            stat_description: 'Client satisfaction rate'
          },
          {
            id: `${serviceType}-2`,
            service_type: serviceType,
            stat_label: 'Growth',
            stat_value: '+200%',
            stat_description: 'Average performance increase'
          },
          {
            id: `${serviceType}-3`,
            service_type: serviceType,
            stat_label: 'Experience',
            stat_value: '5+ Years',
            stat_description: 'Industry expertise'
          },
          {
            id: `${serviceType}-4`,
            service_type: serviceType,
            stat_label: 'Projects',
            stat_value: '100+',
            stat_description: 'Completed successfully'
          }
        ];

        // Fetch reviews (general reviews for now)
        const allReviews = await localDB.findAll('reviews');
        const serviceReviews = allReviews.length > 0 ? allReviews.slice(0, 6) : [
          {
            id: '1',
            name: 'Sarah Johnson',
            company: 'TechCorp Inc.',
            rating: 5,
            review: 'Outstanding service and exceptional results. Highly recommend!'
          },
          {
            id: '2',
            name: 'Michael Chen',
            company: 'GrowthCo',
            rating: 5,
            review: 'Professional team with excellent communication and delivery.'
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
