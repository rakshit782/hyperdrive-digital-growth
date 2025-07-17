
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
    notes: 'Fully migrated with real-time updates'
  },
  {
    tableName: 'Reviews',
    status: 'migrated',
    supabaseTable: 'public.reviews',
    localStorageKey: 'reviewsData',
    notes: 'Fully migrated with real-time updates'
  },
  {
    tableName: 'Stats',
    status: 'migrated',
    supabaseTable: 'public.stats',
    localStorageKey: 'statsData',
    notes: 'Fully migrated with real-time updates'
  },
  {
    tableName: 'Case Studies',
    status: 'migrated',
    supabaseTable: 'public.case_studies',
    localStorageKey: 'caseStudiesData',
    notes: 'Fully migrated with real-time updates'
  },
  {
    tableName: 'Blog Posts',
    status: 'migrated',
    supabaseTable: 'public.blog_posts',
    localStorageKey: 'blogPosts',
    notes: 'Already existed in Supabase, using existing table'
  },
  {
    tableName: 'FAQs',
    status: 'migrated',
    supabaseTable: 'public.faqs',
    localStorageKey: 'faqsData',
    notes: 'Already existed in Supabase, using existing table'
  },
  {
    tableName: 'Leads',
    status: 'migrated',
    supabaseTable: 'public.leads',
    localStorageKey: 'leads',
    notes: 'Already existed in Supabase, using existing table'
  },
  {
    tableName: 'Newsletter Emails',
    status: 'migrated',
    supabaseTable: 'public.newsletter_emails',
    localStorageKey: 'newsletter_emails',
    notes: 'Already existed in Supabase, using existing table'
  },
  {
    tableName: 'Contact Submissions',
    status: 'migrated',
    supabaseTable: 'public.contact_submissions',
    localStorageKey: 'contact_submissions',
    notes: 'Already existed in Supabase, using existing table'
  },
  {
    tableName: 'Analytics Events',
    status: 'migrated',
    supabaseTable: 'public.analytics_events',
    localStorageKey: 'analytics_events',
    notes: 'Already existed in Supabase, using existing table'
  },
  {
    tableName: 'Website Settings',
    status: 'migrated',
    supabaseTable: 'public.website_settings',
    localStorageKey: 'website_settings',
    notes: 'Already existed in Supabase, using existing table'
  },
  {
    tableName: 'Integrations',
    status: 'migrated',
    supabaseTable: 'public.integrations',
    localStorageKey: 'integrations',
    notes: 'Already existed in Supabase, using existing table'
  },
  {
    tableName: 'User Profiles',
    status: 'migrated',
    supabaseTable: 'public.profiles',
    localStorageKey: 'profiles',
    notes: 'Already existed in Supabase, using existing table'
  },
  {
    tableName: 'User Roles',
    status: 'migrated',
    supabaseTable: 'public.user_roles',
    localStorageKey: 'user_roles',
    notes: 'Already existed in Supabase, using existing table'
  },
  {
    tableName: 'SEO Pages',
    status: 'migrated',
    supabaseTable: 'public.seo_pages',
    localStorageKey: 'seo_pages',
    notes: 'Already existed in Supabase, using existing table'
  },
  {
    tableName: 'Pricing Plans',
    status: 'migrated',
    supabaseTable: 'public.pricing_plans',
    localStorageKey: 'pricing_plans',
    notes: 'Already existed in Supabase, using existing table'
  }
];

export function getMigrationReport() {
  const migrated = MIGRATION_STATUS.filter(item => item.status === 'migrated');
  const pending = MIGRATION_STATUS.filter(item => item.status === 'pending');
  const notApplicable = MIGRATION_STATUS.filter(item => item.status === 'not_applicable');

  return {
    total: MIGRATION_STATUS.length,
    migrated: migrated.length,
    pending: pending.length,
    notApplicable: notApplicable.length,
    migratedTables: migrated.map(item => item.tableName),
    pendingTables: pending.map(item => item.tableName),
    completionPercentage: Math.round((migrated.length / MIGRATION_STATUS.length) * 100)
  };
}

export function logMigrationStatus() {
  const report = getMigrationReport();
  
  console.group('🚀 Supabase Migration Status');
  console.log(`✅ Migration Complete: ${report.completionPercentage}%`);
  console.log(`📊 Total Tables: ${report.total}`);
  console.log(`✅ Migrated: ${report.migrated}`);
  console.log(`⏳ Pending: ${report.pending}`);
  console.log(`➖ Not Applicable: ${report.notApplicable}`);
  
  if (report.migratedTables.length > 0) {
    console.log('✅ Migrated Tables:', report.migratedTables.join(', '));
  }
  
  if (report.pendingTables.length > 0) {
    console.log('⏳ Pending Tables:', report.pendingTables.join(', '));
  }
  
  console.groupEnd();
  
  return report;
}
