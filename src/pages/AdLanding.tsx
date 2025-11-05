import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useContactSubmission } from '@/hooks/useContactSubmission';
import { Loader2, CheckCircle2, TrendingUp, Users, Target } from 'lucide-react';

const adLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name is required'),
  message: z.string().optional(),
});

type AdLeadFormValues = z.infer<typeof adLeadSchema>;

const AdLanding = () => {
  const { submitContact, isSubmitting } = useContactSubmission();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<AdLeadFormValues>({
    resolver: zodResolver(adLeadSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = async (data: AdLeadFormValues) => {
    const result = await submitContact({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      formType: 'ad-landing',
    });

    if (result.success) {
      setIsSuccess(true);
      form.reset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Scale Your Business with
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Expert Ad Management</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join hundreds of businesses achieving 300%+ ROAS with our proven advertising strategies
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="pt-6 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-400" />
                <div className="text-3xl font-bold text-white mb-2">300%+</div>
                <div className="text-gray-300">Average ROAS</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="pt-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-300">Happy Clients</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="pt-6 text-center">
                <Target className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <div className="text-3xl font-bold text-white mb-2">$50M+</div>
                <div className="text-gray-300">Ad Spend Managed</div>
              </CardContent>
            </Card>
          </div>

          {/* Form Section */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <div className="text-white space-y-6">
              <h2 className="text-3xl font-bold mb-6">What You'll Get:</h2>
              <div className="space-y-4">
                {[
                  'Free comprehensive ad account audit',
                  'Custom strategy session with our experts',
                  'Competitor analysis report',
                  'ROI projection for your business',
                  'No-obligation consultation',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20">
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Limited Time Offer:</strong> Get your first month of management at 50% off when you book your strategy call today!
                </p>
              </div>
            </div>

            {/* Form */}
            <Card className="bg-white shadow-2xl">
              <CardContent className="pt-8">
                {isSuccess ? (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-6">
                      We've received your information and will contact you within 24 hours to schedule your free strategy call.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Check your email for confirmation and next steps.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">Get Your Free Strategy Call</h3>
                      <p className="text-muted-foreground">Fill out the form below to get started</p>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
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
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@company.com" {...field} />
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
                              <FormLabel>Phone Number *</FormLabel>
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
                              <FormLabel>Company Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Company Inc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tell us about your goals (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="What are your main advertising challenges?" 
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isSubmitting ? 'Submitting...' : 'Get My Free Strategy Call'}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground mt-4">
                          By submitting this form, you agree to our Terms of Service and Privacy Policy
                        </p>
                      </form>
                    </Form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdLanding;
