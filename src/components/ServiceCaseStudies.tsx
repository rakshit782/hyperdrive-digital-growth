
import { ServiceCaseStudy } from '@/hooks/useServiceData';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCaseStudiesProps {
  caseStudies: ServiceCaseStudy[];
  title?: string;
}

const ServiceCaseStudies = ({ caseStudies, title = "Success Stories" }: ServiceCaseStudiesProps) => {
  if (caseStudies.length === 0) return null;

  const formatResultValue = (key: string, value: string) => {
    // Convert snake_case to Title Case
    const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return { label, value };
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
          {title}
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <div key={study.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              {study.image_url && (
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500">
                  <img 
                    src={study.image_url} 
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  {study.industry && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {study.industry}
                    </span>
                  )}
                  {study.client_name && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      {study.client_name}
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                  {study.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  {study.description}
                </p>
                
                {/* Results Metrics */}
                {Object.keys(study.results).length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(study.results).slice(0, 3).map(([key, value]) => {
                      const { label } = formatResultValue(key, value);
                      return (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{value}</div>
                          <div className="text-xs text-slate-500">{label}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <Button className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                  View Full Case Study
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCaseStudies;
