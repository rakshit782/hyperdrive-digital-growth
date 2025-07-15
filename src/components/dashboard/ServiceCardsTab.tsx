
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ServiceCard {
  id?: string;
  service_type: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
  gradient?: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

const ServiceCardsTab = () => {
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceCard | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newService, setNewService] = useState({
    service_type: "",
    title: "",
    description: "",
    features: [""],
    icon: "💼",
    gradient: "from-blue-500 to-purple-600",
    sort_order: 0,
    is_active: true
  });
  const { toast } = useToast();

  const gradientOptions = [
    { value: "from-blue-500 to-purple-600", label: "Blue to Purple", preview: "bg-gradient-to-r from-blue-500 to-purple-600" },
    { value: "from-green-400 to-blue-500", label: "Green to Blue", preview: "bg-gradient-to-r from-green-400 to-blue-500" },
    { value: "from-pink-500 to-rose-500", label: "Pink to Rose", preview: "bg-gradient-to-r from-pink-500 to-rose-500" },
    { value: "from-yellow-400 to-orange-500", label: "Yellow to Orange", preview: "bg-gradient-to-r from-yellow-400 to-orange-500" },
    { value: "from-indigo-500 to-purple-600", label: "Indigo to Purple", preview: "bg-gradient-to-r from-indigo-500 to-purple-600" },
    { value: "from-teal-400 to-cyan-500", label: "Teal to Cyan", preview: "bg-gradient-to-r from-teal-400 to-cyan-500" }
  ];

  const iconOptions = ["💼", "🚀", "⚡", "🎯", "💡", "🔧", "📊", "🌟", "🏆", "🎨"];

  const serviceTypes = [
    'meta-advertising',
    'amazon-advertising',
    'google-advertising',
    'walmart-advertising',
    'account-management',
    'website-development',
    'shopify-development',
    'shopify-integration'
  ];

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('service_cards')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      // Convert features from JSON to string array
      const servicesWithFeatures = (data || []).map(service => ({
        ...service,
        features: Array.isArray(service.features) ? service.features as string[] : []
      }));
      
      setServices(servicesWithFeatures);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to load service cards.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service: ServiceCard) => {
    setEditingService({ ...service });
  };

  const handleSaveEdit = async () => {
    if (!editingService) return;
    
    if (!editingService.title.trim() || !editingService.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in title and description.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('service_cards')
        .update({
          service_type: editingService.service_type,
          title: editingService.title,
          description: editingService.description,
          features: editingService.features,
          icon: editingService.icon,
          gradient: editingService.gradient,
          sort_order: editingService.sort_order,
          is_active: editingService.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingService.id);

      if (error) throw error;

      await fetchServices();
      setEditingService(null);
      
      toast({
        title: "Service Updated",
        description: "Service has been updated successfully."
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error",
        description: "Failed to update service.",
        variant: "destructive"
      });
    }
  };

  const handleAddNew = async () => {
    if (!newService.title.trim() || !newService.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in title and description.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('service_cards')
        .insert({
          service_type: newService.service_type,
          title: newService.title.trim(),
          description: newService.description.trim(),
          features: newService.features.filter(f => f.trim() !== ""),
          icon: newService.icon,
          gradient: newService.gradient,
          sort_order: newService.sort_order,
          is_active: newService.is_active
        });

      if (error) throw error;

      await fetchServices();
      setNewService({
        service_type: "",
        title: "",
        description: "",
        features: [""],
        icon: "💼",
        gradient: "from-blue-500 to-purple-600",
        sort_order: 0,
        is_active: true
      });
      setIsAddingNew(false);
      
      toast({
        title: "Service Added",
        description: "New service has been added successfully."
      });
    } catch (error) {
      console.error('Error adding service:', error);
      toast({
        title: "Error",
        description: "Failed to add service.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('service_cards')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchServices();
      toast({
        title: "Service Deleted",
        description: "Service has been removed successfully.",
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service.",
        variant: "destructive"
      });
    }
  };

  const updateFeatures = (features: string, isEditing = false) => {
    const featuresArray = features.split('\n').filter(f => f.trim() !== '');
    if (isEditing && editingService) {
      setEditingService({ ...editingService, features: featuresArray });
    } else {
      setNewService({ ...newService, features: featuresArray });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">Service Cards Management</CardTitle>
              <CardDescription>
                Manage your service cards displayed on the homepage
              </CardDescription>
            </div>
            <Button 
              onClick={() => setIsAddingNew(true)} 
              disabled={isAddingNew}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Add New Service Form */}
          {isAddingNew && (
            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Add New Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-service-type">Service Type</Label>
                    <select
                      id="new-service-type"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                      value={newService.service_type}
                      onChange={(e) => setNewService({ ...newService, service_type: e.target.value })}
                    >
                      <option value="">Select service type</option>
                      {serviceTypes.map(type => (
                        <option key={type} value={type}>
                          {type.replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="new-title">Service Title</Label>
                    <Input
                      id="new-title"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      placeholder="Amazon PPC Management"
                      className="bg-white/80"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="new-description">Description</Label>
                  <Textarea
                    id="new-description"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="Professional Amazon PPC management to maximize your ROI..."
                    rows={3}
                    className="bg-white/80"
                  />
                </div>

                <div>
                  <Label htmlFor="new-features">Features (one per line)</Label>
                  <Textarea
                    id="new-features"
                    value={newService.features.join('\n')}
                    onChange={(e) => updateFeatures(e.target.value)}
                    placeholder="Campaign optimization&#10;Keyword research&#10;Performance monitoring"
                    rows={4}
                    className="bg-white/80"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleAddNew} className="bg-gradient-to-r from-green-600 to-emerald-600">
                    <Save className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Services Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm">
                {editingService?.id === service.id ? (
                  // Edit Mode
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <Label>Service Type</Label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                        value={editingService.service_type}
                        onChange={(e) => setEditingService({ ...editingService, service_type: e.target.value })}
                      >
                        <option value="">Select service type</option>
                        {serviceTypes.map(type => (
                          <option key={type} value={type}>
                            {type.replace('-', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label>Service Title</Label>
                      <Input
                        value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        className="bg-white/80"
                      />
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={editingService.description}
                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                        rows={3}
                        className="bg-white/80"
                      />
                    </div>

                    <div>
                      <Label>Features (one per line)</Label>
                      <Textarea
                        value={editingService.features.join('\n')}
                        onChange={(e) => updateFeatures(e.target.value, true)}
                        rows={4}
                        className="bg-white/80"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSaveEdit} className="bg-gradient-to-r from-green-600 to-emerald-600">
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingService(null)}>
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                ) : (
                  // Display Mode
                  <>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${service.gradient || 'from-blue-500 to-purple-600'} text-white shadow-lg`}>
                          <span className="text-2xl">{service.icon || '💼'}</span>
                        </div>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(service)}
                            className="w-8 h-8 p-0 bg-white/80 hover:bg-white"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(service.id!)}
                            className="w-8 h-8 p-0 bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <CardTitle className="text-lg font-bold text-slate-900">{service.title}</CardTitle>
                        <CardDescription className="text-sm text-slate-600 leading-relaxed">
                          {service.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-700">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 text-xs text-gray-500">
                        <span>Service Type: {service.service_type}</span>
                        <span className={`ml-2 px-2 py-1 rounded ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {service.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceCardsTab;
