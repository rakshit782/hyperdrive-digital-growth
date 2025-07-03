
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useZapierIntegration } from './useZapierIntegration';
import { useZeptoMailAutomation } from './useZeptoMailAutomation';

export interface FormSubmissionData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  source?: string;
  formType?: 'contact' | 'free_audit' | 'newsletter';
  firstName?: string;
  lastName?: string;
  businessGoals?: string;
}

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { triggerZapierWebhook, getStoredWebhookUrls } = useZapierIntegration();
  const { triggerAutomatedEmails } = useZeptoMailAutomation();

  const submitForm = async (data: FormSubmissionData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare the full name from firstName and lastName if available
      const fullName = data.firstName && data.lastName 
        ? `${data.firstName} ${data.lastName}` 
        : data.name || '';

      // First, create a lead in the leads table
      const leadData = {
        name: fullName,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        source: data.source || 'website',
        status: 'new' as const,
        notes: data.message || data.businessGoals || null,
        lead_data: {
          formType: data.formType || 'contact',
          firstName: data.firstName,
          lastName: data.lastName,
          businessGoals: data.businessGoals,
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
          pageUrl: window.location.href,
          referrer: document.referrer
        }
      };

      console.log('Creating lead with data:', leadData);

      // Insert lead without RLS check - using service role for form submissions
      const { data: leadResult, error: leadError } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single();

      if (leadError) {
        console.error('Error creating lead:', leadError);
        // Try to create contact submission as fallback
        const contactData = {
          name: fullName,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
          message: data.message || data.businessGoals || null,
          form_type: data.formType || 'contact'
        };

        const { data: contactResult, error: contactError } = await supabase
          .from('contact_submissions')
          .insert([contactData])
          .select()
          .single();

        if (contactError) {
          console.error('Error creating contact submission:', contactError);
          throw contactError;
        }

        console.log('Contact submission created as fallback:', contactResult);
      } else {
        console.log('Lead created successfully:', leadResult);
        
        // Also store in contact_submissions for backward compatibility
        const contactData = {
          name: fullName,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
          message: data.message || data.businessGoals || null,
          form_type: data.formType || 'contact'
        };

        const { error: contactError } = await supabase
          .from('contact_submissions')
          .insert([contactData]);

        if (contactError) {
          console.error('Error creating contact submission:', contactError);
          // Don't throw error as lead was created successfully
        }
      }

      // Trigger Zapier webhooks
      try {
        const webhooks = getStoredWebhookUrls();
        const formTypeWebhook = webhooks[data.formType || 'contact'];
        const generalWebhook = webhooks['new_lead'];

        if (formTypeWebhook || generalWebhook) {
          const zapierData = {
            leadId: leadResult?.id || 'contact-form',
            name: fullName,
            email: data.email,
            phone: data.phone,
            company: data.company,
            source: data.source || 'website',
            formType: data.formType || 'contact',
            message: data.message,
            businessGoals: data.businessGoals,
            timestamp: new Date().toISOString()
          };

          // Try form-specific webhook first, then general webhook
          const webhookUrl = formTypeWebhook || generalWebhook;
          await triggerZapierWebhook(webhookUrl, zapierData);
        }
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
        // Don't fail the entire submission if webhook fails
      }

      // Trigger automated emails using ZeptoMail
      try {
        await triggerAutomatedEmails(data.formType || 'form_submission', {
          email: data.email,
          name: fullName,
          company: data.company,
          phone: data.phone
        });
      } catch (emailError) {
        console.error('Email automation error:', emailError);
        // Don't fail the entire submission if email fails
      }

      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('leadCreated', {
        detail: leadResult || { email: data.email, name: fullName }
      }));

      toast({
        title: "Thank you for your submission!",
        description: "We'll get back to you within 24 hours.",
      });

      return { success: true, leadId: leadResult?.id || 'contact-form' };
    } catch (error) {
      console.error('Form submission error:', error);
      
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });

      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting
  };
};
