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
  | 'menu-management'
  | 'footer'
  | 'social-media'
  | 'stats'
  | 'policy-pages'
  | 'google-sheets'
  | 'amplify'
  | 'cognito'
  | 'dynamodb'
  | 's3'
  | 'ses'
  | 'cloudflare'
  | 'user-management'
  | 'website-preview'
  | 'website-audit'
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
  | 'zapier-integration'
  | 'email-automation'
  | 'faq-management';

export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  bgGradient: string;
  link: string;
}

export interface Review {
  id: string;
  name: string;
  company: string;
  rating: number;
  review: string;
  avatar?: string;
}
