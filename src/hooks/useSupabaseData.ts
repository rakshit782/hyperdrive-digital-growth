import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

// Use Supabase generated types as base and extend them
type BlogPostRow = Database['public']['Tables']['blog_posts']['Row'];
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];
type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update'];

type PricingPlanRow = Database['public']['Tables']['pricing_plans']['Row'];
type PricingPlanInsert = Database['public']['Tables']['pricing_plans']['Insert'];
type PricingPlanUpdate = Database['public']['Tables']['pricing_plans']['Update'];

type LeadRow = Database['public']['Tables']['leads']['Row'];
type LeadInsert = Database['public']['Tables']['leads']['Insert'];
type LeadUpdate = Database['public']['Tables']['leads']['Update'];

type FAQRow = Database['public']['Tables']['faqs']['Row'];
type FAQInsert = Database['public']['Tables']['faqs']['Insert'];
type FAQUpdate = Database['public']['Tables']['faqs']['Update'];

type WebsiteSettingRow = Database['public']['Tables']['website_settings']['Row'];
type WebsiteSettingInsert = Database['public']['Tables']['website_settings']['Insert'];
type WebsiteSettingUpdate = Database['public']['Tables']['website_settings']['Update'];

// Export interfaces that match Supabase types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content?: string | null;
  excerpt?: string | null;
  featured_image?: string | null;
  status: 'draft' | 'published' | 'archived';
  tags?: string[] | null;
  meta_title?: string | null;
  meta_description?: string | null;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  author_id?: string | null;
}

export interface PricingPlan {
  id: string;
  name: string;
  description?: string | null;
  price: number | null;
  billing_period: 'monthly' | 'yearly' | 'one-time';
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: string;
  company_name?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  social_links: Record<string, string>;
  business_hours: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  source?: string | null;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes?: string | null;
  lead_data: Record<string, any>;
  assigned_to?: string | null;
  created_at: string;
  updated_at: string;
}

export interface WebsiteSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  setting_type: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceCaseStudy {
  id: string;
  service_type: string;
  title: string;
  description: string;
  client_name?: string;
  industry?: string;
  results: Record<string, string>;
  image_url?: string;
  is_featured: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceStat {
  id: string;
  service_type: string;
  stat_label: string;
  stat_value: string;
  stat_description?: string;
  icon_name?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceReview {
  id: string;
  service_type: string;
  client_name: string;
  company: string;
  rating: number;
  review_text: string;
  avatar_url?: string;
  results_achieved?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useSupabaseData = () => {
  const { toast } = useToast();

  // Blog Posts
  const useBlogPosts = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchPosts();
    }, []);

    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts((data as BlogPost[]) || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: "Error",
          description: "Failed to fetch blog posts",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const createPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        const insertData: BlogPostInsert = {
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          featured_image: post.featured_image,
          status: post.status,
          tags: post.tags,
          meta_title: post.meta_title,
          meta_description: post.meta_description,
          published_at: post.published_at,
          author_id: post.author_id
        };

        const { data, error } = await supabase
          .from('blog_posts')
          .insert(insertData)
          .select()
          .single();

        if (error) throw error;
        setPosts(prev => [data as BlogPost, ...prev]);
        toast({
          title: "Success",
          description: "Blog post created successfully",
        });
        return data as BlogPost;
      } catch (error) {
        console.error('Error creating blog post:', error);
        toast({
          title: "Error",
          description: "Failed to create blog post",
          variant: "destructive",
        });
        throw error;
      }
    };

    const updatePost = async (id: string, updates: Partial<Omit<BlogPost, 'id' | 'created_at'>>) => {
      try {
        const updateData: BlogPostUpdate = {
          ...updates,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('blog_posts')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setPosts(prev => prev.map(post => post.id === id ? data as BlogPost : post));
        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
        return data as BlogPost;
      } catch (error) {
        console.error('Error updating blog post:', error);
        toast({
          title: "Error",
          description: "Failed to update blog post",
          variant: "destructive",
        });
        throw error;
      }
    };

    const deletePost = async (id: string) => {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setPosts(prev => prev.filter(post => post.id !== id));
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting blog post:', error);
        toast({
          title: "Error",
          description: "Failed to delete blog post",
          variant: "destructive",
        });
        throw error;
      }
    };

