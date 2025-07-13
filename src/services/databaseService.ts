
import { supabase } from '@/integrations/supabase/client';

export interface SecurityLogData {
  form_type: string;
  honeypot_triggered: boolean;
  csrf_valid: boolean;
  recaptcha_score: number | null;
  ip_address: string | null;
  user_agent: string | null;
  submission_data: Record<string, any>;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  form_type: string;
}

const databaseService = {
  async getFormSecurityLogs() {
    const { data, error } = await supabase
      .from('form_security_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async logFormSecurity(securityData: SecurityLogData) {
    const { error } = await supabase
      .from('form_security_logs')
      .insert([securityData]);

    if (error) throw error;
  },

  async getFormSubmissions() {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async submitContactForm(formData: ContactFormData) {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([formData]);

    if (error) throw error;
  },

  async getWebsiteSettings() {
    const { data, error } = await supabase
      .from('website_settings')
      .select('*');

    if (error) throw error;
    return data || [];
  }
};

export { databaseService };
