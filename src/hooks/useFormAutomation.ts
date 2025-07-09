
import { useZapierIntegration } from './useZapierIntegration';
import { useZeptoMailAutomation } from './useZeptoMailAutomation';

export interface AutomationData {
  email: string;
  name: string;
  company?: string;
  phone?: string;
  formType?: string;
  leadId?: string;
  [key: string]: any;
}

export const useFormAutomation = () => {
  const { triggerZapierWebhook, getStoredWebhookUrls } = useZapierIntegration();
  const { triggerAutomatedEmails } = useZeptoMailAutomation();

  const triggerAutomations = async (data: AutomationData) => {
    // Trigger Zapier webhooks (non-blocking)
    try {
      const webhooks = getStoredWebhookUrls();
      const formTypeWebhook = webhooks[data.formType || 'contact'];
      const generalWebhook = webhooks['new_lead'];

      if (formTypeWebhook || generalWebhook) {
        const zapierData = {
          leadId: data.leadId || 'unknown',
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          source: 'website',
          formType: data.formType || 'contact',
          message: data.message,
          timestamp: new Date().toISOString()
        };

        const webhookUrl = formTypeWebhook || generalWebhook;
        await triggerZapierWebhook(webhookUrl, zapierData);
        console.log('Zapier webhook triggered successfully');
      }
    } catch (webhookError) {
      console.error('Webhook error:', webhookError);
      // Don't fail the entire submission if webhook fails
    }

    // Trigger automated emails using ZeptoMail (non-blocking)
    try {
      await triggerAutomatedEmails(data.formType || 'form_submission', {
        email: data.email,
        name: data.name,
        company: data.company,
        phone: data.phone
      });
      console.log('Automated emails triggered successfully');
    } catch (emailError) {
      console.error('Email automation error:', emailError);
      // Don't fail the entire submission if email fails
    }
  };

  return {
    triggerAutomations
  };
};
