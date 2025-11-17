import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Target, Users, Award, CheckCircle, Star, ArrowRight } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState({
    heroTitle: 'Leading E-commerce Growth Agency | 500+ Brands Scaled Profitably',
    heroDescription: "Premier e-commerce marketing agency with 10+ years of proven expertise. We specialize in Amazon advertising management, Walmart marketplace optimization, Shopify development, and multi-channel growth strategies. Our data-driven approach has helped 500+ brands achieve measurable ROI and sustainable growth across all major marketplaces.",
    missionText: 'To revolutionize e-commerce success by delivering cutting-edge advertising strategies and marketplace optimization. As certified partners with Amazon, Walmart, and Shopify, we combine advanced analytics, AI-driven insights, and proven methodologies to maximize your revenue, reduce costs, and dominate your category across all digital channels.',
    visionText: 'To become the global leader in e-commerce growth solutions, recognized for transforming brands through innovative marketplace strategies, performance marketing excellence, and scalable systems that deliver consistent results. We envision a future where every e-commerce business has access to enterprise-level expertise and technology to compete and win in the digital marketplace.'
  });

  useEffect(() => {
    const savedAbout = localStorage.getItem('about_data');
    if (savedAbout) {
      setAboutData(JSON.parse(savedAbout));
    }
  }, []);
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We believe in transparent communication and honest reporting. Your success is our success."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "Every strategy we implement is focused on delivering measurable results and ROI."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work as an extension of your team, collaborating closely to achieve your goals."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We continuously innovate and optimize to stay ahead of industry trends and changes."
    }
  ];

  const services = [
    "Amazon Advertising Agency - PPC Management Service",
    "Amazon Listing Optimization Service - A+ Content Creation", 
    "Walmart Advertising Agency - Walmart Connect Partner",
    "E-commerce Product Cataloging Services",
    "Shopify Development Partner - Custom Theme Development",
    "Multi-Marketplace Integration Agency",
    "Professional Shopify Developers - Shopify Plus Experts",
    "Amazon DSP Agency - Amazon Sponsored Products Management",
    "E-commerce Channel Management Solutions"
  ];

  const whyChooseUs = [
    {
      title: "Proven Track Record",
      description: "500+ brands scaled profitably with 10,000+ successful campaigns achieving an average ROAS of 10x across all marketplaces"
    },
    {
      title: "Certified Expert Team",
      description: "Amazon Advertising Partners, Walmart Connect Certified, and Shopify Plus Partners with 50+ years combined experience"
    },
    {
      title: "Advanced Data Analytics",
      description: "Proprietary AI-driven analytics platform providing real-time insights, predictive modeling, and automated optimization"
    },
    {
      title: "White-Glove Service",
      description: "Dedicated account managers, weekly strategy calls, transparent reporting, and 24/7 support for enterprise clients"
    }
  ];

  return (
    <>
      <SEOHead 
        title="About Us - Premier E-commerce Digital Marketing Agency | 10+ Years Proven Results"
        description="Leading E-commerce Digital Marketing Agency with 10+ years experience. Certified Amazon Advertising Agency, Walmart Connect Partner, and Shopify Development Partner. Proven E-commerce Growth Strategies for 500+ successful clients."
        keywords="e-commerce digital marketing agency, amazon advertising agency, walmart connect partner, shopify development partner, amazon ppc management, professional amazon agency, certified advertising experts, e-commerce growth strategies, multi-marketplace integration, amazon seller central management, vendor central consulting, walmart marketplace advertising, shopify plus developers, e-commerce consulting services, amazon dsp agency, sponsored products management, sponsored brands campaigns, product listing optimization, a+ content creation, enhanced brand content, amazon storefront design, brand registry services, e-commerce photography, product photography services, lifestyle photography, infographic design services, amazon seo optimization, keyword research services, product launch strategy, conversion rate optimization, roi optimization services, data-driven marketing, performance marketing agency, customer acquisition strategy, retention marketing, remarketing campaigns, amazon analytics, competitive analysis, market research services, profit margin optimization, inventory management consulting, supply chain optimization, fulfillment strategy, fba consulting, fbm strategy consulting, international expansion services, global marketplace strategy, cross-border e-commerce, localization services, account health management, suspension prevention, reinstatement services, review management, customer service optimization, ranking strategy, category domination, seasonal campaign planning, prime day strategy, black friday strategy, cyber monday planning, q4 planning services, budget management, acos optimization, tacos management, roas maximization, scalable growth strategies, digital transformation agency, e-commerce automation, marketplace management software, amazon advertising consultant, ppc management services, sponsored display ads, amazon video ads, amazon posts optimization, amazon live shopping, amazon influencer program, amazon vine program, early reviewer program, subscribe and save optimization, amazon subscribe save, amazon fresh optimization, amazon business b2b, amazon handmade marketing, amazon renewed marketing, amazon warehouse deals, fulfillment by amazon optimization, seller fulfilled prime, multi-channel fulfillment, amazon logistics, inventory planning tools, demand forecasting, stock level optimization, listing quality score, content score optimization, image optimization services, video content creation, 3d rendering services, virtual photography, augmented reality shopping, voice search optimization, alexa skills development, amazon choice badge, bestseller rank optimization, sales velocity, launch ranking, external traffic campaigns, social media advertising, facebook ads for amazon, instagram shopping ads, tiktok advertising, pinterest ads management, google shopping ads, google merchant center, bing shopping campaigns, microsoft advertising, programmatic advertising, display advertising network, retargeting campaigns, dynamic remarketing, lookalike audiences, custom audiences, conversion tracking, pixel implementation, google tag manager setup, google analytics 4, data studio reporting, business intelligence, predictive analytics, machine learning models, artificial intelligence marketing, chatgpt for e-commerce, ai content generation, automated bidding strategies, smart campaigns, performance max campaigns, search ads optimization, shopping ads optimization, brand awareness campaigns, consideration campaigns, conversion campaigns, omnichannel marketing, unified commerce, headless commerce, composable commerce, shopify plus migration, magento to shopify, woocommerce migration, bigcommerce development, salesforce commerce cloud, adobe commerce, vtex platform, marketplace integration api, channel advisor, sellbrite, listing mirror, feedonomics, channeladvisor, walmart marketplace api, target plus marketplace, wayfair marketplace, houzz marketplace, overstock marketplace, newegg marketplace, rakuten marketplace, mercado libre, alibaba marketplace, aliexpress dropshipping, etsy marketplace optimization, ebay store optimization, facebook marketplace selling, google shopping actions, buy with google, shop pay integration, apple pay checkout, amazon pay integration, paypal commerce platform, stripe payments, square online, afterpay integration, klarna financing, affirm payment plans, buy now pay later, subscription box services, recurring revenue models, membership programs, loyalty programs, referral marketing, affiliate marketing programs, influencer partnerships, brand ambassador programs, user generated content, social proof optimization, trust badges, security seals, ssl certificates, gdpr compliance, ccpa compliance, pci compliance, ada compliance, wcag accessibility, mobile optimization, progressive web apps, amp pages, core web vitals, page speed optimization, lazy loading, image compression, cdn integration, cloudflare setup, aws hosting, google cloud platform, microsoft azure, server optimization, caching strategies, redis implementation, varnish cache, nginx optimization, apache optimization, php optimization, node.js applications, react development, next.js framework, gatsby framework, vue.js development, angular development, typescript development, graphql api, rest api development, webhook integration, zapier automation, make integration, n8n workflows, api marketplace, rapid api, postman api, swagger documentation, open api specification, microservices architecture, serverless computing, lambda functions, cloud functions, edge computing, jamstack architecture, static site generation, incremental static regeneration, server side rendering, client side rendering, single page applications, wordpress development, drupal development, joomla development, craft cms, contentful cms, sanity cms, strapi cms, ghost cms, prismic cms, dato cms, hubspot cms, webflow development, bubble.io, no-code platforms, low-code platforms, citizen development, rapid application development"
        canonical={window.location.href}
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        {/* Hero Section */}
        <section className="py-20 md:py-28 lg:py-36">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mb-6 leading-tight">
              {aboutData.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              {aboutData.heroDescription}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-card/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {aboutData.missionText}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Star className="w-6 h-6 text-secondary" />
                    </div>
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {aboutData.visionText}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-slate-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
                  What We Do
                </CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Comprehensive digital marketing services to grow your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-xl text-slate-600">
                What sets us apart in the digital marketing landscape
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
              <CardContent className="py-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Grow Your Business?
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                  Let's discuss how we can help you achieve your digital marketing goals
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => navigate('/contact')}
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => navigate("/case-studies")}
                  >
                    View Our Work
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

export default About;
