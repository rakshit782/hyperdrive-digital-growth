import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { trackingManager, TrackerSetting } from '@/services/trackingManager';

const GlobalTracking = () => {
  const location = useLocation();
  const [trackers, setTrackers] = useState<TrackerSetting[]>(() => trackingManager.getTrackers());

  useEffect(() => {
    const handleUpdate = () => {
      setTrackers(trackingManager.getTrackers());
    };
    window.addEventListener('amz_trackers_updated', handleUpdate);
    return () => window.removeEventListener('amz_trackers_updated', handleUpdate);
  }, []);

  // Initialize or synchronize scripts dynamically based on active settings
  useEffect(() => {
    const ga4 = trackers.find((t) => t.id === 'ga4');
    const pixel = trackers.find((t) => t.id === 'meta-pixel');
    const clarity = trackers.find((t) => t.id === 'clarity');
    const hotjar = trackers.find((t) => t.id === 'hotjar');
    const gtm = trackers.find((t) => t.id === 'gtm');
    const googleAds = trackers.find((t) => t.id === 'google-ads');

    // 1. Google Analytics 4 (GA4)
    if (ga4?.enabled && ga4.trackingId) {
      if (!window.gtag) {
        const gaScript = document.createElement('script');
        gaScript.id = 'amz-ga4-script';
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4.trackingId}`;
        document.head.appendChild(gaScript);

        const gaInline = document.createElement('script');
        gaInline.id = 'amz-ga4-inline';
        gaInline.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga4.trackingId}');
        `;
        document.head.appendChild(gaInline);
      } else {
        window.gtag('config', ga4.trackingId);
      }
    }

    // 2. Google Tag Manager (GTM)
    if (gtm?.enabled && gtm.trackingId && !document.getElementById('amz-gtm-script')) {
      const gtmScript = document.createElement('script');
      gtmScript.id = 'amz-gtm-script';
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtm.trackingId}');
      `;
      document.head.appendChild(gtmScript);
    }

    // 3. Meta / Facebook Pixel
    if (pixel?.enabled && pixel.trackingId) {
      if (!window.fbq) {
        const metaScript = document.createElement('script');
        metaScript.id = 'amz-pixel-script';
        metaScript.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixel.trackingId}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(metaScript);
      } else {
        try {
          window.fbq('init', pixel.trackingId);
        } catch {
          // ignore
        }
      }
    }

    // 4. Microsoft Clarity
    if (clarity?.enabled && clarity.trackingId && !window.clarity && !document.getElementById('amz-clarity-script')) {
      const clarityScript = document.createElement('script');
      clarityScript.id = 'amz-clarity-script';
      clarityScript.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarity.trackingId}");
      `;
      document.head.appendChild(clarityScript);
    }

    // 5. Hotjar
    if (hotjar?.enabled && hotjar.trackingId && !window.hj && !document.getElementById('amz-hotjar-script')) {
      const hotjarScript = document.createElement('script');
      hotjarScript.id = 'amz-hotjar-script';
      hotjarScript.innerHTML = `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${hotjar.trackingId},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `;
      document.head.appendChild(hotjarScript);
    }

    // 6. Google Ads
    if (googleAds?.enabled && googleAds.trackingId && window.gtag) {
      window.gtag('config', googleAds.trackingId);
    }
  }, [trackers]);

  // Track page views on route changes
  useEffect(() => {
    const ga4 = trackers.find((t) => t.id === 'ga4');
    const pixel = trackers.find((t) => t.id === 'meta-pixel');

    // GA4 page view
    if (ga4?.enabled && window.gtag && ga4.trackingId) {
      window.gtag('config', ga4.trackingId, {
        page_path: location.pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    }

    // Meta Pixel page view
    if (pixel?.enabled && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname, trackers]);

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
