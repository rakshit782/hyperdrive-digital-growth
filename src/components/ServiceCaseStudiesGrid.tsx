
import { useState } from 'react';
import { ServiceCaseStudy } from '@/hooks/useServiceData';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import CaseStudyPopup from './CaseStudyPopup';

interface ServiceCaseStudiesGridProps {
  caseStudies: ServiceCaseStudy[];
}

const ServiceCaseStudiesGrid = ({ caseStudies }: ServiceCaseStudiesGridProps) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ServiceCaseStudy | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCaseStudyClick = (caseStudy: ServiceCaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCaseStudy(null);
  };

  // Ensure we show exactly 8 case studies
  const displayCaseStudies = caseStudies.slice(0, 8);

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
            Success Stories
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayCaseStudies.map((study) => (
              <div key={study.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                {study.image_url && (
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500">
                    <img 
                      src={study.image_url} 
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {study.industry && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {study.industry}
                      </span>
                    )}
                    {study.client_name && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        {study.client_name}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2">
                    {study.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {study.description}
                  </p>
                  
                  {Object.keys(study.results).length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {Object.entries(study.results).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-blue-600">{value}</div>
                          <div className="text-xs text-slate-500">{key.replace(/_/g, ' ')}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => handleCaseStudyClick(study)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm"
                  >
                    View Case Study
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyPopup 
        caseStudy={selectedCaseStudy}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </>
  );
};

export default ServiceCaseStudiesGrid;
