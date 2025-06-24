
import { cloudflareManager } from '@/utils/cloudflareManager';

export interface CacheResult {
  success: boolean;
  message?: string;
  error?: string;
}

export interface AnalyticsResult {
  success: boolean;
  data?: any;
  error?: string;
}

class CDNService {
  private static instance: CDNService;

  static getInstance(): CDNService {
    if (!CDNService.instance) {
      CDNService.instance = new CDNService();
    }
    return CDNService.instance;
  }

  async purgeCache(urls?: string[]): Promise<CacheResult> {
    try {
      if (!cloudflareManager.isActive()) {
        return {
          success: false,
          error: 'Cloudflare CDN is not configured. Please configure Cloudflare in the dashboard.'
        };
      }

      await cloudflareManager.purgeCache(urls);
      
      return {
        success: true,
        message: urls 
          ? `Cache purged for ${urls.length} specific URLs`
          : 'All cache purged successfully'
      };
    } catch (error) {
      console.error('Cache purge error:', error);
      return {
        success: false,
        error: `Cache purge failed: ${error}`
      };
    }
  }

  async getAnalytics(): Promise<AnalyticsResult> {
    try {
      if (!cloudflareManager.isActive()) {
        return {
          success: false,
          error: 'Cloudflare CDN is not configured'
        };
      }

      const data = await cloudflareManager.getZoneAnalytics();
      
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Analytics fetch error:', error);
      return {
        success: false,
        error: `Analytics fetch failed: ${error}`
      };
    }
  }

  async optimizeImages(urls: string[]): Promise<CacheResult> {
    // Cloudflare automatically optimizes images when Polish is enabled
    // This method can trigger cache purge for image optimization
    return this.purgeCache(urls);
  }

  isActive(): boolean {
    return cloudflareManager.isActive();
  }

  getStatus(): { 
    isActive: boolean; 
    features: string[];
    config?: any;
  } {
    const config = cloudflareManager.getConfig();
    
    return {
      isActive: this.isActive(),
      features: [
        'Global CDN',
        'Image Optimization',
        'Cache Management',
        'Analytics',
        'DDoS Protection',
        'SSL/TLS',
      ],
      config: config ? {
        hasZoneId: !!config.zoneId,
        hasStreamConfig: !!(config.streamAccountId && config.streamApiToken)
      } : undefined
    };
  }
}

export const cdnService = CDNService.getInstance();
