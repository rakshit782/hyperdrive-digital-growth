
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Zap, Link, BarChart3 } from "lucide-react";

const ShopifyIntegration = () => {
  const services = [
    {
      title: 'Platform Integration',
      description: 'Seamless integration with marketing platforms, payment gateways, and third-party tools.',
      icon: Link,
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Automated Workflows',
      description: 'Set up automated processes for inventory, orders, and customer communications.',
      icon: Zap,
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      title: 'Custom Configuration',
      description: 'Tailored setup and configuration to match your specific business requirements.',
      icon: Settings,
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'Analytics Integration',
      description: 'Connect advanced analytics and reporting tools for comprehensive insights.',
      icon: BarChart3,
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ];

  return (
    <>
      <SEOHead 
        title="Shopify Integration Services - Platform Connectivity & Automation"
        description="Professional Shopify integration services. Connect your store with marketing platforms, automate workflows, and optimize your e-commerce operations."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Shopify Integration Services
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-4">
              Platform Connectivity & Automation
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
              Seamlessly integrate your Shopify store with marketing platforms, payment systems, and automation tools to streamline operations and boost performance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => window.location.href = '/contact'}
              >
                Start Integration
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = '/shopify-development'}
              >
                View Development
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Integration Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                    <div className={`w-12 h-12 ${service.gradient} rounded-xl flex items-center justify-center mb-6`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>
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
                Ready to Integrate Your Shopify Store?
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Connect your store with powerful tools and automation to streamline operations and accelerate growth.
              </p>
              
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = '/contact'}
              >
                Get Started
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

export default ShopifyIntegration;
