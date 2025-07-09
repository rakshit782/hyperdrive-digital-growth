
import { useState, useEffect } from 'react';

export interface ServiceCaseStudy {
  id: string;
  title: string;
  description: string;
  client_name: string;
  industry: string;
  results: Record<string, string>;
  image_url?: string;
  challenge?: string;
  solution?: string;
  key_success_factors?: string[];
  timeline?: string;
  testimonial?: string;
}

export interface ServiceStat {
  id: string;
  stat_label: string;
  stat_value: string;
  stat_description: string;
  icon_name?: string;
}

export interface ServiceReview {
  id: string;
  client_name: string;
  company: string;
  review_text: string;
  rating: number;
  avatar_url?: string;
  results_achieved?: string;
}

const getMockCaseStudies = (serviceType: string): ServiceCaseStudy[] => {
  const baseStudies = {
    'amazon-advertising': [
      {
        id: '1',
        title: 'Premium Electronics Brand Achieves 450% ROI Growth',
        description: 'A leading electronics manufacturer struggled with low visibility and poor conversion rates on Amazon. Through strategic PPC optimization and listing enhancement, we transformed their marketplace presence.',
        client_name: 'TechFlow Electronics',
        industry: 'Consumer Electronics',
        challenge: 'Low organic ranking, high ACoS, poor product visibility, and declining sales despite quality products.',
        solution: 'Implemented comprehensive keyword research, optimized product listings with enhanced A+ content, restructured PPC campaigns with precise targeting, and developed a strategic bidding system.',
        results: {
          'ROI Increase': '+450%',
          'ACoS Reduction': '-65%',
          'Sales Growth': '+380%',
          'Organic Ranking': 'Top 3 for main keywords'
        },
        key_success_factors: [
          'Data-driven keyword optimization',
          'Strategic bid management',
          'Enhanced product content',
          'Competitive analysis integration'
        ],
        timeline: '6 months',
        testimonial: 'The results exceeded our expectations. Our Amazon sales have become our primary revenue driver.'
      },
      {
        id: '2',
        title: 'Home & Garden Brand Dominates Competitive Market',
        description: 'A home improvement company needed to compete against established brands in the saturated home & garden category.',
        client_name: 'GreenSpace Solutions',
        industry: 'Home & Garden',
        challenge: 'Highly competitive market, limited brand recognition, and struggling to gain market share against established competitors.',
        solution: 'Developed a multi-tiered advertising strategy combining Sponsored Products, Brands, and Display ads with optimized product listings.',
        results: {
          'Market Share': '+75%',
          'Brand Recognition': '+250%',
          'Revenue Growth': '+420%',
          'Customer Acquisition': '+300%'
        },
        key_success_factors: [
          'Multi-format advertising approach',
          'Brand building strategy',
          'Customer behavior analysis',
          'Seasonal campaign optimization'
        ],
        timeline: '8 months',
        testimonial: 'We went from unknown to market leader in our category. The strategic approach was game-changing.'
      }
    ],
    'walmart-advertising': [
      {
        id: '1',
        title: 'Consumer Goods Brand Captures 350% Revenue Growth',
        description: 'A consumer packaged goods company struggled to compete on Walmart Marketplace against established brands with larger advertising budgets.',
        client_name: 'FreshLife Essentials',
        industry: 'Consumer Packaged Goods',
        challenge: 'Limited visibility on Walmart, high competition from established brands, poor product discoverability, and low conversion rates.',
        solution: 'Implemented Walmart Connect advertising strategy with sponsored products, search ads, and display campaigns. Optimized product content and pricing strategy.',
        results: {
          'Revenue Growth': '+350%',
          'Click-Through Rate': '+180%',
          'Conversion Rate': '+125%',
          'Market Penetration': '+400%'
        },
        key_success_factors: [
          'Walmart-specific optimization',
          'Strategic product placement',
          'Competitive pricing analysis',
          'Enhanced product content'
        ],
        timeline: '5 months',
        testimonial: 'Walmart has become our fastest-growing sales channel. The expertise in Walmart Connect was exactly what we needed.'
      },
      {
        id: '2',
        title: 'Health & Wellness Brand Achieves Category Leadership',
        description: 'A health supplement company wanted to establish dominance in the competitive wellness category on Walmart.',
        client_name: 'VitalBoost Nutrition',
        industry: 'Health & Wellness',
        challenge: 'Saturated market, high advertising costs, difficulty in standing out among hundreds of similar products.',
        solution: 'Created targeted Walmart Connect campaigns with precise audience segmentation, optimized for high-intent keywords, and developed compelling product storytelling.',
        results: {
          'Category Ranking': 'Top 5 Position',
          'Sales Volume': '+275%',
          'Brand Awareness': '+320%',
          'Customer Loyalty': '+150%'
        },
        key_success_factors: [
          'Audience segmentation strategy',
          'High-intent keyword targeting',
          'Product storytelling optimization',
          'Customer retention focus'
        ],
        timeline: '7 months',
        testimonial: 'We are now a recognized leader in our category on Walmart. The growth has been phenomenal.'
      }
    ],
    'google-advertising': [
      {
        id: '1',
        title: 'B2B Software Company Scales to $2M Annual Revenue',
        description: 'A SaaS startup needed to compete against enterprise solutions while maintaining cost-effective customer acquisition.',
        client_name: 'CloudSync Pro',
        industry: 'B2B Software',
        challenge: 'High customer acquisition costs, competing against enterprise brands, limited brand recognition in the market.',
        solution: 'Developed comprehensive Google Ads strategy including Search, Display, and YouTube campaigns with advanced audience targeting and conversion optimization.',
        results: {
          'Annual Revenue': '$2M+',
          'Cost Per Acquisition': '-45%',
          'Lead Quality': '+180%',
          'Market Share': '+65%'
        },
        key_success_factors: [
          'Multi-channel approach',
          'Advanced audience targeting',
          'Conversion rate optimization',
          'Performance tracking integration'
        ],
        timeline: '12 months',
        testimonial: 'Google Ads became our primary growth engine. The ROI has been incredible and sustainable.'
      },
      {
        id: '2',
        title: 'E-commerce Fashion Brand Achieves 500% ROAS',
        description: 'An online fashion retailer needed to scale profitably during peak shopping seasons while maintaining brand positioning.',
        client_name: 'StyleHub Fashion',
        industry: 'Fashion & Retail',
        challenge: 'Seasonal fluctuations, high competition during peak periods, maintaining profitability while scaling.',
        solution: 'Implemented seasonal Google Ads strategy with Shopping campaigns, Performance Max, and strategic remarketing across all Google properties.',
        results: {
          'Return on Ad Spend': '500%',
          'Seasonal Revenue': '+350%',
          'Brand Visibility': '+200%',
          'Customer Lifetime Value': '+85%'
        },
        key_success_factors: [
          'Seasonal campaign optimization',
          'Shopping campaign excellence',
          'Cross-platform integration',
          'Customer journey mapping'
        ],
        timeline: '9 months',
        testimonial: 'Our Google Ads performance during peak season exceeded all expectations. Truly exceptional results.'
      }
    ],
    'meta-advertising': [
      {
        id: '1',
        title: 'Fitness Brand Builds Community of 100K+ Engaged Users',
        description: 'A fitness equipment company wanted to build a strong community and drive direct-to-consumer sales through social media.',
        client_name: 'FitForce Equipment',
        industry: 'Fitness & Health',
        challenge: 'Building brand community, converting social engagement to sales, competing against established fitness brands.',
        solution: 'Created comprehensive Meta advertising strategy focusing on community building, user-generated content, and conversion optimization across Facebook and Instagram.',
        results: {
          'Community Growth': '100K+ users',
          'Engagement Rate': '+275%',
          'Social Commerce Sales': '+400%',
          'Brand Loyalty': '+150%'
        },
        key_success_factors: [
          'Community-focused strategy',
          'User-generated content campaigns',
          'Social commerce optimization',
          'Influencer partnership integration'
        ],
        timeline: '10 months',
        testimonial: 'We built an incredible community that drives consistent sales. Social media is now our strongest channel.'
      },
      {
        id: '2',
        title: 'Beauty Brand Captures Gen Z Market with 300% Growth',
        description: 'A cosmetics startup needed to establish itself in the competitive beauty market and connect with younger demographics.',
        client_name: 'GlowUp Cosmetics',
        industry: 'Beauty & Cosmetics',
        challenge: 'Highly competitive beauty market, connecting with Gen Z audience, building brand trust and authenticity.',
        solution: 'Developed Meta advertising campaigns focused on authentic storytelling, influencer collaborations, and trend-based content across all Meta platforms.',
        results: {
          'Revenue Growth': '+300%',
          'Gen Z Engagement': '+250%',
          'Brand Recognition': '+180%',
          'Social Mentions': '+400%'
        },
        key_success_factors: [
          'Authentic brand storytelling',
          'Trend-based content strategy',
          'Micro-influencer partnerships',
          'Platform-specific optimization'
        ],
        timeline: '6 months',
        testimonial: 'We became the go-to brand for our demographic. The social strategy was perfectly executed.'
      }
    ],
    'website-development': [
      {
        id: '1',
        title: 'E-commerce Platform Achieves 275% Conversion Rate Boost',
        description: 'An online retailer needed a complete website overhaul to improve user experience and increase conversions from their existing traffic.',
        client_name: 'ModernMart Online',
        industry: 'E-commerce Retail',
        challenge: 'Outdated website design, poor mobile experience, slow loading times, and low conversion rates despite high traffic volume.',
        solution: 'Built a modern, responsive e-commerce platform with optimized user experience, fast loading speeds, and conversion-focused design elements.',
        results: {
          'Conversion Rate': '+275%',
          'Page Load Speed': '85% faster',
          'Mobile Experience': '+300% improvement',
          'Revenue Growth': '+220%'
        },
        key_success_factors: [
          'User experience optimization',
          'Mobile-first design approach',
          'Performance optimization',
          'Conversion funnel analysis'
        ],
        timeline: '4 months',
        testimonial: 'Our new website transformed our business. The conversion improvements exceeded all expectations.'
      },
      {
        id: '2',
        title: 'Professional Services Firm Generates 400% More Leads',
        description: 'A law firm needed a professional website that would establish credibility and generate qualified leads for their practice.',
        client_name: 'Sterling Legal Partners',
        industry: 'Professional Services',
        challenge: 'Outdated online presence, lack of credibility, poor lead generation, and difficulty standing out in competitive legal market.',
        solution: 'Developed a professional, trust-building website with SEO optimization, lead capture systems, and compelling content that showcases expertise.',
        results: {
          'Lead Generation': '+400%',
          'Online Credibility': '+250%',
          'Search Visibility': '+180%',
          'Client Acquisition': '+150%'
        },
        key_success_factors: [
          'Trust-building design elements',
          'SEO optimization strategy',
          'Lead capture optimization',
          'Professional content creation'
        ],
        timeline: '3 months',
        testimonial: 'Our website now generates more leads than all other marketing channels combined. Exceptional work.'
      }
    ],
    'account-management': [
      {
        id: '1',
        title: 'Multi-Channel Retailer Achieves 325% Revenue Growth',
        description: 'A growing retailer needed expert account management across multiple advertising platforms to scale efficiently.',
        client_name: 'Urban Lifestyle Co.',
        industry: 'Retail & Lifestyle',
        challenge: 'Managing multiple advertising accounts, maintaining consistency across platforms, optimizing cross-channel performance.',
        solution: 'Provided comprehensive account management across all major platforms with unified strategy, consistent messaging, and cross-platform optimization.',
        results: {
          'Cross-Channel Revenue': '+325%',
          'Account Efficiency': '+200%',
          'Cost Optimization': '-35%',
          'Brand Consistency': '+150%'
        },
        key_success_factors: [
          'Unified cross-platform strategy',
          'Consistent brand messaging',
          'Performance optimization',
          'Strategic account coordination'
        ],
        timeline: '8 months',
        testimonial: 'Having expert account management across all platforms was a game-changer for our growth strategy.'
      },
      {
        id: '2',
        title: 'Technology Startup Scales to Enterprise Level',
        description: 'A tech startup needed professional account management to transition from startup to enterprise-level operations.',
        client_name: 'InnovateTech Solutions',
        industry: 'Technology',
        challenge: 'Scaling advertising operations, maintaining performance during growth, optimizing budget allocation across platforms.',
        solution: 'Implemented enterprise-level account management with advanced analytics, budget optimization, and strategic growth planning.',
        results: {
          'Operational Scale': '500% increase',
          'Performance Consistency': '+180%',
          'Budget Efficiency': '+120%',
          'Growth Acceleration': '+250%'
        },
        key_success_factors: [
          'Enterprise-level processes',
          'Advanced analytics implementation',
          'Strategic growth planning',
          'Performance consistency focus'
        ],
        timeline: '12 months',
        testimonial: 'The professional account management enabled us to scale without losing performance. Critical for our growth.'
      }
    ],
    'shopify-development': [
      {
        id: '1',
        title: 'Fashion Brand Launches with $500K First-Year Revenue',
        description: 'A new fashion brand needed a complete Shopify store that would compete with established fashion retailers from day one.',
        client_name: 'Luxe Fashion House',
        industry: 'Fashion & Apparel',
        challenge: 'Entering competitive fashion market, creating premium brand experience, building customer trust as a new brand.',
        solution: 'Developed a premium Shopify store with custom design, advanced functionality, seamless user experience, and integrated marketing tools.',
        results: {
          'First-Year Revenue': '$500K+',
          'Conversion Rate': '4.2%',
          'Customer Satisfaction': '96%',
          'Repeat Purchase Rate': '45%'
        },
        key_success_factors: [
          'Premium design execution',
          'Custom functionality development',
          'User experience optimization',
          'Marketing tool integration'
        ],
        timeline: '6 weeks',
        testimonial: 'Our Shopify store exceeded all expectations. The design and functionality are absolutely perfect.'
      },
      {
        id: '2',
        title: 'Health Brand Achieves 280% Mobile Conversion Boost',
        description: 'A health supplement company needed a mobile-optimized Shopify store to capture the growing mobile commerce market.',
        client_name: 'Pure Wellness Labs',
        industry: 'Health & Supplements',
        challenge: 'Poor mobile experience, low mobile conversions, complex product catalog, and subscription management needs.',
        solution: 'Built a mobile-first Shopify store with subscription capabilities, simplified navigation, and optimized checkout process.',
        results: {
          'Mobile Conversions': '+280%',
          'Subscription Growth': '+150%',
          'User Experience Score': '94/100',
          'Mobile Revenue Share': '75%'
        },
        key_success_factors: [
          'Mobile-first design approach',
          'Subscription system integration',
          'Simplified user journey',
          'Performance optimization'
        ],
        timeline: '5 weeks',
        testimonial: 'The mobile experience is incredible. Our mobile sales have become our primary revenue source.'
      }
    ],
    'shopify-integration': [
      {
        id: '1',
        title: 'Multi-Platform Retailer Streamlines Operations by 60%',
        description: 'A retailer selling across multiple platforms needed seamless Shopify integrations to manage inventory and orders efficiently.',
        client_name: 'OmniStore Solutions',
        industry: 'Multi-Channel Retail',
        challenge: 'Managing inventory across platforms, order processing complexity, data synchronization issues, operational inefficiency.',
        solution: 'Implemented comprehensive Shopify integrations with inventory management, order processing automation, and real-time data synchronization.',
        results: {
          'Operational Efficiency': '+60%',
          'Inventory Accuracy': '99.5%',
          'Order Processing Speed': '+200%',
          'Error Reduction': '-85%'
        },
        key_success_factors: [
          'Automated inventory management',
          'Real-time data synchronization',
          'Streamlined order processing',
          'Error prevention systems'
        ],
        timeline: '8 weeks',
        testimonial: 'The integrations transformed our operations. We can now manage everything from one central system.'
      },
      {
        id: '2',
        title: 'Growing Brand Scales with Advanced CRM Integration',
        description: 'A rapidly growing brand needed advanced CRM and marketing automation integrations to maintain customer relationships at scale.',
        client_name: 'GrowthCo Brands',
        industry: 'Consumer Goods',
        challenge: 'Scaling customer communications, managing growth-stage operations, maintaining personalized customer experience.',
        solution: 'Integrated advanced CRM system with marketing automation, customer segmentation, and personalized communication workflows.',
        results: {
          'Customer Retention': '+85%',
          'Marketing Efficiency': '+150%',
          'Personalization Score': '+200%',
          'Revenue Per Customer': '+120%'
        },
        key_success_factors: [
          'Advanced CRM integration',
          'Marketing automation setup',
          'Customer segmentation strategy',
          'Personalized communication workflows'
        ],
        timeline: '6 weeks',
        testimonial: 'The CRM integration allows us to maintain personal relationships with thousands of customers. Incredible scalability.'
      }
    ]
  };

  return baseStudies[serviceType as keyof typeof baseStudies] || [];
};

