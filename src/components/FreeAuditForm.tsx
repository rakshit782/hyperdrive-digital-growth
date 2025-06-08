
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
      // Submit to Supabase contact_submissions table
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          company: values.company,
          phone: values.phone,
          message: `Platform: ${values.platform}\nMonthly Ad Spend: ${values.monthlyAdSpend}\nBusiness Goals: ${values.businessGoals}`,
          form_type: 'free_audit'
        });

      if (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your audit request. Please try again.",
          variant: "destructive",
        });
        return;
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
