import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  CheckCircle, 
  AlertCircle, 
  Download, 
  RefreshCw, 
  FileText, 
  Globe, 
  ExternalLink,
  Code,
  ShieldCheck,
  Network
} from 'lucide-react';
import { trackingManager, TrackerSetting } from '@/services/trackingManager';
import { parseSitemapXml, buildSitemapHierarchy, SitemapNode } from '@/utils/sitemapParser';
import { SitemapFlowChart } from './SitemapFlowChart';

export function TrackingSection() {
  const [trackers, setTrackers] = useState<TrackerSetting[]>(() => trackingManager.getTrackers());
  const [sitemapXml, setSitemapXml] = useState<string>('');
  const [robotsTxt, setRobotsTxt] = useState<string>('');
  const [sitemapLoading, setSitemapLoading] = useState<boolean>(true);
  const [parsedUrls, setParsedUrls] = useState<{ url: string; lastmod?: string }[]>([]);
  const [sitemapTree, setSitemapTree] = useState<SitemapNode | null>(null);

  // Load sitemap and robots from public folder
  const loadSeoFiles = async () => {
    setSitemapLoading(true);
    try {
      const [sitemapRes, robotsRes] = await Promise.all([
        fetch('/sitemap.xml?t=' + Date.now()),
        fetch('/robots.txt?t=' + Date.now()),
      ]);

      if (sitemapRes.ok) {
        const text = await sitemapRes.text();
        setSitemapXml(text);
        const parsed = parseSitemapXml(text);
        setParsedUrls(parsed);
        setSitemapTree(buildSitemapHierarchy(parsed));
      }

      if (robotsRes.ok) {
        const rText = await robotsRes.text();
        setRobotsTxt(rText);
      }
    } catch (err) {
      console.warn('Could not fetch live sitemap or robots:', err);
    } finally {
      setSitemapLoading(false);
    }
  };

  useEffect(() => {
    loadSeoFiles();
  }, []);

  const handleToggle = (id: string, enabled: boolean) => {
    const updated = trackers.map((t) => (t.id === id ? { ...t, enabled } : t));
    setTrackers(updated);
    trackingManager.saveTrackers(updated);
    toast.success(`${enabled ? 'Enabled' : 'Disabled'} tracker`);
  };

  const handleIdChange = (id: string, trackingId: string) => {
    const updated = trackers.map((t) => (t.id === id ? { ...t, trackingId } : t));
    setTrackers(updated);
  };

  const handleSaveTrackers = () => {
    trackingManager.saveTrackers(trackers);
    toast.success('All tracker IDs and configurations saved successfully!');
  };

  // Download Sitemap file
  const downloadSitemap = () => {
    if (!sitemapXml) {
      toast.error('Sitemap content not loaded');
      return;
    }
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded sitemap.xml');
  };

  // Download Robots.txt file
  const downloadRobots = () => {
    if (!robotsTxt) {
      toast.error('Robots.txt content not loaded');
      return;
    }
    const blob = new Blob([robotsTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded robots.txt');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-1">
          Tracking & Search Console Management
        </h2>
        <p className="text-muted-foreground text-sm">
          Enable or disable conversion pixels and tracking IDs in real-time, view your live sitemap flowchart, and download sitemap.xml and robots.txt.
        </p>
      </div>

      <Tabs defaultValue="trackers" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-lg">
          <TabsTrigger value="trackers" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Trackers & Pixels</span>
          </TabsTrigger>
          <TabsTrigger value="sitemap" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span>Sitemap Flow Chart</span>
          </TabsTrigger>
          <TabsTrigger value="search-console" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>GSC & Robots.txt</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: TRACKERS & PIXELS */}
        <TabsContent value="trackers" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {trackers.map((script) => (
              <Card 
                key={script.id} 
                className={`transition-all border ${
                  script.enabled ? 'border-blue-200/90 shadow-xs bg-white' : 'border-slate-200 bg-slate-50/50 opacity-80'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-base font-semibold">{script.name}</CardTitle>
                        {script.enabled && script.trackingId ? (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] gap-1">
                            <CheckCircle className="h-3 w-3" /> Active
                          </Badge>
                        ) : script.enabled && !script.trackingId ? (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[11px] gap-1">
                            <AlertCircle className="h-3 w-3" /> ID Required
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-100 text-slate-500 text-[11px]">
                            Disabled
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-xs line-clamp-2">
                        {script.description}
                      </CardDescription>
                    </div>
                    <Switch
                      checked={script.enabled}
                      onCheckedChange={(checked) => handleToggle(script.id, checked)}
                    />
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-1.5">
                    <Label htmlFor={`tracking-${script.id}`} className="text-xs text-slate-600 font-medium">
                      Tracking / Measurement ID
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id={`tracking-${script.id}`}
                        placeholder={script.defaultId ? `Default: ${script.defaultId}` : 'Enter ID (e.g. AW-123456)'}
                        value={script.trackingId}
                        onChange={(e) => handleIdChange(script.id, e.target.value)}
                        disabled={!script.enabled}
                        className="text-xs h-9 font-mono"
                      />
                      {script.defaultId && script.trackingId !== script.defaultId && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-9 text-slate-500"
                          onClick={() => handleIdChange(script.id, script.defaultId)}
                        >
                          Reset
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 text-xs text-blue-900">
              <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Trackers apply dynamically across all front-end pages and automatically update SPA routes.</span>
            </div>
            <Button onClick={handleSaveTrackers} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              Save All Changes
            </Button>
          </div>
        </TabsContent>

        {/* TAB 2: SITEMAP FLOW CHART */}
        <TabsContent value="sitemap" className="space-y-6 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Network className="h-5 w-5 text-blue-600" />
                Live Architecture Sitemap Tree
              </h3>
              <p className="text-xs text-slate-500">
                Visualizing all {parsedUrls.length} canonical URLs recognized by Google Search Console.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={loadSeoFiles} className="gap-1.5 text-xs">
                <RefreshCw className={`h-3.5 w-3.5 ${sitemapLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button size="sm" onClick={downloadSitemap} className="gap-1.5 text-xs bg-slate-900 text-white">
                <Download className="h-3.5 w-3.5" />
                Download sitemap.xml
              </Button>
            </div>
          </div>

          {sitemapTree ? (
            <SitemapFlowChart rootNode={sitemapTree} totalUrls={parsedUrls.length} />
          ) : (
            <div className="p-12 text-center text-slate-400">Loading sitemap architecture...</div>
          )}
        </TabsContent>

        {/* TAB 3: SEARCH CONSOLE & ROBOTS.TXT */}
        <TabsContent value="search-console" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sitemap Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-base">Google Search Console Sitemap</CardTitle>
                      <CardDescription className="text-xs">
                        {parsedUrls.length} URLs generated automatically
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={downloadSitemap} className="gap-1 text-xs">
                    <Download className="h-3.5 w-3.5" /> XML
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs font-mono break-all flex items-center justify-between">
                  <span>https://www.amzadscout.com/sitemap.xml</span>
                  <a 
                    href="/sitemap.xml" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 ml-2"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  Whenever new services or pages are registered, the sitemap is rebuilt and updated to keep Google Search Console synchronized.
                </p>
              </CardContent>
            </Card>

            {/* Robots.txt Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-600" />
                    <div>
                      <CardTitle className="text-base">Crawler Instructions (robots.txt)</CardTitle>
                      <CardDescription className="text-xs">
                        Directs Googlebot and AI crawlers
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={downloadRobots} className="gap-1 text-xs">
                    <Download className="h-3.5 w-3.5" /> TXT
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs font-mono max-h-36 overflow-y-auto whitespace-pre">
                  {robotsTxt || 'User-agent: *\nAllow: /\nDisallow: /dashboard\nSitemap: https://www.amzadscout.com/sitemap.xml'}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Direct link: /robots.txt</span>
                  <a 
                    href="/robots.txt" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    Open <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default TrackingSection;
