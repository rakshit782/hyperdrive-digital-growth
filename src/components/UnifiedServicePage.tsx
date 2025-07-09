import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowUpRight, Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import CaseStudyPopup from '@/components/CaseStudyPopup';
import { useServiceData, ServiceCaseStudy } from '@/hooks/useServiceData';

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
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ServiceCaseStudy | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

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
      prev + 3 >= reviews.length ? 0 : prev + 3
    );
  };

  const prevReviews = () => {
    setCurrentReviewIndex((prev) => 
      prev - 3 < 0 ? Math.max(0, reviews.length - 3) : prev - 3
    );
  };

  const getCurrentReviews = () => {
    return reviews.slice(currentReviewIndex, currentReviewIndex + 3);
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

  // Ensure we have exactly the required number of items
  const displayFeatures = features.slice(0, 4);
  const displayStats = stats.slice(0, 4);
  const displayCaseStudies = caseStudies.slice(0, 8);
  const displayReviews = reviews.slice(0, 6);

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} />
      <div className={`min-h-screen ${gradientClass}`}>
        <Header />
        
        <div className="space-y-16">
          {/* Hero Section */}
          <section className="pt-32 pb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="mb-6">
                    <span className={`inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-${primaryColor}-700 rounded-full text-sm font-medium border border-${primaryColor}-200/50 shadow-sm`}>
                      {badgeIcon} {badgeText}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                    {title}
                  </h1>
                  <h2 className="text-lg md:text-xl text-slate-700 font-medium mb-4">
                    {subtitle}
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                    {heroDescription}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
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

                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200/60">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">450%</div>
                      <div className="text-xs text-slate-600 mt-1">Avg ROI Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">95%</div>
                      <div className="text-xs text-slate-600 mt-1">Client Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">200+</div>
                      <div className="text-xs text-slate-600 mt-1">Success Stories</div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r from-${primaryColor}-400 to-${secondaryColor}-500 rounded-2xl blur-2xl opacity-20`}></div>
                  <img
                    src={heroImage}
                    alt={heroImageAlt}
                    className="relative w-full rounded-2xl shadow-xl object-cover h-80"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-white/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
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
                    <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                      <CardContent className="p-6 text-center">
                        <div className={`w-14 h-14 ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-7 h-7 text-white" />
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

          {/* Stats Section */}
          {displayStats.length > 0 && (
            <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/50">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
                  Proven Results
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {displayStats.map((stat, index) => (
                    <Card key={stat.id} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 bg-gradient-to-r from-${primaryColor}-500 to-${secondaryColor}-500 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                          <div className="w-6 h-6 text-white font-bold text-sm">{index + 1}</div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-2">{stat.stat_value}</div>
                        <div className="text-base font-medium text-slate-800 mb-1">{stat.stat_label}</div>
                        <p className="text-slate-600 text-xs">{stat.stat_description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Case Studies Section - Enhanced for trust building */}
          {displayCaseStudies.length > 0 && (
            <section className="py-16 bg-white/60 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Proven Success Stories
                  </h2>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Real results from businesses like yours. See how our {title.toLowerCase()} helped companies achieve remarkable growth and success.
                  </p>
                  <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      Verified Results
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      Client Approved
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      Real Performance Data
                    </span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {displayCaseStudies.map((study, index) => (
                    <Card 
                      key={study.id}
                      className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group bg-white/90 backdrop-blur-sm border-0 shadow-lg overflow-hidden"
                      onClick={() => handleCaseStudyClick(study)}
                    >
                      <CardContent className="p-0">
                        {/* Header with gradient background */}
                        <div className={`bg-gradient-to-r from-${primaryColor}-500 to-${secondaryColor}-500 p-4 text-white`}>
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
                        
                        {/* Content */}
                        <div className="p-4">
                          <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
                            {study.description}
                          </p>
                          
                          {/* Results highlight */}
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
                          
                          {/* Client info */}
                          <div className="text-center">
                            <div className="text-xs font-medium text-slate-900">{study.client_name}</div>
                            <div className="text-xs text-slate-500">{study.industry}</div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="p-4 pt-0">
                          <div className="text-xs text-center text-slate-400 hover:text-slate-600 transition-colors">
                            Click to read full case study →
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Trust indicators below case studies */}
                <div className="mt-12 text-center">
                  <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Why These Results Matter</h3>
                    <div className="grid md:grid-cols-3 gap-6 text-sm">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-slate-900">Verified Performance</div>
                          <div className="text-slate-600">All results are verified and approved by our clients</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-slate-900">Real Business Impact</div>
                          <div className="text-slate-600">Measurable improvements in revenue and growth</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-slate-900">Repeatable Success</div>
                          <div className="text-slate-600">Proven strategies that work across industries</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Reviews Section */}
          {displayReviews.length > 0 && (
            <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50/50">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    What Our Clients Say
                  </h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Discover how businesses have achieved remarkable growth with our expertise.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getCurrentReviews().map((review) => (
                      <Card key={review.id} className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className={`w-10 h-10 bg-gradient-to-r from-${primaryColor}-500 to-${secondaryColor}-500 rounded-full flex items-center justify-center mr-3 overflow-hidden`}>
                              {review.avatar_url ? (
                                <img 
                                  src={review.avatar_url} 
                                  alt={review.client_name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-white font-semibold text-sm">
                                  {review.client_name.charAt(0)}
                                </span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900 text-sm">{review.client_name}</h4>
                              <p className="text-slate-600 text-xs">{review.company}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center mb-3">
                            {renderStars(review.rating)}
                          </div>
                          
                          <p className="text-slate-700 leading-relaxed mb-4 text-sm">
                            "{review.review_text}"
                          </p>
                          
                          {review.results_achieved && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                              <p className="text-green-800 text-xs font-medium">
                                Results: {review.results_achieved}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Carousel Navigation */}
                  {displayReviews.length > 3 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevReviews}
                        className="rounded-full p-2 bg-white/80 backdrop-blur-sm"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm text-slate-600">
                        {Math.floor(currentReviewIndex / 3) + 1} of {Math.ceil(displayReviews.length / 3)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextReviews}
                        className="rounded-full p-2 bg-white/80 backdrop-blur-sm"
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
          <section className="py-16 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {ctaTitle}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {ctaDescription}
              </p>
              
              <Button 
                size="lg"
                className={`bg-gradient-to-r from-${primaryColor}-600 to-${secondaryColor}-600 hover:from-${primaryColor}-700 hover:to-${secondaryColor}-700 text-white px-10 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
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
