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
  'meta-advertising': [
    {
      id: '5',
      service_type: 'meta-advertising',
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
      service_type: 'meta-advertising',
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
      service_type: 'meta-advertising',
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
      service_type: 'meta-advertising',
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
  'amazon-advertising': [
    {
      id: '9',
      service_type: 'amazon-advertising',
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
      service_type: 'amazon-advertising',
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
      service_type: 'amazon-advertising',
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
      service_type: 'amazon-advertising',
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
  'walmart-advertising': [
    {
      id: '13',
      service_type: 'walmart-advertising',
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
      service_type: 'walmart-advertising',
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
      service_type: 'walmart-advertising',
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
      service_type: 'walmart-advertising',
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
  'meta-advertising': [
    {
      id: '101',
      service_type: 'meta-advertising',
      title: 'Fashion Brand Viral Campaign',
      description: 'Created viral Facebook and Instagram campaigns for a fashion startup, reaching 2.5M users and generating 340% increase in online sales.',
      client_name: 'TrendCo Fashion',
      industry: 'Fashion',
      image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
      results: {
        reach: '2.5M users',
        sales_increase: '340%',
        engagement_rate: '15.8%'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '102',
      service_type: 'meta-advertising',
      title: 'Restaurant Chain Expansion',
      description: 'Helped a local restaurant chain expand to 5 new locations through targeted Meta advertising, increasing foot traffic by 280%.',
      client_name: 'Bella Vista Restaurants',
      industry: 'Food & Beverage',
      image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop',
      results: {
        foot_traffic: '280% increase',
        new_locations: '5 opened',
        brand_awareness: '400% lift'
      },
      is_active: true,
      is_featured: false,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '103',
      service_type: 'meta-advertising',
      title: 'Fitness App User Acquisition',
      description: 'Drove 50K+ app downloads for a fitness startup through strategic Instagram and Facebook ad campaigns targeting health enthusiasts.',
      client_name: 'FitLife App',
      industry: 'Health & Fitness',
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      results: {
        app_downloads: '50K+',
        user_retention: '85%',
        subscription_rate: '12%'
      },
      is_active: true,
      is_featured: false,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '104',
      service_type: 'meta-advertising',
      title: 'E-learning Platform Growth',
      description: 'Scaled an online education platform from 1K to 25K students through targeted Meta campaigns focused on professional development.',
      client_name: 'SkillBoost Academy',
      industry: 'Education',
      image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      results: {
        student_growth: '2400%',
        course_completion: '78%',
        revenue_increase: '450%'
      },
      is_active: true,
      is_featured: false,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '105',
      service_type: 'meta-advertising',
      title: 'Beauty Brand Launch',
      description: 'Successfully launched a new beauty brand on social media, generating $500K in first-month sales through Instagram and Facebook ads.',
      client_name: 'Glow Beauty Co.',
      industry: 'Beauty & Cosmetics',
      image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=250&fit=crop',
      results: {
        first_month_sales: '$500K',
        follower_growth: '15K+',
        engagement_rate: '18.5%'
      },
      is_active: true,
      is_featured: false,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '106',
      service_type: 'meta-advertising',
      title: 'Tech Startup B2B Leads',
      description: 'Generated 1,200+ qualified B2B leads for a SaaS startup through LinkedIn-integrated Meta campaigns targeting decision makers.',
      client_name: 'DataSync Pro',
      industry: 'Technology',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      results: {
        qualified_leads: '1,200+',
        conversion_rate: '8.5%',
        deal_value: '$2.3M pipeline'
      },
      is_active: true,
      is_featured: false,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '107',
      service_type: 'meta-advertising',
      title: 'Real Estate Agency Boom',
      description: 'Transformed a struggling real estate agency into the top performer in their market through strategic Meta advertising campaigns.',
      client_name: 'Elite Properties',
      industry: 'Real Estate',
      image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
      results: {
        property_sales: '180% increase',
        lead_generation: '320% boost',
        market_share: '#1 in region'
      },
      is_active: true,
      is_featured: false,
      sort_order: 7,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '108',
      service_type: 'meta-advertising',
      title: 'Nonprofit Donation Drive',
      description: 'Helped a wildlife conservation nonprofit raise $750K through emotional storytelling campaigns on Facebook and Instagram.',
      client_name: 'Wildlife Guardians',
      industry: 'Nonprofit',
      image_url: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=250&fit=crop',
      results: {
        donations_raised: '$750K',
        donor_acquisition: '500% increase',
        awareness_reach: '3.2M people'
      },
      is_active: true,
      is_featured: false,
      sort_order: 8,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'amazon-advertising': [
    {
      id: '201',
      service_type: 'amazon-advertising',
      title: 'Kitchen Appliance Domination',
      description: 'Transformed a small kitchen appliance brand into a category leader on Amazon through strategic PPC and organic ranking optimization.',
      client_name: 'ChefMaster Pro',
      industry: 'Home & Kitchen',
      image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop',
      results: {
        sales_growth: '650%',
        acos_improvement: '45% reduction',
        ranking: 'Top 3 in category'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '202',
      service_type: 'amazon-advertising',
      title: 'Health Supplement Success',
      description: 'Launched a new vitamin brand on Amazon, achieving $2M in first-year sales through optimized advertising and listing strategies.',
      client_name: 'VitalBoost Nutrition',
      industry: 'Health & Wellness',
      image_url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop',
      results: {
        first_year_sales: '$2M',
        organic_ranking: 'Page 1',
        review_score: '4.8 stars'
      },
      is_active: true,
      is_featured: false,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '203',
      service_type: 'amazon-advertising',
      title: 'Pet Product Empire',
      description: 'Built a pet accessories brand from startup to 8-figure revenue through comprehensive Amazon advertising and brand building.',
      client_name: 'PawPerfect Supplies',
      industry: 'Pet Supplies',
      image_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop',
      results: {
        revenue_growth: '890%',
        product_variants: '50+ SKUs',
        market_position: 'Top 5 brand'
      },
      is_active: true,
      is_featured: false,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '204',
      service_type: 'amazon-advertising',
      title: 'Electronics Brand Revival',
      description: 'Revived a struggling electronics brand on Amazon, increasing sales by 420% through strategic advertising and product optimization.',
      client_name: 'TechFlow Electronics',
      industry: 'Electronics',
      image_url: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=250&fit=crop',
      results: {
        sales_increase: '420%',
        acos_optimization: '38% reduction',
        profit_margin: '25% improvement'
      },
      is_active: true,
      is_featured: false,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '205',
      service_type: 'amazon-advertising',
      title: 'Fashion Accessory Breakthrough',
      description: 'Scaled a fashion accessory startup to $500K monthly revenue through targeted Amazon advertising and influencer partnerships.',
      client_name: 'StyleCraft Accessories',
      industry: 'Fashion',
      image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
      results: {
        monthly_revenue: '$500K',
        conversion_rate: '12% increase',
        brand_registry: 'Approved & protected'
      },
      is_active: true,
      is_featured: false,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '206',
      service_type: 'amazon-advertising',
      title: 'Home Decor Market Leader',
      description: 'Established a home decor brand as the #1 seller in their niche through comprehensive Amazon marketing strategies.',
      client_name: 'Modern Living Co.',
      industry: 'Home & Garden',
      image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
      results: {
        market_position: '#1 in niche',
        sales_velocity: '340% increase',
        customer_ltv: '180% growth'
      },
      is_active: true,
      is_featured: false,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '207',
      service_type: 'amazon-advertising',
      title: 'Sports Equipment Champion',
      description: 'Launched a sports equipment brand that became the fastest-growing seller in their category through data-driven Amazon strategies.',
      client_name: 'ProAthlete Gear',
      industry: 'Sports & Outdoors',
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      results: {
        growth_rate: 'Fastest in category',
        inventory_turns: '15x annually',
        profit_margins: '35% increase'
      },
      is_active: true,
      is_featured: false,
      sort_order: 7,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '208',
      service_type: 'amazon-advertising',
      title: 'Beauty Brand Transformation',
      description: 'Transformed a traditional beauty brand for the Amazon marketplace, achieving 750% growth in online sales within 18 months.',
      client_name: 'Radiance Beauty',
      industry: 'Beauty & Personal Care',
      image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=250&fit=crop',
      results: {
        online_sales_growth: '750%',
        customer_reviews: '4.9 average',
        repeat_purchase: '68% rate'
      },
      is_active: true,
      is_featured: false,
      sort_order: 8,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'walmart-advertising': [
    {
      id: '301',
      service_type: 'walmart-advertising',
      title: 'Grocery Brand Expansion',
      description: 'Helped a regional grocery brand expand nationwide through Walmart Marketplace, achieving 520% increase in sales volume.',
      client_name: 'FreshFarm Foods',
      industry: 'Food & Grocery',
      image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop',
      results: {
        sales_volume: '520% increase',
        store_coverage: 'Nationwide',
        item_performance: '92 score'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '302',
      service_type: 'walmart-advertising',
      title: 'Household Essentials Success',
      description: 'Launched a household products line on Walmart, reaching $1.5M in annual sales through strategic advertising and inventory management.',
      client_name: 'CleanLife Essentials',
      industry: 'Household Products',
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      results: {
        annual_sales: '$1.5M',
        search_ranking: 'Top 5',
        customer_satisfaction: '96%'
      },
      is_active: true,
      is_featured: false,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '303',
      service_type: 'walmart-advertising',
      title: 'Toy Brand Holiday Boom',
      description: 'Captured holiday market share for a toy manufacturer, generating 380% sales increase during peak season through Walmart advertising.',
      client_name: 'PlayTime Innovations',
      industry: 'Toys & Games',
      image_url: 'https://images.unsplash.com/photo-1560070094-e1f2ddec4337?w=400&h=250&fit=crop',
      results: {
        holiday_sales: '380% increase',
        market_share: '15% in category',
        inventory_velocity: '8x turnover'
      },
      is_active: true,
      is_featured: false,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '304',
      service_type: 'walmart-advertising',
      title: 'Health & Wellness Growth',
      description: 'Scaled a health supplement brand on Walmart from zero to $800K annual revenue through targeted advertising campaigns.',
      client_name: 'WellnessFirst Supplements',
      industry: 'Health & Wellness',
      image_url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop',
      results: {
        revenue_growth: '$800K annually',
        organic_visibility: '450% increase',
        customer_reviews: '4.7 average'
      },
      is_active: true,
      is_featured: false,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '305',
      service_type: 'walmart-advertising',
      title: 'Electronics Marketplace Domination',
      description: 'Established an electronics brand as a top-performing seller on Walmart Marketplace with 290% year-over-year growth.',
      client_name: 'TechSavvy Electronics',
      industry: 'Electronics',
      image_url: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=250&fit=crop',
      results: {
        yoy_growth: '290%',
        seller_ranking: 'Top 10',
        profit_margins: '28% improvement'
      },
      is_active: true,
      is_featured: false,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '306',
      service_type: 'walmart-advertising',
      title: 'Baby Products Category Leader',
      description: 'Built a baby products brand into a category leader on Walmart through strategic advertising and customer trust building.',
      client_name: 'LittleOnes Care',
      industry: 'Baby & Toddler',
      image_url: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=250&fit=crop',
      results: {
        category_ranking: '#1 in baby care',
        sales_growth: '425%',
        brand_recognition: '85% increase'
      },
      is_active: true,
      is_featured: false,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '307',
      service_type: 'walmart-advertising',
      title: 'Garden & Patio Seasonal Success',
      description: 'Maximized seasonal sales for a garden supplies company, achieving 340% revenue increase during peak gardening season.',
      client_name: 'GreenThumb Gardens',
      industry: 'Garden & Patio',
      image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop',
      results: {
        seasonal_revenue: '340% increase',
        market_penetration: '60% coverage',
        customer_retention: '72%'
      },
      is_active: true,
      is_featured: false,
      sort_order: 7,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '308',
      service_type: 'walmart-advertising',
      title: 'Fashion Brand Breakthrough',
      description: 'Launched a fashion brand on Walmart Marketplace, generating $600K in first-year sales through strategic advertising and trend analysis.',
      client_name: 'UrbanStyle Fashion',
      industry: 'Clothing & Accessories',
      image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
      results: {
        first_year_sales: '$600K',
        trend_adoption: '95% accuracy',
        inventory_efficiency: '18x turnover'
      },
      is_active: true,
      is_featured: false,
      sort_order: 8,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'shopify-development': [
    {
      id: '401',
      service_type: 'shopify-development',
      title: 'Fashion E-commerce Revolution',
      description: 'Built a custom Shopify store for a fashion brand that achieved 450% increase in conversion rates through optimized UX design.',
      client_name: 'Chic Boutique Co.',
      industry: 'Fashion',
      image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
      results: {
        conversion_rate: '450% increase',
        page_load_speed: '1.8s',
        mobile_optimization: '98% score'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '402',
      service_type: 'shopify-development',
      title: 'Health Supplement Store Success',
      description: 'Developed a comprehensive Shopify solution for a health brand, integrating subscription services and achieving $2M annual revenue.',
      client_name: 'VitalLife Supplements',
      industry: 'Health & Wellness',
      image_url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop',
      results: {
        annual_revenue: '$2M',
        subscription_growth: '280%',
        customer_ltv: '340% increase'
      },
      is_active: true,
      is_featured: false,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '403',
      service_type: 'shopify-development',
      title: 'Home Decor Multi-Store Platform',
      description: 'Created a multi-store Shopify Plus solution for a home decor company, managing 5 brands under one unified platform.',
      client_name: 'Elegant Homes Group',
      industry: 'Home & Garden',
      image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
      results: {
        multi_store_setup: '5 brands',
        operational_efficiency: '60% improvement',
        total_revenue: '$3.5M annually'
      },
      is_active: true,
      is_featured: false,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '404',
      service_type: 'shopify-development',
      title: 'Electronics B2B Marketplace',
      description: 'Built a B2B Shopify store for electronics wholesale, featuring custom pricing tiers and bulk ordering capabilities.',
      client_name: 'TechDistro Solutions',
      industry: 'Electronics',
      image_url: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=250&fit=crop',
      results: {
        b2b_integration: '100% custom',
        order_volume: '520% increase',
        client_onboarding: '85% faster'
      },
      is_active: true,
      is_featured: false,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '405',
      service_type: 'shopify-development',
      title: 'Artisan Craft Marketplace',
      description: 'Developed a custom Shopify store for handmade crafts, featuring artist profiles and custom product configurators.',
      client_name: 'Artisan Collective',
      industry: 'Arts & Crafts',
      image_url: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=250&fit=crop',
      results: {
        artist_onboarding: '200+ creators',
        custom_products: '75% of sales',
        community_growth: '1800% increase'
      },
      is_active: true,
      is_featured: false,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '406',
      service_type: 'shopify-development',
      title: 'Luxury Jewelry Showcase',
      description: 'Created an elegant Shopify store for luxury jewelry with advanced security features and virtual try-on capabilities.',
      client_name: 'Brilliant Gems Co.',
      industry: 'Luxury Goods',
      image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=250&fit=crop',
      results: {
        virtual_try_on: '85% engagement',
        security_features: 'Bank-level',
        average_order: '240% increase'
      },
      is_active: true,
      is_featured: false,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '407',
      service_type: 'shopify-development',
      title: 'Sports Equipment Customizer',
      description: 'Built a Shopify store with advanced product customization for sports equipment, featuring 3D previews and team ordering.',
      client_name: 'ProSport Gear',
      industry: 'Sports & Recreation',
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      results: {
        customization_rate: '90% adoption',
        team_orders: '300% increase',
        customer_satisfaction: '4.9/5'
      },
      is_active: true,
      is_featured: false,
      sort_order: 7,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '408',
      service_type: 'shopify-development',
      title: 'Pet Products Subscription Box',
      description: 'Developed a subscription-based Shopify store for pet products with automated recurring billing and personalized boxes.',
      client_name: 'PawBox Monthly',
      industry: 'Pet Supplies',
      image_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop',
      results: {
        subscription_growth: '650%',
        retention_rate: '82%',
        monthly_revenue: '$450K'
      },
      is_active: true,
      is_featured: false,
      sort_order: 8,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'shopify-integration': [
    {
      id: '501',
      service_type: 'shopify-integration',
      title: 'ERP System Unification',
      description: 'Integrated Shopify with enterprise ERP system for a manufacturing company, streamlining operations and reducing errors by 95%.',
      client_name: 'Industrial Solutions Inc.',
      industry: 'Manufacturing',
      image_url: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=400&h=250&fit=crop',
      results: {
        error_reduction: '95%',
        processing_speed: '300% faster',
        operational_efficiency: '80% improvement'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '502',
      service_type: 'shopify-integration',
      title: 'Multi-Channel Inventory Sync',
      description: 'Synchronized inventory across Shopify, Amazon, eBay, and brick-and-mortar stores, eliminating overselling and stockouts.',
      client_name: 'OmniRetail Corp',
      industry: 'Retail',
      image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
      results: {
        channel_sync: '99.9% accuracy',
        stockout_reduction: '87%',
        inventory_efficiency: '150% improvement'
      },
      is_active: true,
      is_featured: false,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '503',
      service_type: 'shopify-integration',
      title: 'CRM Customer Journey Mapping',
      description: 'Connected Shopify with advanced CRM system, creating 360-degree customer profiles and increasing retention by 240%.',
      client_name: 'LoyalCustomers Co.',
      industry: 'E-commerce',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      results: {
        customer_retention: '240% increase',
        data_accuracy: '98%',
        sales_insights: '400% improvement'
      },
      is_active: true,
      is_featured: false,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '504',
      service_type: 'shopify-integration',
      title: 'Automated Dropshipping Network',
      description: 'Built automated dropshipping integrations connecting Shopify with 15+ suppliers, achieving 99.5% order automation.',
      client_name: 'DropShip Masters',
      industry: 'E-commerce',
      image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=250&fit=crop',
      results: {
        order_automation: '99.5%',
        supplier_network: '15+ integrated',
        fulfillment_speed: '200% faster'
      },
      is_active: true,
      is_featured: false,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '505',
      service_type: 'shopify-integration',
      title: 'Financial Reporting Automation',
      description: 'Integrated Shopify with QuickBooks and analytics platforms, providing real-time financial insights and automated tax reporting.',
      client_name: 'FinanceFlow Solutions',
      industry: 'Financial Services',
      image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
      results: {
        reporting_automation: '100%',
        tax_accuracy: '99.9%',
        financial_insights: 'Real-time'
      },
      is_active: true,
      is_featured: false,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '506',
      service_type: 'shopify-integration',
      title: 'Marketing Automation Hub',
      description: 'Connected Shopify with email marketing, SMS, and social media platforms, creating unified customer communication workflows.',
      client_name: 'MarketingPro Agency',
      industry: 'Marketing',
      image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop',
      results: {
        automation_rate: '95%',
        engagement_increase: '320%',
        roi_improvement: '180%'
      },
      is_active: true,
      is_featured: false,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '507',
      service_type: 'shopify-integration',
      title: 'Warehouse Management Integration',
      description: 'Integrated Shopify with WMS for automated order routing, pick lists, and shipping optimization, reducing fulfillment time by 70%.',
      client_name: 'LogiFlow Warehousing',
      industry: 'Logistics',
      image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop',
      results: {
        fulfillment_speed: '70% faster',
        accuracy_rate: '99.8%',
        shipping_costs: '25% reduction'
      },
      is_active: true,
      is_featured: false,
      sort_order: 7,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '508',
      service_type: 'shopify-integration',
      title: 'B2B Portal Integration',
      description: 'Created seamless B2B portal integration with Shopify Plus, enabling wholesale pricing, bulk orders, and credit management.',
      client_name: 'WholesalePro Distribution',
      industry: 'B2B Distribution',
      image_url: 'https://images.unsplash.com/photo-1664382953714-3c61247b6d56?w=400&h=250&fit=crop',
      results: {
        b2b_automation: '100%',
        order_processing: '500% faster',
        client_satisfaction: '4.8/5'
      },
      is_active: true,
      is_featured: false,
      sort_order: 8,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'website-development': [
    {
      id: '601',
      service_type: 'website-development',
      title: 'Healthcare Practice Digital Transformation',
      description: 'Developed a comprehensive healthcare website with patient portals, appointment scheduling, and HIPAA-compliant forms.',
      client_name: 'MedCare Associates',
      industry: 'Healthcare',
      image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      results: {
        patient_engagement: '380% increase',
        appointment_efficiency: '90% online',
        compliance_score: '100% HIPAA'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '602',
      service_type: 'website-development',
      title: 'Law Firm Authority Website',
      description: 'Built a professional law firm website with case study showcases, client testimonials, and lead generation optimization.',
      client_name: 'Justice & Associates',
      industry: 'Legal Services',
      image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop',
      results: {
        lead_generation: '450% increase',
        case_inquiries: '280% growth',
        professional_image: '95% client approval'
      },
      is_active: true,
      is_featured: false,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '603',
      service_type: 'website-development',
      title: 'Restaurant Chain Digital Presence',
      description: 'Created a multi-location restaurant website with online ordering, menu management, and franchise portal integration.',
      client_name: 'Bella Pasta Restaurants',
      industry: 'Food & Beverage',
      image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop',
      results: {
        online_orders: '520% increase',
        multi_location: '25 restaurants',
        customer_satisfaction: '4.7/5'
      },
      is_active: true,
      is_featured: false,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '604',
      service_type: 'website-development',
      title: 'Tech Startup Product Showcase',
      description: 'Developed a cutting-edge website for a SaaS startup with interactive demos, pricing calculators, and lead nurturing workflows.',
      client_name: 'InnovateTech Solutions',
      industry: 'Technology',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      results: {
        demo_engagement: '340% increase',
        qualified_leads: '280% growth',
        conversion_rate: '8.5%'
      },
      is_active: true,
      is_featured: false,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '605',
      service_type: 'website-development',
      title: 'Educational Institution Portal',
      description: 'Built a comprehensive education website with student portals, course catalogs, and enrollment management systems.',
      client_name: 'Elite Learning Academy',
      industry: 'Education',
      image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      results: {
        student_enrollment: '200% increase',
        portal_usage: '95% adoption',
        administrative_efficiency: '60% improvement'
      },
      is_active: true,
      is_featured: false,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '606',
      service_type: 'website-development',
      title: 'Real Estate Agency Platform',
      description: 'Created a dynamic real estate website with property search, virtual tours, agent profiles, and CRM integration.',
      client_name: 'Premium Properties Group',
      industry: 'Real Estate',
      image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
      results: {
        property_inquiries: '390% increase',
        virtual_tours: '85% engagement',
        agent_productivity: '150% improvement'
      },
      is_active: true,
      is_featured: false,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '607',
      service_type: 'website-development',
      title: 'Nonprofit Fundraising Platform',
      description: 'Developed a nonprofit website with donation processing, volunteer management, and impact tracking dashboards.',
      client_name: 'Hope Foundation',
      industry: 'Nonprofit',
      image_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop',
      results: {
        donations_increased: '680%',
        volunteer_signups: '450% growth',
        transparency_score: '98%'
      },
      is_active: true,
      is_featured: false,
      sort_order: 7,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '608',
      service_type: 'website-development',
      title: 'Manufacturing Company Showcase',
      description: 'Built an industrial website with product catalogs, technical specifications, quote requests, and dealer locators.',
      client_name: 'Precision Manufacturing Co.',
      industry: 'Manufacturing',
      image_url: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=400&h=250&fit=crop',
      results: {
        quote_requests: '320% increase',
        dealer_network: '40% expansion',
        technical_downloads: '250% growth'
      },
      is_active: true,
      is_featured: false,
      sort_order: 8,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'account-management': [
    {
      id: '701',
      service_type: 'account-management',
      title: 'Multi-Platform Campaign Optimization',
      description: 'Managed comprehensive advertising campaigns across Google, Meta, and Amazon for an e-commerce brand, achieving 420% ROI improvement.',
      client_name: 'GlobalTech Commerce',
      industry: 'E-commerce',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      results: {
        roi_improvement: '420%',
        cross_platform_sync: '100%',
        cost_efficiency: '65% improvement'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '702',
      service_type: 'account-management',
      title: 'Healthcare Practice Growth Management',
      description: 'Provided full-service account management for a medical practice, increasing patient acquisition by 380% through integrated campaigns.',
      client_name: 'Advanced Medical Center',
      industry: 'Healthcare',
      image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      results: {
        patient_acquisition: '380% increase',
        appointment_bookings: '450% growth',
        practice_revenue: '290% improvement'
      },
      is_active: true,
      is_featured: false,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '703',
      service_type: 'account-management',
      title: 'SaaS Startup Scale Management',
      description: 'Managed complete digital marketing strategy for a B2B SaaS company, scaling from startup to $5M ARR in 18 months.',
      client_name: 'CloudFlow Software',
      industry: 'SaaS',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      results: {
        arr_growth: '$5M in 18 months',
        lead_quality: '92% MQL rate',
        customer_acquisition: '340% efficiency'
      },
      is_active: true,
      is_featured: false,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '704',
      service_type: 'account-management',
      title: 'Retail Chain Expansion Strategy',
      description: 'Orchestrated digital marketing for a retail chain expansion, successfully launching 12 new locations with 280% above-target performance.',
      client_name: 'FreshMart Retail',
      industry: 'Retail',
      image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
      results: {
        new_locations: '12 successful launches',
        performance_vs_target: '280% above',
        customer_acquisition: '150% growth'
      },
      is_active: true,
      is_featured: false,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '705',
      service_type: 'account-management',
      title: 'Financial Services Client Growth',
      description: 'Managed integrated marketing campaigns for a financial advisory firm, increasing client base by 190% while maintaining compliance.',
      client_name: 'WealthBuilder Advisors',
      industry: 'Financial Services',
      image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
      results: {
        client_base_growth: '190%',
        compliance_rate: '100%',
        aum_increase: '$25M managed'
      },
      is_active: true,
      is_featured: false,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '706',
      service_type: 'account-management',
      title: 'Manufacturing Lead Generation',
      description: 'Developed and managed B2B lead generation campaigns for industrial equipment manufacturer, achieving 240% quota exceeded.',
      client_name: 'Industrial Solutions Pro',
      industry: 'Manufacturing',
      image_url: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=400&h=250&fit=crop',
      results: {
        quota_performance: '240% exceeded',
        qualified_leads: '850% increase',
        sales_cycle: '35% shorter'
      },
      is_active: true,
      is_featured: false,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '707',
      service_type: 'account-management',
      title: 'Education Institute Enrollment Drive',
      description: 'Managed comprehensive enrollment campaigns for a private college, increasing applications by 320% and improving student quality.',
      client_name: 'Excellence University',
      industry: 'Education',
      image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      results: {
        applications_increase: '320%',
        student_quality: '40% improvement',
        enrollment_rate: '85% conversion'
      },
      is_active: true,
      is_featured: false,
      sort_order: 7,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '708',
      service_type: 'account-management',
      title: 'Hospitality Brand Recovery',
      description: 'Led account management for hotel chain post-pandemic recovery, achieving 180% occupancy rate improvement and brand restoration.',
      client_name: 'Luxury Stay Hotels',
      industry: 'Hospitality',
      image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop',
      results: {
        occupancy_improvement: '180%',
        brand_sentiment: '95% positive',
        revenue_recovery: '210% pre-pandemic'
      },
      is_active: true,
      is_featured: false,
      sort_order: 8,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ]
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
  'meta-advertising': [
    {
      id: '101',
      service_type: 'meta-advertising',
      client_name: 'Emma Wilson',
      company: 'TrendCo Fashion',
      review_text: 'Our Meta advertising campaigns went viral! We reached 2.5M users and saw a 340% increase in online sales. The creative strategy and audience targeting were absolutely brilliant.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      results_achieved: '2.5M reach, 340% sales increase',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '102',
      service_type: 'meta-advertising',
      client_name: 'Carlos Mendez',
      company: 'Bella Vista Restaurants',
      review_text: 'They helped us expand to 5 new locations through targeted Meta advertising. Our foot traffic increased by 280% and brand awareness skyrocketed. Exceptional understanding of the restaurant industry.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
      results_achieved: '280% foot traffic increase, 5 new locations opened',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '103',
      service_type: 'meta-advertising',
      client_name: 'Jessica Kumar',
      company: 'FitLife App',
      review_text: 'Incredible user acquisition results! We gained 50K+ app downloads through their strategic Instagram and Facebook campaigns. The targeting was spot-on for health enthusiasts.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      results_achieved: '50K+ app downloads, 85% user retention',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '104',
      service_type: 'meta-advertising',
      client_name: 'David Chen',
      company: 'SkillBoost Academy',
      review_text: 'We scaled from 1K to 25K students thanks to their Meta campaigns focused on professional development. The ROI has been phenomenal and student quality is excellent.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      results_achieved: '2400% student growth, 78% course completion',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '105',
      service_type: 'meta-advertising',
      client_name: 'Sophia Anderson',
      company: 'Glow Beauty Co.',
      review_text: 'Launched our beauty brand with $500K in first-month sales through their Instagram and Facebook ads. The creative content and influencer strategy were game-changing.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
      results_achieved: '$500K first-month sales, 15K+ followers',
      is_active: true,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '106',
      service_type: 'meta-advertising',
      client_name: 'Michael O\'Connor',
      company: 'DataSync Pro',
      review_text: 'Outstanding B2B lead generation! We got 1,200+ qualified leads through their LinkedIn-integrated Meta campaigns. The quality of decision-makers we\'re reaching is impressive.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      results_achieved: '1,200+ qualified leads, $2.3M pipeline',
      is_active: true,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'amazon-advertising': [
    {
      id: '201',
      service_type: 'amazon-advertising',
      client_name: 'Rachel Martinez',
      company: 'ChefMaster Pro',
      review_text: 'We became a category leader on Amazon thanks to their strategic PPC and optimization. Our sales grew 650% and we\'re now ranking in the top 3 for all our main keywords.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop&crop=face',
      results_achieved: '650% sales growth, Top 3 category ranking',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '202',
      service_type: 'amazon-advertising',
      client_name: 'James Patterson',
      company: 'VitalBoost Nutrition',
      review_text: 'Launched our vitamin brand and achieved $2M in first-year sales! Their listing optimization and advertising strategies helped us rank on page 1 with a 4.8-star rating.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      results_achieved: '$2M first-year sales, Page 1 ranking',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '203',
      service_type: 'amazon-advertising',
      client_name: 'Amanda Foster',
      company: 'PawPerfect Supplies',
      review_text: 'Built our pet accessories brand from startup to 8-figure revenue! Their comprehensive Amazon strategy helped us become a top 5 brand with 50+ successful SKUs.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      results_achieved: '890% revenue growth, Top 5 brand position',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '204',
      service_type: 'amazon-advertising',
      client_name: 'Steven Wong',
      company: 'TechFlow Electronics',
      review_text: 'They revived our struggling electronics brand with a 420% sales increase! Their advertising optimization reduced our ACoS by 38% while improving profit margins significantly.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      results_achieved: '420% sales increase, 38% ACoS reduction',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '205',
      service_type: 'amazon-advertising',
      client_name: 'Nina Patel',
      company: 'StyleCraft Accessories',
      review_text: 'Scaled our fashion accessory startup to $500K monthly revenue through targeted Amazon advertising. Their brand registry and protection strategies were invaluable.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
      results_achieved: '$500K monthly revenue, 12% conversion rate',
      is_active: true,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '206',
      service_type: 'amazon-advertising',
      client_name: 'Tony Richards',
      company: 'Modern Living Co.',
      review_text: 'We became the #1 seller in our home decor niche! Their comprehensive Amazon marketing increased our sales velocity by 340% and customer lifetime value by 180%.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      results_achieved: '#1 niche position, 340% sales velocity increase',
      is_active: true,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'walmart-advertising': [
    {
      id: '301',
      service_type: 'walmart-advertising',
      client_name: 'Maria Gonzalez',
      company: 'FreshFarm Foods',
      review_text: 'Expanded our regional grocery brand nationwide through Walmart Marketplace with a 520% increase in sales volume. Their understanding of the food industry is exceptional.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      results_achieved: '520% sales volume increase, Nationwide coverage',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '302',
      service_type: 'walmart-advertising',
      client_name: 'Kevin Murphy',
      company: 'CleanLife Essentials',
      review_text: 'Reached $1.5M in annual sales for our household products line! Their strategic advertising and inventory management helped us achieve top 5 search rankings.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      results_achieved: '$1.5M annual sales, Top 5 search ranking',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '303',
      service_type: 'walmart-advertising',
      client_name: 'Ashley Thompson',
      company: 'PlayTime Innovations',
      review_text: 'Captured 15% market share during holiday season with 380% sales increase! Their peak season strategy and inventory planning were perfectly executed.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      results_achieved: '380% holiday sales increase, 15% market share',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '304',
      service_type: 'walmart-advertising',
      client_name: 'Brandon Lee',
      company: 'WellnessFirst Supplements',
      review_text: 'Scaled from zero to $800K annual revenue on Walmart! Their targeted advertising campaigns increased our organic visibility by 450% with excellent customer reviews.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      results_achieved: '$800K annual revenue, 450% visibility increase',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '305',
      service_type: 'walmart-advertising',
      client_name: 'Diana Kim',
      company: 'TechSavvy Electronics',
      review_text: 'Became a top 10 seller on Walmart Marketplace with 290% year-over-year growth! Their electronics expertise and profit margin optimization strategies are outstanding.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      results_achieved: '290% YoY growth, Top 10 seller ranking',
      is_active: true,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '306',
      service_type: 'walmart-advertising',
      client_name: 'Christopher Davis',
      company: 'LittleOnes Care',
      review_text: 'Built our baby products brand into the #1 category leader on Walmart! The 425% sales growth and 85% brand recognition increase exceeded all expectations.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      results_achieved: '#1 category leader, 425% sales growth',
      is_active: true,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'shopify-development': [
    {
      id: '401',
      service_type: 'shopify-development',
      client_name: 'Isabella Rodriguez',
      company: 'Chic Boutique Co.',
      review_text: 'Our new Shopify store achieved a 450% increase in conversion rates! The UX design is flawless and the 1.8s page load speed has significantly improved our customer experience.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      results_achieved: '450% conversion rate increase, 1.8s page load',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '402',
      service_type: 'shopify-development',
      client_name: 'Marcus Johnson',
      company: 'VitalLife Supplements',
      review_text: 'The comprehensive Shopify solution with subscription services helped us reach $2M annual revenue! The 280% subscription growth has transformed our business model.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      results_achieved: '$2M annual revenue, 280% subscription growth',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '403',
      service_type: 'shopify-development',
      client_name: 'Victoria Chen',
      company: 'Elegant Homes Group',
      review_text: 'The multi-store Shopify Plus platform managing our 5 brands is incredible! We improved operational efficiency by 60% and reached $3.5M in total annual revenue.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
      results_achieved: '5 brands unified, $3.5M total revenue',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '404',
      service_type: 'shopify-development',
      client_name: 'Robert Anderson',
      company: 'TechDistro Solutions',
      review_text: 'The B2B Shopify store with custom pricing tiers is perfect for our wholesale business! Order volume increased by 520% and client onboarding is 85% faster.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      results_achieved: '520% order volume increase, 85% faster onboarding',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '405',
      service_type: 'shopify-development',
      client_name: 'Samantha White',
      company: 'Artisan Collective',
      review_text: 'The custom Shopify store for handmade crafts with artist profiles is amazing! We onboarded 200+ creators and 75% of our sales are now custom products.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      results_achieved: '200+ creators onboarded, 75% custom product sales',
      is_active: true,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '406',
      service_type: 'shopify-development',
      client_name: 'Jonathan Taylor',
      company: 'Brilliant Gems Co.',
      review_text: 'The luxury jewelry Shopify store with virtual try-on is stunning! We achieved 85% engagement with the virtual features and saw a 240% increase in average order value.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      results_achieved: '85% virtual try-on engagement, 240% AOV increase',
      is_active: true,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'shopify-integration': [
    {
      id: '501',
      service_type: 'shopify-integration',
      client_name: 'Patricia Williams',
      company: 'Industrial Solutions Inc.',
      review_text: 'The ERP integration with Shopify reduced our errors by 95% and processing is 300% faster! Our manufacturing operations are now perfectly streamlined with our e-commerce.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=150&h=150&fit=crop&crop=face',
      results_achieved: '95% error reduction, 300% faster processing',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '502',
      service_type: 'shopify-integration',
      client_name: 'Daniel Brown',
      company: 'OmniRetail Corp',
      review_text: 'Multi-channel inventory sync across Shopify, Amazon, and eBay is flawless! We achieved 99.9% accuracy and eliminated overselling completely. Inventory efficiency improved 150%.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      results_achieved: '99.9% sync accuracy, 150% efficiency improvement',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '503',
      service_type: 'shopify-integration',
      client_name: 'Michelle Garcia',
      company: 'LoyalCustomers Co.',
      review_text: 'The CRM integration created amazing 360-degree customer profiles! Customer retention increased by 240% and our sales insights improved by 400%. Data accuracy is at 98%.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      results_achieved: '240% retention increase, 98% data accuracy',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '504',
      service_type: 'shopify-integration',
      client_name: 'Andrew Miller',
      company: 'DropShip Masters',
      review_text: 'The automated dropshipping network with 15+ suppliers is incredible! We achieved 99.5% order automation and fulfillment is 200% faster. Game-changing integration.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      results_achieved: '99.5% order automation, 200% faster fulfillment',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '505',
      service_type: 'shopify-integration',
      client_name: 'Laura Wilson',
      company: 'FinanceFlow Solutions',
      review_text: 'QuickBooks integration with real-time financial insights is perfect! We achieved 100% reporting automation and 99.9% tax accuracy. Financial management is now effortless.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
      results_achieved: '100% reporting automation, 99.9% tax accuracy',
      is_active: true,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '506',
      service_type: 'shopify-integration',
      client_name: 'Thomas Moore',
      company: 'MarketingPro Agency',
      review_text: 'The unified marketing automation hub is amazing! We achieved 95% automation rate with 320% engagement increase and 180% ROI improvement. All platforms work in perfect harmony.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      results_achieved: '95% automation rate, 320% engagement increase',
      is_active: true,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'website-development': [
    {
      id: '601',
      service_type: 'website-development',
      client_name: 'Dr. Elizabeth Davis',
      company: 'MedCare Associates',
      review_text: 'The healthcare website with patient portals is outstanding! Patient engagement increased by 380% and 90% of appointments are now booked online. HIPAA compliance is perfect.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      results_achieved: '380% patient engagement, 90% online appointments',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '602',
      service_type: 'website-development',
      client_name: 'Richard Martinez',
      company: 'Justice & Associates',
      review_text: 'The professional law firm website generated 450% more leads! Case inquiries grew by 280% and 95% of clients approved our new professional image. Exceptional work!',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      results_achieved: '450% lead increase, 280% case inquiry growth',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '603',
      service_type: 'website-development',
      client_name: 'Angela Thompson',
      company: 'Bella Pasta Restaurants',
      review_text: 'The multi-location restaurant website is perfect! Online orders increased by 520% across our 25 locations and customer satisfaction is at 4.7/5. Menu management is so easy now.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      results_achieved: '520% online order increase, 25 locations managed',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '604',
      service_type: 'website-development',
      client_name: 'Joseph Clark',
      company: 'InnovateTech Solutions',
      review_text: 'The SaaS website with interactive demos is incredible! Demo engagement increased by 340% and qualified leads grew by 280%. Our 8.5% conversion rate is industry-leading.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      results_achieved: '340% demo engagement, 8.5% conversion rate',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '605',
      service_type: 'website-development',
      client_name: 'Sarah Rodriguez',
      company: 'Elite Learning Academy',
      review_text: 'The education portal is amazing! Student enrollment increased by 200% with 95% portal adoption. Administrative efficiency improved by 60% - managing students is now effortless.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      results_achieved: '200% enrollment increase, 95% portal adoption',
      is_active: true,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '606',
      service_type: 'website-development',
      client_name: 'Benjamin Lee',
      company: 'Premium Properties Group',
      review_text: 'The real estate website with virtual tours is outstanding! Property inquiries increased by 390% and 85% engage with virtual tours. Agent productivity improved by 150%.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      results_achieved: '390% property inquiries, 85% virtual tour engagement',
      is_active: true,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'account-management': [
    {
      id: '701',
      service_type: 'account-management',
      client_name: 'Katherine Wilson',
      company: 'GlobalTech Commerce',
      review_text: 'Their multi-platform campaign management is exceptional! We achieved 420% ROI improvement with 100% cross-platform sync and 65% better cost efficiency. Outstanding service!',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      results_achieved: '420% ROI improvement, 100% platform sync',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '702',
      service_type: 'account-management',
      client_name: 'Dr. Michael Brown',
      company: 'Advanced Medical Center',
      review_text: 'Full-service account management delivered incredible results! Patient acquisition increased by 380% and appointment bookings grew by 450%. Practice revenue improved by 290%.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      results_achieved: '380% patient acquisition, 450% booking growth',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '703',
      service_type: 'account-management',
      client_name: 'Jennifer Garcia',
      company: 'CloudFlow Software',
      review_text: 'They scaled us from startup to $5M ARR in just 18 months! The 92% MQL rate and 340% customer acquisition efficiency are incredible. Best investment we ever made.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
      results_achieved: '$5M ARR in 18 months, 92% MQL rate',
      is_active: true,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '704',
      service_type: 'account-management',
      client_name: 'William Davis',
      company: 'FreshMart Retail',
      review_text: 'Orchestrated our 12-location expansion perfectly! We performed 280% above target with 150% customer acquisition growth. Their retail expertise is unmatched.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      results_achieved: '12 locations launched, 280% above target',
      is_active: true,
      sort_order: 4,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '705',
      service_type: 'account-management',
      client_name: 'Amanda Miller',
      company: 'WealthBuilder Advisors',
      review_text: 'Our client base grew by 190% while maintaining 100% compliance! Now managing $25M in AUM thanks to their financial services expertise. Exceptional account management.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      results_achieved: '190% client growth, $25M AUM managed',
      is_active: true,
      sort_order: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '706',
      service_type: 'account-management',
      client_name: 'Christopher Taylor',
      company: 'Industrial Solutions Pro',
      review_text: 'B2B lead generation exceeded quota by 240%! Qualified leads increased by 850% and our sales cycle is 35% shorter. Their manufacturing industry knowledge is outstanding.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      results_achieved: '240% quota exceeded, 850% lead increase',
      is_active: true,
      sort_order: 6,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ]
};
