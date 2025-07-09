
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SEOPage {
  id: string;
  page_path: string;
  page_name: string;
  title_tag: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  schema_type: string;
  schema_data: any;
  robots_index: boolean;
  robots_follow: boolean;
  include_in_sitemap: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SEOGlobalSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const useSEOData = () => {
  const [pages, setPages] = useState<SEOPage[]>([]);
  const [globalSettings, setGlobalSettings] = useState<SEOGlobalSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_pages')
        .select('*')
        .order('page_name', { ascending: true });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching SEO pages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch SEO pages",
        variant: "destructive",
      });
    }
  };

  const fetchGlobalSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_global_settings')
        .select('*');

      if (error) throw error;
      setGlobalSettings(data || []);
    } catch (error) {
      console.error('Error fetching global SEO settings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch global SEO settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPage = async (pageData: Omit<SEOPage, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('seo_pages')
        .insert(pageData)
        .select()
        .single();

      if (error) throw error;
      setPages(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "SEO page created successfully",
      });
      return data;
    } catch (error) {
      console.error('Error creating SEO page:', error);
      toast({
        title: "Error",
        description: "Failed to create SEO page",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePage = async (id: string, updates: Partial<Omit<SEOPage, 'id' | 'created_at'>>) => {
    try {
      const { data, error } = await supabase
        .from('seo_pages')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPages(prev => prev.map(page => page.id === id ? data : page));
      toast({
        title: "Success",
        description: "SEO page updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating SEO page:', error);
      toast({
        title: "Error",
        description: "Failed to update SEO page",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deletePage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('seo_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPages(prev => prev.filter(page => page.id !== id));
      toast({
        title: "Success",
        description: "SEO page deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting SEO page:', error);
      toast({
        title: "Error",
        description: "Failed to delete SEO page",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateGlobalSetting = async (key: string, value: any) => {
    try {
      const { data, error } = await supabase
        .from('seo_global_settings')
        .upsert({
          setting_key: key,
          setting_value: value,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      setGlobalSettings(prev => {
        const existing = prev.find(s => s.setting_key === key);
        if (existing) {
          return prev.map(s => s.setting_key === key ? data : s);
        } else {
          return [...prev, data];
        }
      });
      toast({
        title: "Success",
        description: "Global setting updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating global setting:', error);
      toast({
        title: "Error",
        description: "Failed to update global setting",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    Promise.all([fetchPages(), fetchGlobalSettings()]);
  }, []);

  return {
    pages,
    globalSettings,
    loading,
    createPage,
    updatePage,
    deletePage,
    updateGlobalSetting,
    refetch: () => Promise.all([fetchPages(), fetchGlobalSettings()])
  };
};
