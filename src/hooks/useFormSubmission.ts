
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useZapierIntegration } from './useZapierIntegration';
import { useEmailAutomation } from './useEmailAutomation';

export interface FormSubmissionData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  source?: string;
  formType?: 'contact' | 'free_audit' | 'newsletter';
}

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { triggerZapierWebhook, getStoredWebhookUrls } = useZapierIntegration();
  const { triggerAutomatedEmails } = useEmailAutomation();

  const submitForm = async (data: FormSubmissionData) => {
    setIsSubmitting(true);
    
    try {
      // First, create a lead in the leads table
      const leadData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        source: data.source || 'website',
        status: 'new' as const,
        notes: data.message || null,
        lead_data: {
          formType: data.formType || 'contact',
          submittedAt: new Date().toISOString()
        }
      };

      const { data: leadResult, error: leadError } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single();

      if (leadError) {
        console.error('Error creating lead:', leadError);
        throw leadError;
      }

      console.log('Lead created successfully:', leadResult);

      // Trigger Zapier webhooks
      const webhooks = getStoredWebhookUrls();
      const formTypeWebhook = webhooks[data.formType || 'contact'];
      const generalWebhook = webhooks['new_lead'];

      if (formTypeWebhook || generalWebhook) {
        const zapierData = {
          leadId: leadResult.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          source: data.source || 'website',
          formType: data.formType || 'contact',
          message: data.message,
          timestamp: new Date().toISOString()
        };

        // Try form-specific webhook first, then general webhook
        const webhookUrl = formTypeWebhook || generalWebhook;
        await triggerZapierWebhook(webhookUrl, zapierData);
      }

      // Trigger automated emails
      try {
        await triggerAutomatedEmails(data.formType || 'contact', {
          email: data.email,
          name: data.name,
          company: data.company,
          phone: data.phone
        });
      } catch (emailError) {
        console.error('Email automation error:', emailError);
        // Don't fail the entire submission if email fails
      }

      toast({
        title: "Thank you for your submission!",
        description: "We'll get back to you within 24 hours.",
      });

      return { success: true, leadId: leadResult.id };
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
