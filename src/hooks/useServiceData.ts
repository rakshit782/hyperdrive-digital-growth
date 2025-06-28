
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ServiceCaseStudy {
  id: string;
  service_type: string;
  title: string;
  description: string;
  client_name?: string;
  industry?: string;
  results: Record<string, any>; // Changed from Record<string, string> to Record<string, any>
  image_url?: string;
  is_featured: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceStat {
  id: string;
  service_type: string;
  stat_label: string;
  stat_value: string;
  stat_description?: string;
  icon_name?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useServiceData = (serviceType: string) => {
  const [caseStudies, setCaseStudies] = useState<ServiceCaseStudy[]>([]);
  const [stats, setStats] = useState<ServiceStat[]>([]);
  const [reviews, setReviews] = useState<ServiceReview[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchServiceData = async () => {
    try {
      setLoading(true);

      // Fetch case studies
      const { data: caseStudiesData, error: caseStudiesError } = await supabase
        .from('service_case_studies')
        .select('*')
        .eq('service_type', serviceType)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (caseStudiesError) throw caseStudiesError;

      // Fetch stats
      const { data: statsData, error: statsError } = await supabase
        .from('service_stats')
        .select('*')
        .eq('service_type', serviceType)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (statsError) throw statsError;

      // Fetch reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('service_reviews')
        .select('*')
        .eq('service_type', serviceType)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (reviewsError) throw reviewsError;

      // Type cast and ensure results is an object
      const typedCaseStudies = (caseStudiesData || []).map(study => ({
        ...study,
        results: typeof study.results === 'object' && study.results !== null ? study.results as Record<string, any> : {}
      })) as ServiceCaseStudy[];

      setCaseStudies(typedCaseStudies);
      setStats((statsData || []) as ServiceStat[]);
      setReviews((reviewsData || []) as ServiceReview[]);

    } catch (error) {
      console.error('Error fetching service data:', error);
      toast({
        title: "Error",
        description: "Failed to load service data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, [serviceType]);

  return {
    caseStudies,
    stats,
    reviews,
    loading,
    refetch: fetchServiceData
  };
};
