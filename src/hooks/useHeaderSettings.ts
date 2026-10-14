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

let memorySettings: HeaderSettings | null = null;
let isFetchingFromDb = false;
let hasFetchedFromDb = false;

export function useHeaderSettings() {
  const [settings, setSettings] = useState<HeaderSettings>(() => {
    if (memorySettings) return memorySettings;
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          memorySettings = { ...DEFAULT_HEADER_SETTINGS, ...parsed };
          return memorySettings;
        }
      }
    } catch (e) {
      console.warn("Failed to read header settings from localStorage:", e);
    }
    memorySettings = DEFAULT_HEADER_SETTINGS;
    return DEFAULT_HEADER_SETTINGS;
  });

  // Ensure DOM class matches current settings immediately
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("hide-copilot", !settings.showCopilotLogin);
    }
  }, [settings.showCopilotLogin]);

  // Load from database on mount once across application to avoid repeated network calls
  useEffect(() => {
    if (hasFetchedFromDb || isFetchingFromDb) return;
    isFetchingFromDb = true;

    fetchSiteSettings()
      .then((data) => {
        hasFetchedFromDb = true;
        isFetchingFromDb = false;
        if (data.header_settings && typeof data.header_settings === "object") {
          const merged: HeaderSettings = { ...DEFAULT_HEADER_SETTINGS, ...data.header_settings };
          memorySettings = merged;
          setSettings((prev) => {
            const hasChanged = Object.keys(merged).some(
              (key) => (merged as any)[key] !== (prev as any)[key]
            );
            if (!hasChanged) return prev;
            return merged;
          });
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            if (typeof document !== "undefined") {
              document.documentElement.classList.toggle("hide-copilot", !merged.showCopilotLogin);
            }
          } catch {
            // ignore
          }
        }
      })
      .catch((err) => {
        isFetchingFromDb = false;
        console.warn("Could not load header settings from database:", err);
      });
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = { ...DEFAULT_HEADER_SETTINGS, ...JSON.parse(e.newValue) };
          memorySettings = parsed;
          setSettings(parsed);
          if (typeof document !== "undefined") {
            document.documentElement.classList.toggle("hide-copilot", !parsed.showCopilotLogin);
          }
        } catch {
          // ignore error
        }
      }
    };

    const handleLocalUpdate = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = { ...DEFAULT_HEADER_SETTINGS, ...JSON.parse(saved) };
          memorySettings = parsed;
          setSettings(parsed);
          if (typeof document !== "undefined") {
            document.documentElement.classList.toggle("hide-copilot", !parsed.showCopilotLogin);
          }
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
    memorySettings = newSettings;
    setSettings(newSettings);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("hide-copilot", !newSettings.showCopilotLogin);
    }
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
