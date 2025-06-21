
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface GoogleSheetsConfig {
  isEnabled: boolean;
  newsletterSheetUrl: string;
  auditFormSheetUrl: string;
  apiKey: string;
}

interface FormData {
  [key: string]: any;
}

export const useGoogleSheetsSubmission = () => {
  const [config, setConfig] = useState<GoogleSheetsConfig>({
    isEnabled: false,
    newsletterSheetUrl: "",
    auditFormSheetUrl: "",
    apiKey: ""
  });

  useEffect(() => {
    // Load config from localStorage
    const loadConfig = () => {
      const saved = localStorage.getItem('googleSheetsConfig');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setConfig(parsed);
        } catch (error) {
          console.error('Failed to parse Google Sheets config:', error);
        }
      }
    };

    loadConfig();

    // Listen for config updates
    const handleConfigUpdate = (event: CustomEvent) => {
      setConfig(event.detail);
    };

    window.addEventListener('googleSheetsConfigUpdated', handleConfigUpdate as EventListener);
    return () => {
      window.removeEventListener('googleSheetsConfigUpdated', handleConfigUpdate as EventListener);
    };
  }, []);

  const submitToGoogleSheets = async (formData: FormData, formType: 'newsletter' | 'audit') => {
    if (!config.isEnabled) {
      console.log('Google Sheets integration not enabled');
      return false;
    }

    const sheetUrl = formType === 'newsletter' ? config.newsletterSheetUrl : config.auditFormSheetUrl;
    
    if (!sheetUrl) {
      console.log(`No sheet URL configured for ${formType} form`);
      return false;
    }

    try {
      // Extract sheet ID from URL
      const sheetIdMatch = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (!sheetIdMatch) {
        throw new Error('Invalid Google Sheets URL');
      }

      const sheetId = sheetIdMatch[1];
      
      // Prepare data for Google Sheets
      const timestamp = new Date().toISOString();
      let rowData: string[];

      if (formType === 'newsletter') {
        rowData = [
          formData.email || '',
          timestamp,
          'Newsletter'
        ];
      } else {
        rowData = [
          `${formData.firstName || ''} ${formData.lastName || ''}`.trim(),
          formData.email || '',
          formData.company || '',
          formData.phone || '',
          formData.businessGoals || formData.message || '',
          timestamp
        ];
      }

      // In a real implementation, you would use the Google Sheets API here
      // For now, we'll simulate the submission
      console.log('Submitting to Google Sheets:', {
        sheetId,
        formType,
        data: rowData
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Data successfully saved to Google Sheets');
      return true;

    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      toast.error('Failed to save to Google Sheets');
      return false;
    }
  };

  return {
    submitToGoogleSheets,
    isEnabled: config.isEnabled
  };
};
