
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, Palette, Zap, Monitor, Smartphone, Search, CheckCircle, Star, Globe, Layers, Rocket } from "lucide-react";

const WebsiteDevelopment = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const services = [
    {
      title: 'Custom Web Development',
      description: 'Bespoke website solutions built with modern technologies for optimal performance.',
      icon: Code,
      gradient: 'from-blue-500 to-indigo-500',
      features: ['React & Next.js', 'TypeScript', 'Modern Frameworks', 'API Integration']
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first approach ensuring perfect display across all devices and screen sizes.',
      icon: Smartphone,
      gradient: 'from-green-500 to-emerald-500',
      features: ['Mobile Optimization', 'Cross-Device Testing', 'Adaptive Layouts', 'Touch-Friendly UI']
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed for maximum user engagement and conversion.',
      icon: Palette,
      gradient: 'from-purple-500 to-pink-500',
      features: ['User Research', 'Wireframing', 'Prototyping', 'User Testing']
    },
    {
      title: 'Performance Optimization',
      description: 'Lightning-fast loading speeds and optimal performance for better SEO rankings.',
      icon: Zap,
      gradient: 'from-orange-500 to-red-500',
      features: ['Speed Optimization', 'Core Web Vitals', 'Image Compression', 'Caching Strategy']
    },
    {
      title: 'SEO Integration',
      description: 'Built-in SEO optimization to improve search engine visibility and organic traffic.',
      icon: Search,
      gradient: 'from-cyan-500 to-blue-500',
      features: ['On-Page SEO', 'Technical SEO', 'Schema Markup', 'Meta Optimization']
    },
    {
      title: 'Cross-Browser Compatibility',
      description: 'Ensure your website works flawlessly across all major browsers and platforms.',
      icon: Monitor,
      gradient: 'from-teal-500 to-green-500',
      features: ['Browser Testing', 'Progressive Enhancement', 'Polyfills', 'Graceful Degradation']
    }
  ];

  const stats = [
    { label: 'Projects Completed', value: '500+', description: 'Successful websites delivered', icon: Globe },
    { label: 'Client Satisfaction', value: '98%', description: 'Happy clients rate', icon: Star },
    { label: 'Page Load Speed', value: '<2s', description: 'Average loading time', icon: Zap },
    { label: 'SEO Score', value: '95+', description: 'Average SEO performance', icon: Search }
  ];

  const technologies = [
    { name: 'React', icon: '⚛️', description: 'Modern frontend framework' },
    { name: 'Next.js', icon: '🔺', description: 'Full-stack React framework' },
    { name: 'TypeScript', icon: '🔷', description: 'Type-safe JavaScript' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS framework' },
    { name: 'Node.js', icon: '🟢', description: 'Server-side JavaScript' },
    { name: 'PostgreSQL', icon: '🐘', description: 'Reliable database solution' }
  ];

  const features = [
    {
      title: 'Lightning Fast Performance',
      description: 'Optimized for speed with advanced caching, image optimization, and minimal code bloat.',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400'
    },
    {
      title: 'Mobile-First Design',
      description: 'Beautiful, responsive designs that work perfectly on all devices and screen sizes.',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400'
    },
    {
      title: 'SEO Optimized',
      description: 'Built with SEO best practices to help your website rank higher in search results.',
      icon: Search,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400'
    }
  ];

  return (
    <>
      <SEOHead 
        title="Website Development Services - Custom Web Solutions"
        description="Professional website development services. Custom web solutions, responsive design, and performance optimization for businesses of all sizes."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full border border-emerald-200/50 mb-6">
                  <span className="text-sm font-medium text-emerald-700">Web Development Experts</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                  Website Development Services
                </h1>
                <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-4">
                  Custom Web Solutions & Digital Excellence
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Transform your digital presence with custom website development that drives results. We create fast, responsive, and SEO-optimized websites that convert visitors into customers.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => window.location.href = '/free-audit'}
                  >
                    Get Free Consultation
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
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400"
                  alt="Website Development Services"
                  className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
                />
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">500+ Projects</div>
                      <div className="text-sm text-slate-600">Successfully Delivered</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Modern Technologies We Use
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                    <h3 className="font-semibold text-slate-900 mb-2">{tech.name}</h3>
                    <p className="text-sm text-slate-600">{tech.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Features Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Why Choose Our Development Services
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all duration-300 ${
                      activeFeature === index 
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          activeFeature === index 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                            : 'bg-slate-100'
                        }`}>
                          <feature.icon className={`w-6 h-6 ${
                            activeFeature === index ? 'text-white' : 'text-slate-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                          <p className="text-slate-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="relative">
                <img
                  src={features[activeFeature].image}
                  alt={features[activeFeature].title}
                  className="rounded-2xl shadow-2xl object-cover w-full h-[400px] transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Development Results
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                    <CardTitle className="text-lg text-slate-800">{stat.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Development Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                            <CheckCircle className={`w-4 h-4 mr-2 text-emerald-500`} />
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Ready to Build Your Dream Website?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Get a custom website that drives results and grows your business online.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => window.location.href = '/free-audit'}
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-emerald-300 bg-white/80 backdrop-blur-sm hover:bg-white text-emerald-800 px-12 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = '/contact'}
              >
                Get Quote
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default WebsiteDevelopment;
