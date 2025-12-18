import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, TrendingUp, Award, Users, Target, Sparkles } from 'lucide-react';
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">Service Not Found</h1>
            <Link to="/services">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">View All Services</Button>
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

  const serviceKeywords: Record<string, string> = {
    'amazon-advertising': 'Amazon Advertising Agency, Amazon PPC Management Service, Amazon Ads Expert, Amazon DSP Agency',
    'google-advertising': 'Google Advertising Management, Google Ads Agency, Google PPC Management',
    'meta-advertising': 'Meta Advertising, Facebook Advertising, Instagram Advertising',
    'walmart-advertising': 'Walmart Advertising, Walmart Connect, Walmart Marketplace Advertising',
    'shopify-development': 'Shopify Development Partner, Custom Shopify Theme Development',
    'shopify-integration': 'Multi-Marketplace Integration Agency, Shopify Integration'
  };

  return (
    <>
      <SEOHead 
        title={`${config.title} | Expert E-commerce Digital Marketing Services`}
        description={config.description}
        keywords={serviceKeywords[serviceType || ''] || `${config.title}, ${config.subtitle}, E-commerce Digital Marketing Agency`}
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schema={serviceSchemas[serviceType || '']}
      />
      <Header />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
          {/* Animated glowing orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            <div className="text-center">
              <Badge className="mb-6 bg-white/10 backdrop-blur-sm text-blue-300 border border-white/10 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Premium Service
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-5xl mx-auto">
                {config.title}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-blue-200 mb-6">
                {config.subtitle}
              </p>
              <p className="text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto mb-10">
                {config.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => navigate('/contact')}
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
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
          <section className="py-20 relative overflow-hidden bg-slate-900">
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-4">
                  Our Track Record
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Proven Results
                </h2>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <Card key={stat.id} className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 text-center hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="pt-8 pb-8">
                      <div className="text-4xl font-bold text-white mb-2">
                        {stat.stat_value}
                      </div>
                      <div className="text-sm font-semibold text-blue-300 mb-1">
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
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-4">
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What's Included
              </h2>
              <p className="text-lg text-slate-400">
                Comprehensive services designed for maximum impact
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {config.features.map((feature, index) => (
                <Card key={index} className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                      <span className="text-xs font-bold text-blue-400">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/20">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-200 font-medium pr-10">{feature}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 relative overflow-hidden bg-slate-900">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Advantages
              </h2>
              <p className="text-lg text-slate-400">
                Proven results and dedicated support
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {config.benefits.map((benefit, index) => {
                const icons = [TrendingUp, Award, Users, Target, CheckCircle, Award];
                const Icon = icons[index % icons.length];
                return (
                  <Card key={index} className="group text-center bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
                    <CardHeader>
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-lg text-white">
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
          <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-4">
                  Success Stories
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Real Results
                </h2>
                <p className="text-lg text-slate-400">
                  Real results from real brands we've worked with
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {caseStudies.map((study) => (
                  <Card key={study.id} className="group overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
                    {study.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={study.image_url} 
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-white/10 text-slate-300 border-white/10">{study.industry}</Badge>
                        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                          {study.client_name}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {study.title}
                      </h3>
                      <p className="text-slate-400 mb-4">
                        {study.description}
                      </p>
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                        {Object.entries(study.results).slice(0, 3).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-xl font-bold text-green-400">
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
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-8 border border-blue-500/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Ready to Transform Your Business?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your business goals
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-12 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate('/contact')}
            >
              Start Your Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="mt-6 text-sm text-slate-500">
              No commitment required • Free consultation • Results guaranteed
            </p>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default DetailedServicePage;
