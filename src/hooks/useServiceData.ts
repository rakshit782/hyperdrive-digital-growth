
import { useState, useEffect } from 'react';
import { mockStats, mockCaseStudies, mockReviews } from '@/data/mockServiceData';

export interface ServiceStat {
  id: string;
  service_type: string;
  stat_label: string;
  stat_value: string;
  stat_description: string;
  icon_name: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceCaseStudy {
  id: string;
  service_type: string;
  title: string;
  description: string;
  client_name: string;
  industry: string;
  image_url: string;
  results: Record<string, any>;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceReview {
  id: string;
  service_type: string;
  client_name: string;
  company: string;
  review_text: string;
  rating: number;
  avatar_url: string;
  results_achieved: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const useServiceData = (serviceType: string) => {
  const [loading, setLoading] = useState(false);
  
  // Map service type from URL to data key
  const getDataKey = (type: string) => {
    const mapping: Record<string, string> = {
      'google-advertising': 'google-advertising',
      'meta-advertising': 'meta-advertising',
      'amazon-advertising': 'amazon-advertising',
      'walmart-advertising': 'walmart-advertising',
      'shopify-development': 'shopify-development',
      'shopify-integration': 'shopify-integration',
      'website-development': 'website-development',
      'account-management': 'account-management'
    };
    return mapping[type] || type;
  };

  const dataKey = getDataKey(serviceType);
  
  // Get mock data based on service type
  const caseStudies = mockCaseStudies[dataKey] || [];
  const stats = mockStats[dataKey] || [];
  const reviews = mockReviews[dataKey] || [];

  return {
    caseStudies,
    stats,
    reviews,
    loading
  };
};
