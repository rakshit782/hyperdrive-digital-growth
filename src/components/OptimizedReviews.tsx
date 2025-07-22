
import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useSupabaseReviews } from '@/hooks/useSupabaseReviews';

const OptimizedReviews = memo(() => {
  const { reviews, loading, error } = useSupabaseReviews();

  // Filter only active reviews
  const activeReviews = reviews.filter(review => review.is_active);

  if (loading) {
    return (
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">Failed to load reviews: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (activeReviews.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Don't just take our word for it. See what our satisfied clients have to say about their success.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeReviews.slice(0, 6).map((review, index) => (
            <Card 
              key={review.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md animate-fade-in bg-white dark:bg-slate-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-blue-500 opacity-50" />
                </div>
                
                {/* Review text */}
                <p className="text-slate-700 dark:text-slate-300 mb-6 line-clamp-4 leading-relaxed">
                  "{review.review}"
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                    {review.rating}.0
                  </span>
                </div>
                
                {/* Author info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white font-semibold text-lg">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {review.name}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {review.company}
                    </p>
                    {review.service_type && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        {review.service_type}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center animate-fade-in delay-500">
          <div className="flex items-center justify-center space-x-8 text-slate-600 dark:text-slate-400">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
              <span className="font-semibold">4.9/5 Average Rating</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-300 dark:bg-slate-600" />
            <div>
              <span className="font-semibold">500+ Happy Clients</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-300 dark:bg-slate-600" />
            <div>
              <span className="font-semibold">99% Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

OptimizedReviews.displayName = 'OptimizedReviews';

export default OptimizedReviews;
