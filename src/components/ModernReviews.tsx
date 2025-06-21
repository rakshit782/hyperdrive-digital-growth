
import { Star, Quote } from "lucide-react";

const ModernReviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      rating: 5,
      review: "Our Amazon sales increased by 400% in just 3 months. The team's expertise in PPC optimization is unmatched. They transformed our struggling campaigns into profit-generating machines.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c788?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      company: "Global Retail Co.",
      rating: 5,
      review: "Working with this agency was a game-changer for our Walmart advertising. Their strategic approach and attention to detail resulted in a 250% increase in ROAS within the first quarter.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      company: "Fashion Forward",
      rating: 5,
      review: "The Meta advertising campaigns they created for us generated over 10,000 new customers in 6 months. Their creative strategies and targeting precision exceeded all our expectations.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David Thompson",
      company: "Home Essentials",
      rating: 5,
      review: "Professional, results-driven, and incredibly knowledgeable. They optimized our advertising spend and increased our conversion rates by 180%. Highly recommend their services!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Lisa Wang",
      company: "Wellness Products",
      rating: 5,
      review: "Their comprehensive approach to multi-platform advertising helped us scale from $10K to $100K monthly revenue. The team is responsive and delivers on every promise.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Robert Martinez",
      company: "Sports Gear Pro",
      rating: 5,
      review: "Amazing results across Amazon and Meta platforms. Our brand visibility increased dramatically and sales followed suit. The ROI has been exceptional from day one.",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
    }
  ];

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

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-blue-200 transform hover:-translate-y-2"
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
              <p className="text-slate-700 leading-relaxed mb-6 text-sm">
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

export default ModernReviews;
