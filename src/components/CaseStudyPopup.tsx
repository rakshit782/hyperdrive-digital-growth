
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ServiceCaseStudy } from '@/hooks/useServiceData';
import { X } from 'lucide-react';

interface CaseStudyPopupProps {
  caseStudy: ServiceCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyPopup = ({ caseStudy, isOpen, onClose }: CaseStudyPopupProps) => {
  if (!caseStudy) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 mb-4">
            {caseStudy.title}
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>
        
        <div className="space-y-6">
          {caseStudy.image_url && (
            <img 
              src={caseStudy.image_url} 
              alt={caseStudy.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          
          <div className="flex flex-wrap gap-3">
            {caseStudy.industry && (
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {caseStudy.industry}
              </span>
            )}
            {caseStudy.client_name && (
              <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {caseStudy.client_name}
              </span>
            )}
          </div>
          
          <p className="text-lg text-slate-700 leading-relaxed">
            {caseStudy.description}
          </p>
          
          {Object.keys(caseStudy.results).length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Results Achieved</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(caseStudy.results).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{value}</div>
                    <div className="text-sm text-slate-600">{key.replace(/_/g, ' ')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyPopup;
