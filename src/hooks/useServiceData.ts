import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ServiceCaseStudy {
  id: string;
  service_type: string;
  title: string;
  description: string;
  client_name: string;
  industry: string;
  results: Record<string, string>;
  image_url?: string;
  is_featured: boolean;
}

export interface ServiceStat {
  id: string;
  service_type: string;
  stat_label: string;
  stat_value: string;
  stat_description?: string;
  icon_name?: string;
}

export interface ServiceReview {
  id: string;
  service_type: string;
  client_name: string;
  company: string;
  rating: number;
  review_text: string;
  avatar_url?: string;
  results_achieved?: string;
}

// Fallback data for when database is empty
const fallbackStats: Record<string, ServiceStat[]> = {
  amazon: [
    {
      id: '1',
      service_type: 'amazon',
      stat_label: 'Average Sales Growth',
      stat_value: '350%',
      stat_description: 'Increase in sales within 90 days',
      icon_name: 'TrendingUp'
    },
    {
      id: '2',
      service_type: 'amazon',
      stat_label: 'ROAS Improvement',
      stat_value: '4.2x',
      stat_description: 'Return on advertising spend',
      icon_name: 'DollarSign'
    },
    {
      id: '3',
      service_type: 'amazon',
      stat_label: 'Keywords Ranked',
      stat_value: '1,500+',
      stat_description: 'Top 10 keyword positions achieved',
      icon_name: 'Search'
    },
    {
      id: '4',
      service_type: 'amazon',
      stat_label: 'Client Satisfaction',
      stat_value: '98%',
      stat_description: 'Client retention rate',
      icon_name: 'Star'
    }
  ],
  walmart: [
    {
      id: '1',
      service_type: 'walmart',
      stat_label: 'Revenue Growth',
      stat_value: '380%',
      stat_description: 'Average revenue increase',
      icon_name: 'TrendingUp'
    },
    {
      id: '2',
      service_type: 'walmart',
      stat_label: 'Market Share',
      stat_value: '40%',
      stat_description: 'Captured in client categories',
      icon_name: 'Target'
    },
    {
      id: '3',
      service_type: 'walmart',
      stat_label: 'Inventory Turnover',
      stat_value: '3x',
      stat_description: 'Improvement in efficiency',
      icon_name: 'Package'
    },
    {
      id: '4',
      service_type: 'walmart',
      stat_label: 'Customer Rating',
      stat_value: '4.8/5',
      stat_description: 'Average across all listings',
      icon_name: 'Star'
    }
  ],
  meta: [
    {
      id: '1',
      service_type: 'meta',
      stat_label: 'Average ROAS',
      stat_value: '650%',
      stat_description: 'Return on ad spend',
      icon_name: 'DollarSign'
    },
    {
      id: '2',
      service_type: 'meta',
      stat_label: 'Cost Per Lead',
      stat_value: '-55%',
      stat_description: 'Reduction through optimization',
      icon_name: 'TrendingDown'
    },
    {
      id: '3',
      service_type: 'meta',
      stat_label: 'Conversion Rate',
      stat_value: '+45%',
      stat_description: 'Improvement for all clients',
      icon_name: 'ArrowUp'
    },
    {
      id: '4',
      service_type: 'meta',
      stat_label: 'Audience Reach',
      stat_value: '300%',
      stat_description: 'Increase in qualified reach',
      icon_name: 'Users'
    }
  ],
  'account-management': [
    {
      id: '1',
      service_type: 'account-management',
      stat_label: 'Accounts Managed',
      stat_value: '500+',
      stat_description: 'Successfully managed accounts',
      icon_name: 'Users'
    },
    {
      id: '2',
      service_type: 'account-management',
      stat_label: 'Time Saved',
      stat_value: '40hrs/week',
      stat_description: 'Average time saved per account',
      icon_name: 'Clock'
    },
    {
      id: '3',
      service_type: 'account-management',
      stat_label: 'Performance Boost',
      stat_value: '250%',
      stat_description: 'Average performance improvement',
      icon_name: 'TrendingUp'
    },
    {
      id: '4',
      service_type: 'account-management',
      stat_label: 'Client Satisfaction',
      stat_value: '99%',
      stat_description: 'Client retention rate',
      icon_name: 'Star'
    }
  ],
  'shopify-integration': [
    {
      id: '1',
      service_type: 'shopify-integration',
      stat_label: 'Integrations Done',
      stat_value: '300+',
      stat_description: 'Successful platform connections',
      icon_name: 'Link'
    },
    {
      id: '2',
      service_type: 'shopify-integration',
      stat_label: 'Setup Time',
      stat_value: '24hrs',
      stat_description: 'Average integration completion',
      icon_name: 'Clock'
    },
    {
      id: '3',
      service_type: 'shopify-integration',
      stat_label: 'Sales Increase',
      stat_value: '180%',
      stat_description: 'Average multi-channel boost',
      icon_name: 'TrendingUp'
    },
    {
      id: '4',
      service_type: 'shopify-integration',
      stat_label: 'Uptime',
      stat_value: '99.9%',
      stat_description: 'Integration reliability',
      icon_name: 'Shield'
    }
  ],
  'shopify-development': [
    {
      id: '1',
      service_type: 'shopify-development',
      stat_label: 'Stores Built',
      stat_value: '200+',
      stat_description: 'Custom Shopify stores created',
      icon_name: 'ShoppingBag'
    },
    {
      id: '2',
      service_type: 'shopify-development',
      stat_label: 'Conversion Rate',
      stat_value: '+85%',
      stat_description: 'Average conversion improvement',
      icon_name: 'ArrowUp'
    },
    {
      id: '3',
      service_type: 'shopify-development',
      stat_label: 'Page Speed',
      stat_value: '95+',
      stat_description: 'Average PageSpeed score',
      icon_name: 'Zap'
    },
    {
      id: '4',
      service_type: 'shopify-development',
      stat_label: 'Launch Time',
      stat_value: '14 days',
      stat_description: 'Average project completion',
      icon_name: 'Calendar'
    }
  ],
  'website-development': [
    {
      id: '1',
      service_type: 'website-development',
      stat_label: 'Websites Built',
      stat_value: '150+',
      stat_description: 'Custom websites delivered',
      icon_name: 'Globe'
    },
    {
      id: '2',
      service_type: 'website-development',
      stat_label: 'Mobile Score',
      stat_value: '98/100',
      stat_description: 'Average mobile performance',
      icon_name: 'Smartphone'
    },
    {
      id: '3',
      service_type: 'website-development',
      stat_label: 'Load Time',
      stat_value: '<2sec',
      stat_description: 'Average page load speed',
      icon_name: 'Zap'
    },
    {
      id: '4',
      service_type: 'website-development',
      stat_label: 'SEO Score',
      stat_value: '95+',
      stat_description: 'Average SEO optimization',
      icon_name: 'Search'
    }
  ]
};

