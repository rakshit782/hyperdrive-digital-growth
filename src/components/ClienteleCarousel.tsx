
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import { useSupabaseClientele } from "@/hooks/useSupabaseClientele";

const ClienteleCarousel = () => {
  const { clienteleLogos, settings, loading } = useSupabaseClientele();

  if (loading || clienteleLogos.length === 0) return null;

  const sectionPadding = `py-${settings.sectionHeight}`;

  return (
    <section className={`${sectionPadding} bg-slate-50 dark:bg-slate-800`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-3">
            Trusted by Leading Brands
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              duration: 30,
              dragFree: true,
            }}
            plugins={[
              AutoPlay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                playOnInit: true,
              })
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-3">
              {clienteleLogos.map((logo) => (
                <CarouselItem key={logo.id} className="pl-2 md:pl-3 basis-1/2 md:basis-1/4 lg:basis-1/5">
                  <div className="group relative">
                    <div className="flex items-center justify-center p-6 transition-all duration-500 hover:-translate-y-2">
                      <img
                        src={logo.image_url}
                        alt={logo.name}
                        className="h-16 w-auto max-w-[140px] object-contain opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                        style={{ height: '64px', width: 'auto' }}
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgMTQwIDY0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCAyOEg5MFY0MEg1MFYyOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
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
