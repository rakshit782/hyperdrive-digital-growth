
import { lazy } from 'react';

// Performance optimization utilities
export const performanceOptimizations = {
  // Lazy load heavy dashboard components
  lazyDashboardComponents: {
    ServicesTab: lazy(() => import('@/components/dashboard/ServicesTab')),
    ReviewsTab: lazy(() => import('@/components/dashboard/ReviewsTab')),
    BlogManagement: lazy(() => import('@/components/dashboard/BlogManagement')),
    UserManagementTab: lazy(() => import('@/components/dashboard/UserManagementTab')),
    IntegrationStatusTab: lazy(() => import('@/components/dashboard/IntegrationStatusTab')),
    SocialMediaTab: lazy(() => import('@/components/dashboard/SocialMediaTab')),
    ChatGPTTab: lazy(() => import('@/components/dashboard/ChatGPTTab')),
  },

  // Image optimization
  convertToWebP: (imageUrl: string): string => {
    // In a real implementation, this would convert images to WebP format
    // For now, return the original URL with a note for manual conversion
    console.log(`Consider converting ${imageUrl} to WebP format for better performance`);
    return imageUrl;
  },

  // Font optimization
  optimizeFonts: () => {
    // Apply font-display: swap to custom fonts
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'CustomFont';
        font-display: swap;
        /* Add your custom font declarations here */
      }
      
      /* Optimize web font loading */
      .font-loading {
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  },

  // Preload critical resources
  preloadCriticalResources: () => {
    const criticalResources = [
      '/placeholder.svg',
      // Add other critical resources
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.svg') ? 'image' : 'fetch';
      document.head.appendChild(link);
    });
  },

  // Bundle analysis helper
  logBundleSize: () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Bundle analysis tips:');
      console.log('1. Use "npm run build -- --analyze" to analyze bundle size');
      console.log('2. Consider code splitting for routes');
      console.log('3. Lazy load non-critical components');
      console.log('4. Use dynamic imports for large libraries');
    }
  },

  // Performance monitoring
  measurePerformance: (markName: string) => {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(markName);
      console.log(`Performance mark: ${markName}`);
    }
  },

  // Memory optimization
  optimizeMemory: () => {
    // Clear unnecessary data from localStorage periodically
    const clearOldData = () => {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('temp_') || key.includes('cache_')) {
          const item = localStorage.getItem(key);
          if (item) {
            try {
              const parsed = JSON.parse(item);
              if (parsed.timestamp && Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000) {
                localStorage.removeItem(key);
              }
            } catch {
              // Remove invalid items
              localStorage.removeItem(key);
            }
          }
        }
      });
    };

    // Run cleanup every hour
    setInterval(clearOldData, 60 * 60 * 1000);
  },

  // Network optimization
  optimizeNetworkRequests: () => {
    // Add request deduplication
    const requestCache = new Map();
    
    const originalFetch = window.fetch;
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
      const key = typeof input === 'string' ? input : input.toString();
      
      if (requestCache.has(key) && init?.method !== 'POST' && init?.method !== 'PUT') {
        return requestCache.get(key);
      }
      
      const promise = originalFetch(input, init);
      requestCache.set(key, promise);
      
      // Clear cache after 5 minutes
      setTimeout(() => requestCache.delete(key), 5 * 60 * 1000);
      
      return promise;
    };
  }
};

// Initialize performance optimizations
export const initializePerformanceOptimizations = () => {
  performanceOptimizations.optimizeFonts();
  performanceOptimizations.preloadCriticalResources();
  performanceOptimizations.optimizeMemory();
  performanceOptimizations.optimizeNetworkRequests();
  performanceOptimizations.logBundleSize();
  
  console.log('Performance optimizations initialized');
};

// Security utilities
export const securityUtils = {
  // Validate environment variables
  validateEnvironmentVariables: () => {
    const requiredEnvVars = [
      'VITE_APP_NAME',
      // Add other required environment variables
    ];

    const missing = requiredEnvVars.filter(envVar => !import.meta.env[envVar]);
    
    if (missing.length > 0) {
      console.warn('Missing environment variables:', missing);
      return false;
    }
    
    return true;
  },

  // CORS validation helper
  validateCORSPolicy: (apiUrl: string) => {
    console.log(`Ensure CORS is properly configured for: ${apiUrl}`);
    console.log('Required CORS headers:');
    console.log('- Access-Control-Allow-Origin');
    console.log('- Access-Control-Allow-Methods');
    console.log('- Access-Control-Allow-Headers');
  },

  // Content Security Policy helper
  setupCSP: () => {
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://api.openai.com https://graph.facebook.com https://www.google-analytics.com;
    `.replace(/\s+/g, ' ').trim();
    
    document.head.appendChild(cspMeta);
  }
};

export default performanceOptimizations;
