
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Target, BarChart3, TrendingUp, Clock, Star, Headphones, CheckCircle, Shield } from "lucide-react";
import { useServiceData } from "@/hooks/useServiceData";

const AccountManagement = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('account-management');
  const [activeTab, setActiveTab] = useState('overview');

  const services = [
    {
      icon: Users,
      title: 'Dedicated Account Manager',
      description: 'Personal account manager focused on your success',
      features: ['24/7 Support', 'Strategic Planning', 'Regular Check-ins', 'Performance Reviews']
    },
    {
      icon: Target,
      title: 'Strategic Planning',
      description: 'Comprehensive strategy development and execution',
      features: ['Goal Setting', 'Market Analysis', 'Competitor Research', 'Growth Roadmap']
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Regular performance analysis and optimization',
      features: ['Monthly Reports', 'KPI Tracking', 'ROI Analysis', 'Optimization Plans']
    },
    {
      icon: TrendingUp,
      title: 'Growth Acceleration',
      description: 'Custom growth plans for scaling your business',
      features: ['Scaling Strategies', 'Revenue Growth', 'Market Expansion', 'Process Optimization']
    }
  ];

  const benefits = [
    { icon: Users, title: 'Personal Dedicated Manager', description: 'Get a dedicated account manager who knows your business inside and out' },
    { icon: Target, title: 'Strategic Growth Planning', description: 'Comprehensive growth strategies tailored to your specific goals' },
    { icon: Clock, title: 'Priority Support Access', description: '24/7 priority support with guaranteed response times' },
    { icon: Star, title: 'Performance Optimization', description: 'Continuous optimization for maximum ROI and growth' }
  ];

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Account Management Services - Professional Business Growth"
          description="Get dedicated account management with strategic planning, performance optimization, and growth strategies tailored to your business goals."
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <Header />
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Account Management Services - Professional Business Growth"
        description="Get dedicated account management with strategic planning, performance optimization, and growth strategies tailored to your business goals."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-6">
                  <span className="text-sm font-medium text-blue-700">Professional Account Management</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                  Strategic Account Management Services
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Get dedicated account management with strategic planning, performance optimization, and growth strategies tailored to your business goals.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Get Account Manager
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => setActiveTab('case-studies')}
                  >
                    View Case Studies
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400"
                  alt="Account Management Services"
                  className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
                />
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">98% Client Retention</div>
                      <div className="text-sm text-slate-600">Industry Leading</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {stats.length > 0 && (
          <section className="py-16 bg-white/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
                Our Account Management Results
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => {
                  const getIconComponent = (iconName: string) => {
                    const iconMap = { Users, TrendingUp, Clock, Shield };
                    return iconMap[iconName as keyof typeof iconMap] || Users;
                  };
                  
                  const IconComponent = getIconComponent(stat.icon_name || 'Users');
                  
                  return (
                    <Card key={stat.id} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <CardHeader className="pb-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-4xl font-bold text-slate-900 mb-2">{stat.stat_value}</div>
                        <CardTitle className="text-lg text-slate-800">{stat.stat_label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm">{stat.stat_description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Account Management Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
                    <CardDescription className="text-slate-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-slate-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-8">
                  Why Choose Our Account Management?
                </h2>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                        <p className="text-slate-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to Scale Your Business?</h3>
                <p className="text-slate-600 mb-6">Get a dedicated account manager and start seeing real results within 30 days.</p>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.location.href = '/contact'}
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies & Reviews */}
        {(caseStudies.length > 0 || reviews.length > 0) && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Case Studies */}
                {caseStudies.length > 0 && (
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-8">Success Stories</h3>
                    {caseStudies.map((study) => (
                      <Card key={study.id} className="mb-6">
                        <CardHeader>
                          <CardTitle className="text-xl">{study.title}</CardTitle>
                          <CardDescription>{study.industry}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 mb-4">{study.description}</p>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(study.results).map(([key, value]) => (
                              <div key={key} className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                                <div className="font-bold text-green-600">{value}</div>
                                <div className="text-sm text-slate-600">{key}</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Reviews */}
                {reviews.length > 0 && (
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-8">Client Reviews</h3>
                    {reviews.map((review) => (
                      <Card key={review.id} className="mb-6">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">{review.client_name.charAt(0)}</span>
                            </div>
                            <div>
                              <CardTitle className="text-lg">{review.client_name}</CardTitle>
                              <CardDescription>{review.company}</CardDescription>
                              <div className="flex items-center mt-1">
                                {Array.from({ length: review.rating }, (_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 italic mb-4">"{review.review_text}"</p>
                          {review.results_achieved && (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg">
                              <div className="text-sm font-medium text-green-800">Results Achieved:</div>
                              <div className="text-sm text-green-600">{review.results_achieved}</div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AccountManagement;