const fallbackCaseStudies: Record<string, ServiceCaseStudy[]> = {
  amazon: [
    {
      id: '1',
      service_type: 'amazon',
      title: 'Electronics Brand Achieves 400% Sales Growth',
      description: 'A consumer electronics brand struggling with low visibility on Amazon transformed their performance through our comprehensive PPC and listing optimization strategy.',
      client_name: 'TechGadget Pro',
      industry: 'Electronics',
      results: {
        'Sales Growth': '400%',
        'ROAS': '5.2x',
        'Keyword Rankings': '1st Page'
      },
      is_featured: true
    },
    {
      id: '2',
      service_type: 'amazon',
      title: 'Home & Garden Brand Dominates Market',
      description: 'Our strategic campaign management helped this home improvement brand capture 60% market share in their category within 6 months.',
      client_name: 'HomeStyle Solutions',
      industry: 'Home & Garden',
      results: {
        'Market Share': '60%',
        'Revenue Growth': '320%',
        'Cost Reduction': '35%'
      },
      is_featured: false
    }
  ],
  walmart: [
    {
      id: '1',
      service_type: 'walmart',
      title: 'Fashion Brand Triples Walmart Revenue',
      description: 'Through strategic Walmart Connect campaigns and marketplace optimization, this fashion brand achieved remarkable growth in just 4 months.',
      client_name: 'StyleCraft Fashion',
      industry: 'Fashion & Apparel',
      results: {
        'Revenue Growth': '310%',
        'ROAS': '4.8x',
        'Market Position': 'Top 3'
      },
      is_featured: true
    }
  ],
  meta: [
    {
      id: '1',
      service_type: 'meta',
      title: 'E-commerce Store Achieves 800% ROAS',
      description: 'Our Meta advertising expertise helped this e-commerce store achieve exceptional returns through strategic Facebook and Instagram campaigns.',
      client_name: 'Urban Lifestyle',
      industry: 'E-commerce',
      results: {
        'ROAS': '800%',
        'Cost Per Lead': '-60%',
        'Conversion Rate': '+85%'
      },
      is_featured: true
    }
  ],
  'account-management': [
    {
      id: '1',
      service_type: 'account-management',
      title: 'E-commerce Brand Scales to $2M Revenue',
      description: 'Complete account management transformation helped this growing brand focus on product development while we handled all marketplace operations.',
      client_name: 'TechStart Solutions',
      industry: 'Technology',
      results: {
        'Revenue Growth': '400%',
        'Time Saved': '50hrs/week',
        'Market Expansion': '5 platforms'
      },
      is_featured: true
    },
    {
      id: '2',
      service_type: 'account-management',
      title: 'Fashion Brand Streamlines Operations',
      description: 'Our comprehensive account management service allowed this fashion brand to reduce operational overhead while expanding to new markets.',
      client_name: 'StyleForward',
      industry: 'Fashion',
      results: {
        'Cost Reduction': '45%',
        'Efficiency Gain': '300%',
        'New Markets': '8 platforms'
      },
      is_featured: false
    }
  ],
  'shopify-integration': [
    {
      id: '1',
      service_type: 'shopify-integration',
      title: 'Multi-Channel Success Story',
      description: 'Seamless integration of Shopify store with Amazon, Walmart, and eBay resulted in explosive multi-channel growth for this home goods brand.',
      client_name: 'HomeComfort Co',
      industry: 'Home & Garden',
      results: {
        'Sales Increase': '250%',
        'Platform Coverage': '6 marketplaces',
        'Inventory Sync': '99.9% accuracy'
      },
      is_featured: true
    }
  ],
  'shopify-development': [
    {
      id: '1',
      service_type: 'shopify-development',
      title: 'Custom Store Drives 300% Growth',
      description: 'Custom Shopify development with advanced features and optimizations transformed this startup into a major player in their industry.',
      client_name: 'FitnessPro Equipment',
      industry: 'Fitness',
      results: {
        'Conversion Rate': '+120%',
        'Revenue Growth': '300%',
        'Page Speed': '95 score'
      },
      is_featured: true
    }
  ],
  'website-development': [
    {
      id: '1',
      service_type: 'website-development',
      title: 'Corporate Website Transformation',
      description: 'Complete website redesign and development resulted in significantly improved user engagement and lead generation for this B2B company.',
      client_name: 'InnovateB2B Corp',
      industry: 'Technology',
      results: {
        'Lead Generation': '+400%',
        'User Engagement': '+200%',
        'Mobile Performance': '98/100'
      },
      is_featured: true
    }
  ]
};

