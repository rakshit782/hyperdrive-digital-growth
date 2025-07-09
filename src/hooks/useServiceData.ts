
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
  
  // Get mock data based on service type
  const caseStudies = mockCaseStudies[serviceType] || [];
  const stats = mockStats[serviceType] || [];
  const reviews = mockReviews[serviceType] || [];

  return {
    caseStudies,
    stats,
    reviews,
    loading
  };
};
