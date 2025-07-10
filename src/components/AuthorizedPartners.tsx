
import { useState, useEffect } from "react";

interface PartnerImage {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
}

const AuthorizedPartners = () => {
  const [partnerImages, setPartnerImages] = useState<PartnerImage[]>([]);

  useEffect(() => {
    const loadPartnerImages = () => {
      const savedPartners = localStorage.getItem('partnerImages');
      if (savedPartners) {
        try {
          const parsed = JSON.parse(savedPartners);
          setPartnerImages(parsed.filter((partner: PartnerImage) => partner.isActive));
        } catch (error) {
          console.error('Failed to parse partner images:', error);
        }
      }
    };

    loadPartnerImages();

    const handlePartnerImagesUpdate = () => {
      loadPartnerImages();
    };

    window.addEventListener('partnerImagesUpdated', handlePartnerImagesUpdate);
    
    return () => {
      window.removeEventListener('partnerImagesUpdated', handlePartnerImagesUpdate);
    };
  }, []);

  if (partnerImages.length === 0) return null;

  return (
    <section className="py-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2">Authorized Partners</h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left">
            <div className="flex items-center justify-center gap-12 min-w-max">
              {[...partnerImages, ...partnerImages].map((partner, index) => (
                <div key={`${partner.id}-${index}`} className="flex-shrink-0 group">
                  <div className="relative p-4 transition-all duration-300 hover:scale-105">
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="h-16 w-auto max-w-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 filter brightness-0 invert"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyNEg4MFYzNkg0MFYyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorizedPartners;
