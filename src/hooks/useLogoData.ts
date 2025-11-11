import { useState, useEffect } from 'react';

export interface LogoData {
  text: string;
  imageUrl: string;
  faviconUrl: string;
  size: number;
}

const DEFAULT_LOGO: LogoData = {
  text: 'AMZ AD SCOUT',
  imageUrl: '/logo.png',
  faviconUrl: '/favicon.ico',
  size: 90,
};

export const useLogoData = () => {
  const [logoData, setLogoData] = useState<LogoData>(() => {
    // Initialize from localStorage immediately with fallback
    try {
      const savedLogo = localStorage.getItem('logo_data');
      if (savedLogo) {
        const parsed = JSON.parse(savedLogo);
        // Validate parsed data has required fields
        if (parsed && typeof parsed === 'object') {
          return {
            text: parsed.text || DEFAULT_LOGO.text,
            imageUrl: parsed.imageUrl || DEFAULT_LOGO.imageUrl,
            faviconUrl: parsed.faviconUrl || DEFAULT_LOGO.faviconUrl,
            size: parsed.size || DEFAULT_LOGO.size,
          };
        }
      }
    } catch (error) {
      console.error('Failed to load logo from localStorage:', error);
    }
    return DEFAULT_LOGO;
  });

  useEffect(() => {
    const loadLogo = () => {
      try {
        const savedLogo = localStorage.getItem('logo_data');
        if (savedLogo) {
          const parsedData = JSON.parse(savedLogo);
          if (parsedData && typeof parsedData === 'object') {
            setLogoData({
              text: parsedData.text || DEFAULT_LOGO.text,
              imageUrl: parsedData.imageUrl || DEFAULT_LOGO.imageUrl,
              faviconUrl: parsedData.faviconUrl || DEFAULT_LOGO.faviconUrl,
              size: parsedData.size || DEFAULT_LOGO.size,
            });
            
            // Update favicon globally
            if (parsedData.faviconUrl) {
              updateFavicon(parsedData.faviconUrl);
            }
          }
        }
      } catch (error) {
        console.error('Failed to parse logo data:', error);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'logo_data' && e.newValue) {
        try {
          const parsedData = JSON.parse(e.newValue);
          if (parsedData && typeof parsedData === 'object') {
            setLogoData({
              text: parsedData.text || DEFAULT_LOGO.text,
              imageUrl: parsedData.imageUrl || DEFAULT_LOGO.imageUrl,
              faviconUrl: parsedData.faviconUrl || DEFAULT_LOGO.faviconUrl,
              size: parsedData.size || DEFAULT_LOGO.size,
            });
            if (parsedData.faviconUrl) {
              updateFavicon(parsedData.faviconUrl);
            }
          }
        } catch (error) {
          console.error('Failed to parse storage event:', error);
        }
      }
    };

    // Listen for logo updates
    window.addEventListener('logo-updated', loadLogo);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('logo-updated', loadLogo);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return logoData;
};

const updateFavicon = (faviconUrl: string) => {
  const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
  if (favicon) {
    favicon.href = faviconUrl;
  } else {
    const newFavicon = document.createElement('link');
    newFavicon.rel = 'icon';
    newFavicon.href = faviconUrl;
    document.head.appendChild(newFavicon);
  }
};
