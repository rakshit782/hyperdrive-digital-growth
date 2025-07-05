
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WebsiteSettings {
  companyName: string;
  tagline: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  logoUrl?: string;
  faviconUrl?: string;
}

const defaultSettings: WebsiteSettings = {
  companyName: "AdRevenueBoost",
  tagline: "Scale Your Success",
  description: "Expert advertising and e-commerce solutions that drive results",
  primaryColor: "#3B82F6",
  secondaryColor: "#8B5CF6",
  heroTitle: "Scale Your Success with Expert Advertising Management",
  heroSubtitle: "Maximize your ROI with data-driven strategies from certified experts",
  ctaText: "Get Free Account Audit"
};

export const useWebsiteSettings = () => {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Try to load from Supabase first
        const { data: supabaseSettings, error } = await supabase
          .from('website_settings')
          .select('*');

        if (!error && supabaseSettings && supabaseSettings.length > 0) {
          // Convert Supabase settings to our format
          const settingsObj = supabaseSettings.reduce((acc, setting) => {
            acc[setting.setting_key] = setting.setting_value;
            return acc;
          }, {} as any);
          
          setSettings({ ...defaultSettings, ...settingsObj });
        } else {
          // Fallback to localStorage
          const savedSettings = localStorage.getItem('websiteSettings');
          if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            setSettings({ ...defaultSettings, ...parsed });
          }
        }
      } catch (error) {
        console.error('Failed to load website settings:', error);
        // Final fallback to localStorage
        try {
          const savedSettings = localStorage.getItem('websiteSettings');
          if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            setSettings({ ...defaultSettings, ...parsed });
          }
        } catch (localError) {
          console.error('Failed to load from localStorage:', localError);
          setSettings(defaultSettings);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Load initial settings
    loadSettings();

    // Listen for real-time updates from Supabase
    const channel = supabase
      .channel('website-settings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_settings'
        },
        (payload) => {
          console.log('Real-time settings update:', payload);
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            const updatedSetting = payload.new;
            setSettings(prev => ({
              ...prev,
              [updatedSetting.setting_key]: updatedSetting.setting_value
            }));
          }
        }
      )
      .subscribe();

    // Listen for settings updates from dashboard
    const handleSettingsUpdate = (event: CustomEvent) => {
      setSettings(event.detail);
    };

    window.addEventListener('websiteSettingsUpdated', handleSettingsUpdate as EventListener);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('websiteSettingsUpdated', handleSettingsUpdate as EventListener);
    };
  }, []);

  return { settings, isLoading };
};
