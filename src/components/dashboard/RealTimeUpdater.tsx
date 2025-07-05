
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, Activity, RefreshCw } from 'lucide-react';

interface RealTimeEvent {
  id: string;
  table: string;
  action: 'INSERT' | 'UPDATE' | 'DELETE';
  timestamp: string;
  data?: any;
}

const RealTimeUpdater = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState<RealTimeEvent[]>([]);
  const [activeConnections, setActiveConnections] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Create multiple channels for different table updates
    const websiteChannel = supabase
      .channel('website-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_settings'
        },
        (payload) => {
          const event: RealTimeEvent = {
            id: `${Date.now()}-${Math.random()}`,
            table: 'website_settings',
            action: payload.eventType as any,
            timestamp: new Date().toISOString(),
            data: payload.new || payload.old
          };
          
          setEvents(prev => [event, ...prev.slice(0, 9)]);
          
          // Trigger website update
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            window.dispatchEvent(new CustomEvent('websiteSettingsUpdated', { 
              detail: payload.new 
            }));
          }
          
          toast({
            title: "Website Updated",
            description: `Settings have been updated in real-time`,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_posts'
        },
        (payload) => {
          const event: RealTimeEvent = {
            id: `${Date.now()}-${Math.random()}`,
            table: 'blog_posts',
            action: payload.eventType as any,
            timestamp: new Date().toISOString(),
            data: payload.new || payload.old
          };
          
          setEvents(prev => [event, ...prev.slice(0, 9)]);
          
          toast({
            title: "Blog Updated",
            description: `Blog post ${payload.eventType.toLowerCase()}d`,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_submissions'
        },
        (payload) => {
          const event: RealTimeEvent = {
            id: `${Date.now()}-${Math.random()}`,
            table: 'contact_submissions',
            action: payload.eventType as any,
            timestamp: new Date().toISOString(),
            data: payload.new || payload.old
          };
          
          setEvents(prev => [event, ...prev.slice(0, 9)]);
          
          if (payload.eventType === 'INSERT') {
            toast({
              title: "New Contact!",
              description: `New submission from ${payload.new?.name}`,
            });
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
        if (status === 'SUBSCRIBED') {
          setActiveConnections(prev => prev + 1);
        }
      });

    return () => {
      supabase.removeChannel(websiteChannel);
      setActiveConnections(0);
    };
  }, [toast]);

  const clearEvents = () => {
    setEvents([]);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'INSERT': return 'bg-green-100 text-green-800';
      case 'UPDATE': return 'bg-blue-100 text-blue-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                Real-Time Updates
                {isConnected ? (
                  <Wifi className="w-4 h-4 text-green-600" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-600" />
                )}
              </CardTitle>
              <CardDescription>
                Live website synchronization • {activeConnections} connections active
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearEvents}
            className="bg-white/50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Connection Status:</span>
            <Badge variant={isConnected ? "default" : "destructive"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          
          <div className="border-t pt-3">
            <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
            {events.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No recent updates. Changes will appear here in real-time.
              </p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {events.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <Badge className={getActionColor(event.action)} variant="secondary">
                        {event.action}
                      </Badge>
                      <span className="text-sm font-medium">{event.table}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTime(event.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeUpdater;
