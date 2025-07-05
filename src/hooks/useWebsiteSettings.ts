
import { useState, useEffect } from 'react';

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
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('websiteSettings');
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          setSettings({ ...defaultSettings, ...parsed });
        }
      } catch (error) {
        console.error('Failed to load website settings:', error);
        setSettings(defaultSettings);
      } finally {
        setIsLoading(false);
      }
    };

    // Load initial settings
    loadSettings();

    // Listen for settings updates from dashboard
    const handleSettingsUpdate = (event: CustomEvent) => {
      setSettings(event.detail);
    };

    window.addEventListener('websiteSettingsUpdated', handleSettingsUpdate as EventListener);

    return () => {
      window.removeEventListener('websiteSettingsUpdated', handleSettingsUpdate as EventListener);
    };
  }, []);

  return { settings, isLoading };
};
