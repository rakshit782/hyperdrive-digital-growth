
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface LeadSubmissionData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes?: string;
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

export const useLeadSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitLead = async (data: LeadSubmissionData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Starting lead submission with data:', data);

      // Validate required fields
      if (!data.email || !data.name) {
        throw new Error('Name and email are required');
      }

      // Prepare lead data for Neon database
      const leadData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        source: data.source || 'website',
        status: data.status || 'new',
        notes: data.notes || null,
        firstName: data.firstName,
        lastName: data.lastName,
        businessGoals: data.businessGoals,
        website: data.website,
        monthlyAdSpend: data.monthlyAdSpend,
        primaryPlatform: data.primaryPlatform,
        currentChallenges: data.currentChallenges,
        uploadedFiles: data.uploadedFiles || {},
        formSecurity: {
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          pageUrl: window.location.href,
          referrer: document.referrer
        }
      };

      console.log('Submitting lead to Neon database:', leadData);

      // Submit to Neon database via edge function
      const { data: result, error } = await supabase.functions.invoke('neon-lead-submission', {
        body: leadData
      });

      if (error) {
        throw new Error(error.message || 'Failed to submit lead');
      }

      if (!result?.success) {
        throw new Error('Failed to create lead in database');
      }

      console.log('Lead created successfully with ID:', result.leadId);

      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('leadCreated', {
        detail: { id: result.leadId, leadNumber: result.leadNumber, ...leadData }
      }));

      return { success: true, leadId: result.leadId };
    } catch (error) {
      console.error('Lead submission error:', error);
      
      let errorMessage = "There was an error submitting your form. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitLead,
    isSubmitting
  };
};
