
import { facebookPixel } from './facebookPixel';
import { googleAnalyticsManager } from './googleAnalyticsManager';
import { chatGPTManager } from './chatGPTManager';
import { cloudflareManager } from './cloudflareManager';
import { auth0ConfigManager } from './auth0Config';

interface IntegrationStatus {
  name: string;
  status: 'active' | 'inactive' | 'error';
  lastCheck: string;
  error?: string;
}

class IntegrationManager {
  private integrations: Map<string, IntegrationStatus> = new Map();

  async initializeAllIntegrations(): Promise<void> {
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

      console.log('Integration Manager: All integrations initialized');
    } catch (error) {
      console.error('Integration Manager: Failed to initialize integrations:', error);
    }
  }

  private async initializeFacebookPixel(): Promise<void> {
    try {
      const config = facebookPixel.getConfig();
      if (config && config.pixelId && config.isActive) {
        this.setIntegrationStatus('facebook-pixel', 'active');
      } else {
        this.setIntegrationStatus('facebook-pixel', 'inactive');
      }
    } catch (error) {
      this.setIntegrationStatus('facebook-pixel', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async initializeGoogleAnalytics(): Promise<void> {
    try {
      const config = googleAnalyticsManager.getConfig();
      if (config && config.measurementId && config.isActive) {
        this.setIntegrationStatus('google-analytics', 'active');
      } else {
        this.setIntegrationStatus('google-analytics', 'inactive');
      }
    } catch (error) {
      this.setIntegrationStatus('google-analytics', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async initializeChatGPT(): Promise<void> {
    try {
      const isActive = chatGPTManager.isActive();
      this.setIntegrationStatus('chatgpt', isActive ? 'active' : 'inactive');
    } catch (error) {
      this.setIntegrationStatus('chatgpt', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async initializeCloudflare(): Promise<void> {
    try {
      const config = cloudflareManager.getConfig();
      if (config && config.accountId && config.apiToken && config.isActive) {
        this.setIntegrationStatus('cloudflare', 'active');
      } else {
        this.setIntegrationStatus('cloudflare', 'inactive');
      }
    } catch (error) {
      this.setIntegrationStatus('cloudflare', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async initializeAuth0(): Promise<void> {
    try {
      const isConfigured = auth0ConfigManager.isConfigured();
      this.setIntegrationStatus('auth0', isConfigured ? 'active' : 'inactive');
    } catch (error) {
      this.setIntegrationStatus('auth0', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private setIntegrationStatus(name: string, status: 'active' | 'inactive' | 'error', error?: string): void {
    this.integrations.set(name, {
      name,
      status,
      lastCheck: new Date().toISOString(),
      error
    });
  }

  getIntegrationStatus(name: string): IntegrationStatus | undefined {
    return this.integrations.get(name);
  }

  getAllIntegrationStatuses(): IntegrationStatus[] {
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
}

export const integrationManager = new IntegrationManager();
