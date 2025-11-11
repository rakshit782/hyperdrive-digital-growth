import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SettingsSection() {
  const [footerData, setFooterData] = useState({
    email: localStorage.getItem("footer_email") || "info@amzadscout.com",
    phone: localStorage.getItem("footer_phone") || "+1 (555) 123-4567",
    address: localStorage.getItem("footer_address") || "New York, NY 10001",
  });

  const savedLogoData = localStorage.getItem('logo_data');
  const parsedLogoData = savedLogoData ? JSON.parse(savedLogoData) : { text: 'AMZ AD SCOUT', imageUrl: '/logo.png', faviconUrl: '/favicon.png', size: 80 };
  
  const [logoData, setLogoData] = useState({
    text: parsedLogoData.text || "AMZ AD SCOUT",
    imageUrl: parsedLogoData.imageUrl || "/logo.png",
    faviconUrl: parsedLogoData.faviconUrl || "/favicon.png",
    size: parsedLogoData.size || 80,
  });

  const saveFooter = () => {
    localStorage.setItem("footer_email", footerData.email);
    localStorage.setItem("footer_phone", footerData.phone);
    localStorage.setItem("footer_address", footerData.address);
    toast.success("Footer settings saved");
  };

  const saveLogoSize = () => {
    localStorage.setItem('logo_data', JSON.stringify(logoData));
    window.dispatchEvent(new Event("logo-updated"));
    toast.success("Logo size updated successfully");
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
            <CardTitle>Logo Size Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Logo Preview (at {logoData.size}px)</Label>
              <div className="p-6 bg-muted rounded-lg flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="AMZ AD SCOUT Logo"
                  style={{ height: `${logoData.size}px` }}
                  className="object-contain"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="logoSize">Logo Height: {logoData.size}px</Label>
              <Slider
                id="logoSize"
                min={40}
                max={160}
                step={10}
                value={[logoData.size]}
                onValueChange={(value) => setLogoData({ ...logoData, size: value[0] })}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Adjust the height of your logo (40px - 160px)
              </p>
            </div>

            <Button onClick={saveLogoSize} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Logo Size
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
