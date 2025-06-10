
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

interface CognitoConfig {
  userPoolId: string;
  clientId: string;
  region: string;
}

class CognitoManager {
  private userPool: CognitoUserPool | null = null;
  private isConfigured = false;

  configure(config: CognitoConfig) {
    try {
      this.userPool = new CognitoUserPool({
        UserPoolId: config.userPoolId,
        ClientId: config.clientId,
      });
      
      this.isConfigured = true;
      console.log('Amazon Cognito configured successfully');
      this.saveConfig(config);
    } catch (error) {
      console.error('Cognito configuration error:', error);
    }
  }

  private saveConfig(config: CognitoConfig) {
    localStorage.setItem('cognito_config', JSON.stringify(config));
  }

  getConfig(): CognitoConfig | null {
    const stored = localStorage.getItem('cognito_config');
    return stored ? JSON.parse(stored) : null;
  }

  isActive(): boolean {
    return this.isConfigured && this.userPool !== null;
  }

  loadSavedConfig() {
    const config = this.getConfig();
    if (config) {
      this.configure(config);
    }
  }

  signUp(email: string, password: string, attributes: Record<string, string> = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.userPool) {
        reject(new Error('Cognito not configured'));
        return;
      }

      const attributeList = Object.entries(attributes).map(([key, value]) => 
        new CognitoUserAttribute({ Name: key, Value: value })
      );

      this.userPool.signUp(email, password, attributeList, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  signIn(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.userPool) {
        reject(new Error('Cognito not configured'));
        return;
      }

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  getCurrentUser(): CognitoUser | null {
    if (!this.userPool) return null;
    return this.userPool.getCurrentUser();
  }

  signOut() {
    const user = this.getCurrentUser();
    if (user) {
      user.signOut();
    }
  }
}

export const cognitoManager = new CognitoManager();
