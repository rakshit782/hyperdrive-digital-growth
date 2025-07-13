
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ClienteleLogo {
  id: string;
  name: string;
  image_url: string;
  is_active: boolean;
  sort_order?: number;
}

const Clientele = () => {
  const [clienteleLogos, setClienteleLogos] = useState<ClienteleLogo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClienteleLogos = async () => {
    try {
      const { data, error } = await supabase
        .from('clientele_logos')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setClienteleLogos(data || []);
    } catch (error) {
      console.error('Error fetching clientele logos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClienteleLogos();

    // Listen for real-time updates
    const channel = supabase
      .channel('clientele-logos-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'clientele_logos' 
        }, 
        () => {
          fetchClienteleLogos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (clienteleLogos.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Leading Brands
          </h2>
          <p className="text-lg text-gray-600">
            Join hundreds of successful businesses that have transformed their advertising results
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clienteleLogos.map((logo) => (
            <div 
              key={logo.id}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={logo.image_url}
                alt={logo.name}
                className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
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

export default Clientele;
