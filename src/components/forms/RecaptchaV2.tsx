
import React, { useEffect, useRef } from 'react';

interface RecaptchaV2Props {
  siteKey: string;
  onVerify?: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
}

export const RecaptchaV2: React.FC<RecaptchaV2Props> = ({
  siteKey,
  onVerify,
  onExpire,
  onError,
  theme = 'light',
  size = 'normal'
}) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!siteKey || !recaptchaRef.current) return;

    const renderRecaptcha = () => {
      if (recaptchaRef.current && window.grecaptcha && window.grecaptcha.render) {
        try {
          // Clear any existing widget
          if (widgetIdRef.current !== null) {
            return;
          }

          widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            theme,
            size,
            callback: onVerify,
            'expired-callback': onExpire,
            'error-callback': onError
          });
          
          console.log('reCAPTCHA widget rendered successfully');
        } catch (error) {
          console.error('Error rendering reCAPTCHA:', error);
        }
      }
    };

    // Check if grecaptcha is ready
    if (window.grecaptcha && window.grecaptcha.render) {
      renderRecaptcha();
    } else {
      // Wait for grecaptcha to be ready
      const checkReady = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
          renderRecaptcha();
          clearInterval(checkReady);
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkReady), 10000);

      return () => clearInterval(checkReady);
    }

    // Cleanup function
    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (error) {
          console.error('Error resetting reCAPTCHA:', error);
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, theme, size, onVerify, onExpire, onError]);

  return <div ref={recaptchaRef} className="flex justify-center my-4" />;
};
