
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface LogoSettings {
  id?: string;
  logoUrl: string;
  logoSize: string;
  logoAlt: string;
  logoPosition: string;
  showInHeader: boolean;
  showInFooter: boolean;
  isActive: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useSupabaseLogos = () => {
  const [logoSettings, setLogoSettings] = useState<LogoSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLogoSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .eq('setting_key', 'logo_settings')
        .eq('setting_type', 'branding')
        .maybeSingle();

      if (error) throw error;

      if (data && data.setting_value) {
        // Safely cast the Json type to LogoSettings
        setLogoSettings(data.setting_value as unknown as LogoSettings);
      } else {
        // Set default logo settings
        const defaultSettings: LogoSettings = {
          logoUrl: "/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png",
          logoSize: "h-12",
          logoAlt: "AMZ AD SCOUT - The Growth Agency",
          logoPosition: "left",
          showInHeader: true,
          showInFooter: true,
          isActive: true
        };
        setLogoSettings(defaultSettings);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch logo settings';
      setError(errorMessage);
      console.error('Error fetching logo settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateLogoSettings = async (settings: LogoSettings) => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .upsert({
          setting_key: 'logo_settings',
          setting_type: 'branding',
          setting_value: settings as unknown as any
        }, {
          onConflict: 'setting_key'
        })
        .select()
        .single();

      if (error) throw error;

      setLogoSettings(settings);
      
      // Dispatch event for real-time updates
      window.dispatchEvent(new CustomEvent('logoUpdated', { detail: settings }));
      
      toast({
        title: "Success",
        description: "Logo settings updated successfully",
      });

      return data;
    } catch (err) {
      console.error('Error updating logo settings:', err);
      toast({
        title: "Error",
        description: "Failed to update logo settings",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchLogoSettings();

    // Set up real-time subscription
    const channel = supabase
      .channel('logo-settings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_settings',
          filter: 'setting_key=eq.logo_settings'
        },
        () => {
          console.log('Logo settings changed, refetching...');
          fetchLogoSettings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    logoSettings,
    loading,
    error,
    updateLogoSettings,
    refetch: fetchLogoSettings
  };
};
