// Table Migration Status Log
export interface MigrationStatus {
  tableName: string;
  status: 'migrated' | 'pending' | 'not_applicable';
  supabaseTable: string;
  localStorageKey: string;
  notes: string;
}

export const MIGRATION_STATUS: MigrationStatus[] = [
  {
    tableName: 'Services',
    status: 'migrated',
    supabaseTable: 'public.services',
    localStorageKey: 'servicesData',
    notes: 'Fully migrated with real-time updates and RLS enabled'
  },
  {
    tableName: 'Reviews',
    status: 'migrated',
    supabaseTable: 'public.reviews',
    localStorageKey: 'reviewsData',
    notes: 'Fully migrated with real-time updates and RLS enabled'
  },
  {
    tableName: 'Stats',
    status: 'migrated',
    supabaseTable: 'public.stats',
    localStorageKey: 'statsData',
    notes: 'Fully migrated with real-time updates and RLS enabled'
  },
  {
    tableName: 'Case Studies',
    status: 'migrated',
    supabaseTable: 'public.case_studies',
    localStorageKey: 'caseStudiesData',
    notes: 'Fully migrated with real-time updates and RLS enabled'
  },
  {
    tableName: 'Blog Posts',
    status: 'migrated',
    supabaseTable: 'public.blog_posts',
    localStorageKey: 'blogPosts',
    notes: 'Migrated with RLS enabled and admin access controls'
  },
  {
    tableName: 'FAQs',
    status: 'migrated',
    supabaseTable: 'public.faqs',
    localStorageKey: 'faqsData',
    notes: 'Migrated with RLS enabled and admin access controls'
  },
  {
    tableName: 'Leads',
    status: 'migrated',
    supabaseTable: 'public.leads',
    localStorageKey: 'leads',
    notes: 'SECURED: RLS enabled, admin/editor access, automatic lead numbering'
  },
  {
    tableName: 'Newsletter Emails',
    status: 'migrated',
    supabaseTable: 'public.newsletter_emails',
    localStorageKey: 'newsletter_emails',
    notes: 'Migrated with public insert, authenticated read/manage'
  },
  {
    tableName: 'Contact Submissions',
    status: 'migrated',
    supabaseTable: 'public.contact_submissions',
    localStorageKey: 'contact_submissions',
    notes: 'SECURED: RLS enabled, admin-only access, public form submissions'
  },
  {
    tableName: 'Analytics Events',
    status: 'migrated',
    supabaseTable: 'public.analytics_events',
    localStorageKey: 'analytics_events',
    notes: 'Migrated with admin access controls and public tracking'
  },
  {
    tableName: 'Website Settings',
    status: 'migrated',
    supabaseTable: 'public.website_settings',
    localStorageKey: 'website_settings',
    notes: 'Migrated with authenticated access controls'
  },
  {
    tableName: 'Integrations',
    status: 'migrated',
    supabaseTable: 'public.integrations',
    localStorageKey: 'integrations',
    notes: 'Migrated with admin-only access controls'
  },
  {
    tableName: 'User Profiles',
    status: 'migrated',
    supabaseTable: 'public.profiles',
    localStorageKey: 'profiles',
    notes: 'SECURED: User-specific access with proper RLS policies'
  },
  {
    tableName: 'User Roles',
    status: 'migrated',
    supabaseTable: 'public.user_roles',
    localStorageKey: 'user_roles',
    notes: 'SECURED: Role-based access with admin controls'
  },
  {
    tableName: 'SEO Pages',
    status: 'migrated',
    supabaseTable: 'public.seo_pages',
    localStorageKey: 'seo_pages',
    notes: 'Migrated with authenticated access controls'
  },
  {
    tableName: 'Pricing Plans',
    status: 'migrated',
    supabaseTable: 'public.pricing_plans',
    localStorageKey: 'pricing_plans',
    notes: 'Migrated with admin access controls'
  },
  {
    tableName: 'Security Logs',
    status: 'migrated',
    supabaseTable: 'public.security_logs',
    localStorageKey: 'security_logs',
    notes: 'NEW: Security monitoring with admin-only access'
  }
];

export function getMigrationReport() {
  const migrated = MIGRATION_STATUS.filter(item => item.status === 'migrated');
  const pending = MIGRATION_STATUS.filter(item => item.status === 'pending');
  const notApplicable = MIGRATION_STATUS.filter(item => item.status === 'not_applicable');
  const secured = MIGRATION_STATUS.filter(item => item.notes.includes('SECURED') || item.notes.includes('NEW'));

  return {
    total: MIGRATION_STATUS.length,
    migrated: migrated.length,
    pending: pending.length,
    notApplicable: notApplicable.length,
    secured: secured.length,
    migratedTables: migrated.map(item => item.tableName),
    pendingTables: pending.map(item => item.tableName),
    securedTables: secured.map(item => item.tableName),
    completionPercentage: Math.round((migrated.length / MIGRATION_STATUS.length) * 100),
    securityPercentage: Math.round((secured.length / MIGRATION_STATUS.length) * 100)
  };
}

export function logMigrationStatus() {
  const report = getMigrationReport();
  
  console.group('🚀 Supabase Migration & Security Status');
  console.log(`✅ Migration Complete: ${report.completionPercentage}%`);
  console.log(`🔒 Security Enhanced: ${report.securityPercentage}%`);
  console.log(`📊 Total Tables: ${report.total}`);
  console.log(`✅ Migrated: ${report.migrated}`);
  console.log(`🔒 Secured: ${report.secured}`);
  console.log(`⏳ Pending: ${report.pending}`);
  console.log(`➖ Not Applicable: ${report.notApplicable}`);
  
  if (report.migratedTables.length > 0) {
    console.log('✅ Migrated Tables:', report.migratedTables.join(', '));
  }
  
  if (report.securedTables.length > 0) {
    console.log('🔒 Security Enhanced Tables:', report.securedTables.join(', '));
  }
  
  if (report.pendingTables.length > 0) {
    console.log('⏳ Pending Tables:', report.pendingTables.join(', '));
  }
  
  console.groupEnd();
  
  return report;
}
