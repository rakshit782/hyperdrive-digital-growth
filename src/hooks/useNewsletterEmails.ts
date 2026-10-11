import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getNeonSql } from '@/services/neonClient';

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
      const sql = getNeonSql();
      const rows = await sql`
        SELECT id, email, name, status, created_at, updated_at
        FROM public.newsletter_emails
        ORDER BY created_at DESC;
      `;
      setEmails((rows || []) as NewsletterEmail[]);
    } catch (error) {
      console.error('Error fetching newsletter emails from Neon:', error);
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
      const sql = getNeonSql();
      const normalizedEmail = emailData.email.trim().toLowerCase();

      // Check if email already exists
      const existing = await sql`
        SELECT id, status FROM public.newsletter_emails WHERE email = ${normalizedEmail};
      `;

      if (existing && existing.length > 0) {
        if (existing[0].status === 'subscribed') {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter",
            variant: "destructive",
          });
          return { success: false, error: 'Email already subscribed' };
        } else {
          // Reactivate subscription
          await sql`
            UPDATE public.newsletter_emails 
            SET status = 'subscribed', updated_at = NOW() 
            WHERE id = ${existing[0].id};
          `;
          toast({
            title: "Welcome Back!",
            description: "Email subscription reactivated successfully",
          });
          await fetchEmails();
          return { success: true };
        }
      }

      await sql`
        INSERT INTO public.newsletter_emails (
          email, name, status, created_at, updated_at
        )
        VALUES (
          ${normalizedEmail},
          ${emailData.name || null},
          'subscribed',
          NOW(),
          NOW()
        );
      `;

      toast({
        title: "Success",
        description: "Email added to newsletter successfully",
      });

      await fetchEmails();
      return { success: true };
    } catch (error) {
      console.error('Error adding newsletter email to Neon:', error);
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
      const sql = getNeonSql();
      await sql`
        UPDATE public.newsletter_emails
        SET status = ${status}, updated_at = NOW()
        WHERE id = ${id}::uuid OR id = ${id}::text;
      `;

      toast({
        title: "Status Updated",
        description: `Email ${status} successfully`,
      });

      await fetchEmails();
      return { success: true };
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
      const sql = getNeonSql();
      await sql`
        DELETE FROM public.newsletter_emails
        WHERE id = ${id}::uuid OR id = ${id}::text;
      `;

      toast({
        title: "Success",
        description: "Email deleted successfully",
      });
      await fetchEmails();
    } catch (error) {
      console.error('Error deleting email from Neon:', error);
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
