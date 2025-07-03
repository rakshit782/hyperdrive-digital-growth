
import React from 'react';
import { Input } from '@/components/ui/input';

interface FormSecurityFieldsProps {
  csrfToken: string;
  honeypotValue: string;
  onHoneypotChange: (value: string) => void;
}

export const FormSecurityFields: React.FC<FormSecurityFieldsProps> = ({
  csrfToken,
  honeypotValue,
  onHoneypotChange
}) => {
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
    </>
  );
};
