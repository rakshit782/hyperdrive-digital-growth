import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePricingPlans } from "@/hooks/usePricingPlans";

const defaultPlans = [
  {
    id: '1',
    name: 'Starter',
    description: 'Perfect for small businesses getting started',
    price: 499,
    billing_period: 'month',
    features: [
      'Social media management',
      'Basic analytics',
      'Email support',
      '2 campaigns per month',
      'Brand strategy consultation'
    ],
    is_popular: false,
    is_active: true,
    sort_order: 1
  },
  {
    id: '2',
    name: 'Professional',
    description: 'Ideal for growing businesses',
    price: 999,
    billing_period: 'month',
    features: [
      'Everything in Starter',
      'Advanced analytics & reporting',
      'Priority support',
      '5 campaigns per month',
      'A/B testing',
      'Custom landing pages'
    ],
    is_popular: true,
    is_active: true,
    sort_order: 2
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'For businesses that need it all',
    price: null,
    billing_period: 'custom',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      '24/7 phone support',
      'Unlimited campaigns',
      'Custom integrations',
      'White-label reporting',
      'Advanced automation'
    ],
    is_popular: false,
    is_active: true,
    sort_order: 3
  }
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { plans, loading } = usePricingPlans();

  const activePlans = plans.filter(plan => plan.is_active);
  const displayPlans = activePlans.length > 0 ? activePlans : defaultPlans;

  return (
    <>
      <SEOHead 
        title="Pricing Plans - Choose Your Growth Plan"
        description="Simple, transparent pricing for digital marketing services. Choose the perfect plan for your business growth."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                Choose the perfect plan for your business. All plans include our core features with varying levels of support and customization.
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-12">
                <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-slate-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-blue-600' : 'text-slate-500'}`}>
                  Yearly
                  <Badge variant="secondary" className="ml-2">Save 20%</Badge>
                </span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="flex flex-col gap-6 max-w-6xl mx-auto">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-slate-600">Loading pricing plans...</p>
                </div>
              ) : (
                displayPlans
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                      plan.is_popular 
                        ? 'border-2 border-blue-500 shadow-xl bg-white' 
                        : 'border border-slate-200 bg-white/80 backdrop-blur-sm'
                    }`}
                  >
                    {plan.is_popular && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                        <Star className="w-4 h-4 inline mr-1" />
                        Most Popular
                      </div>
                    )}
                    
                    <div className={`flex flex-col md:flex-row ${plan.is_popular ? 'pt-10' : ''}`}>
                      {/* Left Side - Plan Details */}
                      <div className="flex-1 p-8">
                        <div className="mb-6">
                          <CardTitle className="text-3xl font-bold text-slate-900 mb-2">
                            {plan.name}
                          </CardTitle>
                          <CardDescription className="text-slate-600 text-lg">
                            {plan.description}
                          </CardDescription>
                        </div>
                        
                        <ul className="space-y-3">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Separator */}
                      <div className="hidden md:block w-px bg-slate-200 my-8" />
                      <div className="md:hidden h-px bg-slate-200 mx-8" />
                      
                      {/* Right Side - Pricing & CTA */}
                      <div className="flex flex-col items-center justify-center p-8 md:w-80">
                        <div className="text-center mb-6">
                          <div className="text-5xl font-bold text-slate-900 mb-2">
                            ${billingCycle === 'yearly' && plan.price ? (plan.price * 12 * 0.8).toFixed(0) : plan.price || 'Custom'}
                          </div>
                          {plan.price && (
                            <div className="text-slate-500 text-lg">
                              per {billingCycle === 'yearly' ? 'year' : plan.billing_period}
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                            plan.is_popular
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          Get Started
                        </Button>
                      </div>
                    </div>
                  </Card>
                  ))
              )}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Need a Custom Solution?
                </h3>
                <p className="text-slate-600 mb-6">
                  Contact us for enterprise pricing and custom solutions tailored to your specific needs.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Contact Sales
                </Button>
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
