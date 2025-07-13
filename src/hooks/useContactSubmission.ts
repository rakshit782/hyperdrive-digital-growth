
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ContactSubmissionData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  form_type?: string;
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
        form_type: data.form_type || 'contact'
      };

      const { data: result, error } = await supabase
        .from('contact_submissions')
        .insert([contactData])
        .select()
        .single();

      if (error) throw error;

      console.log('Contact submission stored successfully with ID:', result.id);

      return { success: true, contactId: result.id };
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
