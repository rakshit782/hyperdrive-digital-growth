import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { adminCall } from '@/services/apiClient';

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
      const { emails } = await adminCall<{ emails: NewsletterEmail[] }>('newsletter.list', { limit: 5000 });
      setEmails(emails);
    } catch (error) {
      console.warn('Error fetching newsletter emails from Neon:', error);
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
      const r = await adminCall<{ success: boolean; already?: boolean; reactivated?: boolean }>('newsletter.add', { email: emailData.email, name: emailData.name });
      if (r.already) {
        toast({ title: "Already Subscribed", description: "This email is already subscribed to our newsletter", variant: "destructive" });
        return { success: false, error: 'Email already subscribed' };
      }
      if (r.reactivated) {
        toast({ title: "Welcome Back!", description: "Email subscription reactivated successfully" });
        await fetchEmails();
        return { success: true };
      }
      toast({
        title: "Success",
        description: "Email added to newsletter successfully",
      });

      await fetchEmails();
      return { success: true };
    } catch (error) {
      console.warn('Error adding newsletter email to Neon:', error);
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
      await adminCall('newsletter.set_status', { id, status });

      toast({
        title: "Status Updated",
        description: `Email ${status} successfully`,
      });

      await fetchEmails();
      return { success: true };
    } catch (error) {
      console.warn('Error updating email status:', error);
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
      await adminCall('newsletter.delete', { id });

      toast({
        title: "Success",
        description: "Email deleted successfully",
      });
      await fetchEmails();
    } catch (error) {
      console.warn('Error deleting email from Neon:', error);
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
