
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Review {
  id: string;
  name: string;
  company: string;
  rating: number;
  review: string;
  avatar?: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      company: "E-commerce Store Owner",
      rating: 5,
      review: "AMZ Ad Scout transformed our Amazon business. Our sales increased by 400% in just 3 months!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "2",
      name: "Michael Chen",
      company: "Product Manager",
      rating: 5,
      review: "The team's expertise in Amazon advertising is unmatched. They delivered results beyond our expectations.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      company: "Brand Director",
      rating: 5,
      review: "Professional, results-driven, and always available. Our ROAS improved dramatically with their strategies.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "4",
      name: "David Thompson",
      company: "Startup Founder",
      rating: 5,
      review: "From zero to hero on Amazon! Their campaign management and optimization skills are top-notch.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "5",
      name: "Lisa Wang",
      company: "Brand Manager",
      rating: 5,
      review: "Outstanding results! Our conversion rates doubled within the first month of working with them.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "6",
      name: "Robert Miller",
      company: "Online Retailer",
      rating: 5,
      review: "Best investment we made for our business. Their strategic approach to Amazon advertising is phenomenal.",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face"
    }
  ]);

  useEffect(() => {
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

    const handleReviewsUpdate = (event: CustomEvent) => {
      setReviews(event.detail);
    };

    window.addEventListener('reviewsUpdated', handleReviewsUpdate as EventListener);

    return () => {
      window.removeEventListener('reviewsUpdated', handleReviewsUpdate as EventListener);
    };
  }, []);

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
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-full border border-yellow-200/50 mb-8">
            <Star className="w-5 h-5 mr-2 text-yellow-600 fill-current" />
            <span className="text-sm font-semibold text-yellow-600 tracking-wide">CLIENT TESTIMONIALS</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 leading-tight">
            What Our <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Don't just take our word for it. See what our satisfied clients have to say about their success stories.
          </p>
        </div>
        
        {/* Scrolling Reviews */}
        <div className="relative">
          <div className="flex animate-scroll space-x-8 w-max">
            {[...reviews, ...reviews].map((review, index) => (
              <Card key={`${review.id}-${index}`} className="w-96 flex-shrink-0 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={review.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                      onError={(e) => {
                        e.currentTarget.src = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`;
                      }}
                    />
                    <div>
                      <h4 className="font-bold text-slate-900">{review.name}</h4>
                      <p className="text-slate-600 text-sm">{review.company}</p>
                      <div className="flex mt-2">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
                    <p className="text-slate-700 leading-relaxed pl-6">
                      {review.review}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
