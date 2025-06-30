
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  trigger: string;
  isActive: boolean;
}

export interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  fromEmail: string;
  fromName: string;
}

export const useEmailAutomation = () => {
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const getEmailSettings = (): EmailSettings | null => {
    const stored = localStorage.getItem('email_settings');
    return stored ? JSON.parse(stored) : null;
  };

  const saveEmailSettings = (settings: EmailSettings) => {
    localStorage.setItem('email_settings', JSON.stringify(settings));
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

  const sendAutomatedEmail = async (
    recipientEmail: string,
    templateId: string,
    variables: Record<string, string> = {}
  ) => {
    setIsSending(true);
    
    try {
      const settings = getEmailSettings();
      const templates = getEmailTemplates();
      const template = templates.find(t => t.id === templateId);

      if (!settings) {
        throw new Error('Email settings not configured');
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

      // In a real implementation, this would use a backend service or edge function
      // For now, we'll simulate the email sending
      console.log('Sending automated email:', {
        to: recipientEmail,
        subject,
        content,
        settings: { ...settings, smtpPass: '[HIDDEN]' }
      });

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Email Sent",
        description: `Automated email sent to ${recipientEmail}`,
      });

      return { success: true };
    } catch (error) {
      console.error('Error sending automated email:', error);
      
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
      const result = await sendAutomatedEmail(
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

    return results;
  };

  return {
    getEmailSettings,
    saveEmailSettings,
    getEmailTemplates,
    saveEmailTemplate,
    deleteEmailTemplate,
    sendAutomatedEmail,
    triggerAutomatedEmails,
    isSending
  };
};
