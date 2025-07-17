
import { useState, useEffect } from "react";
import { ServiceCard, Review } from "@/types/dashboard";
import { defaultServices, defaultReviews } from "@/data/defaultData";
import { isValidData, dispatchDataUpdate } from "@/utils/dashboardUtils";

export const useDashboardData = () => {
  const [services, setServices] = useState<ServiceCard[]>(defaultServices);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initializeData = async () => {
    try {
      console.log("Dashboard: Initializing data...");
      setLoading(true);
      setError(null);
      
      const savedServices = localStorage.getItem('servicesData');
      const savedReviews = localStorage.getItem('reviewsData');
      
      let servicesData = defaultServices;
      let reviewsData = defaultReviews;
      
      // Validate and load services
      if (savedServices) {
        try {
          const parsedServices = JSON.parse(savedServices);
          if (isValidData(parsedServices, 'services') && Array.isArray(parsedServices)) {
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
          if (isValidData(parsedReviews, 'reviews') && Array.isArray(parsedReviews)) {
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
      
    } catch (error) {
      console.error("Dashboard: Error during initialization:", error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateServices = async (newServices: ServiceCard[]) => {
    try {
      console.log("Dashboard: Updating services", newServices.length);
      setServices(newServices);
      localStorage.setItem('servicesData', JSON.stringify(newServices));
      dispatchDataUpdate('services', newServices);
    } catch (error) {
      console.error("Dashboard: Error updating services:", error);
      setError(error instanceof Error ? error.message : 'Failed to update services');
    }
  };

  const updateReviews = async (newReviews: Review[]) => {
    try {
      console.log("Dashboard: Updating reviews", newReviews.length);
      setReviews(newReviews);
      localStorage.setItem('reviewsData', JSON.stringify(newReviews));
      dispatchDataUpdate('reviews', newReviews);
    } catch (error) {
      console.error("Dashboard: Error updating reviews:", error);
      setError(error instanceof Error ? error.message : 'Failed to update reviews');
    }
  };

  const refreshData = () => {
    initializeData();
  };

  useEffect(() => {
    initializeData();
  }, []);

  return {
    services,
    reviews,
    loading,
    error,
    updateServices,
    updateReviews,
    refreshData,
  };
};
