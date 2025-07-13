
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type SecurityLog = Database['public']['Tables']['form_security_logs']['Row'];
export type FormSubmission = Database['public']['Tables']['contact_submissions']['Row'];

export const databaseService = {
  async getFormSecurityLogs() {
    const { data, error } = await supabase
      .from('form_security_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async logFormSecurity(securityData: {
    form_type: string;
    ip_address?: string;
    user_agent?: string;
    honeypot_triggered?: boolean;
    csrf_valid?: boolean;
    recaptcha_score?: number;
    submission_data?: any;
  }) {
    const { data, error } = await supabase
      .from('form_security_logs')
      .insert([securityData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getFormSubmissions() {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};
