import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, TrendingUp, Target, Eye, Image } from 'lucide-react';

const ListingOptimizationPage = () => {
  const navigate = useNavigate();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "E-commerce Listing Optimization",
    "provider": {
      "@type": "Organization",
      "name": "Digital Growth Agency"
    },
    "areaServed": "Worldwide",
    "description": "Amazon Listing Optimization Service, E-commerce Listing Optimization Agency, A+ Content Creation and Optimization, Product Photography Optimization Services"
  };

  const features = [
    {
      icon: Eye,
      title: 'Amazon Listing Optimization Service',
      description: 'Professional Amazon SEO for Product Listings with keyword research, title optimization, and bullet point enhancement for maximum visibility.'
    },
    {
      icon: TrendingUp,
      title: 'A+ Content Creation and Optimization',
      description: 'Best Product Listing Optimization Company creating compelling A+ Content that increases conversion rates and brand engagement.'
    },
    {
      icon: Image,
      title: 'Product Photography Optimization Services',
      description: 'Professional Product Photography Optimization Services with high-quality images, infographics, and lifestyle shots.'
    },
    {
      icon: Target,
      title: 'Amazon SEO for Product Listings',
      description: 'Expert Amazon SEO strategies to improve organic rankings and drive more traffic to your product listings.'
    }
  ];

  const benefits = [
    '250% average increase in product page traffic',
    '185% improvement in conversion rates',
    'Top 5 organic rankings for target keywords',
    'Professional A+ Content design and copywriting',
    'High-quality product photography and infographics',
    'Ongoing listing performance monitoring'
  ];

  return (
    <>
      <SEOHead 
        title="Amazon Listing Optimization Service | E-commerce Listing Optimization Agency"
        description="Best Product Listing Optimization Company offering Amazon Listing Optimization Service, A+ Content Creation and Optimization, Amazon SEO for Product Listings, and Product Photography Optimization Services."
        keywords="Amazon Listing Optimization Service, E-commerce Listing Optimization Agency, A+ Content Creation and Optimization, Best Product Listing Optimization Company, Amazon SEO for Product Listings, Product Photography Optimization Services"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schema={schema}
      />
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
                E-commerce Listing Optimization
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                Amazon Listing Optimization Service
              </h1>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">
                Best Product Listing Optimization Company | A+ Content Creation
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
                Leading E-commerce Listing Optimization Agency specializing in Amazon Listing Optimization Service, A+ Content Creation and Optimization, Amazon SEO for Product Listings, and Product Photography Optimization Services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 text-lg"
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
                  Free Listing Audit
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
                Our Listing Optimization Services
              </h2>
              <p className="text-xl text-slate-600">
                Comprehensive E-commerce Listing Optimization solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center mb-4">
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
                Why Choose Our Listing Optimization Agency
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
              Ready to Optimize Your Product Listings?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Partner with the Best Product Listing Optimization Company for proven results
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 text-lg"
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

export default ListingOptimizationPage;
