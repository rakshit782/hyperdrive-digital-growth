
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Edit, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface PartnerImage {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
}

const PartnerImagesTab = () => {
  const [partnerImages, setPartnerImages] = useState<PartnerImage[]>([]);
  const [editingPartner, setEditingPartner] = useState<PartnerImage | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    isActive: true
  });

  useEffect(() => {
    loadPartnerImages();
  }, []);

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

  const savePartnerImages = (images: PartnerImage[]) => {
    localStorage.setItem('partnerImages', JSON.stringify(images));
    setPartnerImages(images);
    
    // Dispatch event for footer component
    window.dispatchEvent(new CustomEvent('partnerImagesUpdated', { 
      detail: images 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.imageUrl.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingPartner) {
      // Update existing partner
      const updatedImages = partnerImages.map(img => 
        img.id === editingPartner.id 
          ? { ...editingPartner, ...formData }
          : img
      );
      savePartnerImages(updatedImages);
      toast.success("Partner image updated successfully");
    } else {
      // Add new partner
      const newPartner: PartnerImage = {
        id: `partner-${Date.now()}`,
        ...formData
      };
      savePartnerImages([...partnerImages, newPartner]);
      toast.success("Partner image added successfully");
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      imageUrl: "",
      isActive: true
    });
    setEditingPartner(null);
  };

  const handleEdit = (partner: PartnerImage) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      imageUrl: partner.imageUrl,
      isActive: partner.isActive
    });
  };

  const handleDelete = (id: string) => {
    const updatedImages = partnerImages.filter(img => img.id !== id);
    savePartnerImages(updatedImages);
    toast.success("Partner image deleted successfully");
  };

  const toggleActive = (id: string) => {
    const updatedImages = partnerImages.map(img => 
      img.id === id ? { ...img, isActive: !img.isActive } : img
    );
    savePartnerImages(updatedImages);
    toast.success("Partner image status updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Partner Images</h2>
        <p className="text-gray-600">Manage authorized partner images displayed in the footer</p>
      </div>

      {/* Add/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingPartner ? 'Edit Partner Image' : 'Add Partner Image'}</CardTitle>
          <CardDescription>
            Add logos or images of your authorized partners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Partner Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Partner company name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL *</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/logo.png"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="isActive">Display on website</Label>
            </div>

            <div className="flex space-x-2">
              <Button type="submit">
                {editingPartner ? 'Update Partner' : 'Add Partner'}
              </Button>
              {editingPartner && (
                <Button type="button" variant="outline" onClick={resetForm}>
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
          <CardTitle>Current Partner Images ({partnerImages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {partnerImages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No partner images added yet</p>
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
                      onClick={() => toggleActive(partner.id)}
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
                      onClick={() => handleEdit(partner)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(partner.id)}
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
    </div>
  );
};

export default PartnerImagesTab;
