
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ZapierWebhookData {
  leadId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  formType: string;
  message?: string;
  timestamp: string;
}

export const useZapierIntegration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const triggerZapierWebhook = async (webhookUrl: string, data: ZapierWebhookData) => {
    if (!webhookUrl) {
      console.log('No Zapier webhook URL provided');
      return { success: false, error: 'No webhook URL' };
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          ...data,
          triggered_from: window.location.origin,
          user_agent: navigator.userAgent,
        }),
      });

      console.log('Zapier webhook triggered successfully');
      
      toast({
        title: "Zapier Integration",
        description: "Lead data sent to Zapier successfully",
      });

      return { success: true };
    } catch (error) {
      console.error('Error triggering Zapier webhook:', error);
      
      toast({
        title: "Zapier Error",
        description: "Failed to send data to Zapier. Please check your webhook URL.",
        variant: "destructive",
      });

      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStoredWebhookUrls = () => {
    const stored = localStorage.getItem('zapier_webhooks');
    return stored ? JSON.parse(stored) : {};
  };

  const saveWebhookUrl = (trigger: string, url: string) => {
    const webhooks = getStoredWebhookUrls();
    webhooks[trigger] = url;
    localStorage.setItem('zapier_webhooks', JSON.stringify(webhooks));
  };

  return {
    triggerZapierWebhook,
    getStoredWebhookUrls,
    saveWebhookUrl,
    isSubmitting
  };
};