    return { posts, loading, createPost, updatePost, deletePost, refetch: fetchPosts };
  };

  // Pricing Plans
  const usePricingPlans = () => {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchPlans();
    }, []);

    const fetchPlans = async () => {
      try {
        const { data, error } = await supabase
          .from('pricing_plans')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setPlans((data as PricingPlan[]) || []);
      } catch (error) {
        console.error('Error fetching pricing plans:', error);
        toast({
          title: "Error",
          description: "Failed to fetch pricing plans",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const createPlan = async (plan: Omit<PricingPlan, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        const insertData: PricingPlanInsert = {
          name: plan.name,
          description: plan.description,
          price: plan.price,
          billing_period: plan.billing_period,
          features: plan.features,
          is_popular: plan.is_popular,
          is_active: plan.is_active,
          sort_order: plan.sort_order
        };

        const { data, error } = await supabase
          .from('pricing_plans')
          .insert(insertData)
          .select()
          .single();

        if (error) throw error;
        setPlans(prev => [...prev, data as PricingPlan].sort((a, b) => a.sort_order - b.sort_order));
        toast({
          title: "Success",
          description: "Pricing plan created successfully",
        });
        return data as PricingPlan;
      } catch (error) {
        console.error('Error creating pricing plan:', error);
        toast({
          title: "Error",
          description: "Failed to create pricing plan",
          variant: "destructive",
        });
        throw error;
      }
    };

    const updatePlan = async (id: string, updates: Partial<Omit<PricingPlan, 'id' | 'created_at'>>) => {
      try {
        const updateData: PricingPlanUpdate = {
          ...updates,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('pricing_plans')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setPlans(prev => prev.map(plan => plan.id === id ? data as PricingPlan : plan));
        toast({
          title: "Success",
          description: "Pricing plan updated successfully",
        });
        return data as PricingPlan;
      } catch (error) {
        console.error('Error updating pricing plan:', error);
        toast({
          title: "Error",
          description: "Failed to update pricing plan",
          variant: "destructive",
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
        setPlans(prev => prev.filter(plan => plan.id !== id));
        toast({
          title: "Success",
          description: "Pricing plan deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting pricing plan:', error);
        toast({
          title: "Error",
          description: "Failed to delete pricing plan",
          variant: "destructive",
        });
        throw error;
      }
    };

    return { plans, loading, createPlan, updatePlan, deletePlan, refetch: fetchPlans };
  };

  // FAQs
  const useFAQs = () => {
    const [faqs, setFAQs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setFAQs((data as FAQ[]) || []);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        toast({
          title: "Error",
          description: "Failed to fetch FAQs",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const createFAQ = async (faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        const insertData: FAQInsert = {
          question: faq.question,
          answer: faq.answer,
          category: faq.category,
          is_active: faq.is_active,
          sort_order: faq.sort_order
        };

        const { data, error } = await supabase
          .from('faqs')
          .insert(insertData)
          .select()
          .single();

        if (error) throw error;
        setFAQs(prev => [...prev, data as FAQ].sort((a, b) => a.sort_order - b.sort_order));
        toast({
          title: "Success",
          description: "FAQ created successfully",
        });
        return data as FAQ;
      } catch (error) {
        console.error('Error creating FAQ:', error);
        toast({
          title: "Error",
          description: "Failed to create FAQ",
          variant: "destructive",
        });
        throw error;
      }
    };

    const updateFAQ = async (id: string, updates: Partial<Omit<FAQ, 'id' | 'created_at'>>) => {
      try {
        const updateData: FAQUpdate = {
          ...updates,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('faqs')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setFAQs(prev => prev.map(faq => faq.id === id ? data as FAQ : faq));
        toast({
          title: "Success",
          description: "FAQ updated successfully",
        });
        return data as FAQ;
      } catch (error) {
        console.error('Error updating FAQ:', error);
        toast({
          title: "Error",
          description: "Failed to update FAQ",
          variant: "destructive",
        });
        throw error;
      }
    };

    const deleteFAQ = async (id: string) => {
      try {
        const { error } = await supabase
          .from('faqs')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setFAQs(prev => prev.filter(faq => faq.id !== id));
        toast({
          title: "Success",
          description: "FAQ deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting FAQ:', error);
        toast({
          title: "Error",
          description: "Failed to delete FAQ",
          variant: "destructive",
        });
        throw error;
      }
    };

    return { faqs, loading, createFAQ, updateFAQ, deleteFAQ, refetch: fetchFAQs };
  };

  // Website Settings
  const useWebsiteSettings = () => {
    const [settings, setSettings] = useState<WebsiteSetting[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchSettings();
    }, []);

    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('website_settings')
          .select('*');

        if (error) throw error;
        setSettings((data as WebsiteSetting[]) || []);
      } catch (error) {
        console.error('Error fetching website settings:', error);
        toast({
          title: "Error",
          description: "Failed to fetch website settings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const updateSetting = async (key: string, value: any, type: string = 'general') => {
      try {
        const { data, error } = await supabase
          .from('website_settings')
          .upsert({
            setting_key: key,
            setting_value: value,
            setting_type: type,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;
        setSettings(prev => {
          const existing = prev.find(s => s.setting_key === key);
          if (existing) {
            return prev.map(s => s.setting_key === key ? data as WebsiteSetting : s);
          } else {
            return [...prev, data as WebsiteSetting];
          }
        });
        toast({
          title: "Success",
          description: "Setting updated successfully",
        });
        return data as WebsiteSetting;
      } catch (error) {
        console.error('Error updating setting:', error);
        toast({
          title: "Error",
          description: "Failed to update setting",
          variant: "destructive",
        });
        throw error;
      }
    };

    const getSetting = (key: string) => {
      return settings.find(s => s.setting_key === key)?.setting_value;
    };

    return { settings, loading, updateSetting, getSetting, refetch: fetchSettings };
  };

  // Leads
  const useLeads = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchLeads();
    }, []);

    const fetchLeads = async () => {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setLeads((data as Lead[]) || []);
      } catch (error) {
        console.error('Error fetching leads:', error);
        toast({
          title: "Error",
          description: "Failed to fetch leads",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const createLead = async (lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        const insertData: LeadInsert = {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          company: lead.company,
          source: lead.source,
          status: lead.status,
          notes: lead.notes,
          lead_data: lead.lead_data,
          assigned_to: lead.assigned_to
        };

        const { data, error } = await supabase
          .from('leads')
          .insert(insertData)
          .select()
          .single();

        if (error) throw error;
        setLeads(prev => [data as Lead, ...prev]);
        toast({
          title: "Success",
          description: "Lead created successfully",
        });
        return data as Lead;
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

    const updateLead = async (id: string, updates: Partial<Omit<Lead, 'id' | 'created_at'>>) => {
      try {
        const updateData: LeadUpdate = {
          ...updates,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('leads')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setLeads(prev => prev.map(lead => lead.id === id ? data as Lead : lead));
        toast({
          title: "Success",
          description: "Lead updated successfully",
        });
        return data as Lead;
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
        const { error } = await supabase
          .from('leads')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setLeads(prev => prev.filter(lead => lead.id !== id));
        toast({
          title: "Success",
          description: "Lead deleted successfully",
        });
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

    return { leads, loading, createLead, updateLead, deleteLead, refetch: fetchLeads };
  };

  // Service Case Studies
  const useServiceCaseStudies = () => {
    const [caseStudies, setCaseStudies] = useState<ServiceCaseStudy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchCaseStudies();
    }, []);

    const fetchCaseStudies = async () => {
      try {
        const { data, error } = await supabase
          .from('service_case_studies')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setCaseStudies((data as ServiceCaseStudy[]) || []);
      } catch (error) {
        console.error('Error fetching case studies:', error);
        toast({
          title: "Error",
          description: "Failed to fetch case studies",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const createCaseStudy = async (caseStudy: Omit<ServiceCaseStudy, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        const { data, error } = await supabase
          .from('service_case_studies')
          .insert(caseStudy)
          .select()
          .single();

        if (error) throw error;
        setCaseStudies(prev => [...prev, data as ServiceCaseStudy].sort((a, b) => a.sort_order - b.sort_order));
        toast({
          title: "Success",
          description: "Case study created successfully",
        });
        return data as ServiceCaseStudy;
      } catch (error) {
        console.error('Error creating case study:', error);
        toast({
          title: "Error",
          description: "Failed to create case study",
          variant: "destructive",
        });
        throw error;
      }
    };

    const updateCaseStudy = async (id: string, updates: Partial<Omit<ServiceCaseStudy, 'id' | 'created_at'>>) => {
      try {
        const updateData = {
          ...updates,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('service_case_studies')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setCaseStudies(prev => prev.map(study => study.id === id ? data as ServiceCaseStudy : study));
        toast({
          title: "Success",
          description: "Case study updated successfully",
        });
        return data as ServiceCaseStudy;
      } catch (error) {
        console.error('Error updating case study:', error);
        toast({
          title: "Error",
          description: "Failed to update case study",
          variant: "destructive",
        });
        throw error;
      }
    };

    const deleteCaseStudy = async (id: string) => {
      try {
        const { error } = await supabase
          .from('service_case_studies')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setCaseStudies(prev => prev.filter(study => study.id !== id));
        toast({
          title: "Success",
          description: "Case study deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting case study:', error);
        toast({
          title: "Error",
          description: "Failed to delete case study",
          variant: "destructive",
        });
        throw error;
      }
    };

    return { caseStudies, loading, createCaseStudy, updateCaseStudy, deleteCaseStudy, refetch: fetchCaseStudies };
  };

  // Service Stats
  const useServiceStats = () => {
    const [stats, setStats] = useState<ServiceStat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchStats();
    }, []);

    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('service_stats')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setStats((data as ServiceStat[]) || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast({
          title: "Error",
          description: "Failed to fetch stats",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const createStat = async (stat: Omit<ServiceStat, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        const { data, error } = await supabase
          .from('service_stats')
          .insert(stat)
          .select()
          .single();

        if (error) throw error;
        setStats(prev => [...prev, data as ServiceStat].sort((a, b) => a.sort_order - b.sort_order));
        toast({
          title: "Success",
          description: "Stat created successfully",
        });
        return data as ServiceStat;
      } catch (error) {
        console.error('Error creating stat:', error);
        toast({
          title: "Error",
          description: "Failed to create stat",
          variant: "destructive",
        });
        throw error;
      }
    };

    const updateStat = async (id: string, updates: Partial<Omit<ServiceStat, 'id' | 'created_at'>>) => {
      try {
        const updateData = {
          ...updates,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('service_stats')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setStats(prev => prev.map(stat => stat.id === id ? data as ServiceStat : stat));
        toast({
          title: "Success",
          description: "Stat updated successfully",
        });
        return data as ServiceStat;
      } catch (error) {
        console.error('Error updating stat:', error);
        toast({
          title: "Error",
          description: "Failed to update stat",
          variant: "destructive",
        });
        throw error;
      }
    };

    const deleteStat = async (id: string) => {
      try {
        const { error } = await supabase
          .from('service_stats')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setStats(prev => prev.filter(stat => stat.id !== id));
        toast({
          title: "Success",
          description: "Stat deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting stat:', error);
        toast({
          title: "Error",
          description: "Failed to delete stat",
          variant: "destructive",
        });
        throw error;
      }
    };

    return { stats, loading, createStat, updateStat, deleteStat, refetch: fetchStats };
  };

  // Service Reviews
  const useServiceReviews = () => {
    const [reviews, setReviews] = useState<ServiceReview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchReviews();
    }, []);

    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('service_reviews')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setReviews((data as ServiceReview[]) || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast({
          title: "Error",
          description: "Failed to fetch reviews",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const createReview = async (review: Omit<ServiceReview, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        const { data, error } = await supabase
          .from('service_reviews')
          .insert(review)
          .select()
          .single();

        if (error) throw error;
        setReviews(prev => [...prev, data as ServiceReview].sort((a, b) => a.sort_order - b.sort_order));
        toast({
          title: "Success",
          description: "Review created successfully",
        });
        return data as ServiceReview;
      } catch (error) {
        console.error('Error creating review:', error);
        toast({
          title: "Error",
          description: "Failed to create review",
          variant: "destructive",
        });
        throw error;
      }
    };

    const updateReview = async (id: string, updates: Partial<Omit<ServiceReview, 'id' | 'created_at'>>) => {
      try {
        const updateData = {
          ...updates,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('service_reviews')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setReviews(prev => prev.map(review => review.id === id ? data as ServiceReview : review));
        toast({
          title: "Success",
          description: "Review updated successfully",
        });
        return data as ServiceReview;
      } catch (error) {
        console.error('Error updating review:', error);
        toast({
          title: "Error",
          description: "Failed to update review",
          variant: "destructive",
        });
        throw error;
      }
    };

    const deleteReview = async (id: string) => {
      try {
        const { error } = await supabase
          .from('service_reviews')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setReviews(prev => prev.filter(review => review.id !== id));
        toast({
          title: "Success",
          description: "Review deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting review:', error);
        toast({
          title: "Error",
          description: "Failed to delete review",
          variant: "destructive",
        });
        throw error;
      }
    };

    return { reviews, loading, createReview, updateReview, deleteReview, refetch: fetchReviews };
  };

  return {
    useBlogPosts,
    usePricingPlans,
    useFAQs,
    useWebsiteSettings,
    useLeads,
    useServiceCaseStudies,
    useServiceStats,
    useServiceReviews
  };
};

export default useSupabaseData;
