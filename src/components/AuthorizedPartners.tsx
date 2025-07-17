
import { useState, useEffect } from "react";
import "./ScrollingLogos.css";

interface PartnerImage {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
}

interface PartnerSettings {
  logoSize: number;
  sectionHeight: number;
}

const AuthorizedPartners = () => {
  const [partnerImages, setPartnerImages] = useState<PartnerImage[]>([]);
  const [settings, setSettings] = useState<PartnerSettings>({
    logoSize: 16,
    sectionHeight: 6
  });

  const getDefaultPartners = (): PartnerImage[] => [
    {
      id: "partner-1",
      name: "TechPartner",
      imageUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "partner-2", 
      name: "InnovatePartner",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "partner-3",
      name: "GlobalPartner",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "partner-4",
      name: "FuturePartner",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "partner-5",
      name: "BusinessPartner",
      imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "partner-6",
      name: "ProPartner",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop&crop=center",
      isActive: true
    }
  ];

  useEffect(() => {
    const loadPartnerImages = () => {
      const savedPartners = localStorage.getItem('partnerImages');
      if (savedPartners) {
        try {
          const parsed = JSON.parse(savedPartners);
          setPartnerImages(parsed.filter((partner: PartnerImage) => partner.isActive));
        } catch (error) {
          console.error('Failed to parse partner images:', error);
          const defaultPartners = getDefaultPartners();
          setPartnerImages(defaultPartners.filter(partner => partner.isActive));
        }
      } else {
        const defaultPartners = getDefaultPartners();
        setPartnerImages(defaultPartners.filter(partner => partner.isActive));
      }
    };

    const loadSettings = () => {
      const savedSettings = localStorage.getItem('partnerSettings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSettings(parsed);
        } catch (error) {
          console.error('Failed to parse partner settings:', error);
        }
      }
    };

    loadPartnerImages();
    loadSettings();

    const handlePartnerImagesUpdate = () => {
      loadPartnerImages();
    };

    const handleSettingsUpdate = (event: CustomEvent) => {
      setSettings(event.detail);
    };

    window.addEventListener('partnerImagesUpdated', handlePartnerImagesUpdate);
    window.addEventListener('partnerSettingsUpdated', handleSettingsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('partnerImagesUpdated', handlePartnerImagesUpdate);
      window.removeEventListener('partnerSettingsUpdated', handleSettingsUpdate as EventListener);
    };
  }, []);

  if (partnerImages.length === 0) return null;

  const logoHeight = `h-${settings.logoSize}`;
  const sectionPadding = `py-${settings.sectionHeight}`;

  return (
    <section className={`${sectionPadding} bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2">Authorized Partners</h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left">
            <div className="flex items-center justify-center gap-16 min-w-max">
              {[...partnerImages, ...partnerImages].map((partner, index) => (
                <div key={`${partner.id}-${index}`} className="flex-shrink-0 group">
                  <div className="relative p-6 transition-all duration-500 hover:scale-110">
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className={`${logoHeight} w-auto max-w-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-500 filter brightness-0 invert`}
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
