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
        keywords="Amazon Listing Optimization Service, E-commerce Listing Optimization Agency, A+ Content Creation and Optimization, Best Product Listing Optimization Company, Amazon SEO for Product Listings, Product Photography Optimization Services, amazon listing optimization, product listing optimization, amazon seo, listing optimization service, amazon content optimization, product content optimization, ecommerce listing optimization, marketplace listing optimization, amazon a+ content, enhanced brand content amazon, amazon product description, bullet points optimization amazon, product title optimization, backend keywords amazon, search terms amazon, amazon product photography, infographic design amazon, lifestyle images amazon, product image optimization, amazon main image, swatch images amazon, 360 view images, amazon video upload, product video optimization, amazon brand story, amazon comparison chart, amazon size chart, product specifications amazon, product features optimization, amazon product benefits, value proposition amazon, amazon listing copywriting, persuasive copywriting amazon, conversion copywriting, seo copywriting amazon, keyword research amazon, competitor analysis amazon, search volume analysis, keyword difficulty amazon, long tail keywords amazon, buyer keywords amazon, product ranking amazon, organic ranking optimization, search rank improvement amazon, category rank optimization, best seller rank amazon bsr, amazon algorithm optimization, a9 algorithm amazon, relevancy optimization amazon, performance metrics amazon, conversion rate amazon listing, click through rate amazon, add to cart rate amazon, sessions amazon, page views amazon, buy box optimization amazon, amazon choice badge, amazon recommended badge, early reviewer program, vine program amazon, product reviews optimization, review generation amazon, review management amazon, negative review handling, customer questions answers amazon, amazon product qa, listing compliance amazon, terms of service amazon, restricted products amazon, category approval amazon, brand registry benefits, brand analytics amazon, product opportunity explorer, manage your experiments amazon, a b testing amazon listings, multivariate testing amazon, split testing listings, mobile optimization amazon, mobile listing optimization, responsive content amazon, mobile conversion amazon, voice search optimization amazon, alexa shopping optimization, international listings amazon, global expansion amazon, marketplace translation, multi country listings, pan european listings, north america expansion, amazon japan listings, amazon australia optimization, amazon uae listings, seasonal optimization amazon, holiday listing updates, prime day optimization, black friday preparation, cyber monday listings, back to school optimization, gift guide optimization amazon, gifting options amazon, gift wrap eligibility, gift message amazon, subscribe save optimization, subscription program amazon, pantry program amazon, fresh program optimization amazon, amazon launchpad, amazon handmade optimization, luxury beauty amazon, professional services amazon, business listings amazon, amazon business pricing, quantity discounts b2b, b2b product content"
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
