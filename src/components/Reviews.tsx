
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  client_name: string;
  company: string;
  rating: number;
  review_text: string;
  results_achieved?: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Reviews: Component mounted, fetching from Supabase...");
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('service_reviews')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error("Reviews: Error fetching reviews:", error);
        return;
      }

      if (data && data.length > 0) {
        console.log("Reviews: Loaded from Supabase:", data.length);
        const mappedReviews = data.map(review => ({
          id: review.id,
          client_name: review.client_name,
          company: review.company,
          rating: review.rating,
          review_text: review.review_text,
          results_achieved: review.results_achieved
        }));
        setReviews(mappedReviews);
      } else {
        console.log("Reviews: No reviews found in Supabase");
        setReviews([]);
      }
    } catch (error) {
      console.error("Reviews: Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll functionality with smooth looping
  useEffect(() => {
    if (reviews.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= reviews.length ? 0 : nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const getVisibleReviews = () => {
    if (reviews.length === 0) return [];
    
    const visibleReviews = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    return visibleReviews;
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-slate-600">
              No reviews available at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const visibleReviews = getVisibleReviews();

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real feedback from businesses that have transformed their growth with our services.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {reviews.length > 3 && (
            <div className="flex justify-center gap-4 mb-8">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="sm"
                className="bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white hover:scale-105 transition-all duration-300"
                disabled={isTransitioning}
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                onClick={nextSlide}
                variant="outline" 
                size="sm"
                className="bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white hover:scale-105 transition-all duration-300"
                disabled={isTransitioning}
                aria-label="Next reviews"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleReviews.map((review, index) => (
              <Card key={`${review.id}-${currentIndex}-${index}`} className="bg-white/90 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4" role="img" aria-label={`${review.rating} out of 5 stars`}>
                    {renderStars(review.rating)}
                  </div>
                  
                  <blockquote className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-4">
                    "{review.review_text}"
                  </blockquote>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{review.client_name}</div>
                        <div className="text-slate-600 text-xs">{review.company}</div>
                      </div>
                    </div>
                    {review.results_achieved && (
                      <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-100">
                        <div className="text-xs font-medium text-green-700">Results: {review.results_achieved}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          {reviews.length > 3 && (
            <div className="flex justify-center mt-8 gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-blue-600 scale-125"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
