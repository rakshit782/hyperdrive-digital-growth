
declare global {
  interface Window {
    Clerk: any;
  }
}

export interface ClerkConfig {
  publishableKey: string;
  isActive: boolean;
  signInUrl?: string;
  signUpUrl?: string;
  afterSignInUrl?: string;
  afterSignUpUrl?: string;
}

export class ClerkManager {
  private static instance: ClerkManager;
  private config: ClerkConfig | null = null;
  private isInitialized = false;

  static getInstance(): ClerkManager {
    if (!ClerkManager.instance) {
      ClerkManager.instance = new ClerkManager();
    }
    return ClerkManager.instance;
  }

  initialize(config: ClerkConfig): void {
    if (this.isInitialized && this.config?.publishableKey === config.publishableKey) {
      return;
    }

    this.config = config;
    
    if (config.isActive && config.publishableKey) {
      console.log('Clerk initialized with config:', config);
      this.isInitialized = true;
    }
  }

  getConfig(): ClerkConfig | null {
    return this.config;
  }

  isActive(): boolean {
    return this.config?.isActive || false;
  }
}

export const clerkManager = ClerkManager.getInstance();
