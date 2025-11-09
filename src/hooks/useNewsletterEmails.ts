
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface NewsletterEmail {
  id?: string;
  email: string;
  name?: string;
  status: 'subscribed' | 'unsubscribed';
  source?: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

export const useNewsletterEmails = () => {
  const [emails, setEmails] = useState<NewsletterEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEmails = async () => {
    try {
      setLoading(true);
      console.log('Fetching newsletter emails from Neon database...');
      const { data, error } = await supabase.functions.invoke('neon-newsletter', {
        body: { action: 'list' }
      });
      
      if (error) throw error;
      
      setEmails(data?.emails || []);
      console.log('Newsletter emails fetched:', data?.emails);
    } catch (error) {
      console.error('Error fetching newsletter emails:', error);
      toast({
        title: "Error",
        description: "Failed to load newsletter emails",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addEmail = async (emailData: Omit<NewsletterEmail, 'id' | 'created_at' | 'updated_at' | 'status'> & { status?: 'subscribed' | 'unsubscribed' }) => {
    try {
      console.log('Adding newsletter email:', emailData);
      
      const { data, error } = await supabase.functions.invoke('neon-newsletter', {
        body: {
          action: 'subscribe',
          email: emailData.email,
          name: emailData.name
        }
      });

      if (error) throw error;

      if (!data?.success) {
        if (data?.error === 'Email already subscribed') {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter",
            variant: "destructive",
          });
          return { success: false, error: 'Email already subscribed' };
        }
        throw new Error(data?.error || 'Failed to subscribe');
      }

      if (data?.reactivated) {
        toast({
          title: "Welcome Back!",
          description: "Email subscription reactivated successfully",
        });
      } else {
        toast({
          title: "Success",
          description: "Email added to newsletter successfully",
        });
      }

      await fetchEmails();
      return { success: true };
    } catch (error) {
      console.error('Error adding newsletter email:', error);
      toast({
        title: "Error",
        description: "Failed to add email to newsletter",
        variant: "destructive",
      });
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  const updateEmailStatus = async (id: string, status: 'subscribed' | 'unsubscribed') => {
    try {
      const { error } = await supabase.functions.invoke('neon-newsletter', {
        body: {
          action: 'update',
          id,
          status
        }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Email ${status} successfully`,
      });
      await fetchEmails();
    } catch (error) {
      console.error('Error updating email status:', error);
      toast({
        title: "Error",
        description: "Failed to update email status",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteEmail = async (id: string) => {
    try {
      const { error } = await supabase.functions.invoke('neon-newsletter', {
        body: {
          action: 'delete',
          id
        }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Email deleted successfully",
      });
      await fetchEmails();
    } catch (error) {
      console.error('Error deleting email:', error);
      toast({
        title: "Error",
        description: "Failed to delete email",
        variant: "destructive",
      });
      throw error;
    }
  };

  const refetch = () => {
    fetchEmails();
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return {
    emails,
    loading,
    addEmail,
    updateEmailStatus,
    deleteEmail,
    refetch
  };
};
