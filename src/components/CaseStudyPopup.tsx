
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ServiceCaseStudy } from '@/hooks/useServiceData';
import { X, CheckCircle, TrendingUp, Award, Target } from 'lucide-react';

interface CaseStudyPopupProps {
  caseStudy: ServiceCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyPopup = ({ caseStudy, isOpen, onClose }: CaseStudyPopupProps) => {
  if (!caseStudy) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="relative pb-6">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-slate-900 mb-1 text-left">
                  {caseStudy.title}
                </DialogTitle>
                <div className="flex items-center gap-4">
                  {caseStudy.client_name && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {caseStudy.client_name}
                    </span>
                  )}
                  {caseStudy.industry && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      {caseStudy.industry}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Challenge & Solution Section */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold text-slate-900">Challenge & Solution</h3>
            </div>
            <p className="text-slate-700 leading-relaxed text-base">
              {caseStudy.description}
            </p>
          </div>
          
          {/* Results Section */}
          {Object.keys(caseStudy.results).length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50/30 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-semibold text-slate-900">Results Achieved</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(caseStudy.results).map(([key, value]) => (
                  <div key={key} className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <div className="text-xs text-slate-600 font-medium uppercase tracking-wide">
                        {key.replace(/_/g, ' ')}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                      {String(value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Key Takeaways Section */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50/30 rounded-xl p-6 border border-purple-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Success Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Strategic Planning</h4>
                    <p className="text-sm text-slate-600">Comprehensive analysis and custom strategy development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Continuous Optimization</h4>
                    <p className="text-sm text-slate-600">Regular monitoring and performance improvements</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Data-Driven Decisions</h4>
                    <p className="text-sm text-slate-600">Analytics-based approach for maximum ROI</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Expert Execution</h4>
                    <p className="text-sm text-slate-600">Professional implementation and management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="text-center py-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-4">
              This case study represents real results achieved for our clients. Individual results may vary based on business goals, market conditions, and implementation.
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Verified Results
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Client Approved
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Real Performance Data
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyPopup;
