
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  client_name: string;
  company: string;
  rating: number;
  review_text: string;
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
          review_text: review.review_text
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
        // Create seamless loop by going back to 0 when reaching the end
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
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-600">
              No reviews available at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const visibleReviews = getVisibleReviews();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what successful Amazon sellers and e-commerce brands have to say about working with us.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="sm"
              className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white hover:scale-105 transition-all duration-300"
              disabled={isTransitioning}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              onClick={nextSlide}
              variant="outline"
              size="sm"
              className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white hover:scale-105 transition-all duration-300"
              disabled={isTransitioning}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {visibleReviews.map((review, index) => (
              <div 
                key={`${review.id}-${currentIndex}-${index}`}
                className="transform transition-all duration-500 ease-in-out"
              >
                <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-white/20 hover:-translate-y-2 h-full">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-center mb-6">
                      <Quote className="w-8 h-8 text-blue-600 mb-4" />
                    </div>
                    
                    <p className="text-slate-700 mb-6 leading-relaxed flex-grow">
                      "{review.review_text}"
                    </p>
                    
                    <div className="flex items-center mb-4">
                      {renderStars(review.rating)}
                    </div>
                    
                    <div className="mt-auto flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-lg mr-4">
                        {getInitial(review.client_name)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-lg">{review.client_name}</h4>
                        <p className="text-blue-600 font-medium">{review.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
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
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
