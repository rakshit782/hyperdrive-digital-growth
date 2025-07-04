
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

  async testConnection(): Promise<boolean> {
    try {
      console.log('Testing PostgreSQL connection...');
      const response = await apiRequest(`${this.baseUrl}/api/health`, {
        method: 'GET',
      });

      const isConnected = response.ok;
      console.log(`PostgreSQL connection test: ${isConnected ? 'SUCCESS' : 'FAILED'}`);
      return isConnected;
    } catch (error) {
      console.error('PostgreSQL connection test failed:', error);
      return false;
    }
  }

  async insertLead(leadData: PostgresLeadData): Promise<any> {
    console.log('Inserting lead via PostgreSQL:', leadData);
    
    try {
      // Test connection first
      const isConnected = await this.testConnection();
      if (!isConnected) {
        throw new Error('Unable to connect to the database server. Please check if the backend service is running.');
      }

      const response = await apiRequest(`${this.baseUrl}/api/leads`, {
        method: 'POST',
        body: JSON.stringify(leadData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          message: `Server error: ${response.status} ${response.statusText}` 
        }));
        throw new Error(`Database insert failed: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('Lead inserted successfully:', result);
      return result;
    } catch (error) {
      console.error('PostgreSQL lead insertion error:', error);
      
      // Provide user-friendly error messages
      if (error.message.includes('Network error')) {
        throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
      } else if (error.message.includes('timeout')) {
        throw new Error('Request timed out. Please check your connection and try again.');
      } else if (error.message.includes('backend service')) {
        throw new Error('Database service is currently unavailable. Please try again later or contact support.');
      }
      
      throw error;
    }
  }

  async insertContactSubmission(contactData: PostgresContactData): Promise<any> {
    console.log('Inserting contact submission via PostgreSQL:', contactData);
    
    try {
      const response = await apiRequest(`${this.baseUrl}/api/contact-submissions`, {
        method: 'POST',
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
}

export const postgresService = new PostgresService();
