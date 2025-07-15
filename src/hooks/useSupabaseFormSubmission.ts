
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FormSubmissionData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  formType: string;
  message?: string;
  firstName?: string;
  lastName?: string;
  businessGoals?: string;
  website?: string;
  monthlyAdSpend?: string;
  primaryPlatform?: string;
  currentChallenges?: string;
  uploadedFiles?: Record<string, any>;
}

interface FormSubmissionResult {
  success: boolean;
  error?: string;
  data?: any;
}

export const useSupabaseFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitForm = async (formData: FormSubmissionData): Promise<FormSubmissionResult> => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data:', formData);

      // Generate a unique lead number
      const leadNumber = `LEAD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Prepare lead data
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        source: 'website',
        status: 'new',
        lead_number: leadNumber,
        audit_type: formData.formType === 'free_audit' ? 'free_audit' : null,
        website_url: formData.website || null,
        current_spend: formData.monthlyAdSpend || null,
        goals: formData.businessGoals || null,
        lead_data: {
          formType: formData.formType,
          firstName: formData.firstName,
          lastName: formData.lastName,
          businessGoals: formData.businessGoals,
          primaryPlatform: formData.primaryPlatform,
          currentChallenges: formData.currentChallenges,
          uploadedFiles: formData.uploadedFiles,
          submissionTime: new Date().toISOString(),
          userAgent: navigator.userAgent,
          pageUrl: window.location.href
        }
      };

      console.log('Lead data to insert:', leadData);

      // Insert into leads table
      const { data: leadResult, error: leadError } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single();

      if (leadError) {
        console.error('Lead insertion error:', leadError);
        throw new Error(`Failed to create lead: ${leadError.message}`);
      }

      console.log('Lead created successfully:', leadResult);

      // Also insert into contact_submissions for backward compatibility
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        message: formData.message || `${formData.formType} form submission`,
        form_type: formData.formType
      };

      const { error: contactError } = await supabase
        .from('contact_submissions')
        .insert([contactData]);

      if (contactError) {
        console.warn('Contact submission error (non-fatal):', contactError);
      }

      toast({
        title: "Form Submitted Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      return {
        success: true,
        data: leadResult
      };

    } catch (error) {
      console.error('Form submission error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });

      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting
  };
};
