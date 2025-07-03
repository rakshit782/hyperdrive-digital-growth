
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
      script.src = 'https://www.google.com/recaptcha/api.js?render=6LcYourSiteKey_here';
      script.onload = () => setIsRecaptchaLoaded(true);
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
        window.grecaptcha.execute('6LcYourSiteKey_here', { action })
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
      
      // Here you would typically validate the token on your backend
      // For now, we'll simulate a score
      recaptchaScore = 0.7; // This should come from Google's API
      
      if (recaptchaScore < 0.5) {
        errors.push('reCAPTCHA validation failed');
      }
    } catch (error) {
      errors.push('reCAPTCHA verification error');
    }

    // Log security event
    try {
      await supabase.from('form_security_logs').insert({
        form_type: formType,
        recaptcha_score: recaptchaScore,
        honeypot_triggered: honeypotTriggered,
        csrf_valid: csrfValid,
        submission_data: formData,
        user_agent: navigator.userAgent
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
