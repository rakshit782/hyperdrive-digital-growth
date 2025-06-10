
import { Amplify } from 'aws-amplify';

interface AmplifyConfig {
  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
  identityPoolId?: string;
  apiGatewayUrl?: string;
  s3BucketName?: string;
}

class AmplifyManager {
  private isConfigured = false;

  configure(config: AmplifyConfig) {
    try {
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
      console.log('AWS Amplify configured successfully');
      this.saveConfig(config);
    } catch (error) {
      console.error('Amplify configuration error:', error);
    }
  }

  private saveConfig(config: AmplifyConfig) {
    localStorage.setItem('amplify_config', JSON.stringify(config));
  }

  getConfig(): AmplifyConfig | null {
    const stored = localStorage.getItem('amplify_config');
    return stored ? JSON.parse(stored) : null;
  }

  isActive(): boolean {
    return this.isConfigured;
  }

  loadSavedConfig() {
    const config = this.getConfig();
    if (config) {
      this.configure(config);
    }
  }
}

export const amplifyManager = new AmplifyManager();
