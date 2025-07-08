
import { ServiceCard, Review } from "@/types/dashboard";

export const isValidData = (data: any, type: 'services' | 'reviews'): boolean => {
  if (!Array.isArray(data) || data.length === 0) return false;
  
  if (type === 'services') {
    return data.every(item => 
      item.id && item.title && item.description && Array.isArray(item.features)
    );
  } else {
    return data.every(item => 
      item.id && item.name && item.company && typeof item.rating === 'number'
    );
  }
};

export const dispatchDataUpdate = (type: 'services' | 'reviews', data: ServiceCard[] | Review[]) => {
  const eventName = type === 'services' ? 'servicesUpdated' : 'reviewsUpdated';
  window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
};
