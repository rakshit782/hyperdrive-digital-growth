
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PolicyPage {
  id: string;
  page_type: string;
  title: string;
  last_updated: string;
  content: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useSupabasePolicyPages = () => {
  const [policyPages, setPolicyPages] = useState<PolicyPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPolicyPages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('policy_pages')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setPolicyPages(data || []);
      console.log('Policy pages fetched from Supabase:', data?.length || 0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch policy pages';
      setError(errorMessage);
      console.error('Error fetching policy pages:', err);
      toast({
        title: "Error",
        description: "Failed to load policy pages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePolicyPage = async (pageType: string, updates: Partial<PolicyPage>) => {
    try {
      const { error } = await supabase
        .from('policy_pages')
        .update(updates)
        .eq('page_type', pageType);

      if (error) throw error;

      await fetchPolicyPages();
      toast({
        title: "Success",
        description: "Policy page updated successfully",
      });
    } catch (err) {
      console.error('Error updating policy page:', err);
      toast({
        title: "Error",
        description: "Failed to update policy page",
        variant: "destructive",
      });
      throw err;
    }
  };

  const getPolicyPageByType = (pageType: string) => {
    return policyPages.find(page => page.page_type === pageType);
  };

  useEffect(() => {
    fetchPolicyPages();

    // Set up real-time subscription
    const channel = supabase
      .channel('policy-pages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'policy_pages'
        },
        () => {
          console.log('Policy pages table changed, refetching...');
          fetchPolicyPages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    policyPages,
    loading,
    error,
    updatePolicyPage,
    getPolicyPageByType,
    refetch: fetchPolicyPages
  };
};
