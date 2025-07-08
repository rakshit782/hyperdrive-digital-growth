
import { useState, useEffect } from 'react';
import { databaseService } from '@/services/databaseService';

export interface FormSecurityData {
  recaptchaToken: string;
  timestamp: number;
  userAgent: string;
}

export interface SecurityValidationResult {
  isValid: boolean;
  recaptchaScore?: number;
  errors: string[];
}

export const useFormSecurity = () => {
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [recaptchaSiteKey, setRecaptchaSiteKey] = useState<string>('');

  // Load reCAPTCHA site key from settings
  useEffect(() => {
    const loadRecaptchaKey = async () => {
      try {
        const settings = await databaseService.getWebsiteSettings();
        const recaptchaKey = settings.find(s => s.setting_key === 'recaptcha_site_key')?.setting_value as string;
        
        if (recaptchaKey) {
          setRecaptchaSiteKey(recaptchaKey);
        } else {
          console.warn('reCAPTCHA site key not found in settings. Please configure it in the dashboard.');
          setRecaptchaError('reCAPTCHA not configured');
        }
      } catch (error) {
        console.error('Failed to load reCAPTCHA key:', error);
        setRecaptchaError('Failed to load reCAPTCHA configuration');
      }
    };

    loadRecaptchaKey();
  }, []);

  // Load reCAPTCHA v2 invisible
  useEffect(() => {
    if (!recaptchaSiteKey) return;

    const loadRecaptcha = () => {
      // Check if already loaded
      if (window.grecaptcha && window.grecaptcha.execute) {
        console.log('reCAPTCHA already loaded');
        setIsRecaptchaLoaded(true);
        setRecaptchaError(null);
        return;
      }

      console.log('Loading reCAPTCHA v2 invisible...');
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('reCAPTCHA v2 script loaded');
        // Wait a bit for grecaptcha to be fully initialized
        const checkReady = () => {
          if (window.grecaptcha && window.grecaptcha.execute) {
            setIsRecaptchaLoaded(true);
            setRecaptchaError(null);
          } else {
            setTimeout(checkReady, 100);
          }
        };
        checkReady();
      };
      
      script.onerror = (error) => {
        console.error('Failed to load reCAPTCHA:', error);
        setRecaptchaError('Failed to load reCAPTCHA');
        setIsRecaptchaLoaded(false);
      };
      
      // Only add script if not already present
      if (!document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]')) {
        document.head.appendChild(script);
      }
    };

    loadRecaptcha();
  }, [recaptchaSiteKey]);

  const executeInvisibleRecaptcha = async (action: string = 'submit'): Promise<string> => {
    if (!isRecaptchaLoaded || !window.grecaptcha || !recaptchaSiteKey) {
      throw new Error('reCAPTCHA not loaded or configured');
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.execute(recaptchaSiteKey, { action }).then((token: string) => {
        console.log('Invisible reCAPTCHA token retrieved successfully');
        resolve(token);
      }).catch((error: any) => {
        reject(new Error('Failed to execute invisible reCAPTCHA'));
      });
    });
  };

  const validateInvisibleRecaptcha = async (
    formData: Record<string, any>,
    formType: string
  ): Promise<SecurityValidationResult> => {
    const errors: string[] = [];

    console.log('Validating invisible reCAPTCHA for:', formType);

    try {
      if (isRecaptchaLoaded && recaptchaSiteKey) {
        const recaptchaToken = await executeInvisibleRecaptcha(formType);
        console.log('Invisible reCAPTCHA token retrieved:', recaptchaToken.substring(0, 20) + '...');
        
        // For now, we'll simulate validation since we can't verify server-side
        // In production, you should verify this token on your backend
        
        if (!recaptchaToken) {
          errors.push('reCAPTCHA verification failed');
        }
      } else if (recaptchaSiteKey) {
        // reCAPTCHA is configured but not loaded yet
        errors.push('Security check is loading, please wait and try again');
      } else {
        console.warn('reCAPTCHA not configured, skipping validation');
        // Don't add error if reCAPTCHA is not configured
      }
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      errors.push('reCAPTCHA verification failed');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  return {
    isRecaptchaLoaded: isRecaptchaLoaded && !!recaptchaSiteKey,
    recaptchaError,
    recaptchaSiteKey,
    executeInvisibleRecaptcha,
    validateInvisibleRecaptcha
  };
};

// Global type declaration for reCAPTCHA v2 invisible
declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options?: { action?: string }) => Promise<string>;
    };
  }
}
