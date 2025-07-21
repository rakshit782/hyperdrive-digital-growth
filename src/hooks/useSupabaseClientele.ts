
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ClienteleLogo {
  id: string;
  name: string;
  image_url: string;
  is_active: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ClienteleSettings {
  logoSize: number;
  sectionHeight: number;
}

export const useSupabaseClientele = () => {
  const [clienteleLogos, setClienteleLogos] = useState<ClienteleLogo[]>([]);
  const [settings, setSettings] = useState<ClienteleSettings>({
    logoSize: 16,
    sectionHeight: 6
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchClienteleLogos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('clientele_logos')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      setClienteleLogos(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch clientele logos';
      setError(errorMessage);
      console.error('Error fetching clientele logos:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .eq('setting_key', 'clientele_settings')
        .eq('setting_type', 'clientele')
        .maybeSingle();

      if (error) throw error;

      if (data && data.setting_value) {
        setSettings(data.setting_value as unknown as ClienteleSettings);
      }
    } catch (err) {
      console.error('Error fetching clientele settings:', err);
    }
  };

  const updateClienteleLogo = async (logoData: Partial<ClienteleLogo>) => {
    try {
      const { data, error } = await supabase
        .from('clientele_logos')
        .upsert(logoData)
        .select()
        .single();

      if (error) throw error;

      // Dispatch event for real-time updates
      window.dispatchEvent(new CustomEvent('clienteleLogosUpdated'));
      
      toast({
        title: "Success",
        description: "Clientele logo updated successfully",
      });

      return data;
    } catch (err) {
      console.error('Error updating clientele logo:', err);
      toast({
        title: "Error",
        description: "Failed to update clientele logo",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateSettings = async (newSettings: ClienteleSettings) => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .upsert({
          setting_key: 'clientele_settings',
          setting_type: 'clientele',
          setting_value: newSettings as unknown as any
        }, {
          onConflict: 'setting_key'
        })
        .select()
        .single();

      if (error) throw error;

      setSettings(newSettings);
      
      // Dispatch event for real-time updates
      window.dispatchEvent(new CustomEvent('clienteleSettingsUpdated', { detail: newSettings }));
      
      toast({
        title: "Success",
        description: "Clientele settings updated successfully",
      });

      return data;
    } catch (err) {
      console.error('Error updating clientele settings:', err);
      toast({
        title: "Error",
        description: "Failed to update clientele settings",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchClienteleLogos();
    fetchSettings();

    // Set up real-time subscription for clientele logos
    const channel = supabase
      .channel('clientele-logos-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clientele_logos'
        },
        () => {
          console.log('Clientele logos changed, refetching...');
          fetchClienteleLogos();
        }
      )
      .subscribe();

    // Set up real-time subscription for settings
    const settingsChannel = supabase
      .channel('clientele-settings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_settings',
          filter: 'setting_key=eq.clientele_settings'
        },
        () => {
          console.log('Clientele settings changed, refetching...');
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
    clienteleLogos,
    settings,
    loading,
    error,
    updateClienteleLogo,
    updateSettings,
    refetch: fetchClienteleLogos
  };
};
