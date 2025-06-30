
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
}

const Pricing = () => {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      id: "starter",
      name: "Starter",
      price: "$2,500/mo",
      description: "Perfect for small businesses looking to get started with professional advertising.",
      features: [
        "Up to $10K monthly ad spend",
        "Amazon PPC management",
        "Monthly strategy calls",
        "Performance reporting",
        "Account setup & optimization"
      ],
      ctaText: "Get Started",
      ctaLink: "/free-audit"
    },
    {
      id: "growth",
      name: "Growth",
      price: "$4,500/mo",
      description: "Ideal for growing businesses ready to scale across multiple platforms.",
      features: [
        "Up to $25K monthly ad spend",
        "Amazon + Walmart advertising",
        "Bi-weekly strategy calls",
        "Advanced reporting & analytics",
        "Listing optimization",
        "Competitor analysis",
        "A/B testing campaigns"
      ],
      popular: true,
      ctaText: "Start Growing",
      ctaLink: "/free-audit"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      description: "Full-service solution for established brands with complex needs.",
      features: [
        "Unlimited ad spend management",
        "Amazon + Walmart + Meta",
        "Weekly strategy calls",
        "Real-time dashboard access",
        "Dedicated account manager",
        "Creative development",
        "Advanced attribution tracking",
        "Custom integrations",
        "Priority support"
      ],
      ctaText: "Contact Sales",
      ctaLink: "/contact"
    }
  ]);

  useEffect(() => {
    // Load pricing plans from localStorage (dashboard settings)
    const loadPricingPlans = () => {
      const savedPlans = localStorage.getItem('pricingPlansData');
      if (savedPlans) {
        try {
          const parsed = JSON.parse(savedPlans);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPricingPlans(parsed);
          }
        } catch (error) {
          console.error('Failed to parse pricing plans:', error);
        }
      }
    };

    loadPricingPlans();

    // Listen for pricing updates from dashboard
    const handlePlansUpdate = (event: CustomEvent) => {
      if (event.detail && Array.isArray(event.detail)) {
        setPricingPlans(event.detail);
      }
    };

    window.addEventListener('pricingPlansUpdated', handlePlansUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pricingPlansUpdated', handlePlansUpdate as EventListener);
    };
  }, []);

  return (
    <>
      <SEOHead 
        title="Pricing - Transparent Advertising Management Plans"
        description="Choose the perfect advertising management plan for your business. Transparent pricing with no hidden fees."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section with symmetrical padding */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              Choose the plan that fits your business size and goals. No hidden fees, no long-term contracts.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className={`relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                      <Star className="inline w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{plan.name}</h3>
                    <div className="text-4xl font-bold text-slate-900 mb-2">{plan.price}</div>
                    <p className="text-slate-600 mb-6">{plan.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' 
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                      onClick={() => window.location.href = plan.ctaLink}
                    >
                      {plan.ctaText}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Is there a setup fee?</h3>
                <p className="text-slate-600">No, there are no setup fees. We include all account setup and initial optimization in your monthly fee.</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Can I change plans anytime?</h3>
                <p className="text-slate-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">What's included in the free audit?</h3>
                <p className="text-slate-600">Our free audit includes a comprehensive review of your current advertising performance, competitive analysis, and a customized strategy recommendation.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
