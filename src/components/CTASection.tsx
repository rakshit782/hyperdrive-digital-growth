
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CTAData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  show_secondary_button: boolean;
  background_style: string;
  is_active: boolean;
}

const CTASection = () => {
  const [ctaData, setCTAData] = useState<CTAData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCTAData = async () => {
    try {
      const { data, error } = await supabase
        .from('cta_data')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setCTAData(data);
    } catch (error) {
      console.error('Error fetching CTA data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCTAData();

    // Create a unique channel name to avoid conflicts
    const channelName = `cta-data-${Math.random().toString(36).substr(2, 9)}`;
    
    // Listen for real-time updates
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'cta_data' 
        }, 
        () => {
          fetchCTAData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  const defaultCTA = {
    title: 'Ready to Scale Your Business?',
    subtitle: 'Get Your Free Strategy Session Today',
    description: 'Join hundreds of successful e-commerce businesses that have transformed their advertising results with our expert team. Let\'s discuss how we can help you achieve your growth goals.',
    primary_button_text: 'Get Free Strategy Call',
    primary_button_link: '/free-audit',
    secondary_button_text: 'View Case Studies',
    secondary_button_link: '/case-studies',
    show_secondary_button: true,
    background_style: 'gradient'
  };

  const cta = ctaData || defaultCTA;

  const backgroundClass = cta.background_style === 'gradient' 
    ? 'bg-gradient-to-r from-blue-600 to-indigo-700'
    : 'bg-slate-900';

  return (
    <section className={`py-20 ${backgroundClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {cta.title}
          </h2>
          <p className="text-xl md:text-2xl font-light mb-6 text-blue-100">
            {cta.subtitle}
          </p>
          <p className="text-lg mb-8 text-blue-50 max-w-3xl mx-auto leading-relaxed">
            {cta.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => window.location.href = cta.primary_button_link}
            >
              {cta.primary_button_text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            {cta.show_secondary_button && cta.secondary_button_text && (
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.href = cta.secondary_button_link || '#'}
              >
                <Play className="mr-2 h-5 w-5" />
                {cta.secondary_button_text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
