import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
  sortOrder?: number;
  category?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    id: "1",
    question: "How quickly can I see results from your advertising campaigns?",
    answer: "Most clients see initial improvements within 2-4 weeks, with significant results typically visible within 60-90 days. However, timelines can vary based on your current account status, competition, and budget.",
    isActive: true
  },
  {
    id: "2", 
    question: "What makes your agency different from others?",
    answer: "We specialize exclusively in e-commerce advertising with a data-driven approach. Our team has managed over $50M in ad spend and focuses on profitable growth, not just traffic. We provide transparent reporting and dedicated account management.",
    isActive: true
  },
  {
    id: "3",
    question: "Do you guarantee results?", 
    answer: "While we can't guarantee specific numbers due to market variables, we do guarantee our commitment to improving your performance. If you're not satisfied with our service within the first 60 days, we'll work with you to make it right.",
    isActive: true
  },
  {
    id: "4",
    question: "What platforms do you manage advertising on?",
    answer: "We manage advertising campaigns on Amazon, Walmart, Meta (Facebook & Instagram), and provide Shopify integration and development services. Our expertise spans the entire e-commerce advertising ecosystem.",
    isActive: true
  },
  {
    id: "5",
    question: "How much do your services cost?",
    answer: "Our pricing is customized based on your needs and ad spend. We offer both percentage-based and flat fee structures. Contact us for a free consultation to discuss pricing that fits your budget and goals.",
    isActive: true
  },
  {
    id: "6",
    question: "Do you work with businesses of all sizes?",
    answer: "Yes! We work with startups, growing businesses, and established brands. Our strategies are scalable and customized to your business size, goals, and budget.",
    isActive: true
  }
];

export const useFAQData = () => {
  const [faqs, setFAQs] = useState<FAQItem[]>(defaultFAQs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        // Try to load from Supabase first
        const { data: supabaseFAQs, error } = await supabase
          .from('faqs')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (!error && supabaseFAQs && supabaseFAQs.length > 0) {
          // Convert Supabase FAQs to our format
          const convertedFAQs = supabaseFAQs.map(faq => ({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
            isActive: faq.is_active || true,
            sortOrder: faq.sort_order || 0,
            category: faq.category
          }));
          
          setFAQs(convertedFAQs);
        } else {
          // Fallback to localStorage
          const savedFAQs = localStorage.getItem('faqData');
          if (savedFAQs) {
            try {
              const parsedData = JSON.parse(savedFAQs);
              if (Array.isArray(parsedData) && parsedData.length > 0) {
                setFAQs(parsedData.filter((faq: FAQItem) => faq.isActive));
              } else {
                setFAQs(defaultFAQs);
              }
            } catch (parseError) {
              console.error('Failed to parse localStorage FAQs:', parseError);
              setFAQs(defaultFAQs);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load FAQs:', error);
        // Final fallback to localStorage
        try {
          const savedFAQs = localStorage.getItem('faqData');
          if (savedFAQs) {
            const parsedData = JSON.parse(savedFAQs);
            if (Array.isArray(parsedData) && parsedData.length > 0) {
              setFAQs(parsedData.filter((faq: FAQItem) => faq.isActive));
            } else {
              setFAQs(defaultFAQs);
            }
          } else {
            setFAQs(defaultFAQs);
          }
        } catch (localError) {
          console.error('Failed to load from localStorage:', localError);
          setFAQs(defaultFAQs);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Load initial FAQs
    loadFAQs();

    // Listen for real-time updates from Supabase
    const channel = supabase
      .channel(`faq-updates-${Date.now()}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'faqs'
        },
        (payload) => {
          console.log('Real-time FAQ update:', payload);
          loadFAQs(); // Reload FAQs on any change
        }
      )
      .subscribe();

    // Listen for updates from dashboard
    const handleFAQUpdate = (event: CustomEvent) => {
      if (event.detail && Array.isArray(event.detail)) {
        setFAQs(event.detail.filter((faq: FAQItem) => faq.isActive));
      }
    };

    window.addEventListener('faqUpdated', handleFAQUpdate as EventListener);

    return () => {
      channel.unsubscribe();
      window.removeEventListener('faqUpdated', handleFAQUpdate as EventListener);
    };
  }, []);

  return { faqs, isLoading };
};