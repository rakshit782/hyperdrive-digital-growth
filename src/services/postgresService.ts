
import { API_CONFIG, apiRequest } from '@/utils/apiConfig';

export interface PostgresLeadData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes?: string;
  form_security?: Record<string, any>;
  lead_data: Record<string, any>;
}

export interface PostgresContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  form_type: string;
}

class PostgresService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
  }

  async insertLead(leadData: PostgresLeadData): Promise<any> {
    console.log('Inserting lead via PostgreSQL:', leadData);
    
    try {
      const response = await apiRequest(`${this.baseUrl}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`PostgreSQL insert failed: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('Lead inserted successfully:', result);
      return result;
    } catch (error) {
      console.error('PostgreSQL lead insertion error:', error);
      throw error;
    }
  }

  async insertContactSubmission(contactData: PostgresContactData): Promise<any> {
    console.log('Inserting contact submission via PostgreSQL:', contactData);
    
    try {
      const response = await apiRequest(`${this.baseUrl}/api/contact-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`PostgreSQL contact submission failed: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('Contact submission inserted successfully:', result);
      return result;
    } catch (error) {
      console.error('PostgreSQL contact submission error:', error);
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await apiRequest(`${this.baseUrl}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      return response.ok;
    } catch (error) {
      console.error('PostgreSQL connection test failed:', error);
      return false;
    }
  }
}

export const postgresService = new PostgresService();
