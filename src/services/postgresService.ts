
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

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes?: string;
  form_security?: Record<string, any>;
  lead_data?: Record<string, any>;
  created_at: string;
  updated_at?: string;
}

class PostgresService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
  }

  async testConnection(): Promise<boolean> {
    try {
      console.log('Testing PostgreSQL connection...');
      const response = await apiRequest(`${this.baseUrl}${API_CONFIG.endpoints.health}`, {
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
      const isConnected = await this.testConnection();
      if (!isConnected) {
        throw new Error('Unable to connect to the database server. Please check if the backend service is running.');
      }

      const response = await apiRequest(`${this.baseUrl}${API_CONFIG.endpoints.leads}`, {
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
      
      if (error.message.includes('Network error') || error.message.includes('connect')) {
        throw new Error('Unable to connect to the server. Please check your internet connection and ensure the backend service is running.');
      } else if (error.message.includes('timeout')) {
        throw new Error('Request timed out. Please check your connection and try again.');
      }
      
      throw error;
    }
  }

  async getLeads(): Promise<Lead[]> {
    console.log('Fetching leads from PostgreSQL...');
    
    try {
      const response = await apiRequest(`${this.baseUrl}${API_CONFIG.endpoints.leads}`, {
        method: 'GET'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`Failed to fetch leads: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('Leads fetched successfully:', result);
      return result.data || result;
    } catch (error) {
      console.error('PostgreSQL leads fetch error:', error);
      throw error;
    }
  }

  async updateLead(id: string, leadData: Partial<PostgresLeadData>): Promise<any> {
    console.log('Updating lead via PostgreSQL:', id, leadData);
    
    try {
      const response = await apiRequest(`${this.baseUrl}${API_CONFIG.endpoints.leads}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(leadData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`Failed to update lead: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('Lead updated successfully:', result);
      return result;
    } catch (error) {
      console.error('PostgreSQL lead update error:', error);
      throw error;
    }
  }

  async deleteLead(id: string): Promise<any> {
    console.log('Deleting lead via PostgreSQL:', id);
    
    try {
      const response = await apiRequest(`${this.baseUrl}${API_CONFIG.endpoints.leads}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`Failed to delete lead: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('Lead deleted successfully:', result);
      return result;
    } catch (error) {
      console.error('PostgreSQL lead delete error:', error);
      throw error;
    }
  }

  async insertContactSubmission(contactData: PostgresContactData): Promise<any> {
    console.log('Inserting contact submission via PostgreSQL:', contactData);
    
    try {
      const response = await apiRequest(`${this.baseUrl}${API_CONFIG.endpoints.contactSubmissions}`, {
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
