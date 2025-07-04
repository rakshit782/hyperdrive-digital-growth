
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
    freeAudit: '/api/free-audit',
    health: '/api/health'
  },
  timeout: 30000 // 30 seconds
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseUrl}${endpoint}`;
};

// Helper function for API requests with better error handling
export const apiRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
  
  console.log(`Making API request to: ${url}`);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    clearTimeout(timeoutId);
    console.log(`API response status: ${response.status}`);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`API request failed for ${url}:`, error);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please check your connection and try again');
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error - unable to connect to the server. Please check if the backend is running.');
    }
    
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
