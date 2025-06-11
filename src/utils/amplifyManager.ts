
import { Amplify } from 'aws-amplify';

interface AmplifyConfig {
  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
  identityPoolId?: string;
  apiGatewayUrl?: string;
  s3BucketName?: string;
}

interface ValidationError {
  field: string;
  message: string;
}

class AmplifyManager {
  private isConfigured = false;
  private config: AmplifyConfig | null = null;
  private validationErrors: ValidationError[] = [];

  private validateConfig(config: AmplifyConfig): ValidationError[] {
    const errors: ValidationError[] = [];

    // Required field validation
    if (!config.region || config.region.trim() === '') {
      errors.push({ field: 'region', message: 'AWS region is required' });
    }

    if (!config.userPoolId || config.userPoolId.trim() === '') {
      errors.push({ field: 'userPoolId', message: 'User Pool ID is required' });
    }

    if (!config.userPoolWebClientId || config.userPoolWebClientId.trim() === '') {
      errors.push({ field: 'userPoolWebClientId', message: 'User Pool Web Client ID is required' });
    }

    // Format validation
    if (config.region && !/^[a-z]{2}-[a-z]+-\d{1}$/.test(config.region)) {
      errors.push({ field: 'region', message: 'Invalid AWS region format (e.g., us-east-1)' });
    }

    if (config.userPoolId && !/^[a-z]{2}-[a-z]+-\d{1}_[A-Za-z0-9]+$/.test(config.userPoolId)) {
      errors.push({ field: 'userPoolId', message: 'Invalid User Pool ID format' });
    }

    if (config.userPoolWebClientId && !/^[A-Za-z0-9]+$/.test(config.userPoolWebClientId)) {
      errors.push({ field: 'userPoolWebClientId', message: 'Invalid User Pool Web Client ID format' });
    }

    // Optional field validation
    if (config.identityPoolId && !/^[a-z]{2}-[a-z]+-\d{1}:[a-f0-9-]+$/.test(config.identityPoolId)) {
      errors.push({ field: 'identityPoolId', message: 'Invalid Identity Pool ID format' });
    }

    if (config.apiGatewayUrl && !/^https:\/\/[a-z0-9]+\.execute-api\.[a-z-]+\d\.amazonaws\.com/.test(config.apiGatewayUrl)) {
      errors.push({ field: 'apiGatewayUrl', message: 'Invalid API Gateway URL format' });
    }

    return errors;
  }

  configure(config: AmplifyConfig): { success: boolean; errors?: ValidationError[] } {
    try {
      // Validate configuration
      this.validationErrors = this.validateConfig(config);
      
      if (this.validationErrors.length > 0) {
        console.error('Amplify configuration validation errors:', this.validationErrors);
        return { success: false, errors: this.validationErrors };
      }

      const amplifyConfig: any = {
        Auth: {
          Cognito: {
            userPoolId: config.userPoolId,
            userPoolClientId: config.userPoolWebClientId,
          },
        },
      };

      // Add identity pool if provided
      if (config.identityPoolId) {
        amplifyConfig.Auth.Cognito.identityPoolId = config.identityPoolId;
      }

      // Add API Gateway configuration if provided
      if (config.apiGatewayUrl) {
        amplifyConfig.API = {
          REST: {
            [config.apiGatewayUrl]: {
              endpoint: config.apiGatewayUrl,
              region: config.region,
            },
          },
        };
      }

      // Add S3 Storage configuration if provided
      if (config.s3BucketName) {
        amplifyConfig.Storage = {
          S3: {
            bucket: config.s3BucketName,
            region: config.region,
          },
        };
      }
      
      Amplify.configure(amplifyConfig);
      
      this.isConfigured = true;
      this.config = config;
      console.log('AWS Amplify configured successfully');
      this.saveConfig(config);
      
      return { success: true };
    } catch (error) {
      console.error('Amplify configuration error:', error);
      this.isConfigured = false;
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown configuration error';
      return { 
        success: false, 
        errors: [{ field: 'general', message: errorMessage }] 
      };
    }
  }

  private saveConfig(config: AmplifyConfig) {
    try {
      // Encrypt sensitive data before storing
      const configToStore = {
        ...config,
        userPoolWebClientId: this.encrypt(config.userPoolWebClientId),
        timestamp: Date.now()
      };
      localStorage.setItem('amplify_config', JSON.stringify(configToStore));
    } catch (error) {
      console.error('Failed to save Amplify config:', error);
    }
  }

  private encrypt(data: string): string {
    // Simple encryption for localStorage (in production, use proper encryption)
    return btoa(encodeURIComponent(data));
  }

  private decrypt(data: string): string {
    try {
      return decodeURIComponent(atob(data));
    } catch {
      return data; // Fallback for unencrypted data
    }
  }

  getConfig(): AmplifyConfig | null {
    if (this.config) return this.config;

    try {
      const stored = localStorage.getItem('amplify_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Decrypt sensitive data
        if (parsed.userPoolWebClientId) {
          parsed.userPoolWebClientId = this.decrypt(parsed.userPoolWebClientId);
        }
        this.config = parsed;
        return parsed;
      }
    } catch (error) {
      console.error('Failed to load Amplify config:', error);
      localStorage.removeItem('amplify_config');
    }
    return null;
  }

  getValidationErrors(): ValidationError[] {
    return this.validationErrors;
  }

  isActive(): boolean {
    return this.isConfigured && this.config !== null;
  }

  loadSavedConfig() {
    const config = this.getConfig();
    if (config) {
      const result = this.configure(config);
      if (!result.success) {
        console.warn('Failed to load saved Amplify config:', result.errors);
      }
    }
  }

  testConnection(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.isActive()) {
        resolve(false);
        return;
      }

      try {
        // Test Amplify configuration by checking if Auth is properly configured
        const authConfig = Amplify.getConfig().Auth;
        const isValid = !!(authConfig && authConfig.Cognito && authConfig.Cognito.userPoolId);
        resolve(isValid);
      } catch (error) {
        console.error('Amplify connection test failed:', error);
        resolve(false);
      }
    });
  }

  clearConfig() {
    this.config = null;
    this.isConfigured = false;
    this.validationErrors = [];
    localStorage.removeItem('amplify_config');
    console.log('Amplify configuration cleared');
  }

  getHealthStatus(): { status: 'healthy' | 'warning' | 'error'; issues: string[] } {
    const issues: string[] = [];
    
    if (!this.isConfigured) {
      return { status: 'error', issues: ['Amplify not configured'] };
    }

    if (this.validationErrors.length > 0) {
      issues.push(...this.validationErrors.map(e => `${e.field}: ${e.message}`));
    }

    if (!this.config) {
      issues.push('Configuration not loaded');
    }

    if (issues.length === 0) {
      return { status: 'healthy', issues: [] };
    } else if (this.isConfigured) {
      return { status: 'warning', issues };
    } else {
      return { status: 'error', issues };
    }
  }
}

export const amplifyManager = new AmplifyManager();
