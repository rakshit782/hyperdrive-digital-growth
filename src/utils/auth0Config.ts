
export interface Auth0Config {
  domain: string;
  clientId: string;
  redirectUri: string;
  audience?: string;
  scope: string;
  isActive: boolean;
}

class Auth0ConfigManager {
  private static instance: Auth0ConfigManager;
  private config: Auth0Config | null = null;

  static getInstance(): Auth0ConfigManager {
    if (!Auth0ConfigManager.instance) {
      Auth0ConfigManager.instance = new Auth0ConfigManager();
    }
    return Auth0ConfigManager.instance;
  }

  async saveConfig(config: Auth0Config): Promise<void> {
    this.config = config;
    localStorage.setItem('auth0_config', JSON.stringify(config));
  }

  getConfig(): Auth0Config | null {
    if (this.config) return this.config;

    const stored = localStorage.getItem('auth0_config');
    if (stored) {
      try {
        this.config = JSON.parse(stored);
        return this.config;
      } catch (error) {
        console.error('Failed to parse Auth0 config:', error);
        return null;
      }
    }
    return null;
  }

  isConfigured(): boolean {
    const config = this.getConfig();
    return !!(config && config.domain && config.clientId && config.isActive);
  }

  clearConfig(): void {
    this.config = null;
    localStorage.removeItem('auth0_config');
  }
}

export const auth0ConfigManager = Auth0ConfigManager.getInstance();
