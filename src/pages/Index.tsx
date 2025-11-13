
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
    "@type": "Organization",
    "name": "Digital Growth Agency",
    "description": "Top E-commerce Digital Marketing Agency with 10 Years Experience. Expert Amazon Advertising Agency, Walmart Advertising, Shopify Development, and Multi-Marketplace Integration Services.",
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.png`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Amazon Advertising Management",
            "description": "Amazon PPC Management Service, Amazon Ads Expert, Amazon DSP Agency"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Walmart Advertising Services",
            "description": "Walmart Connect Partner, Walmart Sponsored Products Expert, Walmart Performance Ads Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Shopify Development",
            "description": "Shopify Development Partner, Custom Shopify Theme Development, Shopify Plus Development Experts"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead 
        title="E-commerce Digital Marketing Agency | Amazon PPC & Shopify Development Experts"
        description="Top 10-year E-commerce Digital Marketing Agency. Expert Amazon Advertising Agency, Amazon PPC Management, Walmart Connect Partner, Shopify Development, Multi-Marketplace Integration. Proven growth strategies for online retailers."
        keywords="Amazon Advertising Agency, Amazon PPC Management Service, Amazon Ads Expert, Walmart Advertising Agency, Walmart Connect Partner, Shopify Development Partner, E-commerce Digital Marketing Agency, Multi-Marketplace Integration, Amazon Listing Optimization Service, Shopify Plus Development, Product Cataloging Services"
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
