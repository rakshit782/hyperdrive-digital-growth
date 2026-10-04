import { useState, useEffect } from "react";

export interface HeaderSettings {
  topBarText: string;
  topBarTextLink: string;
  showAmazonAdsPartner: boolean;
  amazonAdsPartnerLink: string;
  showAmazonSpnPartner: boolean;
  amazonSpnPartnerLink: string;
  email: string;
  emailLink: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  ctaText: string;
  ctaLink: string;
}

export const DEFAULT_HEADER_SETTINGS: HeaderSettings = {
  topBarText: "An Amazon & Walmart Advertising Agency",
  topBarTextLink: "/services",
  showAmazonAdsPartner: true,
  amazonAdsPartnerLink: "/amazon-ads-partner",
  showAmazonSpnPartner: true,
  amazonSpnPartnerLink: "/services/amazon-advertising",
  email: "info@amzadscout.com",
  emailLink: "mailto:info@amzadscout.com",
  linkedinUrl: "https://www.linkedin.com/company/amz-ad-scout",
  facebookUrl: "https://www.facebook.com/amzadscout",
  instagramUrl: "https://www.instagram.com/amzadscout",
  ctaText: "Get Free Strategy Call",
  ctaLink: "/contact",
};

const STORAGE_KEY = "header_navigation_settings";

export function useHeaderSettings() {
  const [settings, setSettings] = useState<HeaderSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_HEADER_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Failed to read header settings from localStorage:", e);
    }
    return DEFAULT_HEADER_SETTINGS;
  });

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setSettings({ ...DEFAULT_HEADER_SETTINGS, ...JSON.parse(e.newValue) });
        } catch {
          // ignore error
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const saveSettings = (newSettings: HeaderSettings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  };

  return { settings, saveSettings, defaultSettings: DEFAULT_HEADER_SETTINGS };
}
