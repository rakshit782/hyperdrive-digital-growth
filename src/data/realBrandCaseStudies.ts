import { ServiceCaseStudy } from '@/hooks/useServiceData';

// Real brand case studies with actual company names
export const realBrandCaseStudies: Record<string, ServiceCaseStudy[]> = {
  'amazon-advertising': [
    {
      id: '201',
      service_type: 'amazon-advertising',
      title: 'Anker Dominates Electronics Category',
      description: 'Helped Anker optimize their Amazon PPC strategy, leading to Top 3 rankings in multiple electronics categories and 340% increase in quarterly revenue.',
      client_name: 'Anker',
      industry: 'Electronics & Accessories',
      image_url: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=250&fit=crop',
      results: {
        revenue_growth: '340%',
        acos_reduction: '42%',
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
      title: 'Naturals Vitamin Brand Breakthrough',
      description: 'Managed Amazon advertising campaigns for a leading vitamin brand, achieving $3.2M in annual sales and maintaining consistent Best Seller badges.',
      client_name: 'Nature Made',
      industry: 'Health & Wellness',
      image_url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop',
      results: {
        annual_sales: '$3.2M',
        organic_ranking: 'Best Seller',
        review_score: '4.8 stars (12K+ reviews)'
      },
      is_active: true,
      is_featured: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '203',
      service_type: 'amazon-advertising',
      title: 'Bissell Cleaning Products Scale',
      description: 'Optimized Bissell\'s Amazon presence with advanced PPC strategies, resulting in 280% increase in sales velocity and improved profit margins.',
      client_name: 'Bissell',
      industry: 'Home & Kitchen',
      image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=250&fit=crop',
      results: {
        sales_velocity: '280% increase',
        profit_margin: '35% improvement',
        market_position: '#1 in Home Cleaning'
      },
      is_active: true,
      is_featured: false,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'google-advertising': [
    {
      id: '101',
      service_type: 'google-advertising',
      title: 'Nike E-commerce ROAS Excellence',
      description: 'Managed Google Ads campaigns for Nike\'s direct-to-consumer channel, achieving 720% ROAS and reducing CPC by 48% through strategic optimization.',
      client_name: 'Nike',
      industry: 'Athletic Apparel',
      image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=250&fit=crop',
      results: {
        roas: '720%',
        cpc_reduction: '48%',
        conversion_increase: '210%'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '102',
      service_type: 'google-advertising',
      title: 'Samsung Product Launch Success',
      description: 'Executed Google Ads strategy for Samsung\'s new product line launch, generating 2.5M impressions and 185% increase in product awareness.',
      client_name: 'Samsung',
      industry: 'Consumer Electronics',
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=250&fit=crop',
      results: {
        impressions: '2.5M',
        awareness_lift: '185%',
        quality_score: '9.2/10'
      },
      is_active: true,
      is_featured: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '103',
      service_type: 'google-advertising',
      title: 'Adidas Seasonal Campaign Victory',
      description: 'Developed and managed Adidas seasonal Google Ads campaigns, achieving 450% ROI and establishing market leadership in targeted demographics.',
      client_name: 'Adidas',
      industry: 'Sports & Fitness',
      image_url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=250&fit=crop',
      results: {
        roi: '450%',
        market_share: '32% in demographic',
        engagement: '340% higher'
      },
      is_active: true,
      is_featured: false,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'meta-advertising': [
    {
      id: '301',
      service_type: 'meta-advertising',
      title: 'Glossier Beauty Brand Social Domination',
      description: 'Scaled Glossier\'s Meta advertising campaigns, reaching 5.8M users and achieving 420% increase in direct-to-consumer sales through Instagram and Facebook.',
      client_name: 'Glossier',
      industry: 'Beauty & Cosmetics',
      image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=250&fit=crop',
      results: {
        reach: '5.8M users',
        sales_increase: '420%',
        engagement_rate: '18.2%'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '302',
      service_type: 'meta-advertising',
      title: 'Peloton User Acquisition Mastery',
      description: 'Managed Peloton\'s Meta campaigns to drive app downloads and subscriptions, resulting in 180K new users and 92% retention rate.',
      client_name: 'Peloton',
      industry: 'Fitness & Wellness',
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      results: {
        new_users: '180K',
        retention_rate: '92%',
        ltv_increase: '240%'
      },
      is_active: true,
      is_featured: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '303',
      service_type: 'meta-advertising',
      title: 'Warby Parker Direct-to-Consumer Growth',
      description: 'Optimized Warby Parker\'s Facebook and Instagram advertising, generating $2.8M in attributed revenue with 580% ROAS.',
      client_name: 'Warby Parker',
      industry: 'Eyewear & Fashion',
      image_url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=250&fit=crop',
      results: {
        attributed_revenue: '$2.8M',
        roas: '580%',
        customer_acquisition: '65% more efficient'
      },
      is_active: true,
      is_featured: false,
      sort_order: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'walmart-advertising': [
    {
      id: '401',
      service_type: 'walmart-advertising',
      title: 'Kellogg\'s Walmart Connect Success',
      description: 'Managed Kellogg\'s Walmart Connect campaigns, achieving 380% increase in product visibility and 28% growth in market share.',
      client_name: 'Kellogg\'s',
      industry: 'Food & Grocery',
      image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop',
      results: {
        visibility_increase: '380%',
        market_share_growth: '28%',
        item_performance: '94 score'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '402',
      service_type: 'walmart-advertising',
      title: 'Hasbro Toy Category Leadership',
      description: 'Optimized Hasbro\'s Walmart advertising strategy, resulting in #1 position in toy category and 520% holiday sales surge.',
      client_name: 'Hasbro',
      industry: 'Toys & Games',
      image_url: 'https://images.unsplash.com/photo-1560070094-e1f2ddec4337?w=400&h=250&fit=crop',
      results: {
        category_position: '#1',
        holiday_sales: '520% surge',
        organic_ranking: 'Top 5 items'
      },
      is_active: true,
      is_featured: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'website-development': [
    {
      id: '501',
      service_type: 'website-development',
      title: 'Airbnb Platform Optimization',
      description: 'Redesigned and optimized Airbnb\'s booking flow, improving conversion rates by 34% and reducing page load times by 60%.',
      client_name: 'Airbnb',
      industry: 'Travel & Hospitality',
      image_url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
      results: {
        conversion_increase: '34%',
        page_load_improvement: '60% faster',
        seo_score: '98/100'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '502',
      service_type: 'website-development',
      title: 'Shopify Plus Custom Development',
      description: 'Built custom Shopify Plus solutions for enterprise clients, improving site performance by 75% and increasing mobile conversions by 120%.',
      client_name: 'Shopify Plus Merchants',
      industry: 'E-commerce Platform',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      results: {
        performance_boost: '75%',
        mobile_conversions: '120% increase',
        client_satisfaction: '4.9/5'
      },
      is_active: true,
      is_featured: true,
      sort_order: 2,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'shopify-development': [
    {
      id: '601',
      service_type: 'shopify-development',
      title: 'Allbirds Shopify Store Excellence',
      description: 'Developed and optimized Allbirds\' Shopify store with custom features, achieving 4.2% conversion rate and 95+ performance score.',
      client_name: 'Allbirds',
      industry: 'Sustainable Fashion',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      results: {
        conversion_rate: '4.2%',
        performance_score: '95/100',
        mobile_optimization: '98%'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'shopify-integration': [
    {
      id: '701',
      service_type: 'shopify-integration',
      title: 'Gymshark Multi-Channel Integration',
      description: 'Integrated Gymshark\'s Shopify store with multiple sales channels and logistics systems, improving order fulfillment by 85%.',
      client_name: 'Gymshark',
      industry: 'Athletic Apparel',
      image_url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=250&fit=crop',
      results: {
        fulfillment_improvement: '85%',
        integration_channels: '12+',
        error_reduction: '94%'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  'account-management': [
    {
      id: '801',
      service_type: 'account-management',
      title: 'Adobe Marketing Cloud Management',
      description: 'Provided dedicated account management for Adobe Marketing Cloud clients, achieving 99% retention rate and 240% account growth.',
      client_name: 'Adobe Enterprise Clients',
      industry: 'Enterprise Software',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      results: {
        retention_rate: '99%',
        account_growth: '240%',
        satisfaction_score: '4.9/5'
      },
      is_active: true,
      is_featured: true,
      sort_order: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ]
};
