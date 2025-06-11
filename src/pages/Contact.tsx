
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "+1 (555) 987-6543",
    email: "hello@amzadscout.com",
    address: "456 Growth Street, Suite 200, Los Angeles, CA 90210",
    hours: "Mon-Fri 8AM-7PM PST"
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    console.log("Contact Page: Component mounted, loading contact data...");
    
    const loadContactInfo = () => {
      const savedContact = localStorage.getItem('contactData');
      if (savedContact) {
        try {
          const parsed = JSON.parse(savedContact);
          setContactInfo(prev => ({ ...prev, ...parsed }));
          console.log("Contact Page: Loaded contact info:", parsed);
        } catch (error) {
          console.error('Contact Page: Failed to parse contact data:', error);
        }
      }
    };

    // Initial load
    loadContactInfo();

    // Listen for updates from dashboard
    const handleContactUpdate = (event: any) => {
      console.log("Contact Page: Received contact update event:", event.detail);
      if (event.detail && typeof event.detail === 'object') {
        setContactInfo(prev => ({ ...prev, ...event.detail }));
      }
    };

    window.addEventListener('contactUpdated', handleContactUpdate);
    
    return () => {
      window.removeEventListener('contactUpdated', handleContactUpdate);
    };
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Contact form submitted:", values);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: values.name,
          email: values.email,
          company: values.company || null,
          phone: values.phone || null,
          message: values.message,
          form_type: 'contact'
        });

      if (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your message. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const contactInfoItems = [
    {
      icon: Mail,
      title: "Email",
      value: contactInfo.email,
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: contactInfo.phone,
      description: "Call us during business hours"
    },
    {
      icon: MapPin,
      title: "Office",
      value: contactInfo.address,
      description: "Visit our office"
    },
    {
      icon: Clock,
      title: "Hours",
      value: contactInfo.hours,
      description: "We're here to help"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
              Contact <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Ready to scale your business? Get in touch with our team of experts and let's discuss 
              how we can help you achieve your advertising goals.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfoItems.map((info, index) => (
              <Card key={index} className="bg-white border shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-slate-900 mb-2">{info.value}</p>
                  <CardDescription className="text-slate-600">{info.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white border shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-slate-900">Send us a Message</CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project and how we can help..."
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
