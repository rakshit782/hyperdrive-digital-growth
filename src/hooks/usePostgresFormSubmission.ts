
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FormSubmissionData {
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  company?: string;
  website?: string;
  monthlyAdSpend?: string;
  primaryPlatform?: string;
  businessGoals?: string;
  currentChallenges?: string;
  source?: string;
  formType: string;
  [key: string]: any;
}

export const usePostgresFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (data: FormSubmissionData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data to PostgreSQL:', data);
      
      // Prepare lead data for the leads table
      const leadData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        source: data.source || 'free_audit_form',
        status: 'new' as const,
        notes: `Form Type: ${data.formType}`,
        form_security: {},
        lead_data: {
          firstName: data.firstName,
          lastName: data.lastName,
          website: data.website,
          monthlyAdSpend: data.monthlyAdSpend,
          primaryPlatform: data.primaryPlatform,
          businessGoals: data.businessGoals,
          currentChallenges: data.currentChallenges,
          formType: data.formType,
          submittedAt: new Date().toISOString()
        }
      };

      // Insert into leads table
      const { data: leadResult, error: leadError } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single();

      if (leadError) {
        console.error('Lead insertion error:', leadError);
        throw new Error(`Failed to save lead: ${leadError.message}`);
      }

      console.log('Lead saved successfully:', leadResult);

      // Also save to contact_submissions for backward compatibility
      const contactData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        message: data.businessGoals || null,
        form_type: data.formType
      };

      const { error: contactError } = await supabase
        .from('contact_submissions')
        .insert([contactData]);

      if (contactError) {
        console.warn('Contact submission warning:', contactError);
      }

      return { success: true, leadId: leadResult.id };
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Submission failed';
      
      toast.error('Submission Failed', {
        description: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting };
};
