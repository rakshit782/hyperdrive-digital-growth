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

// Cache configuration
const CACHE_DURATION = 3 * 60 * 1000; // 3 minutes
const CACHE_KEYS = {
  LEADS: 'dashboard_leads_cache',
  LEADS_TIMESTAMP: 'dashboard_leads_cache_timestamp',
  CONTACTS: 'dashboard_contacts_cache',
  CONTACTS_TIMESTAMP: 'dashboard_contacts_cache_timestamp',
  SECURITY_LOGS: 'dashboard_security_logs_cache',
  SECURITY_LOGS_TIMESTAMP: 'dashboard_security_logs_cache_timestamp',
};

class DatabaseService {
  private apiUrl: string;

  constructor(apiUrl: string = '/api') {
    this.apiUrl = apiUrl;
  }

  // Generic cache helpers
  private getFromCache<T>(cacheKey: string, timestampKey: string): T | null {
    try {
      const cached = localStorage.getItem(cacheKey);
      const timestamp = localStorage.getItem(timestampKey);
      
      if (cached && timestamp) {
        const age = Date.now() - parseInt(timestamp);
        if (age < CACHE_DURATION) {
          return JSON.parse(cached);
        }
      }
    } catch (e) {
      console.error('Error reading cache:', e);
    }
    return null;
  }

  private setCache<T>(cacheKey: string, timestampKey: string, data: T): void {
    try {
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(timestampKey, Date.now().toString());
    } catch (e) {
      console.error('Error setting cache:', e);
    }
  }

  private clearCache(cacheKey: string, timestampKey: string): void {
    try {
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(timestampKey);
    } catch (e) {
      console.error('Error clearing cache:', e);
    }
  }

  // Clear all dashboard caches
  clearAllCaches(): void {
    Object.values(CACHE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Clear specific caches
  clearLeadsCache(): void {
    this.clearCache(CACHE_KEYS.LEADS, CACHE_KEYS.LEADS_TIMESTAMP);
  }

  clearContactsCache(): void {
    this.clearCache(CACHE_KEYS.CONTACTS, CACHE_KEYS.CONTACTS_TIMESTAMP);
  }

  clearSecurityLogsCache(): void {
    this.clearCache(CACHE_KEYS.SECURITY_LOGS, CACHE_KEYS.SECURITY_LOGS_TIMESTAMP);
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
      
      // Clear cache after insert
      this.clearSecurityLogsCache();
    } catch (error) {
      console.error('Database error - security log:', error);
      // Don't throw error to prevent form submission from failing
    }
  }

  async getSecurityLogs(limit: number = 100, forceRefresh: boolean = false): Promise<SecurityLog[]> {
    // Try cache first unless forced refresh
    if (!forceRefresh) {
      const cached = this.getFromCache<SecurityLog[]>(CACHE_KEYS.SECURITY_LOGS, CACHE_KEYS.SECURITY_LOGS_TIMESTAMP);
      if (cached) {
        console.log('Returning cached security logs');
        return cached;
      }
    }

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

      const logs = data?.logs || [];
      this.setCache(CACHE_KEYS.SECURITY_LOGS, CACHE_KEYS.SECURITY_LOGS_TIMESTAMP, logs);
      return logs;
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
      
      // Clear cache after insert
      this.clearLeadsCache();
      return result;
    } catch (error) {
      console.error('Database error - insert lead:', error);
      return null;
    }
  }

  async getLeads(limit: number = 100, forceRefresh: boolean = false): Promise<Lead[]> {
    // Try cache first unless forced refresh
    if (!forceRefresh) {
      const cached = this.getFromCache<Lead[]>(CACHE_KEYS.LEADS, CACHE_KEYS.LEADS_TIMESTAMP);
      if (cached) {
        console.log('Returning cached leads');
        return cached;
      }
    }

    try {
      const { data, error } = await supabase.functions.invoke('neon-leads', {
        body: {
          action: 'list',
          limit
        }
      });
      
      if (error) {
        throw error;
      }

      const leads = data?.leads || [];
      this.setCache(CACHE_KEYS.LEADS, CACHE_KEYS.LEADS_TIMESTAMP, leads);
      return leads;
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
      
      // Clear cache after insert
      this.clearContactsCache();
    } catch (error) {
      console.error('Database error - contact submission:', error);
      // Don't throw error to prevent form submission from failing
    }
  }

  async getContactSubmissions(limit: number = 100, forceRefresh: boolean = false): Promise<any[]> {
    // Try cache first unless forced refresh
    if (!forceRefresh) {
      const cached = this.getFromCache<any[]>(CACHE_KEYS.CONTACTS, CACHE_KEYS.CONTACTS_TIMESTAMP);
      if (cached) {
        console.log('Returning cached contacts');
        return cached;
      }
    }

    try {
      const { data, error } = await supabase.functions.invoke('neon-contacts', {
        body: {
          action: 'list',
          limit
        }
      });
      
      if (error) {
        throw error;
      }

      const contacts = data?.contacts || [];
      this.setCache(CACHE_KEYS.CONTACTS, CACHE_KEYS.CONTACTS_TIMESTAMP, contacts);
      return contacts;
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
