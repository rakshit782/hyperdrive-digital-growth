import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface TrackingScript {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  trackingId: string;
  scriptTemplate: string;
}

const defaultTrackingScripts: TrackingScript[] = [
  {
    id: 'ga4',
    name: 'Google Analytics 4 (GA4)',
    description: 'Track website traffic and user behavior',
    enabled: false,
    trackingId: '',
    scriptTemplate: `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{TRACKING_ID}}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{TRACKING_ID}}');
</script>`
  },
  {
    id: 'gtm',
    name: 'Google Tag Manager (GTM)',
    description: 'Manage all your website tags in one place',
    enabled: false,
    trackingId: '',
    scriptTemplate: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','{{TRACKING_ID}}');</script>`
  },
  {
    id: 'clarity',
    name: 'Microsoft Clarity',
    description: 'Session recordings and heatmaps',
    enabled: false,
    trackingId: '',
    scriptTemplate: `<!-- Microsoft Clarity -->
<script type="text/javascript">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "{{TRACKING_ID}}");
</script>`
  },
  {
    id: 'hotjar',
    name: 'Hotjar',
    description: 'Behavior analytics and user feedback',
    enabled: false,
    trackingId: '',
    scriptTemplate: `<!-- Hotjar Tracking Code -->
<script>
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:{{TRACKING_ID}},hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`
  },
  {
    id: 'google-ads',
    name: 'Google Ads Conversion',
    description: 'Track conversions from Google Ads',
    enabled: false,
    trackingId: '',
    scriptTemplate: `<!-- Google Ads Conversion -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{TRACKING_ID}}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{TRACKING_ID}}');
</script>`
  },
  {
    id: 'meta-pixel',
    name: 'Meta Pixel (Facebook)',
    description: 'Track conversions from Facebook ads',
    enabled: false,
    trackingId: '',
    scriptTemplate: `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '{{TRACKING_ID}}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id={{TRACKING_ID}}&ev=PageView&noscript=1"
/></noscript>`
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Insight Tag',
    description: 'Track conversions from LinkedIn ads',
    enabled: false,
    trackingId: '',
    scriptTemplate: `<!-- LinkedIn Insight Tag -->
<script type="text/javascript">
_linkedin_partner_id = "{{TRACKING_ID}}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script><script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
<noscript>
<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid={{TRACKING_ID}}&fmt=gif" />
</noscript>`
  },
  {
    id: 'twitter-pixel',
    name: 'Twitter/X Pixel',
    description: 'Track conversions from Twitter ads',
    enabled: false,
    trackingId: '',
    scriptTemplate: `<!-- Twitter Pixel -->
<script>
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','{{TRACKING_ID}}');
</script>`
  },
  {
    id: 'pinterest',
    name: 'Pinterest Tag',
    description: 'Track conversions from Pinterest ads',
    enabled: false,
    trackingId: '',
    scriptTemplate: `<!-- Pinterest Tag -->
<script>
!function(e){if(!window.pintrk){window.pintrk = function () {
window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
  n=window.pintrk;n.queue=[],n.version="3.0";var
  t=document.createElement("script");t.async=!0,t.src=e;var
  r=document.getElementsByTagName("script")[0];
  r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
pintrk('load', '{{TRACKING_ID}}', {em: '<user_email_address>'});
pintrk('page');
</script>
<noscript>
<img height="1" width="1" style="display:none;" alt=""
  src="https://ct.pinterest.com/v3/?event=init&tid={{TRACKING_ID}}&pd[em]=<hashed_email_address>&noscript=1" />
</noscript>`
  },
  {
    id: 'tiktok',
    name: 'TikTok Pixel',
    description: 'Track conversions from TikTok ads',
    enabled: false,
    trackingId: '',
    scriptTemplate: `<!-- TikTok Pixel Code -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('{{TRACKING_ID}}');
  ttq.page();
}(window, document, 'ttq');
</script>`
  },
  {
    id: 'snapchat',
    name: 'Snapchat Pixel',
    description: 'Track conversions from Snapchat ads',
    enabled: false,
    trackingId: '',
    scriptTemplate: `<!-- Snap Pixel Code -->
<script type='text/javascript'>
(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
{a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
r.src=n;var u=t.getElementsByTagName(s)[0];
u.parentNode.insertBefore(r,u);})(window,document,
'https://sc-static.net/scevent.min.js');
snaptr('init', '{{TRACKING_ID}}', {
'user_email': '__INSERT_USER_EMAIL__'
});
snaptr('track', 'PAGE_VIEW');
</script>`
  },
  {
    id: 'hubspot',
    name: 'HubSpot Tracking Code',
    description: 'Track visitors and form submissions',
    enabled: false,
    trackingId: '',
    scriptTemplate: `<!-- HubSpot Tracking Code -->
<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/{{TRACKING_ID}}.js"></script>`
  }
];