const fallbackReviews: Record<string, ServiceReview[]> = {
  amazon: [
    {
      id: '1',
      service_type: 'amazon',
      client_name: 'Sarah Johnson',
      company: 'TechGadget Pro',
      rating: 5,
      review_text: 'Incredible results! Our Amazon sales increased by 400% within 3 months. The team\'s expertise in PPC management is unmatched.',
      results_achieved: '400% sales increase, 5.2x ROAS'
    },
    {
      id: '2',
      service_type: 'amazon',
      client_name: 'Mike Chen',
      company: 'HomeStyle Solutions',
      rating: 5,
      review_text: 'Professional service and outstanding results. We went from struggling to visibility to dominating our category on Amazon.',
      results_achieved: '60% market share captured'
    }
  ],
  walmart: [
    {
      id: '1',
      service_type: 'walmart',
      client_name: 'Lisa Rodriguez',
      company: 'StyleCraft Fashion',
      rating: 5,
      review_text: 'The Walmart advertising expertise delivered beyond our expectations. Revenue tripled in just 4 months!',
      results_achieved: '310% revenue growth'
    }
  ],
  meta: [
    {
      id: '1',
      service_type: 'meta',
      client_name: 'David Park',
      company: 'Urban Lifestyle',
      rating: 5,
      review_text: 'Outstanding Meta advertising management. Achieved 800% ROAS and significantly reduced our cost per lead.',
      results_achieved: '800% ROAS, 60% cost reduction'
    }
  ],
  'account-management': [
    {
      id: '1',
      service_type: 'account-management',
      client_name: 'Jennifer Walsh',
      company: 'TechStart Solutions',
      rating: 5,
      review_text: 'Professional account management freed up 50+ hours per week for us to focus on product innovation. Revenue grew 400% in 6 months.',
      results_achieved: '400% revenue growth'
    },
    {
      id: '2',
      service_type: 'account-management',
      client_name: 'Marcus Thompson',
      company: 'StyleForward',
      rating: 5,
      review_text: 'The team handles everything seamlessly. Our operational costs dropped 45% while expanding to 8 new platforms.',
      results_achieved: '45% cost reduction'
    }
  ],
  'shopify-integration': [
    {
      id: '1',
      service_type: 'shopify-integration',
      client_name: 'Sarah Mitchell',
      company: 'HomeComfort Co',
      rating: 5,
      review_text: 'The multi-channel integration was flawless. We went from one platform to six with perfect inventory synchronization.',
      results_achieved: '250% sales increase'
    }
  ],
  'shopify-development': [
    {
      id: '1',
      service_type: 'shopify-development',
      client_name: 'Alex Rivera',
      company: 'FitnessPro Equipment',
      rating: 5,
      review_text: 'The custom Shopify store they built exceeded all expectations. Conversion rates increased 120% and the site loads incredibly fast.',
      results_achieved: '300% revenue growth'
    }
  ],
  'website-development': [
    {
      id: '1',
      service_type: 'website-development',
      client_name: 'Rebecca Chen',
      company: 'InnovateB2B Corp',
      rating: 5,
      review_text: 'Our new website transformed our business. Lead generation increased 400% and the mobile experience is outstanding.',
      results_achieved: '400% lead increase'
    }
  ]
};

