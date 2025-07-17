import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import FAQ from '@/components/FAQ';

interface PricingPlan {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  billing_period: string | null;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

const Pricing = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedPlans = (data || []).map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) 
          ? plan.features.map(feature => String(feature))
          : []
      })) as PricingPlan[];
      
      setPlans(transformedPlans);
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">Loading pricing plans...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. All plans include our core features with no hidden fees.
          </p>
        </div>

        {plans.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  plan.is_popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    {plan.name}
                  </CardTitle>
                  {plan.description && (
                    <CardDescription className="text-slate-600 mt-2">
                      {plan.description}
                    </CardDescription>
                  )}
                  <div className="mt-6">
                    {plan.price ? (
                      <div className="flex items-center justify-center">
                        <span className="text-5xl font-bold text-slate-900">
                          ${plan.price}
                        </span>
                        {plan.billing_period && (
                          <span className="text-slate-600 ml-2">
                            /{plan.billing_period}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-slate-900">
                        Contact Us
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full h-12 font-semibold text-lg rounded-lg transition-all duration-300 ${
                      plan.is_popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                        : 'bg-white border-2 border-slate-300 text-slate-900 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    {plan.price ? 'Get Started' : 'Contact Sales'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              No pricing plans available
            </h2>
            <p className="text-slate-600">
              Please contact us for custom pricing options.
            </p>
            <Button className="mt-6">
              Contact Us
            </Button>
          </div>
        )}

        {/* FAQ Section */}
        <FAQ category="pricing" limit={10} />
      </div>
    </div>
  );
};

export default Pricing;
