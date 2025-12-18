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

  if (displayCaseStudies.length === 0) return null;

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Proven Success Stories
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Real results from businesses like yours. See how our {title.toLowerCase()} helped companies achieve remarkable growth and success.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-slate-400">
            <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <Shield className="w-4 h-4 text-green-400" aria-hidden="true" />
              Verified Results
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <Award className="w-4 h-4 text-blue-400" aria-hidden="true" />
              Client Approved
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <CheckCircle className="w-4 h-4 text-purple-400" aria-hidden="true" />
              Real Performance Data
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCaseStudies.map((study, index) => (
            <Card 
              key={study.id}
              className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
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
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-5 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                      {study.industry}
                    </span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold leading-tight line-clamp-2">
                    {study.title}
                  </h3>
                </div>
                
                <div className="p-5">
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
                    {study.description}
                  </p>
                  
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/20 mb-5">
                    <div className="text-center">
                      {study.results && typeof study.results === 'object' && Object.entries(study.results).slice(0, 1).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-2xl font-bold text-green-400">{String(value)}</div>
                          <div className="text-xs text-slate-400 capitalize mt-1">{key.replace(/_/g, ' ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{study.client_name}</span>
                    <span className="text-sm text-blue-400 font-medium group-hover:text-blue-300 transition-colors">View Details →</span>
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
