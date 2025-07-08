import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
  companyName?: string;
  socialLinks?: Record<string, string>;
  businessHours?: Record<string, string>;
}

const defaultContactInfo: ContactInfo = {
  phone: "+1 (555) 123-4567",
  email: "hello@adrevenueboost.com",
  address: "123 Business Ave, Suite 100, City, State 12345",
  hours: "Monday - Friday: 9AM - 6PM EST"
};

export const useContactData = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        // Try to load from Supabase first
        const { data: supabaseContact, error } = await supabase
          .from('contact_info')
          .select('*')
          .limit(1)
          .single();

        if (!error && supabaseContact) {
          // Convert Supabase contact to our format
          const businessHours = supabaseContact.business_hours as any;
          const convertedContact: ContactInfo = {
            phone: supabaseContact.phone || defaultContactInfo.phone,
            email: supabaseContact.email || defaultContactInfo.email,
            address: supabaseContact.address || defaultContactInfo.address,
            hours: (businessHours && typeof businessHours === 'object' && businessHours.hours) || defaultContactInfo.hours,
            companyName: supabaseContact.company_name,
            socialLinks: supabaseContact.social_links as Record<string, string> || {},
            businessHours: supabaseContact.business_hours as Record<string, string> || {}
          };
          
          setContactInfo(convertedContact);
        } else {
          // Fallback to localStorage
          const savedContact = localStorage.getItem('contactData');
          if (savedContact) {
            try {
              const parsed = JSON.parse(savedContact);
              setContactInfo({ ...defaultContactInfo, ...parsed });
            } catch (parseError) {
              console.error('Failed to parse localStorage contact:', parseError);
              setContactInfo(defaultContactInfo);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load contact info:', error);
        // Final fallback to localStorage
        try {
          const savedContact = localStorage.getItem('contactData');
          if (savedContact) {
            const parsed = JSON.parse(savedContact);
            setContactInfo({ ...defaultContactInfo, ...parsed });
          } else {
            setContactInfo(defaultContactInfo);
          }
        } catch (localError) {
          console.error('Failed to load from localStorage:', localError);
          setContactInfo(defaultContactInfo);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Load initial contact info
    loadContactInfo();

    // Listen for real-time updates from Supabase
    const channel = supabase
      .channel(`contact-updates-${Date.now()}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_info'
        },
        (payload) => {
          console.log('Real-time contact update:', payload);
          loadContactInfo(); // Reload contact info on any change
        }
      )
      .subscribe();

    // Listen for updates from dashboard
    const handleContactUpdate = () => {
      loadContactInfo();
    };

    window.addEventListener('contactUpdated', handleContactUpdate);

    return () => {
      channel.unsubscribe();
      window.removeEventListener('contactUpdated', handleContactUpdate);
    };
  }, []);

  return { contactInfo, isLoading };
};