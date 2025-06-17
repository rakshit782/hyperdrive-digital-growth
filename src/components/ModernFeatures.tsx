
import { useState, useEffect } from "react";
import { Shield, Zap, TrendingUp, Users, Award, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ModernFeatures = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('modern-features');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: "ROI-Driven Results",
      description: "Average 300% increase in ROAS within 90 days",
      metric: "300%",
      label: "ROAS Increase"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliant with advanced data protection",
      metric: "100%",
      label: "Data Security"
    },
    {
      icon: Zap,
      title: "Lightning Fast Setup",
      description: "Get campaigns running in 24 hours or less",
      metric: "24hrs",
      label: "Setup Time"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Expert account managers for personalized growth",
      metric: "24/7",
      label: "Support Available"
    },
    {
      icon: Award,
      title: "Certified Experts",
      description: "Amazon, Meta, and Google certified professionals",
      metric: "50+",
      label: "Certifications"
    },
    {
      icon: Star,
      title: "Client Satisfaction",
      description: "98% client retention rate with proven results",
      metric: "98%",
      label: "Retention Rate"
    }
  ];

  return (
    <section 
      id="modern-features" 
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Why Leading Brands Choose Us
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Cutting-edge technology meets proven strategies to deliver exceptional results for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className={`group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-white/20 ${
                isVisible ? 'animate-in slide-in-from-bottom-4' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {feature.metric}
                    </div>
                    <div className="text-sm text-slate-500">{feature.label}</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-700">500+</div>
              <div className="text-sm text-slate-500">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-700">$50M+</div>
              <div className="text-sm text-slate-500">Ad Spend Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-700">150%</div>
              <div className="text-sm text-slate-500">Avg Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-700">24hrs</div>
              <div className="text-sm text-slate-500">Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernFeatures;
