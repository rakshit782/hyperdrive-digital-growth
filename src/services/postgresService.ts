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
    // Since forms are removed, this service is no longer actively used
    // Keeping minimal structure for potential future database operations
    this.baseUrl = '';
  }

  async testConnection(): Promise<boolean> {
    console.log('PostgreSQL service disabled - forms have been removed');
    return false;
  }

  async insertLead(leadData: PostgresLeadData): Promise<any> {
    console.log('Lead insertion disabled - forms have been removed');
    throw new Error('Form submission functionality has been disabled');
  }

  async insertContactSubmission(contactData: PostgresContactData): Promise<any> {
    console.log('Contact submission disabled - forms have been removed');
    throw new Error('Form submission functionality has been disabled');
  }
}

export const postgresService = new PostgresService();
