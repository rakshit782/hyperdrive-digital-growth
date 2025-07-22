
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const useSupabaseFAQs = (activeOnly: boolean = false) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true });

      // Only filter by active status if activeOnly is true
      if (activeOnly) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;

      if (error) throw error;

      setFaqs(data || []);
      console.log('FAQs fetched from Supabase:', data?.length || 0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch FAQs';
      setError(errorMessage);
      console.error('Error fetching FAQs:', err);
      toast({
        title: "Error",
        description: "Failed to load FAQs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createFAQ = async (faqData: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .insert(faqData)
        .select()
        .single();

      if (error) throw error;

      await fetchFAQs();
      toast({
        title: "Success",
        description: "FAQ created successfully",
      });
      return data;
    } catch (err) {
      console.error('Error creating FAQ:', err);
      toast({
        title: "Error",
        description: "Failed to create FAQ",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateFAQ = async (id: string, updates: Partial<FAQ>) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchFAQs();
      toast({
        title: "Success",
        description: "FAQ updated successfully",
      });
    } catch (err) {
      console.error('Error updating FAQ:', err);
      toast({
        title: "Error",
        description: "Failed to update FAQ",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteFAQ = async (id: string) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchFAQs();
      toast({
        title: "Success",
        description: "FAQ deleted successfully",
      });
    } catch (err) {
      console.error('Error deleting FAQ:', err);
      toast({
        title: "Error",
        description: "Failed to delete FAQ",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchFAQs();

    // Set up real-time subscription
    const channel = supabase
      .channel('faqs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'faqs'
        },
        () => {
          console.log('FAQs table changed, refetching...');
          fetchFAQs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeOnly]);

  return {
    faqs,
    loading,
    error,
    createFAQ,
    updateFAQ,
    deleteFAQ,
    refetch: fetchFAQs
  };
};
