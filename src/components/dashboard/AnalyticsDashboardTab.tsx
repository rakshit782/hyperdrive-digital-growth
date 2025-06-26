
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointer, 
  Eye,
  RefreshCw,
  Download,
  Calendar,
  Target
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  conversions: number;
  conversionRate: number;
  topPages: Array<{ page: string; views: number }>;
  trafficSources: Array<{ source: string; visitors: number }>;
  events: Array<{ event: string; count: number }>;
}

const AnalyticsDashboardTab = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    conversions: 0,
    conversionRate: 0,
    topPages: [],
    trafficSources: [],
    events: []
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      
      switch (dateRange) {
        case '1d':
          startDate.setDate(endDate.getDate() - 1);
          break;
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
        default:
          startDate.setDate(endDate.getDate() - 7);
      }

      // Fetch analytics events from database
      const { data: events, error } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (error) throw error;

      // Process the data
      const pageViews = events?.filter(e => e.event_name === 'page_view').length || 0;
      const uniqueVisitors = new Set(events?.map(e => e.session_id || e.ip_address)).size;
      const conversions = events?.filter(e => e.event_name === 'conversion').length || 0;
      const conversionRate = pageViews > 0 ? (conversions / pageViews) * 100 : 0;

      // Top pages
      const pageViewEvents = events?.filter(e => e.event_name === 'page_view') || [];
      const pageViewCounts = pageViewEvents.reduce((acc: Record<string, number>, event) => {
        const page = event.page_url || 'Unknown';
        acc[page] = (acc[page] || 0) + 1;
        return acc;
      }, {});

      const topPages = Object.entries(pageViewCounts)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      // Traffic sources
      const referrerCounts = events?.reduce((acc: Record<string, number>, event) => {
        const source = event.referrer ? new URL(event.referrer).hostname : 'Direct';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {}) || {};

      const trafficSources = Object.entries(referrerCounts)
        .map(([source, visitors]) => ({ source, visitors }))
        .sort((a, b) => b.visitors - a.visitors)
        .slice(0, 5);

      // Event counts
      const eventCounts = events?.reduce((acc: Record<string, number>, event) => {
        acc[event.event_name] = (acc[event.event_name] || 0) + 1;
        return acc;
      }, {}) || {};

      const eventsList = Object.entries(eventCounts)
        .map(([event, count]) => ({ event, count }))
        .sort((a, b) => b.count - a.count);

      setAnalyticsData({
        pageViews,
        uniqueVisitors,
        conversions,
        conversionRate: Math.round(conversionRate * 100) / 100,
        topPages,
        trafficSources,
        events: eventsList
      });

    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const trackEvent = async (eventName: string, eventData: Record<string, any> = {}) => {
    try {
      await supabase
        .from('analytics_events')
        .insert({
          event_name: eventName,
          event_data: eventData,
          page_url: window.location.href,
          referrer: document.referrer,
          session_id: sessionStorage.getItem('session_id') || Math.random().toString(36),
          user_agent: navigator.userAgent
        });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  const exportData = () => {
    const csvData = [
      ['Metric', 'Value'],
      ['Page Views', analyticsData.pageViews.toString()],
      ['Unique Visitors', analyticsData.uniqueVisitors.toString()],
      ['Conversions', analyticsData.conversions.toString()],
      ['Conversion Rate', `${analyticsData.conversionRate}%`],
      [],
      ['Top Pages', ''],
      ...analyticsData.topPages.map(p => [p.page, p.views.toString()]),
      [],
      ['Traffic Sources', ''],
      ...analyticsData.trafficSources.map(s => [s.source, s.visitors.toString()])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    trackEvent('export_analytics', { dateRange, format: 'csv' });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Analytics Dashboard</CardTitle>
                <CardDescription>Website performance and visitor analytics</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="1d">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <Button variant="outline" size="sm" onClick={fetchAnalyticsData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={exportData}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Page Views</p>
                    <p className="text-2xl font-bold text-blue-900">{analyticsData.pageViews}</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Unique Visitors</p>
                    <p className="text-2xl font-bold text-green-900">{analyticsData.uniqueVisitors}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Conversions</p>
                    <p className="text-2xl font-bold text-purple-900">{analyticsData.conversions}</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-orange-900">{analyticsData.conversionRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pages" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pages">Top Pages</TabsTrigger>
              <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="pages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Pages</CardTitle>
                  <CardDescription>Most visited pages on your website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.topPages.length > 0 ? (
                      analyticsData.topPages.map((page, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{page.page}</p>
                          </div>
                          <Badge variant="secondary">{page.views} views</Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-8">No page view data available</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.trafficSources.length > 0 ? (
                      analyticsData.trafficSources.map((source, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{source.source}</p>
                          </div>
                          <Badge variant="secondary">{source.visitors} visitors</Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-8">No traffic source data available</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Events</CardTitle>
                  <CardDescription>User interactions and custom events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.events.length > 0 ? (
                      analyticsData.events.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 capitalize">{event.event.replace('_', ' ')}</p>
                          </div>
                          <Badge variant="secondary">{event.count} times</Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-8">No event data available</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Analytics Setup</h3>
            <p className="text-sm text-blue-700 mb-3">
              Analytics tracking is automatically enabled. Events are tracked for page views, conversions, and custom interactions.
            </p>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-blue-700 border-blue-300">Real-time tracking</Badge>
              <Badge variant="outline" className="text-blue-700 border-blue-300">GDPR compliant</Badge>
              <Badge variant="outline" className="text-blue-700 border-blue-300">Privacy focused</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboardTab;
