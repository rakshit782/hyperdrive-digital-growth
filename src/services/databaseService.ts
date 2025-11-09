import { supabase } from '@/integrations/supabase/client';

// Generic database service for SQL operations
export interface SecurityLog {
  id: string;
  form_type: string;
  ip_address: string | null;
  user_agent: string | null;
  recaptcha_score: number | null;
  honeypot_triggered: boolean | null;
  csrf_valid: boolean | null;
  submission_data: any;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  source: string | null;
  status: string;
  notes: string | null;
  form_security: any;
  lead_data: any;
  created_at: string;
  updated_at: string | null;
}

export interface WebsiteSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  setting_type: string | null;
  created_at: string | null;
  updated_at: string | null;
}

class DatabaseService {
  private apiUrl: string;

  constructor(apiUrl: string = '/api') {
    this.apiUrl = apiUrl;
  }

  async insertSecurityLog(logData: Omit<SecurityLog, 'id' | 'created_at'>): Promise<void> {
    try {
      const { error } = await supabase.functions.invoke('neon-security-logs', {
        body: {
          action: 'insert',
          logData
        }
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Database error - security log:', error);
      // Don't throw error to prevent form submission from failing
    }
  }

  async getSecurityLogs(limit: number = 100): Promise<SecurityLog[]> {
    try {
      const { data, error } = await supabase.functions.invoke('neon-security-logs', {
        body: {
          action: 'list',
          limit
        }
      });
      
      if (error) {
        throw error;
      }

      return data?.logs || [];
    } catch (error) {
      console.error('Database error - fetch security logs:', error);
      return [];
    }
  }

  async insertLead(leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead | null> {
    try {
      console.log('Inserting lead data:', leadData);
      
      const response = await fetch(`${this.apiUrl}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to insert lead:', response.status, errorText);
        throw new Error(`Failed to insert lead: ${response.status}`);
      }

      const result = await response.json();
      console.log('Lead inserted successfully:', result);
      return result;
    } catch (error) {
      console.error('Database error - insert lead:', error);
      return null;
    }
  }

  async getLeads(limit: number = 100): Promise<Lead[]> {
    try {
      const response = await fetch(`${this.apiUrl}/leads?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }

      return await response.json();
    } catch (error) {
      console.error('Database error - fetch leads:', error);
      return [];
    }
  }

  async insertContactSubmission(contactData: {
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    message: string | null;
    form_type: string;
  }): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/contact-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error('Failed to insert contact submission');
      }
    } catch (error) {
      console.error('Database error - contact submission:', error);
      // Don't throw error to prevent form submission from failing
    }
  }

  async getContactSubmissions(limit: number = 100): Promise<any[]> {
    try {
      const response = await fetch(`${this.apiUrl}/contact-submissions?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch contact submissions');
      }

      return await response.json();
    } catch (error) {
      console.error('Database error - fetch contact submissions:', error);
      return [];
    }
  }

  async getWebsiteSettings(): Promise<WebsiteSetting[]> {
    try {
      const response = await fetch(`${this.apiUrl}/website-settings`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch website settings');
      }

      return await response.json();
    } catch (error) {
      console.error('Database error - fetch website settings:', error);
      return [];
    }
  }

  async updateWebsiteSetting(key: string, value: any): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/website-settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          setting_key: key,
          setting_value: value
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update website setting');
      }
    } catch (error) {
      console.error('Database error - update website setting:', error);
      throw error;
    }
  }
}

export const databaseService = new DatabaseService();
