
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
      
      // Store file info in localStorage for demo
      const files = JSON.parse(localStorage.getItem('demo_files') || '[]');
      files.push({
        id: `file_${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: url,
        folder: folder || 'default',
        uploadedAt: new Date().toISOString()
      });
      localStorage.setItem('demo_files', JSON.stringify(files));
      
      toast({
        title: "File Uploaded Successfully",
        description: `${file.name} has been uploaded and is available locally.`,
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
      // Validate image file
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Create a local blob URL for the image
      const url = URL.createObjectURL(file);
      
      // Store image info
      const images = JSON.parse(localStorage.getItem('demo_images') || '[]');
      images.push({
        id: `img_${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: url,
        uploadedAt: new Date().toISOString()
      });
      localStorage.setItem('demo_images', JSON.stringify(images));
      
      toast({
        title: "Image Uploaded Successfully",
        description: `${file.name} has been uploaded and is ready to use.`,
      });
      
      return {
        success: true,
        url: url
      };
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to process image.",
        variant: "destructive",
      });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process image"
      };
    }
  }, [toast]);

  const deleteFile = useCallback(async (fileUrl: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Revoke the blob URL if it's a local blob
      if (fileUrl.startsWith('blob:')) {
        URL.revokeObjectURL(fileUrl);
      }
      
      // Remove from localStorage
      const files = JSON.parse(localStorage.getItem('demo_files') || '[]');
      const images = JSON.parse(localStorage.getItem('demo_images') || '[]');
      
      const updatedFiles = files.filter((file: any) => file.url !== fileUrl);
      const updatedImages = images.filter((image: any) => image.url !== fileUrl);
      
      localStorage.setItem('demo_files', JSON.stringify(updatedFiles));
      localStorage.setItem('demo_images', JSON.stringify(updatedImages));
      
      toast({
        title: "File Deleted",
        description: "File has been removed successfully.",
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to delete file" };
    }
  }, [toast]);

  const listFiles = useCallback(async (folder?: string): Promise<{ success: boolean; files?: string[]; error?: string }> => {
    try {
      const files = JSON.parse(localStorage.getItem('demo_files') || '[]');
      const images = JSON.parse(localStorage.getItem('demo_images') || '[]');
      
      let allFiles = [...files, ...images];
      
      if (folder) {
        allFiles = allFiles.filter((file: any) => file.folder === folder);
      }
      
      const fileUrls = allFiles.map((file: any) => file.url);
      
      return { success: true, files: fileUrls };
    } catch (error) {
      return { success: false, error: "Failed to list files" };
    }
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
        description: result.error || "Failed to send email",
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
    const result = await emailService.sendContactForm(data);
    
    if (result.success) {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
    } else {
      toast({
        title: "Send Failed",
        description: result.error || "Failed to send message",
        variant: "destructive",
      });
    }
    
    return result;
  }, [toast]);

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
      fileUpload: { 
        isActive: () => true,
        status: 'Local Storage Active',
        lastCheck: new Date().toISOString()
      },
      email: {
        isActive: () => true,
        status: 'Demo Mode Active',
        lastCheck: new Date().toISOString()
      },
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
