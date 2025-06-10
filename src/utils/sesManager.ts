
import { SESClient, SendEmailCommand, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';

interface SESConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  fromEmail: string;
}

class SESManager {
  private client: SESClient | null = null;
  private fromEmail: string = '';
  private isConfigured = false;

  configure(config: SESConfig) {
    try {
      this.client = new SESClient({
        region: config.region,
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
          sessionToken: config.sessionToken,
        },
      });

      this.fromEmail = config.fromEmail;
      this.isConfigured = true;
      console.log('SES configured successfully');
      this.saveConfig(config);
    } catch (error) {
      console.error('SES configuration error:', error);
    }
  }

  private saveConfig(config: SESConfig) {
    localStorage.setItem('ses_config', JSON.stringify(config));
  }

  getConfig(): SESConfig | null {
    const stored = localStorage.getItem('ses_config');
    return stored ? JSON.parse(stored) : null;
  }

  isActive(): boolean {
    return this.isConfigured && this.client !== null;
  }

  loadSavedConfig() {
    const config = this.getConfig();
    if (config) {
      this.configure(config);
    }
  }

  async sendEmail(to: string[], subject: string, htmlBody: string, textBody?: string) {
    if (!this.client) {
      throw new Error('SES not configured');
    }

    const command = new SendEmailCommand({
      Source: this.fromEmail,
      Destination: {
        ToAddresses: to,
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: 'UTF-8',
          },
          Text: textBody ? {
            Data: textBody,
            Charset: 'UTF-8',
          } : undefined,
        },
      },
    });

    return await this.client.send(command);
  }

  async sendTemplatedEmail(to: string[], templateName: string, templateData: Record<string, any>) {
    if (!this.client) {
      throw new Error('SES not configured');
    }

    const command = new SendTemplatedEmailCommand({
      Source: this.fromEmail,
      Destination: {
        ToAddresses: to,
      },
      Template: templateName,
      TemplateData: JSON.stringify(templateData),
    });

    return await this.client.send(command);
  }
}

export const sesManager = new SESManager();
