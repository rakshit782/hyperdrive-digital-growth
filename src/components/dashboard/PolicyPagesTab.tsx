
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface PolicyContent {
  title: string;
  lastUpdated: string;
  content: string;
}

const PolicyPagesTab = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState<PolicyContent>({
    title: "Privacy Policy",
    lastUpdated: "December 2024",
    content: ""
  });

  const [termsOfService, setTermsOfService] = useState<PolicyContent>({
    title: "Terms of Service", 
    lastUpdated: "December 2024",
    content: ""
  });

  const [termsConditions, setTermsConditions] = useState<PolicyContent>({
    title: "Terms & Conditions",
    lastUpdated: "December 2024", 
    content: ""
  });

  useEffect(() => {
    loadPolicyContent();
  }, []);

  const loadPolicyContent = () => {
    // Load Privacy Policy
    const savedPrivacy = localStorage.getItem('privacyPolicyContent');
    if (savedPrivacy) {
      try {
        setPrivacyPolicy(JSON.parse(savedPrivacy));
      } catch (error) {
        console.error('Failed to parse privacy policy:', error);
      }
    }

    // Load Terms of Service
    const savedTerms = localStorage.getItem('termsOfServiceContent');
    if (savedTerms) {
      try {
        setTermsOfService(JSON.parse(savedTerms));
      } catch (error) {
        console.error('Failed to parse terms of service:', error);
      }
    }

    // Load Terms & Conditions
    const savedConditions = localStorage.getItem('termsConditionsContent');
    if (savedConditions) {
      try {
        setTermsConditions(JSON.parse(savedConditions));
      } catch (error) {
        console.error('Failed to parse terms conditions:', error);
      }
    }
  };

  const savePolicy = (type: string, content: PolicyContent) => {
    localStorage.setItem(`${type}Content`, JSON.stringify(content));
    
    // Dispatch event for the respective page
    window.dispatchEvent(new CustomEvent(`${type}Updated`, { 
      detail: content 
    }));
    
    toast.success(`${content.title} updated successfully`);
  };

  const handlePrivacySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePolicy('privacyPolicy', privacyPolicy);
  };

  const handleTermsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePolicy('termsOfService', termsOfService);
  };

  const handleConditionsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePolicy('termsConditions', termsConditions);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Policy Pages Content</h2>
        <p className="text-gray-600">Manage the content for your legal and policy pages</p>
      </div>

      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          <TabsTrigger value="conditions">Terms & Conditions</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
              <CardDescription>
                Configure your privacy policy content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePrivacySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="privacy-title">Page Title</Label>
                    <Input
                      id="privacy-title"
                      value={privacyPolicy.title}
                      onChange={(e) => setPrivacyPolicy(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="privacy-updated">Last Updated</Label>
                    <Input
                      id="privacy-updated"
                      value={privacyPolicy.lastUpdated}
                      onChange={(e) => setPrivacyPolicy(prev => ({ ...prev, lastUpdated: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="privacy-content">Content (HTML allowed)</Label>
                  <Textarea
                    id="privacy-content"
                    value={privacyPolicy.content}
                    onChange={(e) => setPrivacyPolicy(prev => ({ ...prev, content: e.target.value }))}
                    rows={15}
                    placeholder="Enter your privacy policy content here. You can use HTML tags like <h2>, <p>, <ul>, etc."
                  />
                </div>

                <Button type="submit">Update Privacy Policy</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms">
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
              <CardDescription>
                Configure your terms of service content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTermsSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="terms-title">Page Title</Label>
                    <Input
                      id="terms-title"
                      value={termsOfService.title}
                      onChange={(e) => setTermsOfService(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="terms-updated">Last Updated</Label>
                    <Input
                      id="terms-updated"
                      value={termsOfService.lastUpdated}
                      onChange={(e) => setTermsOfService(prev => ({ ...prev, lastUpdated: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="terms-content">Content (HTML allowed)</Label>
                  <Textarea
                    id="terms-content"
                    value={termsOfService.content}
                    onChange={(e) => setTermsOfService(prev => ({ ...prev, content: e.target.value }))}
                    rows={15}
                    placeholder="Enter your terms of service content here. You can use HTML tags like <h2>, <p>, <ul>, etc."
                  />
                </div>

                <Button type="submit">Update Terms of Service</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conditions">
          <Card>
            <CardHeader>
              <CardTitle>Terms & Conditions</CardTitle>
              <CardDescription>
                Configure your terms and conditions content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleConditionsSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="conditions-title">Page Title</Label>
                    <Input
                      id="conditions-title"
                      value={termsConditions.title}
                      onChange={(e) => setTermsConditions(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="conditions-updated">Last Updated</Label>
                    <Input
                      id="conditions-updated"
                      value={termsConditions.lastUpdated}
                      onChange={(e) => setTermsConditions(prev => ({ ...prev, lastUpdated: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="conditions-content">Content (HTML allowed)</Label>
                  <Textarea
                    id="conditions-content"
                    value={termsConditions.content}
                    onChange={(e) => setTermsConditions(prev => ({ ...prev, content: e.target.value }))}
                    rows={15}
                    placeholder="Enter your terms and conditions content here. You can use HTML tags like <h2>, <p>, <ul>, etc."
                  />
                </div>

                <Button type="submit">Update Terms & Conditions</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PolicyPagesTab;
