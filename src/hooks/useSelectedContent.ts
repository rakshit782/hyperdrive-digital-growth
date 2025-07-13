
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSelectedContent = (contentType: string) => {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Map content types to actual table names
        const tableMap: Record<string, string> = {
          'blog_posts': 'blog_posts',
          'faqs': 'faqs',
          'service_reviews': 'service_reviews',
          'service_case_studies': 'service_case_studies',
          'service_stats': 'service_stats',
          'pricing_plans': 'pricing_plans',
          'newsletter_emails': 'newsletter_emails',
          'contact_submissions': 'contact_submissions',
          'leads': 'leads'
        };

        const tableName = tableMap[contentType];
        if (!tableName) {
          console.error(`Unknown content type: ${contentType}`);
          setContent([]);
          return;
        }

        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setContent(data || []);
      } catch (error) {
        console.error(`Error fetching ${contentType}:`, error);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    if (contentType) {
      fetchContent();
    }
  }, [contentType]);

  return { content, loading };
};
