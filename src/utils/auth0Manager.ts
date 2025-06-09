
export interface Auth0Config {
  domain: string;
  clientId: string;
  isActive: boolean;
  redirectUri?: string;
  audience?: string;
  scope?: string;
}

export class Auth0Manager {
  private static instance: Auth0Manager;
  private config: Auth0Config | null = null;
  private isInitialized = false;

  static getInstance(): Auth0Manager {
    if (!Auth0Manager.instance) {
      Auth0Manager.instance = new Auth0Manager();
    }
    return Auth0Manager.instance;
  }

  initialize(config: Auth0Config): void {
    if (this.isInitialized && this.config?.domain === config.domain) {
      return;
    }

    this.config = config;
    
    if (config.isActive && config.domain && config.clientId) {
      console.log('Auth0 initialized with config:', config);
      this.isInitialized = true;
    }
  }

  getConfig(): Auth0Config | null {
    return this.config;
  }

  isActive(): boolean {
    return this.config?.isActive || false;
  }
}

export const auth0Manager = Auth0Manager.getInstance();
