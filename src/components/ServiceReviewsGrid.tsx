
import { ServiceReview } from '@/hooks/useServiceData';
import { Star } from 'lucide-react';

interface ServiceReviewsGridProps {
  reviews: ServiceReview[];
}

const ServiceReviewsGrid = ({ reviews }: ServiceReviewsGridProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Ensure we show exactly 6 reviews
  const displayReviews = reviews.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
          What Our Clients Say
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayReviews.map((review) => (
            <div key={review.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 h-80 flex flex-col">
              <div className="flex items-center mb-4">
                {review.avatar_url ? (
                  <img
                    src={review.avatar_url}
                    alt={review.client_name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.client_name)}&background=random`;
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold text-lg">
                      {review.client_name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-slate-900">{review.client_name}</h4>
                  <p className="text-slate-600 text-sm">{review.company}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {renderStars(review.rating)}
              </div>
              
              <p className="text-slate-700 leading-relaxed mb-4 flex-grow">
                "{review.review_text}"
              </p>
              
              {review.results_achieved && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-auto">
                  <p className="text-green-800 text-sm font-medium">
                    Results: {review.results_achieved}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceReviewsGrid;
