
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PlatformLogos from "@/components/PlatformLogos";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import CaseStudies from "@/components/CaseStudies";
import CTA from "@/components/CTA";
import SEOHead from "@/components/SEOHead";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    console.log('✅ Index page mounted successfully');
    return () => console.log('Index page unmounted');
  }, []);

  console.log('🔄 Index page rendering...');

  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "name": "AMZ Ad Scout - E-commerce Growth Specialists",
    "alternateName": [
      "E-commerce Growth Agency", 
      "Digital Marketing Agency", 
      "Advertising Management Services", 
      "Marketplace Advertising Specialists",
      "E-commerce Marketing Agency"
    ],
    "description": "Independent e-commerce growth specialists helping brands advertise on Amazon, Walmart, and Meta platforms. Data-driven advertising management, marketplace optimization, and proven growth strategies for online sellers. We are not affiliated with or endorsed by Amazon.",
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.png`,
    "image": `${window.location.origin}/logo.png`,
    "telephone": "+1-XXX-XXX-XXXX",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "40.7128",
        "longitude": "-74.0060"
      },
      "geoRadius": "Global"
    },
    "serviceArea": "Worldwide",
    "knowsAbout": [
      "Advertising on Amazon", 
      "E-commerce Advertising Services",
      "PPC Management", 
      "Digital Marketing", 
      "E-commerce Growth", 
      "Advertising Management Services",
      "Performance Marketing",
      "Marketplace Advertising",
      "Walmart Advertising Management",
      "Meta Advertising Management"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "E-commerce Advertising & Growth Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Advertising Management for Amazon Sellers",
            "description": "Full-service advertising management helping brands succeed on Amazon through expert PPC management, listing optimization, and data-driven campaign strategies. Independent service provider - not affiliated with Amazon.",
            "provider": {
              "@type": "Organization",
              "name": "AMZ Ad Scout"
            },
            "serviceType": "Advertising Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Marketing Services",
            "description": "Comprehensive digital marketing specializing in e-commerce advertising, multi-channel campaigns, conversion optimization, and ROI-focused strategies for online retailers.",
            "provider": {
              "@type": "Organization",
              "name": "AMZ Ad Scout"
            },
            "serviceType": "Digital Marketing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketplace Growth Consulting",
            "description": "Expert consulting for sellers seeking professional guidance on marketplace advertising. Data-driven strategies, market analysis, and hands-on execution for sustainable growth.",
            "provider": {
              "@type": "Organization",
              "name": "AMZ Ad Scout"
            },
            "serviceType": "Consulting"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/yourbusiness",
      "https://www.linkedin.com/company/yourbusiness",
      "https://twitter.com/yourbusiness"
    ]
  };

  return (
    <>
      <SEOHead 
        title="E-commerce Growth Specialists | Advertising Management for Amazon, Walmart & Meta Sellers"
        description="Independent e-commerce growth specialists helping brands advertise on Amazon, Walmart, and Meta platforms. Data-driven advertising management with proven results. We are not affiliated with or endorsed by Amazon."
        keywords="advertising management, e-commerce growth, marketplace advertising, advertising for amazon sellers, walmart advertising management, meta advertising, ppc management, sponsored products management, e-commerce agency, advertising management services, marketplace optimization, listing optimization, keyword research, product launch, e-commerce consulting, conversion rate optimization, roi optimization, campaign management, multi-channel ecommerce, performance marketing, growth strategies, ecommerce growth specialists, online retail marketing, advertising campaign optimization, ppc advertising, brand advertising"
        canonical={window.location.href}
        schema={schema}
      />
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <PlatformLogos />
        <Services />
        <Stats />
        <CaseStudies />
        <CTA />
        <Footer />
      </div>
    </>
  );
};

export default Index;
