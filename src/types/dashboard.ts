
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
  avatar: string;
}

export type DashboardTab = 
  | 'services' 
  | 'reviews' 
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
  | 'amplify' 
  | 'cognito' 
  | 'dynamodb' 
  | 's3' 
  | 'ses' 
  | 'cloudflare' 
  | 'user-management' 
  | 'integration-status' 
  | 'integration-test' 
  | 'facebook-pixel' 
  | 'google-analytics' 
  | 'chatgpt' 
  | 'modern-features' 
  | 'seo' 
  | 'custom-events'
  | 'hero-customization';
