import { ServiceStat, ServiceCaseStudy, ServiceReview } from '@/hooks/useServiceData';

export const mockStats: Record<string, ServiceStat[]> = {
  'google-advertising': [
    {
      id: '1',
      service_type: 'google-advertising',
      stat_label: 'Avg. Conversion Rate',
      stat_value: '5.2%',
      stat_description: 'Average conversion rate across all Google Ads campaigns.',
      icon_name: 'TrendingUp',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      service_type: 'google-advertising',
      stat_label: 'Client Retention',
      stat_value: '95%',
      stat_description: 'Percentage of clients who stay with us for over a year.',
      icon_name: 'Users',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-02T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z'
    }
  ],
  'meta-advertising': [
    {
      id: '3',
      service_type: 'meta-advertising',
      stat_label: 'Avg. Engagement Rate',
      stat_value: '7.8%',
      stat_description: 'Average engagement rate on Facebook and Instagram campaigns.',
      icon_name: 'Heart',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-03T00:00:00Z',
      updated_at: '2024-01-03T00:00:00Z'
    },
    {
      id: '4',
      service_type: 'meta-advertising',
      stat_label: 'Brand Awareness Lift',
      stat_value: '45%',
      stat_description: 'Increase in brand awareness as measured by surveys.',
      icon_name: 'Activity',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-04T00:00:00Z',
      updated_at: '2024-01-04T00:00:00Z'
    }
  ],
  'amazon-advertising': [
    {
      id: '5',
      service_type: 'amazon-advertising',
      stat_label: 'Avg. ACoS',
      stat_value: '22%',
      stat_description: 'Average Advertising Cost of Sales across all Amazon campaigns.',
      icon_name: 'Percent',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-05T00:00:00Z',
      updated_at: '2024-01-05T00:00:00Z'
    }
  ],
  'walmart-advertising': [
    {
      id: '6',
      service_type: 'walmart-advertising',
      stat_label: 'Sales Lift',
      stat_value: '35%',
      stat_description: 'Increase in sales attributed to Walmart Connect campaigns.',
      icon_name: 'ShoppingCart',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-06T00:00:00Z',
      updated_at: '2024-01-06T00:00:00Z'
    }
  ],
  'shopify-development': [
    {
      id: '7',
      service_type: 'shopify-development',
      stat_label: 'Page Load Speed',
      stat_value: '2.1s',
      stat_description: 'Average page load speed after Shopify store optimization.',
      icon_name: 'Clock',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-07T00:00:00Z',
      updated_at: '2024-01-07T00:00:00Z'
    }
  ],
  'shopify-integration': [
    {
      id: '8',
      service_type: 'shopify-integration',
      stat_label: 'Automation Rate',
      stat_value: '80%',
      stat_description: 'Percentage of processes automated through Shopify integrations.',
      icon_name: 'Settings',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-08T00:00:00Z',
      updated_at: '2024-01-08T00:00:00Z'
    }
  ],
  'website-development': [
    {
      id: '9',
      service_type: 'website-development',
      stat_label: 'Mobile Conversion Rate',
      stat_value: '4.8%',
      stat_description: 'Conversion rate on mobile devices after website redesign.',
      icon_name: 'Smartphone',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-09T00:00:00Z',
      updated_at: '2024-01-09T00:00:00Z'
    }
  ],
  'account-management': [
    {
      id: '10',
      service_type: 'account-management',
      stat_label: 'Client Satisfaction',
      stat_value: '92%',
      stat_description: 'Percentage of clients who report being satisfied with our account management services.',
      icon_name: 'Smile',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z'
    }
  ]
};

