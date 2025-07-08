
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { useReviewsData } from "@/hooks/useReviewsData";

const CircularReviews = () => {
  const { reviews, isLoading } = useReviewsData();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll with circular loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Get 3 visible reviews in circular manner
  const getVisibleReviews = () => {
    const visibleReviews = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % reviews.length;
      visibleReviews.push({ ...reviews[index], key: `${index}-${currentIndex}` });
    }
    return visibleReviews;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-6 shadow-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-700">4.9/5 from 500+ reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            What Our Clients
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Say About Us
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. See how we've helped businesses like yours achieve extraordinary growth.
          </p>
        </div>

        {/* Reviews Grid with circular scroll */}
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-8 h-8 bg-slate-200 animate-pulse rounded"></div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-slate-200 animate-pulse rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="h-4 bg-slate-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-slate-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-slate-200 animate-pulse rounded w-3/4"></div>
                </div>
                <div className="flex items-center mt-6">
                  <div className="w-12 h-12 bg-slate-200 animate-pulse rounded-full mr-4"></div>
                  <div>
                    <div className="h-4 bg-slate-200 animate-pulse rounded mb-2 w-24"></div>
                    <div className="h-3 bg-slate-200 animate-pulse rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="relative overflow-hidden">
          <div className="grid md:grid-cols-3 gap-8">
            {getVisibleReviews().map((review, index) => (
              <div 
                key={review.key}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-blue-200 transform hover:-translate-y-2 h-full flex flex-col"
                style={{
                  animation: `fadeIn 0.5s ease-in-out ${index * 0.1}s both`
                }}
              >
                {/* Quote icon */}
                <div className="flex justify-between items-start mb-6">
                  <Quote className="w-8 h-8 text-blue-400 opacity-50" />
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Review text */}
                <p className="text-slate-700 leading-relaxed mb-6 text-sm flex-grow">
                  "{review.review}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 mr-4"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{review.name}</div>
                    <div className="text-sm text-slate-500">{review.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress indicators */}
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
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-slate-600 mb-6">
              Get your free audit and see how we can transform your advertising performance.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Get Free Audit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircularReviews;
