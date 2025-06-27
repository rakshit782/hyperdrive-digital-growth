
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { dynamoDBManager } from '@/utils/dynamoDBManager';
import { dynamoSyncManager } from '@/utils/dynamoSyncManager';
import { realTimeDynamoSync } from '@/utils/realTimeDynamoSync';
import { 
  Database, 
  RefreshCw, 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle, 
  Clock,
  Zap,
  AlertTriangle
} from 'lucide-react';

const DynamoSyncTab = () => {
  const { toast } = useToast();
  const [syncResults, setSyncResults] = useState<any[]>([]);
  const [syncProgress, setSyncProgress] = useState<any[]>([]);
  const [isManualSyncing, setIsManualSyncing] = useState(false);
  const [realTimeSyncEnabled, setRealTimeSyncEnabled] = useState(false);
  const [queueSize, setQueueSize] = useState(0);

  useEffect(() => {
    // Check if DynamoDB is configured
    const isDynamoConfigured = dynamoDBManager.isActive();
    
    // Check real-time sync status
    setRealTimeSyncEnabled(realTimeDynamoSync.isEnabled());
    
    // Update queue size periodically
    const interval = setInterval(() => {
      setQueueSize(realTimeDynamoSync.getQueueSize());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleProgress = (progress: any[]) => {
      setSyncProgress(progress);
    };

    dynamoSyncManager.onProgress(handleProgress);
  }, []);

  const handleManualSync = async () => {
    if (!dynamoDBManager.isActive()) {
      toast({
        title: "Configuration Required",
        description: "Please configure DynamoDB connection first",
        variant: "destructive",
      });
      return;
    }

    setIsManualSyncing(true);
    setSyncResults([]);
    setSyncProgress([]);

    try {
      const results = await dynamoSyncManager.syncAllTables();
      setSyncResults(results);

      const hasErrors = results.some(r => !r.success);
      toast({
        title: hasErrors ? "Sync Completed with Errors" : "Sync Completed Successfully",
        description: `${results.length} tables processed`,
        variant: hasErrors ? "destructive" : "default",
      });
    } catch (error) {
      console.error('Manual sync error:', error);
      toast({
        title: "Sync Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsManualSyncing(false);
    }
  };

  const handleRealTimeSyncToggle = async (enabled: boolean) => {
    if (!dynamoDBManager.isActive()) {
      toast({
        title: "Configuration Required",
        description: "Please configure DynamoDB connection first",
        variant: "destructive",
      });
      return;
    }

    try {
      if (enabled) {
        await realTimeDynamoSync.startRealTimeSync();
        toast({
          title: "Real-time Sync Started",
          description: "Changes will now be synced automatically to DynamoDB",
        });
      } else {
        await realTimeDynamoSync.stopRealTimeSync();
        toast({
          title: "Real-time Sync Stopped",
          description: "Automatic syncing has been disabled",
        });
      }
      setRealTimeSyncEnabled(enabled);
    } catch (error) {
      console.error('Real-time sync toggle error:', error);
      toast({
        title: "Operation Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const isDynamoConfigured = dynamoDBManager.isActive();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">DynamoDB Synchronization</CardTitle>
                <CardDescription>Sync your Supabase data to DynamoDB</CardDescription>
              </div>
            </div>
            <Badge variant={isDynamoConfigured ? "default" : "destructive"}>
              {isDynamoConfigured ? "Connected" : "Not Configured"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!isDynamoConfigured && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please configure your DynamoDB connection in the DynamoDB tab before using sync features.
              </AlertDescription>
            </Alert>
          )}

          {/* Manual Sync Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Manual Sync
                </h3>
                <p className="text-sm text-gray-600">One-time sync of all tables to DynamoDB</p>
              </div>
              <Button 
                onClick={handleManualSync}
                disabled={!isDynamoConfigured || isManualSyncing}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isManualSyncing ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Start Manual Sync
                  </>
                )}
              </Button>
            </div>

            {/* Sync Progress */}
            {syncProgress.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Sync Progress</h4>
                {syncProgress.map((progress, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{progress.tableName}</span>
                      <div className="flex items-center gap-2">
                        {progress.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {progress.status === 'error' && <XCircle className="w-4 h-4 text-red-500" />}
                        {progress.status === 'syncing' && <Clock className="w-4 h-4 text-blue-500 animate-spin" />}
                        <span className="capitalize">{progress.status}</span>
                      </div>
                    </div>
                    {progress.total > 0 && (
                      <Progress value={(progress.current / progress.total) * 100} className="h-2" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Sync Results */}
            {syncResults.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Sync Results</h4>
                <div className="grid gap-3">
                  {syncResults.map((result, index) => (
                    <Card key={index} className={`border-l-4 ${result.success ? 'border-l-green-500' : 'border-l-red-500'}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{result.tableName}</h5>
                            <p className="text-sm text-gray-600">
                              {result.recordsProcessed} records processed
                            </p>
                          </div>
                          {result.success ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        {result.errors.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-red-600">Errors:</p>
                            <ul className="text-xs text-red-500 mt-1">
                              {result.errors.slice(0, 3).map((error, i) => (
                                <li key={i}>• {error}</li>
                              ))}
                              {result.errors.length > 3 && (
                                <li>• ... and {result.errors.length - 3} more</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Real-time Sync Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Real-time Sync
                </h3>
                <p className="text-sm text-gray-600">
                  Automatically sync changes to DynamoDB as they happen
                </p>
                {realTimeSyncEnabled && queueSize > 0 && (
                  <p className="text-xs text-blue-600 mt-1">
                    Queue: {queueSize} items pending sync
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="realtime-sync">
                  {realTimeSyncEnabled ? "Enabled" : "Disabled"}
                </Label>
                <Switch
                  id="realtime-sync"
                  checked={realTimeSyncEnabled}
                  onCheckedChange={handleRealTimeSyncToggle}
                  disabled={!isDynamoConfigured}
                />
              </div>
            </div>

            {realTimeSyncEnabled && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-green-800">
                    Real-time sync is active
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  All database changes are being automatically synced to DynamoDB
                </p>
              </div>
            )}
          </div>

          {/* Table Schema Info */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Supported Tables</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(dynamoSyncManager.getTableSchemas()).map((tableName) => (
                <div key={tableName} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{tableName}</span>
                    <Database className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamoSyncTab;
