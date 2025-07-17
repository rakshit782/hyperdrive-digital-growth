
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SupabaseReview {
  id: string;
  name: string;
  company: string;
  rating: number;
  review: string;
  avatar?: string;
  service_type?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useSupabaseReviews = () => {
  const [reviews, setReviews] = useState<SupabaseReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      setReviews(data || []);
      console.log('Reviews fetched from Supabase:', data?.length || 0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch reviews';
      setError(errorMessage);
      console.error('Error fetching reviews:', err);
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (reviewData: Omit<SupabaseReview, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert(reviewData)
        .select()
        .single();

      if (error) throw error;

      await fetchReviews();
      toast({
        title: "Success",
        description: "Review created successfully",
      });
      return data;
    } catch (err) {
      console.error('Error creating review:', err);
      toast({
        title: "Error",
        description: "Failed to create review",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateReview = async (id: string, updates: Partial<SupabaseReview>) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchReviews();
      toast({
        title: "Success",
        description: "Review updated successfully",
      });
    } catch (err) {
      console.error('Error updating review:', err);
      toast({
        title: "Error",
        description: "Failed to update review",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchReviews();
      toast({
        title: "Success",
        description: "Review deleted successfully",
      });
    } catch (err) {
      console.error('Error deleting review:', err);
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchReviews();

    // Set up real-time subscription
    const channel = supabase
      .channel('reviews-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reviews'
        },
        () => {
          console.log('Reviews table changed, refetching...');
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    reviews,
    loading,
    error,
    createReview,
    updateReview,
    deleteReview,
    refetch: fetchReviews
  };
};
