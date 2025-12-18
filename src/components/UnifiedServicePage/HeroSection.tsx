import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      {/* Animated glowing orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-blue-300 rounded-full text-sm font-medium border border-white/10">
                <Sparkles className="w-4 h-4 mr-2" />
                {badgeText}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl text-blue-200 font-medium mb-6">
              {subtitle}
            </h2>
            
            {/* Description */}
            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              {heroDescription}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => window.location.href = primaryButtonUrl}
                aria-label={`${primaryButtonText} - Navigate to ${primaryButtonUrl}`}
              >
                {primaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
                onClick={() => window.location.href = secondaryButtonUrl}
                aria-label={`${secondaryButtonText} - Navigate to ${secondaryButtonUrl}`}
              >
                {secondaryButtonText}
              </Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">450%</div>
                <div className="text-sm text-slate-400 mt-1">Avg ROI Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-slate-400 mt-1">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-sm text-slate-400 mt-1">Success Stories</div>
              </div>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-2 border border-white/10">
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="relative w-full rounded-2xl object-cover h-80 md:h-96"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
