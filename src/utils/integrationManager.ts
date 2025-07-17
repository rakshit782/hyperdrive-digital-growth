
import { facebookPixel } from './facebookPixel';
import { googleAnalyticsManager } from './googleAnalyticsManager';
import { chatGPTManager } from './chatGPTManager';
import { cloudflareManager } from './cloudflareManager';
import { auth0ConfigManager } from './auth0Config';

export interface IntegrationStatus {
  name: string;
  status: 'active' | 'inactive' | 'error';
  lastCheck: string;
  lastChecked: Date;
  isActive: boolean;
  hasConfig: boolean;
  features?: string[];
  errors?: string[];
  error?: string;
}

class IntegrationManager {
  private integrations: Map<string, IntegrationStatus> = new Map();
  private initialized = false;

  async initializeAllIntegrations(): Promise<void> {
    if (this.initialized) return;
    
    console.log('Integration Manager: Initializing all integrations...');

    try {
      // Initialize Facebook Pixel
      await this.initializeFacebookPixel();

      // Initialize Google Analytics
      await this.initializeGoogleAnalytics();

      // Initialize ChatGPT
      await this.initializeChatGPT();

      // Initialize Cloudflare
      await this.initializeCloudflare();

      // Initialize Auth0
      await this.initializeAuth0();

      this.initialized = true;
      console.log('Integration Manager: All integrations initialized successfully');
      
      // Dispatch event to notify dashboard
      this.notifyIntegrationUpdate();
    } catch (error) {
      console.error('Integration Manager: Failed to initialize integrations:', error);
    }
  }

  private async initializeFacebookPixel(): Promise<void> {
    try {
      // Load saved config first
      facebookPixel.loadSavedConfig();
      const config = facebookPixel.getConfig();
      
      if (config && config.pixelId && config.isActive) {
        this.setIntegrationStatus('facebook-pixel', 'active', undefined, ['Page View Tracking', 'Custom Events', 'Conversion API']);
      } else {
        this.setIntegrationStatus('facebook-pixel', 'inactive', undefined, ['Page View Tracking', 'Custom Events', 'Conversion API']);
      }
    } catch (error) {
      this.setIntegrationStatus('facebook-pixel', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async initializeGoogleAnalytics(): Promise<void> {
    try {
      const config = googleAnalyticsManager.getConfig();
      if (config && config.measurementId && config.isActive) {
        this.setIntegrationStatus('google-analytics', 'active', undefined, ['Page Views', 'Events', 'Conversions']);
      } else {
        this.setIntegrationStatus('google-analytics', 'inactive', undefined, ['Page Views', 'Events', 'Conversions']);
      }
    } catch (error) {
      this.setIntegrationStatus('google-analytics', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async initializeChatGPT(): Promise<void> {
    try {
      const isActive = chatGPTManager.isActive();
      this.setIntegrationStatus('chatgpt', isActive ? 'active' : 'inactive', undefined, ['AI Chat Support', 'Content Generation']);
    } catch (error) {
      this.setIntegrationStatus('chatgpt', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async initializeCloudflare(): Promise<void> {
    try {
      const config = cloudflareManager.getConfig();
      if (config && config.accountId && config.apiToken) {
        this.setIntegrationStatus('cloudflare', 'active', undefined, ['CDN', 'Security', 'DNS']);
      } else {
        this.setIntegrationStatus('cloudflare', 'inactive', undefined, ['CDN', 'Security', 'DNS']);
      }
    } catch (error) {
      this.setIntegrationStatus('cloudflare', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async initializeAuth0(): Promise<void> {
    try {
      const isConfigured = auth0ConfigManager.isConfigured();
      this.setIntegrationStatus('auth0', isConfigured ? 'active' : 'inactive', undefined, ['User Authentication', 'SSO', 'User Management']);
    } catch (error) {
      this.setIntegrationStatus('auth0', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private setIntegrationStatus(name: string, status: 'active' | 'inactive' | 'error', error?: string, features?: string[]): void {
    this.integrations.set(name, {
      name: this.getDisplayName(name),
      status,
      lastCheck: new Date().toISOString(),
      lastChecked: new Date(),
      isActive: status === 'active',
      hasConfig: status !== 'inactive',
      features: features || [],
      error
    });
  }

  private getDisplayName(name: string): string {
    const displayNames: { [key: string]: string } = {
      'facebook-pixel': 'Facebook Pixel',
      'google-analytics': 'Google Analytics',
      'chatgpt': 'ChatGPT',
      'cloudflare': 'Cloudflare',
      'auth0': 'Auth0'
    };
    return displayNames[name] || name;
  }

  getIntegrationStatus(name?: string): IntegrationStatus[] {
    if (!this.initialized) {
      // Initialize asynchronously but return current state
      this.initializeAllIntegrations().catch(console.error);
    }
    
    if (name) {
      const integration = this.integrations.get(name);
      return integration ? [integration] : [];
    }
    return Array.from(this.integrations.values());
  }

  getAllIntegrationStatuses(): IntegrationStatus[] {
    if (!this.initialized) {
      // Initialize asynchronously but return current state
      this.initializeAllIntegrations().catch(console.error);
    }
    return Array.from(this.integrations.values());
  }

  async testIntegration(name: string): Promise<boolean> {
    try {
      switch (name) {
        case 'facebook-pixel':
          return facebookPixel.isActive();
        case 'google-analytics':
          return googleAnalyticsManager.isActive();
        case 'chatgpt':
          return chatGPTManager.isActive();
        case 'cloudflare':
          return cloudflareManager.isActive();
        case 'auth0':
          return auth0ConfigManager.isConfigured();
        default:
          return false;
      }
    } catch (error) {
      console.error(`Failed to test integration ${name}:`, error);
      return false;
    }
  }

  notifyIntegrationUpdate(): void {
    // Trigger a custom event to notify components about integration updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('integrationStatusChanged', {
        detail: this.getAllIntegrationStatuses()
      }));
    }
  }

  // Method to refresh integration status
  async refreshIntegrations(): Promise<void> {
    this.initialized = false;
    this.integrations.clear();
    await this.initializeAllIntegrations();
  }
}

export const integrationManager = new IntegrationManager();

// Initialize integrations when the module is loaded (only in browser)
if (typeof window !== 'undefined') {
  integrationManager.initializeAllIntegrations().catch(console.error);
}
