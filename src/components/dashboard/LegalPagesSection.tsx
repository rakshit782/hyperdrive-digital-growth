import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function LegalPagesSection() {
  const [privacyContent, setPrivacyContent] = useState('');
  const [termsContent, setTermsContent] = useState('');
  const [refundContent, setRefundContent] = useState('');

  useEffect(() => {
    // Load saved content
    setPrivacyContent(localStorage.getItem('legal_privacy') || '');
    setTermsContent(localStorage.getItem('legal_terms') || '');
    setRefundContent(localStorage.getItem('legal_refund') || '');
  }, []);

  const savePrivacy = () => {
    localStorage.setItem('legal_privacy', privacyContent);
    toast.success("Privacy Policy saved successfully");
  };

  const saveTerms = () => {
    localStorage.setItem('legal_terms', termsContent);
    toast.success("Terms & Conditions saved successfully");
  };

  const saveRefund = () => {
    localStorage.setItem('legal_refund', refundContent);
    toast.success("Refund Policy saved successfully");
  };

  const previewPage = (page: string) => {
    window.open(`/${page}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Legal Pages</h2>
        <p className="text-muted-foreground mt-1">Manage your website's legal content</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Legal Pages</CardTitle>
          <CardDescription>
            Update the content of your Privacy Policy, Terms & Conditions, and Refund Policy pages. 
            You can use HTML formatting for better styling.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="privacy" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
              <TabsTrigger value="refund">Refund Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="privacy" className="space-y-4">
              <div>
                <Label htmlFor="privacy-content">Privacy Policy Content</Label>
                <Textarea
                  id="privacy-content"
                  value={privacyContent}
                  onChange={(e) => setPrivacyContent(e.target.value)}
                  className="min-h-[400px] font-mono text-sm mt-2"
                  placeholder="Enter your privacy policy content here. You can use HTML tags for formatting."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={savePrivacy} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Privacy Policy
                </Button>
                <Button onClick={() => previewPage('privacy')} variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="terms" className="space-y-4">
              <div>
                <Label htmlFor="terms-content">Terms & Conditions Content</Label>
                <Textarea
                  id="terms-content"
                  value={termsContent}
                  onChange={(e) => setTermsContent(e.target.value)}
                  className="min-h-[400px] font-mono text-sm mt-2"
                  placeholder="Enter your terms & conditions content here. You can use HTML tags for formatting."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={saveTerms} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Terms & Conditions
                </Button>
                <Button onClick={() => previewPage('terms')} variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="refund" className="space-y-4">
              <div>
                <Label htmlFor="refund-content">Refund Policy Content</Label>
                <Textarea
                  id="refund-content"
                  value={refundContent}
                  onChange={(e) => setRefundContent(e.target.value)}
                  className="min-h-[400px] font-mono text-sm mt-2"
                  placeholder="Enter your refund policy content here. You can use HTML tags for formatting."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={saveRefund} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Refund Policy
                </Button>
                <Button onClick={() => previewPage('refund-policy')} variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">HTML Formatting Tips:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use &lt;h1&gt; for main title, &lt;h2&gt; for section headings</li>
              <li>• Use &lt;p&gt; for paragraphs</li>
              <li>• Use &lt;ul&gt; and &lt;li&gt; for bullet lists</li>
              <li>• Use &lt;strong&gt; for bold text</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
