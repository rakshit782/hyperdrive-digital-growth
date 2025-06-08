
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const defaultSEOData: Record<string, SEOData> = {
  '/': {
    title: 'AMZ AD SCOUT - Expert Amazon, Walmart & Meta Advertising Agency USA',
    description: 'Top-rated Amazon advertising agency in USA. Expert Walmart advertising, Meta ads, Facebook advertising, Google ads, Shopify integration & development. Scale your ecommerce business with our proven advertising strategies.',
    keywords: 'amazon advertising agency, walmart advertising, meta advertising, facebook advertising, google advertising, shopify integration, shopify development, amazon ppc, walmart connect, ecommerce advertising usa',
    ogTitle: 'AMZ AD SCOUT - Expert Amazon, Walmart & Meta Advertising Agency',
    ogDescription: 'Scale your ecommerce business with our expert Amazon advertising, Walmart advertising, Meta ads, and Shopify development services.',
    ogImage: 'https://lovable.dev/opengraph-image-p98pqg.png'
  },
  '/amazon-advertising': {
    title: 'Amazon Advertising Agency USA - Expert Amazon PPC Management | AMZ AD SCOUT',
    description: 'Leading Amazon advertising agency in USA. Expert Amazon PPC management, sponsored products, sponsored brands, DSP advertising. Increase sales & reduce ACoS with our proven Amazon advertising strategies.',
    keywords: 'amazon advertising agency, amazon ppc, amazon sponsored products, amazon sponsored brands, amazon dsp, amazon advertising management, amazon marketing usa',
    ogTitle: 'Expert Amazon Advertising Agency USA - AMZ AD SCOUT',
    ogDescription: 'Professional Amazon PPC management and advertising services to scale your Amazon business.'
  },
  '/walmart-advertising': {
    title: 'Walmart Advertising Agency USA - Walmart Connect Experts | AMZ AD SCOUT',
    description: 'Expert Walmart advertising agency specializing in Walmart Connect ads. Professional Walmart sponsored products, search ads, and display advertising to grow your Walmart marketplace presence.',
    keywords: 'walmart advertising, walmart connect, walmart sponsored products, walmart marketplace advertising, walmart ads management, ecommerce advertising usa',
    ogTitle: 'Walmart Advertising Agency - Walmart Connect Experts',
    ogDescription: 'Scale your Walmart marketplace business with our expert Walmart Connect advertising services.'
  },
  '/meta-advertising': {
    title: 'Meta Advertising Agency USA - Facebook & Instagram Ads Experts | AMZ AD SCOUT',
    description: 'Professional Meta advertising agency specializing in Facebook ads, Instagram advertising, and social media marketing. Drive traffic and sales with our expert Meta ads management services.',
    keywords: 'meta advertising, facebook advertising, instagram ads, social media advertising, facebook ads agency, meta ads management, digital marketing usa',
    ogTitle: 'Meta Advertising Agency - Facebook & Instagram Ads Experts',
    ogDescription: 'Expert Meta advertising services for Facebook and Instagram to grow your business.'
  },
  '/shopify-integration': {
    title: 'Shopify Integration Services USA - Amazon & Walmart Integration | AMZ AD SCOUT',
    description: 'Expert Shopify integration services for Amazon and Walmart marketplaces. Seamless ecommerce integration, inventory sync, and multi-channel selling solutions for Shopify stores.',
    keywords: 'shopify integration, shopify amazon integration, shopify walmart integration, ecommerce integration, multi-channel selling, shopify marketplace integration usa',
    ogTitle: 'Shopify Integration Services - Amazon & Walmart',
    ogDescription: 'Professional Shopify integration services for seamless multi-channel selling.'
  },
  '/shopify-development': {
    title: 'Shopify Development Agency USA - Custom Shopify Store Development | AMZ AD SCOUT',
    description: 'Professional Shopify development agency in USA. Custom Shopify store development, theme customization, app development, and ecommerce optimization services.',
    keywords: 'shopify development, shopify developer, custom shopify store, shopify theme development, shopify app development, ecommerce development usa',
    ogTitle: 'Shopify Development Agency - Custom Store Development',
    ogDescription: 'Expert Shopify development services for custom ecommerce solutions.'
  },
  '/case-studies': {
    title: 'Advertising Case Studies - Amazon, Walmart & Meta Success Stories | AMZ AD SCOUT',
    description: 'Real advertising case studies showing proven results from our Amazon advertising, Walmart advertising, and Meta advertising campaigns. See how we helped businesses scale.',
    keywords: 'advertising case studies, amazon advertising results, walmart advertising success, meta advertising case studies, ecommerce advertising results usa',
    ogTitle: 'Advertising Agency Case Studies - Proven Results',
    ogDescription: 'Real case studies showing how our advertising strategies delivered results for ecommerce businesses.'
  },
  '/pricing': {
    title: 'Advertising Agency Pricing USA - Amazon, Walmart & Meta Ads Pricing | AMZ AD SCOUT',
    description: 'Transparent pricing for Amazon advertising, Walmart advertising, Meta ads, and Shopify development services. Affordable advertising agency packages for all business sizes.',
    keywords: 'advertising agency pricing, amazon advertising cost, walmart advertising pricing, meta ads pricing, shopify development cost, ecommerce advertising packages usa',
    ogTitle: 'Advertising Agency Pricing - Transparent Rates',
    ogDescription: 'Clear, competitive pricing for all our advertising and development services.'
  }
};

