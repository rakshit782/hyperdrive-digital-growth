
import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, Store, Users, Search, Code, Globe } from 'lucide-react';
import { useSupabaseServices } from '@/hooks/useSupabaseServices';

const iconMap = {
  ShoppingCart,
  Store,
  Users,
  Search,
  Code,
  Globe,
};

const OptimizedServices = memo(() => {
  const { services, loading, error } = useSupabaseServices();

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">Failed to load services: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Our Expert Services
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprehensive digital marketing solutions designed to accelerate your business growth 
            across all major platforms and channels.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || ShoppingCart;
            
            return (
              <Card 
                key={service.id} 
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200"
                    onClick={() => window.location.href = service.link}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA section */}
        <div className="text-center mt-16 animate-fade-in delay-500">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            View All Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
});

OptimizedServices.displayName = 'OptimizedServices';

export default OptimizedServices;
