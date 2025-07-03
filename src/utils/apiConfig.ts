
// Configuration for your PostgreSQL backend API
export const API_CONFIG = {
  // Update this URL to point to your PostgreSQL backend server
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  endpoints: {
    securityLogs: '/api/security-logs',
    leads: '/api/leads',
    contactSubmissions: '/api/contact-submissions',
    rss: '/api/rss',
    rssAll: '/api/rss/all',
    scrape: '/api/scrape',
    freeAudit: '/api/free-audit'
  },
  timeout: 60000 // 60 seconds for file uploads
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseUrl}${endpoint}`;
};

// Helper function for API requests with timeout
export const apiRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// PostgreSQL-specific configuration helpers
export const POSTGRES_CONFIG = {
  // Common PostgreSQL data types for reference
  dataTypes: {
    UUID: 'UUID',
    VARCHAR: 'VARCHAR',
    TEXT: 'TEXT',
    INTEGER: 'INTEGER',
    DECIMAL: 'DECIMAL',
    BOOLEAN: 'BOOLEAN',
    TIMESTAMP: 'TIMESTAMP WITH TIME ZONE',
    JSONB: 'JSONB',
    INET: 'INET'
  },
  
  // Default values for PostgreSQL
  defaults: {
    UUID_GENERATE: 'gen_random_uuid()',
    CURRENT_TIMESTAMP: 'CURRENT_TIMESTAMP',
    EMPTY_JSON: "'{}'::jsonb"
  }
};
