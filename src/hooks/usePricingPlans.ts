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

export const usePricingPlans = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPlans = async () => {
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
        setPlans(processedPlans.sort((a: any, b: any) => a.sort_order - b.sort_order));
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
      }
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
