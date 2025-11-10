import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SettingsSection() {
  const [footerData, setFooterData] = useState({
    email: localStorage.getItem("footer_email") || "info@amzadscout.com",
    phone: localStorage.getItem("footer_phone") || "+1 (555) 123-4567",
    address: localStorage.getItem("footer_address") || "New York, NY 10001",
  });

  const [logoData, setLogoData] = useState({
    text: localStorage.getItem("logo_text") || "Digital Growth",
    imageUrl: localStorage.getItem("logo_image") || "",
  });

  const saveFooter = () => {
    localStorage.setItem("footer_email", footerData.email);
    localStorage.setItem("footer_phone", footerData.phone);
    localStorage.setItem("footer_address", footerData.address);
    toast.success("Footer settings saved");
  };

  const saveLogo = () => {
    localStorage.setItem("logo_text", logoData.text);
    localStorage.setItem("logo_image", logoData.imageUrl);
    window.dispatchEvent(new Event("logo-updated"));
    toast.success("Logo settings saved");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your website configuration</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Footer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={footerData.email}
                onChange={(e) => setFooterData({ ...footerData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={footerData.phone}
                onChange={(e) => setFooterData({ ...footerData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={footerData.address}
                onChange={(e) => setFooterData({ ...footerData, address: e.target.value })}
              />
            </div>
            <Button onClick={saveFooter} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Footer
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logo Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="logoText">Logo Text</Label>
              <Input
                id="logoText"
                value={logoData.text}
                onChange={(e) => setLogoData({ ...logoData, text: e.target.value })}
                placeholder="Your Brand Name"
              />
            </div>
            <div>
              <Label htmlFor="logoImage">Logo Image URL (optional)</Label>
              <Input
                id="logoImage"
                value={logoData.imageUrl}
                onChange={(e) => setLogoData({ ...logoData, imageUrl: e.target.value })}
                placeholder="https://example.com/logo.png"
              />
            </div>
            {logoData.imageUrl && (
              <div className="p-4 bg-muted rounded-lg">
                <img
                  src={logoData.imageUrl}
                  alt="Logo preview"
                  className="h-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    toast.error("Invalid image URL");
                  }}
                />
              </div>
            )}
            <Button onClick={saveLogo} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Logo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
