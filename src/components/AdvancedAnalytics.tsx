
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsEvent {
  event_name: string;
  event_data?: Record<string, any>;
  page_url?: string;
  referrer?: string;
  session_id?: string;
  user_agent?: string;
}

class AdvancedAnalyticsManager {
  private sessionId: string;
  private pageLoadTime: number;
  private userInteractions: number = 0;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.pageLoadTime = Date.now();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  private initializeTracking() {
    // Track page views
    this.trackEvent('page_view', {
      timestamp: new Date().toISOString(),
      page_title: document.title,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      screen: `${window.screen.width}x${window.screen.height}`
    });

    // Track user engagement
    this.trackUserEngagement();
    
    // Track performance metrics
    this.trackPerformanceMetrics();
  }

  private trackUserEngagement() {
    // Click tracking with error handling
    document.addEventListener('click', (event) => {
      try {
        this.userInteractions++;
        const target = event.target as HTMLElement;
        
        this.trackEvent('click', {
          element_type: target.tagName.toLowerCase(),
          element_class: target.className,
          element_id: target.id,
          element_text: target.textContent?.substring(0, 100),
          x: event.clientX,
          y: event.clientY
        });
      } catch (error) {
        console.warn('Click tracking error:', error);
      }
    });

    // Scroll tracking with throttling
    let scrollDepth = 0;
    let scrollTimeout: NodeJS.Timeout;
    
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        try {
          const currentDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
          if (currentDepth > scrollDepth && currentDepth % 25 === 0) {
            scrollDepth = currentDepth;
            this.trackEvent('scroll_depth', { depth: scrollDepth });
          }
        } catch (error) {
          console.warn('Scroll tracking error:', error);
        }
      }, 100);
    });

    // Time on page
    window.addEventListener('beforeunload', () => {
      try {
        const timeOnPage = Date.now() - this.pageLoadTime;
        this.trackEvent('page_exit', {
          time_on_page: timeOnPage,
          interactions: this.userInteractions
        });
      } catch (error) {
        console.warn('Page exit tracking error:', error);
      }
    });
  }

  private trackPerformanceMetrics() {
    // Web Vitals with error handling
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              this.trackEvent('performance_navigation', {
                dns_time: navEntry.domainLookupEnd - navEntry.domainLookupStart,
                connect_time: navEntry.connectEnd - navEntry.connectStart,
                response_time: navEntry.responseEnd - navEntry.requestStart,
                dom_load_time: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
                page_load_time: navEntry.loadEventEnd - navEntry.loadEventStart
              });
            }
          }
        });
        
        observer.observe({ entryTypes: ['navigation'] });
      } catch (e) {
        console.warn('Performance observer not supported:', e);
      }
    }
  }

  async trackEvent(eventName: string, eventData?: Record<string, any>) {
    const event: AnalyticsEvent = {
      event_name: eventName,
      event_data: eventData || {},
      page_url: window.location.href,
      referrer: document.referrer,
      session_id: this.sessionId,
      user_agent: navigator.userAgent
    };

    try {
      await supabase.from('analytics_events').insert(event);
    } catch (error) {
      // Silently handle errors to avoid disrupting user experience
      console.warn('Analytics tracking failed:', error);
    }
  }

  trackConversion(conversionType: string, value?: number) {
    this.trackEvent('conversion', {
      conversion_type: conversionType,
      value: value,
      timestamp: new Date().toISOString()
    });
  }

  trackFormSubmission(formType: string, formData: Record<string, any>) {
    this.trackEvent('form_submission', {
      form_type: formType,
      form_data: formData,
      timestamp: new Date().toISOString()
    });
  }
}

const AdvancedAnalytics = () => {
  useEffect(() => {
    const analytics = new AdvancedAnalyticsManager();
    
    // Make analytics available globally
    (window as any).advancedAnalytics = analytics;
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
};

export default AdvancedAnalytics;
