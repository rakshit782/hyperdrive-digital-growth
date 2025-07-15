
interface CloudflareConfig {
  accountId: string;
  apiToken: string;
  zoneId?: string;
  isActive: boolean;
}

class CloudflareManager {
  private static instance: CloudflareManager;
  private config: CloudflareConfig | null = null;

  static getInstance(): CloudflareManager {
    if (!CloudflareManager.instance) {
      CloudflareManager.instance = new CloudflareManager();
    }
    return CloudflareManager.instance;
  }

  configure(config: CloudflareConfig) {
    this.config = config;
    console.log('Cloudflare configured:', { accountId: config.accountId, active: config.isActive });
  }

  async purgeCache(urls?: string[]): Promise<boolean> {
    if (!this.config?.isActive || !this.config?.apiToken || !this.config?.zoneId) {
      console.warn('Cloudflare not configured properly');
      return false;
    }

    try {
      const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${this.config.zoneId}/purge_cache`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purge_everything: !urls,
          files: urls || undefined,
        }),
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Cloudflare API error:', error);
      return false;
    }
  }

  isActive(): boolean {
    return !!(this.config && this.config.isActive && this.config.apiToken);
  }

  getConfig(): CloudflareConfig | null {
    return this.config;
  }
}

export const cloudflareManager = CloudflareManager.getInstance();
