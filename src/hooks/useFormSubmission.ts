
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
}

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitForm = async (formData: ContactSubmissionData) => {
    setIsSubmitting(true);
    try {
      console.log('Form submission started:', formData);

      // Submit the form data directly to contact_submissions
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          form_type: formData.form_type
        });

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