const getMockStats = (serviceType: string): ServiceStat[] => {
  const baseStats = {
    'amazon-advertising': [
      { id: '1', stat_label: 'Average ROI Increase', stat_value: '450%', stat_description: 'Return on investment improvement' },
      { id: '2', stat_label: 'ACoS Reduction', stat_value: '65%', stat_description: 'Average cost of sale decrease' },
      { id: '3', stat_label: 'Sales Growth', stat_value: '380%', stat_description: 'Revenue increase within 6 months' },
      { id: '4', stat_label: 'Client Satisfaction', stat_value: '98%', stat_description: 'Happy clients rate' }
    ],
    'walmart-advertising': [
      { id: '1', stat_label: 'Revenue Growth', stat_value: '350%', stat_description: 'Average revenue increase' },
      { id: '2', stat_label: 'Market Penetration', stat_value: '400%', stat_description: 'Improved market reach' },
      { id: '3', stat_label: 'Conversion Rate', stat_value: '125%', stat_description: 'Higher conversion rates' },
      { id: '4', stat_label: 'Success Rate', stat_value: '96%', stat_description: 'Campaign success rate' }
    ],
    'google-advertising': [
      { id: '1', stat_label: 'Average ROAS', stat_value: '500%', stat_description: 'Return on ad spend' },
      { id: '2', stat_label: 'Cost Reduction', stat_value: '45%', stat_description: 'Lower customer acquisition costs' },
      { id: '3', stat_label: 'Lead Quality', stat_value: '180%', stat_description: 'Higher quality leads' },
      { id: '4', stat_label: 'Client Growth', stat_value: '250%', stat_description: 'Average business growth' }
    ],
    'meta-advertising': [
      { id: '1', stat_label: 'Community Growth', stat_value: '275%', stat_description: 'Average follower increase' },
      { id: '2', stat_label: 'Engagement Rate', stat_value: '300%', stat_description: 'Higher user engagement' },
      { id: '3', stat_label: 'Social Commerce', stat_value: '400%', stat_description: 'Sales through social' },
      { id: '4', stat_label: 'Brand Awareness', stat_value: '200%', stat_description: 'Improved brand recognition' }
    ],
    'website-development': [
      { id: '1', stat_label: 'Conversion Boost', stat_value: '275%', stat_description: 'Average conversion improvement' },
      { id: '2', stat_label: 'Load Speed', stat_value: '85%', stat_description: 'Faster loading times' },
      { id: '3', stat_label: 'Lead Generation', stat_value: '400%', stat_description: 'More qualified leads' },
      { id: '4', stat_label: 'User Satisfaction', stat_value: '96%', stat_description: 'Positive user feedback' }
    ],
    'account-management': [
      { id: '1', stat_label: 'Revenue Growth', stat_value: '325%', stat_description: 'Cross-channel revenue increase' },
      { id: '2', stat_label: 'Efficiency Gain', stat_value: '200%', stat_description: 'Improved account efficiency' },
      { id: '3', stat_label: 'Cost Optimization', stat_value: '35%', stat_description: 'Reduced management costs' },
      { id: '4', stat_label: 'Success Rate', stat_value: '97%', stat_description: 'Successful campaigns' }
    ],
    'shopify-development': [
      { id: '1', stat_label: 'Revenue Growth', stat_value: '$500K+', stat_description: 'First-year revenue achievement' },
      { id: '2', stat_label: 'Conversion Rate', stat_value: '4.2%', stat_description: 'Average store conversion' },
      { id: '3', stat_label: 'Mobile Boost', stat_value: '280%', stat_description: 'Mobile conversion improvement' },
      { id: '4', stat_label: 'Client Satisfaction', stat_value: '98%', stat_description: 'Happy store owners' }
    ],
    'shopify-integration': [
      { id: '1', stat_label: 'Efficiency Gain', stat_value: '60%', stat_description: 'Operational improvement' },
      { id: '2', stat_label: 'Accuracy Rate', stat_value: '99.5%', stat_description: 'Inventory accuracy' },
      { id: '3', stat_label: 'Processing Speed', stat_value: '200%', stat_description: 'Faster order processing' },
      { id: '4', stat_label: 'Error Reduction', stat_value: '85%', stat_description: 'Fewer operational errors' }
    ]
  };

  return baseStats[serviceType as keyof typeof baseStats] || [];
};

