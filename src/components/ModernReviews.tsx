
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { Review } from "@/types/dashboard";

const ModernReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = () => {
      const savedReviews = localStorage.getItem('reviewsData');
      if (savedReviews) {
        try {
          const parsedData = JSON.parse(savedReviews);
          if (Array.isArray(parsedData)) {
            setReviews(parsedData);
          }
        } catch (error) {
          console.log("Failed to parse reviews data:", error);
        }
      }
    };

    loadReviews();

    const handleReviewsUpdate = (event: CustomEvent) => {
      setReviews(event.detail);
    };

    window.addEventListener('reviewsUpdated', handleReviewsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('reviewsUpdated', handleReviewsUpdate as EventListener);
    };
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="section-minimal bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="container-minimal">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped businesses like yours achieve remarkable growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.slice(0, 6).map((review, index) => (
            <div 
              key={review.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < review.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <Quote className="w-8 h-8 text-blue-200 mb-4" />
                <p className="text-gray-700 leading-relaxed text-lg">
                  "{review.review}"
                </p>
              </div>

              <div className="flex items-center">
                {review.avatar && (
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <p className="text-gray-600 text-sm">{review.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernReviews;
