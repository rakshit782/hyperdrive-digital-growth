
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Upload, Eye, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ServiceHeaderImage {
  serviceKey: string;
  serviceName: string;
  imageUrl: string;
  altText: string;
}

const defaultImages: ServiceHeaderImage[] = [
  {
    serviceKey: "amazon-advertising",
    serviceName: "Amazon Advertising",
    imageUrl: "https://images.unsplash.com/photo-1523474438810-b04a6f72e20f?w=600&h=400&fit=crop&crop=center",
    altText: "Amazon Packages and Logistics"
  },
  {
    serviceKey: "walmart-advertising", 
    serviceName: "Walmart Advertising",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
    altText: "Walmart Store and Shopping Experience"
  },
  {
    serviceKey: "google-advertising",
    serviceName: "Google Advertising", 
    imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop&crop=center",
    altText: "Google Search and Digital Marketing"
  },
  {
    serviceKey: "meta-advertising",
    serviceName: "Meta Advertising",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop&crop=center", 
    altText: "Social Media Marketing and Meta Platforms"
  },
  {
    serviceKey: "website-development",
    serviceName: "Website Development",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=center",
    altText: "Web Development and Programming"
  },
  {
    serviceKey: "account-management",
    serviceName: "Account Management", 
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center",
    altText: "Professional Account Management Services"
  },
  {
    serviceKey: "shopify-development",
    serviceName: "Shopify Development",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
    altText: "E-commerce and Shopify Development"
  },
  {
    serviceKey: "shopify-integration", 
    serviceName: "Shopify Integration",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center",
    altText: "Shopify Integration and Platform Connections"
  }
];

const ServiceHeaderImagesTab = () => {
  const [images, setImages] = useState<ServiceHeaderImage[]>(defaultImages);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [tempAltText, setTempAltText] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedImages = localStorage.getItem('serviceHeaderImages');
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages);
        setImages(parsedImages);
      } catch (error) {
        console.error("Error loading service header images:", error);
      }
    }
  };

  const saveSettings = () => {
    localStorage.setItem('serviceHeaderImages', JSON.stringify(images));
    
    // Dispatch event to update service pages
    window.dispatchEvent(new CustomEvent('serviceHeaderImagesUpdated', { detail: images }));
    
    toast({
      title: "Images Updated",
      description: "Service header images have been updated successfully.",
    });
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setTempImageUrl(images[index].imageUrl);
    setTempAltText(images[index].altText);
  };

  const handleSave = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = {
      ...updatedImages[index],
      imageUrl: tempImageUrl,
      altText: tempAltText
    };
    setImages(updatedImages);
    setEditingIndex(null);
    setTempImageUrl("");
    setTempAltText("");
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setTempImageUrl("");
    setTempAltText("");
  };

  const handleReset = (index: number) => {
    const updatedImages = [...images];
    const defaultImage = defaultImages.find(img => img.serviceKey === images[index].serviceKey);
    if (defaultImage) {
      updatedImages[index] = { ...defaultImage };
      setImages(updatedImages);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a blob URL for the uploaded file (local only)
      const imageUrl = URL.createObjectURL(file);
      setTempImageUrl(imageUrl);
      
      toast({
        title: "Image Selected",
        description: "Image has been selected. Click Save to apply changes.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🖼️ Service Header Images
          </CardTitle>
          <CardDescription>
            Manage header images for all service pages. These images appear in the hero section of each service page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Configure images for {images.length} service pages
                </p>
              </div>
              
              <Button onClick={saveSettings} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </Button>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((image, index) => (
                <Card key={image.serviceKey} className="relative overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={image.imageUrl}
                      alt={image.altText}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-white/90 text-slate-800">
                        {image.serviceName}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    {editingIndex === index ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`url-${index}`} className="text-sm font-medium">
                            Image URL
                          </Label>
                          <Input
                            id={`url-${index}`}
                            value={tempImageUrl}
                            onChange={(e) => setTempImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`file-${index}`} className="text-sm font-medium">
                            Or Upload File
                          </Label>
                          <Input
                            id={`file-${index}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, index)}
                            className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`alt-${index}`} className="text-sm font-medium">
                            Alt Text
                          </Label>
                          <Input
                            id={`alt-${index}`}
                            value={tempAltText}
                            onChange={(e) => setTempAltText(e.target.value)}
                            placeholder="Describe the image"
                            className="mt-1"
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSave(index)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancel}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2 truncate">
                          {image.altText}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleEdit(index)}
                            className="flex-1"
                          >
                            <Upload className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(image.imageUrl, '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReset(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceHeaderImagesTab;
