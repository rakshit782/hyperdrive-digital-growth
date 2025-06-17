
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Edit, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface FooterSettings {
  companyName: string;
  companyDescription: string;
  copyrightText: string;
  newsletterTitle: string;
  newsletterDescription: string;
  partnersTitle: string;
  showPartners: boolean;
  showNewsletter: boolean;
}

interface PartnerImage {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
}

const FooterManagementTab = () => {
  const [footerSettings, setFooterSettings] = useState<FooterSettings>({
    companyName: "Your Agency",
    companyDescription: "Driving digital growth through strategic advertising across Amazon, Walmart, Meta, and beyond. Your success is our mission.",
    copyrightText: "Your Agency. All rights reserved.",
    newsletterTitle: "Stay Updated",
    newsletterDescription: "Get the latest insights, tips, and strategies delivered to your inbox.",
    partnersTitle: "Authorized Partners",
    showPartners: true,
    showNewsletter: true,
  });

  const [partnerImages, setPartnerImages] = useState<PartnerImage[]>([]);
  const [editingPartner, setEditingPartner] = useState<PartnerImage | null>(null);
  const [partnerFormData, setPartnerFormData] = useState({
    name: "",
    imageUrl: "",
    isActive: true
  });

  useEffect(() => {
    loadFooterSettings();
    loadPartnerImages();
  }, []);

  const loadFooterSettings = () => {
    const saved = localStorage.getItem('footerSettings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFooterSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse footer settings:', error);
      }
    }
  };

  const loadPartnerImages = () => {
    const saved = localStorage.getItem('partnerImages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPartnerImages(parsed);
      } catch (error) {
        console.error('Failed to parse partner images:', error);
      }
    }
  };

  const saveFooterSettings = () => {
    localStorage.setItem('footerSettings', JSON.stringify(footerSettings));
    
    // Dispatch event for footer component
    window.dispatchEvent(new CustomEvent('footerSettingsUpdated', { 
      detail: footerSettings 
    }));
    
    toast.success("Footer settings updated successfully");
  };

  const savePartnerImages = (images: PartnerImage[]) => {
    localStorage.setItem('partnerImages', JSON.stringify(images));
    setPartnerImages(images);
    
    // Dispatch event for footer component
    window.dispatchEvent(new CustomEvent('partnerImagesUpdated', { 
      detail: images 
    }));
  };

  const handleInputChange = (field: keyof FooterSettings, value: string | boolean) => {
    setFooterSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!partnerFormData.name.trim() || !partnerFormData.imageUrl.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingPartner) {
      // Update existing partner
      const updatedImages = partnerImages.map(img => 
        img.id === editingPartner.id 
          ? { ...editingPartner, ...partnerFormData }
          : img
      );
      savePartnerImages(updatedImages);
      toast.success("Partner image updated successfully");
    } else {
      // Add new partner
      const newPartner: PartnerImage = {
        id: `partner-${Date.now()}`,
        ...partnerFormData
      };
      savePartnerImages([...partnerImages, newPartner]);
      toast.success("Partner image added successfully");
    }

    resetPartnerForm();
  };

  const resetPartnerForm = () => {
    setPartnerFormData({
      name: "",
      imageUrl: "",
      isActive: true
    });
    setEditingPartner(null);
  };

  const handleEditPartner = (partner: PartnerImage) => {
    setEditingPartner(partner);
    setPartnerFormData({
      name: partner.name,
      imageUrl: partner.imageUrl,
      isActive: partner.isActive
    });
  };

  const handleDeletePartner = (id: string) => {
    const updatedImages = partnerImages.filter(img => img.id !== id);
    savePartnerImages(updatedImages);
    toast.success("Partner image deleted successfully");
  };

  const togglePartnerActive = (id: string) => {
    const updatedImages = partnerImages.map(img => 
      img.id === id ? { ...img, isActive: !img.isActive } : img
    );
    savePartnerImages(updatedImages);
    toast.success("Partner image status updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Footer Management</h2>
        <p className="text-gray-600">Customize your website footer content, appearance, and partner logos</p>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="partners">Partner Logos</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Update your company details displayed in the footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={footerSettings.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Your Company Name"
                />
              </div>
              
              <div>
                <Label htmlFor="companyDescription">Company Description</Label>
                <Textarea
                  id="companyDescription"
                  value={footerSettings.companyDescription}
                  onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                  placeholder="Brief description of your company"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="copyrightText">Copyright Text</Label>
                <Input
                  id="copyrightText"
                  value={footerSettings.copyrightText}
                  onChange={(e) => handleInputChange('copyrightText', e.target.value)}
                  placeholder="Copyright text (without year and ©)"
                />
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Section */}
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Section</CardTitle>
              <CardDescription>
                Customize your newsletter signup section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="newsletterTitle">Newsletter Title</Label>
                <Input
                  id="newsletterTitle"
                  value={footerSettings.newsletterTitle}
                  onChange={(e) => handleInputChange('newsletterTitle', e.target.value)}
                  placeholder="Newsletter section title"
                />
              </div>
              
              <div>
                <Label htmlFor="newsletterDescription">Newsletter Description</Label>
                <Textarea
                  id="newsletterDescription"
                  value={footerSettings.newsletterDescription}
                  onChange={(e) => handleInputChange('newsletterDescription', e.target.value)}
                  placeholder="Description for newsletter signup"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Partners Section */}
          <Card>
            <CardHeader>
              <CardTitle>Partners Section</CardTitle>
              <CardDescription>
                Configure the authorized partners section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="partnersTitle">Partners Section Title</Label>
                <Input
                  id="partnersTitle"
                  value={footerSettings.partnersTitle}
                  onChange={(e) => handleInputChange('partnersTitle', e.target.value)}
                  placeholder="Partners section title"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6">
          {/* Add/Edit Partner Form */}
          <Card>
            <CardHeader>
              <CardTitle>{editingPartner ? 'Edit Partner Logo' : 'Add Partner Logo'}</CardTitle>
              <CardDescription>
                Add logos or images of your authorized partners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="partnerName">Partner Name *</Label>
                    <Input
                      id="partnerName"
                      value={partnerFormData.name}
                      onChange={(e) => setPartnerFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Partner company name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="partnerImageUrl">Image URL *</Label>
                    <Input
                      id="partnerImageUrl"
                      value={partnerFormData.imageUrl}
                      onChange={(e) => setPartnerFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="https://example.com/logo.png"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="partnerIsActive"
                    checked={partnerFormData.isActive}
                    onCheckedChange={(checked) => setPartnerFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="partnerIsActive">Display on website</Label>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit">
                    {editingPartner ? 'Update Partner' : 'Add Partner'}
                  </Button>
                  {editingPartner && (
                    <Button type="button" variant="outline" onClick={resetPartnerForm}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Partner Images List */}
          <Card>
            <CardHeader>
              <CardTitle>Current Partner Logos ({partnerImages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {partnerImages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No partner logos added yet</p>
              ) : (
                <div className="grid gap-4">
                  {partnerImages.map((partner) => (
                    <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={partner.imageUrl} 
                          alt={partner.name}
                          className="h-12 w-auto object-contain bg-gray-50 rounded p-1"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                        <div>
                          <h3 className="font-medium">{partner.name}</h3>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {partner.imageUrl}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePartnerActive(partner.id)}
                        >
                          {partner.isActive ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPartner(partner)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePartner(partner.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Visibility</CardTitle>
              <CardDescription>
                Control which sections are displayed in your footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showNewsletter" className="text-base font-medium">
                    Newsletter Signup
                  </Label>
                  <p className="text-sm text-gray-500">Display newsletter subscription section</p>
                </div>
                <Switch
                  id="showNewsletter"
                  checked={footerSettings.showNewsletter}
                  onCheckedChange={(checked) => handleInputChange('showNewsletter', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showPartners" className="text-base font-medium">
                    Partner Logos
                  </Label>
                  <p className="text-sm text-gray-500">Display authorized partner images</p>
                </div>
                <Switch
                  id="showPartners"
                  checked={footerSettings.showPartners}
                  onCheckedChange={(checked) => handleInputChange('showPartners', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Footer Preview</CardTitle>
              <CardDescription>
                Preview how your footer will look with current settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 text-white p-8 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Company Info Preview */}
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                      {footerSettings.companyName}
                    </h3>
                    <p className="text-slate-300 mb-4 text-sm">
                      {footerSettings.companyDescription}
                    </p>
                  </div>

                  {/* Newsletter Preview */}
                  {footerSettings.showNewsletter && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{footerSettings.newsletterTitle}</h4>
                      <p className="text-slate-300 mb-4 text-sm">
                        {footerSettings.newsletterDescription}
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400 text-sm"
                          readOnly
                        />
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded text-sm">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Partners Preview */}
                {footerSettings.showPartners && (
                  <div className="mt-8 pt-8 border-t border-slate-700">
                    <h4 className="text-center text-lg font-semibold mb-4">{footerSettings.partnersTitle}</h4>
                    <div className="flex justify-center items-center gap-6">
                      {partnerImages.filter(p => p.isActive).slice(0, 4).map((partner) => (
                        <img
                          key={partner.id}
                          src={partner.imageUrl}
                          alt={partner.name}
                          className="h-8 w-auto object-contain opacity-70"
                        />
                      ))}
                      {partnerImages.filter(p => p.isActive).length === 0 && (
                        <>
                          <div className="w-16 h-8 bg-slate-700 rounded flex items-center justify-center text-xs">
                            Logo 1
                          </div>
                          <div className="w-16 h-8 bg-slate-700 rounded flex items-center justify-center text-xs">
                            Logo 2
                          </div>
                          <div className="w-16 h-8 bg-slate-700 rounded flex items-center justify-center text-xs">
                            Logo 3
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Copyright Preview */}
                <div className="mt-8 pt-8 border-t border-slate-700 text-center">
                  <p className="text-slate-400 text-sm">
                    © {new Date().getFullYear()} {footerSettings.copyrightText}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={saveFooterSettings} className="bg-blue-600 hover:bg-blue-700">
          Save Footer Settings
        </Button>
      </div>
    </div>
  );
};

export default FooterManagementTab;
