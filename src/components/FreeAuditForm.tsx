
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buildApiUrl } from "@/utils/apiConfig";
import { formSchema, FormValues } from "@/types/freeAuditSchema";
import ContactInfoForm from "@/components/forms/ContactInfoForm";
import BusinessInfoForm from "@/components/forms/BusinessInfoForm";
import FileUploadForm from "@/components/forms/FileUploadForm";
import AuditBenefits from "@/components/forms/AuditBenefits";

const FreeAuditForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    console.log("Free audit form submitted:", values);
    
    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      
      // Add form fields
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('company', values.company);
      formData.append('phone', values.phone);
      formData.append('platform', values.platform);
      formData.append('monthlyAdSpend', values.monthlyAdSpend);
      formData.append('businessGoals', values.businessGoals);
      formData.append('adminEmail', 'admin@amzadscout.com');
      
      // Add files if they exist
      if (values.businessReport) {
        formData.append('businessReport', values.businessReport);
      }
      if (values.searchTermReport) {
        formData.append('searchTermReport', values.searchTermReport);
      }
      if (values.asinReport) {
        formData.append('asinReport', values.asinReport);
      }
      
      // Submit to backend endpoint
      const response = await fetch(buildApiUrl('/api/free-audit'), {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("Form submission response:", result);
      
      toast({
        title: "Audit Request Submitted!",
        description: "Thank you! We've received your free audit request and will analyze your data within 24-48 hours. You'll receive a detailed report at the email address provided.",
      });
      
      form.reset();
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your request. Please try again or contact us directly at admin@amzadscout.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto bg-white border shadow-xl">
      <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
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

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 text-lg rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Submitting Your Audit Request..."
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
