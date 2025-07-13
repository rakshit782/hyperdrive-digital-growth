
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type NewsletterEmail = Database['public']['Tables']['newsletter_emails']['Row'];

export const useNewsletterEmails = () => {
  const [emails, setEmails] = useState<NewsletterEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('newsletter_emails')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmails(data.map(email => ({
        ...email,
        status: email.status as 'subscribed' | 'unsubscribed'
      })));
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

  const addEmail = async (emailData: Omit<NewsletterEmail, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from('newsletter_emails')
        .select('*')
        .eq('email', emailData.email.toLowerCase())
        .single();

      if (existing) {
        if (existing.status === 'unsubscribed') {
          // Reactivate subscription
          const { error } = await supabase
            .from('newsletter_emails')
            .update({ 
              status: 'subscribed',
              source: emailData.source || 'newsletter_form',
              updated_at: new Date().toISOString()
            })
            .eq('id', existing.id);

          if (error) throw error;
          
          toast({
            title: "Welcome Back!",
            description: "Email subscription reactivated successfully",
          });
        } else {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter",
            variant: "destructive",
          });
          return { success: false, error: 'Email already subscribed' };
        }
      } else {
        // Add new email
        const { error } = await supabase
          .from('newsletter_emails')
          .insert([{
            ...emailData,
            email: emailData.email.toLowerCase(),
            status: emailData.status || 'subscribed'
          }]);

        if (error) throw error;
        
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
      const { error } = await supabase
        .from('newsletter_emails')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

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
      const { error } = await supabase
        .from('newsletter_emails')
        .delete()
        .eq('id', id);

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

  useEffect(() => {
    fetchEmails();
  }, []);

  return {
    emails,
    loading,
    addEmail,
    updateEmailStatus,
    deleteEmail,
    refetch: fetchEmails
  };
};
