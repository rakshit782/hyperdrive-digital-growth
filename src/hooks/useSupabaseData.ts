
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

// Simple hook with basic types
export const useSupabaseData = (tableName: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: result, error } = await supabase
        .from(tableName as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(result || []);
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

  const insert = async (record: any) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName as any)
        .insert([record])
        .select()
        .single();

      if (error) throw error;
      setData(prev => [result, ...prev]);
      return result;
    } catch (error) {
      console.error(`Error inserting into ${tableName}:`, error);
      throw error;
    }
  };

  const update = async (id: string, updates: any) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName as any)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setData(prev => prev.map(item => item.id === id ? result : item));
      return result;
    } catch (error) {
      console.error(`Error updating ${tableName}:`, error);
      throw error;
    }
  };

  const remove = async (id: string) => {
    try {
      const { error } = await supabase
        .from(tableName as any)
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

// Specific hooks for different data types with proper typing
export const useServiceReviews = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData('service_reviews');
  
  return {
    reviews: data as ServiceReview[],
    loading,
    createReview: insert,
    updateReview: update,
    deleteReview: remove,
    refetch
  };
};

export const useBlogPosts = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData('blog_posts');
  
  return {
    posts: data as BlogPost[],
    loading,
    createPost: insert,
    updatePost: update,
    deletePost: remove,
    refetch
  };
};

export const useFAQs = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData('faqs');
  
  return {
    faqs: data as FAQ[],
    loading,
    createFAQ: insert,
    updateFAQ: update,
    deleteFAQ: remove,
    refetch
  };
};

export const usePricingPlans = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData('pricing_plans');
  
  return {
    plans: data as PricingPlan[],
    loading,
    createPlan: insert,
    updatePlan: update,
    deletePlan: remove,
    refetch
  };
};

export const useServiceCaseStudies = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData('service_case_studies');
  
  return {
    caseStudies: data as ServiceCaseStudy[],
    loading,
    createCaseStudy: insert,
    updateCaseStudy: update,
    deleteCaseStudy: remove,
    refetch
  };
};

export const useServiceStats = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData('service_stats');
  
  return {
    stats: data as ServiceStat[],
    loading,
    createStat: insert,
    updateStat: update,
    deleteStat: remove,
    refetch
  };
};

export const useNewsletterEmails = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData('newsletter_emails');
  
  return {
    emails: data as NewsletterEmail[],
    loading,
    createEmail: insert,
    updateEmail: update,
    deleteEmail: remove,
    refetch
  };
};

export const useLeads = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData('leads');
  
  return {
    leads: data as Lead[],
    loading,
    createLead: insert,
    updateLead: update,
    deleteLead: remove,
    refetch
  };
};

export const useContactSubmissions = () => {
  const { data, loading, insert, update, remove, refetch } = useSupabaseData('contact_submissions');
  
  return {
    submissions: data as ContactSubmission[],
    loading,
    createSubmission: insert,
    updateSubmission: update,
    deleteSubmission: remove,
    refetch
  };
};

export default useSupabaseData;
