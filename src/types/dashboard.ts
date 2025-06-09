
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

export type DashboardTab = 
  | 'services' 
  | 'reviews' 
  | 'website' 
  | 'logo' 
  | 'contact' 
  | 'homepage' 
  | 'pricing' 
  | 'blog' 
  | 'custom-events' 
  | 'seo' 
  | 'header' 
  | 'facebook-pixel' 
  | 'clerk' 
  | 'auth0' 
  | 'google-analytics' 
  | 'emailjs' 
  | 'formspree';
