
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ServiceCaseStudy {
  id: string;
  service_type: string;
  title: string;
  description: string;
  client_name: string;
  industry: string;
  results: Record<string, string>;
  image_url?: string;
  is_featured: boolean;
}

export interface ServiceStat {
  id: string;
  service_type: string;
  stat_label: string;
  stat_value: string;
  stat_description?: string;
  icon_name?: string;
}

export interface ServiceReview {
  id: string;
  service_type: string;
  client_name: string;
  company: string;
  rating: number;
  review_text: string;
  avatar_url?: string;
  results_achieved?: string;
}

export const useServiceData = (serviceType: string) => {
  const [caseStudies, setCaseStudies] = useState<ServiceCaseStudy[]>([]);
  const [stats, setStats] = useState<ServiceStat[]>([]);
  const [reviews, setReviews] = useState<ServiceReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        
        // Fetch case studies
        const { data: caseStudiesData, error: caseStudiesError } = await supabase
          .from('service_case_studies')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        if (caseStudiesError) {
          console.error('Error fetching case studies:', caseStudiesError);
        } else {
          setCaseStudies(caseStudiesData || []);
        }

        // Fetch stats
        const { data: statsData, error: statsError } = await supabase
          .from('service_stats')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        if (statsError) {
          console.error('Error fetching stats:', statsError);
        } else {
          setStats(statsData || []);
        }

        // Fetch reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('service_reviews')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        if (reviewsError) {
          console.error('Error fetching reviews:', reviewsError);
        } else {
          setReviews(reviewsData || []);
        }
      } catch (error) {
        console.error('Error in fetchServiceData:', error);
      } finally {
        setLoading(false);
      }
    };

    if (serviceType) {
      fetchServiceData();
    }
  }, [serviceType]);

  return { caseStudies, stats, reviews, loading };
};
