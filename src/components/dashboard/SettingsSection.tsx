import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReviewsBadge } from "@/components/ReviewsBadge";
import { Save, Crop } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ReactCrop, { Crop as CropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  SITE_SETTINGS_API_URL,
  SiteSettingsRequestError,
  fetchSiteSettings,
  isValidReviewSourceUrl,
  saveSiteSettings,
  validateSiteSettingsInput,
  type SiteSettings,
} from "@/hooks/useSiteSettings";

export function SettingsSection() {
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

  const saveFooter = () => {
    localStorage.setItem("footer_email", footerData.email);
    localStorage.setItem("footer_address", footerData.address);
    toast.success("Footer settings saved");
  };

  const saveLogoSize = () => {
    const updatedData = {
      ...logoData,
      text: logoData.text || 'AMZ AD SCOUT',
      imageUrl: logoData.imageUrl || '/logo.png',
      faviconUrl: logoData.faviconUrl || '/favicon.png',
    };
    localStorage.setItem('logo_data', JSON.stringify(updatedData));
    window.dispatchEvent(new Event("logo-updated"));
    toast.success("Logo size updated successfully");
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

        <ReviewsSettingsCard />
      </div>
    </div>
  );
}

function formatLastSaved(updatedAt: string): string {
  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) return updatedAt;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

function ReviewsSettingsCard() {
  const [ratingValue, setRatingValue] = useState("0");
  const [reviewCount, setReviewCount] = useState("0");
  const [reviewSourceUrl, setReviewSourceUrl] = useState("");
  const [ratingVisible, setRatingVisible] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings(SITE_SETTINGS_API_URL)
      .then((data) => {
        if (cancelled) return;
        setRatingValue(String(data.rating_value));
        setReviewCount(String(data.review_count));
        setReviewSourceUrl(data.review_source_url ?? "");
        setRatingVisible(data.rating_visible);
        setUpdatedAt(data.updated_at);
        setLoadError(false);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const roundedRating = Number(Number(ratingValue).toFixed(1));
  const parsedCount = Number(reviewCount);
  const trimmedUrl = reviewSourceUrl.trim();
  const canEnable =
    ratingValue.trim() !== "" &&
    Number.isFinite(roundedRating) &&
    roundedRating > 0 &&
    roundedRating <= 5 &&
    reviewCount.trim() !== "" &&
    Number.isInteger(parsedCount) &&
    parsedCount > 0 &&
    isValidReviewSourceUrl(trimmedUrl);

  const ratingFieldError =
    ratingValue.trim() !== "" &&
    (!Number.isFinite(Number(ratingValue)) || Number(ratingValue) < 0 || Number(ratingValue) > 5)
      ? "Rating must be a number from 0 to 5."
      : null;
  const countFieldError =
    reviewCount.trim() !== "" &&
    (!Number.isInteger(parsedCount) || parsedCount < 0)
      ? "Number of reviews must be a whole number, 0 or more."
      : null;
  const urlFieldError =
    trimmedUrl !== "" && !isValidReviewSourceUrl(trimmedUrl)
      ? "Review source link must be an https URL of at most 500 characters."
      : null;

  const previewSettings: SiteSettings = {
    rating_value: Number.isFinite(roundedRating) ? roundedRating : 0,
    review_count: Number.isInteger(parsedCount) ? parsedCount : 0,
    review_source_url: trimmedUrl === "" ? null : trimmedUrl,
    rating_visible: ratingVisible,
    updated_at: updatedAt,
  };

  const applySaved = (saved: SiteSettings) => {
    setRatingValue(String(saved.rating_value));
    setReviewCount(String(saved.review_count));
    setReviewSourceUrl(saved.review_source_url ?? "");
    setRatingVisible(saved.rating_visible);
    setUpdatedAt(saved.updated_at);
    setLoadError(false);
  };

  const handleSave = async () => {
    setFormError(null);
    setErrorStatus(null);
    const parsed = validateSiteSettingsInput({
      ratingValue,
      reviewCount,
      reviewSourceUrl,
      ratingVisible,
    });
    if (parsed.ok === false) {
      setFormError(parsed.error);
      return;
    }

    setSaving(true);
    try {
      const saved = await saveSiteSettings(parsed.value, SITE_SETTINGS_API_URL);
      applySaved(saved);
      toast.success("Reviews saved");
    } catch (error) {
      if (error instanceof SiteSettingsRequestError) {
        setErrorStatus(error.status);
        setFormError(error.message);
      } else {
        setErrorStatus(0);
        setFormError("Couldn't save review settings");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loadError && (
          <p className="text-sm text-muted-foreground">Couldn't load review settings</p>
        )}
        <div>
          <Label htmlFor="rating-value">Rating</Label>
          <Input
            id="rating-value"
            type="number"
            min={0}
            max={5}
            step={0.1}
            inputMode="decimal"
            value={ratingValue}
            onChange={(event) => setRatingValue(event.target.value)}
          />
          {ratingFieldError && <p className="text-xs text-destructive mt-1">{ratingFieldError}</p>}
        </div>
        <div>
          <Label htmlFor="review-count">Number of reviews</Label>
          <Input
            id="review-count"
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            value={reviewCount}
            onChange={(event) => setReviewCount(event.target.value)}
          />
          {countFieldError && <p className="text-xs text-destructive mt-1">{countFieldError}</p>}
        </div>
        <div>
          <Label htmlFor="review-source-url">Review source link</Label>
          <Input
            id="review-source-url"
            type="url"
            inputMode="url"
            maxLength={500}
            placeholder="https://"
            value={reviewSourceUrl}
            onChange={(event) => setReviewSourceUrl(event.target.value)}
          />
          {urlFieldError && <p className="text-xs text-destructive mt-1">{urlFieldError}</p>}
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="rating-visible">Show badge on homepage</Label>
          <Switch
            id="rating-visible"
            checked={ratingVisible}
            disabled={!canEnable && !ratingVisible}
            aria-describedby={!canEnable ? "rating-visible-help" : undefined}
            onCheckedChange={(checked) => {
              if (checked && !canEnable) return;
              setRatingVisible(checked);
            }}
          />
        </div>
        {!canEnable && (
          <p id="rating-visible-help" className="text-xs text-muted-foreground">
            Enter a rating above 0, at least one review, and a valid https link before showing the badge.
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Only enter real reviews from a public profile (for example Google or Clutch). The badge links to that profile.
        </p>
        <div>
          <Label>Preview</Label>
          <div className="mt-2 flex min-h-11 items-center">
            <ReviewsBadge settings={previewSettings} className="my-0" />
          </div>
        </div>
        {updatedAt && (
          <p className="text-xs text-muted-foreground">Last saved {formatLastSaved(updatedAt)}</p>
        )}
        {formError && (
          <p role="alert" className="text-sm text-destructive">
            {formError}
            {errorStatus === 401 && (
              <>
                {" "}
                <Link to="/dashboard/login" className="underline font-medium">
                  Sign in
                </Link>
              </>
            )}
          </p>
        )}
        <Button onClick={handleSave} className="w-full" disabled={saving || loading}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Reviews"}
        </Button>
      </CardContent>
    </Card>
  );
}
