
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette, Zap, Monitor, Smartphone, Search } from "lucide-react";

const WebsiteDevelopment = () => {
  const services = [
    {
      title: 'Custom Web Development',
      description: 'Bespoke website solutions built with modern technologies for optimal performance.',
      icon: Code,
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first approach ensuring perfect display across all devices and screen sizes.',
      icon: Smartphone,
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed for maximum user engagement and conversion.',
      icon: Palette,
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'Performance Optimization',
      description: 'Lightning-fast loading speeds and optimal performance for better SEO rankings.',
      icon: Zap,
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      title: 'SEO Integration',
      description: 'Built-in SEO optimization to improve search engine visibility and organic traffic.',
      icon: Search,
      gradient: 'bg-gradient-to-r from-cyan-500 to-blue-500'
    },
    {
      title: 'Cross-Browser Compatibility',
      description: 'Ensure your website works flawlessly across all major browsers and platforms.',
      icon: Monitor,
      gradient: 'bg-gradient-to-r from-teal-500 to-green-500'
    }
  ];

  const stats = [
    { label: 'Projects Completed', value: '500+', description: 'Successful websites delivered' },
    { label: 'Client Satisfaction', value: '98%', description: 'Happy clients rate' },
    { label: 'Page Load Speed', value: '<2s', description: 'Average loading time' },
    { label: 'SEO Score', value: '95+', description: 'Average SEO performance' }
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
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="mb-8">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop&crop=center"
                alt="Website Development Services"
                className="w-full max-w-md mx-auto rounded-2xl shadow-lg object-cover"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Website Development Services
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-4">
              Custom Web Solutions & Digital Excellence
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
              Transform your digital presence with custom website development that drives results. We create fast, responsive, and SEO-optimized websites that convert visitors into customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => window.location.href = '/free-audit'}
              >
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = '/case-studies'}
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Development Results
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-48 flex flex-col justify-center">
                  <div className="text-4xl font-bold text-slate-900 mb-3">{stat.value}</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{stat.label}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{stat.description}</p>
                </div>
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
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 h-72 flex flex-col">
                    <div className={`w-12 h-12 ${service.gradient} rounded-xl flex items-center justify-center mb-6`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed flex-grow">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Ready to Build Your Dream Website?
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Get a custom website that drives results and grows your business online.
              </p>
              
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = '/free-audit'}
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
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
