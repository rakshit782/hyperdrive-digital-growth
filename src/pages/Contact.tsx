import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLeadSubmission } from '@/hooks/useLeadSubmission';
import { toast } from 'sonner';
import { 
  Loader2, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  Building2,
  Mail,
  User,
  ShoppingBag,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  PhoneCall
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid business email').max(255, 'Email is too long'),
  phone: z.string().min(10, 'Please enter a valid phone number with area/country code').max(25, 'Phone number is too long'),
  company: z.string().min(2, 'Company or brand name is required').max(100, 'Company name is too long'),
  monthlyAdSpend: z.string().min(1, 'Please select your current ad spend range'),
  primaryPlatform: z.string().min(1, 'Please select your primary advertising channel'),
  storeUrl: z.string().optional(),
  message: z.string().max(1000, 'Message is too long').optional(),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

const Contact = () => {
  const { submitLead, isSubmitting } = useLeadSubmission();
  const [isSuccess, setIsSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      monthlyAdSpend: '',
      primaryPlatform: 'amazon',
      storeUrl: '',
      message: '',
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    // Tracking conversions
    if (typeof window !== 'undefined') {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Contact Lead Generation',
          event_label: data.primaryPlatform,
          value: data.monthlyAdSpend,
        });
      }
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Contact Page Lead Submission',
          content_category: data.primaryPlatform,
          value: 100,
          currency: 'USD',
        });
      }
    }

    const result = await submitLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      brandName: data.company,
      website: data.storeUrl,
      monthlyAdSpend: data.monthlyAdSpend,
      primaryPlatform: data.primaryPlatform,
      notes: data.message ? `[CONTACT-PAGE / ${data.primaryPlatform.toUpperCase()}] ${data.message}` : `[CONTACT-PAGE / ${data.primaryPlatform.toUpperCase()}]`,
      source: 'contact-page-lead',
      status: 'new',
      honeypot,
    });

    if (result.success) {
      setIsSuccess(true);
      toast.success("Strategy request received! Our senior director will reach out within 2 hours.");
      form.reset();
    } else {
      toast.error(result.error || "Submission failed. Please try again.");
    }
  };

  const trustHighlights = [
    {
      icon: TrendingUp,
      title: "Average 7.8x - 11.2x ROAS",
      desc: "Machine-calibrated PPC & DSP bid architectures across Amazon, Walmart & DTC channels.",
    },
    {
      icon: ShieldCheck,
      title: "Official SPN & Ads Partner",
      desc: "Direct agency support, beta feature rollouts, and verified enterprise account audits.",
    },
    {
      icon: BarChart3,
      title: "$1,500 Full Audit — 100% Free",
      desc: "Actionable 8-pillar tear-down covering search term bleed, budget conquesting, and margins.",
    },
    {
      icon: PhoneCall,
      title: "2-Hour Response Time",
      desc: "Direct consult with a senior marketplace strategist, not an offshore sales rep.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="Contact Us for a Free E-commerce Ads Audit | AMZ AD SCOUT"
        description="Claim your free 8-pillar advertising audit for Amazon, Walmart, or Meta/Google. Meet our senior directors and scale your revenue with precision PPC."
        keywords="contact amazon advertising agency, free e-commerce audit, amazon ppc consultation, walmart advertising contact, shopify development inquiry, e-commerce agency contact, professional amazon consultation, free amazon audit, walmart marketplace audit, multi-channel consultation"
        canonical={typeof window !== 'undefined' ? window.location.href : 'https://www.amzadscout.com/contact'}
      />
      <Header />
      
      <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Hero Text */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-semibold shadow-xs mb-4">
              <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Full Marketplace & Ads Audit — 100% Free Consultation</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Let's Scale Your Brand to <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
                Predictable 7x–11x ROAS
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Tell us about your brand and ad goals. Our senior strategists will review your Amazon, Walmart, or Meta catalog and deliver a clear growth blueprint within 2 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
            
            {/* Left Column: Trust Signals & Value Propositions */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Why Leading Brands Choose AMZ AD SCOUT
                </h3>
                
                <div className="space-y-5">
                  {trustHighlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                    <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" /> Guaranteed Privacy
                    </p>
                    <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                      Your store URLs, search queries, and ad budgets are strictly protected under mutual NDA protocols. We never share or resell data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Converting Lead Generation Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden">
                
                {/* Form Header */}
                <div className="p-6 sm:p-7 bg-slate-900 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-400">
                      Official Lead Application
                    </span>
                    <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      Director Assigned
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                    Request Your Free Growth Strategy Call
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Complete the details below to receive your customized 8-pillar audit report.
                  </p>
                </div>

                {/* Form Fields Body */}
                <div className="p-6 sm:p-8 bg-white dark:bg-slate-900">
                  {isSuccess ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white">Audit Request Received!</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                        Our senior advertising director is reviewing your catalog parameters. We will contact you within 2 hours with initial data points.
                      </p>
                      <Button
                        onClick={() => setIsSuccess(false)}
                        variant="outline"
                        className="text-xs mt-3 rounded-xl border-slate-300 cursor-pointer"
                      >
                        Submit Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        
                        {/* Anti-spam Bot Honeypot */}
                        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                          <input
                            type="text"
                            name="website_url_check"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </div>

                        {/* Name Field */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                                <User className="h-3 w-3 text-slate-400" /> Full Name *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Alex Vance" 
                                  className="h-11 text-sm rounded-xl border-slate-200 dark:border-slate-700 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="space-y-1.5">
                                <FormLabel className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                                  <Mail className="h-3 w-3 text-slate-400" /> Business Email *
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder="alex@brand.com" 
                                    className="h-11 text-sm rounded-xl border-slate-200 dark:border-slate-700 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem className="space-y-1.5">
                                <FormLabel className="text-xs font-bold text-slate-700 dark:text-slate-200">Phone Number *</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="tel" 
                                    placeholder="+1 (555) 019-2834" 
                                    className="h-11 text-sm rounded-xl border-slate-200 dark:border-slate-700 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Company & Store URL */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem className="space-y-1.5">
                                <FormLabel className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                                  <Building2 className="h-3 w-3 text-slate-400" /> Company / Brand *
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Vance Essentials" 
                                    className="h-11 text-sm rounded-xl border-slate-200 dark:border-slate-700 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="storeUrl"
                            render={({ field }) => (
                              <FormItem className="space-y-1.5">
                                <FormLabel className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                                  <ShoppingBag className="h-3 w-3 text-slate-400" /> Store Link / ASIN
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="amazon.com/dp/..." 
                                    className="h-11 text-sm rounded-xl border-slate-200 dark:border-slate-700 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Primary Platform & Ad Spend */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <FormField
                            control={form.control}
                            name="primaryPlatform"
                            render={({ field }) => (
                              <FormItem className="space-y-1.5">
                                <FormLabel className="text-xs font-bold text-slate-700 dark:text-slate-200">Primary Channel *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-11 text-sm rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                                      <SelectValue placeholder="Select platform" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="rounded-xl shadow-lg border-slate-200 dark:border-slate-700">
                                    <SelectItem value="amazon">Amazon Advertising</SelectItem>
                                    <SelectItem value="walmart">Walmart Connect</SelectItem>
                                    <SelectItem value="meta-google">Meta & Google Ads</SelectItem>
                                    <SelectItem value="multi-channel">Multi-Channel Growth</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="monthlyAdSpend"
                            render={({ field }) => (
                              <FormItem className="space-y-1.5">
                                <FormLabel className="text-xs font-bold text-slate-700 dark:text-slate-200">Monthly Ad Spend *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-11 text-sm rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                                      <SelectValue placeholder="Select spend" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="rounded-xl shadow-lg border-slate-200 dark:border-slate-700">
                                    <SelectItem value="under-5k">Under $5,000 / mo</SelectItem>
                                    <SelectItem value="5k-15k">$5,000 - $15,000 / mo</SelectItem>
                                    <SelectItem value="15k-50k">$15,000 - $50,000 / mo</SelectItem>
                                    <SelectItem value="50k-plus">$50,000+ / mo</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Optional Goals / Challenges */}
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="text-xs font-bold text-slate-700 dark:text-slate-200">Current Target or Challenge (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="e.g. Current ACOS is 38%, looking to scale sales while hitting 22% target" 
                                  className="min-h-[75px] text-xs resize-none rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        {/* Submit Button */}
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md shadow-blue-600/25 transition-all text-sm gap-2 mt-2 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Analyzing Parameters...
                            </>
                          ) : (
                            <>
                              Claim 100% Free Strategy Blueprint
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </Button>

                        {/* Trust Micro-copy & Privacy Compliance */}
                        <div className="space-y-1.5 pt-1 text-center">
                          <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Lock className="h-3 w-3 text-slate-400" /> 100% Confidential
                            </span>
                            <span>•</span>
                            <span>No Credit Card</span>
                            <span>•</span>
                            <span>Zero Obligation</span>
                          </div>
                          <p className="text-[10px] text-slate-400">
                            By submitting, you agree to our{" "}
                            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600 dark:hover:text-slate-300">
                              Privacy Policy
                            </a>{" "}
                            and{" "}
                            <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600 dark:hover:text-slate-300">
                              Terms
                            </a>.
                          </p>
                        </div>
                      </form>
                    </Form>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
