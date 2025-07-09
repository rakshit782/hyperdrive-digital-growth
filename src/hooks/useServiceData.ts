
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useServiceData = (serviceType: string) => {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        // Fetch case studies for this service type
        const { data: caseStudiesData } = await supabase
          .from('service_case_studies')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        // Fetch stats for this service type
        const { data: statsData } = await supabase
          .from('service_stats')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        // Fetch reviews for this service type
        const { data: reviewsData } = await supabase
          .from('service_reviews')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        setCaseStudies(caseStudiesData || []);
        setStats(statsData || []);
        setReviews(reviewsData || []);
      } catch (error) {
        console.error('Error fetching service data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [serviceType]);

  return { caseStudies, stats, reviews, loading };
};
