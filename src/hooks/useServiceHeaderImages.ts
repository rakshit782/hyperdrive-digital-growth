
import { useState, useEffect } from "react";

interface ServiceHeaderImage {
  serviceKey: string;
  serviceName: string;
  imageUrl: string;
  altText: string;
}

const defaultImages: ServiceHeaderImage[] = [
  {
    serviceKey: "amazon-advertising",
    serviceName: "Amazon Advertising",
    imageUrl: "https://images.unsplash.com/photo-1523474438810-b04a6f72e20f?w=600&h=400&fit=crop&crop=center",
    altText: "Amazon Packages and Logistics"
  },
  {
    serviceKey: "walmart-advertising", 
    serviceName: "Walmart Advertising",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
    altText: "Walmart Store and Shopping Experience"
  },
  {
    serviceKey: "google-advertising",
    serviceName: "Google Advertising", 
    imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop&crop=center",
    altText: "Google Search and Digital Marketing"
  },
  {
    serviceKey: "meta-advertising",
    serviceName: "Meta Advertising",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop&crop=center", 
    altText: "Social Media Marketing and Meta Platforms"
  },
  {
    serviceKey: "website-development",
    serviceName: "Website Development",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=center",
    altText: "Web Development and Programming"
  },
  {
    serviceKey: "account-management",
    serviceName: "Account Management", 
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center",
    altText: "Professional Account Management Services"
  },
  {
    serviceKey: "shopify-development",
    serviceName: "Shopify Development",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
    altText: "E-commerce and Shopify Development"
  },
  {
    serviceKey: "shopify-integration", 
    serviceName: "Shopify Integration",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center",
    altText: "Shopify Integration and Platform Connections"
  }
];

export const useServiceHeaderImages = (serviceKey: string) => {
  const [headerImage, setHeaderImage] = useState<ServiceHeaderImage | null>(null);

  useEffect(() => {
    loadServiceImage();
    
    // Listen for updates from dashboard
    const handleUpdate = (event: CustomEvent) => {
      const updatedImages = event.detail as ServiceHeaderImage[];
      const serviceImage = updatedImages.find(img => img.serviceKey === serviceKey);
      if (serviceImage) {
        setHeaderImage(serviceImage);
      }
    };

    window.addEventListener('serviceHeaderImagesUpdated', handleUpdate as EventListener);
    
    return () => {
      window.removeEventListener('serviceHeaderImagesUpdated', handleUpdate as EventListener);
    };
  }, [serviceKey]);

  const loadServiceImage = () => {
    const savedImages = localStorage.getItem('serviceHeaderImages');
    let images = defaultImages;
    
    if (savedImages) {
      try {
        images = JSON.parse(savedImages);
      } catch (error) {
        console.error('Failed to parse service header images:', error);
      }
    }
    
    const serviceImage = images.find(img => img.serviceKey === serviceKey);
    if (serviceImage) {
      setHeaderImage(serviceImage);
    } else {
      // Fallback to default image for the service
      const defaultImage = defaultImages.find(img => img.serviceKey === serviceKey);
      setHeaderImage(defaultImage || null);
    }
  };

  return {
    headerImage,
    imageUrl: headerImage?.imageUrl || "",
    altText: headerImage?.altText || ""
  };
};
