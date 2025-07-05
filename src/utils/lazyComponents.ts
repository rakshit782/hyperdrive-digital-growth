
import { lazy } from 'react';

// Lazy load components for better performance
export const LazyAbout = lazy(() => import('@/pages/About'));
export const LazyCaseStudies = lazy(() => import('@/pages/CaseStudies'));
export const LazyPricing = lazy(() => import('@/pages/Pricing'));
export const LazyBlog = lazy(() => import('@/pages/Blog'));

// Simplified performance optimizations - removed preloading
export const initializePerformanceOptimizations = () => {
  // Set up intersection observer for lazy loading
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          // Add any lazy loading logic here
          observer.unobserve(target);
        }
      });
    });

    // Observe elements that should be lazy loaded
    document.addEventListener('DOMContentLoaded', () => {
      const lazyElements = document.querySelectorAll('[data-lazy]');
      lazyElements.forEach(el => observer.observe(el));
    });
  }
};
