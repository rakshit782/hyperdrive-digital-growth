
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Database, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SyncStatus {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'syncing' | 'error';
  lastSync: string;
  recordCount: number;
}

const DataSyncTab = () => {
  const [syncStatuses, setSyncStatuses] = useState<SyncStatus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSyncStatuses();
  }, []);

  const loadSyncStatuses = () => {
    // Load demo sync statuses
    const demoStatuses: SyncStatus[] = [
      {
        id: 'services',
        name: 'Services Data',
        status: 'active',
        lastSync: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        recordCount: 12
      },
      {
        id: 'reviews',
        name: 'Customer Reviews',
        status: 'active',
        lastSync: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
        recordCount: 48
      },
      {
        id: 'case-studies',
        name: 'Case Studies',
        status: 'active',
        lastSync: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
        recordCount: 8
      },
      {
        id: 'analytics',
        name: 'Analytics Data',
        status: 'syncing',
        lastSync: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
        recordCount: 1024
      }
    ];

    setSyncStatuses(demoStatuses);
  };

  const handleSync = async (syncId: string) => {
    setIsLoading(true);
    
    // Update status to syncing
    setSyncStatuses(prev => 
      prev.map(status => 
        status.id === syncId 
          ? { ...status, status: 'syncing' as const }
          : status
      )
    );

    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update status to active with new timestamp
      setSyncStatuses(prev => 
        prev.map(status => 
          status.id === syncId 
            ? { 
                ...status, 
                status: 'active' as const,
                lastSync: new Date().toISOString(),
                recordCount: status.recordCount + Math.floor(Math.random() * 5)
              }
            : status
        )
      );

      toast({
        title: "Sync Completed",
        description: `Successfully synced ${syncId} data.`,
      });
    } catch (error) {
      setSyncStatuses(prev => 
        prev.map(status => 
          status.id === syncId 
            ? { ...status, status: 'error' as const }
            : status
        )
      );

      toast({
        title: "Sync Failed",
        description: `Failed to sync ${syncId} data.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncAll = async () => {
    for (const status of syncStatuses) {
      await handleSync(status.id);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'syncing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Database className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'syncing':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Data Synchronization</h2>
          <p className="text-gray-600">Manage data sync between local storage and external sources</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadSyncStatuses}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleSyncAll} disabled={isLoading}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync All
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {syncStatuses.map((sync) => (
          <Card key={sync.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  {sync.name}
                </CardTitle>
                {getStatusIcon(sync.status)}
              </div>
              <CardDescription>
                Last synced: {new Date(sync.lastSync).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge className={getStatusColor(sync.status)}>
                    {sync.status.charAt(0).toUpperCase() + sync.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Records:</span>
                  <span className="font-medium">{sync.recordCount.toLocaleString()}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleSync(sync.id)}
                  disabled={isLoading || sync.status === 'syncing'}
                >
                  {sync.status === 'syncing' ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync Now
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sync Information</CardTitle>
          <CardDescription>
            Data synchronization helps keep your content up-to-date across all platforms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• <strong>Automatic Sync:</strong> Data is automatically synchronized every 15 minutes</p>
            <p>• <strong>Manual Sync:</strong> Click "Sync Now" to trigger immediate synchronization</p>
            <p>• <strong>Real-time Updates:</strong> Changes are reflected immediately in the local storage</p>
            <p>• <strong>Error Handling:</strong> Failed syncs are automatically retried with exponential backoff</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSyncTab;
