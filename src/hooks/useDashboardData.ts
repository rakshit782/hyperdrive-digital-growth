
import { useState, useEffect, useCallback } from "react";
import { ServiceCard, Review } from "@/types/dashboard";
import { defaultServices, defaultReviews } from "@/data/defaultData";
import { isValidData, dispatchDataUpdate } from "@/utils/dashboardUtils";

export const useDashboardData = () => {
  const [services, setServices] = useState<ServiceCard[]>(defaultServices);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const initializeData = useCallback(async () => {
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
      setIsConnected(true);
      
      // Dispatch events to notify frontend components
      console.log("Dashboard: Dispatching update events");
      dispatchDataUpdate('services', servicesData);
      dispatchDataUpdate('reviews', reviewsData);
      
      console.log("Dashboard: Initialization complete - Services:", servicesData.length, "Reviews:", reviewsData.length);
      
    } catch (error) {
      console.error("Dashboard: Error during initialization:", error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateServices = useCallback(async (newServices: ServiceCard[]) => {
    try {
      console.log("Dashboard: Updating services", newServices.length);
      setServices(newServices);
      localStorage.setItem('servicesData', JSON.stringify(newServices));
      dispatchDataUpdate('services', newServices);
      
      // Trigger real-time update event
      window.dispatchEvent(new CustomEvent('dashboardServicesUpdated', {
        detail: { services: newServices, timestamp: Date.now() }
      }));
      
    } catch (error) {
      console.error("Dashboard: Error updating services:", error);
      setError(error instanceof Error ? error.message : 'Failed to update services');
    }
  }, []);

  const updateReviews = useCallback(async (newReviews: Review[]) => {
    try {
      console.log("Dashboard: Updating reviews", newReviews.length);
      setReviews(newReviews);
      localStorage.setItem('reviewsData', JSON.stringify(newReviews));
      dispatchDataUpdate('reviews', newReviews);
      
      // Trigger real-time update event
      window.dispatchEvent(new CustomEvent('dashboardReviewsUpdated', {
        detail: { reviews: newReviews, timestamp: Date.now() }
      }));
      
    } catch (error) {
      console.error("Dashboard: Error updating reviews:", error);
      setError(error instanceof Error ? error.message : 'Failed to update reviews');
    }
  }, []);

  const refreshData = useCallback(() => {
    console.log("Dashboard: Manual refresh triggered");
    initializeData();
  }, [initializeData]);

  // Real-time event listeners
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'servicesData' && e.newValue) {
        try {
          const newServices = JSON.parse(e.newValue);
          if (isValidData(newServices, 'services')) {
            console.log("Dashboard: Services updated from storage event");
            setServices(newServices);
          }
        } catch (error) {
          console.error("Dashboard: Error parsing storage services:", error);
        }
      }
      
      if (e.key === 'reviewsData' && e.newValue) {
        try {
          const newReviews = JSON.parse(e.newValue);
          if (isValidData(newReviews, 'reviews')) {
            console.log("Dashboard: Reviews updated from storage event");
            setReviews(newReviews);
          }
        } catch (error) {
          console.error("Dashboard: Error parsing storage reviews:", error);
        }
      }
    };

    const handleDataUpdate = (event: CustomEvent) => {
      console.log("Dashboard: Received data update event", event.detail);
      if (event.detail.type === 'services') {
        setServices(event.detail.data);
      } else if (event.detail.type === 'reviews') {
        setReviews(event.detail.data);
      }
    };

    const handleConnectivityChange = () => {
      setIsConnected(navigator.onLine);
      if (navigator.onLine) {
        console.log("Dashboard: Connection restored, refreshing data");
        refreshData();
      } else {
        console.log("Dashboard: Connection lost");
      }
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('dataUpdate', handleDataUpdate as EventListener);
    window.addEventListener('online', handleConnectivityChange);
    window.addEventListener('offline', handleConnectivityChange);

    // Initialize data on mount
    initializeData();

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dataUpdate', handleDataUpdate as EventListener);
      window.removeEventListener('online', handleConnectivityChange);
      window.removeEventListener('offline', handleConnectivityChange);
    };
  }, [initializeData, refreshData]);

  return {
    services,
    reviews,
    loading,
    error,
    isConnected,
    updateServices,
    updateReviews,
    refreshData,
  };
};
