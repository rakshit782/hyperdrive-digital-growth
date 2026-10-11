import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Save, Crop, Mail, Eye, EyeOff, Send, CheckCircle2, Sliders, FileCode2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import ReactCrop, { Crop as CropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  SITE_SETTINGS_API_URL,
  fetchSiteSettings,
  saveSiteSettings,
  sendTestEmail,
} from "@/hooks/useSiteSettings";

interface SettingsSectionProps {
  activeSubSection?: string;
  onSubSectionChange?: (sub: string) => void;
}

export function SettingsSection({ activeSubSection = "general", onSubSectionChange }: SettingsSectionProps) {
  const [footerData, setFooterData] = useState({
    email: localStorage.getItem("footer_email") || "info@amzadscout.com",
    address: localStorage.getItem("footer_address") || "New York, NY 10001",
  });

  const savedLogoData = localStorage.getItem('logo_data');
  const parsedLogoData = savedLogoData ? JSON.parse(savedLogoData) : { text: 'AMZ AD SCOUT', imageUrl: '/logo.png', faviconUrl: '/favicon.ico', size: 70 };
  
  const [logoData, setLogoData] = useState({
    text: parsedLogoData.text || "AMZ AD SCOUT",
    imageUrl: parsedLogoData.imageUrl || "/logo.png",
    faviconUrl: parsedLogoData.faviconUrl || "/favicon.ico",
    size: parsedLogoData.size || 70,
  });

  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [isSavingMaintenance, setIsSavingMaintenance] = useState<boolean>(false);

  useEffect(() => {
    fetchSiteSettings().then((data) => {
      setMaintenanceMode(data.maintenance_mode === true);
      if (data.footer_email || data.footer_address) {
        setFooterData({
          email: data.footer_email || "info@amzadscout.com",
          address: data.footer_address || "New York, NY 10001",
        });
      }
      if (data.logo_settings) {
        setLogoData({
          text: data.logo_settings.text || "AMZ AD SCOUT",
          imageUrl: data.logo_settings.imageUrl || "/logo.png",
          faviconUrl: data.logo_settings.faviconUrl || "/favicon.ico",
          size: data.logo_settings.size || 70,
        });
      }
    }).catch(console.warn);
  }, []);

  const handleToggleMaintenance = async (checked: boolean) => {
    setMaintenanceMode(checked);
    setIsSavingMaintenance(true);
    try {
      await saveSiteSettings({
        maintenance_mode: checked,
      });
      localStorage.setItem("maintenance_mode", checked ? "true" : "false");
      window.dispatchEvent(new Event("maintenance-mode-updated"));
      toast.success(
        checked 
          ? "Maintenance mode activated. Visitors will now see the upgrade/maintenance page." 
          : "Website is now LIVE! Visitors can browse the full agency homepage and all features."
      );
    } catch (err: any) {
      setMaintenanceMode(!checked);
      toast.error(err.message || "Failed to update maintenance mode status");
    } finally {
      setIsSavingMaintenance(false);
    }
  };

  const saveFooter = async () => {
    try {
      await saveSiteSettings({
        footer_email: footerData.email,
        footer_address: footerData.address,
      });
      localStorage.setItem("footer_email", footerData.email);
      localStorage.setItem("footer_address", footerData.address);
      toast.success("Footer settings saved directly to Neon database");
    } catch (err: any) {
      toast.error(err.message || "Failed to save footer settings");
    }
  };

  const saveLogoSize = async () => {
    const updatedData = {
      ...logoData,
      text: logoData.text || 'AMZ AD SCOUT',
      imageUrl: logoData.imageUrl || '/logo.png',
      faviconUrl: logoData.faviconUrl || '/favicon.png',
    };
    try {
      await saveSiteSettings({
        logo_settings: updatedData,
      });
      localStorage.setItem('logo_data', JSON.stringify(updatedData));
      window.dispatchEvent(new Event("logo-updated"));
      toast.success("Logo settings saved directly to Neon database");
    } catch (err: any) {
      toast.error(err.message || "Failed to save logo settings");
    }
  };

  const applyCrop = () => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      toast.error("Please select a crop area first");
      return;
    }

    const canvas = previewCanvasRef.current;
    const image = imgRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      toast.error("Failed to get canvas context");
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {
      if (!blob) {
        toast.error("Failed to crop image");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const croppedImageUrl = reader.result as string;
        setLogoData({ ...logoData, imageUrl: croppedImageUrl });
        setIsCropDialogOpen(false);
        toast.success("Logo cropped! Click 'Save Logo Size' to apply changes.");
      };
      reader.readAsDataURL(blob);
    }, 'image/png');
  };

  const currentTab = ["general", "email"].includes(activeSubSection)
    ? activeSubSection
    : "general";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          {currentTab === "general" && "General & Branding Settings"}
          {currentTab === "email" && "Email & Lead Notification Settings"}
        </h2>
        <p className="text-muted-foreground mt-1">
          {currentTab === "general" && "Manage footer details, branding logo sizing and visual appearance"}
          {currentTab === "email" && "Configure Resend.com API integration, recipient inboxes, and dynamic email templates"}
        </p>
      </div>

      <Tabs 
        value={currentTab} 
        onValueChange={(val) => onSubSectionChange?.(val)}
        className="w-full space-y-6"
      >
        <TabsList className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-md h-auto p-1 bg-muted/70">
          <TabsTrigger value="general" className="gap-2 py-2 text-sm font-medium">
            <Sliders className="h-4 w-4" />
            General & Branding
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2 py-2 text-sm font-medium">
            <Mail className="h-4 w-4" />
            Email & Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Website Status & Maintenance Mode Card */}
          <Card className="border-2 border-primary/20 bg-card/60 backdrop-blur shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">Website Live & Maintenance Status</CardTitle>
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        maintenanceMode 
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700" 
                          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                      }`}
                    >
                      {maintenanceMode ? "🚧 Maintenance Page Active" : "🟢 Website is LIVE"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Control whether visitors see the full agency website or the brief upgrade/maintenance placeholder.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    id="maintenance-toggle"
                    checked={maintenanceMode}
                    onCheckedChange={handleToggleMaintenance}
                    disabled={isSavingMaintenance}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="p-3.5 rounded-xl bg-muted/40 border text-xs space-y-1.5 text-muted-foreground">
                <p>
                  <strong>When switched OFF (Default):</strong> The full public website is accessible to all visitors at <code className="text-foreground font-mono">https://www.amzadscout.com/</code>.
                </p>
                <p>
                  <strong>When switched ON:</strong> Visitors visiting the homepage will see the branded maintenance/upgrade screen with quick email collection and director login.
                </p>
              </div>
            </CardContent>
          </Card>

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
                      src={logoData.imageUrl}
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

                <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Crop className="h-4 w-4 mr-2" />
                      Crop Logo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Crop Your Logo</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="max-h-[60vh] overflow-auto">
                        <ReactCrop
                          crop={crop}
                          onChange={(c) => setCrop(c)}
                          onComplete={(c) => setCompletedCrop(c)}
                          aspect={undefined}
                        >
                          <img
                            ref={imgRef}
                            src={logoData.imageUrl}
                            alt="Crop preview"
                            className="max-w-full"
                          />
                        </ReactCrop>
                      </div>
                      <canvas
                        ref={previewCanvasRef}
                        className="hidden"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setIsCropDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={applyCrop}>
                          Apply Crop
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button onClick={saveLogoSize} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Logo Size
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <EmailNotificationsCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmailNotificationsCard() {
  const [apiKey, setApiKey] = useState("");
  const [hasExistingKey, setHasExistingKey] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [subjectTemplate, setSubjectTemplate] = useState("New Lead: {name} ({lead_number})");
  const [htmlTemplate, setHtmlTemplate] = useState("");
  const [currentRating, setCurrentRating] = useState("0");
  const [currentReviews, setCurrentReviews] = useState("0");
  const [currentSourceUrl, setCurrentSourceUrl] = useState("");
  const [currentRatingVisible, setCurrentRatingVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings(SITE_SETTINGS_API_URL)
      .then((data) => {
        if (cancelled) return;
        setCurrentRating(String(data.rating_value));
        setCurrentReviews(String(data.review_count));
        setCurrentSourceUrl(data.review_source_url ?? "");
        setCurrentRatingVisible(data.rating_visible);

        setHasExistingKey(Boolean(data.has_resend_api_key));
        if (data.resend_api_key) {
          setApiKey(data.resend_api_key);
        }
        if (data.notification_email) {
          setRecipientEmail(data.notification_email);
        }
        setEnabled(data.email_notifications_enabled === true);
        if (data.email_subject_template) {
          setSubjectTemplate(data.email_subject_template);
        }
        if (data.email_html_template) {
          setHtmlTemplate(data.email_html_template);
        }
      })
      .catch((e) => {
        console.warn("Could not load email settings:", e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async () => {
    if (enabled && !hasExistingKey && !apiKey.trim()) {
      toast.error("Please provide a Resend API key to enable email notifications");
      return;
    }

    if (enabled && !recipientEmail.trim()) {
      toast.error("Please enter at least one recipient email address");
      return;
    }

    setSaving(true);
    try {
      const parsedRating = Number(currentRating);
      const safeRating = Number.isFinite(parsedRating) && parsedRating >= 0 && parsedRating <= 5
        ? Number(parsedRating.toFixed(1))
        : 0;

      const parsedReviews = Number(currentReviews);
      const safeReviews = Number.isInteger(parsedReviews) && parsedReviews >= 0
        ? parsedReviews
        : 0;

      const payload = {
        rating_value: safeRating,
        review_count: safeReviews,
        review_source_url: currentSourceUrl || null,
        rating_visible: currentRatingVisible,
        resend_api_key: apiKey.trim() || undefined,
        notification_email: recipientEmail.trim() || null,
        email_notifications_enabled: enabled,
        email_subject_template: subjectTemplate.trim() || null,
        email_html_template: htmlTemplate.trim() || null,
      };

      const saved = await saveSiteSettings(payload, SITE_SETTINGS_API_URL);
      setHasExistingKey(Boolean(saved.has_resend_api_key));
      if (saved.resend_api_key) {
        setApiKey(saved.resend_api_key);
      }
      if (saved.notification_email) {
        setRecipientEmail(saved.notification_email);
      }
      if (saved.email_notifications_enabled !== undefined) {
        setEnabled(saved.email_notifications_enabled);
      }
      if (saved.email_subject_template) {
        setSubjectTemplate(saved.email_subject_template);
      }
      if (saved.email_html_template !== undefined) {
        setHtmlTemplate(saved.email_html_template || "");
      }
      toast.success("Email notification settings saved");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to save email settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSendTestEmail = async () => {
    if (!recipientEmail.trim()) {
      toast.error("Enter a recipient email to send a test email");
      return;
    }

    if (!hasExistingKey && !apiKey.trim()) {
      toast.error("Please enter a Resend API key before sending a test email");
      return;
    }

    setTesting(true);
    setTestSuccess(false);

    try {
      // Dispatch test email via neon-site-settings test_email action
      const result = await sendTestEmail(recipientEmail, apiKey.trim() || undefined);

      setTestSuccess(true);
      toast.success(result.message || "Test email sent! Check your inbox.");
    } catch (error: any) {
      console.warn("Test email failure:", error);
      toast.error(error.message || "Test email delivery failed");
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="md:col-span-2 border-primary/20 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle>Email Notifications (Resend.com)</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="email-notif-switch" className="text-sm cursor-pointer">
              {enabled ? "Active" : "Disabled"}
            </Label>
            <Switch
              id="email-notif-switch"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">
          Receive every new lead submitted from Google/Facebook ads and the website directly to your inbox using Resend.com.
        </p>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="resend-api-key">Resend API Key</Label>
            {hasExistingKey && (
              <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" /> API Key Configured
              </span>
            )}
          </div>
          <div className="relative">
            <Input
              id="resend-api-key"
              type={showKey ? "text" : "password"}
              placeholder={hasExistingKey ? "••••••••••••••••••••••••" : "re_123456789_abcdef..."}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10 font-mono text-sm"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Obtain from your <a href="https://resend.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary underline">Resend API Keys dashboard</a>. Begins with <code className="bg-muted px-1 rounded">re_</code>.
          </p>
        </div>

        <div>
          <Label htmlFor="notif-email">Lead Notification Recipient Email(s)</Label>
          <Input
            id="notif-email"
            type="text"
            placeholder="e.g. leads@amzadscout.com, founder@amzadscout.com"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Separate multiple recipient email addresses with commas.
          </p>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold flex items-center gap-1.5">
                <FileCode2 className="h-4 w-4 text-primary" /> Email Subject & Body Template
              </h4>
              <p className="text-xs text-muted-foreground">
                Customize how leads appear in your inbox. Use variable placeholders below.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSubjectTemplate("New Lead: {name} ({lead_number})");
                setHtmlTemplate("");
                toast.info("Reset to default email templates");
              }}
              className="text-xs h-7"
            >
              Reset to Default
            </Button>
          </div>

          <div className="flex flex-wrap gap-1.5 p-2.5 bg-muted/60 rounded-md border text-xs">
            <span className="text-muted-foreground font-medium mr-1 self-center">Available Tags:</span>
            {[
              "{name}", "{email}", "{phone}", "{company}", "{spend}", "{audit_type}",
              "{goals}", "{notes}", "{lead_number}", "{source}", "{website}", "{timestamp}"
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(tag);
                  toast.success(`Copied ${tag} to clipboard`);
                }}
                className="bg-background hover:bg-primary hover:text-primary-foreground border px-1.5 py-0.5 rounded font-mono text-[11px] transition-colors"
                title="Click to copy tag"
              >
                {tag}
              </button>
            ))}
          </div>

          <div>
            <Label htmlFor="subject-template">Email Subject Line</Label>
            <Input
              id="subject-template"
              type="text"
              placeholder="New Lead: {name} ({lead_number})"
              value={subjectTemplate}
              onChange={(e) => setSubjectTemplate(e.target.value)}
              className="font-medium text-sm mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Supports variables like <code className="bg-muted px-1 rounded">&#123;name&#125;</code>, <code className="bg-muted px-1 rounded">&#123;lead_number&#125;</code>, <code className="bg-muted px-1 rounded">&#123;company&#125;</code>.
            </p>
          </div>

          <div>
            <Label htmlFor="html-template">Custom Email HTML Body (Optional)</Label>
            <Textarea
              id="html-template"
              rows={6}
              placeholder="Leave empty to use the standard responsive clean lead card, or provide custom HTML/Text..."
              value={htmlTemplate}
              onChange={(e) => setHtmlTemplate(e.target.value)}
              className="font-mono text-xs mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave blank to use the built-in card layout, or paste custom HTML using the available tags.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Email Settings"}
          </Button>

          <Button
            variant="outline"
            onClick={handleSendTestEmail}
            disabled={testing || saving || loading || !recipientEmail}
            className="flex-1"
          >
            <Send className="h-4 w-4 mr-2" />
            {testing ? "Sending Test..." : "Send Test Lead Email"}
          </Button>
        </div>

        {testSuccess && (
          <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg text-xs text-green-800 dark:text-green-300 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
            <span>Test lead successfully delivered to Resend! Verify arrival in your inbox (or spam folder if domain DNS records are pending).</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

