
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AboutContent {
  id: string;
  section_name: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useAboutContent = () => {
  const [content, setContent] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching about content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch about content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createContent = async (contentData: Omit<AboutContent, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .insert(contentData)
        .select()
        .single();

      if (error) throw error;
      setContent(prev => [...prev, data].sort((a, b) => a.sort_order - b.sort_order));
      toast({
        title: "Success",
        description: "Content section created successfully",
      });
      return data;
    } catch (error) {
      console.error('Error creating content:', error);
      toast({
        title: "Error",
        description: "Failed to create content section",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateContent = async (id: string, updates: Partial<Omit<AboutContent, 'id' | 'created_at'>>) => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setContent(prev => prev.map(item => item.id === id ? data : item));
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('about_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setContent(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "Content section deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content section",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    createContent,
    updateContent,
    deleteContent,
    refetch: fetchContent
  };
};
