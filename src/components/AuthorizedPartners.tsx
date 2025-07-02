
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
    <section className="py-8 bg-slate-900 border-b border-slate-700">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Authorized Partners</h3>
          <p className="text-slate-400 text-sm">Certified partnerships with leading platforms</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 max-w-5xl mx-auto">
          {partnerImages.map((partner) => (
            <div key={partner.id} className="flex-shrink-0 group">
              <div className="relative p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <img
                  src={partner.imageUrl}
                  alt={partner.name}
                  className="h-8 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200 filter brightness-0 invert"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyNEg4MFYzNkg0MFYyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorizedPartners;
