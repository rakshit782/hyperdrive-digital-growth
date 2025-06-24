import { facebookPixel } from './facebookPixel';
import { googleAnalyticsManager } from './googleAnalyticsManager';
import { cloudflareManager } from './cloudflareManager';
import { amplifyManager } from './amplifyManager';
import { cognitoManager } from './cognitoManager';
import { chatGPTManager } from './chatGPTManager';
import { s3Manager } from './s3Manager';
import { sesManager } from './sesManager';

export interface IntegrationStatus {
  name: string;
  isActive: boolean;
  hasConfig: boolean;
  lastChecked: Date;
  features?: string[];
  errors?: string[];
  health?: 'healthy' | 'warning' | 'error';
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
    chatGPTManager.loadSavedConfig();
    s3Manager.loadSavedConfig();
    sesManager.loadSavedConfig();
    
    console.log('Integration Manager: All integrations initialized');
    
    // Notify that integrations are ready
    this.notifyIntegrationUpdate('System', true);
  }

  getIntegrationStatus(): IntegrationStatus[] {
    const integrations: IntegrationStatus[] = [
      {
        name: 'Facebook Pixel',
        isActive: this.checkFacebookPixelStatus(),
        hasConfig: this.hasFacebookPixelConfig(),
        lastChecked: new Date(),
        features: ['Event Tracking', 'Conversion Tracking', 'Custom Events'],
        errors: this.getFacebookPixelErrors(),
        health: this.getHealthStatus('Facebook Pixel')
      },
      {
        name: 'Google Analytics',
        isActive: googleAnalyticsManager.isActive(),
        hasConfig: !!googleAnalyticsManager.getConfig(),
        lastChecked: new Date(),
        features: ['Page Views', 'Events', 'Conversions', 'Enhanced Ecommerce'],
        errors: this.getGoogleAnalyticsErrors(),
        health: this.getHealthStatus('Google Analytics')
      },
      {
        name: 'ChatGPT AI',
        isActive: chatGPTManager.isActive(),
        hasConfig: !!chatGPTManager.getConfig(),
        lastChecked: new Date(),
        features: ['Content Optimization', 'Review Enhancement', 'SEO Improvement'],
        errors: this.getChatGPTErrors(),
        health: this.getHealthStatus('ChatGPT AI')
      },
      {
        name: 'Cloudflare CDN',
        isActive: cloudflareManager.isActive(),
        hasConfig: !!cloudflareManager.getConfig(),
        lastChecked: new Date(),
        features: ['Global CDN', 'Cache Management', 'Analytics', 'DDoS Protection'],
        errors: this.getCloudflareErrors(),
        health: this.getHealthStatus('Cloudflare CDN')
      },
      {
        name: 'AWS Amplify',
        isActive: amplifyManager.isActive(),
        hasConfig: !!amplifyManager.getConfig(),
        lastChecked: new Date(),
        features: ['Authentication', 'API Gateway', 'Hosting', 'Storage Integration'],
        errors: this.getAmplifyErrors(),
        health: this.getHealthStatus('AWS Amplify')
      },
      {
        name: 'AWS Cognito',
        isActive: cognitoManager.isActive(),
        hasConfig: !!cognitoManager.getConfig(),
        lastChecked: new Date(),
        features: ['User Management', 'Authentication', 'Authorization', 'MFA'],
        errors: this.getCognitoErrors(),
        health: this.getHealthStatus('AWS Cognito')
      },
      {
        name: 'AWS S3',
        isActive: s3Manager.isActive(),
        hasConfig: !!s3Manager.getConfig(),
        lastChecked: new Date(),
        features: ['File Storage', 'Image Hosting', 'Backup', 'CDN Integration'],
        errors: this.getS3Errors(),
        health: this.getHealthStatus('AWS S3')
      },
      {
        name: 'Amazon SES',
        isActive: sesManager.isActive(),
        hasConfig: !!sesManager.getConfig(),
        lastChecked: new Date(),
        features: ['Email Sending', 'Templates', 'Bounce Handling', 'Analytics'],
        errors: this.getSESErrors(),
        health: this.getHealthStatus('Amazon SES')
      }
    ];

    return integrations;
  }

  private getHealthStatus(integrationName: string): 'healthy' | 'warning' | 'error' {
    const errors = this.getErrorsForIntegration(integrationName);
    if (errors.length === 0) return 'healthy';
    
    const hasConfig = this.hasConfigForIntegration(integrationName);
    const isActive = this.isIntegrationActive(integrationName);
    
    if (!hasConfig || !isActive) return 'error';
    return 'warning';
  }

  private isIntegrationActive(name: string): boolean {
    switch (name) {
      case 'Facebook Pixel': return this.checkFacebookPixelStatus();
      case 'Google Analytics': return googleAnalyticsManager.isActive();
      case 'ChatGPT AI': return chatGPTManager.isActive();
      case 'Cloudflare CDN': return cloudflareManager.isActive();
      case 'AWS Amplify': return amplifyManager.isActive();
      case 'AWS Cognito': return cognitoManager.isActive();
      case 'AWS S3': return s3Manager.isActive();
      case 'Amazon SES': return sesManager.isActive();
      default: return false;
    }
  }

  private hasConfigForIntegration(name: string): boolean {
    switch (name) {
      case 'Facebook Pixel': return this.hasFacebookPixelConfig();
      case 'Google Analytics': return !!googleAnalyticsManager.getConfig();
      case 'ChatGPT AI': return !!chatGPTManager.getConfig();
      case 'Cloudflare CDN': return !!cloudflareManager.getConfig();
      case 'AWS Amplify': return !!amplifyManager.getConfig();
      case 'AWS Cognito': return !!cognitoManager.getConfig();
      case 'AWS S3': return !!s3Manager.getConfig();
      case 'Amazon SES': return !!sesManager.getConfig();
      default: return false;
    }
  }

  private getErrorsForIntegration(name: string): string[] {
    switch (name) {
      case 'Facebook Pixel': return this.getFacebookPixelErrors();
      case 'Google Analytics': return this.getGoogleAnalyticsErrors();
      case 'ChatGPT AI': return this.getChatGPTErrors();
      case 'Cloudflare CDN': return this.getCloudflareErrors();
      case 'AWS Amplify': return this.getAmplifyErrors();
      case 'AWS Cognito': return this.getCognitoErrors();
      case 'AWS S3': return this.getS3Errors();
      case 'Amazon SES': return this.getSESErrors();
      default: return [];
    }
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

  private getChatGPTErrors(): string[] {
    const errors: string[] = [];
    const config = chatGPTManager.getConfig();
    if (!config) {
      errors.push('No configuration found');
    } else {
      if (!config.apiKey) errors.push('Missing API Key');
      if (!config.isActive) errors.push('Integration disabled');
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

  private getS3Errors(): string[] {
    const errors: string[] = [];
    const config = s3Manager.getConfig();
    if (!config) {
      errors.push('No configuration found');
    } else {
      if (!config.region) errors.push('Missing region');
      if (!config.accessKeyId) errors.push('Missing access key');
      if (!config.secretAccessKey) errors.push('Missing secret key');
      if (!config.bucketName) errors.push('Missing bucket name');
    }
    return errors;
  }

  private getSESErrors(): string[] {
    const errors: string[] = [];
    const config = sesManager.getConfig();
    if (!config) {
      errors.push('No configuration found');
    } else {
      if (!config.region) errors.push('Missing region');
      if (!config.accessKeyId) errors.push('Missing access key');
      if (!config.secretAccessKey) errors.push('Missing secret key');
      if (!config.fromEmail) errors.push('Missing from email');
    }
    return errors;
  }

  // Test integration connectivity
  async testIntegration(integrationName: string): Promise<boolean> {
    try {
      switch (integrationName) {
        case 'ChatGPT AI':
          return await chatGPTManager.testConnection();
        
        case 'Cloudflare CDN':
          if (!cloudflareManager.isActive()) return false;
          // Test with a simple cache purge check
          try {
            await cloudflareManager.getZoneAnalytics();
            return true;
          } catch {
            return false;
          }
        
        case 'Facebook Pixel':
          return this.checkFacebookPixelStatus() && typeof window !== 'undefined' && !!window.fbq;
        
        case 'Google Analytics':
          return googleAnalyticsManager.isActive() && typeof window !== 'undefined' && !!window.gtag;
        
        case 'AWS Amplify':
          return await amplifyManager.testConnection();
        
        case 'AWS Cognito':
          return cognitoManager.isActive();
        
        case 'AWS S3':
          if (!s3Manager.isActive()) return false;
          try {
            await s3Manager.listFiles('', 1);
            return true;
          } catch {
            return false;
          }
        
        case 'Amazon SES':
          return sesManager.isActive();
        
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
