import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, TrendingUp, Award, Users, Target } from 'lucide-react';
import { useServiceData } from '@/hooks/useServiceData';
import { realBrandCaseStudies } from '@/data/realBrandCaseStudies';

const serviceConfigs: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: string[];
  gradient: string;
}> = {
  'amazon-advertising': {
    title: 'Amazon Advertising Agency - Expert PPC Management Service',
    subtitle: 'Amazon Ads Expert | Amazon DSP Agency | Amazon Sponsored Products Management',
    description: 'Leading Amazon Advertising Agency specializing in Amazon PPC Management Service, Amazon DSP campaigns, and Amazon Sponsored Products Management. Our Amazon Ads Experts deliver proven PPC audit and optimization strategies that drive 350% average sales growth.',
    features: [
      'Amazon PPC Management Service - Campaign setup and optimization',
      'Amazon Ads Expert - Advanced keyword research and competitive analysis',
      'Amazon Listing Optimization Service - Maximum conversion rates',
      'A+ Content Creation and Optimization - Enhanced Brand Content',
      'Amazon DSP Agency - Display and video advertising',
      'Amazon Sponsored Products Management - Real-time bid optimization',
      'Amazon PPC Audit and Optimization - Detailed performance analytics',
      'Amazon SEO for Product Listings - Organic ranking improvements'
    ],
    benefits: [
      '350% average sales increase within 90 days',
      '45% reduction in advertising cost of sales (ACoS)',
      'Top 3 organic rankings for target keywords',
      '24/7 Amazon PPC campaign monitoring and optimization',
      'Dedicated Amazon Ads Expert specialist',
      'Transparent reporting and regular strategy calls'
    ],
    gradient: 'from-orange-500 to-yellow-500'
  },
  'google-advertising': {
    title: 'Google Advertising Management',
    subtitle: 'Drive Targeted Traffic & Conversions with Google Ads',
    description: 'Maximize your ROI with strategic Google Ads campaigns designed to drive qualified traffic and conversions. Our certified Google Ads specialists manage every aspect of your campaigns to ensure optimal performance and continuous growth.',
    features: [
      'Google Search Ads campaign management',
      'Shopping Ads optimization for e-commerce',
      'Display advertising for brand awareness',
      'YouTube video advertising campaigns',
      'Remarketing and audience targeting strategies',
      'Conversion rate optimization and landing page testing',
      'Advanced keyword research and competitor analysis',
      'Google Analytics integration and tracking setup'
    ],
    benefits: [
      '650% average return on ad spend (ROAS)',
      '87% improvement in conversion rates',
      '45% reduction in cost per click (CPC)',
      '9.2/10 average quality score across accounts',
      'Google Ads certified specialists',
      'Weekly performance reports and optimization'
    ],
    gradient: 'from-blue-500 to-indigo-500'
  },
  'meta-advertising': {
    title: 'Meta Advertising (Facebook & Instagram)',
    subtitle: 'Scale Your Business with Social Media Advertising',
    description: 'Leverage the power of Facebook and Instagram advertising to reach your ideal customers. Our Meta advertising experts create campaigns that drive engagement, conversions, and measurable business growth through strategic targeting and creative optimization.',
    features: [
      'Facebook and Instagram Ads campaign management',
      'Advanced audience targeting and lookalike audiences',
      'Creative testing and ad copy optimization',
      'Instagram Shopping and product catalog integration',
      'Facebook Pixel implementation and tracking',
      'Messenger and WhatsApp advertising campaigns',
      'Retargeting and customer journey optimization',
      'Influencer partnership coordination'
    ],
    benefits: [
      '340% average reach increase',
      '12.5% average engagement rate',
      '38% reduction in cost per thousand impressions',
      '8.9% average click-through rate',
      'Meta Blueprint certified specialists',
      'Daily campaign monitoring and creative refresh'
    ],
    gradient: 'from-purple-500 to-pink-500'
  },
  'walmart-advertising': {
    title: 'Walmart Advertising Agency - Walmart Connect Partner',
    subtitle: 'Walmart Sponsored Products Expert | Walmart Performance Ads Management',
    description: 'Certified Walmart Advertising Agency and Walmart Connect Partner specializing in Walmart Sponsored Products, Walmart Performance Ads Management, and comprehensive Walmart Advertising Strategy. Expert Walmart Marketplace Ad Agency services.',
    features: [
      'Walmart Connect Partner - Official advertising campaign management',
      'Walmart Sponsored Products Expert - Optimization and scaling',
      'Walmart Performance Ads Management - ROI-focused strategies',
      'Walmart Advertising Strategy - Competitive positioning',
      'Walmart Marketplace Ad Agency - Item performance score improvement',
      'Product listing optimization for Walmart marketplace',
      'Walmart DSP advertising for brand awareness',
      'Performance analytics and ROI tracking'
    ],
    benefits: [
      '425% average revenue growth on Walmart',
      '78% improvement in item performance score',
      '340% increase in Walmart search visibility',
      '55% reduction in wasted ad spend',
      'Dedicated Walmart Connect Partner specialist',
      'Access to exclusive Walmart beta features'
    ],
    gradient: 'from-blue-600 to-blue-400'
  },
  'website-development': {
    title: 'Website Development Services',
    subtitle: 'Build High-Performance Websites That Convert',
    description: 'Create stunning, high-performance websites that drive results. Our expert developers build custom websites optimized for speed, SEO, and conversions using the latest technologies and best practices.',
    features: [
      'Custom website design and development',
      'Responsive mobile-first design',
      'SEO optimization and technical SEO',
      'Page speed optimization (95+ scores)',
      'E-commerce integration and payment processing',
      'Content management system (CMS) setup',
      'Security implementation and SSL certificates',
      'Ongoing maintenance and support packages'
    ],
    benefits: [
      '95/100 average PageSpeed Insights score',
      '92/100 average SEO optimization score',
      '96% WCAG accessibility compliance',
      '4.9/5 average client satisfaction',
      'Fast turnaround times (2-6 weeks)',
      'Post-launch support and training'
    ],
    gradient: 'from-green-500 to-emerald-500'
  },
  'shopify-development': {
    title: 'Shopify Development Partner - Professional Shopify Developers',
    subtitle: 'Custom Shopify Theme Development | Shopify Plus Development Experts',
    description: 'Certified Shopify Development Partner with Professional Shopify Developers specializing in Custom Shopify Theme Development Agency services, Shopify E-commerce Store Development, Shopify Store Migration Services, and Shopify Plus Development for enterprise brands.',
    features: [
      'Custom Shopify Theme Development Agency - Unique designs',
      'Shopify Plus Development Experts - Enterprise solutions',
      'Shopify E-commerce Store Development - Complete setups',
      'Shopify Store Migration Services - Platform transfers',
      'Professional Shopify Developers - Custom app integration',
      'Shopify Development Partner - Official certification',
      'Mobile-responsive Shopify theme optimization',
      'Performance optimization and speed improvements'
    ],
    benefits: [
      '4.8% average store conversion rate',
      '98% mobile performance score',
      '2.1s average page load time',
      '99.5% security and compliance rating',
      'Certified Shopify Development Partner team',
      'Unlimited revisions during development'
    ],
    gradient: 'from-green-600 to-teal-500'
  },
  'shopify-integration': {
    title: 'Multi-Marketplace Integration Agency',
    subtitle: 'Integrate Shopify with Amazon FBA | Multi-Channel E-commerce Integration',
    description: 'Leading Multi-Marketplace Integration Agency offering comprehensive Multi-Channel E-commerce Integration Service. Expert in Integrate Shopify with Amazon FBA, Walmart to Shopify Product Sync Solution, and Best Multi-Marketplace Sync Software for E-commerce Channel Management Solutions.',
    features: [
      'Multi-Marketplace Integration Agency - Amazon, Walmart, eBay',
      'Integrate Shopify with Amazon FBA - Real-time inventory sync',
      'Walmart to Shopify Product Sync Solution - Order fulfillment',
      'Multi-Channel E-commerce Integration Service - Centralized management',
      'E-commerce Channel Management Solutions - Unified dashboard',
      'Best Multi-Marketplace Sync Software - Automated operations',
      'Product catalog mapping and attribute synchronization',
      'Multi-channel pricing strategy and dynamic repricing'
    ],
    benefits: [
      '450% average sales increase from multi-channel selling',
      '99.7% inventory accuracy across all platforms',
      'Real-time sync within 5 minutes',
      '78% reduction in overselling and stockouts',
      '92% faster order processing time',
      'Single dashboard for all marketplace operations',
      'Dedicated Multi-Marketplace Integration specialist',
      '24/7 monitoring and instant error alerts'
    ],
    gradient: 'from-cyan-500 to-blue-500'
  },
  'account-management': {
    title: 'Dedicated Account Management',
    subtitle: 'Expert Management for Sustained Business Growth',
    description: 'Get a dedicated account manager who acts as an extension of your team. Our account management services ensure consistent growth, strategic optimization, and proactive support across all your marketing channels.',
    features: [
      'Dedicated senior account manager',
      'Weekly strategy calls and performance reviews',
      'Multi-channel campaign coordination',
      'Custom reporting and analytics dashboards',
      'Proactive optimization recommendations',
      'Budget management and forecasting',
      'Competitive analysis and market insights',
      'Priority support and rapid response times'
    ],
    benefits: [
      '98% annual client retention rate',
      '< 2hrs average response time',
      '156% average client business growth',
      '4.8/5 client satisfaction score',
      'Direct access to senior specialists',
      'Quarterly business review meetings'
    ],
    gradient: 'from-indigo-500 to-purple-500'
  }
};