export const useServiceData = (serviceType: string) => {
  const [caseStudies, setCaseStudies] = useState<ServiceCaseStudy[]>([]);
  const [stats, setStats] = useState<ServiceStat[]>([]);
  const [reviews, setReviews] = useState<ServiceReview[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!serviceType) {
        console.log('No service type provided');
        return;
      }

      try {
        console.log('Fetching service data for:', serviceType);
        setLoading(true);
        
        // Always set fallback data first
        setCaseStudies(fallbackCaseStudies[serviceType] || []);
        setStats(fallbackStats[serviceType] || []);
        setReviews(fallbackReviews[serviceType] || []);
        
        // Fetch case studies
        const { data: caseStudiesData, error: caseStudiesError } = await supabase
          .from('service_case_studies')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        if (caseStudiesError) {
          console.error('Error fetching case studies:', caseStudiesError);
        } else if (caseStudiesData && caseStudiesData.length > 0) {
          const transformedCaseStudies = caseStudiesData.map(study => ({
            ...study,
            results: (study.results as Record<string, string>) || {}
          }));
          setCaseStudies(transformedCaseStudies);
        }

        // Fetch stats
        const { data: statsData, error: statsError } = await supabase
          .from('service_stats')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        if (statsError) {
          console.error('Error fetching stats:', statsError);
        } else if (statsData && statsData.length > 0) {
          setStats(statsData);
        }

        // Fetch reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('service_reviews')
          .select('*')
          .eq('service_type', serviceType)
          .eq('is_active', true)
          .order('sort_order');

        if (reviewsError) {
          console.error('Error fetching reviews:', reviewsError);
        } else if (reviewsData && reviewsData.length > 0) {
          setReviews(reviewsData);
        }

        console.log('Service data loaded successfully for:', serviceType);
      } catch (error) {
        console.error('Error in fetchServiceData:', error);
        // Fallback data is already set above
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [serviceType]);

  return { caseStudies, stats, reviews, loading };
};
