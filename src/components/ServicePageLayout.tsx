
import { ServiceCaseStudy, ServiceStat, ServiceReview } from '@/hooks/useServiceData';
import ServiceStats from './ServiceStats';
import ServiceCaseStudies from './ServiceCaseStudies';
import ServiceReviews from './ServiceReviews';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CheckCircle } from 'lucide-react';

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  heroDescription: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonUrl: string;
  stats: ServiceStat[];
  caseStudies: ServiceCaseStudy[];
  reviews: ServiceReview[];
  services: Array<{
    title: string;
    description: string;
    icon: string;
    gradient: string;
    features?: string[];
  }>;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
  loading?: boolean;
}

const ServicePageLayout = ({
  title,
  subtitle,
  heroDescription,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonUrl,
  secondaryButtonUrl,
  stats,
  caseStudies,
  reviews,
  services,
  benefits,
  ctaTitle,
  ctaDescription,
  ctaButtonText,
  ctaButtonUrl,
  loading = false
}: ServicePageLayoutProps) => {
  const getIconComponent = (iconName: string) => {
    const icons = require('lucide-react');
    return icons[iconName] || icons.Star;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section with symmetrical padding */}
      <section className="py-24 md:py-32 lg:py-40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-6">
              <span className="text-sm font-medium text-blue-700">Expert Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              {title}
            </h1>
            {subtitle && (
              <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-4">
                {subtitle}
              </h2>
            )}
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8 max-w-4xl mx-auto">
              {heroDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => window.location.href = primaryButtonUrl}
              >
                {primaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = secondaryButtonUrl}
              >
                {secondaryButtonText}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {!loading && stats.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              {title.split(' ')[0]} Results
            </h2>
            <ServiceStats stats={stats} />
          </div>
        </section>
      )}

      {/* Services Section with symmetrical padding */}
      {services.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our {title.split(' ')[0]} Services
            </h2>
            
            <div className={`grid gap-8 ${
              services.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' :
              services.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
              services.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3' :
              services.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' :
              services.length === 5 ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' :
              'md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {services.map((service, index) => {
                const IconComponent = getIconComponent(service.icon);
                return (
                  <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    {service.features && (
                      <CardContent>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-slate-700">
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies Section */}
      {!loading && caseStudies.length > 0 && (
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <ServiceCaseStudies caseStudies={caseStudies} />
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {!loading && reviews.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <ServiceReviews reviews={reviews} />
          </div>
        </section>
      )}

      {/* Benefits Section with symmetrical padding */}
      {benefits.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-6">
                  Why Choose Our {title.split(' ')[0]} Management?
                </h2>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => {
                    const IconComponent = getIconComponent(benefit.icon);
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`w-8 h-8 ${benefit.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                          <p className="text-slate-600">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">{ctaTitle}</h3>
                <p className="text-slate-600 mb-6">{ctaDescription}</p>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.location.href = ctaButtonUrl}
                >
                  {ctaButtonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServicePageLayout;
