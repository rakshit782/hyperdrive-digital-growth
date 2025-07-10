
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { ServiceReview } from '@/hooks/useServiceData';

interface ReviewsSectionProps {
  title: string;
  reviews: ServiceReview[];
}

const ReviewsSection = ({ title, reviews }: ReviewsSectionProps) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const displayReviews = reviews.slice(0, 6);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
        aria-hidden="true"
      />
    ));
  };

  const nextReviews = () => {
    setCurrentReviewIndex((prev) => 
      prev + 6 >= reviews.length ? 0 : prev + 6
    );
  };

  const prevReviews = () => {
    setCurrentReviewIndex((prev) => 
      prev - 6 < 0 ? Math.max(0, reviews.length - 6) : prev - 6
    );
  };

  const getCurrentReviews = () => {
    return reviews.slice(currentReviewIndex, currentReviewIndex + 6);
  };

  if (displayReviews.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real feedback from businesses that have transformed their growth with our {title.toLowerCase()}.
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentReviews().map((review) => (
              <Card key={review.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300">
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

          {displayReviews.length > 6 && (
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevReviews}
                className="bg-white/80 backdrop-blur-sm"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextReviews}
                className="bg-white/80 backdrop-blur-sm"
                aria-label="Next reviews"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
