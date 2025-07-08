
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, BarChart3, Target, Zap, Shield, Clock, CheckCircle, Star, TrendingUp, Award } from "lucide-react";

const AccountManagement = () => {
  const services = [
    {
      title: 'Account Optimization',
      description: 'Comprehensive account setup and optimization for maximum performance.',
      icon: Target,
      gradient: 'from-blue-500 to-indigo-500',
      features: ['Campaign Structure', 'Keyword Research', 'Ad Copy Creation', 'Landing Page Optimization']
    },
    {
      title: 'Performance Monitoring',
      description: 'Real-time monitoring and reporting of all advertising campaigns.',
      icon: BarChart3,
      gradient: 'from-green-500 to-emerald-500',
      features: ['Daily Monitoring', 'Performance Reports', 'ROI Tracking', 'Competitor Analysis']
    },
    {
      title: 'Strategy Development',
      description: 'Custom advertising strategies tailored to your business goals.',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      features: ['Goal Setting', 'Audience Research', 'Market Analysis', 'Growth Planning']
    },
    {
      title: 'Campaign Management',
      description: 'Day-to-day management of advertising campaigns across all platforms.',
      icon: Zap,
      gradient: 'from-orange-500 to-red-500',
      features: ['Budget Management', 'Bid Optimization', 'Ad Testing', 'Performance Tuning']
    },
    {
      title: 'Account Security',
      description: 'Secure account management with best practices and compliance.',
      icon: Shield,
      gradient: 'from-cyan-500 to-blue-500',
      features: ['Security Audits', 'Access Control', 'Compliance Monitoring', 'Risk Management']
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock support and account management services.',
      icon: Clock,
      gradient: 'from-teal-500 to-green-500',
      features: ['Emergency Response', 'Regular Check-ins', 'Strategy Updates', 'Performance Reviews']
    }
  ];

  const stats = [
    { label: 'Accounts Managed', value: '200+', description: 'Active client accounts', icon: Users },
    { label: 'Performance Increase', value: '65%', description: 'Average ROAS improvement', icon: TrendingUp },
    { label: 'Response Time', value: '<2hrs', description: 'Average support response', icon: Clock },
    { label: 'Client Retention', value: '95%', description: 'Long-term partnerships', icon: Award }
  ];

  const platforms = [
    { name: 'Google Ads', description: 'Search & Display campaigns', logo: '🔍' },
    { name: 'Facebook Ads', description: 'Social media advertising', logo: '📘' },
    { name: 'Amazon PPC', description: 'Marketplace advertising', logo: '📦' },
    { name: 'Microsoft Ads', description: 'Bing search advertising', logo: '🔷' },
    { name: 'LinkedIn Ads', description: 'B2B professional targeting', logo: '💼' },
    { name: 'Twitter Ads', description: 'Social engagement campaigns', logo: '🐦' }
  ];

  return (
    <>
      <SEOHead 
        title="Account Management Services - Professional Ad Account Management"
        description="Professional advertising account management services. Comprehensive campaign management, optimization, and strategy development across all major platforms."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-indigo-200/50 mb-6">
                  <span className="text-sm font-medium text-indigo-700">Account Management Experts</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                  Account Management Services
                </h1>
                <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-4">
                  Professional Ad Account Management & Optimization
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Let our experts manage your advertising accounts while you focus on your business. We provide comprehensive account management, optimization, and strategic guidance for maximum ROI.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Services
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400"
                  alt="Account Management Services"
                  className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
                />
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">200+ Accounts</div>
                      <div className="text-sm text-slate-600">Successfully Managed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Platforms We Manage
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{platform.logo}</div>
                    <h3 className="font-semibold text-slate-900 mb-2">{platform.name}</h3>
                    <p className="text-sm text-slate-600">{platform.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Management Results
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
        <section id="services" className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Management Services
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
              Our Management Process
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Account Audit', description: 'Comprehensive review of current account setup' },
                { step: '2', title: 'Strategy Planning', description: 'Develop customized management strategy' },
                { step: '3', title: 'Implementation', description: 'Execute optimization and management plan' },
                { step: '4', title: 'Ongoing Support', description: 'Continuous monitoring and optimization' }
              ].map((phase, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
              Ready to Optimize Your Accounts?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Let our experts take care of your advertising accounts while you focus on growing your business.
            </p>
            
            <Button 
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => window.location.href = '/contact'}
            >
              Start Management Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AccountManagement;
