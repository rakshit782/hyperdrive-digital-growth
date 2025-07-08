import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Heart, Share2, Target, TrendingUp, Eye, Zap, CheckCircle, Star } from "lucide-react";
import { useServiceData } from "@/hooks/useServiceData";
import { useServiceHeaderImages } from "@/hooks/useServiceHeaderImages";

const MetaAdvertising = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('meta-advertising');
  const { imageUrl, altText } = useServiceHeaderImages('meta-advertising');

  const services = [
    {
      title: 'Facebook Ads',
      description: 'Targeted advertising campaigns on the world\'s largest social network',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-500',
      features: ['Audience Targeting', 'Campaign Optimization', 'Creative Testing', 'Performance Tracking']
    },
    {
      title: 'Instagram Ads',
      description: 'Visual storytelling through engaging Instagram advertising campaigns',
      icon: Heart,
      gradient: 'from-pink-500 to-purple-500',
      features: ['Story Ads', 'Feed Advertising', 'Reels Promotion', 'Shopping Ads']
    },
    {
      title: 'Audience Development',
      description: 'Build and optimize custom audiences for maximum campaign effectiveness',
      icon: Target,
      gradient: 'from-green-500 to-emerald-500',
      features: ['Custom Audiences', 'Lookalike Audiences', 'Interest Targeting', 'Behavioral Targeting']
    },
    {
      title: 'Creative Strategy',
      description: 'Compelling ad creatives that capture attention and drive conversions',
      icon: Share2,
      gradient: 'from-orange-500 to-red-500',
      features: ['Ad Copy Writing', 'Visual Design', 'Video Production', 'A/B Testing']
    }
  ];

  const benefits = [
    {
      title: 'Massive Reach',
      description: 'Access to over 3 billion active users across Facebook and Instagram platforms.',
      icon: 'Users',
      color: 'bg-blue-500'
    },
    {
      title: 'Precise Targeting',
      description: 'Advanced targeting options to reach your ideal customers with laser precision.',
      icon: 'Target',
      color: 'bg-green-500'
    },
    {
      title: 'Visual Storytelling',
      description: 'Engage audiences with compelling visual content that drives action.',
      icon: 'Eye',
      color: 'bg-purple-500'
    },
    {
      title: 'Real-time Optimization',
      description: 'Continuous campaign optimization for maximum ROI and performance.',
      icon: 'Zap',
      color: 'bg-orange-500'
    }
  ];

  const platformStats = [
    { platform: 'Facebook', users: '2.9B', engagement: '58 min/day', icon: '📘' },
    { platform: 'Instagram', users: '2B', engagement: '53 min/day', icon: '📷' },
    { platform: 'Messenger', users: '1.3B', engagement: 'High Intent', icon: '💬' },
    { platform: 'WhatsApp', users: '2B', engagement: 'Direct Connect', icon: '💚' }
  ];

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Meta Advertising Services - Facebook & Instagram Ads Management"
          description="Professional Meta advertising services for Facebook and Instagram. Drive engagement, increase conversions, and grow your business with targeted social media advertising."
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
        title="Meta Advertising Services - Facebook & Instagram Ads Management"
        description="Professional Meta advertising services for Facebook and Instagram. Drive engagement, increase conversions, and grow your business with targeted social media advertising."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-6">
                  <span className="text-sm font-medium text-blue-700">Meta Advertising Experts</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                  Meta Advertising Services
                </h1>
                <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-4">
                  Facebook & Instagram Ads Management
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Drive engagement, increase conversions, and grow your business with targeted social media advertising on Facebook and Instagram.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => window.location.href = '/free-audit'}
                  >
                    Get Free Meta Audit
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => window.location.href = '/case-studies'}
                  >
                    View Case Studies
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src={imageUrl || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop&crop=center"}
                  alt={altText || "Meta Advertising Services"}
                  className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
                />
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">5M+ Reach</div>
                      <div className="text-sm text-slate-600">Average Campaign Reach</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Stats */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Meta Platform Reach
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformStats.map((platform, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{platform.icon}</div>
                    <h3 className="font-semibold text-slate-900 mb-2">{platform.platform}</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-1">{platform.users}</div>
                    <p className="text-sm text-slate-600">{platform.engagement}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {stats.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
                Meta Advertising Results
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => {
                  const getIconComponent = (iconName: string) => {
                    const iconMap = { Users, TrendingUp, Target, Zap };
                    return iconMap[iconName as keyof typeof iconMap] || Users;
                  };
                  
                  const IconComponent = getIconComponent(stat.icon_name || 'Users');
                  
                  return (
                    <Card key={stat.id} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
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
              Our Meta Advertising Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
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
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        {caseStudies.length > 0 && (
          <section className="py-16 bg-white/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
                Success Stories
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudies.map((study, index) => (
                  <Card key={study.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{study.client_name}</CardTitle>
                          <p className="text-sm text-slate-600">{study.industry}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">{study.challenge}</p>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{study.result_metric}</div>
                        <p className="text-sm text-slate-600">{study.result_description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
                Client Reviews
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <Card key={review.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-slate-600 mb-4 italic">"{review.review_text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {review.client_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{review.client_name}</div>
                          <div className="text-sm text-slate-600">{review.client_title}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-6">
                  Why Choose Our Meta Advertising Management?
                </h2>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => {
                    const getIconComponent = (iconName: string) => {
                      const iconMap = { Users, Target, Eye, Zap };
                      return iconMap[iconName as keyof typeof iconMap] || Users;
                    };
                    
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
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to Scale Your Social Media Advertising?</h3>
                <p className="text-slate-600 mb-6">
                  Get a free Meta advertising audit and discover how we can help you reach more customers and drive more conversions.
                </p>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.location.href = '/free-audit'}
                >
                  Get Free Meta Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default MetaAdvertising;
