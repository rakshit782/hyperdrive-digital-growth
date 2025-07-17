
import { facebookPixel } from './facebookPixel';
import { googleAnalyticsManager } from './googleAnalyticsManager';
import { chatGPTManager } from './chatGPTManager';
import { cloudflareManager } from './cloudflareManager';
import { auth0ConfigManager } from './auth0Config';

export interface IntegrationStatus {
  name: string;
  status: 'active' | 'inactive' | 'error' | 'connecting';
  lastCheck: string;
  lastChecked: Date;
  isActive: boolean;
  hasConfig: boolean;
  features?: string[];
  errors?: string[];
  error?: string;
  connectionHealth?: 'good' | 'poor' | 'disconnected';
}

class IntegrationManager {
  private integrations: Map<string, IntegrationStatus> = new Map();
  private initialized = false;
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private eventListeners: Map<string, Function[]> = new Map();

  async initializeAllIntegrations(): Promise<void> {
    if (this.initialized) return;
    
    console.log('Integration Manager: Initializing all integrations...');

    try {
      // Initialize all integrations with connection monitoring
      await Promise.all([
        this.initializeFacebookPixel(),
        this.initializeGoogleAnalytics(),
        this.initializeChatGPT(),
        this.initializeCloudflare(),
        this.initializeAuth0()
      ]);

      this.initialized = true;
      this.startHealthChecking();
      
      console.log('Integration Manager: All integrations initialized successfully');
      
      // Dispatch event to notify dashboard
      this.notifyIntegrationUpdate();
    } catch (error) {
      console.error('Integration Manager: Failed to initialize integrations:', error);
      this.notifyIntegrationUpdate();
    }
  }

  private startHealthChecking(): void {
    // Clear existing interval
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    // Start periodic health checks every 30 seconds
    this.healthCheckInterval = setInterval(() => {
      this.performHealthCheck();
    }, 30000);

    console.log('Integration Manager: Health checking started');
  }

  private async performHealthCheck(): Promise<void> {
    console.log('Integration Manager: Performing health check...');
    
    const integrationNames = Array.from(this.integrations.keys());
    
    for (const name of integrationNames) {
      try {
        const isHealthy = await this.testIntegration(name);
        const integration = this.integrations.get(name);
        
        if (integration) {
          integration.connectionHealth = isHealthy ? 'good' : 'poor';
          integration.lastChecked = new Date();
          integration.lastCheck = integration.lastChecked.toISOString();
          
          if (!isHealthy && integration.status === 'active') {
            integration.status = 'error';
            integration.error = 'Health check failed';
          } else if (isHealthy && integration.status === 'error') {
            integration.status = 'active';
            integration.error = undefined;
          }
          
          this.integrations.set(name, integration);
        }
      } catch (error) {
        console.error(`Integration Manager: Health check failed for ${name}:`, error);
      }
    }
    
    this.notifyIntegrationUpdate();
  }

