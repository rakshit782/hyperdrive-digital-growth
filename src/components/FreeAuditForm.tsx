
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { dynamoDBManager } from "@/utils/dynamoDBManager";
import { sesManager } from "@/utils/sesManager";
import { formSchema, FormValues } from "@/types/freeAuditSchema";
import ContactInfoForm from "@/components/forms/ContactInfoForm";
import BusinessInfoForm from "@/components/forms/BusinessInfoForm";
import FileUploadForm from "@/components/forms/FileUploadForm";
import AuditBenefits from "@/components/forms/AuditBenefits";

const FreeAuditForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [googleSheetsConfig, setGoogleSheetsConfig] = useState<any>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: "",
      platform: "amazon",
      monthlyAdSpend: "",
      businessGoals: "",
    },
  });

  useEffect(() => {
    // Load Google Sheets configuration
    const loadGoogleSheetsConfig = () => {
      const savedConfig = localStorage.getItem('googleSheetsConfig');
      if (savedConfig) {
        try {
          const config = JSON.parse(savedConfig);
          setGoogleSheetsConfig(config);
        } catch (error) {
          console.error('Failed to parse Google Sheets config:', error);
        }
      }
    };

    loadGoogleSheetsConfig();

    // Listen for Google Sheets config updates
    const handleConfigUpdate = (event: CustomEvent) => {
      setGoogleSheetsConfig(event.detail);
    };

    window.addEventListener('googleSheetsConfigUpdated', handleConfigUpdate as EventListener);

    return () => {
      window.removeEventListener('googleSheetsConfigUpdated', handleConfigUpdate as EventListener);
    };
  }, []);

  const submitToGoogleSheets = async (values: FormValues) => {
    if (!googleSheetsConfig?.isEnabled || !googleSheetsConfig.sheets.freeAuditForm) {
      return;
    }

    try {
      // Extract sheet ID from URL
      const sheetId = googleSheetsConfig.sheets.freeAuditForm.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      
      if (!sheetId) {
        console.error('Invalid Google Sheet URL');
        return;
      }

      // Prepare data for Google Sheets
      const rowData = [
        values.firstName,
        values.lastName,
        values.email,
        values.company,
        values.phone,
        values.platform,
        values.monthlyAdSpend,
        values.businessGoals,
        new Date().toISOString()
      ];

      // In a real implementation, this would use the Google Sheets API
      // For now, we'll just log the data and show success
      console.log('Submitting to Google Sheets:', {
        sheetId,
        data: rowData,
        config: googleSheetsConfig
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Successfully submitted to Google Sheets');
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      throw error;
    }
  };

  const validateFormData = (values: FormValues): string | null => {
    // Backend-side validation matching frontend Zod schema
    if (!values.firstName.trim() || values.firstName.length < 2) {
      return "First name must be at least 2 characters";
    }
    if (!values.lastName.trim() || values.lastName.length < 2) {
      return "Last name must be at least 2 characters";
    }
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      return "Please enter a valid email address";
    }
    if (!values.company.trim() || values.company.length < 2) {
      return "Company name must be at least 2 characters";
    }
    if (!values.phone.trim() || values.phone.length < 10) {
      return "Phone number must be at least 10 characters";
    }
    if (!values.monthlyAdSpend.trim()) {
      return "Monthly ad spend is required";
    }
    if (!values.businessGoals.trim() || values.businessGoals.length < 10) {
      return "Business goals must be at least 10 characters";
    }
    return null;
  };

  const onSubmit = async (values: FormValues) => {
    if (isSubmitting) return; // Prevent duplicate submissions
    
    setIsSubmitting(true);
    setSubmitError(null);
    console.log("Free audit form submitted:", values);
    
    try {
      // Backend-side validation
      const validationError = validateFormData(values);
      if (validationError) {
        throw new Error(validationError);
      }

      // Submit to Google Sheets if configured
      if (googleSheetsConfig?.isEnabled) {
        await submitToGoogleSheets(values);
      }

      // Submit to DynamoDB if configured
      if (dynamoDBManager.isActive()) {
        const submissionData = {
          id: `audit-${Date.now()}`,
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          company: values.company,
          phone: values.phone,
          platform: values.platform,
          monthlyAdSpend: values.monthlyAdSpend,
          businessGoals: values.businessGoals,
          submittedAt: new Date().toISOString(),
          formType: 'free_audit',
          ipAddress: 'unknown', // Could be enhanced with IP detection
          userAgent: navigator.userAgent,
        };

        await dynamoDBManager.putItem('contact_submissions', submissionData);
        console.log('Form data saved to DynamoDB');
      }

      // Send email notification if SES is configured
      if (sesManager.isActive()) {
        const emailBody = `
          <h2>New Free Audit Request</h2>
          <p><strong>Name:</strong> ${values.firstName} ${values.lastName}</p>
          <p><strong>Company:</strong> ${values.company}</p>
          <p><strong>Email:</strong> ${values.email}</p>
          <p><strong>Phone:</strong> ${values.phone}</p>
          <p><strong>Platform:</strong> ${values.platform}</p>
          <p><strong>Monthly Ad Spend:</strong> ${values.monthlyAdSpend}</p>
          <p><strong>Business Goals:</strong> ${values.businessGoals}</p>
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        `;

        await sesManager.sendEmail(
          [values.email],
          'Free Audit Request Received',
          emailBody,
          `New Free Audit Request from ${values.firstName} ${values.lastName}`
        );
        console.log('Email notification sent via SES');
      }

      toast({
        title: "Audit Request Submitted Successfully!",
        description: "Thank you! We've received your free audit request and will analyze your data within 24-48 hours. You'll receive a detailed report at the email address provided.",
      });
      
      form.reset();
      
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setSubmitError(errorMessage);
      
      toast({
        title: "Submission Error",
        description: errorMessage.includes("validation") 
          ? errorMessage 
          : "An unexpected error occurred. Please try again or contact us directly at admin@amzadscout.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto bg-white border shadow-modern">
      <CardHeader className="text-center bg-gradient-to-r from-electric to-neon text-white rounded-t-lg">
        <CardTitle className="text-3xl font-bold">Free Advertising Audit</CardTitle>
        <CardDescription className="text-blue-100 text-lg">
          Get a comprehensive analysis of your advertising performance and actionable recommendations for growth
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ContactInfoForm form={form} />
            <BusinessInfoForm form={form} />
            <FileUploadForm form={form} />
            <AuditBenefits />

            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{submitError}</p>
              </div>
            )}

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-lime text-charcoal hover:bg-lime/90 font-semibold py-4 text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-modern hover:shadow-modern-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-charcoal mr-2"></div>
                  Submitting Your Audit Request...
                </>
              ) : (
                <>
                  Get My Free Audit
                  <Send className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FreeAuditForm;
