
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
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authorized Partners</h2>
          <p className="text-gray-600">Trusted by leading platforms and brands</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto">
          {partnerImages.map((partner) => (
            <div key={partner.id} className="flex-shrink-0">
              <img
                src={partner.imageUrl}
                alt={partner.name}
                className="h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyNEg4MFYzNkg0MFYyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
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
