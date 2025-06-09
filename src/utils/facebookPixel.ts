
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export interface FacebookPixelConfig {
  pixelId: string;
  isActive: boolean;
}

export class FacebookPixelManager {
  private static instance: FacebookPixelManager;
  private pixelId: string | null = null;
  private isInitialized = false;

  static getInstance(): FacebookPixelManager {
    if (!FacebookPixelManager.instance) {
      FacebookPixelManager.instance = new FacebookPixelManager();
    }
    return FacebookPixelManager.instance;
  }

  initialize(pixelId: string): void {
    if (this.isInitialized && this.pixelId === pixelId) {
      return;
    }

    this.pixelId = pixelId;
    
    // Initialize Facebook Pixel
    if (typeof window !== 'undefined') {
      // Load Facebook Pixel base code
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      // Initialize the pixel
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');

      this.isInitialized = true;
      console.log('Facebook Pixel initialized with ID:', pixelId);
    }
  }

  trackEvent(eventName: string, parameters?: any): void {
    if (!this.isInitialized || !this.pixelId) {
      console.warn('Facebook Pixel not initialized');
      return;
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters);
      console.log('Facebook Pixel event tracked:', eventName, parameters);
    }
  }

  trackCustomEvent(eventName: string, parameters?: any): void {
    if (!this.isInitialized || !this.pixelId) {
      console.warn('Facebook Pixel not initialized');
      return;
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, parameters);
      console.log('Facebook Pixel custom event tracked:', eventName, parameters);
    }
  }

  // Standard events
  trackPurchase(value: number, currency: string = 'USD', parameters?: any): void {
    this.trackEvent('Purchase', {
      value: value,
      currency: currency,
      ...parameters
    });
  }

  trackLead(parameters?: any): void {
    this.trackEvent('Lead', parameters);
  }

  trackCompleteRegistration(parameters?: any): void {
    this.trackEvent('CompleteRegistration', parameters);
  }

  trackContact(parameters?: any): void {
    this.trackEvent('Contact', parameters);
  }

  trackViewContent(parameters?: any): void {
    this.trackEvent('ViewContent', parameters);
  }
}

// Export singleton instance
export const facebookPixel = FacebookPixelManager.getInstance();
