
import { useState, useEffect } from 'react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  is_popular?: boolean;
  is_active?: boolean;
  sort_order: number;
  description?: string;
  billing_period?: string;
}

export const useSupabasePricingPlans = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([
    {
      id: '1',
      name: 'Starter',
      price: 99,
      sort_order: 1,
      is_active: true,
      is_popular: false,
      description: 'Perfect for small businesses getting started',
      billing_period: 'month',
      features: [
        'Basic SEO Optimization',
        'Social Media Management',
        'Monthly Reports',
        'Email Support'
      ]
    },
    {
      id: '2',
      name: 'Professional',
      price: 299,
      sort_order: 2,
      is_active: true,
      is_popular: true,
      description: 'Best for growing businesses',
      billing_period: 'month',
      features: [
        'Advanced SEO & Content',
        'Paid Advertising Management',
        'Weekly Reports',
        'Phone & Email Support',
        'Conversion Optimization'
      ]
    },
    {
      id: '3',
      name: 'Enterprise',
      price: 599,
      sort_order: 3,
      is_active: true,
      is_popular: false,
      description: 'For large enterprises needing full support',
      billing_period: 'month',
      features: [
        'Full Digital Marketing Suite',
        'Dedicated Account Manager',
        'Daily Monitoring',
        '24/7 Priority Support',
        'Custom Strategy Development',
        'Advanced Analytics'
      ]
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    plans,
    loading,
    error,
    updatePlan: (id: string, updates: Partial<PricingPlan>) => {
      setPlans(prev => prev.map(plan => 
        plan.id === id ? { ...plan, ...updates } : plan
      ));
    },
    addPlan: (plan: Omit<PricingPlan, 'id'>) => {
      const newPlan = { ...plan, id: Date.now().toString() };
      setPlans(prev => [...prev, newPlan]);
    },
    deletePlan: (id: string) => {
      setPlans(prev => prev.filter(plan => plan.id !== id));
    }
  };
};
