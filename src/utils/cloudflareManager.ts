
interface CloudflareConfig {
  accountId: string;
  apiToken: string;
  zoneId?: string;
  streamAccountId?: string;
  streamApiToken?: string;
}

class CloudflareManager {
  private config: CloudflareConfig | null = null;
  private isConfigured = false;

  configure(config: CloudflareConfig) {
    try {
      this.config = config;
      this.isConfigured = true;
      console.log('Cloudflare configured successfully');
      this.saveConfig(config);
    } catch (error) {
      console.error('Cloudflare configuration error:', error);
    }
  }

  private saveConfig(config: CloudflareConfig) {
    localStorage.setItem('cloudflare_config', JSON.stringify(config));
  }

  getConfig(): CloudflareConfig | null {
    const stored = localStorage.getItem('cloudflare_config');
    return stored ? JSON.parse(stored) : null;
  }

  isActive(): boolean {
    return this.isConfigured && this.config !== null;
  }

  loadSavedConfig() {
    const config = this.getConfig();
    if (config) {
      this.configure(config);
    }
  }

  async purgeCache(urls?: string[]) {
    if (!this.config) {
      throw new Error('Cloudflare not configured');
    }

    const purgeData = urls ? { files: urls } : { purge_everything: true };

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${this.config.zoneId}/purge_cache`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purgeData),
    });

    if (!response.ok) {
      throw new Error(`Cloudflare API error: ${response.statusText}`);
    }

    return await response.json();
  }

  async getZoneAnalytics() {
    if (!this.config) {
      throw new Error('Cloudflare not configured');
    }

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${this.config.zoneId}/analytics/dashboard`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Cloudflare API error: ${response.statusText}`);
    }

    return await response.json();
  }
}

export const cloudflareManager = new CloudflareManager();
