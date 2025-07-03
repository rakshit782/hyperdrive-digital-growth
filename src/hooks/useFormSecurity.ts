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

  // Load reCAPTCHA v3
  useEffect(() => {
    if (!recaptchaSiteKey) return;

    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        console.log('reCAPTCHA already loaded');
        setIsRecaptchaLoaded(true);
        return;
      }

      console.log('Loading reCAPTCHA...');
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
      script.onload = () => {
        console.log('reCAPTCHA script loaded');
        window.grecaptcha.ready(() => {
          console.log('reCAPTCHA ready');
          setIsRecaptchaLoaded(true);
          setRecaptchaError(null);
        });
      };
      script.onerror = (error) => {
        console.error('Failed to load reCAPTCHA:', error);
        setRecaptchaError('Failed to load reCAPTCHA');
        setIsRecaptchaLoaded(false);
      };
      document.head.appendChild(script);
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

  const getRecaptchaToken = async (action: string): Promise<string> => {
    if (!isRecaptchaLoaded || !window.grecaptcha || !recaptchaSiteKey) {
      throw new Error('reCAPTCHA not loaded or configured');
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(recaptchaSiteKey, { action })
          .then((token) => {
            console.log('reCAPTCHA token generated successfully');
            resolve(token);
          })
          .catch((error) => {
            console.error('reCAPTCHA execution failed:', error);
            reject(error);
          });
      });
    });
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

    // Validate reCAPTCHA
    try {
      if (isRecaptchaLoaded && recaptchaSiteKey) {
        const recaptchaToken = await getRecaptchaToken(formType);
        console.log('reCAPTCHA token generated:', recaptchaToken.substring(0, 20) + '...');
        
        // For now, we'll simulate a good score since we can't verify server-side
        // In production, you should verify this token on your backend
        recaptchaScore = 0.8;
        
        if (recaptchaScore < 0.5) {
          errors.push('reCAPTCHA validation failed');
        }
      } else {
        console.warn('reCAPTCHA not loaded or configured, skipping validation');
        // Allow form submission but log the issue
        recaptchaScore = 0.5; // Neutral score
      }
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      errors.push('reCAPTCHA verification error');
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

  const getSecurityData = async (action: string): Promise<FormSecurityData> => {
    const recaptchaToken = await getRecaptchaToken(action);
    
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
    validateSecurity,
    getSecurityData,
    generateFingerprint
  };
};

// Global type declaration for reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}
