
import { s3Manager } from '@/utils/s3Manager';

export interface UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

class FileUploadService {
  private static instance: FileUploadService;

  static getInstance(): FileUploadService {
    if (!FileUploadService.instance) {
      FileUploadService.instance = new FileUploadService();
    }
    return FileUploadService.instance;
  }

  async uploadFile(file: File, folder: string = 'uploads'): Promise<UploadResult> {
    try {
      if (!s3Manager.isActive()) {
        return {
          success: false,
          error: 'S3 storage is not configured. Please configure AWS S3 in the dashboard.'
        };
      }

      const timestamp = Date.now();
      const fileName = `${folder}/${timestamp}-${file.name}`;
      
      await s3Manager.uploadFile(fileName, file);
      const url = await s3Manager.getFileUrl(fileName);

      return {
        success: true,
        url,
        key: fileName
      };
    } catch (error) {
      console.error('File upload error:', error);
      return {
        success: false,
        error: `Upload failed: ${error}`
      };
    }
  }

  async uploadImage(file: File): Promise<UploadResult> {
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: 'Please select a valid image file'
      };
    }

    return this.uploadFile(file, 'images');
  }

  async deleteFile(key: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!s3Manager.isActive()) {
        return {
          success: false,
          error: 'S3 storage is not configured'
        };
      }

      await s3Manager.deleteFile(key);
      return { success: true };
    } catch (error) {
      console.error('File deletion error:', error);
      return {
        success: false,
        error: `Deletion failed: ${error}`
      };
    }
  }

  async listFiles(prefix?: string): Promise<{ success: boolean; files?: any[]; error?: string }> {
    try {
      if (!s3Manager.isActive()) {
        return {
          success: false,
          error: 'S3 storage is not configured'
        };
      }

      const result = await s3Manager.listFiles(prefix);
      return {
        success: true,
        files: result.Contents || []
      };
    } catch (error) {
      console.error('File listing error:', error);
      return {
        success: false,
        error: `Listing failed: ${error}`
      };
    }
  }
}

export const fileUploadService = FileUploadService.getInstance();
