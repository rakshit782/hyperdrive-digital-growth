
import { useState } from 'react';
import { getNeonSql } from '@/services/neonClient';
import { decryptSecret } from '@/services/cryptoVault';

export interface ContactSubmissionData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  formType?: string;
}

export const useContactSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitContact = async (data: ContactSubmissionData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting contact directly to Neon database:', data);

      const contactData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: data.message || null,
        form_type: data.formType || 'contact'
      };

      const sql = getNeonSql();
      const rows = await sql`
        INSERT INTO public.contact_submissions (
          name, email, phone, company, message, form_type, created_at
        )
        VALUES (
          ${contactData.name},
          ${contactData.email},
          ${contactData.phone},
          ${contactData.company},
          ${contactData.message},
          ${contactData.form_type},
          NOW()
        )
        RETURNING id;
      `;

      const contactId = rows && rows[0] ? rows[0].id : null;
      console.log('Contact submission stored directly in Neon, ID:', contactId);

      // Send email notification via Resend if configured
      try {
        const settings = await sql`
          SELECT resend_api_key, notification_email, email_notifications_enabled
          FROM public.site_settings
          WHERE id = 1;
        `;
        const s = settings[0];
        const resendApiKey = s?.resend_api_key ? await decryptSecret(s.resend_api_key) : null;
        if (s && s.email_notifications_enabled && resendApiKey && s.notification_email) {
          const recipients = s.notification_email.split(',').map((e: string) => e.trim()).filter(Boolean);
          if (recipients.length > 0) {
            await fetch('/api/resend/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: 'AMZ Leads <onboarding@resend.dev>',
                to: recipients,
                subject: `New Contact Submission: ${contactData.name}`,
                html: `
                  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <h2>📬 New Contact Message: ${contactData.name}</h2>
                    <p><strong>Email:</strong> ${contactData.email}</p>
                    <p><strong>Phone:</strong> ${contactData.phone || 'N/A'}</p>
                    <p><strong>Company:</strong> ${contactData.company || 'N/A'}</p>
                    <p><strong>Message:</strong></p>
                    <blockquote style="background: #f8fafc; padding: 12px; border-left: 4px solid #0284c7; margin: 12px 0;">
                      ${contactData.message || 'No message provided'}
                    </blockquote>
                  </div>
                `,
              }),
            });
          }
        }
      } catch (emailErr) {
        console.warn('Contact email notification error:', emailErr);
      }

      return { success: true, contactId };
    } catch (error: any) {
      console.error('Contact submission error:', error);
      return { success: false, error: error?.message || 'Failed to store contact submission' };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitContact,
    isSubmitting
  };
};
