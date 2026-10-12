import { useState, useEffect } from "react";
import { fetchSiteSettings, saveSiteSettings } from "./useSiteSettings";

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
  showCopilotLogin: boolean;
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
  showCopilotLogin: true,
  ctaText: "Get Free Strategy Call",
  ctaLink: "/contact",
};

const STORAGE_KEY = "header_navigation_settings";
const HEADER_UPDATED_EVENT = "header-settings-updated";

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

  // Load from database on mount so changes in dashboard apply across all browsers & devices
  useEffect(() => {
    fetchSiteSettings()
      .then((data) => {
        if (data.header_settings && typeof data.header_settings === "object") {
          const merged = { ...DEFAULT_HEADER_SETTINGS, ...data.header_settings };
          setSettings(merged);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          } catch {
            // ignore
          }
        }
      })
      .catch((err) => {
        console.warn("Could not load header settings from database:", err);
      });
  }, []);

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

    const handleLocalUpdate = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setSettings({ ...DEFAULT_HEADER_SETTINGS, ...JSON.parse(saved) });
        }
      } catch {
        // ignore error
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(HEADER_UPDATED_EVENT, handleLocalUpdate);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(HEADER_UPDATED_EVENT, handleLocalUpdate);
    };
  }, []);

  const saveSettings = async (newSettings: HeaderSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event(HEADER_UPDATED_EVENT));

    // Persist to Neon database
    try {
      await saveSiteSettings({ header_settings: newSettings });
    } catch (err) {
      console.error("Failed to save header settings to database:", err);
      throw err;
    }
  };

  return { settings, saveSettings, defaultSettings: DEFAULT_HEADER_SETTINGS };
}
