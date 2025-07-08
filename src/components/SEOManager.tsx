
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: any;
}

const SEOManager = () => {
  const location = useLocation();

  const seoData: Record<string, SEOData> = {
    '/': {
      title: 'Expert Amazon, Walmart & Meta Advertising Agency | Drive Sales Growth',
      description: 'Leading advertising agency specializing in Amazon PPC, Walmart Connect, and Meta ads. Boost your ROI with our proven strategies. Free audit available!',
      keywords: 'Amazon advertising, Walmart advertising, Meta ads, PPC management, e-commerce marketing, digital advertising agency',
      canonicalUrl: 'https://yourdomain.com/',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Expert Advertising Agency",
        "description": "Leading advertising agency specializing in Amazon PPC, Walmart Connect, and Meta ads",
        "url": "https://yourdomain.com",
        "sameAs": [
          "https://www.facebook.com/yourpage",
          "https://www.linkedin.com/company/yourcompany"
        ]
      }
    },
    '/contact': {
      title: 'Contact Us - Get Your Free Advertising Audit',
      description: 'Ready to scale your business? Contact our team for a free advertising audit and consultation.',
      keywords: 'contact advertising agency, free audit, consultation, PPC experts',
      canonicalUrl: 'https://yourdomain.com/contact'
    },
    '/free-audit': {
      title: 'Free Advertising Audit - Get Your $2,000 Analysis',
      description: 'Get a comprehensive free audit of your advertising performance across Amazon, Walmart, and Meta platforms. Discover growth opportunities.',
      keywords: 'free advertising audit, PPC analysis, Amazon audit, marketing assessment',
      canonicalUrl: 'https://yourdomain.com/free-audit'
    }
  };

  useEffect(() => {
    const currentSEO = seoData[location.pathname] || seoData['/'];
    
    // Update title
    document.title = currentSEO.title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updateProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic SEO tags
    updateMetaTag('description', currentSEO.description);
    if (currentSEO.keywords) updateMetaTag('keywords', currentSEO.keywords);
    
    // Open Graph tags
    updateProperty('og:title', currentSEO.title);
    updateProperty('og:description', currentSEO.description);
    updateProperty('og:type', 'website');
    updateProperty('og:url', window.location.href);
    if (currentSEO.ogImage) updateProperty('og:image', currentSEO.ogImage);
    
    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', currentSEO.title);
    updateMetaTag('twitter:description', currentSEO.description);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentSEO.canonicalUrl || window.location.href);
    
    // Structured Data
    if (currentSEO.structuredData) {
      let script = document.getElementById('structured-data') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script') as HTMLScriptElement;
        script.id = 'structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(currentSEO.structuredData);
    }
  }, [location.pathname]);

  return null;
};

export default SEOManager;