export function TrackingSection() {
  const [trackingScripts, setTrackingScripts] = useState<TrackingScript[]>([]);

  useEffect(() => {
    // Load saved tracking scripts from localStorage
    const saved = localStorage.getItem('trackingScripts');
    if (saved) {
      try {
        setTrackingScripts(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading tracking scripts:', error);
        setTrackingScripts(defaultTrackingScripts);
      }
    } else {
      setTrackingScripts(defaultTrackingScripts);
    }
  }, []);

  const saveTrackingScripts = (scripts: TrackingScript[]) => {
    localStorage.setItem('trackingScripts', JSON.stringify(scripts));
    setTrackingScripts(scripts);
    
    // Dispatch custom event to notify TrackingScriptInjector
    window.dispatchEvent(new CustomEvent('trackingScriptsUpdated', { detail: scripts }));
    
    toast.success('Tracking scripts updated successfully');
  };

  const handleToggle = (id: string, enabled: boolean) => {
    const updated = trackingScripts.map(script =>
      script.id === id ? { ...script, enabled } : script
    );
    saveTrackingScripts(updated);
  };

  const handleTrackingIdChange = (id: string, trackingId: string) => {
    const updated = trackingScripts.map(script =>
      script.id === id ? { ...script, trackingId } : script
    );
    setTrackingScripts(updated);
  };

  const handleSave = () => {
    // Process scripts and inject them into the page
    const activeScripts = trackingScripts
      .filter(script => script.enabled && script.trackingId)
      .map(script => ({
        id: script.id,
        name: script.name,
        script: script.scriptTemplate.replace(/{{TRACKING_ID}}/g, script.trackingId),
        location: 'head' as const,
        pages: 'all' as const,
        selectedPages: [],
        isActive: true
      }));

    localStorage.setItem('activeTrackingScripts', JSON.stringify(activeScripts));
    saveTrackingScripts(trackingScripts);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Tracking Scripts</h2>
        <p className="text-muted-foreground">
          Manage all your tracking and analytics scripts. Scripts are loaded asynchronously to maintain optimal performance.
        </p>
      </div>

      <div className="grid gap-4">
        {trackingScripts.map((script) => (
          <Card key={script.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {script.name}
                    {script.enabled && script.trackingId && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {script.enabled && !script.trackingId && (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                  </CardTitle>
                  <CardDescription>{script.description}</CardDescription>
                </div>
                <Switch
                  checked={script.enabled}
                  onCheckedChange={(checked) => handleToggle(script.id, checked)}
                />
              </div>
            </CardHeader>
            {script.enabled && (
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor={`tracking-${script.id}`}>
                    Tracking ID / Measurement ID
                  </Label>
                  <Input
                    id={`tracking-${script.id}`}
                    placeholder={`Enter your ${script.name} ID`}
                    value={script.trackingId}
                    onChange={(e) => handleTrackingIdChange(script.id, e.target.value)}
                  />
                  {script.enabled && !script.trackingId && (
                    <p className="text-sm text-yellow-600">
                      Please enter a tracking ID to activate this script
                    </p>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save All Changes
        </Button>
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Performance Note</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            All tracking scripts are loaded asynchronously and optimized to minimize impact on your website's loading speed.
            Scripts are injected after the main content loads to ensure the best user experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
