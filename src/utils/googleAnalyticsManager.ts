
declare global {
  interface Window {
    gtag: any;
    dataLayer: any[];
  }
}

export interface GoogleAnalyticsConfig {
  measurementId: string;
  isActive: boolean;
  enableEnhancedMeasurement?: boolean;
  enableConversionTracking?: boolean;
  customEvents?: boolean;
}

export class GoogleAnalyticsManager {
  private static instance: GoogleAnalyticsManager;
  private config: GoogleAnalyticsConfig | null = null;
  private isInitialized = false;

  static getInstance(): GoogleAnalyticsManager {
    if (!GoogleAnalyticsManager.instance) {
      GoogleAnalyticsManager.instance = new GoogleAnalyticsManager();
    }
    return GoogleAnalyticsManager.instance;
  }

  initialize(config: GoogleAnalyticsConfig): void {
    if (this.isInitialized && this.config?.measurementId === config.measurementId) {
      return;
    }

    this.config = config;
    
    if (config.isActive && config.measurementId) {
      this.loadGoogleAnalytics(config.measurementId);
      this.isInitialized = true;
      console.log('Google Analytics initialized with ID:', config.measurementId);
    }
  }

  private loadGoogleAnalytics(measurementId: string): void {
    if (typeof window !== 'undefined') {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', measurementId);
    }
  }

  trackEvent(eventName: string, parameters?: any): void {
    if (!this.isInitialized || !this.config?.isActive) {
      console.warn('Google Analytics not initialized');
      return;
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
      console.log('Google Analytics event tracked:', eventName, parameters);
    }
  }

  trackPageView(page_title: string, page_location: string): void {
    this.trackEvent('page_view', {
      page_title,
      page_location
    });
  }

  trackPurchase(transactionId: string, value: number, currency: string = 'USD'): void {
    this.trackEvent('purchase', {
      transaction_id: transactionId,
      value,
      currency
    });
  }

  getConfig(): GoogleAnalyticsConfig | null {
    return this.config;
  }

  isActive(): boolean {
    return this.config?.isActive || false;
  }
}

export const googleAnalyticsManager = GoogleAnalyticsManager.getInstance();
