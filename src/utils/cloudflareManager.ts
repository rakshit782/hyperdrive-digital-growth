
export interface CloudflareConfig {
  accountId: string;
  apiToken: string;
  zoneId?: string;
  streamAccountId?: string;
  streamApiToken?: string;
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

  getConfig(): CloudflareConfig | null {
    return this.config;
  }

  configure(config: CloudflareConfig): void {
    this.config = config;
    this.saveConfig(config);
  }

  async saveConfig(config: CloudflareConfig): Promise<void> {
    this.config = config;
    localStorage.setItem('cloudflare_config', JSON.stringify(config));
  }

  loadSavedConfig(): CloudflareConfig | null {
    try {
      const saved = localStorage.getItem('cloudflare_config');
      if (saved) {
        this.config = JSON.parse(saved);
        return this.config;
      }
    } catch (error) {
      console.error('Error loading Cloudflare config:', error);
    }
    return null;
  }

  async purgeCache(urls?: string[]): Promise<void> {
    if (!this.config?.zoneId || !this.config?.apiToken) {
      throw new Error('Cloudflare not configured');
    }

    const purgeData = urls && urls.length > 0 
      ? { files: urls }
      : { purge_everything: true };

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${this.config.zoneId}/purge_cache`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purgeData),
    });

    if (!response.ok) {
      throw new Error(`Cache purge failed: ${response.statusText}`);
    }
  }

  async getZoneAnalytics(): Promise<any> {
    if (!this.config?.zoneId || !this.config?.apiToken) {
      throw new Error('Cloudflare not configured');
    }

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${this.config.zoneId}/analytics/dashboard`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Analytics fetch failed: ${response.statusText}`);
    }

    return response.json();
  }

  async testConnection(): Promise<boolean> {
    if (!this.config?.accountId || !this.config?.apiToken) return false;
    
    try {
      const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${this.config.accountId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        },
      });
      return response.ok;
    } catch (error) {
      console.error('Cloudflare connection test failed:', error);
      return false;
    }
  }

  isActive(): boolean {
    return this.config?.isActive || false;
  }
}

export const cloudflareManager = CloudflareManager.getInstance();
