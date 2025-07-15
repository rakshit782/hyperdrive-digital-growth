import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import SEOHead from '@/components/SEOHead';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billing_period: string;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

const Pricing = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPricingPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      const formattedPlans = data?.map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features.map(String) : [],
        price: plan.price || 0,
        billing_period: plan.billing_period || 'monthly',
        description: plan.description || '',
        is_popular: plan.is_popular || false,
        is_active: plan.is_active || true,
        sort_order: plan.sort_order || 0
      })) || [];
      
      setPlans(formattedPlans);
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricingPlans();

    // Listen for real-time updates
    const channel = supabase
      .channel('pricing-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'pricing_plans' 
        }, 
        () => {
          fetchPricingPlans();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title="Pricing Plans - Affordable Digital Marketing Solutions"
        description="Choose the perfect plan for your business. Transparent pricing for Amazon advertising, Meta ads, Google ads, and more."
        keywords="pricing, plans, digital marketing costs, advertising packages"
      />
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your business. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative ${
                  plan.is_popular 
                    ? 'border-2 border-blue-500 shadow-2xl scale-105' 
                    : 'border border-gray-200 shadow-lg'
                } hover:shadow-xl transition-all duration-300`}
              >
                {plan.is_popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{plan.billing_period}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-3 text-lg font-semibold ${
                      plan.is_popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                    onClick={() => window.location.href = '/contact'}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {plans.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No pricing plans available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pricing;
