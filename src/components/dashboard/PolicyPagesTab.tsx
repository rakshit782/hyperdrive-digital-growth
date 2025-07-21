
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, CheckCircle, AlertCircle } from "lucide-react";
import { useSupabasePolicyPages } from "@/hooks/useSupabasePolicyPages";
import { toast } from "sonner";

const PolicyPagesTab = () => {
  const { policyPages, loading, error, updatePolicyPage, getPolicyPageByType } = useSupabasePolicyPages();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPages, setEditingPages] = useState<Record<string, any>>({});

  const handleSubmit = async (pageType: string, e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const pageData = editingPages[pageType];
      if (!pageData) return;

      await updatePolicyPage(pageType, {
        title: pageData.title,
        last_updated: pageData.last_updated,
        content: pageData.content,
        updated_at: new Date().toISOString()
      });

      toast.success(`${pageData.title} updated successfully`);
    } catch (error) {
      console.error('Error updating policy page:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (pageType: string, field: string, value: string) => {
    setEditingPages(prev => ({
      ...prev,
      [pageType]: {
        ...prev[pageType],
        [field]: value
      }
    }));
  };

  const getPageData = (pageType: string) => {
    return editingPages[pageType] || getPolicyPageByType(pageType) || {
      title: '',
      last_updated: '',
      content: ''
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        <span>Loading policy pages...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-600">
        <AlertCircle className="w-8 h-8 mr-2" />
        <span>Error loading policy pages: {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <CheckCircle className="w-6 h-6 text-green-600" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Policy Pages Content</h2>
          <p className="text-gray-600">Real-time management of legal and policy pages ({policyPages.length} pages)</p>
        </div>
      </div>

      <Tabs defaultValue="privacy-policy" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="privacy-policy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="terms-of-service">Terms of Service</TabsTrigger>
          <TabsTrigger value="terms-conditions">Terms & Conditions</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy-policy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
              <CardDescription>
                Configure your privacy policy content (real-time updates)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit('privacy-policy', e)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="privacy-title">Page Title</Label>
                    <Input
                      id="privacy-title"
                      value={getPageData('privacy-policy').title}
                      onChange={(e) => handleInputChange('privacy-policy', 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="privacy-updated">Last Updated</Label>
                    <Input
                      id="privacy-updated"
                      value={getPageData('privacy-policy').last_updated}
                      onChange={(e) => handleInputChange('privacy-policy', 'last_updated', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="privacy-content">Content (HTML allowed)</Label>
                  <Textarea
                    id="privacy-content"
                    value={getPageData('privacy-policy').content}
                    onChange={(e) => handleInputChange('privacy-policy', 'content', e.target.value)}
                    rows={15}
                    placeholder="Enter your privacy policy content here. You can use HTML tags like <h2>, <p>, <ul>, etc."
                  />
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Privacy Policy
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms-of-service">
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
              <CardDescription>
                Configure your terms of service content (real-time updates)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit('terms-of-service', e)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="terms-title">Page Title</Label>
                    <Input
                      id="terms-title"
                      value={getPageData('terms-of-service').title}
                      onChange={(e) => handleInputChange('terms-of-service', 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="terms-updated">Last Updated</Label>
                    <Input
                      id="terms-updated"
                      value={getPageData('terms-of-service').last_updated}
                      onChange={(e) => handleInputChange('terms-of-service', 'last_updated', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="terms-content">Content (HTML allowed)</Label>
                  <Textarea
                    id="terms-content"
                    value={getPageData('terms-of-service').content}
                    onChange={(e) => handleInputChange('terms-of-service', 'content', e.target.value)}
                    rows={15}
                    placeholder="Enter your terms of service content here. You can use HTML tags like <h2>, <p>, <ul>, etc."
                  />
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Terms of Service
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms-conditions">
          <Card>
            <CardHeader>
              <CardTitle>Terms & Conditions</CardTitle>
              <CardDescription>
                Configure your terms and conditions content (real-time updates)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit('terms-conditions', e)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="conditions-title">Page Title</Label>
                    <Input
                      id="conditions-title"
                      value={getPageData('terms-conditions').title}
                      onChange={(e) => handleInputChange('terms-conditions', 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="conditions-updated">Last Updated</Label>
                    <Input
                      id="conditions-updated"
                      value={getPageData('terms-conditions').last_updated}
                      onChange={(e) => handleInputChange('terms-conditions', 'last_updated', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="conditions-content">Content (HTML allowed)</Label>
                  <Textarea
                    id="conditions-content"
                    value={getPageData('terms-conditions').content}
                    onChange={(e) => handleInputChange('terms-conditions', 'content', e.target.value)}
                    rows={15}
                    placeholder="Enter your terms and conditions content here. You can use HTML tags like <h2>, <p>, <ul>, etc."
                  />
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Terms & Conditions
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PolicyPagesTab;