const SEOHead = () => {
  const location = useLocation();

  useEffect(() => {
    // Get SEO data for current page
    const currentPath = location.pathname;
    let seoData = defaultSEOData[currentPath] || defaultSEOData['/'];

    // Check for custom SEO settings from localStorage
    const savedSEO = localStorage.getItem('seoSettings');
    if (savedSEO) {
      try {
        const customSEO = JSON.parse(savedSEO);
        const pageCustomSEO = customSEO.find((seo: any) => seo.page === currentPath && seo.isActive);
        if (pageCustomSEO) {
          seoData = {
            title: pageCustomSEO.title || seoData.title,
            description: pageCustomSEO.description || seoData.description,
            keywords: pageCustomSEO.keywords || seoData.keywords,
            ogTitle: pageCustomSEO.ogTitle || seoData.ogTitle || seoData.title,
            ogDescription: pageCustomSEO.ogDescription || seoData.ogDescription || seoData.description,
            ogImage: pageCustomSEO.ogImage || seoData.ogImage,
            canonicalUrl: pageCustomSEO.canonicalUrl || `https://amzadscout.com${currentPath}`
          };
        }
      } catch (error) {
        console.error('Failed to parse custom SEO settings:', error);
      }
    }

    // Update document title
    document.title = seoData.title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords);

    // Open Graph tags
    updateMetaTag('og:title', seoData.ogTitle || seoData.title, true);
    updateMetaTag('og:description', seoData.ogDescription || seoData.description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', `https://amzadscout.com${currentPath}`, true);
    if (seoData.ogImage) {
      updateMetaTag('og:image', seoData.ogImage, true);
    }

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', seoData.ogTitle || seoData.title);
    updateMetaTag('twitter:description', seoData.ogDescription || seoData.description);
    if (seoData.ogImage) {
      updateMetaTag('twitter:image', seoData.ogImage);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seoData.canonicalUrl || `https://amzadscout.com${currentPath}`);

    // Schema.org structured data for local business
    const schemaScript = document.querySelector('#schema-org');
    if (!schemaScript) {
      const script = document.createElement('script');
      script.id = 'schema-org';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "DigitalMarketingAgency",
        "name": "AMZ AD SCOUT",
        "description": "Expert Amazon, Walmart & Meta Advertising Agency in USA",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        },
        "url": "https://amzadscout.com",
        "sameAs": [
          "https://facebook.com/amzadscout",
          "https://twitter.com/amzadscout",
          "https://linkedin.com/company/amzadscout"
        ],
        "serviceArea": {
          "@type": "Country",
          "name": "United States"
        },
        "services": [
          "Amazon Advertising",
          "Walmart Advertising", 
          "Meta Advertising",
          "Facebook Advertising",
          "Google Advertising",
          "Shopify Integration",
          "Shopify Development"
        ]
      });
      document.head.appendChild(script);
    }

    console.log('SEO: Updated meta tags for', currentPath);
  }, [location.pathname]);

  return null;
};

export default SEOHead;
