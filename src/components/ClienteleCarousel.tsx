import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";

interface ClienteleLogo {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
}

const ClienteleCarousel = () => {
  const [clienteleLogos, setClienteleLogos] = useState<ClienteleLogo[]>([]);

  // Default clientele logos
  const getDefaultClientele = (): ClienteleLogo[] => [
    {
      id: "client-1",
      name: "TechCorp",
      imageUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "client-2", 
      name: "InnovateLabs",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "client-3",
      name: "GlobalSolutions",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "client-4",
      name: "FutureTech",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "client-5",
      name: "StartupHub",
      imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "client-6",
      name: "BusinessPro",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop&crop=center",
      isActive: true
    }
  ];

  useEffect(() => {
    const loadClienteleLogos = () => {
      const savedClientele = localStorage.getItem('clienteleLogos');
      if (savedClientele) {
        try {
          const parsed = JSON.parse(savedClientele);
          setClienteleLogos(parsed.filter((logo: ClienteleLogo) => logo.isActive));
        } catch (error) {
          console.error('Failed to parse clientele logos:', error);
          const defaultLogos = getDefaultClientele();
          setClienteleLogos(defaultLogos);
          localStorage.setItem('clienteleLogos', JSON.stringify(defaultLogos));
        }
      } else {
        const defaultLogos = getDefaultClientele();
        setClienteleLogos(defaultLogos);
        localStorage.setItem('clienteleLogos', JSON.stringify(defaultLogos));
      }
    };

    loadClienteleLogos();

    const handleClienteleUpdate = () => {
      loadClienteleLogos();
    };

    window.addEventListener('clienteleLogosUpdated', handleClienteleUpdate);
    
    return () => {
      window.removeEventListener('clienteleLogosUpdated', handleClienteleUpdate);
    };
  }, []);

  if (clienteleLogos.length === 0) return null;

  return (
    <section className="py-6 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">Trusted by Leading Brands</h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              AutoPlay({
                delay: 2000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              })
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-3">
              {clienteleLogos.map((logo) => (
                <CarouselItem key={logo.id} className="pl-2 md:pl-3 basis-1/2 md:basis-1/4 lg:basis-1/5">
                  <div className="group relative">
                    <div className="flex items-center justify-center p-4 transition-all duration-300 hover:-translate-y-1">
                      <img
                        src={logo.imageUrl}
                        alt={logo.name}
                        className="h-16 w-auto max-w-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAzMkg4MFY0OEg0MFYzMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                        }}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ClienteleCarousel;
