
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PartnerImage {
  id: string;
  name: string;
  image_url: string;
  is_active: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PartnerSettings {
  logoSize: number;
  sectionHeight: number;
}

export const useSupabasePartners = () => {
  const [partnerImages, setPartnerImages] = useState<PartnerImage[]>([]);
  const [settings, setSettings] = useState<PartnerSettings>({
    logoSize: 16,
    sectionHeight: 6
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPartnerImages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('partner_images')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      setPartnerImages(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch partner images';
      setError(errorMessage);
      console.error('Error fetching partner images:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .eq('setting_key', 'partner_settings')
        .eq('setting_type', 'partners')
        .maybeSingle();

      if (error) throw error;

      if (data && data.setting_value) {
        setSettings(data.setting_value as unknown as PartnerSettings);
      }
    } catch (err) {
      console.error('Error fetching partner settings:', err);
    }
  };

  const updatePartnerImage = async (partnerData: Partial<PartnerImage>) => {
    try {
      // Ensure required fields are present for upsert
      const upsertData = {
        id: partnerData.id || crypto.randomUUID(),
        name: partnerData.name || '',
        image_url: partnerData.image_url || '',
        is_active: partnerData.is_active ?? true,
        sort_order: partnerData.sort_order ?? 0
      };

      const { data, error } = await supabase
        .from('partner_images')
        .upsert(upsertData)
        .select()
        .single();

      if (error) throw error;

      // Dispatch event for real-time updates
      window.dispatchEvent(new CustomEvent('partnerImagesUpdated'));
      
      toast({
        title: "Success",
        description: "Partner image updated successfully",
      });

      return data;
    } catch (err) {
      console.error('Error updating partner image:', err);
      toast({
        title: "Error",
        description: "Failed to update partner image",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateSettings = async (newSettings: PartnerSettings) => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .upsert({
          setting_key: 'partner_settings',
          setting_type: 'partners',
          setting_value: newSettings as unknown as any
        }, {
          onConflict: 'setting_key'
        })
        .select()
        .single();

      if (error) throw error;

      setSettings(newSettings);
      
      // Dispatch event for real-time updates
      window.dispatchEvent(new CustomEvent('partnerSettingsUpdated', { detail: newSettings }));
      
      toast({
        title: "Success",
        description: "Partner settings updated successfully",
      });

      return data;
    } catch (err) {
      console.error('Error updating partner settings:', err);
      toast({
        title: "Error",
        description: "Failed to update partner settings",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchPartnerImages();
    fetchSettings();

    // Set up real-time subscription for partner images
    const channel = supabase
      .channel('partner-images-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'partner_images'
        },
        () => {
          console.log('Partner images changed, refetching...');
          fetchPartnerImages();
        }
      )
      .subscribe();

    // Set up real-time subscription for settings
    const settingsChannel = supabase
      .channel('partner-settings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_settings',
          filter: 'setting_key=eq.partner_settings'
        },
        () => {
          console.log('Partner settings changed, refetching...');
          fetchSettings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(settingsChannel);
    };
  }, []);

  return {
    partnerImages,
    settings,
    loading,
    error,
    updatePartnerImage,
    updateSettings,
    refetch: fetchPartnerImages
  };
};
