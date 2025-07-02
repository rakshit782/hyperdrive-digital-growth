
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
    <section className="py-20 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0,0,0,0.03)_1px,transparent_0)] bg-[size:20px_20px]"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Trusted by Industry Leaders</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful brands who trust us with their advertising success and revenue growth
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {clienteleLogos.map((logo) => (
                <CarouselItem key={logo.id} className="pl-3 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <div className="group relative">
                    <div className="flex items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100/80 hover:shadow-xl hover:border-blue-200/50 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img
                        src={logo.imageUrl}
                        alt={logo.name}
                        className="h-14 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 relative z-10 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAzMkg4MFY0OEg0MFYzMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                        }}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-200" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-200" />
            </div>
          </Carousel>
        </div>
        
        {/* Trust indicator */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <div className="flex -space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
            </div>
            <span>500+ successful campaigns launched</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClienteleCarousel;
