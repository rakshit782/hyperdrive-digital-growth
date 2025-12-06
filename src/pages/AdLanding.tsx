import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLeadSubmission } from '@/hooks/useLeadSubmission';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Target, 
  Award,
  Shield,
  BarChart3,
  Zap,
  ArrowRight
} from 'lucide-react';
import amazonAdsPartnerLogo from "@/assets/amazon-ads-partner-logo.png";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const adLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address').max(255, 'Email is too long'),
  phone: z.string().min(10, 'Please enter a valid phone number').max(20, 'Phone number is too long'),
  company: z.string().min(2, 'Company name is required').max(100, 'Company name is too long'),
  monthlyAdSpend: z.string().optional(),
  primaryPlatform: z.string().optional(),
  message: z.string().max(1000, 'Message is too long').optional(),
});

type AdLeadFormValues = z.infer<typeof adLeadSchema>;

const AdLanding = () => {
  const { submitLead, isSubmitting } = useLeadSubmission();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<AdLeadFormValues>({
    resolver: zodResolver(adLeadSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      monthlyAdSpend: '',
      primaryPlatform: '',
      message: '',
    },
  });

  const onSubmit = async (data: AdLeadFormValues) => {
    const result = await submitLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      monthlyAdSpend: data.monthlyAdSpend,
      primaryPlatform: data.primaryPlatform,
      notes: data.message,
      source: 'facebook-ad-landing',
    });

    if (result.success) {
      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "Your request has been submitted. We'll contact you within 24 hours.",
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: result.error || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const platforms = [
    { 
      name: "Amazon Ads", 
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20"
    },
    { 
      name: "Walmart Ads", 
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    { 
      name: "Meta Ads", 
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20"
    }
  ];

  const stats = [
    { icon: TrendingUp, value: "300%+", label: "Average ROAS", color: "text-emerald-400" },
    { icon: Users, value: "500+", label: "Happy Clients", color: "text-blue-400" },
    { icon: Target, value: "$50M+", label: "Ad Spend Managed", color: "text-purple-400" },
    { icon: BarChart3, value: "98%", label: "Client Retention", color: "text-amber-400" }
  ];

  const benefits = [
    'Free comprehensive ad account audit',
    'Custom strategy session with our experts',
    'Competitor analysis report',
    'ROI projection for your business',
    'No-obligation consultation',
  ];

  return (
    <>
      <Helmet>
        <title>Expert Amazon, Walmart & Meta Ad Management | AMZ AD SCOUT</title>
        <meta name="description" content="Scale your business with certified ad management experts. Authorized partners of Amazon Ads, Walmart Ads & Meta Ads. Get your free strategy call today." />
      </Helmet>

      <Header />
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

        {/* Hero Section */}
        <section className="relative py-12 lg:py-20 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Partner Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {platforms.map((platform, index) => (
                <div 
                  key={index}
                  className={`inline-flex items-center gap-2 ${platform.bgColor} border ${platform.borderColor} rounded-full px-4 py-2`}
                >
                  <Award className={`w-4 h-4 bg-gradient-to-r ${platform.color} bg-clip-text`} style={{ color: platform.color.includes('amber') ? '#f59e0b' : platform.color.includes('blue') ? '#3b82f6' : '#6366f1' }} />
                  <span className="text-white/90 text-sm font-medium">Authorized {platform.name} Partner</span>
                </div>
              ))}
            </div>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Scale Your Business with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400">
                  Expert Ad Management
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Join hundreds of businesses achieving 300%+ ROAS with our proven advertising strategies 
                across Amazon, Walmart, and Meta platforms.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="py-6 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Benefits Side */}
              <div className="text-white space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">What You'll Get:</h2>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg text-slate-200">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platform Expertise */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-400" />
                    Our Platform Expertise
                  </h3>
                  <div className="space-y-3">
                    {platforms.map((platform, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${platform.color}`}></div>
                        <span className="text-slate-300">{platform.name} - Authorized Partner</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Limited Time Offer */}
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/30">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-amber-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-300 mb-1">Limited Time Offer</p>
                      <p className="text-slate-300 text-sm">
                        Get your first month of management at 50% off when you book your strategy call today!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <Card className="bg-white shadow-2xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-center">
                  <p className="text-white font-semibold">Limited Spots Available This Week</p>
                </div>
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="py-12 text-center">
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">Thank You!</h3>
                      <p className="text-slate-600 mb-6">
                        We've received your information and will contact you within 24 hours to schedule your free strategy call.
                      </p>
                      <p className="text-sm text-slate-500">
                        Check your email for confirmation and next steps.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Get Your Free Strategy Call</h3>
                        <p className="text-slate-600">Fill out the form below to get started</p>
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

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          </div>

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

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="primaryPlatform"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Primary Platform</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select platform" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="amazon">Amazon Ads</SelectItem>
                                      <SelectItem value="walmart">Walmart Ads</SelectItem>
                                      <SelectItem value="meta">Meta Ads</SelectItem>
                                      <SelectItem value="multiple">Multiple Platforms</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="monthlyAdSpend"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Monthly Ad Spend</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select range" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="0-5000">$0 - $5,000</SelectItem>
                                      <SelectItem value="5000-15000">$5,000 - $15,000</SelectItem>
                                      <SelectItem value="15000-50000">$15,000 - $50,000</SelectItem>
                                      <SelectItem value="50000+">$50,000+</SelectItem>
                                    </SelectContent>
                                  </Select>
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
                                <FormLabel>Tell us about your goals (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="What are your main advertising challenges?" 
                                    className="min-h-[80px] resize-none"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-6 text-lg" 
                            size="lg" 
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                Get My Free Strategy Call
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </>
                            )}
                          </Button>

                          <p className="text-xs text-center text-slate-500 mt-4">
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
        </section>

      </div>
      <Footer />
    </>
  );
};

export default AdLanding;