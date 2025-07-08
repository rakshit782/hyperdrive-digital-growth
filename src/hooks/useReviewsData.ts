import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Review {
  id: string;
  name: string;
  company: string;
  rating: number;
  review: string;
  avatar: string;
  serviceType?: string;
  resultsAchieved?: string;
}

const defaultReviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    rating: 5,
    review: "Our Amazon sales increased by 400% in just 3 months. The team's expertise in PPC optimization is unmatched. They transformed our struggling campaigns into profit-generating machines.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c788?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "2",
    name: "Michael Chen",
    company: "Global Retail Co.",
    rating: 5,
    review: "Working with this agency was a game-changer for our Walmart advertising. Their strategic approach and attention to detail resulted in a 250% increase in ROAS within the first quarter.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    company: "Fashion Forward",
    rating: 5,
    review: "The Meta advertising campaigns they created for us generated over 10,000 new customers in 6 months. Their creative strategies and targeting precision exceeded all our expectations.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "4",
    name: "David Thompson",
    company: "Home Essentials",
    rating: 5,
    review: "Professional, results-driven, and incredibly knowledgeable. They optimized our advertising spend and increased our conversion rates by 180%. Highly recommend their services!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "5",
    name: "Lisa Wang",
    company: "Wellness Products",
    rating: 5,
    review: "Their comprehensive approach to multi-platform advertising helped us scale from $10K to $100K monthly revenue. The team is responsive and delivers on every promise.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "6",
    name: "Robert Martinez",
    company: "Sports Gear Pro",
    rating: 5,
    review: "Amazing results across Amazon and Meta platforms. Our brand visibility increased dramatically and sales followed suit. The ROI has been exceptional from day one.",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
  }
];

export const useReviewsData = () => {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        // Try to load from Supabase first
        const { data: supabaseReviews, error } = await supabase
          .from('service_reviews')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (!error && supabaseReviews && supabaseReviews.length > 0) {
          // Convert Supabase reviews to our format
          const convertedReviews = supabaseReviews.map(review => ({
            id: review.id,
            name: review.client_name,
            company: review.company,
            rating: review.rating,
            review: review.review_text,
            avatar: review.avatar_url || `https://images.unsplash.com/photo-1494790108755-2616b612c788?w=150&h=150&fit=crop&crop=face`,
            serviceType: review.service_type,
            resultsAchieved: review.results_achieved
          }));
          
          setReviews(convertedReviews);
        } else {
          // Fallback to localStorage
          const savedReviews = localStorage.getItem('reviewsData');
          if (savedReviews) {
            try {
              const parsedData = JSON.parse(savedReviews);
              if (Array.isArray(parsedData) && parsedData.length > 0) {
                setReviews(parsedData);
              } else {
                setReviews(defaultReviews);
              }
            } catch (parseError) {
              console.error('Failed to parse localStorage reviews:', parseError);
              setReviews(defaultReviews);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load reviews:', error);
        // Final fallback to localStorage
        try {
          const savedReviews = localStorage.getItem('reviewsData');
          if (savedReviews) {
            const parsedData = JSON.parse(savedReviews);
            if (Array.isArray(parsedData) && parsedData.length > 0) {
              setReviews(parsedData);
            } else {
              setReviews(defaultReviews);
            }
          } else {
            setReviews(defaultReviews);
          }
        } catch (localError) {
          console.error('Failed to load from localStorage:', localError);
          setReviews(defaultReviews);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Load initial reviews
    loadReviews();

    // Listen for real-time updates from Supabase
    const channel = supabase
      .channel(`reviews-updates-${Date.now()}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'service_reviews'
        },
        (payload) => {
          console.log('Real-time reviews update:', payload);
          loadReviews(); // Reload reviews on any change
        }
      )
      .subscribe();

    // Listen for updates from dashboard
    const handleReviewsUpdate = (event: CustomEvent) => {
      if (event.detail && Array.isArray(event.detail)) {
        setReviews(event.detail);
      }
    };

    window.addEventListener('reviewsUpdated', handleReviewsUpdate as EventListener);

    return () => {
      channel.unsubscribe();
      window.removeEventListener('reviewsUpdated', handleReviewsUpdate as EventListener);
    };
  }, []);

  return { reviews, isLoading };
};