
import { useEffect } from 'react';
import { facebookPixel } from '@/utils/facebookPixel';

export const useFacebookPixel = () => {
  useEffect(() => {
    // Load Facebook Pixel configuration from localStorage
    const pixelConfig = localStorage.getItem('facebookPixelConfig');
    if (pixelConfig) {
      try {
        const config = JSON.parse(pixelConfig);
        if (config.isActive && config.pixelId) {
          facebookPixel.configure(config);
        }
      } catch (error) {
        console.error('Failed to load Facebook Pixel config:', error);
      }
    }
  }, []);

  return {
    trackEvent: facebookPixel.trackEvent.bind(facebookPixel),
    trackCustomEvent: facebookPixel.trackCustomEvent.bind(facebookPixel),
    trackPurchase: facebookPixel.trackPurchase.bind(facebookPixel),
    trackLead: facebookPixel.trackLead.bind(facebookPixel),
    trackCompleteRegistration: facebookPixel.trackCompleteRegistration.bind(facebookPixel),
    trackContact: facebookPixel.trackContact.bind(facebookPixel),
    trackViewContent: facebookPixel.trackViewContent.bind(facebookPixel),
  };
};
