
import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOHead = ({ title, description, keywords, image, url }: SEOHeadProps) => {
  useEffect(() => {
    // Check for custom website title from settings
    const savedSettings = localStorage.getItem('websiteSettings');
    let finalTitle = title;
    
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (settings.websiteTitle) {
          finalTitle = settings.websiteTitle;
        }
      } catch (error) {
        console.error('Failed to parse website settings for title:', error);
      }
    }
    
    // Set document title
    document.title = finalTitle;
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }
    
    // Set meta keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      } else {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        metaKeywords.setAttribute('content', keywords);
        document.head.appendChild(metaKeywords);
      }
    }
    
    // Set Open Graph tags
    const setMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };
    
    setMetaProperty('og:title', finalTitle);
    setMetaProperty('og:description', description);
    if (image) setMetaProperty('og:image', image);
    if (url) setMetaProperty('og:url', url);
    setMetaProperty('og:type', 'website');
    
    // Set Twitter Card tags
    const setMetaName = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };
    
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', finalTitle);
    setMetaName('twitter:description', description);
    if (image) setMetaName('twitter:image', image);

    // Listen for real-time title updates
    const handleSettingsUpdate = (event: CustomEvent) => {
      if (event.detail?.websiteTitle) {
        document.title = event.detail.websiteTitle;
        setMetaProperty('og:title', event.detail.websiteTitle);
        setMetaName('twitter:title', event.detail.websiteTitle);
      }
    };

    window.addEventListener('websiteSettingsUpdated', handleSettingsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('websiteSettingsUpdated', handleSettingsUpdate as EventListener);
    };
  }, [title, description, keywords, image, url]);

  return null;
};

export default SEOHead;
