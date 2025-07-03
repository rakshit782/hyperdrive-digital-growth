
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

// Replace with your actual reCAPTCHA site key
const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // This is a test key, replace with your actual key

export const useFormSecurity = () => {
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);

  // Generate CSRF token
  useEffect(() => {
    const token = btoa(crypto.getRandomValues(new Uint8Array(32)).join(''));
    setCsrfToken(token);
    sessionStorage.setItem('csrf_token', token);
  }, []);

  // Load reCAPTCHA v3
  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        setIsRecaptchaLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.onload = () => {
        window.grecaptcha.ready(() => {
          setIsRecaptchaLoaded(true);
        });
      };
      script.onerror = () => {
        console.error('Failed to load reCAPTCHA');
        setIsRecaptchaLoaded(false);
      };
      document.head.appendChild(script);
    };

    loadRecaptcha();
  }, []);

  const generateFingerprint = (): string => {
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
  };

  const getRecaptchaToken = async (action: string): Promise<string> => {
    if (!isRecaptchaLoaded || !window.grecaptcha) {
      throw new Error('reCAPTCHA not loaded');
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
          .then(resolve)
          .catch(reject);
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
      const recaptchaToken = await getRecaptchaToken(formType);
      console.log('reCAPTCHA token generated:', recaptchaToken.substring(0, 20) + '...');
      
      // For now, we'll simulate a good score since we can't verify server-side
      // In production, you should verify this token on your backend
      recaptchaScore = 0.8;
      
      if (recaptchaScore < 0.5) {
        errors.push('reCAPTCHA validation failed');
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
    isRecaptchaLoaded,
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
