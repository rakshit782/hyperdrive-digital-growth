import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CTAData {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  showSecondaryButton: boolean;
  backgroundStyle: string;
}

const defaultCTAData: CTAData = {
  title: "Ready to Scale Your Business?",
  subtitle: "Get Your Free Strategy Session Today",
  description: "Join hundreds of successful e-commerce businesses that have transformed their advertising results with our expert team. Let's discuss how we can help you achieve your growth goals.",
  primaryButtonText: "Get Free Strategy Call",
  primaryButtonLink: "/free-audit",
  secondaryButtonText: "View Case Studies",
  secondaryButtonLink: "/case-studies",
  showSecondaryButton: true,
  backgroundStyle: "gradient"
};

export const useCTAData = () => {
  const [ctaData, setCTAData] = useState<CTAData>(defaultCTAData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCTAData = async () => {
      try {
        // Try to load from Supabase first
        const { data: supabaseCTA, error } = await supabase
          .from('website_settings')
          .select('*')
          .like('setting_key', 'cta_%');

        if (!error && supabaseCTA && supabaseCTA.length > 0) {
          // Convert Supabase settings to our format
          const ctaSettings = supabaseCTA.reduce((acc, setting) => {
            const key = setting.setting_key.replace('cta_', '');
            acc[key] = setting.setting_value;
            return acc;
          }, {} as any);
          
          setCTAData({ ...defaultCTAData, ...ctaSettings });
        } else {
          // Fallback to localStorage
          const savedCTA = localStorage.getItem('ctaData');
          if (savedCTA) {
            try {
              const parsedData = JSON.parse(savedCTA);
              if (parsedData && typeof parsedData === 'object') {
                setCTAData({ ...defaultCTAData, ...parsedData });
              } else {
                setCTAData(defaultCTAData);
              }
            } catch (parseError) {
              console.error('Failed to parse localStorage CTA:', parseError);
              setCTAData(defaultCTAData);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load CTA data:', error);
        // Final fallback to localStorage
        try {
          const savedCTA = localStorage.getItem('ctaData');
          if (savedCTA) {
            const parsedData = JSON.parse(savedCTA);
            if (parsedData && typeof parsedData === 'object') {
              setCTAData({ ...defaultCTAData, ...parsedData });
            } else {
              setCTAData(defaultCTAData);
            }
          } else {
            setCTAData(defaultCTAData);
          }
        } catch (localError) {
          console.error('Failed to load from localStorage:', localError);
          setCTAData(defaultCTAData);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Load initial CTA data
    loadCTAData();

    // Listen for real-time updates from Supabase
    const channel = supabase
      .channel(`cta-updates-${Date.now()}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_settings'
        },
        (payload) => {
          if (payload.new && typeof payload.new === 'object' && 'setting_key' in payload.new) {
            const settingKey = payload.new.setting_key;
            if (typeof settingKey === 'string' && settingKey.startsWith('cta_')) {
              console.log('Real-time CTA update:', payload);
              loadCTAData(); // Reload CTA data on any change
            }
          }
        }
      )
      .subscribe();

    // Listen for updates from dashboard
    const handleCTAUpdate = (event: CustomEvent) => {
      if (event.detail && typeof event.detail === 'object') {
        setCTAData({ ...defaultCTAData, ...event.detail });
      }
    };

    window.addEventListener('ctaUpdated', handleCTAUpdate as EventListener);

    return () => {
      channel.unsubscribe();
      window.removeEventListener('ctaUpdated', handleCTAUpdate as EventListener);
    };
  }, []);

  return { ctaData, isLoading };
};