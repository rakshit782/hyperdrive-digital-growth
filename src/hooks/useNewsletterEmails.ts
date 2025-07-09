
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { localDB } from '@/utils/localStorageDB';

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
      console.log('Fetching newsletter emails from local storage...');
      const emailsData = await localDB.findAll('newsletter_emails');
      setEmails(emailsData);
      console.log('Newsletter emails fetched from local storage:', emailsData);
    } catch (error) {
      console.error('Error fetching newsletter emails:', error);
      toast({
        title: "Error",
        description: "Failed to load newsletter emails from local storage",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addEmail = async (emailData: Omit<NewsletterEmail, 'id' | 'created_at' | 'updated_at' | 'status'> & { status?: 'subscribed' | 'unsubscribed' }) => {
    try {
      console.log('Adding newsletter email:', emailData);
      
      // Check if email already exists
      const existingEmail = await localDB.findWhere('newsletter_emails', 
        (item) => item.email.toLowerCase() === emailData.email.toLowerCase()
      );

      if (existingEmail.length > 0) {
        // Update existing email if it was unsubscribed
        if (existingEmail[0].status === 'unsubscribed') {
          await localDB.update('newsletter_emails', existingEmail[0].id, {
            status: 'subscribed',
            source: emailData.source || 'newsletter_form',
            updated_at: new Date().toISOString()
          });
          console.log('Reactivated existing email subscription');
          toast({
            title: "Welcome Back!",
            description: "Email subscription reactivated successfully",
          });
        } else {
          console.log('Email already subscribed');
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter",
            variant: "destructive",
          });
          return { success: false, error: 'Email already subscribed' };
        }
      } else {
        // Add new email
        const newEmailData = {
          ...emailData,
          status: emailData.status || 'subscribed',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const id = await localDB.insert('newsletter_emails', newEmailData);
        console.log('New email added with ID:', id);
        toast({
          title: "Success",
          description: "Email added to newsletter successfully",
        });
      }

      await fetchEmails(); // Refresh the list
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
      await localDB.update('newsletter_emails', id, { 
        status,
        updated_at: new Date().toISOString()
      });
      toast({
        title: "Success",
        description: `Email ${status} successfully`,
      });
      await fetchEmails(); // Refresh the list
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
      await localDB.delete('newsletter_emails', id);
      toast({
        title: "Success",
        description: "Email deleted successfully",
      });
      await fetchEmails(); // Refresh the list
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
