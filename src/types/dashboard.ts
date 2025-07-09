
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
  | 'homepage-customization'
  | 'pricing'
  | 'blog'
  | 'footer'
  | 'stats'
  | 'integration-status'
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
  | 'cta-management'
  | 'footer-management'
  | 'blog-management'
  | 'leads'
  | 'contact-management'
  | 'newsletter-email-management'
  | 'email-workflow'
  | 'form-security'
  | 'service-header-images'
  | 'clientele-management'
  | 'pricing-management'
  | 'website-integrations'
  | 'security-settings';

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
