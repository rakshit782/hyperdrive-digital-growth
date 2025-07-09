
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Send, Target, TrendingUp, Zap, TestTube, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFormSubmission } from "@/hooks/useFormSubmission";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  monthlyAdSpend: string;
  primaryPlatform: string;
  businessGoals: string;
  currentChallenges: string;
  businessSalesReport: File | null;
  searchTermReport: File | null;
  advertisedProductReport: File | null;
}

const FreeAuditForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    monthlyAdSpend: '',
    primaryPlatform: '',
    businessGoals: '',
    currentChallenges: '',
    businessSalesReport: null,
    searchTermReport: null,
    advertisedProductReport: null
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [honeypotValue, setHoneypotValue] = useState('');
  const { toast } = useToast();
  const { submitForm, isSubmitting } = useFormSubmission();

  const fillTestData = () => {
    setFormData({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Example Corp',
      website: 'https://example.com',
      monthlyAdSpend: '10k-25k',
      primaryPlatform: 'amazon',
      businessGoals: 'We want to increase our Amazon sales by 50% while maintaining profitable ROAS.',
      currentChallenges: 'We are struggling with high ACoS on our campaigns and poor organic ranking.',
      businessSalesReport: null,
      searchTermReport: null,
      advertisedProductReport: null
    });
    setFormErrors({});
    
    toast({
      title: "Test data filled",
      description: "Form has been populated with sample data for testing",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
      
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, Excel, or CSV file",
          variant: "destructive",
        });
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
      
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.company.trim()) errors.company = 'Company name is required';
    if (!formData.monthlyAdSpend) errors.monthlyAdSpend = 'Monthly ad spend is required';
    if (!formData.primaryPlatform) errors.primaryPlatform = 'Primary platform is required';
    if (!formData.businessGoals.trim()) errors.businessGoals = 'Business goals are required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Free audit form submission started');
    
    if (honeypotValue) {
      console.log('Honeypot triggered, blocking submission');
      return;
    }
    
    if (!validateForm()) {
      toast({
        title: "Form Validation Failed",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await submitForm({
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        website: formData.website,
        monthlyAdSpend: formData.monthlyAdSpend,
        primaryPlatform: formData.primaryPlatform,
        businessGoals: formData.businessGoals,
        currentChallenges: formData.currentChallenges,
        source: 'free_audit_form',
        formType: 'free_audit',
        uploadedFiles: {
          businessSalesReport: formData.businessSalesReport?.name || null,
          searchTermReport: formData.searchTermReport?.name || null,
          advertisedProductReport: formData.advertisedProductReport?.name || null
        }
      });

      if (result.success) {
        setIsSubmitted(true);
        
        setFormData({
          firstName: '', lastName: '', email: '', phone: '', company: '', website: '',
          monthlyAdSpend: '', primaryPlatform: '', businessGoals: '', currentChallenges: '',
          businessSalesReport: null, searchTermReport: null, advertisedProductReport: null
        });
        setFormErrors({});
        
        toast({
          title: "Success!",
          description: "Your audit request has been submitted successfully and saved to local storage.",
        });
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-12 text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-8" />
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Your Audit Request is Submitted!</h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Thank you for requesting your free $2,000 advertising audit. Your data has been saved locally and our team will analyze your current campaigns within 24-48 hours.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Deep Analysis</h3>
                  <p className="text-sm text-slate-600">Comprehensive audit of your campaigns</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Growth Opportunities</h3>
                  <p className="text-sm text-slate-600">Identify areas for improvement</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Action Plan</h3>
                  <p className="text-sm text-slate-600">Custom strategy for your business</p>
                </div>
              </div>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Request Another Audit
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
              Get Your Free $2,000 Advertising Audit
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Discover hidden opportunities and get a custom roadmap to increase your ROAS by 300% (Local Storage)
            </CardDescription>
            
            <div className="mt-4">
              <Button 
                type="button" 
                onClick={fillTestData}
                variant="outline"
                className="bg-yellow-50 border-yellow-200 text-yellow-800 hover:bg-yellow-100"
              >
                <TestTube className="w-4 h-4 mr-2" />
                Fill Test Data
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                <Input
                  name="website_url"
                  value={honeypotValue}
                  onChange={(e) => setHoneypotValue(e.target.value)}
                  tabIndex={-1}
                  autoComplete="nope"
                  aria-hidden="true"
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">Contact Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name *</label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={`h-12 text-lg border-slate-300 ${formErrors.firstName ? 'border-red-500' : ''}`}
                      placeholder="John"
                    />
                    {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name *</label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className={`h-12 text-lg border-slate-300 ${formErrors.lastName ? 'border-red-500' : ''}`}
                      placeholder="Doe"
                    />
                    {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`h-12 text-lg border-slate-300 ${formErrors.email ? 'border-red-500' : ''}`}
                      placeholder="john@company.com"
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`h-12 text-lg border-slate-300 ${formErrors.phone ? 'border-red-500' : ''}`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name *</label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className={`h-12 text-lg border-slate-300 ${formErrors.company ? 'border-red-500' : ''}`}
                      placeholder="Your Company"
                    />
                    {formErrors.company && <p className="text-red-500 text-sm mt-1">{formErrors.company}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Website URL</label>
                    <Input
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="h-12 text-lg border-slate-300"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">Business Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Ad Spend *</label>
                    <Select onValueChange={(value) => handleSelectChange('monthlyAdSpend', value)} value={formData.monthlyAdSpend} required>
                      <SelectTrigger className={`h-12 text-lg ${formErrors.monthlyAdSpend ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select your monthly spend" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1k">Under $1,000</SelectItem>
                        <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                        <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                        <SelectItem value="over-50k">Over $50,000</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.monthlyAdSpend && <p className="text-red-500 text-sm mt-1">{formErrors.monthlyAdSpend}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Advertising Platform *</label>
                    <Select onValueChange={(value) => handleSelectChange('primaryPlatform', value)} value={formData.primaryPlatform} required>
                      <SelectTrigger className={`h-12 text-lg ${formErrors.primaryPlatform ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select your main platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amazon">Amazon</SelectItem>
                        <SelectItem value="walmart">Walmart</SelectItem>
                        <SelectItem value="meta">Facebook/Instagram</SelectItem>
                        <SelectItem value="google">Google Ads</SelectItem>
                        <SelectItem value="multiple">Multiple Platforms</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.primaryPlatform && <p className="text-red-500 text-sm mt-1">{formErrors.primaryPlatform}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Business Goals *</label>
                  <Textarea
                    name="businessGoals"
                    value={formData.businessGoals}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`text-lg border-slate-300 resize-none ${formErrors.businessGoals ? 'border-red-500' : ''}`}
                    placeholder="What are your main business objectives? (e.g., increase sales, improve ROAS, expand to new markets)"
                  />
                  {formErrors.businessGoals && <p className="text-red-500 text-sm mt-1">{formErrors.businessGoals}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Current Challenges</label>
                  <Textarea
                    name="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={handleChange}
                    rows={4}
                    className="text-lg border-slate-300 resize-none"
                    placeholder="What advertising challenges are you facing? (e.g., high CPC, low conversion rates, account management issues)"
                  />
                </div>
              </div>

              {/* File Upload Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">Required Reports</h3>
                <p className="text-slate-600 text-sm">
                  Please upload your advertising reports for a comprehensive audit. All files should be in PDF, Excel, or CSV format (Max 10MB each).
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-900">
                      30 Days Business Sales Report
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept=".pdf,.xlsx,.xls,.csv"
                        onChange={(e) => handleFileUpload(e, 'businessSalesReport')}
                        className="hidden"
                        id="businessSalesReport"
                      />
                      <label htmlFor="businessSalesReport" className="cursor-pointer">
                        <span className="text-sm text-blue-600 hover:text-blue-800">
                          {formData.businessSalesReport ? formData.businessSalesReport.name : 'Upload File'}
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV (Max 10MB)</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-900">
                      60 Days Search Term Report
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept=".pdf,.xlsx,.xls,.csv"
                        onChange={(e) => handleFileUpload(e, 'searchTermReport')}
                        className="hidden"
                        id="searchTermReport"
                      />
                      <label htmlFor="searchTermReport" className="cursor-pointer">
                        <span className="text-sm text-blue-600 hover:text-blue-800">
                          {formData.searchTermReport ? formData.searchTermReport.name : 'Upload File'}
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV (Max 10MB)</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-900">
                      60 Days Advertised Product Report
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept=".pdf,.xlsx,.xls,.csv"
                        onChange={(e) => handleFileUpload(e, 'advertisedProductReport')}
                        className="hidden"
                        id="advertisedProductReport"
                      />
                      <label htmlFor="advertisedProductReport" className="cursor-pointer">
                        <span className="text-sm text-blue-600 hover:text-blue-800">
                          {formData.advertisedProductReport ? formData.advertisedProductReport.name : 'Upload File'}
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV (Max 10MB)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Processing with Local Storage...
                  </div>
                ) : (
                  <>
                    Get My Free $2,000 Audit
                    <Send className="ml-3 w-6 h-6" />
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-slate-500">
                No spam, ever. Data stored securely in local storage.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FreeAuditForm;
