
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Link, Zap, ShoppingCart, BarChart3, Puzzle, CheckCircle, Star, TrendingUp } from "lucide-react";

const ShopifyIntegration = () => {
  const integrations = [
    {
      title: 'Payment Gateways',
      description: 'Seamless integration with multiple payment processors for global reach.',
      icon: ShoppingCart,
      gradient: 'from-green-500 to-emerald-500',
      features: ['Stripe Integration', 'PayPal Setup', 'Apple Pay', 'Google Pay']
    },
    {
      title: 'Analytics & Tracking',
      description: 'Comprehensive tracking setup for marketing and performance analysis.',
      icon: BarChart3,
      gradient: 'from-blue-500 to-indigo-500',
      features: ['Google Analytics 4', 'Facebook Pixel', 'Conversion Tracking', 'Heat Maps']
    },
    {
      title: 'Marketing Tools',
      description: 'Connect your store with powerful marketing and automation platforms.',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
      features: ['Email Marketing', 'SMS Campaigns', 'Loyalty Programs', 'Affiliate Systems']
    },
    {
      title: 'Inventory Management',
      description: 'Advanced inventory synchronization across multiple channels.',
      icon: Puzzle,
      gradient: 'from-orange-500 to-red-500',
      features: ['Multi-Channel Sync', 'Auto-Reorder', 'Stock Alerts', 'Warehouse Management']
    },
    {
      title: 'Customer Support',
      description: 'Integrate customer service tools for better support experience.',
      icon: Star,
      gradient: 'from-cyan-500 to-blue-500',
      features: ['Live Chat', 'Help Desk', 'FAQ Systems', 'Review Management']
    },
    {
      title: 'Performance Optimization',
      description: 'Speed and performance integrations for better user experience.',
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-500',
      features: ['CDN Setup', 'Image Optimization', 'Caching Solutions', 'Core Web Vitals']
    }
  ];

  const stats = [
    { label: 'Integrations Completed', value: '300+', description: 'Successful connections', icon: Link },
    { label: 'Revenue Increase', value: '45%', description: 'Average after integration', icon: TrendingUp },
    { label: 'Setup Time', value: '48hrs', description: 'Average integration time', icon: Zap },
    { label: 'Success Rate', value: '99%', description: 'Integration success rate', icon: CheckCircle }
  ];

  const popularIntegrations = [
    { name: 'Klaviyo', category: 'Email Marketing', logo: '📧' },
    { name: 'Google Analytics', category: 'Analytics', logo: '📊' },
    { name: 'Facebook Pixel', category: 'Advertising', logo: '📱' },
    { name: 'Stripe', category: 'Payments', logo: '💳' },
    { name: 'Mailchimp', category: 'Email Marketing', logo: '🐵' },
    { name: 'Zendesk', category: 'Customer Support', logo: '🎧' }
  ];

  return (
    <>
      <SEOHead 
        title="Shopify Integration Services - Connect Your Store"
        description="Professional Shopify integration services. Connect payment gateways, analytics, marketing tools, and third-party apps to optimize your store."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-6">
                  <span className="text-sm font-medium text-blue-700">Shopify Integration Experts</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                  Shopify Integration Services
                </h1>
                <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-4">
                  Connect & Optimize Your E-commerce Stack
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Maximize your Shopify store's potential with seamless integrations. Connect payment gateways, marketing tools, analytics, and third-party apps for a complete e-commerce solution.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
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
                    onClick={() => document.getElementById('integrations')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Integrations
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400"
                  alt="Shopify Integration Services"
                  className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
                />
                <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Link className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">300+ Apps</div>
                      <div className="text-sm text-slate-600">Successfully Integrated</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Integrations */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Popular Integrations We Setup
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularIntegrations.map((integration, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{integration.logo}</div>
                    <h3 className="font-semibold text-slate-900 mb-2">{integration.name}</h3>
                    <p className="text-sm text-slate-600">{integration.category}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Integration Results
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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

        {/* Integration Services */}
        <section id="integrations" className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Integration Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {integrations.map((integration, index) => {
                const IconComponent = integration.icon;
                return (
                  <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${integration.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                        {integration.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600">
                        {integration.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {integration.features.map((feature, idx) => (
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

        {/* Process Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Integration Process
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Analysis', description: 'We analyze your current setup and requirements' },
                { step: '2', title: 'Planning', description: 'Create integration roadmap and timeline' },
                { step: '3', title: 'Implementation', description: 'Connect and configure all integrations' },
                { step: '4', title: 'Testing', description: 'Thoroughly test all connections and workflows' }
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
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Ready to Connect Your Store?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Let us integrate the tools you need to grow your Shopify business.
            </p>
            
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => window.location.href = '/contact'}
            >
              Start Integration Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ShopifyIntegration;
