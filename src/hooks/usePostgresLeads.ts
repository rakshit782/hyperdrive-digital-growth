
import { useState, useEffect } from 'react';
import { postgresService, Lead } from '@/services/postgresService';
import { useToast } from '@/hooks/use-toast';

export const usePostgresLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const leadsData = await postgresService.getLeads();
      setLeads(leadsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch leads';
      setError(errorMessage);
      console.error('Error fetching leads:', err);
      
      toast({
        title: "Error Loading Leads",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createLead = async (leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newLead = await postgresService.insertLead({
        ...leadData,
        form_security: {},
        lead_data: leadData.lead_data || {}
      });
      
      await fetchLeads(); // Refresh the list
      
      toast({
        title: "Lead Created",
        description: "New lead has been added successfully",
      });
      
      return newLead;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create lead';
      toast({
        title: "Error Creating Lead",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateLead = async (id: string, leadData: Partial<Lead>) => {
    try {
      await postgresService.updateLead(id, leadData);
      await fetchLeads(); // Refresh the list
      
      toast({
        title: "Lead Updated",
        description: "Lead has been updated successfully",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update lead';
      toast({
        title: "Error Updating Lead",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteLead = async (id: string) => {
    try {
      await postgresService.deleteLead(id);
      await fetchLeads(); // Refresh the list
      
      toast({
        title: "Lead Deleted",
        description: "Lead has been removed successfully",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete lead';
      toast({
        title: "Error Deleting Lead",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return {
    leads,
    loading,
    error,
    createLead,
    updateLead,
    deleteLead,
    refetch: fetchLeads
  };
};
