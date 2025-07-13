
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Users, Upload, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PartnerImage {
  id: string;
  name: string;
  image_url: string;
  is_active: boolean;
  sort_order?: number;
}

const PartnersManagementTab = () => {
  const { toast } = useToast();
  const [partnerImages, setPartnerImages] = useState<PartnerImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPartnerImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('partner_images')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setPartnerImages(data || []);
    } catch (error) {
      console.error('Error fetching partner images:', error);
      toast({
        title: "Error",
        description: "Failed to load partner images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerImages();
  }, []);

  const convertGoogleDriveUrl = (url: string) => {
    const cleanUrl = url.trim();
    let fileId = '';
    
    let match = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      fileId = match[1];
    } else {
      match = cleanUrl.match(/[?&]id=([a-zA-Z0-9-_]+)/);
      if (match) {
        fileId = match[1];
      }
    }
    
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    
    return cleanUrl;
  };

  const handleGoogleDriveUpload = async (id: string, inputElement: HTMLInputElement) => {
    const googleDriveUrl = inputElement.value.trim();
    if (googleDriveUrl) {
      const directUrl = convertGoogleDriveUrl(googleDriveUrl);
      await updatePartnerImage(id, 'image_url', directUrl);
      inputElement.value = '';
      toast({
        title: "Success",
        description: "Google Drive image URL converted successfully!",
      });
    }
  };

  const addPartnerImage = async () => {
    try {
      const { error } = await supabase
        .from('partner_images')
        .insert([{
          name: "New Partner",
          image_url: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center",
          is_active: true,
          sort_order: partnerImages.length
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Partner image added successfully!",
      });

      await fetchPartnerImages();
    } catch (error) {
      console.error('Error adding partner image:', error);
      toast({
        title: "Error",
        description: "Failed to add partner image",
        variant: "destructive",
      });
    }
  };

  const removePartnerImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('partner_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Partner image deleted successfully!",
      });

      await fetchPartnerImages();
    } catch (error) {
      console.error('Error deleting partner image:', error);
      toast({
        title: "Error",
        description: "Failed to delete partner image",
        variant: "destructive",
      });
    }
  };

  const updatePartnerImage = async (id: string, field: keyof PartnerImage, value: string | boolean) => {
    try {
      const { error } = await supabase
        .from('partner_images')
        .update({ [field]: value })
        .eq('id', id);

      if (error) throw error;

      await fetchPartnerImages();
    } catch (error) {
      console.error('Error updating partner image:', error);
      toast({
        title: "Error",
        description: "Failed to update partner image",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-slate-500 to-slate-700 rounded-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Authorized Partners</h2>
            <p className="text-gray-600">Manage authorized partner logos (shown inverted on dark background)</p>
          </div>
        </div>
        <Button onClick={addPartnerImage} className="bg-gradient-to-r from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800">
          <Plus className="w-4 h-4 mr-2" />
          Add Partner Logo
        </Button>
      </div>

      <div className="grid gap-4">
        {partnerImages.map((partner, index) => (
          <Card key={partner.id} className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900">Partner {index + 1}</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Label className="text-sm text-gray-600">Active:</Label>
                    <input
                      type="checkbox"
                      checked={partner.is_active}
                      onChange={(e) => updatePartnerImage(partner.id, 'is_active', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                  <Button 
                    onClick={() => removePartnerImage(partner.id)} 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Partner Name</Label>
                  <Input
                    value={partner.name}
                    onChange={(e) => updatePartnerImage(partner.id, 'name', e.target.value)}
                    placeholder="Partner Name"
                    className="bg-white/70 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    onBlur={(e) => updatePartnerImage(partner.id, 'name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Logo URL</Label>
                  <Input
                    value={partner.image_url}
                    onChange={(e) => updatePartnerImage(partner.id, 'image_url', e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="bg-white/70 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    onBlur={(e) => updatePartnerImage(partner.id, 'image_url', e.target.value)}
                  />
                </div>
              </div>

              {/* Google Drive Upload Section */}
              <div className="mt-4 space-y-4 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-slate-200/30">
                <div className="flex items-center">
                  <Upload className="w-5 h-5 mr-3 text-slate-600" />
                  <Label className="text-sm font-semibold text-slate-700">Upload from Google Drive</Label>
                </div>
                <div className="space-y-3">
                  <Input
                    id={`gdrive-input-${partner.id}`}
                    placeholder="Paste Google Drive sharing link here..."
                    className="bg-white/80 border-slate-200/50"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleGoogleDriveUpload(partner.id, e.currentTarget);
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      const input = document.getElementById(`gdrive-input-${partner.id}`) as HTMLInputElement;
                      if (input) {
                        handleGoogleDriveUpload(partner.id, input);
                      }
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    Use Google Drive Image
                  </Button>
                </div>
              </div>
              
              {partner.image_url && (
                <div className="mt-4 flex justify-center">
                  <div className="p-3 bg-slate-800 rounded-lg border border-gray-200 shadow-sm">
                    <img
                      src={partner.image_url}
                      alt={partner.name}
                      className="h-12 w-auto object-contain filter brightness-0 invert"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAzMkg4MFY0OEg0MFYzMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {partnerImages.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Partners Yet</h3>
            <p className="text-gray-600 mb-4">Add your first partner logo to get started.</p>
            <Button onClick={addPartnerImage}>
              <Plus className="w-4 h-4 mr-2" />
              Add Partner Logo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PartnersManagementTab;
