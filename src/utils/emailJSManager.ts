
import emailjs from '@emailjs/browser';

export interface EmailJSConfig {
  publicKey: string;
  serviceId: string;
  templateId: string;
  isActive: boolean;
}

export class EmailJSManager {
  private static instance: EmailJSManager;
  private config: EmailJSConfig | null = null;
  private isInitialized = false;

  static getInstance(): EmailJSManager {
    if (!EmailJSManager.instance) {
      EmailJSManager.instance = new EmailJSManager();
    }
    return EmailJSManager.instance;
  }

  initialize(config: EmailJSConfig): void {
    if (this.isInitialized && this.config?.publicKey === config.publicKey) {
      return;
    }

    this.config = config;
    
    if (config.isActive && config.publicKey) {
      emailjs.init(config.publicKey);
      this.isInitialized = true;
      console.log('EmailJS initialized with public key:', config.publicKey);
    }
  }

  async sendEmail(templateParams: any): Promise<{ success: boolean; error?: string }> {
    if (!this.isInitialized || !this.config?.isActive) {
      return { success: false, error: 'EmailJS not initialized' };
    }

    try {
      const result = await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        templateParams
      );
      console.log('Email sent successfully:', result);
      return { success: true };
    } catch (error) {
      console.error('Failed to send email:', error);
      return { success: false, error: String(error) };
    }
  }

  getConfig(): EmailJSConfig | null {
    return this.config;
  }

  isActive(): boolean {
    return this.config?.isActive || false;
  }
}

export const emailJSManager = EmailJSManager.getInstance();
