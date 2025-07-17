
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, RefreshCw, Settings, FileText, Database, Wifi, WifiOff, Clock } from 'lucide-react';
import { useServicePageConfig } from '@/hooks/useServicePageConfig';
import ServicePageEditor from './ServicePageEditor';
import ServicePageCustomizer from './ServicePageCustomizer';
import UnifiedServiceContentManager from './UnifiedServiceContentManager';
import ServiceDataEditor from './ServiceDataEditor';

const ServicePagesManagementTab = () => {
  const { configs, loading, saveConfig, refetch } = useServicePageConfig();
  const [editingService, setEditingService] = useState<string | null>(null);
  const [customizingService, setCustomizingService] = useState<string | null>(null);
  const [showUnifiedManager, setShowUnifiedManager] = useState(false);
  const [editingData, setEditingData] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [isAutoSyncing, setIsAutoSyncing] = useState(false);

  useEffect(() => {
    // Monitor connection status
    const handleOnline = () => {
      setConnectionStatus('online');
      console.log('Service Pages: Connection restored, syncing data...');
      refetch();
    };

    const handleOffline = () => {
      setConnectionStatus('offline');
      console.log('Service Pages: Connection lost');
    };

    // Auto-sync every 60 seconds when online
    const autoSyncInterval = setInterval(async () => {
      if (connectionStatus === 'online' && !loading) {
        setIsAutoSyncing(true);
        try {
          await refetch();
          setLastSync(new Date());
        } catch (error) {
          console.error('Service Pages: Auto-sync failed', error);
        } finally {
          setIsAutoSyncing(false);
        }
      }
    }, 60000);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(autoSyncInterval);
    };
  }, [connectionStatus, loading, refetch]);

  const handleSave = async (config: any) => {
    try {
      await saveConfig(config.serviceType, config);
      setEditingService(null);
      setLastSync(new Date());
    } catch (error) {
      console.error('Service Pages: Save failed', error);
    }
  };

  const handleCancel = () => {
    setEditingService(null);
  };

  const handleRefresh = async () => {
    try {
      await refetch();
      setLastSync(new Date());
    } catch (error) {
      console.error('Service Pages: Manual refresh failed', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading service configurations...</p>
        </div>
      </div>
    );
  }

  if (editingService && configs[editingService]) {
    return (
      <ServicePageEditor
        config={configs[editingService]}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  if (customizingService) {
    return (
      <ServicePageCustomizer
        serviceType={customizingService}
        onClose={() => setCustomizingService(null)}
      />
    );
  }

  if (showUnifiedManager) {
    return (
      <UnifiedServiceContentManager
        onClose={() => setShowUnifiedManager(false)}
      />
    );
  }

  if (editingData) {
    return (
      <ServiceDataEditor
        serviceType={editingData}
        onClose={() => setEditingData(null)}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Service Pages Management</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-sm text-slate-500">
              {connectionStatus === 'online' ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-500" />
              )}
              <span>
                {connectionStatus === 'online' ? 'Connected' : 'Offline'}
              </span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              {isAutoSyncing && <Clock className="w-4 h-4 animate-pulse" />}
              <span>Last sync: {lastSync.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setShowUnifiedManager(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            disabled={connectionStatus === 'offline'}
          >
            <FileText className="w-4 h-4 mr-2" />
            Unified Content Manager
          </Button>
          <Button 
            onClick={handleRefresh} 
            variant="outline"
            disabled={loading || connectionStatus === 'offline'}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${(loading || isAutoSyncing) ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {connectionStatus === 'offline' && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800">
            <WifiOff className="w-5 h-5" />
            <span className="font-medium">Offline Mode</span>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            Some features are disabled while offline. Changes will sync when connection is restored.
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(configs).map(([serviceType, config]) => (
          <Card key={serviceType} className="relative hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg capitalize flex items-center gap-2">
                    {serviceType.replace('-', ' ')} Service
                    {connectionStatus === 'online' && (
                      <Badge variant="outline" className="text-green-600 border-green-300">
                        <Wifi className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{config.title}</CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/${serviceType === 'meta' ? 'meta-advertising' : serviceType === 'amazon' ? 'amazon-advertising' : serviceType === 'walmart' ? 'walmart-advertising' : serviceType}`, '_blank')}
                    title="Preview page"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingData(serviceType)}
                    disabled={connectionStatus === 'offline'}
                    title="Edit data"
                  >
                    <Database className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCustomizingService(serviceType)}
                    disabled={connectionStatus === 'offline'}
                    title="Customize page"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingService(serviceType)}
                    disabled={connectionStatus === 'offline'}
                    title="Edit configuration"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-slate-600">
                  <strong>Services:</strong> {config.services?.length || 0} items
                </p>
                <p className="text-sm text-slate-600">
                  <strong>Benefits:</strong> {config.benefits?.length || 0} items
                </p>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {config.heroDescription}
                </p>
                {connectionStatus === 'online' && (
                  <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Real-time sync enabled</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">✨ NEW: Real-time Content Management</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Real-time Features:</h4>
            <ul className="space-y-1">
              <li>• Live connection monitoring and status indicators</li>
              <li>• Automatic data synchronization every 60 seconds</li>
              <li>• Offline mode with change queuing</li>
              <li>• Real-time collaboration support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Content Management:</h4>
            <ul className="space-y-1">
              <li>• Unified interface for all 8 service pages</li>
              <li>• Instant content updates across all pages</li>
              <li>• Version control and change tracking</li>
              <li>• Cross-device synchronization</li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <Button 
            onClick={() => setShowUnifiedManager(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            disabled={connectionStatus === 'offline'}
          >
            <FileText className="w-4 h-4 mr-2" />
            Open Unified Content Manager
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicePagesManagementTab;
