
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  heroDescription: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonUrl: string;
  heroImage: string;
  heroImageAlt: string;
  badgeText: string;
  badgeIcon: string;
  primaryColor: string;
  secondaryColor: string;
}

const HeroSection = ({
  title,
  subtitle,
  heroDescription,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonUrl,
  secondaryButtonUrl,
  heroImage,
  heroImageAlt,
  badgeText,
  badgeIcon,
  primaryColor,
  secondaryColor
}: HeroSectionProps) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section className="pt-28 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="mb-6">
              <span className={`inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-${primaryColor}-700 rounded-full text-sm font-medium border border-${primaryColor}-200/50 shadow-sm`}>
                <span aria-label={badgeText}>{badgeIcon}</span>
                <span className="ml-2">{badgeText}</span>
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              {title}
            </h1>
            <h2 className="text-lg md:text-xl text-slate-700 font-medium mb-4">
              {subtitle}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6 max-w-xl">
              {heroDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                size="lg" 
                className={`bg-gradient-to-r from-${primaryColor}-600 to-${secondaryColor}-600 hover:from-${primaryColor}-700 hover:to-${secondaryColor}-700 text-white px-8 py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                onClick={() => window.location.href = primaryButtonUrl}
                aria-label={`${primaryButtonText} - Navigate to ${primaryButtonUrl}`}
              >
                {primaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-300 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-3 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = secondaryButtonUrl}
                aria-label={`${secondaryButtonText} - Navigate to ${secondaryButtonUrl}`}
              >
                {secondaryButtonText}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200/60">
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900">450%</div>
                <div className="text-xs text-slate-600 mt-1">Avg ROI Increase</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900">95%</div>
                <div className="text-xs text-slate-600 mt-1">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900">200+</div>
                <div className="text-xs text-slate-600 mt-1">Success Stories</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r from-${primaryColor}-400 to-${secondaryColor}-500 rounded-2xl blur-2xl opacity-20`}></div>
            <img
              src={heroImage}
              alt={heroImageAlt}
              className="relative w-full rounded-2xl shadow-xl object-cover h-72"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
