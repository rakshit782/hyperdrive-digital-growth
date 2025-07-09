
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { localDB } from '@/utils/localStorageDB';

export interface LocalLead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes?: string;
  form_security?: Record<string, any>;
  lead_data?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export const useLocalLeads = () => {
  const [leads, setLeads] = useState<LocalLead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const leadsData = await localDB.findAll('leads');
      setLeads(leadsData);
      console.log('Leads fetched from local storage:', leadsData);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error",
        description: "Failed to load leads from local storage",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createLead = async (leadData: Omit<LocalLead, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const id = await localDB.insert('leads', leadData);
      toast({
        title: "Success",
        description: "Lead created successfully",
      });
      await fetchLeads(); // Refresh the list
      return { id, ...leadData };
    } catch (error) {
      console.error('Error creating lead:', error);
      toast({
        title: "Error",
        description: "Failed to create lead",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateLead = async (id: string, leadData: Partial<LocalLead>) => {
    try {
      await localDB.update('leads', id, leadData);
      toast({
        title: "Success",
        description: "Lead updated successfully",
      });
      await fetchLeads(); // Refresh the list
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: "Error",
        description: "Failed to update lead",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteLead = async (id: string) => {
    try {
      await localDB.delete('leads', id);
      toast({
        title: "Success",
        description: "Lead deleted successfully",
      });
      await fetchLeads(); // Refresh the list
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast({
        title: "Error",
        description: "Failed to delete lead",
        variant: "destructive",
      });
      throw error;
    }
  };

  const refetch = () => {
    fetchLeads();
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return {
    leads,
    loading,
    createLead,
    updateLead,
    deleteLead,
    refetch
  };
};
