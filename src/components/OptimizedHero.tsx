
import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CheckCircle, Star } from 'lucide-react';

const OptimizedHero = memo(() => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Star className="w-4 h-4 mr-2 fill-current" />
              #1 Rated Marketing Agency
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6 animate-fade-in delay-200">
              Scale Your Business with
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Expert Marketing
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in delay-300">
              Drive explosive growth with our proven Amazon, Walmart, Meta, and Google advertising strategies. 
              Get measurable results from day one.
            </p>
            
            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 animate-fade-in delay-400">
              {[
                'Proven 300% ROI Increase',
                'Expert Account Management',
                'Real-time Performance Tracking',
                'Custom Growth Strategies'
              ].map((feature, index) => (
                <div key={index} className="flex items-center text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in delay-500">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                onClick={() => window.location.href = '/free-audit'}
              >
                Get Free Audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-4 text-lg font-semibold"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Social proof */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 animate-fade-in delay-600">
              <div className="flex items-center justify-center lg:justify-start space-x-8 text-slate-600 dark:text-slate-400">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">500+</div>
                  <div className="text-sm">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">300%</div>
                  <div className="text-sm">Avg ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">10+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero image section - restored with proper image */}
          <div className="relative lg:order-2 animate-fade-in delay-700">
            <div className="relative mx-auto w-full max-w-lg">
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-2xl opacity-20"></div>
              
              {/* Main hero image */}
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center&auto=format&q=80&fm=webp"
                alt="Marketing Analytics Dashboard showing growth metrics and performance data"
                className="relative w-full rounded-2xl shadow-xl object-cover h-80 lg:h-96"
                loading="eager"
              />
              
              {/* Floating metrics - these add visual interest */}
              <div className="absolute -top-4 -left-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">ROAS: 4.2x</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 animate-bounce delay-1000">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">CPC: -35%</span>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-12 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 animate-bounce delay-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">CTR: +28%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

OptimizedHero.displayName = 'OptimizedHero';

export default OptimizedHero;
