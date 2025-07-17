
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { integrationManager, IntegrationStatus } from "@/utils/integrationManager";
import { Activity, CheckCircle, XCircle, AlertTriangle, RefreshCw, Wifi, WifiOff, Clock } from "lucide-react";

const IntegrationStatusTab = () => {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');

  useEffect(() => {
    loadIntegrationStatus();
    
    // Listen for integration status changes
    const handleStatusChange = (event: CustomEvent) => {
      console.log('Integration Status Tab: Received status update', event.detail);
      setIntegrations(event.detail);
      setLastUpdate(new Date());
    };
    
    // Listen for individual integration updates
    const handleIndividualUpdate = () => {
      loadIntegrationStatus();
    };

    // Listen for connectivity changes
    const handleOnline = () => {
      setConnectionStatus('online');
      console.log('Integration Status Tab: Connection restored');
      loadIntegrationStatus();
    };

    const handleOffline = () => {
      setConnectionStatus('offline');
      console.log('Integration Status Tab: Connection lost');
    };
    
    window.addEventListener('integrationStatusChanged', handleStatusChange as EventListener);
    window.addEventListener('integration-facebook-pixel-updated', handleIndividualUpdate);
    window.addEventListener('integration-google-analytics-updated', handleIndividualUpdate);
    window.addEventListener('integration-chatgpt-updated', handleIndividualUpdate);
    window.addEventListener('integration-cloudflare-updated', handleIndividualUpdate);
    window.addEventListener('integration-auth0-updated', handleIndividualUpdate);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Auto-refresh every 30 seconds
    const autoRefreshInterval = setInterval(() => {
      if (connectionStatus === 'online') {
        loadIntegrationStatus();
      }
    }, 30000);

    return () => {
      window.removeEventListener('integrationStatusChanged', handleStatusChange as EventListener);
      window.removeEventListener('integration-facebook-pixel-updated', handleIndividualUpdate);
      window.removeEventListener('integration-google-analytics-updated', handleIndividualUpdate);
      window.removeEventListener('integration-chatgpt-updated', handleIndividualUpdate);
      window.removeEventListener('integration-cloudflare-updated', handleIndividualUpdate);
      window.removeEventListener('integration-auth0-updated', handleIndividualUpdate);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(autoRefreshInterval);
    };
  }, [connectionStatus]);

  const loadIntegrationStatus = () => {
    const status = integrationManager.getAllIntegrationStatuses();
    setIntegrations(status);
    setLastUpdate(new Date());
    console.log('Integration Status Tab: Loaded statuses', status.length);
  };

  const refreshIntegrations = async () => {
    setIsRefreshing(true);
    
    try {
      await integrationManager.refreshIntegrations();
      loadIntegrationStatus();
    } catch (error) {
      console.error('Integration Status Tab: Refresh failed', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusIcon = (integration: IntegrationStatus) => {
    if (integration.status === 'connecting') {
      return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
    }
    if (!integration.hasConfig) {
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
    if (integration.isActive) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getStatusBadge = (integration: IntegrationStatus) => {
    if (integration.status === 'connecting') {
      return <Badge variant="outline" className="text-blue-600">Connecting</Badge>;
    }
    if (!integration.hasConfig) {
      return <Badge variant="outline">Not Configured</Badge>;
    }
    if (integration.isActive) {
      return <Badge variant="default" className="bg-green-600">Active</Badge>;
    }
    return <Badge variant="destructive">Inactive</Badge>;
  };

  const getConnectionHealthIcon = (health?: string) => {
    switch (health) {
      case 'good':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'poor':
        return <Wifi className="w-4 h-4 text-yellow-500" />;
      case 'disconnected':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mr-3">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">Integration Status</CardTitle>
              <CardDescription>
                Monitor the status of all your integrations
                {connectionStatus === 'offline' && (
                  <span className="text-red-600 ml-2">(Offline)</span>
                )}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
            <Button 
              onClick={refreshIntegrations} 
              disabled={isRefreshing || connectionStatus === 'offline'}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Testing...' : 'Refresh All'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <Card key={integration.name} className="bg-white/50 border border-gray-200/50 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(integration)}
                    <h3 className="font-semibold">{integration.name}</h3>
                    {getConnectionHealthIcon(integration.connectionHealth)}
                  </div>
                  {getStatusBadge(integration)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Last checked:</span>
                    <span>{integration.lastChecked.toLocaleTimeString()}</span>
                  </div>
                  
                  {integration.connectionHealth && (
                    <div className="flex items-center justify-between text-xs">
                      <span>Connection:</span>
                      <span className={`font-medium ${
                        integration.connectionHealth === 'good' ? 'text-green-600' :
                        integration.connectionHealth === 'poor' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {integration.connectionHealth}
                      </span>
                    </div>
                  )}
                  
                  {integration.features && (
                    <div>
                      <p className="text-xs font-medium text-slate-700 mb-1">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {integration.errors && integration.errors.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-red-700 mb-1">Issues:</p>
                      <div className="space-y-1">
                        {integration.errors.map((error, index) => (
                          <p key={index} className="text-xs text-red-600">• {error}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {integration.error && (
                    <div>
                      <p className="text-xs font-medium text-red-700 mb-1">Error:</p>
                      <p className="text-xs text-red-600">{integration.error}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Real-time Integration Monitoring:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Green status:</strong> Integration is working correctly</li>
            <li>• <strong>Yellow status:</strong> Configuration is missing or connection issues</li>
            <li>• <strong>Red status:</strong> There's an issue that needs attention</li>
            <li>• <strong>Blue status:</strong> Currently testing connection</li>
            <li>• <strong>Auto-refresh:</strong> Status updates every 30 seconds automatically</li>
            <li>• <strong>Health monitoring:</strong> Connection quality is monitored in real-time</li>
          </ul>
        </div>

        {connectionStatus === 'offline' && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <WifiOff className="w-5 h-5" />
              <span className="font-medium">No internet connection</span>
            </div>
            <p className="text-sm text-red-700 mt-1">
              Integration testing is disabled while offline. Connection will be restored automatically.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegrationStatusTab;
