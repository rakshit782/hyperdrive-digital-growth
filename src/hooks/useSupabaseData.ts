
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

// Export types for external use
export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type FAQ = Database['public']['Tables']['faqs']['Row'];
export type PricingPlan = Database['public']['Tables']['pricing_plans']['Row'];
export type ServiceReview = Database['public']['Tables']['service_reviews']['Row'];
export type ServiceCaseStudy = Database['public']['Tables']['service_case_studies']['Row'];
export type ServiceStat = Database['public']['Tables']['service_stats']['Row'];
export type NewsletterEmail = Database['public']['Tables']['newsletter_emails']['Row'];
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];
export type Lead = Database['public']['Tables']['leads']['Row'];
export type SecurityLog = Database['public']['Tables']['form_security_logs']['Row'];

export interface SupabaseRecord {
  id?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

// Generic hook for Supabase operations
export const useSupabaseData = <T extends SupabaseRecord>(tableName: keyof Database['public']['Tables']) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: result, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData((result as T[]) || []);
    } catch (error) {
      console.error(`Error fetching ${tableName}:`, error);
      toast({
        title: "Error",
        description: `Failed to load ${tableName}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const insert = async (record: Omit<T, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert([record])
        .select()
        .single();

      if (error) throw error;
      setData(prev => [result as T, ...prev]);
      return result;
    } catch (error) {
      console.error(`Error inserting into ${tableName}:`, error);
      throw error;
    }
  };

  const update = async (id: string, updates: Partial<T>) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setData(prev => prev.map(item => item.id === id ? result as T : item));
      return result;
    } catch (error) {
      console.error(`Error updating ${tableName}:`, error);
      throw error;
    }
  };

  const remove = async (id: string) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
      setData(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error(`Error deleting from ${tableName}:`, error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableName]);

  return {
    data,
    loading,
    insert,
    update,
    remove,
    refetch: fetchData
  };
};

// Specific hooks for different data types
export const useServiceReviews = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData<ServiceReview>('service_reviews');
  
  return {
    reviews: data,
    loading,
    createReview: insert,
    updateReview: update,
    deleteReview: remove,
    refetch
  };
};

export const useBlogPosts = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData<BlogPost>('blog_posts');
  
  return {
    posts: data,
    loading,
    createPost: insert,
    updatePost: update,
    deletePost: remove,
    refetch
  };
};

export const useFAQs = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData<FAQ>('faqs');
  
  return {
    faqs: data,
    loading,
    createFAQ: insert,
    updateFAQ: update,
    deleteFAQ: remove,
    refetch
  };
};

export const usePricingPlans = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData<PricingPlan>('pricing_plans');
  
  return {
    plans: data,
    loading,
    createPlan: insert,
    updatePlan: update,
    deletePlan: remove,
    refetch
  };
};

export const useServiceCaseStudies = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData<ServiceCaseStudy>('service_case_studies');
  
  return {
    caseStudies: data,
    loading,
    createCaseStudy: insert,
    updateCaseStudy: update,
    deleteCaseStudy: remove,
    refetch
  };
};

export const useServiceStats = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData<ServiceStat>('service_stats');
  
  return {
    stats: data,
    loading,
    createStat: insert,
    updateStat: update,
    deleteStat: remove,
    refetch
  };
};

export default useSupabaseData;
