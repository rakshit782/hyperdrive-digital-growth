
import { useEffect } from 'react';
import { initializePerformanceOptimizations } from '@/utils/lazyComponents';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Initialize all performance optimizations
    initializePerformanceOptimizations();
    
    // Critical resource hints
    const addResourceHints = () => {
      const hints = [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://api.supabase.co' },
        { rel: 'dns-prefetch', href: 'https://googletagmanager.com' },
        { rel: 'dns-prefetch', href: 'https://connect.facebook.net' }
      ];

      hints.forEach(hint => {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
        document.head.appendChild(link);
      });
    };

    addResourceHints();

    // Optimize images with lazy loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.add('fade-in');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    };

    // Run optimizations after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeImages);
    } else {
      optimizeImages();
    }
  }, []);

  return null;
};

export default PerformanceOptimizer;
