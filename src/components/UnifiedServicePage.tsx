
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import CaseStudyPopup from '@/components/CaseStudyPopup';
import { useServiceData } from '@/hooks/useServiceData';

interface UnifiedServicePageProps {
  serviceType: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonUrl: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  heroImageAlt: string;
  badgeText: string;
  badgeIcon: string;
  gradientClass: string;
  primaryColor: string;
  secondaryColor: string;
  features: Array<{
    icon: any;
    title: string;
    description: string;
    gradient: string;
  }>;
}

const UnifiedServicePage = ({
  serviceType,
  title,
  subtitle,
  heroDescription,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonUrl,
  secondaryButtonUrl,
  ctaTitle,
  ctaDescription,
  ctaButtonText,
  ctaButtonUrl,
  seoTitle,
  seoDescription,
  heroImage,
  heroImageAlt,
  badgeText,
  badgeIcon,
  gradientClass,
  primaryColor,
  secondaryColor,
  features
}: UnifiedServicePageProps) => {
  const { caseStudies, stats, reviews, loading } = useServiceData(serviceType);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCaseStudyClick = (caseStudy: any) => {
    setSelectedCaseStudy(caseStudy);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCaseStudy(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <>
        <SEOHead title={seoTitle} description={seoDescription} />
        <div className={`min-h-screen ${gradientClass}`}>
          <Header />
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-600"></div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} />
      <div className={`min-h-screen ${gradientClass}`}>
        <Header />
        
        <div className="space-y-20">
          {/* Hero Section */}
          <section className="pt-40 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="mb-8">
                    <span className={`inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-${primaryColor}-700 rounded-full text-sm font-medium border border-${primaryColor}-200/50`}>
                      {badgeIcon} {badgeText}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight">
                    {title}
                  </h1>
                  <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-4">
                    {subtitle}
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
                    {heroDescription}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 mb-12">
                    <Button 
                      size="lg" 
                      className={`bg-gradient-to-r from-${primaryColor}-600 to-${secondaryColor}-600 hover:from-${primaryColor}-700 hover:to-${secondaryColor}-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
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

                  <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200/60">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900">450%</div>
                      <div className="text-sm text-slate-600 mt-1">Avg ROI Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900">95%</div>
                      <div className="text-sm text-slate-600 mt-1">Client Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900">200+</div>
                      <div className="text-sm text-slate-600 mt-1">Success Stories</div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r from-${primaryColor}-400 to-${secondaryColor}-500 rounded-3xl blur-3xl opacity-20`}></div>
                  <img
                    src={heroImage}
                    alt={heroImageAlt}
                    className="relative w-full rounded-3xl shadow-2xl object-cover h-96"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Master {title.split(' ')[0]}
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Comprehensive solutions designed to elevate your business performance and drive exceptional results.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="text-center p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-100">
                      <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          {stats.length > 0 && (
            <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16">
                  Proven Results
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.slice(0, 4).map((stat, index) => (
                    <Card key={stat.id} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <CardHeader className="pb-3">
                        <div className={`w-16 h-16 bg-gradient-to-r from-${primaryColor}-500 to-${secondaryColor}-500 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                          <div className="w-8 h-8 text-white font-bold">{index + 1}</div>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 mb-2">{stat.stat_value}</div>
                        <CardTitle className="text-lg text-slate-800">{stat.stat_label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm">{stat.stat_description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Case Studies Section */}
          {caseStudies.length > 0 && (
            <section className="py-20 bg-white">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                    Success Stories
                  </h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Real results from businesses that transformed their performance with our expertise.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {caseStudies.slice(0, 6).map((study, index) => (
                    <div 
                      key={study.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                      onClick={() => handleCaseStudyClick(study)}
                    >
                      <div className={`h-48 bg-gradient-to-r from-${primaryColor}-500 to-${secondaryColor}-500 relative overflow-hidden`}>
                        {study.image_url && (
                          <img 
                            src={study.image_url} 
                            alt={study.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-3 py-1 bg-${primaryColor}-100 text-${primaryColor}-800 rounded-full text-xs font-medium`}>
                            {study.industry}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                            {study.client_name}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                          {study.title}
                        </h3>
                        
                        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {study.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {Object.entries(study.results).slice(0, 2).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className={`text-lg font-bold text-${primaryColor}-600`}>{value}</div>
                              <div className="text-xs text-slate-500">{key}</div>
                            </div>
                          ))}
                        </div>
                        
                        <Button 
                          className={`w-full bg-gradient-to-r from-${primaryColor}-600 to-${secondaryColor}-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm`}
                        >
                          View Full Case Study
                          <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Reviews Section */}
          {reviews.length > 0 && (
            <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                    What Our Clients Say
                  </h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Discover how businesses have achieved remarkable growth with our expertise.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {reviews.slice(0, 6).map((review) => (
                    <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r from-${primaryColor}-500 to-${secondaryColor}-500 rounded-full flex items-center justify-center mr-4`}>
                          <span className="text-white font-semibold text-lg">
                            {review.client_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{review.client_name}</h4>
                          <p className="text-slate-600 text-sm">{review.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        {renderStars(review.rating)}
                      </div>
                      
                      <p className="text-slate-700 leading-relaxed mb-4 text-sm">
                        "{review.review_text}"
                      </p>
                      
                      {review.results_achieved && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-green-800 text-sm font-medium">
                            Results: {review.results_achieved}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                {ctaTitle}
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {ctaDescription}
              </p>
              
              <Button 
                size="lg"
                className={`bg-gradient-to-r from-${primaryColor}-600 to-${secondaryColor}-600 hover:from-${primaryColor}-700 hover:to-${secondaryColor}-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                onClick={() => window.location.href = ctaButtonUrl}
              >
                {ctaButtonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </section>
        </div>

        <CaseStudyPopup 
          caseStudy={selectedCaseStudy}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      </div>
      <Footer />
    </>
  );
};

export default UnifiedServicePage;
