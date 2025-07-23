
import { useState, useEffect } from 'react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export const useSupabasePricingPlans = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([
    {
      id: '1',
      name: 'Starter',
      price: 99,
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
      popular: true,
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
