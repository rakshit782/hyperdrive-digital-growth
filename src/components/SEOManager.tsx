
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSEOData } from '@/hooks/useSEOData';

const SEOManager = () => {
  const location = useLocation();
  const { pages, globalSettings } = useSEOData();

  useEffect(() => {
    // Find SEO data for current page
    const currentPage = pages.find(page => page.page_path === location.pathname);
    const defaultSEO = pages.find(page => page.page_path === '/');
    const seoData = currentPage || defaultSEO;

    if (!seoData) return;

    // Update title
    if (seoData.title_tag) {
      document.title = seoData.title_tag;
    }

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
    if (seoData.meta_description) {
      updateMetaTag('description', seoData.meta_description);
    }
    
    // Robots meta
    const robotsContent = [];
    if (!seoData.robots_index) robotsContent.push('noindex');
    if (!seoData.robots_follow) robotsContent.push('nofollow');
    if (robotsContent.length > 0) {
      updateMetaTag('robots', robotsContent.join(','));
    }
    
    // Open Graph tags
    if (seoData.og_title || seoData.title_tag) {
      updateProperty('og:title', seoData.og_title || seoData.title_tag);
    }
    if (seoData.og_description || seoData.meta_description) {
      updateProperty('og:description', seoData.og_description || seoData.meta_description);
    }
    updateProperty('og:type', 'website');
    updateProperty('og:url', window.location.href);
    
    if (seoData.og_image) {
      updateProperty('og:image', seoData.og_image);
    } else {
      const defaultOgImage = globalSettings.find(s => s.setting_key === 'default_og_image')?.setting_value?.url;
      if (defaultOgImage) {
        updateProperty('og:image', defaultOgImage);
      }
    }
    
    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    if (seoData.twitter_title || seoData.title_tag) {
      updateMetaTag('twitter:title', seoData.twitter_title || seoData.title_tag);
    }
    if (seoData.twitter_description || seoData.meta_description) {
      updateMetaTag('twitter:description', seoData.twitter_description || seoData.meta_description);
    }
    if (seoData.twitter_image || seoData.og_image) {
      updateMetaTag('twitter:image', seoData.twitter_image || seoData.og_image);
    }
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seoData.canonical_url || window.location.href);
    
    // Structured Data
    if (seoData.schema_data && Object.keys(seoData.schema_data).length > 0) {
      let script = document.getElementById('structured-data') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script') as HTMLScriptElement;
        script.id = 'structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      
      const schemaData = {
        "@context": "https://schema.org",
        "@type": seoData.schema_type,
        ...seoData.schema_data
      };
      
      script.textContent = JSON.stringify(schemaData);
    }

    // Google Site Verification
    const googleVerification = globalSettings.find(s => s.setting_key === 'google_site_verification')?.setting_value?.code;
    if (googleVerification) {
      updateMetaTag('google-site-verification', googleVerification);
    }

  }, [location.pathname, pages, globalSettings]);

  return null;
};

export default SEOManager;
