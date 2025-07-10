
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Shield, Award, CheckCircle } from 'lucide-react';
import { ServiceCaseStudy } from '@/hooks/useServiceData';

interface CaseStudiesSectionProps {
  title: string;
  caseStudies: ServiceCaseStudy[];
  serviceType: string;
  primaryColor: string;
  secondaryColor: string;
  onCaseStudyClick: (caseStudy: ServiceCaseStudy) => void;
}

const CaseStudiesSection = ({ 
  title, 
  caseStudies, 
  serviceType, 
  primaryColor, 
  secondaryColor, 
  onCaseStudyClick 
}: CaseStudiesSectionProps) => {
  const displayCaseStudies = caseStudies.slice(0, 8);

  // Define gradient classes for Google Advertising case studies
  const getCaseStudyGradient = (serviceType: string, index: number) => {
    if (serviceType === 'google-advertising') {
      const gradients = [
        'bg-gradient-to-r from-red-500 to-orange-500',
        'bg-gradient-to-r from-orange-500 to-yellow-500',
        'bg-gradient-to-r from-yellow-500 to-green-500',
        'bg-gradient-to-r from-green-500 to-blue-500',
        'bg-gradient-to-r from-blue-500 to-indigo-500',
        'bg-gradient-to-r from-indigo-500 to-purple-500',
        'bg-gradient-to-r from-purple-500 to-pink-500',
        'bg-gradient-to-r from-pink-500 to-red-500'
      ];
      return gradients[index % gradients.length];
    }
    return `bg-gradient-to-r from-${primaryColor}-500 to-${secondaryColor}-500`;
  };

  if (displayCaseStudies.length === 0) return null;

  return (
    <section className="py-12 bg-white/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Proven Success Stories
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Real results from businesses like yours. See how our {title.toLowerCase()} helped companies achieve remarkable growth and success.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-500" aria-hidden="true" />
              Verified Results
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4 text-blue-500" aria-hidden="true" />
              Client Approved
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-purple-500" aria-hidden="true" />
              Real Performance Data
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCaseStudies.map((study, index) => (
            <Card 
              key={study.id}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group bg-white/90 backdrop-blur-sm border-0 shadow-md overflow-hidden"
              onClick={() => onCaseStudyClick(study)}
              role="button"
              tabIndex={0}
              aria-label={`View case study: ${study.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCaseStudyClick(study);
                }
              }}
            >
              <CardContent className="p-0">
                <div className={`${getCaseStudyGradient(serviceType, index)} p-4 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                      {study.industry}
                    </span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold leading-tight line-clamp-2">
                    {study.title}
                  </h3>
                </div>
                
                <div className="p-4">
                  <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
                    {study.description}
                  </p>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100 mb-4">
                    <div className="text-center">
                      {study.results && typeof study.results === 'object' && Object.entries(study.results).slice(0, 1).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-lg font-bold text-green-600">{String(value)}</div>
                          <div className="text-xs text-slate-600 capitalize">{key.replace(/_/g, ' ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-700">{study.client_name}</span>
                    <span className="text-xs text-blue-600 font-medium">View Details →</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
