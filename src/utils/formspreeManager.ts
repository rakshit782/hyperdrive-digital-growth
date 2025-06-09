
export interface FormspreeConfig {
  formId: string;
  isActive: boolean;
  endpoint?: string;
}

export class FormspreeManager {
  private static instance: FormspreeManager;
  private config: FormspreeConfig | null = null;
  private isInitialized = false;

  static getInstance(): FormspreeManager {
    if (!FormspreeManager.instance) {
      FormspreeManager.instance = new FormspreeManager();
    }
    return FormspreeManager.instance;
  }

  initialize(config: FormspreeConfig): void {
    this.config = config;
    
    if (config.isActive && config.formId) {
      this.isInitialized = true;
      console.log('Formspree initialized with form ID:', config.formId);
    }
  }

  async submitForm(data: any): Promise<{ success: boolean; error?: string }> {
    if (!this.isInitialized || !this.config?.isActive) {
      return { success: false, error: 'Formspree not initialized' };
    }

    try {
      const endpoint = this.config.endpoint || `https://formspree.io/f/${this.config.formId}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        return { success: true };
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
      return { success: false, error: String(error) };
    }
  }

  getConfig(): FormspreeConfig | null {
    return this.config;
  }

  isActive(): boolean {
    return this.config?.isActive || false;
  }
}

export const formspreeManager = FormspreeManager.getInstance();
