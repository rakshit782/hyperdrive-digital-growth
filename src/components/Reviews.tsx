
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  },
  {
    id: "2",
    name: "Michael Chen",
    company: "Product Manager",
    rating: 5,
    review: "The team's expertise in Amazon advertising is unmatched. They delivered results beyond our expectations.",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    company: "Brand Director",
    rating: 5,
    review: "Professional, results-driven, and always available. Our ROAS improved dramatically with their strategies.",
  },
  {
    id: "4",
    name: "David Thompson",
    company: "Startup Founder",
    rating: 5,
    review: "From zero to hero on Amazon! Their campaign management and optimization skills are top-notch.",
  },
  {
    id: "5",
    name: "Lisa Wang",
    company: "Brand Manager",
    rating: 5,
    review: "Outstanding results! Our conversion rates doubled within the first month of working with them.",
  },
  {
    id: "6",
    name: "Robert Miller",
    company: "Online Retailer",
    rating: 5,
    review: "Best investment we made for our business. Their strategic approach to Amazon advertising is phenomenal.",
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [currentIndex, setCurrentIndex] = useState(0);

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

    loadReviews();

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

  // Auto-scroll functionality with looping
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, reviews.length - 3);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000); // Change slide every 4 seconds

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
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, reviews.length - 3);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, reviews.length - 3);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  if (reviews.length === 0) {
    return null;
  }

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
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              onClick={nextSlide}
              variant="outline"
              size="sm"
              className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white hover:scale-105 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Scrolling Cards Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out gap-6"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                width: `${(reviews.length * 100) / 3}%`
              }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="flex-shrink-0" style={{ width: `${100 / reviews.length}%` }}>
                  <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-white/20 hover:-translate-y-2 h-full">
                    <CardContent className="p-8 h-full flex flex-col">
                      <div className="flex items-center mb-6">
                        <Quote className="w-8 h-8 text-blue-600 mb-4" />
                      </div>
                      
                      <p className="text-slate-700 mb-6 leading-relaxed flex-grow">
                        "{review.review}"
                      </p>
                      
                      <div className="flex items-center mb-4">
                        {renderStars(review.rating)}
                      </div>
                      
                      <div className="mt-auto">
                        <h4 className="font-semibold text-slate-900 text-lg">{review.name}</h4>
                        <p className="text-blue-600 font-medium">{review.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.max(1, reviews.length - 2) }).map((_, index) => (
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
