
import { supabase } from '@/integrations/supabase/client';
import { dynamoDBManager } from './dynamoDBManager';
import { dynamoSyncManager } from './dynamoSyncManager';

interface RealtimeSyncConfig {
  enabled: boolean;
  tables: string[];
  retryAttempts: number;
  retryDelay: number;
}

class RealTimeDynamoSync {
  private config: RealtimeSyncConfig = {
    enabled: false,
    tables: ['blog_posts', 'pricing_plans', 'faqs', 'leads', 'website_settings', 'analytics_events'],
    retryAttempts: 3,
    retryDelay: 1000
  };

  private subscriptions: { [key: string]: any } = {};
  private syncQueue: Array<{ table: string; operation: string; record: any }> = [];
  private processingQueue = false;

  async startRealTimeSync(): Promise<void> {
    if (!dynamoDBManager.isActive()) {
      throw new Error('DynamoDB not configured');
    }

    if (this.config.enabled) {
      console.log('Real-time sync already enabled');
      return;
    }

    console.log('Starting real-time DynamoDB sync...');
    this.config.enabled = true;

    // Subscribe to changes for each table
    for (const tableName of this.config.tables) {
      await this.subscribeToTable(tableName);
    }

    // Start processing sync queue
    this.processQueue();
    
    console.log('Real-time sync started for tables:', this.config.tables);
  }

  async stopRealTimeSync(): Promise<void> {
    console.log('Stopping real-time DynamoDB sync...');
    this.config.enabled = false;

    // Unsubscribe from all tables
    Object.values(this.subscriptions).forEach(subscription => {
      supabase.removeChannel(subscription);
    });

    this.subscriptions = {};
    console.log('Real-time sync stopped');
  }

  private async subscribeToTable(tableName: string): Promise<void> {
    const channel = supabase
      .channel(`realtime-${tableName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName
        },
        (payload) => this.handleDatabaseChange(tableName, payload)
      )
      .subscribe();

    this.subscriptions[tableName] = channel;
  }

  private handleDatabaseChange(tableName: string, payload: any): void {
    if (!this.config.enabled) return;

    console.log(`Database change detected in ${tableName}:`, payload.eventType);

    // Add to sync queue
    this.syncQueue.push({
      table: tableName,
      operation: payload.eventType,
      record: payload.new || payload.old
    });
  }

  private async processQueue(): Promise<void> {
    if (this.processingQueue || !this.config.enabled) return;

    this.processingQueue = true;

    while (this.syncQueue.length > 0 && this.config.enabled) {
      const item = this.syncQueue.shift();
      if (!item) continue;

      try {
        await this.syncRecordToDynamo(item.table, item.operation, item.record);
      } catch (error) {
        console.error(`Failed to sync ${item.table} record:`, error);
        
        // Add back to queue for retry (with limit)
        if (item.record._retryCount === undefined) {
          item.record._retryCount = 0;
        }

        if (item.record._retryCount < this.config.retryAttempts) {
          item.record._retryCount++;
          this.syncQueue.push(item);
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
        }
      }
    }

    this.processingQueue = false;

    // Continue processing if more items were added
    if (this.syncQueue.length > 0 && this.config.enabled) {
      setTimeout(() => this.processQueue(), 100);
    }
  }

  private async syncRecordToDynamo(tableName: string, operation: string, record: any): Promise<void> {
    const schemas = dynamoSyncManager.getTableSchemas();
    const schema = schemas[tableName as keyof typeof schemas];
    
    if (!schema) {
      throw new Error(`Schema not found for table: ${tableName}`);
    }

    switch (operation) {
      case 'INSERT':
      case 'UPDATE':
        const dynamoItem = this.convertToDynamoItem(record, schema);
        await dynamoDBManager.putItem(tableName, dynamoItem);
        break;
      
      case 'DELETE':
        const key = { [schema.primaryKey]: record[schema.primaryKey] };
        // Note: DynamoDB delete would need to be implemented in dynamoDBManager
        console.log(`Delete operation for ${tableName}:`, key);
        break;
    }
  }

  private convertToDynamoItem(record: any, schema: any): Record<string, any> {
    const item: Record<string, any> = {};

    for (const [key, value] of Object.entries(record)) {
      if (value === null || value === undefined) continue;

      const attributeType = schema.attributes[key];
      if (!attributeType) continue;

      switch (attributeType) {
        case 'S':
          item[key] = String(value);
          break;
        case 'N':
          item[key] = Number(value);
          break;
        case 'BOOL':
          item[key] = Boolean(value);
          break;
        case 'SS':
          item[key] = Array.isArray(value) ? value.map(String) : [String(value)];
          break;
        case 'M':
          item[key] = typeof value === 'object' ? value : { value: String(value) };
          break;
        default:
          item[key] = String(value);
      }
    }

    return item;
  }

  isEnabled(): boolean {
    return this.config.enabled;
  }

  getQueueSize(): number {
    return this.syncQueue.length;
  }

  getConfig(): RealtimeSyncConfig {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<RealtimeSyncConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

export const realTimeDynamoSync = new RealTimeDynamoSync();
