import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLeadSubmission } from '@/hooks/useLeadSubmission';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  brandName: z.string().optional().or(z.literal('')),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  amazonStoreUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  walmartStoreUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  issues: z.string().min(10, 'Please describe your issues (at least 10 characters)').optional().or(z.literal('')),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

const Contact = () => {
  const { submitLead, isSubmitting } = useLeadSubmission();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      brandName: '',
      website: '',
      amazonStoreUrl: '',
      walmartStoreUrl: '',
      issues: '',
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    const result = await submitLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      brandName: data.brandName,
      website: data.website,
      amazonStoreUrl: data.amazonStoreUrl,
      walmartStoreUrl: data.walmartStoreUrl,
      notes: data.issues,
      source: 'contact-page',
      status: 'new',
    });

    if (result.success) {
      setIsSuccess(true);
      toast({
        title: 'Success!',
        description: 'We\'ve received your information and will contact you soon.',
      });
      form.reset();
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <SEOHead 
        title="Contact Us - Get Your Free Audit"
        description="Contact us for a free audit of your Amazon, Walmart, or eCommerce business. Our experts will help you grow your brand."
      />
      <Header />
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Get Started Today</h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we'll get back to you shortly.
            </p>
          </div>

          {isSuccess ? (
            <div className="py-16 text-center bg-card rounded-lg shadow-lg">
              <div className="text-6xl mb-6">✓</div>
              <h3 className="text-3xl font-semibold mb-4 text-foreground">Thank You!</h3>
              <p className="text-lg text-muted-foreground">We'll be in touch soon.</p>
            </div>
          ) : (
            <div className="bg-card rounded-lg shadow-lg p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
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
                            <Input type="email" placeholder="your@email.com" {...field} />
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
                            <Input type="tel" placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="brandName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your brand name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourwebsite.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amazonStoreUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amazon Store URL (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://amazon.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="walmartStoreUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Walmart Store URL (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://walmart.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="issues"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What Issues Are You Facing?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the challenges you're experiencing..." 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
