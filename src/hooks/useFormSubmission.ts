
import { useToast } from '@/hooks/use-toast';
import { useLeadSubmission, type LeadSubmissionData } from './useLeadSubmission';
import { useContactSubmission } from './useContactSubmission';
import { useFormAutomation } from './useFormAutomation';

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
  uploadedFiles?: {
    businessSalesReport?: string | null;
    searchTermReport?: string | null;
    advertisedProductReport?: string | null;
  };
}

export const useFormSubmission = () => {
  const { toast } = useToast();
  const { submitLead, isSubmitting: isLeadSubmitting } = useLeadSubmission();
  const { submitContact, isSubmitting: isContactSubmitting } = useContactSubmission();
  const { triggerAutomations } = useFormAutomation();

  const isSubmitting = isLeadSubmitting || isContactSubmitting;

  const submitForm = async (data: FormSubmissionData) => {
    try {
      console.log('Starting form submission with data:', data);

      // Validate required fields
      if (!data.email || !data.name) {
        throw new Error('Name and email are required');
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

      // Submit lead data
      const leadResult = await submitLead({
        name: fullName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        source: data.source || 'website',
        notes: detailedMessage || data.businessGoals || null,
        firstName: data.firstName,
        lastName: data.lastName,
        businessGoals: data.businessGoals,
        website: data.website,
        monthlyAdSpend: data.monthlyAdSpend,
        primaryPlatform: data.primaryPlatform,
        currentChallenges: data.currentChallenges,
        uploadedFiles: data.uploadedFiles
      });

      if (!leadResult.success) {
        throw new Error(leadResult.error || 'Failed to create lead');
      }

      // Store in contact_submissions for backward compatibility
      try {
        await submitContact({
          name: fullName,
          email: data.email,
          phone: data.phone,
          company: data.company,
          message: detailedMessage,
          formType: data.formType || 'contact'
        });
      } catch (contactError) {
        console.error('Failed to store contact submission:', contactError);
        // Don't fail the entire submission if contact submission fails
      }

      // Trigger automations (non-blocking)
      try {
        await triggerAutomations({
          leadId: leadResult.leadId,
          name: fullName,
          email: data.email,
          phone: data.phone,
          company: data.company,
          formType: data.formType || 'contact',
          message: detailedMessage,
          businessGoals: data.businessGoals,
          website: data.website,
          monthlyAdSpend: data.monthlyAdSpend,
          primaryPlatform: data.primaryPlatform,
          uploadedFiles: data.uploadedFiles
        });
      } catch (automationError) {
        console.error('Automation error:', automationError);
        // Don't fail the entire submission if automation fails
      }

      return { success: true, leadId: leadResult.leadId };
    } catch (error) {
      console.error('Form submission error:', error);
      
      let errorMessage = "There was an error submitting your form. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Provide more specific error messages for common issues
        if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else if (error.message.includes('validation') || error.message.includes('required')) {
          errorMessage = "Please fill in all required fields correctly.";
        }
      }
      
      return { success: false, error: errorMessage };
    }
  };

  return {
    submitForm,
    isSubmitting
  };
};
