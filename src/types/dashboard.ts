
export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
  gradient?: string;
  bgGradient?: string;
  link?: string;
}

export interface Review {
  id: string;
  name: string;
  company: string;
  rating: number;
  review: string;
  avatar?: string;
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
  | 'homepage-customization'
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
  | 'faq-management'
  | 'hero-slider'
  | 'cta-management'
  | 'footer-management'
  | 'blog-management'
  | 'leads'
  | 'contact-management'
  | 'email-workflow'
  | 'form-security'
  | 'service-header-images'
  | 'clientele-management'
  | 'pricing-management'
  | 'website-integrations';

export interface DashboardConfig {
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  activeTab: DashboardTab;
}

export interface ServicesTabProps {
  services: ServiceCard[];
  onEdit: (service: ServiceCard) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export interface ReviewsTabProps {
  reviews: Review[];
  updateReviews: (reviews: Review[]) => void;
}
