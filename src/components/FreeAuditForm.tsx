
import { useState } from "react";
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
          formType: 'free_audit'
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
        title: "Audit Request Submitted!",
        description: "Thank you! We've received your free audit request and will analyze your data within 24-48 hours. You'll receive a detailed report at the email address provided.",
      });
      
      form.reset();
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again or contact us directly at admin@amzadscout.com.",
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
