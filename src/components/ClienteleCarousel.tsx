
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of successful brands who trust us with their advertising success
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {clienteleLogos.map((logo) => (
                <CarouselItem key={logo.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <img
                      src={logo.imageUrl}
                      alt={logo.name}
                      className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-200"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAzMkg4MFY0OEg0MFYzMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ClienteleCarousel;
