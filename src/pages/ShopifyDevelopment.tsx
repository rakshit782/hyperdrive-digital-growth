
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, Palette, Zap, Monitor, Smartphone, Search, CheckCircle, Star } from "lucide-react";
import { useServiceData } from "@/hooks/useServiceData";

const ShopifyDevelopment = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('shopify-development');

  const services = [
    {
      icon: Code,
      title: 'Custom Development',
      description: 'Bespoke Shopify solutions tailored to your needs',
      features: ['Custom Themes', 'App Development', 'API Integration', 'Custom Functions']
    },
    {
      icon: Palette,
      title: 'Theme Customization',
      description: 'Performance and conversion-focused theme updates',
      features: ['Design Optimization', 'Mobile Responsive', 'Brand Alignment', 'UX Enhancement']
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Speed optimization and technical improvements',
      features: ['Page Speed', 'Core Web Vitals', 'Image Optimization', 'Code Minification']
    },
    {
      icon: Monitor,
      title: 'Technical Support',
      description: 'Ongoing maintenance and technical assistance',
      features: ['Bug Fixes', 'Updates', '24/7 Support', 'Performance Monitoring']
    }
  ];

  const technologies = [
    { name: 'Liquid', icon: '🧪', description: 'Shopify\'s templating language' },
    { name: 'JavaScript', icon: '⚡', description: 'Interactive functionality' },
    { name: 'CSS/SCSS', icon: '🎨', description: 'Styling and animations' },
    { name: 'Shopify CLI', icon: '🛠️', description: 'Development tools' },
    { name: 'GraphQL', icon: '📊', description: 'Data querying' },
    { name: 'Webhooks', icon: '🔗', description: 'Real-time integrations' }
  ];

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Custom Shopify Development - Performance & Conversion Optimization"
          description="Professional Shopify development services including custom themes, app integration, and performance optimization to maximize your store's potential."
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
        title="Custom Shopify Development - Performance & Conversion Optimization"
        description="Professional Shopify development services including custom themes, app integration, and performance optimization to maximize your store's potential."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full border border-orange-200/50 mb-6">
                  <span className="text-sm font-medium text-orange-700">Shopify Development Experts</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                  Custom Shopify Development
                </h1>
                <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-4">
                  Performance & Conversion Optimization
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Professional Shopify development services including custom themes, app integration, and performance optimization to maximize your store's potential.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Start Development
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Portfolio
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400"
                  alt="Shopify Development"
                  className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
                />
                <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">200% Faster</div>
                      <div className="text-sm text-slate-600">Page Load Speed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Technologies We Use
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{tech.icon}</div>
                    <h3 className="font-semibold text-slate-900 mb-2">{tech.name}</h3>
                    <p className="text-sm text-slate-600">{tech.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {stats.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
                Development Results
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => {
                  const getIconComponent = (iconName: string) => {
                    const iconMap = { Zap, Code, Palette, Monitor };
                    return iconMap[iconName as keyof typeof iconMap] || Zap;
                  };
                  
                  const IconComponent = getIconComponent(stat.icon_name || 'Zap');
                  
                  return (
                    <Card key={stat.id} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <CardHeader className="pb-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
        <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Development Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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

        {/* Development Process */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Development Process
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Discovery', description: 'Understanding your requirements and goals' },
                { step: '2', title: 'Design', description: 'Creating wireframes and visual designs' },
                { step: '3', title: 'Development', description: 'Building and coding your solution' },
                { step: '4', title: 'Testing', description: 'Quality assurance and optimization' }
              ].map((phase, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">{phase.step}</span>
                    </div>
                    <CardTitle className="text-lg">{phase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">{phase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Ready to Transform Your Store?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Get custom Shopify development that drives conversions and delivers exceptional user experience.
            </p>
            
            <Button 
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => window.location.href = '/contact'}
            >
              Start Development Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ShopifyDevelopment;
