
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSelectedContent = (tableName: string) => {
  const [selectedContent, setSelectedContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSelectedContent = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setSelectedContent(data || []);
      } catch (error) {
        console.error(`Error fetching selected content from ${tableName}:`, error);
        setSelectedContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedContent();
  }, [tableName]);

  return { selectedContent, loading };
};
