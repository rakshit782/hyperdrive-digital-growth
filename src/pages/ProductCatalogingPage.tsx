import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Database, Package, BarChart, FileText } from 'lucide-react';

const ProductCatalogingPage = () => {
  const navigate = useNavigate();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "E-commerce Product Cataloging",
    "provider": {
      "@type": "Organization",
      "name": "Digital Growth Agency"
    },
    "areaServed": "Worldwide",
    "description": "E-commerce Product Cataloging Services, Multi-channel Product Catalog Management, Product Data Management Agency, Product Information Management (PIM) Service"
  };

  const features = [
    {
      icon: Database,
      title: 'E-commerce Product Cataloging Services',
      description: 'Professional Product Data Management Agency offering comprehensive cataloging solutions for online retailers.'
    },
    {
      icon: Package,
      title: 'Multi-channel Product Catalog Management',
      description: 'Centralized Multi-channel Product Catalog Management across Amazon, Walmart, Shopify, and more.'
    },
    {
      icon: FileText,
      title: 'Product Information Management (PIM) Service',
      description: 'Advanced Product Information Management (PIM) Service for accurate product data across all channels.'
    },
    {
      icon: BarChart,
      title: 'SKU and Inventory Cataloging Solutions',
      description: 'Expert SKU and Inventory Cataloging Solutions with Product Catalog Setup and Clean-up services.'
    }
  ];

  const benefits = [
    '99.9% product data accuracy across all channels',
    '75% reduction in cataloging time and errors',
    'Automated Product Catalog Setup and Clean-up',
    'Real-time inventory synchronization',
    'Dedicated Product Data Management team',
    'Ongoing catalog maintenance and optimization'
  ];

  return (
    <>
      <SEOHead 
        title="E-commerce Product Cataloging Services | Product Data Management Agency"
        description="Professional Product Data Management Agency offering E-commerce Product Cataloging Services, Multi-channel Product Catalog Management, Product Information Management (PIM) Service, and SKU and Inventory Cataloging Solutions."
        keywords="E-commerce Product Cataloging Services, Multi-channel Product Catalog Management, Product Data Management Agency, Product Catalog Setup and Clean-up, Product Information Management (PIM) Service, SKU and Inventory Cataloging Solutions"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schema={schema}
      />
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0">
                Product Data Management
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                E-commerce Product Cataloging Services
              </h1>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">
                Product Data Management Agency | Multi-channel Catalog Management
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
                Leading Product Data Management Agency specializing in E-commerce Product Cataloging Services, Multi-channel Product Catalog Management, Product Information Management (PIM) Service, and SKU and Inventory Cataloging Solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 text-lg"
                  onClick={() => navigate('/contact')}
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg"
                  onClick={() => navigate('/contact')}
                >
                  Free Catalog Audit
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Product Cataloging Services
              </h2>
              <p className="text-xl text-slate-600">
                Comprehensive Product Data Management solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose Our Product Data Management Agency
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Ready to Optimize Your Product Catalog?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Partner with our Product Data Management Agency for professional cataloging services
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 text-lg"
              onClick={() => navigate('/contact')}
            >
              Start Your Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default ProductCatalogingPage;
