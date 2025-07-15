
interface Auth0Config {
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

  configure(config: Auth0Config) {
    this.config = config;
    console.log('Auth0 configured:', { domain: config.domain, active: config.isActive });
  }

  getLoginUrl(): string | null {
    if (!this.config?.isActive) return null;

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scope,
      audience: this.config.audience || '',
    });

    return `https://${this.config.domain}/authorize?${params.toString()}`;
  }

  getLogoutUrl(): string | null {
    if (!this.config?.isActive) return null;
    return `https://${this.config.domain}/v2/logout?client_id=${this.config.clientId}&returnTo=${encodeURIComponent(this.config.redirectUri)}`;
  }

  isConfigured(): boolean {
    return !!(this.config && this.config.isActive && this.config.domain && this.config.clientId);
  }

  getConfig(): Auth0Config | null {
    return this.config;
  }
}

export const auth0ConfigManager = Auth0ConfigManager.getInstance();
