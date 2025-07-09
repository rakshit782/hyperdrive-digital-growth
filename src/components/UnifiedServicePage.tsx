
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowUpRight, Star, ChevronLeft, ChevronRight, CheckCircle, Shield, Award, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import CaseStudyPopup from '@/components/CaseStudyPopup';
import { useServiceData, ServiceCaseStudy } from '@/hooks/useServiceData';
import * as Icons from 'lucide-react';

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
  const { caseStudies, stats, reviews } = useServiceData(serviceType);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ServiceCaseStudy | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCaseStudyClick = (caseStudy: ServiceCaseStudy) => {
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

  const nextReviews = () => {
    setCurrentReviewIndex((prev) => 
      prev + 6 >= reviews.length ? 0 : prev + 6
    );
  };

  const prevReviews = () => {
    setCurrentReviewIndex((prev) => 
      prev - 6 < 0 ? Math.max(0, reviews.length - 6) : prev - 6
    );
  };

  const getCurrentReviews = () => {
    return reviews.slice(currentReviewIndex, currentReviewIndex + 6);
  };

  // Get the icon component for stats
  const getStatIcon = (iconName?: string) => {
    if (!iconName) return TrendingUp;
    return (Icons as any)[iconName] || TrendingUp;
  };

  // Display the full amounts: 4 features, 4 stats, 8 case studies, 6 reviews
  const displayFeatures = features.slice(0, 4);
  const displayStats = stats.slice(0, 4);
  const displayCaseStudies = caseStudies.slice(0, 8);
  const displayReviews = reviews.slice(0, 6);

  // Define gradient classes for Google Advertising case studies
  const getCaseStudyGradient = (serviceType: string, index: number) => {
    if (serviceType === 'google-advertising') {
      const gradients = [
        'bg-gradient-to-r from-red-500 to-orange-500',
        'bg-gradient-to-r from-orange-500 to-yellow-500',
        'bg-gradient-to-r from-yellow-500 to-green-500',
        'bg-gradient-to-r from-green-500 to-blue-500',
        'bg-gradient-to-r from-blue-500 to-indigo-500',
        'bg-gradient-to-r from-indigo-500 to-purple-500',
        'bg-gradient-to-r from-purple-500 to-pink-500',
        'bg-gradient-to-r from-pink-500 to-red-500'
      ];
      return gradients[index % gradients.length];
    }
    return `bg-gradient-to-r from-${primaryColor}-500 to-${secondaryColor}-500`;
  };

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} />
      <div className={`min-h-screen ${gradientClass}`}>
        <Header />
        
        <div className="space-y-12">
          {/* Hero Section */}
          <section className="pt-28 pb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="max-w-6xl mx-auto px-6 relative">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="mb-6">
                    <span className={`inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-${primaryColor}-700 rounded-full text-sm font-medium border border-${primaryColor}-200/50 shadow-sm`}>
                      {badgeIcon} {badgeText}
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
                    >
                      {primaryButtonText}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-2 border-slate-300 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-3 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={() => window.location.href = secondaryButtonUrl}
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
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 bg-white/60 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Master {title.split(' ')[0]}
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Comprehensive solutions designed to elevate your business performance and drive exceptional results.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 shadow-md">
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">{feature.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Stats Section - Show 4 stats */}
          {displayStats.length > 0 && (
            <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/50">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-10">
                  Proven Results
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {displayStats.map((stat, index) => {
                    const IconComponent = getStatIcon(stat.icon_name);
                    return (
                      <Card key={stat.id} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 shadow-md">
                        <CardContent className="p-6">
                          <div className={`w-12 h-12 bg-gradient-to-r from-${primaryColor}-500 to-${secondaryColor}-500 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-3xl font-bold text-slate-900 mb-2">{stat.stat_value}</div>
                          <div className="text-base font-medium text-slate-800 mb-1">{stat.stat_label}</div>
                          <p className="text-slate-600 text-xs">{stat.stat_description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Case Studies Section - Show 8 case studies */}
          {displayCaseStudies.length > 0 && (
            <section className="py-12 bg-white/60 backdrop-blur-sm">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Proven Success Stories
                  </h2>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Real results from businesses like yours. See how our {title.toLowerCase()} helped companies achieve remarkable growth and success.
                  </p>
                  <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-green-500" />
                      Verified Results
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-blue-500" />
                      Client Approved
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-purple-500" />
                      Real Performance Data
                    </span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {displayCaseStudies.map((study, index) => (
                    <Card 
                      key={study.id}
                      className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group bg-white/90 backdrop-blur-sm border-0 shadow-md overflow-hidden"
                      onClick={() => handleCaseStudyClick(study)}
                    >
                      <CardContent className="p-0">
                        <div className={`${getCaseStudyGradient(serviceType, index)} p-4 text-white`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                              {study.industry}
                            </span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                          </div>
                          <h3 className="text-sm font-bold leading-tight line-clamp-2">
                            {study.title}
                          </h3>
                        </div>
                        
                        <div className="p-4">
                          <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
                            {study.description}
                          </p>
                          
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100 mb-4">
                            <div className="text-center">
                              {study.results && typeof study.results === 'object' && Object.entries(study.results).slice(0, 1).map(([key, value]) => (
                                <div key={key}>
                                  <div className="text-lg font-bold text-green-600">{String(value)}</div>
                                  <div className="text-xs text-slate-600 capitalize">{key.replace(/_/g, ' ')}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-700">{study.client_name}</span>
                            <span className="text-xs text-blue-600 font-medium">View Details →</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Reviews Section - Show 6 reviews with carousel */}
          {displayReviews.length > 0 && (
            <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/50">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    What Our Clients Say
                  </h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Real feedback from businesses that have transformed their growth with our {title.toLowerCase()}.
                  </p>
                </div>

                <div className="relative">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getCurrentReviews().map((review) => (
                      <Card key={review.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            {renderStars(review.rating)}
                          </div>
                          
                          <blockquote className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-4">
                            "{review.review_text}"
                          </blockquote>
                          
                          <div className="border-t pt-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold text-slate-900 text-sm">{review.client_name}</div>
                                <div className="text-slate-600 text-xs">{review.company}</div>
                              </div>
                            </div>
                            {review.results_achieved && (
                              <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-100">
                                <div className="text-xs font-medium text-green-700">Results: {review.results_achieved}</div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {displayReviews.length > 6 && (
                    <div className="flex justify-center gap-4 mt-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevReviews}
                        className="bg-white/80 backdrop-blur-sm"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextReviews}
                        className="bg-white/80 backdrop-blur-sm"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
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
              >
                {ctaButtonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </section>
        </div>
      </div>
      <Footer />

      {selectedCaseStudy && (
        <CaseStudyPopup
          caseStudy={selectedCaseStudy}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default UnifiedServicePage;
