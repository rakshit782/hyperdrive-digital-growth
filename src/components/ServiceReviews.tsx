
import { ServiceReview } from '@/hooks/useServiceData';
import { Star } from 'lucide-react';

interface ServiceReviewsProps {
  reviews: ServiceReview[];
  title?: string;
}

const ServiceReviews = ({ reviews, title = "What Our Clients Say" }: ServiceReviewsProps) => {
  if (reviews.length === 0) return null;

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

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
          {title}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {review.avatar_url ? (
                  <img
                    src={review.avatar_url}
                    alt={review.client_name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
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
              
              <p className="text-slate-700 leading-relaxed mb-4">
                "{review.review_text}"
              </p>
              
              {review.results_achieved && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
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

export default ServiceReviews;
