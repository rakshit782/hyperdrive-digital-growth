import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PricingPlan {
  id?: string;
  name: string;
  description: string | null;
  price: number;
  billing_period: string;
  features: string[];
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
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      setPlans(data.map(plan => ({
        ...plan,
        price: Number(plan.price),
        features: plan.features as string[] || []
      })));
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
      toast({
        title: "Error",
        description: "Failed to load pricing plans",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const savePlan = async (plan: PricingPlan) => {
    try {
      if (plan.id) {
        const { error } = await supabase
          .from('pricing_plans')
          .update({
            name: plan.name,
            description: plan.description,
            price: plan.price,
            billing_period: plan.billing_period,
            features: plan.features,
            is_popular: plan.is_popular,
            is_active: plan.is_active,
            sort_order: plan.sort_order,
          })
          .eq('id', plan.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('pricing_plans')
          .insert({
            name: plan.name,
            description: plan.description,
            price: plan.price,
            billing_period: plan.billing_period,
            features: plan.features,
            is_popular: plan.is_popular,
            is_active: plan.is_active,
            sort_order: plan.sort_order,
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Pricing plan saved successfully",
      });
      
      fetchPlans();
    } catch (error) {
      console.error('Error saving pricing plan:', error);
      toast({
        title: "Error",
        description: "Failed to save pricing plan",
        variant: "destructive",
      });
    }
  };

  const deletePlan = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pricing_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Pricing plan deleted successfully",
      });
      
      fetchPlans();
    } catch (error) {
      console.error('Error deleting pricing plan:', error);
      toast({
        title: "Error",
        description: "Failed to delete pricing plan",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return {
    plans,
    loading,
    savePlan,
    deletePlan,
    refetch: fetchPlans,
  };
};
