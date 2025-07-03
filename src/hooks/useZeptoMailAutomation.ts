
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  trigger: 'form_submission' | 'lead_status_change' | 'welcome' | 'follow_up';
  isActive: boolean;
  delay?: number; // in minutes
}

export interface ZeptoMailSettings {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  bounceAddress?: string;
}

export const useZeptoMailAutomation = () => {
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const getZeptoMailSettings = (): ZeptoMailSettings | null => {
    const stored = localStorage.getItem('zeptomail_settings');
    return stored ? JSON.parse(stored) : null;
  };

  const saveZeptoMailSettings = (settings: ZeptoMailSettings) => {
    localStorage.setItem('zeptomail_settings', JSON.stringify(settings));
  };

  const getEmailTemplates = (): EmailTemplate[] => {
    const stored = localStorage.getItem('email_templates');
    return stored ? JSON.parse(stored) : [];
  };

  const saveEmailTemplate = (template: EmailTemplate) => {
    const templates = getEmailTemplates();
    const existingIndex = templates.findIndex(t => t.id === template.id);
    
    if (existingIndex >= 0) {
      templates[existingIndex] = template;
    } else {
      templates.push(template);
    }
    
    localStorage.setItem('email_templates', JSON.stringify(templates));
  };

  const deleteEmailTemplate = (templateId: string) => {
    const templates = getEmailTemplates().filter(t => t.id !== templateId);
    localStorage.setItem('email_templates', JSON.stringify(templates));
  };

  const sendZeptoMailEmail = async (
    recipientEmail: string,
    templateId: string,
    variables: Record<string, string> = {}
  ) => {
    setIsSending(true);
    
    try {
      const settings = getZeptoMailSettings();
      const templates = getEmailTemplates();
      const template = templates.find(t => t.id === templateId);

      if (!settings) {
        throw new Error('ZeptoMail settings not configured');
      }

      if (!template || !template.isActive) {
        throw new Error('Email template not found or inactive');
      }

      // Replace variables in subject and content
      let subject = template.subject;
      let content = template.content;

      Object.entries(variables).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        subject = subject.replace(new RegExp(placeholder, 'g'), value);
        content = content.replace(new RegExp(placeholder, 'g'), value);
      });

      // ZeptoMail API call
      const zeptoMailData = {
        from: {
          address: settings.fromEmail,
          name: settings.fromName
        },
        to: [
          {
            email_address: {
              address: recipientEmail
            }
          }
        ],
        subject: subject,
        htmlbody: content,
        bounce_address: settings.bounceAddress || settings.fromEmail
      };

      console.log('Sending ZeptoMail email:', zeptoMailData);

      const response = await fetch('https://api.zeptomail.com/v1.1/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Zoho-enczapikey ${settings.apiKey}`
        },
        body: JSON.stringify(zeptoMailData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send email via ZeptoMail');
      }

      const result = await response.json();
      console.log('ZeptoMail response:', result);

      toast({
        title: "Email Sent",
        description: `Automated email sent to ${recipientEmail} via ZeptoMail`,
      });

      return { success: true, data: result };
    } catch (error) {
      console.error('Error sending ZeptoMail email:', error);
      
      toast({
        title: "Email Error",
        description: error instanceof Error ? error.message : "Failed to send email",
        variant: "destructive",
      });

      return { success: false, error };
    } finally {
      setIsSending(false);
    }
  };

  const triggerAutomatedEmails = async (
    trigger: string,
    leadData: {
      email: string;
      name: string;
      company?: string;
      phone?: string;
    }
  ) => {
    const templates = getEmailTemplates().filter(
      t => t.trigger === trigger && t.isActive
    );

    const results = [];

    for (const template of templates) {
      // Add delay if specified
      if (template.delay && template.delay > 0) {
        setTimeout(async () => {
          const result = await sendZeptoMailEmail(
            leadData.email,
            template.id,
            {
              name: leadData.name,
              email: leadData.email,
              company: leadData.company || '',
              phone: leadData.phone || ''
            }
          );
          results.push(result);
        }, template.delay * 60 * 1000);
      } else {
        const result = await sendZeptoMailEmail(
          leadData.email,
          template.id,
          {
            name: leadData.name,
            email: leadData.email,
            company: leadData.company || '',
            phone: leadData.phone || ''
          }
        );
        results.push(result);
      }
    }

    return results;
  };

  return {
    getZeptoMailSettings,
    saveZeptoMailSettings,
    getEmailTemplates,
    saveEmailTemplate,
    deleteEmailTemplate,
    sendZeptoMailEmail,
    triggerAutomatedEmails,
    isSending
  };
};
