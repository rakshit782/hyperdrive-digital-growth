import { ServiceStat, ServiceCaseStudy, ServiceReview } from '@/hooks/useServiceData';

export const mockStats: Record<string, ServiceStat[]> = {
  'google-advertising': [
    {
      id: '1',
      service_type: 'google-advertising',
      stat_label: 'Average ROAS',
      stat_value: '650%',
      stat_description: 'Return on ad spend across all campaigns',
      icon_name: 'TrendingUp',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      service_type: 'google-advertising',
      stat_label: 'Cost Per Click Reduction',
      stat_value: '45%',
      stat_description: 'Average CPC decrease through optimization',
      icon_name: 'MousePointer',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      service_type: 'google-advertising',
      stat_label: 'Conversion Rate Increase',
      stat_value: '87%',
      stat_description: 'Improvement in conversion rates',
      icon_name: 'Target',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '4',
      service_type: 'google-advertising',
      stat_label: 'Quality Score',
      stat_value: '9.2/10',
      stat_description: 'Average Google Ads Quality Score',
      icon_name: 'Award',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'meta': [
    {
      id: '5',
      service_type: 'meta',
      stat_label: 'Reach Increase',
      stat_value: '340%',
      stat_description: 'Average reach improvement',
      icon_name: 'Users',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '6',
      service_type: 'meta',
      stat_label: 'Engagement Rate',
      stat_value: '12.5%',
      stat_description: 'Average engagement rate',
      icon_name: 'Heart',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '7',
      service_type: 'meta',
      stat_label: 'CPM Reduction',
      stat_value: '38%',
      stat_description: 'Cost per thousand impressions decrease',
      icon_name: 'DollarSign',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '8',
      service_type: 'meta',
      stat_label: 'Click-Through Rate',
      stat_value: '8.9%',
      stat_description: 'Average CTR across campaigns',
      icon_name: 'MousePointer',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'amazon': [
    {
      id: '9',
      service_type: 'amazon',
      stat_label: 'Sales Growth',
      stat_value: '290%',
      stat_description: 'Average sales increase',
      icon_name: 'ShoppingCart',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '10',
      service_type: 'amazon',
      stat_label: 'ACoS Optimization',
      stat_value: '32%',
      stat_description: 'Advertising Cost of Sales reduction',
      icon_name: 'Percent',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '11',
      service_type: 'amazon',
      stat_label: 'Keyword Ranking',
      stat_value: 'Top 3',
      stat_description: 'Average ranking for target keywords',
      icon_name: 'Search',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '12',
      service_type: 'amazon',
      stat_label: 'Product Visibility',
      stat_value: '520%',
      stat_description: 'Increase in product impressions',
      icon_name: 'Eye',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'walmart': [
    {
      id: '13',
      service_type: 'walmart',
      stat_label: 'Revenue Growth',
      stat_value: '425%',
      stat_description: 'Average revenue increase',
      icon_name: 'TrendingUp',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '14',
      service_type: 'walmart',
      stat_label: 'Item Performance',
      stat_value: '78%',
      stat_description: 'Improvement in item performance score',
      icon_name: 'BarChart3',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '15',
      service_type: 'walmart',
      stat_label: 'Search Visibility',
      stat_value: '340%',
      stat_description: 'Increase in search visibility',
      icon_name: 'Search',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '16',
      service_type: 'walmart',
      stat_label: 'Ad Spend Efficiency',
      stat_value: '55%',
      stat_description: 'Reduction in wasted ad spend',
      icon_name: 'DollarSign',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'shopify-development': [
    {
      id: '17',
      service_type: 'shopify-development',
      stat_label: 'Page Load Speed',
      stat_value: '2.1s',
      stat_description: 'Average page load time',
      icon_name: 'Zap',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '18',
      service_type: 'shopify-development',
      stat_label: 'Conversion Rate',
      stat_value: '4.8%',
      stat_description: 'Average store conversion rate',
      icon_name: 'ShoppingBag',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '19',
      service_type: 'shopify-development',
      stat_label: 'Mobile Optimization',
      stat_value: '98%',
      stat_description: 'Mobile performance score',
      icon_name: 'Smartphone',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '20',
      service_type: 'shopify-development',
      stat_label: 'Security Score',
      stat_value: '99.5%',
      stat_description: 'Security and compliance rating',
      icon_name: 'Shield',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'shopify-integration': [
    {
      id: '21',
      service_type: 'shopify-integration',
      stat_label: 'Integration Success',
      stat_value: '99.9%',
      stat_description: 'Successful integration rate',
      icon_name: 'Link',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '22',
      service_type: 'shopify-integration',
      stat_label: 'Data Sync Speed',
      stat_value: '15min',
      stat_description: 'Average data synchronization time',
      icon_name: 'RefreshCw',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '23',
      service_type: 'shopify-integration',
      stat_label: 'API Reliability',
      stat_value: '99.8%',
      stat_description: 'API uptime and reliability',
      icon_name: 'Database',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '24',
      service_type: 'shopify-integration',
      stat_label: 'Error Reduction',
      stat_value: '94%',
      stat_description: 'Reduction in integration errors',
      icon_name: 'CheckCircle',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'website-development': [
    {
      id: '25',
      service_type: 'website-development',
      stat_label: 'Performance Score',
      stat_value: '95/100',
      stat_description: 'Average PageSpeed Insights score',
      icon_name: 'Gauge',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '26',
      service_type: 'website-development',
      stat_label: 'SEO Score',
      stat_value: '92/100',
      stat_description: 'Average SEO optimization score',
      icon_name: 'Search',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '27',
      service_type: 'website-development',
      stat_label: 'Accessibility',
      stat_value: '96%',
      stat_description: 'WCAG compliance score',
      icon_name: 'Users',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '28',
      service_type: 'website-development',
      stat_label: 'User Satisfaction',
      stat_value: '4.9/5',
      stat_description: 'Average client satisfaction rating',
      icon_name: 'Star',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'account-management': [
    {
      id: '29',
      service_type: 'account-management',
      stat_label: 'Client Retention',
      stat_value: '98%',
      stat_description: 'Annual client retention rate',
      icon_name: 'UserCheck',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '30',
      service_type: 'account-management',
      stat_label: 'Response Time',
      stat_value: '< 2hrs',
      stat_description: 'Average response time to client queries',
      icon_name: 'Clock',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '31',
      service_type: 'account-management',
      stat_label: 'Growth Rate',
      stat_value: '156%',
      stat_description: 'Average client business growth',
      icon_name: 'TrendingUp',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '32',
      service_type: 'account-management',
      stat_label: 'Satisfaction Score',
      stat_value: '4.8/5',
      stat_description: 'Client satisfaction rating',
      icon_name: 'Heart',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ]
};

export const mockCaseStudies: Record<string, ServiceCaseStudy[]> = {
  'google-advertising': [
    {
      id: '1',
      service_type: 'google-advertising',
      title: 'E-commerce ROAS Breakthrough',
      description: 'Transformed underperforming Google Ads campaigns for a home decor retailer, achieving 850% ROAS through strategic keyword optimization and audience targeting.',
      client_name: 'HomeStyle Plus',
      industry: 'E-commerce',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      results: {
        roas: '850%',
        cpc_reduction: '52%',
        conversion_increase: '245%'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      service_type: 'google-advertising',
      title: 'Local Service Provider Growth',
      description: 'Helped a plumbing service dominate local search results with targeted Google Ads, increasing their customer base by 300% in 6 months.',
      client_name: 'ProFix Plumbing',
      industry: 'Local Services',
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
      results: {
        leads_increase: '300%',
        cost_per_lead: '65% lower',
        service_area_expansion: '3x'
      },
      is_active: true,
      is_featured: false,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      service_type: 'google-advertising',
      title: 'SaaS Lead Generation Success',
      description: 'Optimized Google Ads strategy for a B2B software company, resulting in qualified leads at 40% lower cost per acquisition.',
      client_name: 'TechFlow Solutions',
      industry: 'SaaS',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      results: {
        cpa_reduction: '40%',
        lead_quality: '85% qualified',
        sales_pipeline: '200% increase'
      },
      is_active: true,
      is_featured: false,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '4',
      service_type: 'google-advertising',
      title: 'Healthcare Practice Expansion',
      description: 'Launched Google Ads campaigns for a dental practice, increasing new patient appointments by 180% while maintaining HIPAA compliance.',
      client_name: 'Bright Smile Dental',
      industry: 'Healthcare',
      image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      results: {
        new_patients: '180% increase',
        appointment_booking: '90% online',
        practice_revenue: '150% growth'
      },
      is_active: true,
      is_featured: false,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '5',
      service_type: 'google-advertising',
      title: 'Real Estate Lead Domination',
      description: 'Created high-converting Google Ads for a real estate agency, generating premium leads and closing deals worth $2.3M in additional revenue.',
      client_name: 'Prime Realty Group',
      industry: 'Real Estate',
      image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
      results: {
        revenue_generated: '$2.3M',
        lead_conversion: '15% higher',
        cost_per_lead: '45% reduction'
      },
      is_active: true,
      is_featured: false,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '6',
      service_type: 'google-advertising',
      title: 'Fashion Brand Breakthrough',
      description: 'Revamped Google Shopping campaigns for a fashion retailer, achieving 450% increase in online sales during peak season.',
      client_name: 'Urban Threads',
      industry: 'Fashion',
      image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
      results: {
        sales_increase: '450%',
        shopping_ads_roas: '680%',
        brand_awareness: '200% lift'
      },
      is_active: true,
      is_featured: false,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '7',
      service_type: 'google-advertising',
      title: 'Fitness Studio Growth',
      description: 'Developed location-based Google Ads strategy for fitness studios, increasing membership sign-ups by 275% across 5 locations.',
      client_name: 'FitZone Studios',
      industry: 'Fitness',
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      results: {
        membership_growth: '275%',
        cost_per_acquisition: '55% lower',
        retention_rate: '85% higher'
      },
      is_active: true,
      is_featured: false,
      sort_order: 7,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '8',
      service_type: 'google-advertising',
      title: 'Food Delivery Service Scale',
      description: 'Optimized Google Ads for a local food delivery service, expanding their market reach and increasing orders by 320%.',
      client_name: 'QuickBite Delivery',
      industry: 'Food Service',
      image_url: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&h=250&fit=crop',
      results: {
        order_increase: '320%',
        delivery_radius: '2x expansion',
        customer_acquisition: '65% more efficient'
      },
      is_active: true,
      is_featured: false,
      sort_order: 8,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'meta': [],
  'amazon': [],
  'walmart': [],
  'shopify-development': [],
  'shopify-integration': [],
  'website-development': [],
  'account-management': []
};

export const mockReviews: Record<string, ServiceReview[]> = {
  'google-advertising': [
    {
      id: '1',
      service_type: 'google-advertising',
      client_name: 'Sarah Mitchell',
      company: 'HomeStyle Plus',
      review_text: 'The Google Ads team transformed our struggling campaigns into our biggest revenue driver. We went from barely breaking even to achieving 850% ROAS. Their keyword research and audience targeting strategies are exceptional.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      results_achieved: '850% ROAS, 52% CPC reduction',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      service_type: 'google-advertising',
      client_name: 'Mike Rodriguez',
      company: 'ProFix Plumbing',
      review_text: 'Outstanding results! They helped us dominate local search and increased our customer base by 300%. The team understands local service businesses and knows how to make Google Ads work for us.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      results_achieved: '300% increase in leads, 65% lower cost per lead',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      service_type: 'google-advertising',
      client_name: 'Jennifer Chen',
      company: 'TechFlow Solutions',
      review_text: 'Their B2B Google Ads expertise is unmatched. They reduced our cost per acquisition by 40% while improving lead quality dramatically. Our sales team is thrilled with the results.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      results_achieved: '40% CPA reduction, 85% qualified leads',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '4',
      service_type: 'google-advertising',
      client_name: 'Dr. Amanda Foster',
      company: 'Bright Smile Dental',
      review_text: 'Professional, compliant, and effective. They increased our new patient appointments by 180% while ensuring all campaigns met healthcare advertising requirements. Excellent communication throughout.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      results_achieved: '180% increase in new patients, 90% online bookings',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '5',
      service_type: 'google-advertising',
      client_name: 'Robert Thompson',
      company: 'Prime Realty Group',
      review_text: 'Game-changing results for our real estate business. Their Google Ads campaigns generated $2.3M in additional revenue and the lead quality is outstanding. Best investment we\'ve made.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      results_achieved: '$2.3M revenue generated, 15% higher conversion rate',
      is_active: true,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '6',
      service_type: 'google-advertising',
      client_name: 'Lisa Park',
      company: 'Urban Threads',
      review_text: 'Their Google Shopping campaigns drove a 450% increase in our online sales. The team really understands fashion retail and seasonal marketing. Highly recommend for e-commerce businesses.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      results_achieved: '450% sales increase, 680% Shopping ads ROAS',
      is_active: true,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'meta': [],
  'amazon': [],
  'walmart': [],
  'shopify-development': [],
  'shopify-integration': [],
  'website-development': [],
  'account-management': []
};
