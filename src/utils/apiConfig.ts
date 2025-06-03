
// Configuration for your backend API
export const API_CONFIG = {
  // Update this URL to point to your actual backend server
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  endpoints: {
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
