
export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
  gradient?: string;
}

export interface ReviewCard {
  id: string;
  name: string;
  company: string;
  rating: number;
  text: string;
  avatar?: string;
}

export type DashboardTab = 
  | 'services'
  | 'service-pages'
  | 'reviews'
  | 'hero-customization'
  | 'website'
  | 'logo'
  | 'contact'
  | 'homepage'
  | 'about-us'
  | 'pricing'
  | 'blog'
  | 'header'
  | 'footer'
  | 'social-media'
  | 'stats'
  | 'policy-pages'
  | 'google-sheets'
  | 'cloudflare'
  | 'data-sync'
  | 'user-management'
  | 'website-preview'
  | 'integration-status'
  | 'integration-test'
  | 'facebook-pixel'
  | 'google-analytics'
  | 'chatgpt'
  | 'modern-features'
  | 'seo'
  | 'custom-events'
  | 'analytics-dashboard'
  | 'lead-management'
  | 'automation-settings'
  | 'content-management'
  | 'menu-management'
  | 'website-audit'
  | 'zapier-integration'
  | 'email-automation'
  | 'faq-management';

export interface DashboardConfig {
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  activeTab: DashboardTab;
}