const DetailedServicePage = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  const navigate = useNavigate();
  const config = serviceConfigs[serviceType || ''];
  const { stats } = useServiceData(serviceType || '');
  const caseStudies = realBrandCaseStudies[serviceType || ''] || [];

  if (!config) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <Link to="/services">
              <Button>View All Services</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const serviceSchemas: Record<string, any> = {
    'amazon-advertising': {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Amazon Advertising Management",
      "provider": {
        "@type": "Organization",
        "name": "Digital Growth Agency"
      },
      "areaServed": "Worldwide",
      "description": "Amazon Advertising Agency - Amazon PPC Management Service, Amazon Ads Expert, Amazon DSP Agency"
    },
    'walmart-advertising': {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Walmart Advertising Management",
      "provider": {
        "@type": "Organization",
        "name": "Digital Growth Agency"
      },
      "areaServed": "Worldwide",
      "description": "Walmart Advertising Agency - Walmart Connect Partner, Walmart Sponsored Products Expert"
    },
    'shopify-development': {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Shopify Development",
      "provider": {
        "@type": "Organization",
        "name": "Digital Growth Agency"
      },
      "areaServed": "Worldwide",
      "description": "Shopify Development Partner - Custom Shopify Theme Development, Shopify Plus Development"
    },
    'shopify-integration': {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Multi-Marketplace Integration",
      "provider": {
        "@type": "Organization",
        "name": "Digital Growth Agency"
      },
      "areaServed": "Worldwide",
      "description": "Multi-Marketplace Integration Agency - Integrate Shopify with Amazon FBA"
    }
  };

  return (
    <>
      <SEOHead 
        title={`${config.title} | Expert E-commerce Digital Marketing Services`}
        description={config.description}
        keywords={`${config.title}, ${config.subtitle}, E-commerce Digital Marketing Agency`}
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schema={serviceSchemas[serviceType || '']}
      />
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className={`mb-4 bg-gradient-to-r ${config.gradient} text-white border-0`}>
                Premium Service
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                {config.title}
              </h1>
              <p className="text-2xl font-semibold text-slate-700 mb-4">
                {config.subtitle}
              </p>
              <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
                {config.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button 
                  size="lg" 
                  className={`bg-gradient-to-r ${config.gradient} text-white px-8 py-4 text-lg`}
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
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {stats.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <Card key={stat.id} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 text-center">
                    <CardContent className="pt-6">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {stat.stat_value}
                      </div>
                      <div className="text-sm font-semibold text-slate-700 mb-1">
                        {stat.stat_label}
                      </div>
                      <div className="text-xs text-slate-500">
                        {stat.stat_description}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                What's Included
              </h2>
              <p className="text-xl text-slate-600">
                Comprehensive services designed for maximum impact
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {config.features.map((feature, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-xl text-slate-600">
                Proven results and dedicated support
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {config.benefits.map((benefit, index) => {
                const icons = [TrendingUp, Award, Users, Target, CheckCircle, Award];
                const Icon = icons[index % icons.length];
                return (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg border-0 text-center hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className={`w-14 h-14 bg-gradient-to-r ${config.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-lg text-slate-900">
                        {benefit}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        {caseStudies.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Success Stories
                </h2>
                <p className="text-xl text-slate-600">
                  Real results from real brands we've worked with
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {caseStudies.map((study) => (
                  <Card key={study.id} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    {study.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={study.image_url} 
                          alt={study.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="secondary">{study.industry}</Badge>
                        <Badge className={`bg-gradient-to-r ${config.gradient} text-white border-0`}>
                          {study.client_name}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {study.title}
                      </h3>
                      <p className="text-slate-600 mb-4">
                        {study.description}
                      </p>
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                        {Object.entries(study.results).slice(0, 3).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className={`text-xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                              {value}
                            </div>
                            <div className="text-xs text-slate-500 capitalize">
                              {key.replace(/_/g, ' ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <Card className={`bg-gradient-to-r ${config.gradient} border-0 text-white`}>
              <CardContent className="py-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Let's discuss how we can help you achieve your business goals
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold"
                    onClick={() => navigate('/contact')}
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                    onClick={() => navigate('/contact')}
                  >
                    Schedule Strategy Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default DetailedServicePage;
