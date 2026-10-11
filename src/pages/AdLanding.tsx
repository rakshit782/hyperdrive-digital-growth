import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import SEOHead from '@/components/SEOHead';
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
  TrendingUp, 
  Target, 
  ShieldCheck, 
  BarChart3, 
  Zap, 
  ArrowRight, 
  Lock, 
  Star, 
  Sparkles, 
  Building2,
  Mail,
  User,
  ShoppingBag,
  Clock,
  Layers,
  ChevronRight,
  FileText,
  Tag,
  Box,
  DollarSign,
  Search
} from 'lucide-react';

const adLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid business email').max(255, 'Email is too long'),
  phone: z.string().min(10, 'Please enter a valid phone number with area/country code').max(25, 'Phone number is too long'),
  company: z.string().min(2, 'Company or brand name is required').max(100, 'Company name is too long'),
  monthlyAdSpend: z.string().min(1, 'Please select your current ad spend range'),
  primaryPlatform: z.string().min(1, 'Please select your primary advertising channel'),
  storeUrl: z.string().optional(),
  message: z.string().max(1000, 'Message is too long').optional(),
});

type AdLeadFormValues = z.infer<typeof adLeadSchema>;

export default function AdLanding() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const utmSource = searchParams.get('utm_source') || 'paid-ads';
  const utmMedium = searchParams.get('utm_medium') || 'cpc';
  const utmCampaign = searchParams.get('utm_campaign') || 'lead-generation';

  const { submitLead, isSubmitting } = useLeadSubmission();
  const [isSuccess, setIsSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const form = useForm<AdLeadFormValues>({
    resolver: zodResolver(adLeadSchema),
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

  const onSubmit = async (data: AdLeadFormValues) => {
    // Fire tracking conversions
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'Ad Campaign Lead',
          event_label: data.primaryPlatform,
          value: data.monthlyAdSpend,
        });
      }
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Ad Landing Form Submission',
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
      notes: data.message ? `[${utmSource.toUpperCase()} / ${utmCampaign}] ${data.message}` : `[${utmSource.toUpperCase()} / ${utmCampaign}]`,
      source: `${utmSource}-${utmMedium}-landing`,
      honeypot,
    });

    if (result.success) {
      setIsSuccess(true);
      toast.success("Strategy call booked! Our senior director will reach out within 2 hours.");
      form.reset();
    } else {
      toast.error(result.error || "Submission failed. Please try again.");
    }
  };

  const platforms = [
    { 
      name: "Amazon PPC & DSP", 
      badge: "Verified Ads Partner",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200/80",
      highlight: "Average 7.8x - 11.2x ROAS",
    },
    { 
      name: "Walmart Connect", 
      badge: "Walmart Partner",
      badgeColor: "bg-blue-50 text-blue-800 border-blue-200/80",
      highlight: "Average 8.3x - 10.8x ROAS",
    },
    { 
      name: "Meta & Google Ads", 
      badge: "Full-Funnel DTC",
      badgeColor: "bg-purple-50 text-purple-800 border-purple-200/80",
      highlight: "Average 7.4x - 9.8x ROAS",
    }
  ];

  const caseMetrics = [
    { metric: "10.4x", label: "Peak Ad ROAS", sub: "Raw Honey Brand, Amazon UK" },
    { metric: "+263%", label: "Ad Sales Growth", sub: "Bedding Brand, Walmart Connect" },
    { metric: "36.3%", label: "CPA Reduction", sub: "Cooling Apparel, Meta & Google" },
    { metric: "$50M+", label: "Managed Ad Spend", sub: "900+ Satisfied Brands" },
  ];

  const auditHighlights = [
    "Uncover wasted ad spend eating 20%–40% of margins",
    "Restructure target ACOS with bid curve algorithms",
    "Conquest high-converting competitor ASIN placements",
    "Direct weekly 1-on-1 strategy sessions with dedicated director"
  ];

  return (
    <>
      <SEOHead 
        title="Claim Your Free E-commerce PPC Audit | AMZ AD SCOUT"
        description="Scale your Amazon, Walmart, and Meta ad sales with proven 7x-11x ROAS. Claim your complimentary comprehensive ad account audit and custom growth blueprint."
        canonical="https://www.amzadscout.com/ad-landing"
      />

      <div className="min-h-screen bg-[#fbfcfd] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        
        {/* Subtle Ambient Background Gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl opacity-70" />
          <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-sky-100/50 via-blue-50/30 to-transparent rounded-full blur-3xl opacity-60" />
        </div>

        {/* Top Header with Original Agency Logo */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100/80 shadow-[0_1px_10px_-2px_rgba(0,0,0,0.03)] py-3 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Original Agency Logo */}
            <Link to="/" className="flex flex-col items-start select-none group">
              <img 
                src="/logo.png" 
                alt="AMZ AD SCOUT Logo" 
                className="h-12 sm:h-14 w-auto object-contain transition-opacity group-hover:opacity-90" 
              />
              <span className="text-[9px] font-extrabold tracking-[0.22em] text-slate-400 mt-1 ml-0.5">
                AN AMAZON SPN AGENCY
              </span>
            </Link>

            {/* Header Right Badges & CTA Anchor */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-semibold">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                <span>Verified E-commerce Ads Partner</span>
              </div>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-600/20 px-4 py-2 transition-all hover:shadow-md hover:shadow-blue-600/30"
                onClick={() => document.getElementById('ad-lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Claim Free Audit
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Copy & Performance Authority (6 Cols - Symmetrical Balance) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              {/* Badge & Headlines */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-800 text-xs font-semibold shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  <span>$1,500 Full Account Audit — 100% Free This Week</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  Stop Burning Ad Budget. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
                    Scale to 7x–11x ROAS
                  </span> With Precision PPC.
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  We eliminate bleed keywords, conquest competitor placements, and deploy machine-calibrated bid architectures that transform erratic ad accounts into predictable profit engines.
                </p>
              </div>

              {/* Supported Platforms Grid - Symmetrical & Clean */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {platforms.map((p) => (
                  <div 
                    key={p.name} 
                    className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-all hover:border-blue-300 hover:shadow-md"
                  >
                    <div>
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border mb-1.5 ${p.badgeColor}`}>
                        {p.badge}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">{p.name}</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs font-semibold text-emerald-600 mt-2">{p.highlight}</p>
                  </div>
                ))}
              </div>

              {/* Verified Metrics Counter - Sleek High-End Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#09152e] text-white shadow-xl border border-blue-950/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-blue-300 mb-3.5 flex items-center gap-1.5">
                    <BarChart3 className="h-4 w-4 text-blue-400" />
                    <span>Verified 2026 Performance Benchmark</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center divide-x divide-white/10">
                    {caseMetrics.map((m) => (
                      <div key={m.label} className="px-1 first:pl-0 last:pr-0">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">{m.metric}</div>
                        <div className="text-[11px] font-semibold text-blue-200 mt-0.5">{m.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate">{m.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Audit Highlights - Balanced 2x2 Grid */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Included In Your Complimentary Audit:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {auditHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Client Testimonial - Compact & Polished */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                  5.0★
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                    <span className="text-[11px] text-slate-500 font-semibold ml-1.5 truncate">Verified Brand Owner Review</span>
                  </div>
                  <p className="text-xs text-slate-700 italic leading-snug line-clamp-2 mt-1">
                    "AMZ AD SCOUT reduced our ACOS from 54% to 19% in under 90 days while scaling revenues past $120k. Unrivaled PPC team."
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Modern & Classic High-Converting Glass Form (6 Cols - Perfectly Aligned) */}
            <div id="ad-lead-form" className="lg:col-span-6 scroll-mt-20">
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_12px_40px_-10px_rgba(15,23,42,0.08)] overflow-hidden transition-all">
                
                {/* Form Elegant Top Banner */}
                <div className="bg-gradient-to-r from-[#09152e] via-[#0f244a] to-[#122e5e] p-6 text-white text-center border-b border-blue-900/40 relative">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-[11px] font-semibold mb-2">
                    <Sparkles className="h-3 w-3 text-amber-300" />
                    Complimentary 360° Growth Audit
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Request Your Free Blueprint
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                    Get an in-depth ACOS reduction & ROAS forecast customized for your catalog.
                  </p>
                </div>

                {/* Form Fields Body */}
                <div className="p-6 sm:p-7 bg-white">
                  {isSuccess ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900">Audit Request Received!</h4>
                      <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                        Our senior advertising director is reviewing your catalog parameters. We will contact you within 2 hours with initial data points.
                      </p>
                      <Button
                        onClick={() => setIsSuccess(false)}
                        variant="outline"
                        className="text-xs mt-3 rounded-xl border-slate-300"
                      >
                        Submit Another Brand
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
                              <FormLabel className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <User className="h-3 w-3 text-slate-400" /> Full Name *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Alex Vance" 
                                  className="h-11 text-sm rounded-xl border-slate-200 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 bg-slate-50/50 hover:bg-white transition-colors" 
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
                                <FormLabel className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                  <Mail className="h-3 w-3 text-slate-400" /> Business Email *
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder="alex@brand.com" 
                                    className="h-11 text-sm rounded-xl border-slate-200 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 bg-slate-50/50 hover:bg-white transition-colors" 
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
                                <FormLabel className="text-xs font-bold text-slate-700">Phone Number *</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="tel" 
                                    placeholder="+1 (555) 019-2834" 
                                    className="h-11 text-sm rounded-xl border-slate-200 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 bg-slate-50/50 hover:bg-white transition-colors" 
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
                                <FormLabel className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                  <Building2 className="h-3 w-3 text-slate-400" /> Company / Brand *
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Vance Essentials" 
                                    className="h-11 text-sm rounded-xl border-slate-200 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 bg-slate-50/50 hover:bg-white transition-colors" 
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
                                <FormLabel className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                  <ShoppingBag className="h-3 w-3 text-slate-400" /> Store Link / ASIN
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="amazon.com/dp/..." 
                                    className="h-11 text-sm rounded-xl border-slate-200 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 bg-slate-50/50 hover:bg-white transition-colors" 
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
                                <FormLabel className="text-xs font-bold text-slate-700">Primary Channel *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-11 text-sm rounded-xl border-slate-200 bg-slate-50/50">
                                      <SelectValue placeholder="Select platform" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="rounded-xl shadow-lg border-slate-200">
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
                                <FormLabel className="text-xs font-bold text-slate-700">Monthly Ad Spend *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-11 text-sm rounded-xl border-slate-200 bg-slate-50/50">
                                      <SelectValue placeholder="Select spend" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="rounded-xl shadow-lg border-slate-200">
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
                              <FormLabel className="text-xs font-bold text-slate-700">Current Target or Challenge (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="e.g. Current ACOS is 42%, looking to scale sales while hitting 22% target" 
                                  className="min-h-[75px] text-xs resize-none rounded-xl border-slate-200 bg-slate-50/50 hover:bg-white transition-colors" 
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
                          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md shadow-blue-600/25 transition-all text-sm gap-2 mt-2"
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
                            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">
                              Privacy Policy
                            </a>{" "}
                            and{" "}
                            <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">
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
        </section>

        {/* What Includes in Audit - 8 Comprehensive Pillars */}
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
                What's Inside Your Audit
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-3 tracking-tight">
                Comprehensive 8-Pillar Account Deep Dive
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 max-w-2xl mx-auto">
                We analyze every dimension of your ad performance, listing health, and unit economics to build a clear roadmap for higher sales and profitability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  id: "01",
                  title: "Account Health Check",
                  icon: ShieldCheck,
                  iconBg: "bg-blue-50 text-blue-600 border-blue-200/60",
                  points: [
                    "Account performance & policy compliance",
                    "Suppressed listings and alerts",
                    "Buy Box & eligibility issues",
                    "Risk factors and recommendations",
                  ],
                },
                {
                  id: "02",
                  title: "Advertising Performance",
                  icon: BarChart3,
                  iconBg: "bg-purple-50 text-purple-600 border-purple-200/60",
                  points: [
                    "Campaign structure and setup review",
                    "ACOS, TACOS and profitability analysis",
                    "Keyword and targeting performance",
                    "Wasted spend and optimization opportunities",
                  ],
                },
                {
                  id: "03",
                  title: "SKU-Level Profitability (P&L)",
                  icon: DollarSign,
                  iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
                  points: [
                    "SKU-level revenue, ad spend and fees",
                    "True product-level profitability",
                    "Contribution margin analysis",
                    "Low-performing and high-potential SKUs",
                  ],
                },
                {
                  id: "04",
                  title: "Listing & Content Review",
                  icon: FileText,
                  iconBg: "bg-amber-50 text-amber-600 border-amber-200/60",
                  points: [
                    "Title, keywords and backend search terms",
                    "Images, A+ content and brand store",
                    "Conversion rate and customer reviews",
                    "Content gaps and optimization suggestions",
                  ],
                },
                {
                  id: "05",
                  title: "Keyword & Market Analysis",
                  icon: Search,
                  iconBg: "bg-rose-50 text-rose-600 border-rose-200/60",
                  points: [
                    "Top performing and growth keywords",
                    "Search term opportunities",
                    "Competitor gap analysis",
                    "Market trends and demand insights",
                  ],
                },
                {
                  id: "06",
                  title: "Pricing & Buy Box Analysis",
                  icon: Tag,
                  iconBg: "bg-orange-50 text-orange-600 border-orange-200/60",
                  points: [
                    "Current pricing vs. competitors",
                    "Buy Box share and price competitiveness",
                    "Impact on profitability",
                    "Recommendations for optimal pricing",
                  ],
                },
                {
                  id: "07",
                  title: "Inventory & Supply Chain",
                  icon: Box,
                  iconBg: "bg-sky-50 text-sky-600 border-sky-200/60",
                  points: [
                    "Stock levels and inventory health",
                    "FBA/FBM performance review",
                    "Lost sales due to out of stock",
                    "Forecasting and replenishment suggestions",
                  ],
                },
                {
                  id: "08",
                  title: "12-Month Growth Blueprint",
                  icon: TrendingUp,
                  iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
                  points: [
                    "Sales and profitability projections",
                    "Advertising budget recommendations",
                    "Marketplace expansion opportunities",
                    "Action plan with clear next steps",
                  ],
                },
              ].map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div 
                    key={pillar.id} 
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${pillar.iconBg}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400">{pillar.id}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-4">{pillar.title}</h3>
                      <ul className="space-y-2.5">
                        {pillar.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 leading-snug">
                            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our 5-Step Execution Methodology */}
        <section className="py-16 bg-slate-50/70 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
                Our Proven Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
                5-Stage PPC Growth Roadmap
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                From initial account diagnostic to daily aggressive optimization and multi-channel scaling.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { 
                  step: "01", 
                  title: "Audit & Analyze", 
                  desc: "Comprehensive deep-dive into search terms, waste spend, bleed keywords, and historical account performance." 
                },
                { 
                  step: "02", 
                  title: "Strategize", 
                  desc: "Building custom bid rules, harvesting pipelines, new campaigns, and high-impact product launch roadmaps." 
                },
                { 
                  step: "03", 
                  title: "Competitor Conquesting", 
                  desc: "Target competitor product detail pages and conquest brand keywords to capture ready-to-buy traffic." 
                },
                { 
                  step: "04", 
                  title: "Assigning Ads Manager", 
                  desc: "Dedicated senior advertising director assigned directly to your brand for continuous oversight and weekly syncs." 
                },
                { 
                  step: "05", 
                  title: "Execution", 
                  desc: "Active day-to-day bid optimization, daily budget pacing, negative matching, and aggressive scaling." 
                },
              ].map((item) => (
                <div key={item.step} className="p-5 rounded-2xl bg-white border border-slate-200/70 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-black text-blue-600 font-mono mb-2">{item.step}</div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 bg-[#09152e] text-white text-center px-4 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-5 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Ready to Accelerate Your Brand's Growth?
            </h2>
            <p className="text-sm sm:text-base text-blue-200 max-w-xl mx-auto">
              Join 900+ brands growing profitably across Amazon, Walmart, and Meta.
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-6 rounded-2xl shadow-xl shadow-blue-600/30 text-base"
              onClick={() => document.getElementById('ad-lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Your Free Strategy Call
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </section>

        {/* Clean Disclaimers & Footer */}
        <footer className="py-8 bg-slate-950 text-slate-400 text-xs text-center border-t border-slate-900 px-4">
          <div className="max-w-5xl mx-auto space-y-2">
            <p>© {new Date().getFullYear()} AMZ AD SCOUT. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
}