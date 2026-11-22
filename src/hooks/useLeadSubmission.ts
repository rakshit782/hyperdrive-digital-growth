
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { trackMetaLead } from '@/utils/metaPixel';

export interface LeadSubmissionData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  brandName?: string;
  website?: string;
  amazonStoreUrl?: string;
  walmartStoreUrl?: string;
  source?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes?: string;
  firstName?: string;
  lastName?: string;
  businessGoals?: string;
  monthlyAdSpend?: string;
  primaryPlatform?: string;
  currentChallenges?: string;
  honeypot?: string;
  uploadedFiles?: {
    businessSalesReport?: string | null;
    searchTermReport?: string | null;
    advertisedProductReport?: string | null;
  };
}

const RATE_LIMIT_KEY = 'amz_lead_submit_throttle';
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', 'guerrillamail.com', '10minutemail.com',
  'throwawaymail.com', 'trashmail.com', 'sharklasers.com', 'yopmail.com'
]);

export const useLeadSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitLead = async (data: LeadSubmissionData) => {
    setIsSubmitting(true);
    
    try {
      // 1. Honeypot check (Bots fill hidden fields)
      if (data.honeypot && data.honeypot.trim() !== '') {
        console.warn('Bot detected via honeypot trap, suppressing lead.');
        return { success: true, leadId: 'filtered' };
      }

      // 2. Validate required fields
      if (!data.email || !data.name) {
        throw new Error('Name and email are required');
      }

      const emailClean = data.email.trim().toLowerCase();
      const emailDomain = emailClean.split('@')[1];

      // 3. Reject known disposable/burner spam domains
      if (emailDomain && DISPOSABLE_DOMAINS.has(emailDomain)) {
        throw new Error('Please enter a valid work or personal email address (disposable domains not accepted).');
      }

      // 4. Client-side rapid submission throttle (prevents automated click flooding)
      try {
        const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
        const now = Date.now();
        if (lastSubmit && now - parseInt(lastSubmit, 10) < 5000) {
          throw new Error('Please wait a few seconds before submitting again.');
        }
        localStorage.setItem(RATE_LIMIT_KEY, now.toString());
      } catch (throttleErr: any) {
        if (throttleErr.message?.includes('wait')) throw throttleErr;
      }

      // Prepare lead data for Neon database
      const leadData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        brandName: data.brandName || null,
        website: data.website || null,
        amazonStoreUrl: data.amazonStoreUrl || null,
        walmartStoreUrl: data.walmartStoreUrl || null,
        source: data.source || 'website',
        status: data.status || 'new',
        notes: data.notes || null,
        firstName: data.firstName,
        lastName: data.lastName,
        businessGoals: data.businessGoals,
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

      // Save through the Vercel function (api/lead.ts). It writes to Neon and sends the email alert.
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          currentSpend: leadData.monthlyAdSpend,
          goals: leadData.businessGoals,
          auditType: (data as any).auditType || data.primaryPlatform || null,
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result?.success) {
        throw new Error(result?.error || 'Failed to submit lead');
      }

      // Conversion tracking: one Meta Lead (pixel + server copy), GA4 generate_lead and a GTM dataLayer event
      try {
        trackMetaLead({
          leadId: result.leadId, email: leadData.email, phone: leadData.phone || undefined, name: leadData.name,
          contentName: leadData.source || 'Website Lead', contentCategory: data.primaryPlatform || 'General',
        });
        if ((window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'Lead Generation',
            event_label: leadData.source || 'website',
            value: 100,
          });
        }
        if (Array.isArray((window as any).dataLayer)) {
          (window as any).dataLayer.push({ event: 'generate_lead', lead_source: leadData.source || 'website', lead_id: result.leadId });
        }
      } catch (trackErr) {
        console.warn('Ad tracking dispatch warning:', trackErr);
      }

      window.dispatchEvent(new CustomEvent('leadCreated', {
        detail: { id: result.leadId, leadNumber: result.leadNumber, ...leadData }
      }));

      return { success: true, leadId: result.leadId };
    } catch (error) {
      console.warn('Lead submission error:', error);
      
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
