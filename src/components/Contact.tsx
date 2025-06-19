
import { CheckCircle, TrendingUp, Users, Award, Star, ArrowRight } from "lucide-react";

const Contact = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Proven ROI Growth",
      description: "Average 300% increase in ROAS within 90 days",
      metric: "300%"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "15+ years combined experience in digital advertising",
      metric: "15+"
    },
    {
      icon: Award,
      title: "Certified Partners",
      description: "Official partners with Amazon, Meta, and Walmart",
      metric: "3"
    },
    {
      icon: CheckCircle,
      title: "Guaranteed Results",
      description: "30-day money-back guarantee on all services",
      metric: "30d"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-navy relative overflow-hidden">
      {/* Enhanced background decoration elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Modern header section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
            <Star className="w-4 h-4 mr-2 text-cyan-400 fill-cyan-400" />
            <span className="text-sm font-medium text-white/90">Trusted by 500+ Brands</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Why Leading Brands
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful companies that trust us to scale their advertising performance 
            and drive exceptional growth.
          </p>
        </div>

        {/* Modern benefits grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index} 
                  className="group relative"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                    {/* Icon and metric */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                          {benefit.metric}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modern CTA section */}
          <div className="text-center">
            <div className="relative max-w-4xl mx-auto">
              {/* Glassmorphism card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 md:p-12 border border-white/20 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Scale Your Business?
                  </h3>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                    Get your free advertising audit and discover how we can boost your revenue 
                    with our proven strategies.
                  </p>
                </div>

                {/* Enhanced buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center">
                    Get Free Audit
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-semibold hover:border-white/50 hover:bg-white/20 transition-all duration-300 flex items-center">
                    View Case Studies
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center text-white/70">
                    <CheckCircle className="w-5 h-5 mr-2 text-cyan-400" />
                    <span>30-Day Money Back Guarantee</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                      ))}
                    </div>
                    <span>4.9/5 Client Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
