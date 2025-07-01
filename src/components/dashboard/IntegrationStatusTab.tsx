
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { integrationManager, IntegrationStatus } from "@/utils/integrationManager";
import { Activity, CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react";

const IntegrationStatusTab = () => {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadIntegrationStatus();
    
    // Listen for integration status changes
    const handleStatusChange = () => {
      loadIntegrationStatus();
    };
    
    window.addEventListener('integrationStatusChanged', handleStatusChange);
    return () => window.removeEventListener('integrationStatusChanged', handleStatusChange);
  }, []);

  const loadIntegrationStatus = () => {
    const status = integrationManager.getAllIntegrationStatuses();
    setIntegrations(status);
    console.log('Integration Status:', status);
  };

  const refreshIntegrations = async () => {
    setIsRefreshing(true);
    
    // Test each integration
    const updatedIntegrations = await Promise.all(
      integrations.map(async (integration) => {
        const isWorking = await integrationManager.testIntegration(integration.name);
        return {
          ...integration,
          isActive: isWorking,
          lastChecked: new Date()
        };
      })
    );
    
    setIntegrations(updatedIntegrations);
    setIsRefreshing(false);
  };

  const getStatusIcon = (integration: IntegrationStatus) => {
    if (!integration.hasConfig) {
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
    if (integration.isActive) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getStatusBadge = (integration: IntegrationStatus) => {
    if (!integration.hasConfig) {
      return <Badge variant="outline">Not Configured</Badge>;
    }
    if (integration.isActive) {
      return <Badge variant="default">Active</Badge>;
    }
    return <Badge variant="destructive">Inactive</Badge>;
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
              <CardDescription>Monitor the status of all your integrations</CardDescription>
            </div>
          </div>
          <Button 
            onClick={refreshIntegrations} 
            disabled={isRefreshing}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Testing...' : 'Refresh All'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <Card key={integration.name} className="bg-white/50 border border-gray-200/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(integration)}
                    <h3 className="font-semibold">{integration.name}</h3>
                  </div>
                  {getStatusBadge(integration)}
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-slate-500">
                    Last checked: {integration.lastChecked.toLocaleTimeString()}
                  </p>
                  
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Integration Guide:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Configure each integration in their respective dashboard sections</li>
            <li>• Green status means the integration is working correctly</li>
            <li>• Yellow status indicates configuration is missing</li>
            <li>• Red status means there's an issue that needs attention</li>
            <li>• Use the "Refresh All" button to test connectivity</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationStatusTab;
