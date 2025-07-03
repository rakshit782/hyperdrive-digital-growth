
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

class DatabaseService {
  private apiUrl: string;

  constructor(apiUrl: string = '/api') {
    this.apiUrl = apiUrl;
  }

  async insertSecurityLog(logData: Omit<SecurityLog, 'id' | 'created_at'>): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/security-logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData)
      });

      if (!response.ok) {
        throw new Error('Failed to insert security log');
      }
    } catch (error) {
      console.error('Database error - security log:', error);
      // Don't throw error to prevent form submission from failing
    }
  }

  async getSecurityLogs(limit: number = 100): Promise<SecurityLog[]> {
    try {
      const response = await fetch(`${this.apiUrl}/security-logs?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch security logs');
      }

      return await response.json();
    } catch (error) {
      console.error('Database error - fetch security logs:', error);
      return [];
    }
  }

  async insertLead(leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead | null> {
    try {
      const response = await fetch(`${this.apiUrl}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData)
      });

      if (!response.ok) {
        throw new Error('Failed to insert lead');
      }

      return await response.json();
    } catch (error) {
      console.error('Database error - insert lead:', error);
      return null;
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
}

export const databaseService = new DatabaseService();
