
import React, { useEffect, useState } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Review {
  id: string;
  client_name: string;
  company: string;
  review_text: string;
  rating: number;
  avatar_url?: string;
  results_achieved?: string;
  service_type: string;
}

const ModernReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('service_reviews')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

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

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center">Loading reviews...</div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real results from real businesses. See how we've helped companies achieve their goals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                <blockquote className="text-2xl text-slate-700 leading-relaxed mb-8 italic">
                  "{currentReview.review_text}"
                </blockquote>
                
                <div className="flex justify-center mb-6">
                  {renderStars(currentReview.rating)}
                </div>

                {currentReview.results_achieved && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
                    <h4 className="font-semibold text-green-800 mb-2">Results Achieved:</h4>
                    <p className="text-green-700">{currentReview.results_achieved}</p>
                  </div>
                )}

                <div className="flex items-center justify-center space-x-4">
                  {currentReview.avatar_url && (
                    <img
                      src={currentReview.avatar_url}
                      alt={currentReview.client_name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  )}
                  <div className="text-left">
                    <h4 className="font-bold text-slate-900 text-lg">
                      {currentReview.client_name}
                    </h4>
                    <p className="text-slate-600">{currentReview.company}</p>
                    <p className="text-sm text-blue-600 font-medium">
                      {currentReview.service_type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Client
                    </p>
                  </div>
                </div>
              </div>

              {reviews.length > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevReview}
                    className="rounded-full"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex space-x-2">
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentIndex 
                            ? 'bg-blue-600' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextReview}
                    className="rounded-full"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ModernReviews;
