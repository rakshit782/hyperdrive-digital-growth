
// This service is deprecated - all functionality has been moved to Supabase
// Individual hooks now handle their own database operations
export const databaseService = {
  // Legacy compatibility - methods return empty arrays/null
  insertSecurityLog: async () => {},
  getSecurityLogs: async () => [],
  insertLead: async () => null,
  getLeads: async () => [],
  insertContactSubmission: async () => {},
  getContactSubmissions: async () => [],
  getWebsiteSettings: async () => [],
  updateWebsiteSetting: async () => {}
};
