
export interface CloudflareConfig {
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

  getConfig(): CloudflareConfig | null {
    return this.config;
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