export const mockCaseStudies: Record<string, ServiceCaseStudy[]> = {
  'google-advertising': [
    {
      id: '1',
      service_type: 'google-advertising',
      title: 'Increased Leads by 300% for Tech Startup',
      description: 'Implemented targeted Google Ads campaigns focusing on high-intent keywords, resulting in a significant increase in lead generation.',
      client_name: 'TechStart Inc.',
      industry: 'Technology',
      image_url: 'https://images.unsplash.com/photo-1518770660439-464ef50ce906?w=300&h=200&fit=crop',
      results: {
        revenue_increase: 'N/A',
        conversion_rate: 'N/A',
        traffic_growth: 'N/A'
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
      title: '450% ROI Increase for E-commerce Store',
      description: 'Optimized Google Shopping campaigns with enhanced product listings and bidding strategies, leading to a substantial return on investment.',
      client_name: 'E-commerce Plus',
      industry: 'E-commerce',
      image_url: 'https://images.unsplash.com/photo-1523381294911-8cdfc3fe172b?w=300&h=200&fit=crop',
      results: {
        revenue_increase: 'N/A',
        conversion_rate: 'N/A',
        traffic_growth: 'N/A'
      },
      is_active: true,
      is_featured: false,
      sort_order: 2,
      created_at: '2024-01-02T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z'
    }
  ],
  'meta-advertising': [
    {
      id: '3',
      service_type: 'meta-advertising',
      title: '250% Increase in Brand Awareness for Fashion Brand',
      description: 'Developed engaging Facebook and Instagram campaigns targeting specific demographics, resulting in a significant boost in brand recognition.',
      client_name: 'Fashion Forward',
      industry: 'Fashion',
      image_url: 'https://images.unsplash.com/photo-1485230895905-ec338640a884?w=300&h=200&fit=crop',
      results: {
        revenue_increase: 'N/A',
        conversion_rate: 'N/A',
        traffic_growth: 'N/A'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-03T00:00:00Z',
      updated_at: '2024-01-03T00:00:00Z'
    },
    {
      id: '4',
      service_type: 'meta-advertising',
      title: '320% Increase in Local Customers for Service Company',
      description: 'Utilized precise targeting on Meta ads to reach local customers, leading to a substantial increase in business for a local service provider.',
      client_name: 'Local Services Co.',
      industry: 'Services',
      image_url: 'https://images.unsplash.com/photo-1543337449-3e89a9031a76?w=300&h=200&fit=crop',
      results: {
        revenue_increase: 'N/A',
        conversion_rate: 'N/A',
        traffic_growth: 'N/A'
      },
      is_active: true,
      is_featured: false,
      sort_order: 2,
      created_at: '2024-01-04T00:00:00Z',
      updated_at: '2024-01-04T00:00:00Z'
    }
  ],
  'amazon-advertising': [
    {
      id: '5',
      service_type: 'amazon-advertising',
      title: 'Doubled Sales Velocity for Premium Products',
      description: 'Implemented strategic Amazon PPC campaigns with thorough keyword research and optimization, resulting in a significant increase in sales.',
      client_name: 'Premium Products LLC',
      industry: 'Consumer Goods',
      image_url: 'https://images.unsplash.com/photo-1517331156700-3c241e891881?w=300&h=200&fit=crop',
      results: {
        revenue_increase: 'N/A',
        conversion_rate: 'N/A',
        traffic_growth: 'N/A'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-05T00:00:00Z',
      updated_at: '2024-01-05T00:00:00Z'
    }
  ],
  'walmart-advertising': [
    {
      id: '6',
      service_type: 'walmart-advertising',
      title: '275% Increase in Sales on Walmart Marketplace',
      description: 'Developed effective Walmart Connect campaigns that boosted product visibility and drove substantial sales growth.',
      client_name: 'Consumer Goods Inc.',
      industry: 'Consumer Goods',
      image_url: 'https://images.unsplash.com/photo-1563783446482-59965c692899?w=300&h=200&fit=crop',
      results: {
        revenue_increase: 'N/A',
        conversion_rate: 'N/A',
        traffic_growth: 'N/A'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-06T00:00:00Z',
      updated_at: '2024-01-06T00:00:00Z'
    }
  ],
  'shopify-development': [
    {
      id: '7',
      service_type: 'shopify-development',
      title: '400% Faster Loading Speed for Shopify Store',
      description: 'Transformed a slow-loading Shopify store into a fast and efficient platform, significantly improving user experience and conversions.',
      client_name: 'Boutique Online',
      industry: 'E-commerce',
      image_url: 'https://images.unsplash.com/photo-1523372850387-f366ca6aa588?w=300&h=200&fit=crop',
      results: {
        revenue_increase: 'N/A',
        conversion_rate: 'N/A',
        traffic_growth: 'N/A'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-07T00:00:00Z',
      updated_at: '2024-01-07T00:00:00Z'
    }
  ],
  'shopify-integration': [
    {
      id: '8',
      service_type: 'shopify-integration',
      title: 'Seamless Integrations for Multi-Channel Retailer',
      description: 'Integrated Shopify with existing systems, automating processes and ensuring data accuracy across all channels.',
      client_name: 'Multi-Channel Retail',
      industry: 'Retail',
      image_url: 'https://images.unsplash.com/photo-1550831103-7b528177979f?w=300&h=200&fit=crop',
      results: {
        revenue_increase: 'N/A',
        conversion_rate: 'N/A',
        traffic_growth: 'N/A'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-08T00:00:00Z',
      updated_at: '2024-01-08T00:00:00Z'
    }
  ],
  'website-development': [
    {
      id: '9',
      service_type: 'website-development',
      title: 'New Website Drives 350% Increase in Conversions',
      description: 'Developed a modern, user-friendly website that significantly improved conversion rates and customer engagement.',
      client_name: 'Professional Services Group',
      industry: 'Services',
      image_url: 'https://images.unsplash.com/photo-1487015149574-27555e390c8e?w=300&h=200&fit=crop',
      results: {
        revenue_increase: 'N/A',
        conversion_rate: 'N/A',
        traffic_growth: 'N/A'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-09T00:00:00Z',
      updated_at: '2024-01-09T00:00:00Z'
    }
  ],
  'account-management': [
    {
      id: '10',
      service_type: 'account-management',
      title: 'Dedicated Account Manager Improves Campaign Performance by 200%',
      description: 'Provided a dedicated account manager who proactively communicated and optimized campaigns, leading to substantial performance improvements.',
      client_name: 'Growing Business LLC',
      industry: 'Various',
      image_url: 'https://images.unsplash.com/photo-1503185918054-5ff65ebba690?w=300&h=200&fit=crop',
      results: {
        revenue_increase: 'N/A',
        conversion_rate: 'N/A',
        traffic_growth: 'N/A'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z'
    }
  ]
};

export const mockReviews: Record<string, ServiceReview[]> = {
  'google-advertising': [
    {
      id: '1',
      service_type: 'google-advertising',
      client_name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      review_text: 'Our Google Ads campaigns increased our lead generation by 300%. The team\'s expertise in keyword optimization and ad copy creation is exceptional.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b890?w=150&h=150&fit=crop&crop=face',
      results_achieved: '300% increase in leads, 45% reduction in cost per acquisition',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      service_type: 'google-advertising',
      client_name: 'Michael Chen',
      company: 'E-commerce Plus',
      review_text: 'The ROI on our Google Shopping campaigns exceeded all expectations. Professional service with measurable results.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      results_achieved: '450% ROI increase, 200% more online sales',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-02T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z'
    }
  ],
  'meta-advertising': [
    {
      id: '3',
      service_type: 'meta-advertising',
      client_name: 'Emily Rodriguez',
      company: 'Fashion Forward',
      review_text: 'Our Facebook and Instagram campaigns reached the perfect audience. Brand awareness increased dramatically.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      results_achieved: '250% increase in brand awareness, 180% more social engagement',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-03T00:00:00Z',
      updated_at: '2024-01-03T00:00:00Z'
    },
    {
      id: '4',
      service_type: 'meta-advertising',
      client_name: 'David Kim',
      company: 'Local Services Co.',
      review_text: 'The targeting precision on our Meta ads was incredible. We reached exactly the customers we needed.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      results_achieved: '320% increase in local customers, 40% lower acquisition cost',
      is_active: true,
      sort_order: 2,
      created_at: '2024-01-04T00:00:00Z',
      updated_at: '2024-01-04T00:00:00Z'
    }
  ],
  'amazon-advertising': [
    {
      id: '5',
      service_type: 'amazon-advertising',
      client_name: 'Jennifer Walsh',
      company: 'Premium Products LLC',
      review_text: 'Our Amazon PPC campaigns doubled our sales velocity. The keyword research and optimization were outstanding.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      results_achieved: '200% increase in Amazon sales, 35% better profit margins',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-05T00:00:00Z',
      updated_at: '2024-01-05T00:00:00Z'
    }
  ],
  'walmart-advertising': [
    {
      id: '6',
      service_type: 'walmart-advertising',
      client_name: 'Robert Martinez',
      company: 'Consumer Goods Inc.',
      review_text: 'Walmart Connect campaigns boosted our visibility significantly. Great understanding of the platform.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      results_achieved: '275% increase in Walmart marketplace sales',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-06T00:00:00Z',
      updated_at: '2024-01-06T00:00:00Z'
    }
  ],
  'shopify-development': [
    {
      id: '7',
      service_type: 'shopify-development',
      client_name: 'Amanda Foster',
      company: 'Boutique Online',
      review_text: 'Our Shopify store transformation was amazing. Loading speed improved and conversions skyrocketed.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      results_achieved: '400% faster loading, 250% conversion rate increase',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-07T00:00:00Z',
      updated_at: '2024-01-07T00:00:00Z'
    }
  ],
  'shopify-integration': [
    {
      id: '8',
      service_type: 'shopify-integration',
      client_name: 'Mark Thompson',
      company: 'Multi-Channel Retail',
      review_text: 'The integrations with our existing systems were seamless. Everything works perfectly together.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
      results_achieved: '90% reduction in manual work, 100% data accuracy',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-08T00:00:00Z',
      updated_at: '2024-01-08T00:00:00Z'
    }
  ],
  'website-development': [
    {
      id: '9',
      service_type: 'website-development',
      client_name: 'Lisa Chang',
      company: 'Professional Services Group',
      review_text: 'Our new website is beautiful, fast, and converts visitors into customers. Excellent work!',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b890?w=150&h=150&fit=crop&crop=face',
      results_achieved: '350% increase in website conversions, 500% more inquiries',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-09T00:00:00Z',
      updated_at: '2024-01-09T00:00:00Z'
    }
  ],
  'account-management': [
    {
      id: '10',
      service_type: 'account-management',
      client_name: 'Kevin Brown',
      company: 'Growing Business LLC',
      review_text: 'Having a dedicated account manager made all the difference. Proactive communication and great results.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      results_achieved: '200% improvement in campaign performance, 24/7 support',
      is_active: true,
      sort_order: 1,
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z'
    }
  ]
};