  private async initializeFacebookPixel(): Promise<void> {
    try {
      this.setIntegrationStatus('facebook-pixel', 'connecting');
      
      // Load saved config first
      facebookPixel.loadSavedConfig();
      const config = facebookPixel.getConfig();
      
      if (config && config.pixelId && config.isActive) {
        const isWorking = await this.testIntegration('facebook-pixel');
        this.setIntegrationStatus(
          'facebook-pixel', 
          isWorking ? 'active' : 'error', 
          isWorking ? undefined : 'Connection test failed',
          ['Page View Tracking', 'Custom Events', 'Conversion API']
        );
      } else {
        this.setIntegrationStatus('facebook-pixel', 'inactive', undefined, ['Page View Tracking', 'Custom Events', 'Conversion API']);
      }
    } catch (error) {
      this.setIntegrationStatus('facebook-pixel', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async initializeGoogleAnalytics(): Promise<void> {
    try {
      this.setIntegrationStatus('google-analytics', 'connecting');
      
      const config = googleAnalyticsManager.getConfig();
      if (config && config.measurementId && config.isActive) {
        const isWorking = await this.testIntegration('google-analytics');
        this.setIntegrationStatus(
          'google-analytics', 
          isWorking ? 'active' : 'error',
          isWorking ? undefined : 'Connection test failed',
          ['Page Views', 'Events', 'Conversions']
        );
      } else {
        this.setIntegrationStatus('google-analytics', 'inactive', undefined, ['Page Views', 'Events', 'Conversions']);
      }
    } catch (error) {
      this.setIntegrationStatus('google-analytics', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async initializeChatGPT(): Promise<void> {
    try {
      this.setIntegrationStatus('chatgpt', 'connecting');
      
      const isActive = chatGPTManager.isActive();
      const isWorking = isActive ? await this.testIntegration('chatgpt') : false;
      
      this.setIntegrationStatus(
        'chatgpt', 
        isWorking ? 'active' : (isActive ? 'error' : 'inactive'),
        isWorking ? undefined : (isActive ? 'Connection test failed' : undefined),
        ['AI Chat Support', 'Content Generation']
      );
    } catch (error) {
      this.setIntegrationStatus('chatgpt', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async initializeCloudflare(): Promise<void> {
    try {
      this.setIntegrationStatus('cloudflare', 'connecting');
      
      const config = cloudflareManager.getConfig();
      if (config && config.accountId && config.apiToken) {
        const isWorking = await this.testIntegration('cloudflare');
        this.setIntegrationStatus(
          'cloudflare', 
          isWorking ? 'active' : 'error',
          isWorking ? undefined : 'Connection test failed',
          ['CDN', 'Security', 'DNS']
        );
      } else {
        this.setIntegrationStatus('cloudflare', 'inactive', undefined, ['CDN', 'Security', 'DNS']);
      }
    } catch (error) {
      this.setIntegrationStatus('cloudflare', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async initializeAuth0(): Promise<void> {
    try {
      this.setIntegrationStatus('auth0', 'connecting');
      
      const isConfigured = auth0ConfigManager.isConfigured();
      const isWorking = isConfigured ? await this.testIntegration('auth0') : false;
      
      this.setIntegrationStatus(
        'auth0', 
        isWorking ? 'active' : (isConfigured ? 'error' : 'inactive'),
        isWorking ? undefined : (isConfigured ? 'Connection test failed' : undefined),
        ['User Authentication', 'SSO', 'User Management']
      );
    } catch (error) {
      this.setIntegrationStatus('auth0', 'error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private setIntegrationStatus(name: string, status: 'active' | 'inactive' | 'error' | 'connecting', error?: string, features?: string[]): void {
    const currentTime = new Date();
    this.integrations.set(name, {
      name: this.getDisplayName(name),
      status,
      lastCheck: currentTime.toISOString(),
      lastChecked: currentTime,
      isActive: status === 'active',
      hasConfig: status !== 'inactive',
      features: features || [],
      error,
      connectionHealth: status === 'active' ? 'good' : (status === 'error' ? 'disconnected' : 'poor')
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
      console.log(`Integration Manager: Testing ${name}...`);
      
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
    const statuses = this.getAllIntegrationStatuses();
    console.log('Integration Manager: Broadcasting status update', statuses.length, 'integrations');
    
    // Trigger a custom event to notify components about integration updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('integrationStatusChanged', {
        detail: statuses
      }));
      
      // Also dispatch individual events for each integration
      statuses.forEach(integration => {
        window.dispatchEvent(new CustomEvent(`integration-${integration.name.toLowerCase().replace(' ', '-')}-updated`, {
          detail: integration
        }));
      });
    }
  }

  // Method to refresh integration status
  async refreshIntegrations(): Promise<void> {
    console.log('Integration Manager: Manual refresh triggered');
    this.initialized = false;
    this.integrations.clear();
    await this.initializeAllIntegrations();
  }

  // Event listener management
  addEventListener(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)?.push(callback);
  }

  removeEventListener(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Cleanup method
  cleanup(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
    this.eventListeners.clear();
    console.log('Integration Manager: Cleaned up');
  }
}

export const integrationManager = new IntegrationManager();

// Initialize integrations when the module is loaded (only in browser)
if (typeof window !== 'undefined') {
  integrationManager.initializeAllIntegrations().catch(console.error);
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    integrationManager.cleanup();
  });
}
