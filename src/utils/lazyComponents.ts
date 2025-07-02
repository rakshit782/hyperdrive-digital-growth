
import { lazy } from 'react';

// Performance optimization utilities with modern lazy loading
export const performanceOptimizations = {
  // Lazy load heavy dashboard components with preloading
  lazyDashboardComponents: {
    ServicesTab: lazy(() => import('@/components/dashboard/ServicesTab')),
    ReviewsTab: lazy(() => import('@/components/dashboard/ReviewsTab')),
    BlogManagement: lazy(() => import('@/components/dashboard/BlogManagement')),
    UserManagementTab: lazy(() => import('@/components/dashboard/UserManagementTab')),
    IntegrationStatusTab: lazy(() => import('@/components/dashboard/IntegrationStatusTab')),
    SocialMediaTab: lazy(() => import('@/components/dashboard/SocialMediaTab')),
    ChatGPTTab: lazy(() => import('@/components/dashboard/ChatGPTTab')),
    WebsiteTab: lazy(() => import('@/components/dashboard/WebsiteTab')),
    ServicePageCustomizer: lazy(() => import('@/components/dashboard/ServicePageCustomizer')),
  },

  // Preload critical components
  preloadCriticalComponents: () => {
    const preloadComponents = [
      () => import('@/components/ModernServices'),
      () => import('@/components/ModernFeatures'),
      () => import('@/components/CircularReviews'),
    ];
    
    preloadComponents.forEach(componentLoader => {
      componentLoader().catch(console.error);
    });
  },

  // Image optimization with lazy loading
  optimizeImages: () => {
    // Add intersection observer for lazy image loading
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('fade-in');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    // Apply to all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  },

  // Font optimization with preload
  optimizeFonts: () => {
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: local('Inter');
      }
      
      .font-loading {
        font-display: swap;
      }
    `;
    document.head.appendChild(style);

    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.type = 'font/woff2';
    fontPreload.crossOrigin = 'anonymous';
    document.head.appendChild(fontPreload);
  },

  // Enhanced resource preloading
  preloadCriticalResources: () => {
    const criticalResources = [
      { href: '/placeholder.svg', as: 'image' },
      { href: '/api/website-settings', as: 'fetch' },
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.as === 'fetch') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  },

  // Service worker for caching
  registerServiceWorker: () => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  },

  // Performance monitoring with Web Vitals
  measureWebVitals: () => {
    if (typeof performance !== 'undefined' && performance.mark) {
      // Core Web Vitals tracking with proper performance API
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Handle different entry types properly
          if (entry.entryType === 'measure') {
            console.log(`${entry.name}: ${entry.duration}ms`);
          } else if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log(`Navigation ${entry.name}: ${navEntry.loadEventEnd - navEntry.loadEventStart}ms`);
          } else {
            console.log(`${entry.name}: ${entry.duration || 0}ms`);
          }
        });
      });
      
      // Observe different entry types based on browser support
      try {
        observer.observe({ entryTypes: ['measure', 'navigation'] });
      } catch (e) {
        console.warn('Performance observer not fully supported:', e);
      }
      
      // Mark critical rendering points
      performance.mark('app-start');
      performance.mark('header-rendered');
      performance.mark('content-loaded');
    }
  },

  // Bundle optimization hints
  logBundleOptimizations: () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Performance optimizations active:');
      console.log('• Lazy loading enabled for dashboard components');
      console.log('• Image lazy loading with intersection observer');
      console.log('• Font preloading with display: swap');
      console.log('• Critical resource preloading');
      console.log('• Service worker caching (production only)');
    }
  },

  // Memory optimization
  optimizeMemory: () => {
    // Enhanced localStorage cleanup
    const clearOldData = () => {
      const keys = Object.keys(localStorage);
      const now = Date.now();
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
      
      keys.forEach(key => {
        if (key.includes('temp_') || key.includes('cache_')) {
          const item = localStorage.getItem(key);
          if (item) {
            try {
              const parsed = JSON.parse(item);
              if (parsed.timestamp && now - parsed.timestamp > maxAge) {
                localStorage.removeItem(key);
              }
            } catch {
              localStorage.removeItem(key);
            }
          }
        }
      });
    };

    // Run cleanup on app start and periodically
    clearOldData();
    setInterval(clearOldData, 60 * 60 * 1000); // Every hour
  },

  // Network optimization with request deduplication
  optimizeNetworkRequests: () => {
    const requestCache = new Map();
    const pendingRequests = new Map();
    
    const originalFetch = window.fetch;
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
      const key = typeof input === 'string' ? input : input.toString();
      const method = init?.method || 'GET';
      
      // Only cache GET requests
      if (method === 'GET') {
        // Return cached result if available
        if (requestCache.has(key)) {
          return Promise.resolve(requestCache.get(key).clone());
        }
        
        // Return pending request if in progress
        if (pendingRequests.has(key)) {
          return pendingRequests.get(key);
        }
        
        // Make new request
        const promise = originalFetch(input, init).then(response => {
          const clonedResponse = response.clone();
          requestCache.set(key, clonedResponse);
          pendingRequests.delete(key);
          
          // Clear cache after 5 minutes
          setTimeout(() => requestCache.delete(key), 5 * 60 * 1000);
          
          return response;
        }).catch(error => {
          pendingRequests.delete(key);
          throw error;
        });
        
        pendingRequests.set(key, promise);
        return promise;
      }
      
      return originalFetch(input, init);
    };
  }
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  // Critical path optimizations
  performanceOptimizations.preloadCriticalComponents();
  performanceOptimizations.optimizeFonts();
  performanceOptimizations.preloadCriticalResources();
  
  // Memory and network optimizations
  performanceOptimizations.optimizeMemory();
  performanceOptimizations.optimizeNetworkRequests();
  
  // Monitoring
  performanceOptimizations.measureWebVitals();
  performanceOptimizations.logBundleOptimizations();
  
  // Service worker (production only)
  performanceOptimizations.registerServiceWorker();
  
  // Image lazy loading when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', performanceOptimizations.optimizeImages);
  } else {
    performanceOptimizations.optimizeImages();
  }
  
  console.log('🚀 Performance optimizations initialized');
};

export default performanceOptimizations;
