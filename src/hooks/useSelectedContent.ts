
import { useState, useEffect } from 'react';
import { useSupabaseData } from './useSupabaseData';
import { ServiceCaseStudy, ServiceReview } from './useServiceData';

export interface SelectedContent {
  caseStudies: ServiceCaseStudy[];
  reviews: ServiceReview[];
}

export const useSelectedContent = (serviceType: string): SelectedContent => {
  const { data: allCaseStudies = [] } = useSupabaseData('service_case_studies');
  const { data: allReviews = [] } = useSupabaseData('service_reviews');
  
  const [selectedContent, setSelectedContent] = useState<SelectedContent>({
    caseStudies: [],
    reviews: []
  });

  useEffect(() => {
    // Get service-specific content
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
