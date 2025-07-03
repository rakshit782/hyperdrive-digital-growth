
import React from 'react';
import { Input } from '@/components/ui/input';
import { RecaptchaV2 } from './RecaptchaV2';
import { useFormSecurity } from '@/hooks/useFormSecurity';

interface FormSecurityFieldsProps {
  csrfToken: string;
  honeypotValue: string;
  onHoneypotChange: (value: string) => void;
  showRecaptcha?: boolean;
}

export const FormSecurityFields: React.FC<FormSecurityFieldsProps> = ({
  csrfToken,
  honeypotValue,
  onHoneypotChange,
  showRecaptcha = true
}) => {
  const { recaptchaSiteKey, isRecaptchaLoaded, resetRecaptcha } = useFormSecurity();

  const handleRecaptchaVerify = (token: string) => {
    console.log('reCAPTCHA verified:', token);
  };

  const handleRecaptchaExpire = () => {
    console.log('reCAPTCHA expired');
  };

  const handleRecaptchaError = () => {
    console.error('reCAPTCHA error occurred');
  };

  return (
    <>
      {/* CSRF Token - Hidden field */}
      <input
        type="hidden"
        name="csrfToken"
        value={csrfToken}
      />
      
      {/* Honeypot field - Hidden from users, visible to bots */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        <Input
          name="website_url" // Common field name that bots target
          value={honeypotValue}
          onChange={(e) => onHoneypotChange(e.target.value)}
          tabIndex={-1}
          autoComplete="nope"
          aria-hidden="true"
        />
      </div>
      
      {/* Additional hidden timestamp field */}
      <input
        type="hidden"
        name="formTimestamp"
        value={Date.now()}
      />

      {/* reCAPTCHA v2 Checkbox */}
      {showRecaptcha && isRecaptchaLoaded && recaptchaSiteKey && (
        <div className="my-4">
          <RecaptchaV2
            siteKey={recaptchaSiteKey}
            onVerify={handleRecaptchaVerify}
            onExpire={handleRecaptchaExpire}
            onError={handleRecaptchaError}
            theme="light"
            size="normal"
          />
        </div>
      )}
    </>
  );
};
