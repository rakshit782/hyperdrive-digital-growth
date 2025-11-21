import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import defaultPricingData from '@/data/pricingData.json';

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

const CACHE_KEY = 'pricing_plans_cache';
const CACHE_TIMESTAMP_KEY = 'pricing_plans_cache_timestamp';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const usePricingPlans = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getCachedPlans = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (cached && timestamp) {
        const age = Date.now() - parseInt(timestamp);
        if (age < CACHE_DURATION) {
          return JSON.parse(cached);
        }
      }
    } catch (e) {
      console.error('Error reading cache:', e);
    }
    return null;
  };

  const setCachedPlans = (plansData: PricingPlan[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(plansData));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (e) {
      console.error('Error setting cache:', e);
    }
  };

  const fetchPlans = async () => {
    // Try cache first for instant loading
    const cached = getCachedPlans();
    if (cached) {
      setPlans(cached);
      setLoading(false);
      
      // Fetch fresh data in background
      fetchFreshPlans();
      return;
    }

    // No cache, fetch immediately
    await fetchFreshPlans();
  };

  const fetchFreshPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        // Use default data if no plans in database
        const processedPlans = defaultPricingData.plans.map((plan: any) => ({
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
        const sortedPlans = processedPlans.sort((a: any, b: any) => a.sort_order - b.sort_order);
        setPlans(sortedPlans);
        setCachedPlans(sortedPlans);
      } else {
        const processedPlans = data.map((plan: any) => {
          let features = [];
          let addons = [];
          
          // Parse features JSON which contains both features and addons
          if (plan.features) {
            try {
              const parsed = typeof plan.features === 'string' 
                ? JSON.parse(plan.features) 
                : plan.features;
              
              features = Array.isArray(parsed.features) 
                ? parsed.features.filter((f: any) => {
                    if (typeof f === 'string') return true;
                    return f.included !== false;
                  })
                : Array.isArray(parsed)
                  ? parsed.filter((f: any) => {
                      if (typeof f === 'string') return true;
                      return f.included !== false;
                    })
                  : [];
              
              addons = Array.isArray(parsed.addons) ? parsed.addons : [];
            } catch (e) {
              console.error('Error parsing features:', e);
            }
          }
          
          return {
            ...plan,
            features,
            addons
          };
        });
        setPlans(processedPlans);
        setCachedPlans(processedPlans);
      }
    } catch (error) {
      console.error('Error loading pricing plans:', error);
      // Don't clear plans if we have cached data
      if (plans.length === 0) {
        setPlans([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const savePlan = async (plan: PricingPlan) => {
    try {
      const planData = {
        name: plan.name,
        description: plan.description,
        price: plan.price,
        billing_period: plan.billing_period,
        features: JSON.stringify({
          features: plan.features,
          addons: plan.addons || []
        }),
        is_popular: plan.is_popular,
        is_active: plan.is_active,
        sort_order: plan.sort_order
      };

      if (plan.id) {
        // Update existing plan
        const { error } = await supabase
          .from('pricing_plans')
          .update(planData)
          .eq('id', plan.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Plan updated successfully"
        });
      } else {
        // Add new plan
        const { error } = await supabase
          .from('pricing_plans')
          .insert(planData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Plan created successfully"
        });
      }
      
      // Clear cache after save
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      
      await fetchPlans();
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

  const deletePlan = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pricing_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Clear cache after delete
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_TIMESTAMP_KEY);

      await fetchPlans();
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
