
import { useState, useEffect } from 'react';
import { useSupabaseData } from './useSupabaseData';
import { ServiceCaseStudy, ServiceReview } from './useServiceData';

export interface SelectedContent {
  caseStudies: ServiceCaseStudy[];
  reviews: ServiceReview[];
}

export const useSelectedContent = (serviceType: string): SelectedContent => {
  const supabaseHooks = useSupabaseData();
  const [allCaseStudies, setAllCaseStudies] = useState<ServiceCaseStudy[]>([]);
  const [allReviews, setAllReviews] = useState<ServiceReview[]>([]);
  
  const [selectedContent, setSelectedContent] = useState<SelectedContent>({
    caseStudies: [],
    reviews: []
  });

  // Load data using the service data hooks
  useEffect(() => {
    // This is a temporary solution - we'll need to implement proper data fetching
    // For now, let's use empty arrays and localStorage only
    const loadData = async () => {
      try {
        // In a real implementation, you'd fetch from your data source here
        // For now, we'll work with localStorage only
        setAllCaseStudies([]);
        setAllReviews([]);
      } catch (error) {
        console.error('Error loading data:', error);
        setAllCaseStudies([]);
        setAllReviews([]);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Get service-specific content (when we have real data)
    const serviceCaseStudies = allCaseStudies.filter(cs => cs.service_type === serviceType);
    const serviceReviews = allReviews.filter(r => r.service_type === serviceType);

    // Get additional selected content from localStorage
    const savedCaseStudies = localStorage.getItem(`${serviceType}-case-studies`);
    const savedReviews = localStorage.getItem(`${serviceType}-reviews`);

    let additionalCaseStudies: ServiceCaseStudy[] = [];
    let additionalReviews: ServiceReview[] = [];

    if (savedCaseStudies) {
      const selectedIds = JSON.parse(savedCaseStudies);
      additionalCaseStudies = allCaseStudies.filter(cs => selectedIds.includes(cs.id));
    }

    if (savedReviews) {
      const selectedIds = JSON.parse(savedReviews);
      additionalReviews = allReviews.filter(r => selectedIds.includes(r.id));
    }

    // Combine service-specific and selected content
    const combinedCaseStudies = [...serviceCaseStudies, ...additionalCaseStudies];
    const combinedReviews = [...serviceReviews, ...additionalReviews];

    // Remove duplicates based on ID
    const uniqueCaseStudies = combinedCaseStudies.filter((cs, index, self) => 
      index === self.findIndex(item => item.id === cs.id)
    );
    const uniqueReviews = combinedReviews.filter((r, index, self) => 
      index === self.findIndex(item => item.id === r.id)
    );

    setSelectedContent({
      caseStudies: uniqueCaseStudies,
      reviews: uniqueReviews
    });
  }, [serviceType, allCaseStudies, allReviews]);

  return selectedContent;
};
