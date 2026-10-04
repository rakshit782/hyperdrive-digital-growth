import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, RotateCcw, Link2, ExternalLink } from "lucide-react";
import { useHeaderSettings, HeaderSettings } from "@/hooks/useHeaderSettings";

export function HeaderSettingsSection() {
  const { settings, saveSettings, defaultSettings } = useHeaderSettings();
  const [formData, setFormData] = useState<HeaderSettings>(settings);

  const handleChange = (field: keyof HeaderSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(formData);
    toast.success("Header settings updated successfully!");
  };

  const handleReset = () => {
    setFormData(defaultSettings);
    saveSettings(defaultSettings);
    toast.info("Header settings reset to defaults");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Header & Navigation Settings</h2>
          <p className="text-muted-foreground text-sm">
            Control the top announcement bar, partner badges, social media links, and header CTA button.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </Button>
          <Button onClick={handleSave} size="sm" className="gap-1.5 bg-blue-600 hover:bg-blue-700">
            <Save className="w-3.5 h-3.5" /> Save Changes
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* TOP BAR ANNOUNCEMENT & BADGES */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Link2 className="w-4 h-4 text-blue-600" /> Top Bar Announcement & Partner Badges
            </CardTitle>
            <CardDescription>
              Configure the top bar tagline, partner credentials, and their click-through destinations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="topBarText">Top Bar Tagline Text</Label>
                <Input
                  id="topBarText"
                  value={formData.topBarText}
                  onChange={(e) => handleChange("topBarText", e.target.value)}
                  placeholder="An Amazon & Walmart Advertising Agency"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="topBarTextLink">Tagline Click Link</Label>
                <Input
                  id="topBarTextLink"
                  value={formData.topBarTextLink}
                  onChange={(e) => handleChange("topBarTextLink", e.target.value)}
                  placeholder="/services"
                />
              </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg space-y-3 bg-muted/20">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showAmazonAdsPartner" className="font-semibold cursor-pointer">
                    Show Amazon Ads Partner Badge
                  </Label>
                  <Switch
                    id="showAmazonAdsPartner"
                    checked={formData.showAmazonAdsPartner}
                    onCheckedChange={(checked) => handleChange("showAmazonAdsPartner", checked)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="amazonAdsPartnerLink" className="text-xs text-muted-foreground">
                    Link Destination
                  </Label>
                  <Input
                    id="amazonAdsPartnerLink"
                    value={formData.amazonAdsPartnerLink}
                    onChange={(e) => handleChange("amazonAdsPartnerLink", e.target.value)}
                    placeholder="/amazon-ads-partner"
                    disabled={!formData.showAmazonAdsPartner}
                  />
                </div>
              </div>

              <div className="p-3 border rounded-lg space-y-3 bg-muted/20">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showAmazonSpnPartner" className="font-semibold cursor-pointer">
                    Show Amazon SPN Partner Badge
                  </Label>
                  <Switch
                    id="showAmazonSpnPartner"
                    checked={formData.showAmazonSpnPartner}
                    onCheckedChange={(checked) => handleChange("showAmazonSpnPartner", checked)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="amazonSpnPartnerLink" className="text-xs text-muted-foreground">
                    Link Destination
                  </Label>
                  <Input
                    id="amazonSpnPartnerLink"
                    value={formData.amazonSpnPartnerLink}
                    onChange={(e) => handleChange("amazonSpnPartnerLink", e.target.value)}
                    placeholder="/services/amazon-advertising"
                    disabled={!formData.showAmazonSpnPartner}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* EMAIL & SOCIAL MEDIA LINKS */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-orange-500" /> Contact Email & Social Channels
            </CardTitle>
            <CardDescription>
              Display email address and link to official profiles. (Phone number is completely omitted as requested).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Display Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="info@amzadscout.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="emailLink">Email Action Link</Label>
                <Input
                  id="emailLink"
                  value={formData.emailLink}
                  onChange={(e) => handleChange("emailLink", e.target.value)}
                  placeholder="mailto:info@amzadscout.com"
                />
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Social Media Profiles (LinkedIn, Facebook, Instagram)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                    placeholder="https://linkedin.com/company/amz-ad-scout"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="facebookUrl">Facebook URL</Label>
                  <Input
                    id="facebookUrl"
                    value={formData.facebookUrl}
                    onChange={(e) => handleChange("facebookUrl", e.target.value)}
                    placeholder="https://facebook.com/amzadscout"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="instagramUrl">Instagram URL</Label>
                  <Input
                    id="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={(e) => handleChange("instagramUrl", e.target.value)}
                    placeholder="https://instagram.com/amzadscout"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA BUTTON */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Header CTA Button</CardTitle>
            <CardDescription>
              Configure the primary call-to-action button rendered in the header.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="ctaText">Button Text</Label>
                <Input
                  id="ctaText"
                  value={formData.ctaText}
                  onChange={(e) => handleChange("ctaText", e.target.value)}
                  placeholder="Get Free Strategy Call"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ctaLink">Button Destination URL</Label>
                <Input
                  id="ctaLink"
                  value={formData.ctaLink}
                  onChange={(e) => handleChange("ctaLink", e.target.value)}
                  placeholder="/contact"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 gap-2">
            <Save className="w-4 h-4" /> Save Header Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
