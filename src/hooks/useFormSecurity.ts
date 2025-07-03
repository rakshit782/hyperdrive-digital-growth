
import { useState, useEffect } from 'react';
import { databaseService } from '@/services/databaseService';

export interface FormSecurityData {
  recaptchaToken: string;
  csrfToken: string;
  timestamp: number;
  userAgent: string;
  fingerprint: string;
}

export interface SecurityValidationResult {
  isValid: boolean;
  recaptchaScore?: number;
  honeypotTriggered: boolean;
  csrfValid: boolean;
  errors: string[];
}

export const useFormSecurity = () => {
  const [csrfToken, setCsrfToken] = useState<string>('');
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

  // Generate CSRF token
  useEffect(() => {
    const token = btoa(crypto.getRandomValues(new Uint8Array(32)).join(''));
    setCsrfToken(token);
    sessionStorage.setItem('csrf_token', token);
  }, []);

  // Load reCAPTCHA v2
  useEffect(() => {
    if (!recaptchaSiteKey) return;

    const loadRecaptcha = () => {
      // Check if already loaded
      if (window.grecaptcha && window.grecaptcha.render) {
        console.log('reCAPTCHA already loaded');
        setIsRecaptchaLoaded(true);
        setRecaptchaError(null);
        return;
      }

      console.log('Loading reCAPTCHA v2...');
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('reCAPTCHA v2 script loaded');
        // Wait a bit for grecaptcha to be fully initialized
        const checkReady = () => {
          if (window.grecaptcha && window.grecaptcha.render) {
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

  const generateFingerprint = (): string => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Browser fingerprint', 2, 2);
      }
      
      const fingerprint = btoa(JSON.stringify({
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack,
        canvas: canvas.toDataURL(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: `${screen.width}x${screen.height}`,
      }));

      return fingerprint;
    } catch (error) {
      console.error('Error generating fingerprint:', error);
      return btoa('fallback-fingerprint');
    }
  };

  const getRecaptchaToken = async (): Promise<string> => {
    if (!isRecaptchaLoaded || !window.grecaptcha || !recaptchaSiteKey) {
      throw new Error('reCAPTCHA not loaded or configured');
    }

    return new Promise((resolve, reject) => {
      const response = window.grecaptcha.getResponse();
      if (response) {
        console.log('reCAPTCHA token retrieved successfully');
        resolve(response);
      } else {
        reject(new Error('Please complete the reCAPTCHA verification'));
      }
    });
  };

  const resetRecaptcha = () => {
    if (window.grecaptcha) {
      window.grecaptcha.reset();
    }
  };

  const validateSecurity = async (
    formData: Record<string, any>,
    formType: string,
    honeypotValue: string = ''
  ): Promise<SecurityValidationResult> => {
    const errors: string[] = [];
    let recaptchaScore = 0;
    const honeypotTriggered = honeypotValue.trim() !== '';
    const storedCsrfToken = sessionStorage.getItem('csrf_token');
    const csrfValid = formData.csrfToken === storedCsrfToken;

    console.log('Validating security:', {
      honeypotTriggered,
      csrfValid,
      formType,
      isRecaptchaLoaded,
      hasRecaptchaKey: !!recaptchaSiteKey
    });

    // Validate CSRF
    if (!csrfValid) {
      errors.push('Invalid CSRF token');
    }

    // Check honeypot
    if (honeypotTriggered) {
      errors.push('Honeypot triggered - potential spam');
    }

    // Validate reCAPTCHA v2
    try {
      if (isRecaptchaLoaded && recaptchaSiteKey) {
        const recaptchaToken = await getRecaptchaToken();
        console.log('reCAPTCHA token retrieved:', recaptchaToken.substring(0, 20) + '...');
        
        // For now, we'll simulate validation since we can't verify server-side
        // In production, you should verify this token on your backend
        recaptchaScore = 0.8;
        
        if (!recaptchaToken) {
          errors.push('Please complete the reCAPTCHA verification');
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
      errors.push('Please complete the reCAPTCHA verification');
    }

    // Log security event using database service
    try {
      await databaseService.insertSecurityLog({
        form_type: formType,
        recaptcha_score: recaptchaScore,
        honeypot_triggered: honeypotTriggered,
        csrf_valid: csrfValid,
        submission_data: formData,
        user_agent: navigator.userAgent,
        ip_address: null // IP address should be captured on backend
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }

    return {
      isValid: errors.length === 0,
      recaptchaScore,
      honeypotTriggered,
      csrfValid,
      errors
    };
  };

  const getSecurityData = async (): Promise<FormSecurityData> => {
    const recaptchaToken = await getRecaptchaToken();
    
    return {
      recaptchaToken,
      csrfToken,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      fingerprint: generateFingerprint()
    };
  };

  return {
    csrfToken,
    isRecaptchaLoaded: isRecaptchaLoaded && !!recaptchaSiteKey,
    recaptchaError,
    recaptchaSiteKey,
    validateSecurity,
    getSecurityData,
    generateFingerprint,
    resetRecaptcha
  };
};

// Global type declaration for reCAPTCHA v2
declare global {
  interface Window {
    grecaptcha: {
      render: (element: string | HTMLElement, options: any) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
  }
}
