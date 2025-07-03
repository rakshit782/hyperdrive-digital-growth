
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { postgresService, PostgresLeadData } from '@/services/postgresService';

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
}

export const usePostgresFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitForm = async (data: FormSubmissionData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Starting PostgreSQL form submission with data:', data);

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
Current Challenges: ${data.currentChallenges || 'Not provided'}`;
      }

      // Prepare lead data for PostgreSQL
      const leadData: PostgresLeadData = {
        name: fullName,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        source: data.source || 'website',
        status: 'new' as const,
        notes: detailedMessage || data.businessGoals || null,
        form_security: {
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          pageUrl: window.location.href,
          referrer: document.referrer
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
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
          pageUrl: window.location.href,
          referrer: document.referrer
        }
      };

      console.log('Creating lead with PostgreSQL data:', leadData);

      // Insert lead data using PostgreSQL service
      const leadResult = await postgresService.insertLead(leadData);

      if (!leadResult || !leadResult.id) {
        throw new Error('Failed to create lead - PostgreSQL service returned invalid result');
      }

      console.log('Lead created successfully via PostgreSQL:', leadResult);
      
      // Also store in contact_submissions for backward compatibility
      try {
        const contactData = {
          name: fullName,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
          message: detailedMessage,
          form_type: data.formType || 'contact'
        };

        await postgresService.insertContactSubmission(contactData);
        console.log('Contact submission stored successfully via PostgreSQL');
      } catch (contactError) {
        console.error('Failed to store contact submission via PostgreSQL:', contactError);
        // Don't fail the entire submission if contact submission fails
      }

      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('leadCreated', {
        detail: leadResult
      }));

      return { success: true, leadId: leadResult.id };
    } catch (error) {
      console.error('PostgreSQL form submission error:', error);
      
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting
  };
};
