
import { useState, useEffect } from "react";
import { ServiceCard, Review } from "@/types/dashboard";
import { defaultServices, defaultReviews } from "@/data/defaultData";
import { isValidData, dispatchDataUpdate } from "@/utils/dashboardUtils";

export const useDashboardData = () => {
  const [services, setServices] = useState<ServiceCard[]>(defaultServices);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);

  const initializeData = () => {
    console.log("Dashboard: Initializing data...");
    
    const savedServices = localStorage.getItem('servicesData');
    const savedReviews = localStorage.getItem('reviewsData');
    
    let servicesData = defaultServices;
    let reviewsData = defaultReviews;
    
    // Validate and load services
    if (savedServices) {
      try {
        const parsedServices = JSON.parse(savedServices);
        if (isValidData(parsedServices, 'services') && parsedServices.length === 6) {
          servicesData = parsedServices;
          console.log("Dashboard: Loaded valid services from localStorage", parsedServices.length);
        } else {
          console.log("Dashboard: Invalid services data, using defaults");
        }
      } catch (error) {
        console.error("Dashboard: Failed to parse services data:", error);
      }
    }
    
    // Validate and load reviews
    if (savedReviews) {
      try {
        const parsedReviews = JSON.parse(savedReviews);
        if (isValidData(parsedReviews, 'reviews') && parsedReviews.length === 6) {
          reviewsData = parsedReviews;
          console.log("Dashboard: Loaded valid reviews from localStorage", parsedReviews.length);
        } else {
          console.log("Dashboard: Invalid reviews data, using defaults");
        }
      } catch (error) {
        console.error("Dashboard: Failed to parse reviews data:", error);
      }
    }
    
    // Force update localStorage with valid data
    localStorage.setItem('servicesData', JSON.stringify(servicesData));
    localStorage.setItem('reviewsData', JSON.stringify(reviewsData));
    
    // Update state
    setServices(servicesData);
    setReviews(reviewsData);
    
    // Dispatch events to notify frontend components
    console.log("Dashboard: Dispatching update events");
    dispatchDataUpdate('services', servicesData);
    dispatchDataUpdate('reviews', reviewsData);
    
    console.log("Dashboard: Initialization complete - Services:", servicesData.length, "Reviews:", reviewsData.length);
  };

  const updateServices = (newServices: ServiceCard[]) => {
    console.log("Dashboard: Updating services", newServices.length);
    setServices(newServices);
    localStorage.setItem('servicesData', JSON.stringify(newServices));
    dispatchDataUpdate('services', newServices);
  };

  const updateReviews = (newReviews: Review[]) => {
    console.log("Dashboard: Updating reviews", newReviews.length);
    setReviews(newReviews);
    localStorage.setItem('reviewsData', JSON.stringify(newReviews));
    dispatchDataUpdate('reviews', newReviews);
  };

  useEffect(() => {
    initializeData();
  }, []);

  return {
    services,
    reviews,
    updateServices,
    updateReviews,
  };
};
