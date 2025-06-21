
import { ShoppingCart, Store, Facebook, TrendingUp, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const ModernServices = () => {
  const services = [
    {
      icon: ShoppingCart,
      title: "Amazon Advertising",
      description: "Dominate Amazon with our proven PPC strategies and optimization techniques.",
      features: ["PPC Campaign Management", "Keyword Research", "Product Listing Optimization", "Competitive Analysis"],
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      stats: { metric: "300%", label: "Avg ROAS" }
    },
    {
      icon: Store,
      title: "Walmart Connect",
      description: "Maximize your Walmart marketplace presence with targeted advertising campaigns.",
      features: ["Sponsored Products", "Display Advertising", "Brand Amplifier", "Performance Analytics"],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      stats: { metric: "250%", label: "Sales Growth" }
    },
    {
      icon: Facebook,
      title: "Meta Advertising",
      description: "Drive conversions with strategic Facebook and Instagram advertising campaigns.",
      features: ["Facebook Ads", "Instagram Marketing", "Audience Targeting", "Creative Optimization"],
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
      stats: { metric: "400%", label: "Lead Gen" }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 mb-6">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Advertising Solutions That
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Drive Real Results
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We specialize in high-performance advertising across the platforms that matter most for your business growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative z-10">
                  {/* Icon and stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                        {service.stats.metric}
                      </div>
                      <div className="text-sm text-slate-500">{service.stats.label}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-600">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 flex-shrink-0`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 transition-all duration-300 group-hover:shadow-md"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom stats */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-slate-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">$50M+</div>
              <div className="text-slate-600">Ad Spend Managed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-600 mb-2">300%</div>
              <div className="text-slate-600">Average ROAS</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-slate-600">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernServices;
