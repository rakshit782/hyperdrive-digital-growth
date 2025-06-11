
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

const defaultReviews: Review[] = [
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
];

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);

  useEffect(() => {
    console.log("Reviews: Component mounted, initializing...");
    
    const loadReviews = () => {
      const savedReviews = localStorage.getItem('reviewsData');
      if (savedReviews) {
        try {
          const parsedData = JSON.parse(savedReviews);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            console.log("Reviews: Loaded from localStorage:", parsedData.length);
            setReviews(parsedData);
          } else {
            console.log("Reviews: Invalid localStorage data, using defaults");
            setReviews(defaultReviews);
          }
        } catch (error) {
          console.error("Reviews: Error parsing saved reviews:", error);
          setReviews(defaultReviews);
        }
      }
    };

    // Load reviews on mount
    loadReviews();

    // Listen for updates from dashboard
    const handleReviewsUpdate = (event: CustomEvent) => {
      console.log("Reviews: Received update event:", event.detail);
      if (event.detail && Array.isArray(event.detail)) {
        setReviews(event.detail);
      }
    };

    window.addEventListener('reviewsUpdated', handleReviewsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('reviewsUpdated', handleReviewsUpdate as EventListener);
    };
  }, []);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-white/20 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Quote className="w-8 h-8 text-blue-600 mb-4" />
                </div>
                
                <p className="text-slate-700 mb-6 leading-relaxed">
                  "{review.review}"
                </p>
                
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                </div>
                
                <div className="flex items-center">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-900">{review.name}</h4>
                    <p className="text-slate-600 text-sm">{review.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
