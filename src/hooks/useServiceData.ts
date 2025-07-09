
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

export interface ServiceCaseStudy {
  id: string;
  service_type: string;
  title: string;
  description: string;
  client_name: string;
  industry: string;
  results: Json;
  image_url?: string;
  is_featured: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceStat {
  id: string;
  service_type: string;
  stat_label: string;
  stat_value: string;
  stat_description?: string;
  icon_name?: string;
  sort_order: number;
  is_active: boolean;
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
  avatar_url?: string;
  results_achieved?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Mockup data for stats
const getMockStats = (serviceType: string): ServiceStat[] => [
  {
    id: '1',
    service_type: serviceType,
    stat_label: 'Average ROI Increase',
    stat_value: '450%',
    stat_description: 'Return on investment improvement',
    icon_name: 'TrendingUp',
    sort_order: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    service_type: serviceType,
    stat_label: 'Client Satisfaction',
    stat_value: '98%',
    stat_description: 'Happy clients rate',
    icon_name: 'Heart',
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    service_type: serviceType,
    stat_label: 'Projects Completed',
    stat_value: '1,200+',
    stat_description: 'Successful deliveries',
    icon_name: 'CheckCircle',
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    service_type: serviceType,
    stat_label: 'Years Experience',
    stat_value: '10+',
    stat_description: 'Industry expertise',
    icon_name: 'Award',
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mockup data for case studies
const getMockCaseStudies = (serviceType: string): ServiceCaseStudy[] => [
  {
    id: '1',
    service_type: serviceType,
    title: 'E-commerce Revenue Boost',
    description: 'Transformed a struggling online store into a profitable business through strategic optimization and targeted campaigns.',
    client_name: 'TechCorp Solutions',
    industry: 'E-commerce',
    results: { revenue_increase: '300%', conversion_rate: '15.2%', traffic_growth: '250%' },
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    is_featured: true,
    sort_order: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    service_type: serviceType,
    title: 'Brand Awareness Campaign',
    description: 'Launched a comprehensive brand awareness campaign that reached millions and increased market share significantly.',
    client_name: 'Fashion Forward Inc',
    industry: 'Fashion',
    results: { brand_awareness: '400%', reach: '2.5M', engagement: '180%' },
    image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
    is_featured: false,
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    service_type: serviceType,
    title: 'Lead Generation Success',
    description: 'Implemented a multi-channel lead generation strategy that tripled qualified leads within 6 months.',
    client_name: 'GrowthTech Ltd',
    industry: 'SaaS',
    results: { leads_generated: '850+', cost_per_lead: '-60%', conversion_rate: '22%' },
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    is_featured: true,
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    service_type: serviceType,
    title: 'Mobile App Launch',
    description: 'Successfully launched a mobile app with strategic marketing that achieved 100k downloads in the first month.',
    client_name: 'InnovateApp Co',
    industry: 'Mobile',
    results: { downloads: '100k+', app_rating: '4.8/5', user_retention: '75%' },
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    is_featured: false,
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    service_type: serviceType,
    title: 'Local Business Growth',
    description: 'Helped a local business expand to 5 new locations through targeted local marketing and optimization.',
    client_name: 'Local Heroes LLC',
    industry: 'Retail',
    results: { locations_opened: '5', local_traffic: '320%', sales_growth: '280%' },
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    is_featured: true,
    sort_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    service_type: serviceType,
    title: 'B2B Sales Transformation',
    description: 'Revolutionized B2B sales process with automation and strategic campaigns, resulting in record-breaking quarters.',
    client_name: 'Enterprise Plus',
    industry: 'B2B Services',
    results: { sales_increase: '450%', pipeline_value: '$2.5M', deal_size: '+180%' },
    image_url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    is_featured: false,
    sort_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '7',
    service_type: serviceType,
    title: 'Digital Transformation',
    description: 'Led complete digital transformation initiative that modernized operations and improved efficiency by 200%.',
    client_name: 'Traditional Corp',
    industry: 'Manufacturing',
    results: { efficiency_gain: '200%', cost_reduction: '40%', automation: '85%' },
    image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    is_featured: true,
    sort_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '8',
    service_type: serviceType,
    title: 'Market Expansion Success',
    description: 'Facilitated successful expansion into 3 new international markets with localized strategies.',
    client_name: 'Global Ventures',
    industry: 'International Trade',
    results: { new_markets: '3', international_revenue: '65%', market_share: '25%' },
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    is_featured: false,
    sort_order: 7,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mockup data for reviews
const getMockReviews = (serviceType: string): ServiceReview[] => [
  {
    id: '1',
    service_type: serviceType,
    client_name: 'Sarah Johnson',
    company: 'TechStart Inc',
    review_text: 'Absolutely incredible results! Our revenue increased by 300% within just 6 months. The team\'s expertise and dedication are unmatched.',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b593?w=100&h=100&fit=crop&crop=face',
    results_achieved: '300% revenue increase, 50% cost reduction',
    sort_order: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    service_type: serviceType,
    client_name: 'Michael Chen',
    company: 'Growth Solutions',
    review_text: 'Professional, efficient, and results-driven. They transformed our entire marketing approach and delivered beyond expectations.',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    results_achieved: '250% lead generation improvement',
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    service_type: serviceType,
    client_name: 'Emily Rodriguez',
    company: 'Digital Innovators',
    review_text: 'Outstanding service and remarkable outcomes. Our conversion rates improved dramatically and ROI exceeded all projections.',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    results_achieved: '400% ROI improvement, 180% conversion rate boost',
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    service_type: serviceType,
    client_name: 'David Thompson',
    company: 'Enterprise Solutions',
    review_text: 'Game-changing partnership! Their strategic approach and execution helped us dominate our market segment.',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    results_achieved: '500% market share growth',
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    service_type: serviceType,
    client_name: 'Lisa Wang',
    company: 'Future Tech Co',
    review_text: 'Exceptional expertise and customer service. They delivered results that transformed our business trajectory completely.',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    results_achieved: '350% business growth, expanded to 5 new markets',
    sort_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    service_type: serviceType,
    client_name: 'Robert Martinez',
    company: 'Scale Ventures',
    review_text: 'Incredible team with deep industry knowledge. They helped us scale our operations and achieve sustainable growth.',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    results_achieved: '600% operational efficiency, 200% profit margins',
    sort_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const useServiceData = (serviceType: string) => {
  const [caseStudies, setCaseStudies] = useState<ServiceCaseStudy[]>([]);
  const [stats, setStats] = useState<ServiceStat[]>([]);
  const [reviews, setReviews] = useState<ServiceReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        // Try to fetch from database first, fall back to mock data
        const { data: caseStudiesData } = await supabase
          .from('service_case_studies')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        const { data: statsData } = await supabase
          .from('service_stats')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        const { data: reviewsData } = await supabase
          .from('service_reviews')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        // Use database data if available, otherwise use mock data
        setCaseStudies(caseStudiesData && caseStudiesData.length > 0 ? caseStudiesData : getMockCaseStudies(serviceType));
        setStats(statsData && statsData.length > 0 ? statsData : getMockStats(serviceType));
        setReviews(reviewsData && reviewsData.length > 0 ? reviewsData : getMockReviews(serviceType));
      } catch (error) {
        console.error('Error fetching service data:', error);
        // Fall back to mock data on error
        setCaseStudies(getMockCaseStudies(serviceType));
        setStats(getMockStats(serviceType));
        setReviews(getMockReviews(serviceType));
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [serviceType]);

  return { caseStudies, stats, reviews, loading };
};
