
import React from 'react';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import SEOHead from '@/components/SEOHead';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$2,500",
      period: "month",
      description: "Perfect for small businesses starting their advertising journey",
      features: [
        "Single platform management (Amazon OR Meta)",
        "Up to $10k monthly ad spend",
        "Basic campaign optimization",
        "Monthly performance reports",
        "Email support",
        "Campaign setup & launch"
      ],
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      popular: false
    },
    {
      name: "Professional",
      price: "$4,500",
      period: "month",
      description: "Ideal for growing businesses ready to scale",
      features: [
        "Multi-platform management (Amazon + Meta)",
        "Up to $25k monthly ad spend",
        "Advanced campaign optimization",
        "Bi-weekly performance reports",
        "Priority support",
        "A/B testing & creative optimization",
        "Custom landing pages",
        "Conversion tracking setup"
      ],
      icon: <Crown className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For established brands requiring full-service solutions",
      features: [
        "All platforms (Amazon, Meta, Google, Walmart)",
        "Unlimited ad spend management",
        "24/7 account management",
        "Weekly strategy calls",
        "Custom reporting dashboard",
        "Dedicated account manager",
        "Advanced analytics & insights",
        "White-label reporting",
        "Priority phone support"
      ],
      icon: <Rocket className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      popular: false
    }
  ];

  return (
    <>
      <SEOHead 
        title="Pricing Plans - Affordable Marketing Solutions"
        description="Choose the perfect marketing plan for your business. Transparent pricing with no hidden fees. Start scaling your business today."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Choose the perfect plan for your business. All plans include our proven strategies and dedicated support.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={`relative ${plan.popular ? 'border-2 border-purple-200 shadow-xl scale-105' : 'border border-slate-200 hover:shadow-lg'} transition-all duration-300 bg-white/80 backdrop-blur-sm`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white`}>
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-slate-600">/{plan.period}</span>
                    </div>
                    <p className="text-slate-600 mt-2">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'} text-white font-semibold py-3 rounded-lg transition-all duration-300`}
                      asChild
                    >
                      <a href="/contact">
                        Get Started
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <div className="text-center mt-16">
              <p className="text-slate-600 mb-6">
                All plans include setup, optimization, and ongoing support. No hidden fees.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  No Setup Fees
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Cancel Anytime
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  30-Day Money Back Guarantee
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
