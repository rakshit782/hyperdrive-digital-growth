
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
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
    "name": "AMZ Ad Scout - Premier Amazon Advertising Agency & Digital Marketing Agency",
    "alternateName": [
      "Amazon Agency", 
      "Digital Marketing Agency", 
      "Advertising Agency", 
      "Amazon Advertising Agency",
      "Amazon PPC Agency",
      "E-commerce Marketing Agency"
    ],
    "description": "Leading Amazon advertising agency and digital marketing agency. Professional alternative to Helium 10, Jungle Scout, AMZ Scout, and Smart Scout. Expert Amazon PPC management, sponsored ads optimization, and data-driven e-commerce growth strategies for online sellers.",
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
      "Amazon Advertising", 
      "Amazon Agency Services",
      "PPC Management", 
      "Digital Marketing", 
      "E-commerce Growth", 
      "Advertising Agency Services",
      "Performance Marketing",
      "Amazon Sponsored Products",
      "Amazon Sponsored Brands",
      "Amazon DSP",
      "Helium 10 Alternative",
      "Jungle Scout Alternative",
      "AMZ Scout Alternative",
      "Smart Scout Alternative"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Amazon Advertising & Digital Marketing Agency Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Amazon Advertising Agency Services",
            "description": "Full-service Amazon advertising agency offering expert PPC management, Sponsored Products optimization, Sponsored Brands campaigns, and Amazon DSP. Professional alternative to software tools like Helium 10, Jungle Scout, AMZ Scout, and Smart Scout with dedicated account management.",
            "provider": {
              "@type": "Organization",
              "name": "AMZ Ad Scout"
            },
            "serviceType": "Amazon Advertising Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing Agency Services",
            "description": "Comprehensive digital marketing agency specializing in e-commerce advertising, multi-channel campaigns, conversion optimization, and ROI-focused strategies for online retailers and Amazon sellers.",
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
            "name": "Amazon Agency Consulting & Strategy",
            "description": "Expert Amazon agency consulting for sellers seeking professional guidance beyond tools like Helium 10 and Jungle Scout. Data-driven strategies, market analysis, and hands-on execution for sustainable growth.",
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
        title="Amazon Advertising Agency | Amazon Agency | Digital Marketing Agency | Advertising Agency"
        description="Premier Amazon advertising agency and digital marketing agency with proven results. Professional alternative to Helium 10, Jungle Scout, AMZ Scout, and Smart Scout software. Expert Amazon PPC management, sponsored ads optimization, marketplace strategies, and full-service advertising agency solutions for e-commerce sellers and brands seeking growth."
        keywords="amazon advertising, amazon agency, advertising agency, digital marketing agency, amz scout, helium10, jungle scout, smart scout, amazon advertising agency, amazon ppc agency, amazon seller agency, e-commerce agency, ppc management, sponsored products, sponsored brands, helium 10 alternative, jungle scout alternative, amz scout alternative, smart scout alternative, best amazon agency, top digital marketing agency"
        canonical={window.location.href}
        schema={schema}
      />
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
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
