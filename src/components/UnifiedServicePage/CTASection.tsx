
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
}

const CTASection = ({ ctaTitle, ctaDescription, ctaButtonText, ctaButtonUrl }: CTASectionProps) => {
  return (
    <section className="py-12 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {ctaTitle}
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {ctaDescription}
        </p>
        
        <Button 
          size="lg"
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          onClick={() => window.location.href = ctaButtonUrl}
          aria-label={`${ctaButtonText} - Navigate to ${ctaButtonUrl}`}
        >
          {ctaButtonText}
          <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
