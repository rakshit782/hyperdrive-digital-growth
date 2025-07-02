
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
    <section className="py-6 bg-slate-900 border-b border-slate-700">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <h3 className="text-sm font-medium text-white mb-1">Authorized Partners</h3>
          <p className="text-slate-400 text-xs">Certified partnerships with leading platforms</p>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex justify-center items-center gap-4 min-w-max px-4">
            {partnerImages.map((partner) => (
              <div key={partner.id} className="flex-shrink-0 group">
                <div className="relative p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <img
                    src={partner.imageUrl}
                    alt={partner.name}
                    className="h-6 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200 filter brightness-0 invert"
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
    </section>
  );
};

export default AuthorizedPartners;
