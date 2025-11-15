
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import CaseStudies from "@/components/CaseStudies";
import CTA from "@/components/CTA";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    console.log('✅ Index page mounted successfully');
    return () => console.log('Index page unmounted');
  }, []);

  console.log('🔄 Index page rendering...');

  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "name": "AMZ Ad Scout - Amazon Advertising Agency & Digital Marketing Experts",
    "alternateName": ["Amazon Agency", "Digital Marketing Agency", "Advertising Agency"],
    "description": "Premier Amazon Advertising Agency and Digital Marketing Agency with 10+ years experience. Alternative to Helium 10, Jungle Scout, and Smart Scout. Expert Amazon PPC management, data-driven strategies, and e-commerce growth solutions.",
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
    "knowsAbout": ["Amazon Advertising", "PPC Management", "Digital Marketing", "E-commerce Growth", "Amazon Agency Services", "Advertising Agency", "Performance Marketing"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing & Amazon Advertising Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Amazon Advertising Management",
            "description": "Professional Amazon advertising agency services - PPC management, Sponsored Products, Sponsored Brands, Amazon DSP. Better results than Helium 10 or Jungle Scout alone.",
            "provider": {
              "@type": "Organization",
              "name": "AMZ Ad Scout"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing Agency Services",
            "description": "Full-service digital marketing agency specializing in e-commerce, Amazon marketplace, and multi-channel advertising strategies.",
            "provider": {
              "@type": "Organization",
              "name": "AMZ Ad Scout"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Amazon Agency Consulting",
            "description": "Expert Amazon agency services for sellers seeking alternatives to tools like AMZ Scout, Smart Scout, and data-driven growth strategies.",
            "provider": {
              "@type": "Organization",
              "name": "AMZ Ad Scout"
            }
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
        title="Amazon Advertising Agency | Digital Marketing Agency | Alternative to Helium 10 & Jungle Scout"
        description="Leading Amazon advertising agency and digital marketing agency with 10+ years experience. Better than Helium 10, Jungle Scout, AMZ Scout, or Smart Scout. Expert Amazon PPC management, data-driven growth strategies for e-commerce sellers."
        keywords="amazon advertising, amazon agency, advertising agency, digital marketing agency, amz scout, helium10, jungle scout, smart scout, amazon advertising agency, amazon ppc management, amazon seller agency, alternative to helium 10, alternative to jungle scout, best amazon agency"
        canonical={window.location.href}
        schema={schema}
      />
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <Services />
        <Stats />
        <CaseStudies />
        <FAQSection />
        <CTA />
        <Footer />
      </div>
    </>
  );
};

export default Index;
