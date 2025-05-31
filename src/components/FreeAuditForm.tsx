
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, FileText, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv"
];

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  platform: z.enum(["amazon", "walmart", "meta", "multiple"], {
    required_error: "Please select a platform",
  }),
  monthlyAdSpend: z.string().min(1, "Please select your monthly ad spend range"),
  businessGoals: z.string().min(20, "Please describe your business goals (minimum 20 characters)"),
  businessReport: z.instanceof(File).optional(),
  searchTermReport: z.instanceof(File).optional(),
  asinReport: z.instanceof(File).optional(),
});

const FreeAuditForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, Excel, or CSV file",
          variant: "destructive",
        });
        return;
      }
      
      form.setValue(fieldName as any, file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log("Free audit form submitted:", values);
    
    try {
      // Simulate sending email to admin@amzadscout.com
      const formData = new FormData();
      
      // Add form fields
      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value.toString());
        }
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Audit Request Submitted!",
        description: "Thank you! We've received your free audit request and will analyze your data within 24-48 hours. You'll receive a detailed report at the email address provided.",
      });
      
      form.reset();
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const adSpendRanges = [
    { value: "under-1k", label: "Under $1,000/month" },
    { value: "1k-5k", label: "$1,000 - $5,000/month" },
    { value: "5k-10k", label: "$5,000 - $10,000/month" },
    { value: "10k-25k", label: "$10,000 - $25,000/month" },
    { value: "25k-50k", label: "$25,000 - $50,000/month" },
    { value: "over-50k", label: "Over $50,000/month" },
  ];

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
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">Contact Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="john@company.com" type="email" {...field} />
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
                        <Input placeholder="+1 (555) 123-4567" {...field} />
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
                      <Input placeholder="Your Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Business Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">Business Information</h3>
              
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Advertising Platform *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="amazon" id="amazon" />
                          <label htmlFor="amazon" className="font-medium">Amazon</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="walmart" id="walmart" />
                          <label htmlFor="walmart" className="font-medium">Walmart</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="meta" id="meta" />
                          <label htmlFor="meta" className="font-medium">Meta (Facebook/Instagram)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multiple" id="multiple" />
                          <label htmlFor="multiple" className="font-medium">Multiple Platforms</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlyAdSpend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Advertising Spend *</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="">Select your monthly ad spend range</option>
                        {adSpendRanges.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Goals & Challenges *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your current challenges, goals, and what you'd like to improve with your advertising campaigns..."
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Please describe your main business objectives and any specific challenges you're facing
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* File Uploads - Amazon Specific */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">Required Reports (Amazon)</h3>
              <p className="text-slate-600 text-sm">
                Please upload your Amazon reports from the last 30 days for a comprehensive audit. All files should be in PDF, Excel, or CSV format.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-900">
                    Business Report (Last 30 Days) *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".pdf,.xlsx,.xls,.csv"
                      onChange={(e) => handleFileUpload(e, "businessReport")}
                      className="hidden"
                      id="businessReport"
                    />
                    <label htmlFor="businessReport" className="cursor-pointer">
                      <span className="text-sm text-blue-600 hover:text-blue-800">Upload File</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV (Max 10MB)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-900">
                    Search Term Report (Last 30 Days) *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".pdf,.xlsx,.xls,.csv"
                      onChange={(e) => handleFileUpload(e, "searchTermReport")}
                      className="hidden"
                      id="searchTermReport"
                    />
                    <label htmlFor="searchTermReport" className="cursor-pointer">
                      <span className="text-sm text-blue-600 hover:text-blue-800">Upload File</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV (Max 10MB)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-900">
                    Advertised ASIN Report (Last 30 Days) *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".pdf,.xlsx,.xls,.csv"
                      onChange={(e) => handleFileUpload(e, "asinReport")}
                      className="hidden"
                      id="asinReport"
                    />
                    <label htmlFor="asinReport" className="cursor-pointer">
                      <span className="text-sm text-blue-600 hover:text-blue-800">Upload File</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV (Max 10MB)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What You'll Get */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                What You'll Receive
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive performance analysis of your advertising campaigns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Detailed keyword and targeting optimization recommendations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Budget allocation and bidding strategy improvements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>ROI improvement opportunities and growth projections</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>30-minute strategy consultation call with our experts</span>
                </li>
              </ul>
            </div>

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
