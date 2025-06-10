
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
      Amplify.configure({
        Auth: {
          Cognito: {
            region: config.region,
            userPoolId: config.userPoolId,
            userPoolClientId: config.userPoolWebClientId,
            identityPoolId: config.identityPoolId,
          },
        },
        API: {
          REST: config.apiGatewayUrl ? {
            endpoint: config.apiGatewayUrl,
            region: config.region,
          } : undefined,
        },
        Storage: {
          S3: config.s3BucketName ? {
            bucket: config.s3BucketName,
            region: config.region,
          } : undefined,
        },
      });
      
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
