
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getNeonSql } from '@/services/neonClient';
import { decryptSecret } from '@/services/cryptoVault';

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

      console.log('Submitting lead to Neon database:', leadData);

      // 1. Try Direct Neon Database insert first
      try {
        const sql = getNeonSql();
        const leadNumber = `LEAD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
        
        const rows = await sql`
          INSERT INTO public.leads (
            name, email, phone, company, brand_name, website_url, amazon_store_url, walmart_store_url,
            source, status, notes, lead_number, audit_type, current_spend, goals, lead_data, form_security,
            created_at, updated_at
          )
          VALUES (
            ${leadData.name},
            ${leadData.email},
            ${leadData.phone || null},
            ${leadData.company || null},
            ${leadData.brandName || null},
            ${leadData.website || null},
            ${leadData.amazonStoreUrl || null},
            ${leadData.walmartStoreUrl || null},
            ${leadData.source || 'website'},
            ${leadData.status || 'new'},
            ${leadData.notes || null},
            ${leadNumber},
            ${leadData.auditType || null},
            ${leadData.monthlyAdSpend || null},
            ${leadData.businessGoals || null},
            ${JSON.stringify(leadData.uploadedFiles || {})},
            ${JSON.stringify(leadData.formSecurity || {})},
            NOW(),
            NOW()
          )
          RETURNING id, lead_number;
        `;

        if (rows && rows.length > 0) {
          const leadId = rows[0].id;
          const assignedNumber = rows[0].lead_number;
          console.log('Lead saved directly to Neon:', { leadId, assignedNumber });

          // Trigger email notification if configured
          try {
            const settingsRows = await sql`
              SELECT resend_api_key, notification_email, email_notifications_enabled,
                     email_subject_template, email_html_template
              FROM public.site_settings
              WHERE id = 1;
            `;
            const s = settingsRows[0];
            const resendApiKey = s?.resend_api_key ? await decryptSecret(s.resend_api_key) : null;
            if (s && s.email_notifications_enabled && resendApiKey && s.notification_email) {
              const recipients = s.notification_email.split(',').map((e: string) => e.trim()).filter(Boolean);
              if (recipients.length > 0) {
                const subject = (s.email_subject_template || 'New Lead: {name} ({lead_number})')
                  .replaceAll('{name}', leadData.name)
                  .replaceAll('{lead_number}', assignedNumber)
                  .replaceAll('{company}', leadData.company || 'N/A');

                await fetch('/api/resend/emails', {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    from: 'AMZ Leads <onboarding@resend.dev>',
                    to: recipients,
                    subject,
                    html: `
                      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <h2>🎯 New Lead: ${leadData.name}</h2>
                        <p><strong>Email:</strong> ${leadData.email}</p>
                        <p><strong>Phone:</strong> ${leadData.phone || 'N/A'}</p>
                        <p><strong>Company:</strong> ${leadData.company || 'N/A'}</p>
                        <p><strong>Notes:</strong> ${leadData.notes || 'None'}</p>
                        <p style="color: #64748b; font-size: 13px;">Lead ID: ${assignedNumber}</p>
                      </div>
                    `,
                  }),
                });
              }
            }
          } catch (notifErr) {
            console.warn('Lead notification dispatch warning:', notifErr);
          }

          // Fire client conversion tracking (Meta Pixel, GA4 & GTM dataLayer)
          try {
            if (typeof window !== 'undefined') {
              // 1. Meta Pixel standard Lead event
              if ((window as any).fbq) {
                (window as any).fbq('track', 'Lead', {
                  content_name: leadData.source || 'Website Lead',
                  content_category: leadData.auditType || 'General',
                  currency: 'USD',
                  value: 100,
                });
              }
              // 2. Google Analytics 4 standard generate_lead event
              if ((window as any).gtag) {
                (window as any).gtag('event', 'generate_lead', {
                  event_category: 'Lead Generation',
                  event_label: leadData.source || 'website',
                  value: 100,
                });
              }
              // 3. Google Tag Manager (GTM) dataLayer trigger event
              if (Array.isArray((window as any).dataLayer)) {
                (window as any).dataLayer.push({
                  event: 'generate_lead',
                  lead_source: leadData.source || 'website',
                  platform: leadData.primaryPlatform || 'general',
                  ad_spend: leadData.monthlyAdSpend || 'n/a',
                });
              }
            }
          } catch (trackErr) {
            console.warn('Ad tracking dispatch warning:', trackErr);
          }

          window.dispatchEvent(new CustomEvent('leadCreated', {
            detail: { id: leadId, leadNumber: assignedNumber, ...leadData }
          }));

          return { success: true, leadId };
        }
      } catch (neonErr) {
        console.warn('Direct Neon lead submission fallback:', neonErr);
      }

      // 2. Submit to Neon database via edge function fallback
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

      // Fire client conversion tracking (Meta Pixel & GA4)
      try {
        if (typeof window !== 'undefined') {
          if ((window as any).fbq) {
            (window as any).fbq('track', 'Lead', {
              content_name: leadData.source || 'Website Lead',
              content_category: leadData.auditType || 'General',
              currency: 'USD',
              value: 100,
            });
          }
          if ((window as any).gtag) {
            (window as any).gtag('event', 'generate_lead', {
              event_category: 'Lead Generation',
              event_label: leadData.source || 'website',
              value: 100,
            });
          }
        }
      } catch (trackErr) {
        console.warn('Ad tracking dispatch warning:', trackErr);
      }

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
