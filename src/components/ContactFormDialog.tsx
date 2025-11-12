import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLeadSubmission } from '@/hooks/useLeadSubmission';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

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

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formType?: string;
  title?: string;
  description?: string;
}

export const ContactFormDialog = ({ 
  open, 
  onOpenChange, 
  formType = 'contact',
  title = 'Get Started',
  description = 'Fill out the form below and we\'ll get back to you shortly.'
}: ContactFormDialogProps) => {
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
      source: formType,
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
        onOpenChange(false);
        setIsSuccess(false);
      }, 2000);
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p className="text-muted-foreground">We'll be in touch soon.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <FormField
                control={form.control}
                name="issues"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What Issues Are You Facing?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the challenges you're experiencing..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
