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

// Service-specific case studies
const getServiceSpecificCaseStudies = (serviceType: string): ServiceCaseStudy[] => {
  const baseTimestamp = new Date().toISOString();

  switch (serviceType) {
    case 'amazon-advertising':
      return [
        {
          id: '1',
          service_type: serviceType,
          title: 'Kitchen Appliance Brand Achieves 400% Sales Growth',
          description: 'A mid-sized kitchen appliance company was struggling with low visibility on Amazon despite having quality products. We implemented a comprehensive Amazon advertising strategy including Sponsored Products, Sponsored Brands, and strategic keyword optimization. Within 6 months, we transformed their presence from page 3 rankings to consistent top 5 positions across their main product categories.',
          client_name: 'CookPro Solutions',
          industry: 'Kitchen Appliances',
          results: { 
            'Sales Increase': '400%', 
            'ACOS Reduction': '45%', 
            'Organic Ranking': 'Top 5',
            'Revenue Growth': '$2.3M'
          },
          is_featured: true,
          sort_order: 0,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '2',
          service_type: serviceType,
          title: 'Beauty Brand Dominates Competitive Category',
          description: 'A beauty startup needed to compete against established brands in the highly competitive skincare category. Our Amazon advertising specialists developed a multi-layered campaign strategy focusing on long-tail keywords and customer targeting. We optimized their product listings and implemented strategic bidding to maximize visibility while maintaining profitability.',
          client_name: 'GlowUp Skincare',
          industry: 'Beauty & Personal Care',
          results: { 
            'Market Share': '15%', 
            'Click-Through Rate': '8.5%', 
            'Conversion Rate': '12%',
            'Monthly Revenue': '$450K'
          },
          is_featured: false,
          sort_order: 1,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '3',
          service_type: serviceType,
          title: 'Electronics Brand Scales from $10K to $500K Monthly',
          description: 'A tech startup with innovative phone accessories was generating only $10K monthly on Amazon. Through strategic Sponsored Display campaigns, enhanced brand content, and competitive analysis, we helped them scale their business exponentially. Our data-driven approach identified untapped keywords and optimized their advertising spend for maximum ROI.',
          client_name: 'TechGear Innovations',
          industry: 'Electronics',
          results: { 
            'Monthly Revenue': '$500K', 
            'ROI Improvement': '650%', 
            'Keyword Rankings': '200+',
            'Brand Recognition': '85%'
          },
          is_featured: true,
          sort_order: 2,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '4',
          service_type: serviceType,
          title: 'Home & Garden Brand Expands to 5 New Categories',
          description: 'An established home improvement brand wanted to expand into new product categories on Amazon. We developed category-specific advertising strategies, conducted thorough competitor analysis, and implemented cross-selling techniques. Our approach helped them successfully penetrate new markets while maintaining their core business growth.',
          client_name: 'HomeVantage Co.',
          industry: 'Home & Garden',
          results: { 
            'New Categories': '5', 
            'Cross-sell Rate': '35%', 
            'Category Ranking': 'Top 10',
            'Overall Growth': '280%'
          },
          is_featured: false,
          sort_order: 3,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '5',
          service_type: serviceType,
          title: 'Sports Equipment Brand Captures Seasonal Success',
          description: 'A sports equipment manufacturer needed to maximize their seasonal sales periods. We created dynamic advertising campaigns that scaled with demand, implemented seasonal keyword strategies, and optimized inventory management through advertising insights. The result was record-breaking performance during peak seasons.',
          client_name: 'FitnessPro Gear',
          industry: 'Sports & Outdoors',
          results: { 
            'Seasonal Sales': '320%', 
            'Inventory Turnover': '5x', 
            'Peak Season ROI': '12:1',
            'Brand Awareness': '75%'
          },
          is_featured: true,
          sort_order: 4,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '6',
          service_type: serviceType,
          title: 'Pet Supplies Brand Achieves Amazon\'s Choice Status',
          description: 'A pet supplies company aimed to achieve Amazon\'s Choice status for their flagship products. Through optimized advertising campaigns, review management, and strategic pricing, we helped them meet all criteria for this prestigious badge. This achievement significantly boosted their organic visibility and sales.',
          client_name: 'PawPerfect Supplies',
          industry: 'Pet Supplies',
          results: { 
            'Amazon\'s Choice': '3 Products', 
            'Organic Traffic': '450%', 
            'Review Rating': '4.8/5',
            'Sales Velocity': '600%'
          },
          is_featured: false,
          sort_order: 5,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '7',
          service_type: serviceType,
          title: 'Fashion Accessory Brand Builds Loyal Customer Base',
          description: 'A fashion accessories brand struggled with customer retention on Amazon. We implemented targeted advertising campaigns focused on customer lifetime value, developed retargeting strategies, and optimized their brand store. Our comprehensive approach resulted in a loyal customer base and significant repeat purchase rates.',
          client_name: 'StyleCraft Accessories',
          industry: 'Fashion',
          results: { 
            'Customer Retention': '65%', 
            'Repeat Purchase Rate': '40%', 
            'Brand Store Traffic': '300%',
            'Customer LTV': '$180'
          },
          is_featured: true,
          sort_order: 6,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '8',
          service_type: serviceType,
          title: 'Health Supplement Brand Navigates Amazon Compliance',
          description: 'A health supplements company faced Amazon compliance challenges while trying to scale their advertising. We developed compliant advertising strategies, optimized their listings to meet Amazon\'s strict guidelines, and created educational content that converts. Our expertise in the health category helped them grow safely and sustainably.',
          client_name: 'VitalHealth Nutrition',
          industry: 'Health & Wellness',
          results: { 
            'Compliance Score': '100%', 
            'Ad Approval Rate': '95%', 
            'Organic Ranking': 'Top 3',
            'Monthly Growth': '45%'
          },
          is_featured: false,
          sort_order: 7,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
      ];

    case 'google-advertising':
      return [
        {
          id: '1',
          service_type: serviceType,
          title: 'Local Law Firm Dominates Search Results',
          description: 'A personal injury law firm was losing potential clients to competitors in Google search results. We developed a comprehensive Google Ads strategy targeting high-intent keywords, implemented location-based targeting, and created compelling ad copy that emphasized their expertise. Our campaign optimization reduced cost per lead by 60% while tripling qualified inquiries.',
          client_name: 'Justice Partners Law',
          industry: 'Legal Services',
          results: { 
            'Cost Per Lead': '-60%', 
            'Qualified Leads': '300%', 
            'Search Impression Share': '85%',
            'Conversion Rate': '15.2%'
          },
          is_featured: true,
          sort_order: 0,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '2',
          service_type: serviceType,
          title: 'SaaS Startup Scales from $50K to $2M ARR',
          description: 'A B2B SaaS platform needed to scale their customer acquisition through Google Ads. We implemented a full-funnel advertising approach, targeting decision-makers with compelling value propositions. Through continuous optimization of ad copy, landing pages, and bidding strategies, we helped them achieve exponential growth while maintaining a healthy CAC ratio.',
          client_name: 'CloudFlow Technologies',
          industry: 'SaaS',
          results: { 
            'Annual Revenue': '$2M', 
            'CAC Reduction': '45%', 
            'Lead Quality Score': '9.2/10',
            'Trial to Paid': '28%'
          },
          is_featured: false,
          sort_order: 1,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '3',
          service_type: serviceType,
          title: 'E-commerce Fashion Store Achieves 8x ROAS',
          description: 'An online fashion retailer was struggling with Google Shopping campaigns and low return on ad spend. We restructured their product feed, implemented strategic bidding for seasonal trends, and created targeted campaigns for different customer segments. Our data-driven approach delivered exceptional results with industry-leading ROAS.',
          client_name: 'TrendStyle Boutique',
          industry: 'Fashion E-commerce',
          results: { 
            'ROAS': '8:1', 
            'Shopping Campaign CTR': '3.8%', 
            'Revenue Growth': '420%',
            'Product Visibility': '90%'
          },
          is_featured: true,
          sort_order: 2,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '4',
          service_type: serviceType,
          title: 'Healthcare Practice Doubles Patient Bookings',
          description: 'A dental practice wanted to increase patient bookings through online advertising. We created targeted Google Ads campaigns focusing on local search terms, implemented call extensions for immediate bookings, and developed landing pages optimized for conversions. Our healthcare-compliant approach significantly increased their patient base.',
          client_name: 'Bright Smile Dental',
          industry: 'Healthcare',
          results: { 
            'Patient Bookings': '200%', 
            'Local Search Ranking': '#1', 
            'Call Conversions': '65%',
            'Practice Growth': '150%'
          },
          is_featured: false,
          sort_order: 3,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '5',
          service_type: serviceType,
          title: 'Real Estate Agency Generates 500+ Quality Leads Monthly',
          description: 'A commercial real estate agency needed a consistent flow of qualified leads for their premium properties. We developed targeted Google Ads campaigns focusing on high-value keywords, implemented lead scoring systems, and created compelling ad extensions. Our strategy generated a steady stream of high-quality prospects.',
          client_name: 'Premier Commercial Realty',
          industry: 'Real Estate',
          results: { 
            'Monthly Leads': '500+', 
            'Lead Quality Score': '8.5/10', 
            'Cost Per Qualified Lead': '-55%',
            'Deal Closure Rate': '18%'
          },
          is_featured: true,
          sort_order: 4,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '6',
          service_type: serviceType,
          title: 'Manufacturing Company Expands B2B Client Base',
          description: 'An industrial manufacturing company wanted to reach new B2B clients through Google Ads. We created industry-specific campaigns targeting decision-makers, implemented LinkedIn integration for enhanced targeting, and developed technical landing pages that converted prospects into qualified leads.',
          client_name: 'IndustrialTech Solutions',
          industry: 'Manufacturing',
          results: { 
            'B2B Leads': '380%', 
            'Enterprise Clients': '25', 
            'Average Deal Size': '$125K',
            'Sales Cycle': '-30%'
          },
          is_featured: false,
          sort_order: 5,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '7',
          service_type: serviceType,
          title: 'Education Platform Reaches 10,000 Students',
          description: 'An online education platform needed to scale their student enrollment through Google Ads. We created campaigns targeting specific educational keywords, implemented demographic targeting for different course offerings, and optimized for student lifetime value rather than just initial conversions.',
          client_name: 'LearnTech Academy',
          industry: 'Education',
          results: { 
            'Student Enrollment': '10,000', 
            'Cost Per Acquisition': '-50%', 
            'Course Completion Rate': '75%',
            'Student LTV': '$450'
          },
          is_featured: true,
          sort_order: 6,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '8',
          service_type: serviceType,
          title: 'Financial Services Firm Builds Trust Through Google Ads',
          description: 'A financial advisory firm needed to build trust and credibility while generating leads through Google Ads. We developed campaigns highlighting their credentials, created educational content that positions them as experts, and implemented strict compliance measures. Our approach built both visibility and credibility.',
          client_name: 'WealthGuard Financial',
          industry: 'Financial Services',
          results: { 
            'Lead Quality': '9.1/10', 
            'Brand Trust Score': '88%', 
            'Client Acquisition': '220%',
            'Average Client Value': '$85K'
          },
          is_featured: false,
          sort_order: 7,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
      ];

    case 'meta-advertising':
      return [
        {
          id: '1',
          service_type: serviceType,
          title: 'Lifestyle Brand Builds 500K Engaged Community',
          description: 'A sustainable lifestyle brand wanted to build a community around their eco-friendly values. We developed a comprehensive Meta advertising strategy focusing on community building, user-generated content, and values-based targeting. Our campaigns not only drove sales but created a loyal brand community that actively promotes their products.',
          client_name: 'EcoLiving Co.',
          industry: 'Sustainable Products',
          results: { 
            'Community Size': '500K', 
            'Engagement Rate': '8.5%', 
            'User-Generated Content': '2,500 posts',
            'Brand Advocacy': '65%'
          },
          is_featured: true,
          sort_order: 0,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '2',
          service_type: serviceType,
          title: 'Local Restaurant Chain Drives 400% Foot Traffic',
          description: 'A regional restaurant chain needed to increase foot traffic across their 15 locations. We created location-based Meta campaigns with compelling food photography, implemented event promotion strategies, and used local community targeting. Our hyper-local approach significantly increased visits and brand awareness in each market.',
          client_name: 'Flavor Town Restaurants',
          industry: 'Food & Beverage',
          results: { 
            'Foot Traffic': '400%', 
            'Location Awareness': '85%', 
            'Event Attendance': '250%',
            'Revenue Per Location': '$180K'
          },
          is_featured: false,
          sort_order: 1,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '3',
          service_type: serviceType,
          title: 'Fitness App Acquires 100K Active Users',
          description: 'A fitness app startup needed to acquire high-quality users who would remain engaged with their platform. We developed Meta campaigns targeting fitness enthusiasts, created compelling video content showcasing workout results, and implemented app event optimization for long-term user retention.',
          client_name: 'FitTrack Pro',
          industry: 'Health & Fitness',
          results: { 
            'Active Users': '100K', 
            'User Retention': '70%', 
            'In-App Purchases': '25%',
            'Daily Active Users': '45K'
          },
          is_featured: true,
          sort_order: 2,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '4',
          service_type: serviceType,
          title: 'Beauty Brand Achieves Viral Success on Instagram',
          description: 'An emerging beauty brand wanted to break through the crowded Instagram beauty space. We created visually stunning campaigns featuring real customer transformations, implemented influencer collaboration strategies, and optimized for social sharing. Our creative approach led to multiple viral moments and exponential growth.',
          client_name: 'Radiant Beauty Co.',
          industry: 'Beauty & Cosmetics',
          results: { 
            'Viral Posts': '12', 
            'Influencer Partnerships': '150', 
            'Social Shares': '250K',
            'Brand Mentions': '500K'
          },
          is_featured: false,
          sort_order: 3,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '5',
          service_type: serviceType,
          title: 'Tech Startup Generates $5M in Pre-Orders',
          description: 'A hardware tech startup needed to generate pre-orders for their innovative product launch. We created anticipation-building Meta campaigns, implemented retargeting sequences for interested prospects, and developed compelling product demonstration videos. Our strategy successfully funded their product development.',
          client_name: 'InnovateTech Labs',
          industry: 'Technology',
          results: { 
            'Pre-Orders': '$5M', 
            'Email Signups': '75K', 
            'Video Views': '2.5M',
            'Conversion Rate': '12%'
          },
          is_featured: true,
          sort_order: 4,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '6',
          service_type: serviceType,
          title: 'Fashion Designer Builds Global Brand Recognition',
          description: 'An independent fashion designer wanted to build international brand recognition through social media. We created culturally-relevant campaigns for different markets, implemented user-generated content strategies, and optimized for brand awareness metrics. Our approach established them as a recognized global fashion brand.',
          client_name: 'Milano Design Studio',
          industry: 'Fashion Design',
          results: { 
            'Global Reach': '50 countries', 
            'Brand Recognition': '78%', 
            'International Sales': '300%',
            'Fashion Week Features': '5'
          },
          is_featured: false,
          sort_order: 5,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '7',
          service_type: serviceType,
          title: 'Non-Profit Raises $2M Through Facebook Fundraising',
          description: 'A environmental non-profit needed to increase donations and awareness for their cause. We developed emotional storytelling campaigns, implemented Facebook\'s fundraising tools, and created shareable content that educated audiences about environmental issues. Our campaigns significantly increased both donations and volunteer participation.',
          client_name: 'Green Future Foundation',
          industry: 'Non-Profit',
          results: { 
            'Funds Raised': '$2M', 
            'New Volunteers': '5,000', 
            'Campaign Reach': '10M',
            'Engagement Rate': '15%'
          },
          is_featured: true,
          sort_order: 6,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '8',
          service_type: serviceType,
          title: 'Home Decor Brand Masters Pinterest Shopping',
          description: 'A home decor brand wanted to leverage Pinterest\'s shopping features through Meta\'s advertising platform. We created Pinterest-optimized content, implemented product catalog integration, and developed seasonal campaigns that aligned with home decoration trends. Our approach made them a top performer in the home decor category.',
          client_name: 'Cozy Home Designs',
          industry: 'Home Decor',
          results: { 
            'Pinterest Traffic': '600%', 
            'Shopping Conversions': '35%', 
            'Seasonal Sales': '450%',
            'Product Saves': '100K'
          },
          is_featured: false,
          sort_order: 7,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
      ];

    case 'shopify-development':
      return [
        {
          id: '1',
          service_type: serviceType,
          title: 'Custom Shopify Store Increases Conversion Rate by 340%',
          description: 'A jewelry brand was struggling with a generic Shopify theme that didn\'t showcase their products effectively. We developed a custom Shopify store with advanced product visualization, implemented a sophisticated filtering system, and created a seamless checkout process. The custom development addressed their specific needs and significantly improved user experience.',
          client_name: 'Elegant Gems',
          industry: 'Jewelry',
          results: { 
            'Conversion Rate': '+340%', 
            'Page Load Speed': '2.1s', 
            'Mobile Optimization': '98%',
            'Customer Satisfaction': '4.9/5'
          },
          is_featured: true,
          sort_order: 0,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '2',
          service_type: serviceType,
          title: 'Multi-Vendor Marketplace Built on Shopify Plus',
          description: 'A client wanted to create a multi-vendor marketplace similar to Etsy but with more control and customization. We built a comprehensive marketplace platform using Shopify Plus, implemented vendor management systems, automated commission calculations, and created separate vendor dashboards. The platform now hosts over 500 vendors.',
          client_name: 'ArtisanHub Marketplace',
          industry: 'Marketplace',
          results: { 
            'Active Vendors': '500+', 
            'Platform Revenue': '$8.5M', 
            'Vendor Satisfaction': '92%',
            'Transaction Volume': '50K/month'
          },
          is_featured: false,
          sort_order: 1,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '3',
          service_type: serviceType,
          title: 'B2B Wholesale Portal Streamlines Operations',
          description: 'A manufacturing company needed a B2B wholesale portal to manage their dealer network efficiently. We developed a custom Shopify Plus solution with tiered pricing, bulk ordering capabilities, credit management, and automated approval workflows. The system transformed their wholesale operations and improved dealer relationships.',
          client_name: 'Industrial Supply Pro',
          industry: 'B2B Manufacturing',
          results: { 
            'Order Processing': '-75% time', 
            'Dealer Efficiency': '300%', 
            'Error Reduction': '90%',
            'Revenue Growth': '250%'
          },
          is_featured: true,
          sort_order: 2,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '4',
          service_type: serviceType,
          title: 'Subscription Box Platform Automates Everything',
          description: 'A subscription box company was manually managing their entire operation. We built a comprehensive Shopify solution with subscription management, automated billing, inventory tracking, and customer portal features. The automation allowed them to scale from 100 to 10,000 subscribers without additional staff.',
          client_name: 'Monthly Delights',
          industry: 'Subscription Commerce',
          results: { 
            'Subscriber Growth': '10,000%', 
            'Automation Level': '95%', 
            'Operational Costs': '-60%',
            'Customer Retention': '85%'
          },
          is_featured: false,
          sort_order: 3,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '5',
          service_type: serviceType,
          title: 'International Brand Expands to 25 Countries',
          description: 'A growing brand wanted to expand internationally but faced complex challenges with currencies, languages, and shipping. We developed a multi-market Shopify Plus solution with automatic currency conversion, multi-language support, regional pricing, and integrated international shipping. The expansion was seamless and profitable.',
          client_name: 'Global Fashion House',
          industry: 'International Fashion',
          results: { 
            'Market Expansion': '25 countries', 
            'International Revenue': '40%', 
            'Conversion Rate': '15.8%',
            'Shipping Efficiency': '95%'
          },
          is_featured: true,
          sort_order: 4,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '6',
          service_type: serviceType,
          title: 'Custom Product Configurator Boosts Sales 450%',
          description: 'A furniture company needed customers to visualize custom products before purchase. We developed an advanced 3D product configurator integrated with Shopify, allowing customers to customize materials, colors, and dimensions in real-time. The visual customization tool dramatically increased confidence and sales.',
          client_name: 'CustomCraft Furniture',
          industry: 'Custom Furniture',
          results: { 
            'Sales Increase': '450%', 
            'Product Returns': '-80%', 
            'Customization Rate': '75%',
            'Average Order Value': '+220%'
          },
          is_featured: false,
          sort_order: 5,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '7',
          service_type: serviceType,
          title: 'Mobile-First Store Captures Gen Z Market',
          description: 'A streetwear brand targeting Gen Z needed a mobile-first shopping experience. We developed a highly optimized mobile Shopify store with social shopping features, influencer integration, and gamification elements. The mobile-centric approach perfectly aligned with their target audience\'s shopping behavior.',
          client_name: 'Urban Street Co.',
          industry: 'Streetwear',
          results: { 
            'Mobile Conversions': '85%', 
            'Gen Z Engagement': '12 min avg', 
            'Social Sharing': '500%',
            'Repeat Purchase Rate': '60%'
          },
          is_featured: true,
          sort_order: 6,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '8',
          service_type: serviceType,
          title: 'Performance Optimization Saves $100K in Ad Spend',
          description: 'An established e-commerce store was losing money due to slow loading times and poor performance. We completely optimized their Shopify store, improved Core Web Vitals, implemented advanced caching, and optimized all images and code. The performance improvements dramatically reduced their advertising costs and increased organic rankings.',
          client_name: 'SportGear Central',
          industry: 'Sports Equipment',
          results: { 
            'Page Speed': '+180%', 
            'Ad Cost Savings': '$100K', 
            'SEO Rankings': '+150%',
            'Revenue Per Visitor': '+95%'
          },
          is_featured: false,
          sort_order: 7,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
      ];

    case 'shopify-integration':
      return [
        {
          id: '1',
          service_type: serviceType,
          title: 'ERP Integration Streamlines Inventory Across 50 Locations',
          description: 'A retail chain with 50 physical locations needed real-time inventory synchronization between their Shopify store and ERP system. We developed a robust integration that automatically updates inventory levels, syncs product information, and manages purchase orders across all channels. This eliminated overselling and improved operational efficiency.',
          client_name: 'RetailMax Chain',
          industry: 'Retail',
          results: { 
            'Inventory Accuracy': '99.8%', 
            'Overselling Reduction': '100%', 
            'Operational Efficiency': '+280%',
            'Stock Management Time': '-90%'
          },
          is_featured: true,
          sort_order: 0,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '2',
          service_type: serviceType,
          title: 'Marketing Automation Increases Customer LTV by 300%',
          description: 'An online beauty brand wanted to increase customer lifetime value through better marketing automation. We integrated Shopify with Klaviyo, HubSpot, and Facebook Pixel to create sophisticated customer journeys. The automated sequences included abandoned cart recovery, post-purchase follow-ups, and personalized product recommendations.',
          client_name: 'Beauty Bliss Co.',
          industry: 'Beauty & Cosmetics',
          results: { 
            'Customer LTV': '+300%', 
            'Email Revenue': '35% of total', 
            'Automation ROI': '2,400%',
            'Customer Retention': '+85%'
          },
          is_featured: false,
          sort_order: 1,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '3',
          service_type: serviceType,
          title: 'Accounting Integration Saves 40 Hours Weekly',
          description: 'A growing e-commerce business was spending excessive time on manual bookkeeping and financial reporting. We integrated their Shopify store with QuickBooks and Xero, implementing automated transaction recording, tax calculations, and financial reporting. The integration eliminated manual data entry and improved financial accuracy.',
          client_name: 'TechGadgets Plus',
          industry: 'Electronics',
          results: { 
            'Time Savings': '40 hours/week', 
            'Accounting Accuracy': '99.9%', 
            'Financial Reporting': 'Real-time',
            'Tax Compliance': '100%'
          },
          is_featured: true,
          sort_order: 2,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '4',
          service_type: serviceType,
          title: 'Multi-Channel Selling Increases Revenue by 400%',
          description: 'A product manufacturer wanted to sell across multiple channels while maintaining centralized inventory management. We integrated their Shopify store with Amazon, eBay, Walmart, and Facebook Marketplace, creating a unified system that automatically syncs inventory, pricing, and order management across all platforms.',
          client_name: 'HomeDecor Innovations',
          industry: 'Home & Garden',
          results: { 
            'Revenue Growth': '400%', 
            'Channel Coverage': '8 platforms', 
            'Inventory Sync': '99.5%',
            'Order Management': 'Centralized'
          },
          is_featured: false,
          sort_order: 3,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '5',
          service_type: serviceType,
          title: 'Shipping API Integration Reduces Costs by 45%',
          description: 'An international e-commerce store was struggling with high shipping costs and complex logistics. We integrated multiple shipping APIs including FedEx, UPS, DHL, and local carriers, implementing smart shipping logic that automatically selects the most cost-effective option. Real-time tracking and automated notifications improved customer satisfaction.',
          client_name: 'Global Marketplace',
          industry: 'International E-commerce',
          results: { 
            'Shipping Cost Reduction': '45%', 
            'Delivery Speed': '+60%', 
            'Customer Satisfaction': '96%',
            'Tracking Accuracy': '100%'
          },
          is_featured: true,
          sort_order: 4,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '6',
          service_type: serviceType,
          title: 'CRM Integration Improves Customer Service by 250%',
          description: 'A subscription-based company needed better customer relationship management to handle growing support demands. We integrated Shopify with Zendesk and Salesforce, creating a comprehensive view of customer interactions, purchase history, and support tickets. This integration dramatically improved response times and resolution rates.',
          client_name: 'SubscribeBox Pro',
          industry: 'Subscription Services',
          results: { 
            'Response Time': '-75%', 
            'Resolution Rate': '+250%', 
            'Customer Satisfaction': '4.8/5',
            'Support Efficiency': '+180%'
          },
          is_featured: false,
          sort_order: 5,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '7',
          service_type: serviceType,
          title: 'Payment Gateway Integration Reduces Checkout Abandonment',
          description: 'An online store was losing customers during checkout due to limited payment options and security concerns. We integrated multiple payment gateways including Stripe, PayPal, Apple Pay, and local payment methods, implementing fraud detection and optimizing the checkout flow. The improved payment experience significantly reduced abandonment.',
          client_name: 'Fashion Forward Store',
          industry: 'Fashion',
          results: { 
            'Checkout Abandonment': '-65%', 
            'Payment Success Rate': '98.5%', 
            'Fraud Reduction': '90%',
            'Conversion Rate': '+140%'
          },
          is_featured: true,
          sort_order: 6,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '8',
          service_type: serviceType,
          title: 'Analytics Integration Provides 360° Business Intelligence',
          description: 'A multi-brand retailer needed comprehensive analytics to make data-driven decisions across their entire operation. We integrated Shopify with Google Analytics 4, Facebook Analytics, and custom business intelligence tools, creating unified dashboards that provide insights into customer behavior, sales performance, and operational metrics.',
          client_name: 'Multi-Brand Retail',
          industry: 'Retail',
          results: { 
            'Data Accuracy': '99.7%', 
            'Decision Speed': '+300%', 
            'ROI Tracking': 'Real-time',
            'Business Intelligence': '360° view'
          },
          is_featured: false,
          sort_order: 7,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
      ];

    case 'account-management':
      return [
        {
          id: '1',
          service_type: serviceType,
          title: 'Complete Ad Account Optimization Triples ROAS',
          description: 'A growing e-commerce brand was struggling with declining ad performance across Google, Facebook, and Amazon. Our account management team conducted a comprehensive audit, restructured campaigns, implemented advanced targeting strategies, and optimized bidding algorithms. Through continuous monitoring and optimization, we transformed their advertising efficiency.',
          client_name: 'TrendSetter Fashion',
          industry: 'Fashion E-commerce',
          results: { 
            'ROAS Improvement': '300%', 
            'Cost Per Acquisition': '-60%', 
            'Campaign Performance': '+250%',
            'Revenue Growth': '180%'
          },
          is_featured: true,
          sort_order: 0,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '2',
          service_type: serviceType,
          title: 'Multi-Platform Campaign Management Scales SaaS Business',
          description: 'A B2B SaaS company needed expert management across LinkedIn, Google Ads, and retargeting campaigns to scale their enterprise sales. Our team developed platform-specific strategies, implemented advanced attribution models, and created cohesive messaging across all channels. The integrated approach significantly improved lead quality and sales velocity.',
          client_name: 'CloudTech Solutions',
          industry: 'B2B SaaS',
          results: { 
            'Lead Quality Score': '9.5/10', 
            'Sales Velocity': '+180%', 
            'Enterprise Deals': '+320%',
            'Customer Acquisition Cost': '-45%'
          },
          is_featured: false,
          sort_order: 1,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '3',
          service_type: serviceType,
          title: 'Performance Monitoring Prevents $500K Budget Waste',
          description: 'A large retailer was unknowingly wasting significant ad spend due to poor campaign monitoring and optimization. Our account management team implemented real-time performance tracking, automated bid adjustments, and proactive budget optimization. Early detection of underperforming campaigns saved substantial advertising budget.',
          client_name: 'MegaRetail Corp',
          industry: 'Retail',
          results: { 
            'Budget Waste Prevention': '$500K', 
            'Performance Monitoring': '24/7', 
            'Optimization Frequency': 'Daily',
            'Efficiency Improvement': '+220%'
          },
          is_featured: true,
          sort_order: 2,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '4',
          service_type: serviceType,
          title: 'Strategic Account Planning Achieves 500% Growth',
          description: 'A healthcare startup needed strategic guidance to allocate their advertising budget effectively across different growth stages. Our account management team developed a comprehensive 12-month strategy, implemented phased campaign rollouts, and continuously optimized based on business goals and market conditions.',
          client_name: 'HealthTech Innovations',
          industry: 'Healthcare Technology',
          results: { 
            'Business Growth': '500%', 
            'Market Penetration': '15%', 
            'Strategic Planning': '12-month roadmap',
            'Goal Achievement': '98%'
          },
          is_featured: false,
          sort_order: 3,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '5',
          service_type: serviceType,
          title: 'Crisis Management Saves Brand During PR Challenge',
          description: 'When a consumer brand faced a public relations crisis, our account management team quickly pivoted their advertising strategy, paused controversial campaigns, and implemented reputation management tactics. Swift action and strategic communication prevented significant brand damage and maintained customer trust.',
          client_name: 'FamilyBrand Products',
          industry: 'Consumer Goods',
          results: { 
            'Brand Sentiment Recovery': '95%', 
            'Crisis Response Time': '2 hours', 
            'Revenue Protection': '$2.5M',
            'Reputation Score': '4.6/5'
          },
          is_featured: true,
          sort_order: 4,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '6',
          service_type: serviceType,
          title: 'Automated Reporting Improves Decision Making Speed',
          description: 'A multi-location business was struggling with manual reporting across their advertising accounts, leading to delayed decision-making. Our team implemented automated reporting systems, custom dashboards, and real-time alerts. The streamlined reporting process enabled faster reactions to market changes and opportunities.',
          client_name: 'Regional Services Group',
          industry: 'Professional Services',
          results: { 
            'Reporting Automation': '95%', 
            'Decision Speed': '+400%', 
            'Data Accuracy': '99.8%',
            'Strategic Agility': '+300%'
          },
          is_featured: false,
          sort_order: 5,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '7',
          service_type: serviceType,
          title: 'Seasonal Campaign Management Maximizes Holiday Sales',
          description: 'A gift retailer needed expert management of their complex seasonal advertising campaigns across Black Friday, Cyber Monday, and Christmas. Our team developed detailed seasonal strategies, managed budget allocation throughout peak periods, and optimized campaigns in real-time to capture maximum holiday revenue.',
          client_name: 'Holiday Gifts Emporium',
          industry: 'Seasonal Retail',
          results: { 
            'Holiday Revenue': '+450%', 
            'Peak Day Performance': '2,000% normal', 
            'Budget Efficiency': '+180%',
            'Market Share': '25%'
          },
          is_featured: true,
          sort_order: 6,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
        {
          id: '8',
          service_type: serviceType,
          title: 'International Account Expansion Enters 20 New Markets',
          description: 'A successful domestic brand wanted to expand internationally but lacked expertise in global advertising management. Our team managed the complex process of setting up advertising accounts in 20 countries, implementing localized strategies, and ensuring compliance with regional advertising regulations.',
          client_name: 'Global Expansion Co.',
          industry: 'International Business',
          results: { 
            'Market Expansion': '20 countries', 
            'International Revenue': '40% of total', 
            'Compliance Rate': '100%',
            'Global Brand Recognition': '85%'
          },
          is_featured: false,
          sort_order: 7,
          is_active: true,
          created_at: baseTimestamp,
          updated_at: baseTimestamp,
        },
      ];

    default:
      // Return generic case studies for other service types
      return getMockCaseStudies('generic');
  }
};

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
        setCaseStudies(caseStudiesData && caseStudiesData.length > 0 ? caseStudiesData : getServiceSpecificCaseStudies(serviceType));
        setStats(statsData && statsData.length > 0 ? statsData : getMockStats(serviceType));
        setReviews(reviewsData && reviewsData.length > 0 ? reviewsData : getMockReviews(serviceType));
      } catch (error) {
        console.error('Error fetching service data:', error);
        // Fall back to mock data on error
        setCaseStudies(getServiceSpecificCaseStudies(serviceType));
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
