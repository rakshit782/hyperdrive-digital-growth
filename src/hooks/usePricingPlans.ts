import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/authService';

const SUPABASE_URL = "https://hznbshxhmhtenxcuffhx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bmJzaHhobWh0ZW54Y3VmZmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzEzMjEsImV4cCI6MjA2NDIwNzMyMX0.jydxpMEn5Z-fDDJXA9XAbx_mHEi_eQPFNEYikM21gnY";

export interface PricingPlan {
  id?: string;
  name: string;
  description: string | null;
  price: number;
  billing_period: string;
  features: string[];
  addons?: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

export const usePricingPlans = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getAuthHeaders = () => {
    const token = authService.getAccessToken();
    return {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/neon-pricing-plans`,
        {
          method: 'GET',
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch pricing plans');
      }

      const data = await response.json();
      
      setPlans(data.map((plan: any) => {
        let features: string[] = [];
        let addons: string[] = [];
        
        try {
          const rawFeatures = typeof plan.features === 'string' 
            ? JSON.parse(plan.features) 
            : plan.features || [];
          
          // Separate features and addons
          for (const item of rawFeatures) {
            if (typeof item === 'string') {
              features.push(item);
            } else if (item && typeof item === 'object' && item['Add-ons']) {
              // Extract addons from the object
              addons = Array.isArray(item['Add-ons']) ? item['Add-ons'] : [];
            }
          }
        } catch (error) {
          console.error(`Error parsing features for plan ${plan.name}:`, error);
          features = [];
          addons = [];
        }
        
        return {
          ...plan,
          price: Number(plan.price),
          features,
          addons
        };
      }));
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
      const url = plan.id 
        ? `${SUPABASE_URL}/functions/v1/neon-pricing-plans?id=${plan.id}`
        : `${SUPABASE_URL}/functions/v1/neon-pricing-plans`;

      // Combine features and addons into the proper structure
      let combinedFeatures = [...plan.features];
      if (plan.addons && plan.addons.length > 0) {
        combinedFeatures.push({
          "Add-ons": plan.addons
        } as any);
      }

      const response = await fetch(url, {
        method: plan.id ? 'PUT' : 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: plan.name,
          description: plan.description,
          price: plan.price,
          billing_period: plan.billing_period,
          features: combinedFeatures,
          is_popular: plan.is_popular,
          is_active: plan.is_active,
          sort_order: plan.sort_order,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save pricing plan');
      }

      toast({
        title: "Success",
        description: "Pricing plan saved successfully",
      });
      
      fetchPlans();
    } catch (error: any) {
      console.error('Error saving pricing plan:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save pricing plan",
        variant: "destructive",
      });
    }
  };

  const deletePlan = async (id: string) => {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/neon-pricing-plans?id=${id}`,
        {
          method: 'DELETE',
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete pricing plan');
      }

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
