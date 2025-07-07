
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";

const DynamicHero = () => {
  const { settings, isLoading } = useWebsiteSettings();

  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="animate-pulse text-center">
          <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      {/* Minimalist Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(var(--muted))_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_hsl(var(--accent))_0%,_transparent_50%)]"></div>
      </div>

      <div className="container-modern relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Main Headline */}
            <h1 className="heading-modern text-5xl md:text-6xl lg:text-7xl text-foreground leading-[0.9] text-balance">
              <span className="block text-muted-foreground text-lg font-normal mb-4 tracking-wide uppercase">
                {settings.companyName}
              </span>
              <span className="block">
                {settings.heroTitle}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-modern text-xl md:text-2xl text-muted-foreground max-w-2xl text-balance">
              {settings.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Button 
                size="lg" 
                className="btn-primary"
              >
                {settings.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="btn-secondary"
              >
                View Case Studies
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 justify-center lg:justify-start pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">$50M+</div>
                <div className="text-sm text-muted-foreground">Ad Spend</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">300%</div>
                <div className="text-sm text-muted-foreground">Avg ROI</div>
              </div>
            </div>
          </div>

          {/* Right Content - Minimalist Visual */}
          <div className="relative">
            <div className="card-modern p-12 bg-card">
              {/* Clean Dashboard Mockup */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <div className="text-xs text-muted-foreground font-mono">Performance Dashboard</div>
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="card-modern p-4 text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">4.2x</div>
                    <div className="text-xs text-muted-foreground">ROAS</div>
                  </div>
                  <div className="card-modern p-4 text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">89K</div>
                    <div className="text-xs text-muted-foreground">Revenue</div>
                  </div>
                </div>
                
                <div className="h-24 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg flex items-end justify-center p-4">
                  <div className="flex items-end gap-2">
                    <div className="w-2 h-8 bg-primary/20 rounded-sm"></div>
                    <div className="w-2 h-12 bg-primary/40 rounded-sm"></div>
                    <div className="w-2 h-16 bg-primary rounded-sm"></div>
                    <div className="w-2 h-10 bg-primary/60 rounded-sm"></div>
                    <div className="w-2 h-14 bg-primary/80 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicHero;
