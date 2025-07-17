
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SupabaseStats {
  id: string;
  stat_key: string;
  stat_value: string;
  stat_label: string;
  icon?: string;
  description?: string;
  category: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useSupabaseStats = () => {
  const [stats, setStats] = useState<SupabaseStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      setStats(data || []);
      console.log('Stats fetched from Supabase:', data?.length || 0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stats';
      setError(errorMessage);
      console.error('Error fetching stats:', err);
      toast({
        title: "Error",
        description: "Failed to load stats",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createStat = async (statData: Omit<SupabaseStats, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('stats')
        .insert(statData)
        .select()
        .single();

      if (error) throw error;

      await fetchStats();
      toast({
        title: "Success",
        description: "Stat created successfully",
      });
      return data;
    } catch (err) {
      console.error('Error creating stat:', err);
      toast({
        title: "Error",
        description: "Failed to create stat",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateStat = async (id: string, updates: Partial<SupabaseStats>) => {
    try {
      const { error } = await supabase
        .from('stats')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchStats();
      toast({
        title: "Success",
        description: "Stat updated successfully",
      });
    } catch (err) {
      console.error('Error updating stat:', err);
      toast({
        title: "Error",
        description: "Failed to update stat",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteStat = async (id: string) => {
    try {
      const { error } = await supabase
        .from('stats')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchStats();
      toast({
        title: "Success",
        description: "Stat deleted successfully",
      });
    } catch (err) {
      console.error('Error deleting stat:', err);
      toast({
        title: "Error",
        description: "Failed to delete stat",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchStats();

    // Set up real-time subscription
    const channel = supabase
      .channel('stats-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stats'
        },
        () => {
          console.log('Stats table changed, refetching...');
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    stats,
    loading,
    error,
    createStat,
    updateStat,
    deleteStat,
    refetch: fetchStats
  };
};
