
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

interface DynamoDBConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
}

class DynamoDBManager {
  private client: DynamoDBDocumentClient | null = null;
  private isConfigured = false;

  configure(config: DynamoDBConfig) {
    try {
      const dynamoClient = new DynamoDBClient({
        region: config.region,
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
          sessionToken: config.sessionToken,
        },
      });

      this.client = DynamoDBDocumentClient.from(dynamoClient);
      this.isConfigured = true;
      console.log('DynamoDB configured successfully');
      this.saveConfig(config);
    } catch (error) {
      console.error('DynamoDB configuration error:', error);
    }
  }

  private saveConfig(config: DynamoDBConfig) {
    localStorage.setItem('dynamodb_config', JSON.stringify(config));
  }

  getConfig(): DynamoDBConfig | null {
    const stored = localStorage.getItem('dynamodb_config');
    return stored ? JSON.parse(stored) : null;
  }

  isActive(): boolean {
    return this.isConfigured && this.client !== null;
  }

  loadSavedConfig() {
    const config = this.getConfig();
    if (config) {
      this.configure(config);
    }
  }

  async putItem(tableName: string, item: Record<string, any>) {
    if (!this.client) {
      throw new Error('DynamoDB not configured');
    }

    const command = new PutCommand({
      TableName: tableName,
      Item: item,
    });

    return await this.client.send(command);
  }

  async getItem(tableName: string, key: Record<string, any>) {
    if (!this.client) {
      throw new Error('DynamoDB not configured');
    }

    const command = new GetCommand({
      TableName: tableName,
      Key: key,
    });

    return await this.client.send(command);
  }

  async scanTable(tableName: string, limit?: number) {
    if (!this.client) {
      throw new Error('DynamoDB not configured');
    }

    const command = new ScanCommand({
      TableName: tableName,
      Limit: limit,
    });

    return await this.client.send(command);
  }

  async queryTable(tableName: string, keyConditionExpression: string, expressionAttributeValues: Record<string, any>) {
    if (!this.client) {
      throw new Error('DynamoDB not configured');
    }

    const command = new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    });

    return await this.client.send(command);
  }
}

export const dynamoDBManager = new DynamoDBManager();
