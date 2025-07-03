
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useZapierIntegration } from './useZapierIntegration';
import { useZeptoMailAutomation } from './useZeptoMailAutomation';
import { useFormSecurity, type SecurityValidationResult } from './useFormSecurity';
import { databaseService } from '@/services/databaseService';

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
  website?: string;
  monthlyAdSpend?: string;
  primaryPlatform?: string;
  currentChallenges?: string;
  csrfToken?: string;
  honeypotValue?: string;
  uploadedFiles?: {
    businessSalesReport?: string | null;
    searchTermReport?: string | null;
    advertisedProductReport?: string | null;
  };
}

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { triggerZapierWebhook, getStoredWebhookUrls } = useZapierIntegration();
  const { triggerAutomatedEmails } = useZeptoMailAutomation();
  const { validateSecurity } = useFormSecurity();

  const submitForm = async (data: FormSubmissionData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Starting form submission with data:', data);

      // Validate form security
      const securityResult: SecurityValidationResult = await validateSecurity(
        data,
        data.formType || 'contact',
        data.honeypotValue || ''
      );

      if (!securityResult.isValid) {
        console.error('Security validation failed:', securityResult.errors);
        toast({
          title: "Security Check Failed",
          description: "Your submission was blocked for security reasons.",
          variant: "destructive",
        });
        return { success: false, error: 'Security validation failed' };
      }

      // Prepare the full name from firstName and lastName if available
      const fullName = data.firstName && data.lastName 
        ? `${data.firstName} ${data.lastName}` 
        : data.name || '';

      // Prepare detailed message for audit forms
      let detailedMessage = data.message || '';
      if (data.formType === 'free_audit') {
        detailedMessage = `Free Audit Request Details:
        
Website: ${data.website || 'Not provided'}
Monthly Ad Spend: ${data.monthlyAdSpend || 'Not provided'}
Primary Platform: ${data.primaryPlatform || 'Not provided'}
Business Goals: ${data.businessGoals || 'Not provided'}
Current Challenges: ${data.currentChallenges || 'Not provided'}

Uploaded Files:
- Business Sales Report: ${data.uploadedFiles?.businessSalesReport || 'Not uploaded'}
- Search Term Report: ${data.uploadedFiles?.searchTermReport || 'Not uploaded'}
- Advertised Product Report: ${data.uploadedFiles?.advertisedProductReport || 'Not uploaded'}`;
      }

      // Prepare lead data with enhanced security information and file upload details
      const leadData = {
        name: fullName,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        source: data.source || 'website',
        status: 'new' as const,
        notes: detailedMessage || data.businessGoals || null,
        form_security: {
          recaptchaScore: securityResult.recaptchaScore,
          honeypotTriggered: securityResult.honeypotTriggered,
          csrfValid: securityResult.csrfValid,
          validatedAt: new Date().toISOString()
        },
        lead_data: {
          formType: data.formType || 'contact',
          firstName: data.firstName,
          lastName: data.lastName,
          businessGoals: data.businessGoals,
          website: data.website,
          monthlyAdSpend: data.monthlyAdSpend,
          primaryPlatform: data.primaryPlatform,
          currentChallenges: data.currentChallenges,
          uploadedFiles: data.uploadedFiles || {},
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
          pageUrl: window.location.href,
          referrer: document.referrer
        }
      };

      console.log('Creating lead with data:', leadData);

      // Insert lead data using database service
      const leadResult = await databaseService.insertLead(leadData);

      if (!leadResult) {
        throw new Error('Failed to create lead');
      }

      console.log('Lead created successfully:', leadResult);
      
      // Also store in contact_submissions for backward compatibility
      const contactData = {
        name: fullName,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: detailedMessage,
        form_type: data.formType || 'contact'
      };

      await databaseService.insertContactSubmission(contactData);

      // Trigger Zapier webhooks
      try {
        const webhooks = getStoredWebhookUrls();
        const formTypeWebhook = webhooks[data.formType || 'contact'];
        const generalWebhook = webhooks['new_lead'];

        if (formTypeWebhook || generalWebhook) {
          const zapierData = {
            leadId: leadResult.id,
            name: fullName,
            email: data.email,
            phone: data.phone,
            company: data.company,
            source: data.source || 'website',
            formType: data.formType || 'contact',
            message: detailedMessage,
            businessGoals: data.businessGoals,
            website: data.website,
            monthlyAdSpend: data.monthlyAdSpend,
            primaryPlatform: data.primaryPlatform,
            uploadedFiles: data.uploadedFiles,
            timestamp: new Date().toISOString(),
            securityScore: securityResult.recaptchaScore
          };

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
        detail: leadResult
      }));

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
