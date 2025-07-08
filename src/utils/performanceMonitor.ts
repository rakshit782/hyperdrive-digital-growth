
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMeasurement(name: string) {
    performance.mark(`${name}-start`);
  }

  endMeasurement(name: string) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name, 'measure')[0];
    this.metrics.set(name, measure.duration);
    
    console.log(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`);
    return measure.duration;
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  measureWebVitals() {
    // Core Web Vitals measurement
    if (typeof PerformanceObserver !== 'undefined') {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        this.metrics.set('LCP', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fidEntry = entry as any; // Cast to access FID-specific properties
          if (fidEntry.processingStart && fidEntry.startTime) {
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
            this.metrics.set('FID', fidEntry.processingStart - fidEntry.startTime);
          }
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const clsEntry = entry as any; // Cast to access CLS-specific properties
          if (!clsEntry.hadRecentInput && clsEntry.value) {
            clsValue += clsEntry.value;
          }
        }
        console.log('CLS:', clsValue);
        this.metrics.set('CLS', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
