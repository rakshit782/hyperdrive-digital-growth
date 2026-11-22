import { adminCall, publicCall } from '@/services/apiClient';

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
      await publicCall('security.log', { ...logData });
      this.clearSecurityLogsCache();
    } catch (error) {
      console.warn('Security log not saved:', error);
    }
  }

  async getSecurityLogs(limit: number = 100, forceRefresh: boolean = false): Promise<SecurityLog[]> {
    if (!forceRefresh) {
      const cached = this.getFromCache<SecurityLog[]>(CACHE_KEYS.SECURITY_LOGS, CACHE_KEYS.SECURITY_LOGS_TIMESTAMP);
      if (cached) return cached;
    }
    try {
      const { logs } = await adminCall<{ logs: SecurityLog[] }>('security_logs.list', { limit });
      this.setCache(CACHE_KEYS.SECURITY_LOGS, CACHE_KEYS.SECURITY_LOGS_TIMESTAMP, logs);
      return logs;
    } catch (err) {
      console.warn('Security logs not loaded:', err);
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
    if (!forceRefresh) {
      const cached = this.getFromCache<Lead[]>(CACHE_KEYS.LEADS, CACHE_KEYS.LEADS_TIMESTAMP);
      if (cached) return cached;
    }
    try {
      const { leads } = await adminCall<{ leads: Lead[] }>('leads.list', { limit });
      this.setCache(CACHE_KEYS.LEADS, CACHE_KEYS.LEADS_TIMESTAMP, leads);
      return leads;
    } catch (err) {
      console.warn('Leads not loaded:', err);
      return [];
    }
  }

  async deleteLead(id: string): Promise<boolean> {
    return this.deleteLeadsBulk([id]);
  }

  async deleteLeadsBulk(ids: string[]): Promise<boolean> {
    if (!ids || ids.length === 0) return true;
    await adminCall('leads.delete', { ids });
    this.clearLeadsCache();
    return true;
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
    if (!forceRefresh) {
      const cached = this.getFromCache<any[]>(CACHE_KEYS.CONTACTS, CACHE_KEYS.CONTACTS_TIMESTAMP);
      if (cached) return cached;
    }
    try {
      const { contacts } = await adminCall<{ contacts: any[] }>('contacts.list', { limit });
      this.setCache(CACHE_KEYS.CONTACTS, CACHE_KEYS.CONTACTS_TIMESTAMP, contacts);
      return contacts;
    } catch (err) {
      console.warn('Contacts not loaded:', err);
      return [];
    }
  }

  async deleteContact(id: string): Promise<boolean> {
    await adminCall('contacts.delete', { id });
    this.clearContactsCache();
    return true;
  }

  async getNewsletters(limit: number = 100): Promise<any[]> {
    try {
      const { emails } = await adminCall<{ emails: any[] }>('newsletter.list', { limit });
      return emails;
    } catch (err) {
      console.warn('Newsletter list not loaded:', err);
      return [];
    }
  }

  async deleteNewsletter(id: string): Promise<boolean> {
    await adminCall('newsletter.delete', { id });
    return true;
  }

  async pingNeon(): Promise<{
    ok: boolean;
    latencyMs: number;
    db?: string;
    version?: string;
    serverTime?: string;
    tablesCount?: number;
    error?: string;
  }> {
    const t0 = performance.now();
    try {
      const r = await adminCall<{ ok: boolean; db: string; version: string; serverTime: string; tablesCount: number }>('ping');
      return { ...r, latencyMs: Math.round(performance.now() - t0) };
    } catch (err: any) {
      return { ok: false, latencyMs: Math.round(performance.now() - t0), error: err?.message || 'Database check failed' };
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
