
import { facebookPixel } from './facebookPixel';
import { googleAnalyticsManager } from './googleAnalyticsManager';
import { cloudflareManager } from './cloudflareManager';
import { amplifyManager } from './amplifyManager';
import { cognitoManager } from './cognitoManager';

export interface IntegrationStatus {
  name: string;
  isActive: boolean;
  hasConfig: boolean;
  lastChecked: Date;
  features?: string[];
  errors?: string[];
}

class IntegrationManager {
  private static instance: IntegrationManager;

  static getInstance(): IntegrationManager {
    if (!IntegrationManager.instance) {
      IntegrationManager.instance = new IntegrationManager();
    }
    return IntegrationManager.instance;
  }

  initializeAllIntegrations() {
    // Load saved configurations on app start
    amplifyManager.loadSavedConfig();
    cognitoManager.loadSavedConfig();
    cloudflareManager.loadSavedConfig();
    
    console.log('Integration Manager: All integrations initialized');
  }

  getIntegrationStatus(): IntegrationStatus[] {
    const integrations: IntegrationStatus[] = [
      {
        name: 'Facebook Pixel',
        isActive: this.checkFacebookPixelStatus(),
        hasConfig: this.hasFacebookPixelConfig(),
        lastChecked: new Date(),
        features: ['Event Tracking', 'Conversion Tracking', 'Custom Events'],
        errors: this.getFacebookPixelErrors()
      },
      {
        name: 'Google Analytics',
        isActive: googleAnalyticsManager.isActive(),
        hasConfig: !!googleAnalyticsManager.getConfig(),
        lastChecked: new Date(),
        features: ['Page Views', 'Events', 'Conversions'],
        errors: this.getGoogleAnalyticsErrors()
      },
      {
        name: 'Cloudflare CDN',
        isActive: cloudflareManager.isActive(),
        hasConfig: !!cloudflareManager.getConfig(),
        lastChecked: new Date(),
        features: ['Cache Management', 'Analytics', 'Security'],
        errors: this.getCloudflareErrors()
      },
      {
        name: 'AWS Amplify',
        isActive: amplifyManager.isActive(),
        hasConfig: !!amplifyManager.getConfig(),
        lastChecked: new Date(),
        features: ['Authentication', 'API Gateway', 'Storage'],
        errors: this.getAmplifyErrors()
      },
      {
        name: 'AWS Cognito',
        isActive: cognitoManager.isActive(),
        hasConfig: !!cognitoManager.getConfig(),
        lastChecked: new Date(),
        features: ['User Management', 'Authentication', 'Authorization'],
        errors: this.getCognitoErrors()
      }
    ];

    return integrations;
  }

  private checkFacebookPixelStatus(): boolean {
    try {
      const config = localStorage.getItem('facebookPixel_config');
      if (!config) return false;
      const parsed = JSON.parse(config);
      return parsed.isActive && parsed.pixelId;
    } catch {
      return false;
    }
  }

  private hasFacebookPixelConfig(): boolean {
    try {
      const config = localStorage.getItem('facebookPixel_config');
      return !!config;
    } catch {
      return false;
    }
  }

  private getFacebookPixelErrors(): string[] {
    const errors: string[] = [];
    if (!this.hasFacebookPixelConfig()) {
      errors.push('No configuration found');
    }
    if (typeof window !== 'undefined' && !window.fbq) {
      errors.push('Facebook Pixel script not loaded');
    }
    return errors;
  }

  private getGoogleAnalyticsErrors(): string[] {
    const errors: string[] = [];
    const config = googleAnalyticsManager.getConfig();
    if (!config) {
      errors.push('No configuration found');
    }
    if (typeof window !== 'undefined' && !window.gtag) {
      errors.push('Google Analytics script not loaded');
    }
    return errors;
  }

  private getCloudflareErrors(): string[] {
    const errors: string[] = [];
    const config = cloudflareManager.getConfig();
    if (!config) {
      errors.push('No configuration found');
    } else {
      if (!config.accountId) errors.push('Missing Account ID');
      if (!config.apiToken) errors.push('Missing API Token');
    }
    return errors;
  }

  private getAmplifyErrors(): string[] {
    const errors: string[] = [];
    const config = amplifyManager.getConfig();
    if (!config) {
      errors.push('No configuration found');
    } else {
      if (!config.region) errors.push('Missing region');
      if (!config.userPoolId) errors.push('Missing User Pool ID');
    }
    return errors;
  }

  private getCognitoErrors(): string[] {
    const errors: string[] = [];
    const config = cognitoManager.getConfig();
    if (!config) {
      errors.push('No configuration found');
    } else {
      if (!config.userPoolId) errors.push('Missing User Pool ID');
      if (!config.clientId) errors.push('Missing Client ID');
    }
    return errors;
  }

  // Test integration connectivity
  async testIntegration(integrationName: string): Promise<boolean> {
    try {
      switch (integrationName) {
        case 'Cloudflare CDN':
          if (!cloudflareManager.isActive()) return false;
          // You could add a test API call here
          return true;
        
        case 'Facebook Pixel':
          return this.checkFacebookPixelStatus() && typeof window !== 'undefined' && !!window.fbq;
        
        case 'Google Analytics':
          return googleAnalyticsManager.isActive() && typeof window !== 'undefined' && !!window.gtag;
        
        case 'AWS Amplify':
          return amplifyManager.isActive();
        
        case 'AWS Cognito':
          return cognitoManager.isActive();
        
        default:
          return false;
      }
    } catch (error) {
      console.error(`Test failed for ${integrationName}:`, error);
      return false;
    }
  }

  // Dispatch events to notify components about integration status changes
  notifyIntegrationUpdate(integrationName: string, status: boolean) {
    const event = new CustomEvent('integrationStatusChanged', {
      detail: { integration: integrationName, isActive: status }
    });
    window.dispatchEvent(event);
  }
}

export const integrationManager = IntegrationManager.getInstance();
