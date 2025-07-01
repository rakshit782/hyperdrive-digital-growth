
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Upload, Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface BackgroundImage {
  url: string;
  alt: string;
}

interface HeroSliderSettings {
  backgroundImages: BackgroundImage[];
}

const HeroSliderTab = () => {
  const [settings, setSettings] = useState<HeroSliderSettings>({
    backgroundImages: []
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      url: "",
      alt: "",
      file: null as File | null
    }
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('heroSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        if (parsedSettings.backgroundImages) {
          setSettings({ backgroundImages: parsedSettings.backgroundImages });
        }
      } catch (error) {
        console.error("Error loading hero slider settings:", error);
      }
    }
  };

  const saveSettings = (newSettings: HeroSliderSettings) => {
    const existingSettings = JSON.parse(localStorage.getItem('heroSettings') || '{}');
    const updatedSettings = {
      ...existingSettings,
      backgroundImages: newSettings.backgroundImages
    };
    
    localStorage.setItem('heroSettings', JSON.stringify(updatedSettings));
    setSettings(newSettings);
    
    // Dispatch event to update the hero component
    window.dispatchEvent(new CustomEvent('heroSettingsUpdated', { detail: updatedSettings }));
    
    toast({
      title: "Settings Updated",
      description: "Hero slider images have been updated successfully.",
    });
  };

  const handleAddImage = async (data: any) => {
    try {
      let imageUrl = data.url;
      
      // If a file is uploaded, create a local URL (for demo purposes)
      if (data.file) {
        setUploading(true);
        // Create a blob URL for the uploaded file (local only)
        imageUrl = URL.createObjectURL(data.file);
        
        toast({
          title: "Image Added",
          description: "Image has been added locally. Note: For production, configure a file storage service.",
        });
      }

      if (!imageUrl) {
        toast({
          title: "No Image",
          description: "Please provide either a URL or upload a file.",
          variant: "destructive"
        });
        return;
      }

      const newImage: BackgroundImage = {
        url: imageUrl,
        alt: data.alt || "Hero background image"
      };

      const newSettings = {
        backgroundImages: [...settings.backgroundImages, newImage]
      };

      saveSettings(newSettings);
      setIsDialogOpen(false);
      form.reset();
      setPreviewImage(null);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add image to slider.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newSettings = {
      backgroundImages: settings.backgroundImages.filter((_, i) => i !== index)
    };
    saveSettings(newSettings);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("file", file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🖼️ Hero Slider Images
          </CardTitle>
          <CardDescription>
            Manage background images for the hero section slider. Images should be high-quality, abstract, and professional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Current images: {settings.backgroundImages.length}
                </p>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Background Image</DialogTitle>
                    <DialogDescription>
                      Add a new background image to the hero slider.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddImage)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upload Image</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {previewImage && (
                                  <div className="relative w-full h-32 rounded-lg overflow-hidden">
                                    <img
                                      src={previewImage}
                                      alt="Preview"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormDescription>
                              Upload a high-quality image (WebP, JPG, PNG) - stored locally
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="text-center text-sm text-muted-foreground">OR</div>
                      
                      <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://example.com/image.jpg"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter a direct URL to an image
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="alt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alt Text</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Describe the image"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Accessibility description for the image
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex gap-2">
                        <Button type="submit" disabled={uploading} className="flex-1">
                          {uploading ? (
                            <>
                              <Upload className="w-4 h-4 mr-2 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Image
                            </>
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsDialogOpen(false);
                            form.reset();
                            setPreviewImage(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {settings.backgroundImages.map((image, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => window.open(image.url, '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground truncate">
                      {image.alt}
                    </p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Slide {index + 1}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
              
              {settings.backgroundImages.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No background images added yet.</p>
                  <p className="text-sm">Add your first image to get started.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroSliderTab;
