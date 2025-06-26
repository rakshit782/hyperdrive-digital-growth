
import { dynamoDBManager } from './dynamoDBManager';
import { supabase } from '@/integrations/supabase/client';
import type { BlogPost, PricingPlan, FAQ, Lead, WebsiteSetting } from '@/hooks/useSupabaseData';

interface SyncResult {
  success: boolean;
  tableName: string;
  recordsProcessed: number;
  errors: string[];
}

interface SyncProgress {
  tableName: string;
  current: number;
  total: number;
  status: 'pending' | 'syncing' | 'completed' | 'error';
}

class DynamoSyncManager {
  private syncInProgress = false;
  private progressCallbacks: ((progress: SyncProgress[]) => void)[] = [];

  // Table mapping for DynamoDB
  private tableSchemas = {
    blog_posts: {
      tableName: 'blog_posts',
      primaryKey: 'id',
      attributes: {
        id: 'S',
        title: 'S',
        slug: 'S',
        content: 'S',
        excerpt: 'S',
        featured_image: 'S',
        status: 'S',
        tags: 'SS',
        meta_title: 'S',
        meta_description: 'S',
        published_at: 'S',
        created_at: 'S',
        updated_at: 'S',
        author_id: 'S'
      }
    },
    pricing_plans: {
      tableName: 'pricing_plans',
      primaryKey: 'id',
      attributes: {
        id: 'S',
        name: 'S',
        description: 'S',
        price: 'N',
        billing_period: 'S',
        features: 'SS',
        is_popular: 'BOOL',
        is_active: 'BOOL',
        sort_order: 'N',
        created_at: 'S',
        updated_at: 'S'
      }
    },
    faqs: {
      tableName: 'faqs',
      primaryKey: 'id',
      attributes: {
        id: 'S',
        question: 'S',
        answer: 'S',
        category: 'S',
        is_active: 'BOOL',
        sort_order: 'N',
        created_at: 'S',
        updated_at: 'S'
      }
    },
    leads: {
      tableName: 'leads',
      primaryKey: 'id',
      attributes: {
        id: 'S',
        name: 'S',
        email: 'S',
        phone: 'S',
        company: 'S',
        source: 'S',
        status: 'S',
        notes: 'S',
        lead_data: 'M',
        assigned_to: 'S',
        created_at: 'S',
        updated_at: 'S'
      }
    },
    website_settings: {
      tableName: 'website_settings',
      primaryKey: 'id',
      attributes: {
        id: 'S',
        setting_key: 'S',
        setting_value: 'M',
        setting_type: 'S',
        created_at: 'S',
        updated_at: 'S'
      }
    },
    analytics_events: {
      tableName: 'analytics_events',
      primaryKey: 'id',
      attributes: {
        id: 'S',
        event_name: 'S',
        session_id: 'S',
        user_agent: 'S',
        page_url: 'S',
        referrer: 'S',
        event_data: 'M',
        user_id: 'S',
        ip_address: 'S',
        created_at: 'S'
      }
    }
  };

  onProgress(callback: (progress: SyncProgress[]) => void) {
    this.progressCallbacks.push(callback);
  }

  private notifyProgress(progress: SyncProgress[]) {
    this.progressCallbacks.forEach(callback => callback(progress));
  }

  async syncAllTables(): Promise<SyncResult[]> {
    if (this.syncInProgress) {
      throw new Error('Sync already in progress');
    }

    if (!dynamoDBManager.isActive()) {
      throw new Error('DynamoDB not configured');
    }

    this.syncInProgress = true;
    const results: SyncResult[] = [];
    const tableNames = Object.keys(this.tableSchemas);
    
    // Initialize progress
    const progress: SyncProgress[] = tableNames.map(tableName => ({
      tableName,
      current: 0,
      total: 0,
      status: 'pending'
    }));

    try {
      for (let i = 0; i < tableNames.length; i++) {
        const tableName = tableNames[i];
        progress[i].status = 'syncing';
        this.notifyProgress([...progress]);

        const result = await this.syncTable(tableName);
        results.push(result);

        progress[i].status = result.success ? 'completed' : 'error';
        progress[i].current = result.recordsProcessed;
        progress[i].total = result.recordsProcessed;
        this.notifyProgress([...progress]);
      }
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      this.syncInProgress = false;
    }

    return results;
  }

  private async syncTable(tableName: string): Promise<SyncResult> {
    const result: SyncResult = {
      success: false,
      tableName,
      recordsProcessed: 0,
      errors: []
    };

    try {
      // Fetch data from Supabase
      const { data, error } = await supabase
        .from(tableName)
        .select('*');

      if (error) {
        result.errors.push(`Failed to fetch from Supabase: ${error.message}`);
        return result;
      }

      if (!data || data.length === 0) {
        result.success = true;
        return result;
      }

      // Convert and insert data to DynamoDB
      const schema = this.tableSchemas[tableName as keyof typeof this.tableSchemas];
      
      for (const record of data) {
        try {
          const dynamoItem = this.convertToDynamoItem(record, schema);
          await dynamoDBManager.putItem(tableName, dynamoItem);
          result.recordsProcessed++;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          result.errors.push(`Failed to insert record ${record.id}: ${errorMessage}`);
        }
      }

      result.success = result.errors.length === 0;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      result.errors.push(`Table sync failed: ${errorMessage}`);
    }

    return result;
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

  async syncSingleTable(tableName: string): Promise<SyncResult> {
    if (!dynamoDBManager.isActive()) {
      throw new Error('DynamoDB not configured');
    }

    return await this.syncTable(tableName);
  }

  isSyncInProgress(): boolean {
    return this.syncInProgress;
  }

  getTableSchemas() {
    return this.tableSchemas;
  }
}

export const dynamoSyncManager = new DynamoSyncManager();
