import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GlobalTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Google tag (gtag.js)
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-5K1GGB3SBR';
    document.head.appendChild(gaScript);

    const gaInlineScript = document.createElement('script');
    gaInlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-5K1GGB3SBR');
    `;
    document.head.appendChild(gaInlineScript);

    // Meta Pixel
    const metaScript = document.createElement('script');
    metaScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '667154722169969');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(metaScript);

    const metaNoscript = document.createElement('noscript');
    metaNoscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=667154722169969&ev=PageView&noscript=1" />`;
    document.body.appendChild(metaNoscript);

    // Microsoft Clarity
    const clarityScript = document.createElement('script');
    clarityScript.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "u54bu1wszh");
    `;
    document.head.appendChild(clarityScript);

    // Hotjar
    const hotjarScript = document.createElement('script');
    hotjarScript.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:6574226,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(hotjarScript);

    return () => {
      // Cleanup scripts on unmount
      gaScript.remove();
      gaInlineScript.remove();
      metaScript.remove();
      metaNoscript.remove();
      clarityScript.remove();
      hotjarScript.remove();
    };
  }, []);

  // Track page views on route changes
  useEffect(() => {
    // GA4 page view
    if (window.gtag) {
      window.gtag('config', 'G-5K1GGB3SBR', {
        page_path: location.pathname,
        page_title: document.title,
        page_location: window.location.href
      });
    }

    // Meta Pixel page view
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname]);

  return null;
};

export default GlobalTracking;

// Type declarations
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    _fbq: any;
    clarity: (...args: any[]) => void;
    hj: (...args: any[]) => void;
    _hjSettings: any;
  }
}
