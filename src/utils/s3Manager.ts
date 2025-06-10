
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

interface S3Config {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  bucketName: string;
}

class S3Manager {
  private client: S3Client | null = null;
  private bucketName: string = '';
  private isConfigured = false;

  configure(config: S3Config) {
    try {
      this.client = new S3Client({
        region: config.region,
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
          sessionToken: config.sessionToken,
        },
      });

      this.bucketName = config.bucketName;
      this.isConfigured = true;
      console.log('S3 configured successfully');
      this.saveConfig(config);
    } catch (error) {
      console.error('S3 configuration error:', error);
    }
  }

  private saveConfig(config: S3Config) {
    localStorage.setItem('s3_config', JSON.stringify(config));
  }

  getConfig(): S3Config | null {
    const stored = localStorage.getItem('s3_config');
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

  async uploadFile(key: string, file: File, contentType?: string) {
    if (!this.client) {
      throw new Error('S3 not configured');
    }

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file,
      ContentType: contentType || file.type,
    });

    return await this.client.send(command);
  }

  async getFileUrl(key: string, expiresIn = 3600) {
    if (!this.client) {
      throw new Error('S3 not configured');
    }

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await getSignedUrl(this.client, command, { expiresIn });
  }

  async deleteFile(key: string) {
    if (!this.client) {
      throw new Error('S3 not configured');
    }

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await this.client.send(command);
  }

  async listFiles(prefix?: string, maxKeys = 1000) {
    if (!this.client) {
      throw new Error('S3 not configured');
    }

    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: prefix,
      MaxKeys: maxKeys,
    });

    return await this.client.send(command);
  }
}

export const s3Manager = new S3Manager();
