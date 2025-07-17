
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SupabaseCaseStudy {
  id: string;
  title: string;
  description: string;
  client_name?: string | null;
  industry?: string | null;
  service_type: string;
  results: any; // Changed from Record<string, any> to any to match Supabase Json type
  image_url?: string | null;
  is_featured: boolean | null;
  sort_order: number | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useSupabaseCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<SupabaseCaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      // Transform the data to match our interface
      const transformedData: SupabaseCaseStudy[] = (data || []).map(item => ({
        ...item,
        results: item.results || {}
      }));

      setCaseStudies(transformedData);
      console.log('Case studies fetched from Supabase:', transformedData.length);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch case studies';
      setError(errorMessage);
      console.error('Error fetching case studies:', err);
      toast({
        title: "Error",
        description: "Failed to load case studies",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCaseStudy = async (caseStudyData: Omit<SupabaseCaseStudy, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .insert(caseStudyData)
        .select()
        .single();

      if (error) throw error;

      await fetchCaseStudies();
      toast({
        title: "Success",
        description: "Case study created successfully",
      });
      return data;
    } catch (err) {
      console.error('Error creating case study:', err);
      toast({
        title: "Error",
        description: "Failed to create case study",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateCaseStudy = async (id: string, updates: Partial<SupabaseCaseStudy>) => {
    try {
      const { error } = await supabase
        .from('case_studies')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchCaseStudies();
      toast({
        title: "Success",
        description: "Case study updated successfully",
      });
    } catch (err) {
      console.error('Error updating case study:', err);
      toast({
        title: "Error",
        description: "Failed to update case study",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteCaseStudy = async (id: string) => {
    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchCaseStudies();
      toast({
        title: "Success",
        description: "Case study deleted successfully",
      });
    } catch (err) {
      console.error('Error deleting case study:', err);
      toast({
        title: "Error",
        description: "Failed to delete case study",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchCaseStudies();

    // Set up real-time subscription
    const channel = supabase
      .channel('case-studies-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'case_studies'
        },
        () => {
          console.log('Case studies table changed, refetching...');
          fetchCaseStudies();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    caseStudies,
    loading,
    error,
    createCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    refetch: fetchCaseStudies
  };
};
