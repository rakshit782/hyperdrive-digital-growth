import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

export function SettingsSection() {
  const [footerData, setFooterData] = useState({
    email: localStorage.getItem("footer_email") || "info@amzadscout.com",
    phone: localStorage.getItem("footer_phone") || "+1 (555) 123-4567",
    address: localStorage.getItem("footer_address") || "New York, NY 10001",
  });

  const savedLogoData = localStorage.getItem('logo_data');
  const parsedLogoData = savedLogoData ? JSON.parse(savedLogoData) : { text: 'Digital Growth', imageUrl: '', faviconUrl: '' };
  
  const [logoData, setLogoData] = useState({
    text: parsedLogoData.text || "Digital Growth",
    imageUrl: parsedLogoData.imageUrl || "",
    faviconUrl: parsedLogoData.faviconUrl || "",
  });

  const logoFileRef = useRef<HTMLInputElement>(null);
  const faviconFileRef = useRef<HTMLInputElement>(null);

  const saveFooter = () => {
    localStorage.setItem("footer_email", footerData.email);
    localStorage.setItem("footer_phone", footerData.phone);
    localStorage.setItem("footer_address", footerData.address);
    toast.success("Footer settings saved");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoData({ ...logoData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoData({ ...logoData, faviconUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveLogo = () => {
    localStorage.setItem('logo_data', JSON.stringify(logoData));
    window.dispatchEvent(new Event("logo-updated"));
    toast.success("Logo and favicon settings saved");
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
              <Label htmlFor="logoUpload">Upload Logo Image</Label>
              <div className="flex gap-2">
                <Input
                  ref={logoFileRef}
                  id="logoUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => logoFileRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Logo File
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Upload a logo image file (PNG, JPG, SVG)
              </p>
            </div>

            <div>
              <Label htmlFor="faviconUpload">Upload Favicon</Label>
              <div className="flex gap-2">
                <Input
                  ref={faviconFileRef}
                  id="faviconUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFaviconUpload}
                  className="hidden"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => faviconFileRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Favicon File
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Upload a favicon image (ICO, PNG - 32x32 or 16x16 recommended)
              </p>
            </div>

            {logoData.imageUrl && (
              <div className="space-y-2">
                <Label>Logo Preview</Label>
                <div className="p-4 bg-muted rounded-lg">
                  <img
                    src={logoData.imageUrl}
                    alt="Logo preview"
                    className="h-12 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      toast.error("Invalid logo image");
                    }}
                  />
                </div>
              </div>
            )}

            {logoData.faviconUrl && (
              <div className="space-y-2">
                <Label>Favicon Preview</Label>
                <div className="p-4 bg-muted rounded-lg flex items-center">
                  <img
                    src={logoData.faviconUrl}
                    alt="Favicon preview"
                    className="h-8 w-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      toast.error("Invalid favicon image");
                    }}
                  />
                </div>
              </div>
            )}

            <Button onClick={saveLogo} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Logo & Favicon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
