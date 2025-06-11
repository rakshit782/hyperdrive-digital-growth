
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  canonicalUrl?: string;
}

const SEOHead = ({
  title = "AMZ AD SCOUT - Amazon & Meta Advertising Experts",
  description = "Professional Amazon PPC and Meta advertising services. Increase your ROAS, reduce ACOS, and scale your e-commerce business with our expert team.",
  keywords = "amazon ppc, amazon advertising, meta ads, facebook ads, instagram ads, ppc management, e-commerce advertising, amazon seller, shopify advertising",
  image = "/placeholder.svg",
  type = "website",
  author = "AMZ AD SCOUT",
  publishedTime,
  modifiedTime,
  section = "E-commerce Advertising",
  tags = [],
  canonicalUrl
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;
  const canonical = canonicalUrl || currentUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;

  // Generate structured data for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AMZ AD SCOUT",
    "description": description,
    "url": window.location.origin,
    "logo": {
      "@type": "ImageObject",
      "url": `${window.location.origin}/placeholder.svg`
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "customer service",
      "email": "admin@amzadscout.com"
    },
    "sameAs": [
      "https://facebook.com/amzadscout",
      "https://instagram.com/amzadscout",
      "https://linkedin.com/company/amzadscout",
      "https://twitter.com/amzadscout"
    ],
    "service": {
      "@type": "Service",
      "name": "Amazon & Meta Advertising Services",
      "description": "Professional PPC management and advertising optimization services",
      "provider": {
        "@type": "Organization",
        "name": "AMZ AD SCOUT"
      },
      "areaServed": "Worldwide",
      "serviceType": "Digital Marketing"
    }
  };

  // Add breadcrumb structured data for non-home pages
  const breadcrumbData = location.pathname !== "/" ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": currentUrl
      }
    ]
  } : null;

  // Add FAQ structured data for specific pages
  const faqData = location.pathname === "/free-audit" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is the audit really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, absolutely! Our audit is 100% free with no strings attached. We provide detailed insights and recommendations regardless of whether you choose to work with us afterward."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to receive my audit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You'll receive your comprehensive audit report within 24-48 hours of submitting your information and required reports."
        }
      }
    ]
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="AMZ AD SCOUT" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific meta tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {author && <meta property="article:author" content={author} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@amzadscout" />
      <meta name="twitter:site" content="@amzadscout" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="application-name" content="AMZ AD SCOUT" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://api.openai.com" />
      <link rel="preconnect" href="https://graph.facebook.com" />
      
      {/* DNS Prefetch for better performance */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {breadcrumbData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      )}
      
      {faqData && (
        <script type="application/ld+json">
          {JSON.stringify(faqData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
