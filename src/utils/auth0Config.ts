
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

  getConfig(): Auth0Config | null {
    return this.config;
  }

  async saveConfig(config: Auth0Config): Promise<void> {
    this.config = config;
    // Save to localStorage for persistence
    localStorage.setItem('auth0_config', JSON.stringify(config));
  }

  loadSavedConfig(): Auth0Config | null {
    try {
      const saved = localStorage.getItem('auth0_config');
      if (saved) {
        this.config = JSON.parse(saved);
        return this.config;
      }
    } catch (error) {
      console.error('Error loading Auth0 config:', error);
    }
    return null;
  }

  isConfigured(): boolean {
    return this.config?.isActive && !!this.config?.domain && !!this.config?.clientId;
  }
}

export const auth0ConfigManager = Auth0ConfigManager.getInstance();
