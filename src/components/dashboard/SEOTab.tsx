
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const SEOTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">SEO Settings</h2>
        <p className="text-gray-600 mt-2">Optimize your website for search engines</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Website SEO
          </CardTitle>
          <CardDescription>Configure your site's SEO metadata</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="seo-title">Site Title</Label>
            <Input id="seo-title" placeholder="Your website title" />
          </div>
          <div>
            <Label htmlFor="seo-description">Meta Description</Label>
            <Textarea id="seo-description" placeholder="Brief description of your website" />
          </div>
          <div>
            <Label htmlFor="seo-keywords">Keywords</Label>
            <Input id="seo-keywords" placeholder="Comma-separated keywords" />
          </div>
          <Button>Save SEO Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOTab;
