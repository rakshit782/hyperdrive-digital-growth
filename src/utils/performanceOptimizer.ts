
// Performance optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private observers: Map<string, PerformanceObserver> = new Map();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Preload critical resources
  preloadCriticalResources() {
    const criticalUrls = [
      '/fonts/inter-var.woff2',
      '/images/hero-bg.webp'
    ];

    criticalUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = url.includes('.woff') ? 'font' : 'image';
      if (url.includes('.woff')) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  }

  // Implement intersection observer for lazy loading
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      // Observe all lazy images
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Monitor Core Web Vitals
  monitorWebVitals() {
    if ('web-vital' in window) {
      return;
    }

    // Monitor LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        console.log('LCP:', lastEntry.startTime);
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.set('lcp', lcpObserver);
      } catch (e) {
        console.warn('LCP monitoring not supported');
      }

      // Monitor FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.set('fid', fidObserver);
      } catch (e) {
        console.warn('FID monitoring not supported');
      }
    }
  }

  // Optimize images
  optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading="lazy" to non-critical images
      if (!img.closest('[data-critical]')) {
        img.loading = 'lazy';
      }

      // Add proper sizing attributes
      if (!img.width && !img.height) {
        img.style.aspectRatio = '16/9';
      }
    });
  }

  // Resource hints
  addResourceHints() {
    const hints = [
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://hznbshxhmhtenxcuffhx.supabase.co' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
    ];

    hints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossorigin) {
        link.crossOrigin = hint.crossorigin;
      }
      document.head.appendChild(link);
    });
  }

  // Initialize all optimizations
  init() {
    // Run immediately
    this.addResourceHints();
    this.preloadCriticalResources();

    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupLazyLoading();
        this.optimizeImages();
        this.monitorWebVitals();
      });
    } else {
      this.setupLazyLoading();
      this.optimizeImages();
      this.monitorWebVitals();
    }

    // Cleanup observers on page unload
    window.addEventListener('beforeunload', () => {
      this.observers.forEach(observer => observer.disconnect());
      this.observers.clear();
    });
  }

  // Service Worker registration for caching
  registerServiceWorker() {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      window.addEventListener('load', () => {
        // Unregister existing service workers first to ensure clean state
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            registration.unregister();
          });
        });

        // Register new service worker
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
            
            // Force update check on every page load
            registration.update();
            
            // Listen for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New service worker available, reload to activate
                    console.log('New service worker available, reloading...');
                    window.location.reload();
                  }
                });
              }
            });
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }
}

// Initialize performance optimizer
export const performanceOptimizer = PerformanceOptimizer.getInstance();
