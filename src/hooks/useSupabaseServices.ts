
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SupabaseService {
  id: string;
  title: string;
  description: string;
  features: string[]; // Keep as string[] but handle conversion from Json
  gradient: string | null;
  bg_gradient: string | null;
  link: string | null;
  icon: string | null;
  service_type: string;
  sort_order: number | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useSupabaseServices = () => {
  const [services, setServices] = useState<SupabaseService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      // Transform the data to ensure features is always a string array
      const formattedServices: SupabaseService[] = (data || []).map(service => ({
        ...service,
        features: Array.isArray(service.features) 
          ? service.features.filter((item): item is string => typeof item === 'string')
          : []
      }));

      setServices(formattedServices);
      console.log('Services fetched from Supabase:', formattedServices.length);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch services';
      setError(errorMessage);
      console.error('Error fetching services:', err);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData: Omit<SupabaseService, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert(serviceData)
        .select()
        .single();

      if (error) throw error;

      await fetchServices();
      toast({
        title: "Success",
        description: "Service created successfully",
      });
      return data;
    } catch (err) {
      console.error('Error creating service:', err);
      toast({
        title: "Error",
        description: "Failed to create service",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateService = async (id: string, updates: Partial<SupabaseService>) => {
    try {
      const { error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchServices();
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
    } catch (err) {
      console.error('Error updating service:', err);
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchServices();
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    } catch (err) {
      console.error('Error deleting service:', err);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchServices();

    // Set up real-time subscription
    const channel = supabase
      .channel('services-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'services'
        },
        () => {
          console.log('Services table changed, refetching...');
          fetchServices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    services,
    loading,
    error,
    createService,
    updateService,
    deleteService,
    refetch: fetchServices
  };
};
