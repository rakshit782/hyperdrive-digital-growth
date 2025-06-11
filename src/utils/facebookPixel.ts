
interface FacebookPixelConfig {
  pixelId: string;
  accessToken?: string;
  testEventCode?: string;
  isActive: boolean;
}

class FacebookPixelManager {
  private static instance: FacebookPixelManager;
  private config: FacebookPixelConfig | null = null;
  private isInitialized = false;
  private encryptionKey = 'fbpx_config_key';

  static getInstance(): FacebookPixelManager {
    if (!FacebookPixelManager.instance) {
      FacebookPixelManager.instance = new FacebookPixelManager();
    }
    return FacebookPixelManager.instance;
  }

  private encrypt(data: string): string {
    // Simple encryption for localStorage (in production, use proper encryption)
    return btoa(encodeURIComponent(data));
  }

  private decrypt(data: string): string {
    try {
      return decodeURIComponent(atob(data));
    } catch {
      return data; // Fallback for unencrypted data
    }
  }

  configure(config: FacebookPixelConfig) {
    if (!config.pixelId) {
      throw new Error('Facebook Pixel ID is required');
    }

    this.config = config;
    this.saveConfig();
    
    if (config.isActive) {
      this.initialize();
    }
    
    console.log('Facebook Pixel configured:', { pixelId: config.pixelId, active: config.isActive });
  }

  private saveConfig() {
    if (this.config) {
      const encrypted = this.encrypt(JSON.stringify(this.config));
      localStorage.setItem('facebookPixel_config', encrypted);
    }
  }

  loadSavedConfig() {
    try {
      const saved = localStorage.getItem('facebookPixel_config');
      if (saved) {
        const decrypted = this.decrypt(saved);
        this.config = JSON.parse(decrypted);
        if (this.config?.isActive) {
          this.initialize();
        }
      }
    } catch (error) {
      console.error('Failed to load Facebook Pixel config:', error);
      // Clear corrupted config
      localStorage.removeItem('facebookPixel_config');
    }
  }

  private initialize() {
    if (this.isInitialized || !this.config?.pixelId) return;

    try {
      // Initialize Facebook Pixel
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

      // Initialize with Pixel ID
      (window as any).fbq('init', this.config.pixelId);
      
      // Add test event code if provided
      if (this.config.testEventCode) {
        (window as any).fbq('init', this.config.pixelId, {}, {
          test_event_code: this.config.testEventCode
        });
      }

      // Track page view
      (window as any).fbq('track', 'PageView');
      
      this.isInitialized = true;
      console.log('Facebook Pixel initialized successfully');
    } catch (error) {
      console.error('Facebook Pixel initialization failed:', error);
    }
  }

  trackEvent(eventName: string, parameters?: any) {
    if (!this.isActive() || !window.fbq) {
      console.warn('Facebook Pixel not active or not loaded');
      return;
    }

    try {
      (window as any).fbq('track', eventName, parameters);
      console.log('Facebook Pixel event tracked:', { eventName, parameters });
      
      // Send to Conversion API if access token is available
      if (this.config?.accessToken) {
        this.sendToConversionAPI(eventName, parameters);
      }
    } catch (error) {
      console.error('Facebook Pixel tracking error:', error);
    }
  }

  private async sendToConversionAPI(eventName: string, parameters?: any) {
    if (!this.config?.accessToken || !this.config?.pixelId) return;

    try {
      const eventData = {
        data: [{
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          user_data: {
            client_ip_address: await this.getClientIP(),
            client_user_agent: navigator.userAgent,
          },
          custom_data: parameters || {},
          event_source_url: window.location.href,
          action_source: 'website'
        }],
        access_token: this.config.accessToken,
        test_event_code: this.config.testEventCode
      };

      const response = await fetch(`https://graph.facebook.com/v18.0/${this.config.pixelId}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
      });

      if (response.ok) {
        console.log('Event sent to Facebook Conversion API successfully');
      } else {
        console.error('Failed to send event to Conversion API:', await response.text());
      }
    } catch (error) {
      console.error('Conversion API error:', error);
    }
  }

  private async getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  }

  trackCustomEvent(eventName: string, parameters?: any) {
    this.trackEvent(eventName, parameters);
  }

  trackPurchase(value: number, currency: string = 'USD', contentIds?: string[]) {
    this.trackEvent('Purchase', {
      value,
      currency,
      content_ids: contentIds,
      content_type: 'product'
    });
  }

  trackLead(value?: number, currency: string = 'USD') {
    this.trackEvent('Lead', {
      value,
      currency,
      content_category: 'lead_generation'
    });
  }

  isActive(): boolean {
    return !!(this.config && this.config.isActive && this.config.pixelId);
  }

  getConfig(): FacebookPixelConfig | null {
    return this.config;
  }

  testConnection(): boolean {
    return this.isActive() && typeof window !== 'undefined' && !!(window as any).fbq;
  }
}

export const facebookPixel = FacebookPixelManager.getInstance();

// Global type declaration
declare global {
  interface Window {
    fbq: any;
  }
}
