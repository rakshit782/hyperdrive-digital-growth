import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import defaultPricingData from '@/data/pricingData.json';

// LocalStorage key for pricing data
const PRICING_DATA_KEY = 'pricing_plans_data';

// Helper to get pricing data from localStorage or use default
function getPricingData(): any {
  const stored = localStorage.getItem(PRICING_DATA_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse stored pricing data:', error);
    }
  }
  return defaultPricingData;
}

// Save pricing data to localStorage
function savePricingData(data: any): void {
  try {
    localStorage.setItem(PRICING_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save pricing data:', error);
  }
}

export interface PricingPlan {
  id?: string;
  name: string;
  description: string | null;
  price: number;
  billing_period: string;
  features: Array<string | { text: string; included?: boolean }>;
  addons?: Array<{ name: string; price: number }>;
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

export const usePricingPlans = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPlans = () => {
    try {
      const data = getPricingData();
      const processedPlans = data.plans.map((plan: any) => ({
        ...plan,
        features: Array.isArray(plan.features) 
          ? plan.features.filter((f: any) => {
              if (typeof f === 'string') return true;
              return f.included !== false;
            })
          : [],
        addons: Array.isArray(plan.addons) 
          ? plan.addons
          : []
      }));
      
      setPlans(processedPlans.sort((a: any, b: any) => a.sort_order - b.sort_order));
    } catch (error) {
      console.error('Error loading pricing plans:', error);
      setPlans([]);
      toast({
        title: "Error",
        description: "Failed to load pricing plans",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const savePlan = (plan: PricingPlan) => {
    try {
      const data = getPricingData();
      const planIndex = data.plans.findIndex((p: any) => p.id === plan.id);
      
      if (planIndex >= 0) {
        // Update existing plan
        data.plans[planIndex] = plan;
        toast({
          title: "Success",
          description: "Plan updated successfully"
        });
      } else {
        // Add new plan with generated ID
        const newPlan = {
          ...plan,
          id: plan.id || `plan_${Date.now()}`,
        };
        data.plans.push(newPlan);
        toast({
          title: "Success",
          description: "Plan created successfully"
        });
      }
      
      savePricingData(data);
      fetchPlans();
    } catch (error) {
      console.error('Error saving plan:', error);
      toast({
        title: "Error",
        description: "Failed to save plan",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deletePlan = (id: string) => {
    try {
      const data = getPricingData();
      data.plans = data.plans.filter((p: any) => p.id !== id);
      savePricingData(data);
      fetchPlans();
      toast({
        title: "Success",
        description: "Plan deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting plan:', error);
      toast({
        title: "Error",
        description: "Failed to delete plan",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const refetch = fetchPlans;

  return {
    plans,
    loading,
    savePlan,
    deletePlan,
    refetch
  };
};
