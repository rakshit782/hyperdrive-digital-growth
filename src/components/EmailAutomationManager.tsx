
import { useEffect } from 'react';
import { useZeptoMailAutomation } from '@/hooks/useZeptoMailAutomation';

interface EmailTrigger {
  trigger: string;
  condition?: (data: any) => boolean;
  delay?: number;
}

const EmailAutomationManager = () => {
  const { triggerAutomatedEmails, getEmailTemplates } = useZeptoMailAutomation();

  useEffect(() => {
    // Initialize default email templates if none exist
    const initializeDefaultTemplates = () => {
      const templates = getEmailTemplates();
      
      if (templates.length === 0) {
        const defaultTemplates = [
          {
            id: 'welcome-001',
            name: 'Welcome Email',
            subject: 'Welcome to {{company}} - Your Journey Starts Here!',
            content: `
              <h1>Welcome {{name}}!</h1>
              <p>Thank you for your interest in our advertising services. We're excited to help you grow your business.</p>
              <p>Our team will review your information and get back to you within 24 hours with a customized strategy.</p>
              <p>Best regards,<br>The Advertising Experts Team</p>
            `,
            trigger: 'form_submission' as const,
            isActive: true,
            delay: 0
          },
          {
            id: 'followup-001',
            name: 'Follow-up Email',
            subject: 'Following up on your advertising audit request',
            content: `
              <h1>Hi {{name}},</h1>
              <p>We wanted to follow up on your recent inquiry about our advertising services.</p>
              <p>Our team has prepared some initial insights for {{company}} and we'd love to share them with you.</p>
              <p>Would you be available for a 15-minute call this week?</p>
              <p>Best regards,<br>Your Account Manager</p>
            `,
            trigger: 'follow_up' as const,
            isActive: true,
            delay: 1440 // 24 hours
          }
        ];

        defaultTemplates.forEach(template => {
          localStorage.setItem('email_templates', JSON.stringify([...getEmailTemplates(), template]));
        });
      }
    };

    initializeDefaultTemplates();

    // Set up email automation triggers
    const setupEmailTriggers = () => {
      // Listen for form submissions
      window.addEventListener('formSubmission', async (event: any) => {
        const { formType, leadData } = event.detail;
        
        console.log('Email automation triggered for:', formType, leadData);
        
        try {
          await triggerAutomatedEmails('form_submission', leadData);
          
          // Schedule follow-up email
          setTimeout(async () => {
            await triggerAutomatedEmails('follow_up', leadData);
          }, 24 * 60 * 60 * 1000); // 24 hours
          
        } catch (error) {
          console.error('Email automation failed:', error);
        }
      });

      // Listen for lead status changes
      window.addEventListener('leadStatusChange', async (event: any) => {
        const { leadData, newStatus } = event.detail;
        
        if (newStatus === 'qualified') {
          await triggerAutomatedEmails('lead_status_change', leadData);
        }
      });
    };

    setupEmailTriggers();
  }, [triggerAutomatedEmails, getEmailTemplates]);

  return null;
};

export default EmailAutomationManager;
