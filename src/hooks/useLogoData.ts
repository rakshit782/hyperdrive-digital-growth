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
  faviconUrl: '/favicon.png',
  size: 80,
};

export const useLogoData = () => {
  const [logoData, setLogoData] = useState<LogoData>(() => {
    // Initialize from localStorage immediately
    const savedLogo = localStorage.getItem('logo_data');
    if (savedLogo) {
      try {
        return JSON.parse(savedLogo);
      } catch {
        return DEFAULT_LOGO;
      }
    }
    return DEFAULT_LOGO;
  });

  useEffect(() => {
    const loadLogo = () => {
      const savedLogo = localStorage.getItem('logo_data');
      if (savedLogo) {
        try {
          const parsedData = JSON.parse(savedLogo);
          setLogoData(parsedData);
          
          // Update favicon globally
          if (parsedData.faviconUrl) {
            updateFavicon(parsedData.faviconUrl);
          }
        } catch (error) {
          console.error('Failed to parse logo data:', error);
        }
      }
    };

    // Listen for logo updates
    window.addEventListener('logo-updated', loadLogo);
    
    // Also listen for storage events (for cross-tab synchronization)
    window.addEventListener('storage', (e) => {
      if (e.key === 'logo_data' && e.newValue) {
        try {
          const parsedData = JSON.parse(e.newValue);
          setLogoData(parsedData);
          if (parsedData.faviconUrl) {
            updateFavicon(parsedData.faviconUrl);
          }
        } catch (error) {
          console.error('Failed to parse storage event:', error);
        }
      }
    });

    return () => {
      window.removeEventListener('logo-updated', loadLogo);
      window.removeEventListener('storage', loadLogo);
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
