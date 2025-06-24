
import { useCallback } from 'react';
import { fileUploadService, UploadResult } from '@/services/fileUploadService';
import { emailService, EmailResult } from '@/services/emailService';
import { cdnService, CacheResult, AnalyticsResult } from '@/services/cdnService';
import { useToast } from '@/hooks/use-toast';

export const useServices = () => {
  const { toast } = useToast();

  const uploadFile = useCallback(async (file: File, folder?: string): Promise<UploadResult> => {
    const result = await fileUploadService.uploadFile(file, folder);
    
    if (result.success) {
      toast({
        title: "File Uploaded",
        description: "Your file has been uploaded successfully.",
      });
    } else {
      toast({
        title: "Upload Failed",
        description: result.error,
        variant: "destructive",
      });
    }
    
    return result;
  }, [toast]);

  const uploadImage = useCallback(async (file: File): Promise<UploadResult> => {
    const result = await fileUploadService.uploadImage(file);
    
    if (result.success) {
      toast({
        title: "Image Uploaded",
        description: "Your image has been uploaded successfully.",
      });
    } else {
      toast({
        title: "Upload Failed",
        description: result.error,
        variant: "destructive",
      });
    }
    
    return result;
  }, [toast]);

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
      fileUpload: fileUploadService,
      email: emailService,
      cdn: cdnService.getStatus(),
    };
  }, []);

  return {
    // File operations
    uploadFile,
    uploadImage,
    deleteFile: fileUploadService.deleteFile.bind(fileUploadService),
    listFiles: fileUploadService.listFiles.bind(fileUploadService),
    
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
