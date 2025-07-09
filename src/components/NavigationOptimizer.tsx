
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationOptimizer = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        '/placeholder.svg',
        '/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        document.head.appendChild(link);
      });
    };

    // Optimize images with lazy loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add('fade-in');
              observer.unobserve(img);
            }
          }
        });
      });

      images.forEach(img => observer.observe(img));
    };

    // Cache frequently accessed data
    const optimizeLocalStorage = () => {
      try {
        const now = Date.now();
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
        
        Object.keys(localStorage).forEach(key => {
          if (key.includes('temp_') || key.includes('cache_')) {
            try {
              const item = localStorage.getItem(key);
              if (item) {
                const parsed = JSON.parse(item);
                if (parsed.timestamp && now - parsed.timestamp > maxAge) {
                  localStorage.removeItem(key);
                }
              }
            } catch {
              localStorage.removeItem(key);
            }
          }
        });
      } catch (error) {
        console.warn('LocalStorage optimization failed:', error);
      }
    };

    // Prefetch next likely pages
    const prefetchRoutes = () => {
      const commonRoutes = ['/about', '/pricing', '/contact', '/free-audit'];
      const currentPath = location.pathname;
      
      commonRoutes
        .filter(route => route !== currentPath)
        .slice(0, 2)
        .forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
    };

    // Run optimizations
    preloadCriticalResources();
    optimizeImages();
    optimizeLocalStorage();
    
    // Delay prefetch to avoid interfering with current page load
    setTimeout(prefetchRoutes, 1000);

    // Performance monitoring
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark('navigation-optimized');
    }

  }, [location.pathname]);

  return null;
};

export default NavigationOptimizer;
