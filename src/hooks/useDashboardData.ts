
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DashboardStats {
  totalPages: number;
  totalPosts: number;
  totalMedia: number;
  activeScripts: number;
}

export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    totalPosts: 0,
    totalMedia: 0,
    activeScripts: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch pages count - using any to bypass type checking temporarily
      const { count: pagesCount } = await (supabase as any)
        .from('pages')
        .select('*', { count: 'exact', head: true });

      // Fetch blog posts count
      const { count: postsCount } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true });

      // Fetch media count - using any to bypass type checking temporarily
      const { count: mediaCount } = await (supabase as any)
        .from('media_library')
        .select('*', { count: 'exact', head: true });

      // Fetch active scripts count - using any to bypass type checking temporarily
      const { count: scriptsCount } = await (supabase as any)
        .from('tracking_scripts')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      setStats({
        totalPages: pagesCount || 0,
        totalPosts: postsCount || 0,
        totalMedia: mediaCount || 0,
        activeScripts: scriptsCount || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    refreshStats: fetchDashboardStats
  };
};
