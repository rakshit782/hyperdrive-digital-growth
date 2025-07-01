
import { useCallback } from 'react';
import { emailService, EmailResult } from '@/services/emailService';
import { cdnService, CacheResult, AnalyticsResult } from '@/services/cdnService';
import { useToast } from '@/hooks/use-toast';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export const useServices = () => {
  const { toast } = useToast();

  const uploadFile = useCallback(async (file: File, folder?: string): Promise<UploadResult> => {
    try {
      // Create a local blob URL for the file (demo purposes)
      const url = URL.createObjectURL(file);
      
      toast({
        title: "File Uploaded Locally",
        description: "Your file has been processed locally. Configure a file storage service for production.",
      });
      
      return {
        success: true,
        url: url
      };
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to process file locally.",
        variant: "destructive",
      });
      
      return {
        success: false,
        error: "Failed to process file"
      };
    }
  }, [toast]);

  const uploadImage = useCallback(async (file: File): Promise<UploadResult> => {
    try {
      // Create a local blob URL for the image (demo purposes)
      const url = URL.createObjectURL(file);
      
      toast({
        title: "Image Uploaded Locally",
        description: "Your image has been processed locally. Configure a file storage service for production.",
      });
      
      return {
        success: true,
        url: url
      };
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to process image locally.",
        variant: "destructive",
      });
      
      return {
        success: false,
        error: "Failed to process image"
      };
    }
  }, [toast]);

  const deleteFile = useCallback(async (fileUrl: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Revoke the blob URL if it's a local blob
      if (fileUrl.startsWith('blob:')) {
        URL.revokeObjectURL(fileUrl);
      }
      
      toast({
        title: "File Deleted",
        description: "File has been removed locally.",
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to delete file" };
    }
  }, [toast]);

  const listFiles = useCallback(async (folder?: string): Promise<{ success: boolean; files?: string[]; error?: string }> => {
    // Return empty list for local storage
    return { success: true, files: [] };
  }, []);

  const sendEmail = useCallback(async (
    to: string[],
    subject: string,
    htmlBody: string,
    textBody?: string
  ): Promise<EmailResult> => {
    const result = await emailService.sendEmail(to, subject, htmlBody, textBody);
    
    if (result.success) {
      toast({
        title: "Email Sent",
        description: "Your email has been sent successfully.",
      });
    } else {
      toast({
        title: "Email Failed",
        description: result.error,
        variant: "destructive",
      });
    }
    
    return result;
  }, [toast]);

  const sendContactForm = useCallback(async (data: {
    name: string;
    email: string;
    company?: string;
    message: string;
  }): Promise<EmailResult> => {
    return await emailService.sendContactForm(data);
  }, []);

  const purgeCache = useCallback(async (urls?: string[]): Promise<CacheResult> => {
    const result = await cdnService.purgeCache(urls);
    
    if (result.success) {
      toast({
        title: "Cache Purged",
        description: result.message,
      });
    } else {
      toast({
        title: "Cache Purge Failed",
        description: result.error,
        variant: "destructive",
      });
    }
    
    return result;
  }, [toast]);

  const getCDNAnalytics = useCallback(async (): Promise<AnalyticsResult> => {
    return await cdnService.getAnalytics();
  }, []);

  const getServiceStatus = useCallback(() => {
    return {
      fileUpload: { isActive: () => true }, // Mock service status
      email: emailService,
      cdn: cdnService.getStatus(),
    };
  }, []);

  return {
    // File operations
    uploadFile,
    uploadImage,
    deleteFile,
    listFiles,
    
    // Email operations
    sendEmail,
    sendContactForm,
    sendWelcomeEmail: emailService.sendWelcomeEmail.bind(emailService),
    sendPasswordResetEmail: emailService.sendPasswordResetEmail.bind(emailService),
    
    // CDN operations
    purgeCache,
    getCDNAnalytics,
    
    // Service status
    getServiceStatus,
  };
};
