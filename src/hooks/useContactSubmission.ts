
import { useState } from 'react';
import { localDB } from '@/utils/localStorageDB';

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

      const contactId = await localDB.insert('contact_submissions', contactData);
      console.log('Contact submission stored successfully with ID:', contactId);

      return { success: true, contactId };
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
