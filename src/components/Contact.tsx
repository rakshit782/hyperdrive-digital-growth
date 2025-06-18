
import { CheckCircle, TrendingUp, Users, Award } from "lucide-react";

const Contact = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Proven ROI Growth",
      description: "Average 300% increase in ROAS within 90 days"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "15+ years combined experience in digital advertising"
    },
    {
      icon: Award,
      title: "Certified Partners",
      description: "Official partners with Amazon, Meta, and Walmart"
    },
    {
      icon: CheckCircle,
      title: "Guaranteed Results",
      description: "30-day money-back guarantee on all services"
    }
  ];

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Choose Our Agency
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join hundreds of successful brands that trust us to scale their advertising performance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-100/70 to-cyan-100/70 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto border border-white/30">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Get Started?</h3>
              <p className="text-slate-600 mb-6">
                Get your free advertising audit and discover how we can boost your revenue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl">
                  Get Free Audit
                </button>
                <button className="border-2 border-slate-300 bg-white/60 backdrop-blur-sm text-slate-700 px-8 py-3 rounded-lg font-semibold hover:border-slate-400 hover:bg-white/80 transition-all">
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
