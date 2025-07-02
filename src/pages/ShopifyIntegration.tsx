
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Link, RefreshCw, Zap, Settings, CheckCircle, Shield, Store, Package, BarChart3 } from "lucide-react";
import { useServiceData } from "@/hooks/useServiceData";

const ShopifyIntegration = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('shopify-integration');

  const services = [
    {
      icon: Link,
      title: 'Platform Integration',
      description: 'Connect Shopify with marketing and analytics platforms',
      features: ['Marketing Tools', 'Analytics Platforms', 'CRM Systems', 'Email Marketing']
    },
    {
      icon: RefreshCw,
      title: 'Data Synchronization',
      description: 'Real-time data sync across all connected systems',
      features: ['Real-time Sync', 'Data Mapping', 'Error Handling', 'Automated Updates']
    },
    {
      icon: Zap,
      title: 'Automated Workflows',
      description: 'Set up automated processes for efficiency',
      features: ['Order Processing', 'Inventory Management', 'Customer Segmentation', 'Marketing Automation']
    },
    {
      icon: Settings,
      title: 'Custom Solutions',
      description: 'Tailored integrations for specific business needs',
      features: ['Custom APIs', 'Webhooks', 'Data Transformation', 'Business Logic']
    }
  ];

  const marketplaceIntegrations = [
    {
      name: 'Amazon',
      logo: '🛒',
      description: 'Sync products, inventory, and orders with Amazon marketplace',
      features: ['Product Listing Sync', 'Inventory Management', 'Order Processing', 'Pricing Updates'],
      color: 'from-orange-500 to-yellow-500'
    },
    {
      name: 'Walmart',
      logo: '🏪',
      description: 'Connect to Walmart marketplace for expanded reach',
      features: ['Catalog Integration', 'Multi-channel Inventory', 'Order Fulfillment', 'Analytics Sync'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'eBay',
      logo: '🏷️',
      description: 'List and manage products on eBay from your Shopify store',
      features: ['Auction Listings', 'Fixed Price Sync', 'Feedback Management', 'Sales Tracking'],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const integrationPlatforms = [
    { name: 'Google Analytics', logo: '📊', description: 'Track and analyze store performance' },
    { name: 'Facebook Ads', logo: '📘', description: 'Sync customer data and track conversions' },
    { name: 'Mailchimp', logo: '📧', description: 'Automate email marketing campaigns' },
    { name: 'Klaviyo', logo: '💌', description: 'Advanced email and SMS marketing' },
    { name: 'HubSpot', logo: '🎯', description: 'CRM and marketing automation' },
    { name: 'Zapier', logo: '⚡', description: 'Connect with 5000+ apps and services' }
  ];

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Shopify Integration Services - Seamless Platform Connections"
          description="Connect your Shopify store with marketing platforms, automation tools, and analytics systems for streamlined operations and better performance."
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
        title="Shopify Integration Services - Seamless Platform Connections"
        description="Connect your Shopify store with marketing platforms, automation tools, and analytics systems for streamlined operations and better performance."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full border border-cyan-200/50 mb-6">
                <span className="text-sm font-medium text-cyan-700">Shopify Integration Experts</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                Shopify Integration Services
              </h1>
              <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-4">
                Connect with Major Marketplaces & Platforms
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                Connect your Shopify store with Amazon, Walmart, eBay, and other major marketplaces. Streamline operations with marketing platforms and automation tools for maximum efficiency.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => window.location.href = '/contact'}
                >
                  Start Integration
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => document.getElementById('marketplace-integrations')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Integrations
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace Integrations */}
        <section id="marketplace-integrations" className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
              Marketplace Integrations
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Expand your reach by connecting your Shopify store to major e-commerce marketplaces
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {marketplaceIntegrations.map((marketplace, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className={`w-20 h-20 bg-gradient-to-r ${marketplace.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl">{marketplace.logo}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">{marketplace.name} Integration</CardTitle>
                    <CardDescription className="text-slate-600">{marketplace.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {marketplace.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-slate-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Setup {marketplace.name} Integration
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Benefits */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-8">
                  Why Integrate Multiple Marketplaces?
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Store className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Expand Market Reach</h3>
                      <p className="text-slate-600">Access millions of customers across Amazon, Walmart, and eBay marketplaces from a single Shopify dashboard.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Unified Inventory Management</h3>
                      <p className="text-slate-600">Sync inventory levels across all platforms automatically to prevent overselling and stockouts.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Centralized Analytics</h3>
                      <p className="text-slate-600">Track performance across all channels with unified reporting and analytics dashboards.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Risk Diversification</h3>
                      <p className="text-slate-600">Reduce dependency on single platforms by diversifying your sales channels and customer base.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400"
                  alt="Multi-channel E-commerce"
                  className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
                />
                <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">3x Sales Growth</div>
                      <div className="text-sm text-slate-600">Multi-channel Average</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marketing Platform Integrations */}
        <section className="py-16 bg-gradient-to-br from-cyan-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Marketing & Analytics Platforms
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrationPlatforms.map((platform, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{platform.logo}</div>
                    <h3 className="font-semibold text-slate-900 mb-2">{platform.name}</h3>
                    <p className="text-sm text-slate-600">{platform.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {stats.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
                Integration Results
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => {
                  const getIconComponent = (iconName: string) => {
                    const iconMap = { Link, RefreshCw, Zap, Settings };
                    return iconMap[iconName as keyof typeof iconMap] || Link;
                  };
                  
                  const IconComponent = getIconComponent(stat.icon_name || 'Link');
                  
                  return (
                    <Card key={stat.id} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <CardHeader className="pb-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
              Our Integration Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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

        {/* Process Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Integration Process
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <CardTitle>Platform Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">We analyze your current setup and identify the best integration opportunities for your business.</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <CardTitle>Integration Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">We configure and connect your platforms with proper data mapping and error handling systems.</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <CardTitle>Testing & Validation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">We thoroughly test all integrations to ensure data accuracy and system reliability.</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <CardTitle>Ongoing Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">We provide continuous monitoring and support to ensure optimal performance.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Ready to Expand Your Reach?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Connect your Shopify store to major marketplaces and start selling everywhere your customers shop.
            </p>
            
            <Button 
              size="lg"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
