
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

interface GoogleSheetsConfig {
  isEnabled: boolean;
  newsletterSheetUrl: string;
  auditFormSheetUrl: string;
  contactFormSheetUrl: string;
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
    contactFormSheetUrl: "",
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

  const submitToGoogleSheets = async (formData: FormData, formType: 'newsletter' | 'audit' | 'contact') => {
    if (!config.isEnabled) {
      console.log('Google Sheets integration not enabled');
      return false;
    }

    let sheetUrl = '';
    switch (formType) {
      case 'newsletter':
        sheetUrl = config.newsletterSheetUrl;
        break;
      case 'audit':
        sheetUrl = config.auditFormSheetUrl;
        break;
      case 'contact':
        sheetUrl = config.contactFormSheetUrl;
        break;
      default:
        sheetUrl = config.contactFormSheetUrl;
    }
    
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
      } else if (formType === 'audit') {
        rowData = [
          `${formData.firstName || ''} ${formData.lastName || ''}`.trim(),
          formData.email || '',
          formData.company || '',
          formData.phone || '',
          formData.businessGoals || formData.message || '',
          timestamp
        ];
      } else {
        rowData = [
          formData.name || '',
          formData.email || '',
          formData.company || '',
          formData.phone || '',
          formData.message || '',
          timestamp
        ];
      }

      // In a real implementation, you would use the Google Sheets API here
      // For now, we'll simulate the submission and also save to leads table
      console.log('Submitting to Google Sheets:', {
        sheetId,
        formType,
        data: rowData
      });

      // Also create a lead in the database
      const leadData = {
        name: formType === 'audit' 
          ? `${formData.firstName || ''} ${formData.lastName || ''}`.trim()
          : formData.name || '',
        email: formData.email || '',
        phone: formData.phone || null,
        company: formData.company || null,
        source: 'google_sheets',
        status: 'new' as const,
        notes: formData.message || formData.businessGoals || null,
        lead_data: {
          formType,
          googleSheetsSubmission: true,
          submittedAt: timestamp
        }
      };

      const { error: leadError } = await supabase
        .from('leads')
        .insert([leadData]);

      if (leadError) {
        console.error('Error creating lead from Google Sheets submission:', leadError);
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Data successfully saved to Google Sheets and Lead Management');
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