const getMockReviews = (serviceType: string): ServiceReview[] => {
  const baseReviews = {
    'amazon-advertising': [
      {
        id: '1',
        client_name: 'Sarah Johnson',
        company: 'TechFlow Electronics',
        review_text: 'The Amazon advertising expertise transformed our business. Our ROI increased by 450% and we now dominate our category. The team understands Amazon like no other.',
        rating: 5,
        results_achieved: '450% ROI increase, 65% ACoS reduction'
      },
      {
        id: '2',
        client_name: 'Mike Rodriguez',
        company: 'GreenSpace Solutions',
        review_text: 'From unknown to market leader in 8 months. The strategic approach to Amazon advertising was exactly what we needed to compete with established brands.',
        rating: 5,
        results_achieved: '75% market share increase, 420% revenue growth'
      }
    ],
    'walmart-advertising': [
      {
        id: '1',
        client_name: 'Lisa Chen',
        company: 'FreshLife Essentials',
        review_text: 'Walmart Connect became our fastest-growing channel. The expertise in Walmart-specific optimization was game-changing for our consumer goods brand.',
        rating: 5,
        results_achieved: '350% revenue growth, 400% market penetration'
      },
      {
        id: '2',
        client_name: 'David Thompson',
        company: 'VitalBoost Nutrition',
        review_text: 'We achieved category leadership on Walmart thanks to their strategic approach. The audience targeting and keyword optimization were phenomenal.',
        rating: 5,
        results_achieved: 'Top 5 category ranking, 275% sales volume increase'
      }
    ],
    'google-advertising': [
      {
        id: '1',
        client_name: 'Jennifer Martinez',
        company: 'CloudSync Pro',
        review_text: 'Google Ads became our primary growth engine. We scaled to $2M annual revenue with incredible ROI. The multi-channel approach was perfect.',
        rating: 5,
        results_achieved: '$2M+ annual revenue, 45% cost reduction'
      },
      {
        id: '2',
        client_name: 'Alex Kim',
        company: 'StyleHub Fashion',
        review_text: 'Our Google Ads performance during peak season exceeded all expectations. 500% ROAS was beyond what we thought possible.',
        rating: 5,
        results_achieved: '500% ROAS, 350% seasonal revenue growth'
      }
    ],
    'meta-advertising': [
      {
        id: '1',
        client_name: 'Maria Gonzalez',
        company: 'FitForce Equipment',
        review_text: 'We built an incredible community of 100K+ engaged users. Social media became our strongest sales channel with authentic engagement.',
        rating: 5,
        results_achieved: '100K+ community, 400% social commerce sales'
      },
      {
        id: '2',
        client_name: 'Taylor Davis',
        company: 'GlowUp Cosmetics',
        review_text: 'We became the go-to brand for Gen Z. The authentic storytelling and trend-based content strategy was perfectly executed.',
        rating: 5,
        results_achieved: '300% revenue growth, 250% Gen Z engagement'
      }
    ],
    'website-development': [
      {
        id: '1',
        client_name: 'Robert Wilson',
        company: 'ModernMart Online',
        review_text: 'Our new website transformed our business completely. The conversion improvements exceeded all expectations with 275% increase.',
        rating: 5,
        results_achieved: '275% conversion rate boost, 85% faster loading'
      },
      {
        id: '2',
        client_name: 'Amanda Foster',
        company: 'Sterling Legal Partners',
        review_text: 'Our website now generates more leads than all other marketing channels combined. The professional design built incredible credibility.',
        rating: 5,
        results_achieved: '400% more leads, 250% credibility increase'
      }
    ],
    'account-management': [
      {
        id: '1',
        client_name: 'Chris Johnson',
        company: 'Urban Lifestyle Co.',
        review_text: 'Having expert account management across all platforms was a game-changer. The unified strategy delivered 325% revenue growth.',
        rating: 5,
        results_achieved: '325% cross-channel revenue, 35% cost optimization'
      },
      {
        id: '2',
        client_name: 'Nicole Brown',
        company: 'InnovateTech Solutions',
        review_text: 'Professional account management enabled us to scale without losing performance. Critical for our transition to enterprise level.',
        rating: 5,
        results_achieved: '500% operational scale, 180% performance consistency'
      }
    ],
    'shopify-development': [
      {
        id: '1',
        client_name: 'Victoria Hayes',
        company: 'Luxe Fashion House',
        review_text: 'Our Shopify store exceeded all expectations. The design and functionality are absolutely perfect. We hit $500K in our first year.',
        rating: 5,
        results_achieved: '$500K+ first-year revenue, 4.2% conversion rate'
      },
      {
        id: '2',
        client_name: 'Ryan Mitchell',
        company: 'Pure Wellness Labs',
        review_text: 'The mobile experience is incredible. Our mobile sales became our primary revenue source with 280% conversion boost.',
        rating: 5,
        results_achieved: '280% mobile conversion boost, 75% mobile revenue share'
      }
    ],
    'shopify-integration': [
      {
        id: '1',
        client_name: 'Steven Clark',
        company: 'OmniStore Solutions',
        review_text: 'The integrations transformed our operations completely. We can now manage everything from one central system with 60% efficiency gain.',
        rating: 5,
        results_achieved: '60% efficiency gain, 99.5% inventory accuracy'
      },
      {
        id: '2',
        client_name: 'Rachel Adams',
        company: 'GrowthCo Brands',
        review_text: 'The CRM integration allows us to maintain personal relationships with thousands of customers. Incredible scalability achievement.',
        rating: 5,
        results_achieved: '85% customer retention, 150% marketing efficiency'
      }
    ]
  };

  return baseReviews[serviceType as keyof typeof baseReviews] || [];
};

export const useServiceData = (serviceType: string) => {
  const [caseStudies, setCaseStudies] = useState<ServiceCaseStudy[]>([]);
  const [stats, setStats] = useState<ServiceStat[]>([]);
  const [reviews, setReviews] = useState<ServiceReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setCaseStudies(getMockCaseStudies(serviceType));
      setStats(getMockStats(serviceType));
      setReviews(getMockReviews(serviceType));
      setLoading(false);
    };

    loadData();
  }, [serviceType]);

  return { caseStudies, stats, reviews, loading };
};
