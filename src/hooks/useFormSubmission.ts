
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface ContactSubmissionData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  form_type: string;
  source?: string;
  formType?: string; // Keep for backward compatibility
}

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitForm = async (formData: ContactSubmissionData, securityData?: any) => {
    setIsSubmitting(true);
    try {
      console.log('Form submission started:', formData);

      // Log security data if provided
      if (securityData) {
        const { error: securityError } = await supabase
          .from('form_security_logs')
          .insert([{
            form_type: formData.form_type,
            honeypot_triggered: securityData.honeypot_triggered || false,
            csrf_valid: securityData.csrf_valid !== false,
            recaptcha_score: securityData.recaptcha_score || null,
            ip_address: securityData.ip_address || null,
            user_agent: securityData.user_agent || null,
            submission_data: formData
          }]);

        if (securityError) {
          console.error('Security log error:', securityError);
        }
      }

      // Submit the form data
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          form_type: formData.form_type || formData.formType || 'contact'
        }]);

      if (submitError) {
        throw submitError;
      }

      console.log('Form submission successful');
      
      toast({
        title: "Form Submitted Successfully!",
        description: "Thank you for your message. We'll get back to you soon.",
      });

      return { success: true };
    } catch (error) {
      console.error('Form submission error:', error);
      
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      });

      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting
  };
};
