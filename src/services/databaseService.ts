
import { supabase } from '@/integrations/supabase/client';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  form_type: string;
}

const databaseService = {
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
