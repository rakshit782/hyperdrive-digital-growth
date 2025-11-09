
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ContactSubmissionData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  formType?: string;
}

export const useContactSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitContact = async (data: ContactSubmissionData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting contact with data:', data);

      const contactData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: data.message || null,
        form_type: data.formType || 'contact'
      };

      // Store in Neon database via edge function
      const { data: result, error } = await supabase.functions.invoke('neon-contact-submission', {
        body: contactData
      });

      if (error) {
        console.error('Failed to store contact submission:', error);
        return { success: false, error: 'Failed to store contact submission' };
      }

      console.log('Contact submission stored successfully');

      // Send email notification
      try {
        const { error: emailError } = await supabase.functions.invoke('send-contact-notification', {
          body: data
        });
        
        if (emailError) {
          console.error('Failed to send email notification:', emailError);
        }
      } catch (emailErr) {
        console.error('Email notification error:', emailErr);
      }

      return { success: true, contactId: result?.id };
    } catch (error) {
      console.error('Contact submission error:', error);
      return { success: false, error: 'Failed to store contact submission' };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitContact,
    isSubmitting
  };
};
