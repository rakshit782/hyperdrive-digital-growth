
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { supabase } from '@/integrations/supabase/client';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import AuditBenefits from '@/components/forms/AuditBenefits';

const auditFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  monthlyAdSpend: z.string().min(1, 'Please select your monthly ad spend'),
  primaryPlatform: z.string().min(1, 'Please select your primary platform'),
  businessGoals: z.string().min(10, 'Please describe your business goals (minimum 10 characters)'),
  currentChallenges: z.string().min(10, 'Please describe your current challenges (minimum 10 characters)'),
});

type AuditFormData = z.infer<typeof auditFormSchema>;

interface FileUploadState {
  businessSalesReport: File | null;
  searchTermReport: File | null;
  advertisedProductReport: File | null;
}

const FreeAuditForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadState>({
    businessSalesReport: null,
    searchTermReport: null,
    advertisedProductReport: null,
  });
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const { toast } = useToast();
  const { submitForm } = useFormSubmission();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
  });

  const uploadFileToStorage = async (file: File, fileName: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${Date.now()}-${fileName}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('lead-files')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      return filePath;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const handleFileChange = (fileType: keyof FileUploadState, file: File | null) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const onSubmit = async (data: AuditFormData) => {
    setIsSubmitting(true);
    
    try {
      // Upload files to Supabase storage
      const uploadedFilePaths: { [key: string]: string | null } = {};
      
      if (uploadedFiles.businessSalesReport) {
        setUploadProgress({ businessSalesReport: 0 });
        uploadedFilePaths.businessSalesReport = await uploadFileToStorage(
          uploadedFiles.businessSalesReport, 
          'business-sales-report'
        );
        setUploadProgress({ businessSalesReport: 100 });
      }
      
      if (uploadedFiles.searchTermReport) {
        setUploadProgress({ searchTermReport: 0 });
        uploadedFilePaths.searchTermReport = await uploadFileToStorage(
          uploadedFiles.searchTermReport, 
          'search-term-report'
        );
        setUploadProgress({ searchTermReport: 100 });
      }
      
      if (uploadedFiles.advertisedProductReport) {
        setUploadProgress({ advertisedProductReport: 0 });
        uploadedFilePaths.advertisedProductReport = await uploadFileToStorage(
          uploadedFiles.advertisedProductReport, 
          'advertised-product-report'
        );
        setUploadProgress({ advertisedProductReport: 100 });
      }

      const fullName = `${data.firstName} ${data.lastName}`;
      
      const result = await submitForm({
        name: fullName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        source: 'free_audit_form',
        formType: 'free_audit',
        firstName: data.firstName,
        lastName: data.lastName,
        businessGoals: data.businessGoals,
        website: data.website,
        monthlyAdSpend: data.monthlyAdSpend,
        primaryPlatform: data.primaryPlatform,
        currentChallenges: data.currentChallenges,
        uploadedFiles: uploadedFilePaths,
      });

      if (result.success) {
        toast({
          title: "Audit Request Submitted!",
          description: "We'll review your information and get back to you within 24 hours with your comprehensive audit.",
        });
        
        // Reset form
        setUploadedFiles({
          businessSalesReport: null,
          searchTermReport: null,
          advertisedProductReport: null,
        });
        setUploadProgress({});
      } else {
        throw new Error(result.error || 'Failed to submit audit request');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "There was an error submitting your audit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUploadField = ({ 
    label, 
    fileType, 
    accept = ".pdf,.xlsx,.xls,.csv" 
  }: { 
    label: string; 
    fileType: keyof FileUploadState; 
    accept?: string;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={fileType} className="text-sm font-medium text-gray-700">
        {label} <span className="text-gray-500">(Optional)</span>
      </Label>
      <div className="relative">
        <Input
          id={fileType}
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            handleFileChange(fileType, file);
          }}
          className="hidden"
        />
        <Label
          htmlFor={fileType}
          className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
        >
          <div className="flex flex-col items-center space-y-2">
            {uploadedFiles[fileType] ? (
              <>
                <FileText className="w-6 h-6 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  {uploadedFiles[fileType]?.name}
                </span>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-600">Click to upload file</span>
              </>
            )}
          </div>
        </Label>
        {uploadProgress[fileType] !== undefined && uploadProgress[fileType] < 100 && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress[fileType]}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left side - Benefits */}
          <AuditBenefits />

          {/* Right side - Form */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Get Your Free $2,000 Audit
              </CardTitle>
              <CardDescription className="text-gray-600">
                Fill out the form below and upload your reports for a comprehensive analysis
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      {...register('firstName')}
                      placeholder="John"
                      className="mt-1"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      {...register('lastName')}
                      placeholder="Doe"
                      className="mt-1"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="john@company.com"
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    {...register('phone')}
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    {...register('company')}
                    placeholder="Your Company LLC"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    {...register('website')}
                    placeholder="https://yourwebsite.com"
                    className="mt-1"
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                  )}
                </div>

                {/* Business Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monthlyAdSpend">Monthly Ad Spend *</Label>
                    <Select onValueChange={(value) => setValue('monthlyAdSpend', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1k">Under $1,000</SelectItem>
                        <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                        <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                        <SelectItem value="50k-plus">$50,000+</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.monthlyAdSpend && (
                      <p className="text-red-500 text-sm mt-1">{errors.monthlyAdSpend.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="primaryPlatform">Primary Platform *</Label>
                    <Select onValueChange={(value) => setValue('primaryPlatform', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amazon">Amazon</SelectItem>
                        <SelectItem value="walmart">Walmart</SelectItem>
                        <SelectItem value="meta">Meta (Facebook/Instagram)</SelectItem>
                        <SelectItem value="google">Google Ads</SelectItem>
                        <SelectItem value="multiple">Multiple Platforms</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.primaryPlatform && (
                      <p className="text-red-500 text-sm mt-1">{errors.primaryPlatform.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="businessGoals">Business Goals *</Label>
                  <Textarea
                    {...register('businessGoals')}
                    placeholder="Describe your main business goals and what you want to achieve..."
                    className="mt-1 min-h-[80px]"
                  />
                  {errors.businessGoals && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessGoals.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="currentChallenges">Current Challenges *</Label>
                  <Textarea
                    {...register('currentChallenges')}
                    placeholder="What challenges are you currently facing with your advertising?"
                    className="mt-1 min-h-[80px]"
                  />
                  {errors.currentChallenges && (
                    <p className="text-red-500 text-sm mt-1">{errors.currentChallenges.message}</p>
                  )}
                </div>

                {/* File Upload Section */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Upload Reports (Optional)</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Upload your reports to get more detailed insights in your audit
                  </p>
                  
                  <div className="space-y-4">
                    <FileUploadField 
                      label="30 Days Business Sales Report" 
                      fileType="businessSalesReport"
                    />
                    <FileUploadField 
                      label="60 Days Search Term Report" 
                      fileType="searchTermReport"
                    />
                    <FileUploadField 
                      label="60 Days Advertised Product Report" 
                      fileType="advertisedProductReport"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Audit Request...' : 'Get My Free $2,000 Audit'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FreeAuditForm;
