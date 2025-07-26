
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { FormSecurityFields } from './FormSecurityFields';

interface SecureFormProps {
  children: React.ReactNode;
  onSubmit: (data: any, securityData: SecurityData) => Promise<void>;
  className?: string;
  requireAuth?: boolean;
  enableRecaptcha?: boolean;
}

interface SecurityData {
  csrfToken: string;
  honeypotValue: string;
  timestamp: number;
  userAgent: string;
  formSignature: string;
}

export const SecureForm = ({
  children,
  onSubmit,
  className = '',
  requireAuth = false,
  enableRecaptcha = true
}: SecureFormProps) => {
  const [csrfToken, setCsrfToken] = useState('');
  const [honeypotValue, setHoneypotValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, logSecurityEvent } = useAuth();

  // Generate CSRF token on component mount
  useEffect(() => {
    const token = generateCSRFToken();
    setCsrfToken(token);
  }, []);

  const generateCSRFToken = (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const generateFormSignature = (formData: FormData): string => {
    const dataString = Array.from(formData.entries())
      .filter(([key]) => !['csrfToken', 'formTimestamp'].includes(key))
      .map(([key, value]) => `${key}:${value}`)
      .join('|');
    
    return btoa(dataString + Date.now());
  };

  const validateSecurity = async (formData: FormData): Promise<{ isValid: boolean; errors: string[] }> => {
    const errors: string[] = [];

    // Check CSRF token
    const submittedToken = formData.get('csrfToken') as string;
    if (!submittedToken || submittedToken !== csrfToken) {
      errors.push('Invalid security token');
      await logSecurityEvent('csrf_token_mismatch', { 
        submitted: submittedToken?.substring(0, 10),
        expected: csrfToken.substring(0, 10)
      });
    }

    // Check honeypot
    if (honeypotValue.length > 0) {
      errors.push('Bot detected');
      await logSecurityEvent('honeypot_triggered', { value: honeypotValue });
    }

    // Check form submission timing (prevent too fast submissions)
    const timestamp = parseInt(formData.get('formTimestamp') as string);
    const submissionTime = Date.now() - timestamp;
    if (submissionTime < 2000) { // Minimum 2 seconds
      errors.push('Submission too fast');
      await logSecurityEvent('fast_submission', { time: submissionTime });
    }

    // Check required authentication
    if (requireAuth && !user) {
      errors.push('Authentication required');
      await logSecurityEvent('unauthenticated_submission', {});
    }

    return { isValid: errors.length === 0, errors };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Validate security
      const { isValid, errors } = await validateSecurity(formData);
      
      if (!isValid) {
        console.error('Security validation failed:', errors);
        await logSecurityEvent('security_validation_failed', { errors });
        return;
      }

      // Prepare security data
      const securityData: SecurityData = {
        csrfToken,
        honeypotValue,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        formSignature: generateFormSignature(formData)
      };

      // Convert FormData to regular object
      const formObject: any = {};
      formData.forEach((value, key) => {
        if (!['csrfToken', 'formTimestamp', 'website_url'].includes(key)) {
          formObject[key] = value;
        }
      });

      await onSubmit(formObject, securityData);
      
      // Log successful submission
      await logSecurityEvent('form_submission_success', { 
        formType: 'secure_form',
        hasAuth: !!user 
      });

    } catch (error) {
      console.error('Form submission error:', error);
      await logSecurityEvent('form_submission_error', { 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <FormSecurityFields
        csrfToken={csrfToken}
        honeypotValue={honeypotValue}
        onHoneypotChange={setHoneypotValue}
        showRecaptcha={enableRecaptcha}
      />
      {children}
    </form>
  );
};

export default SecureForm;
