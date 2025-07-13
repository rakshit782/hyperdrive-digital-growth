
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PartnerImage {
  id: string;
  name: string;
  image_url: string;
  is_active: boolean;
  sort_order?: number;
}

const AuthorizedPartners = () => {
  const [partnerImages, setPartnerImages] = useState<PartnerImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPartnerImages = async () => {
    try {
      const { data, error } = await supabase
        .from('partner_images')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setPartnerImages(data || []);
    } catch (error) {
      console.error('Error fetching partner images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerImages();

    // Listen for real-time updates
    const channel = supabase
      .channel('partner-images-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'partner_images' 
        }, 
        () => {
          fetchPartnerImages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <section className="py-6 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (partnerImages.length === 0) {
    return null;
  }

  return (
    <section className="py-6 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-slate-400 text-sm font-medium tracking-wider uppercase">
            Authorized Partners
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-opacity duration-300">
          {partnerImages.map((partner) => (
            <div 
              key={partner.id}
              className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={partner.image_url}
                alt={partner.name}
                className="max-h-full max-w-full object-contain filter brightness-0 invert"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorizedPartners;
