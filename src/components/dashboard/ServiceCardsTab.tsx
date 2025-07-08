
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ServiceCard } from "@/types/dashboard";

interface ServiceCardsTabProps {
  services: ServiceCard[];
  updateServices: (services: ServiceCard[]) => void;
}

const ServiceCardsTab = ({ services, updateServices }: ServiceCardsTabProps) => {
  const [editingService, setEditingService] = useState<ServiceCard | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    features: [""],
    icon: "💼",
    gradient: "from-blue-500 to-purple-600"
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

  const handleSave = () => {
    toast({
      title: "Services Updated",
      description: "Service cards have been updated successfully.",
    });
  };

  const handleEdit = (service: ServiceCard) => {
    setEditingService({ ...service });
  };

  const handleSaveEdit = () => {
    if (!editingService) return;
    
    if (!editingService.title.trim() || !editingService.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in title and description.",
        variant: "destructive"
      });
      return;
    }

    const updatedServices = services.map(s => 
      s.id === editingService.id ? editingService : s
    );
    updateServices(updatedServices);
    setEditingService(null);
    
    toast({
      title: "Service Updated",
      description: "Service has been updated successfully."
    });
  };

  const handleAddNew = () => {
    if (!newService.title.trim() || !newService.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in title and description.",
        variant: "destructive"
      });
      return;
    }

    const service: ServiceCard = {
      id: `service-${Date.now()}`,
      title: newService.title.trim(),
      description: newService.description.trim(),
      features: newService.features.filter(f => f.trim() !== ""),
      icon: newService.icon,
      gradient: newService.gradient
    };

    updateServices([...services, service]);
    setNewService({
      title: "",
      description: "",
      features: [""],
      icon: "💼",
      gradient: "from-blue-500 to-purple-600"
    });
    setIsAddingNew(false);
    
    toast({
      title: "Service Added",
      description: "New service has been added successfully."
    });
  };

  const handleDelete = (id: string) => {
    const updatedServices = services.filter(s => s.id !== id);
    updateServices(updatedServices);
    toast({
      title: "Service Deleted",
      description: "Service has been removed successfully.",
    });
  };

  const updateFeatures = (features: string, isEditing = false) => {
    const featuresArray = features.split('\n').filter(f => f.trim() !== '');
    if (isEditing && editingService) {
      setEditingService({ ...editingService, features: featuresArray });
    } else {
      setNewService({ ...newService, features: featuresArray });
    }
  };

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
                    <Label htmlFor="new-title">Service Title</Label>
                    <Input
                      id="new-title"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      placeholder="Amazon PPC Management"
                      className="bg-white/80"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="new-icon">Icon</Label>
                    <div className="flex gap-2 flex-wrap">
                      {iconOptions.map(icon => (
                        <Button
                          key={icon}
                          type="button"
                          variant={newService.icon === icon ? "default" : "outline"}
                          size="sm"
                          onClick={() => setNewService({ ...newService, icon })}
                          className="text-lg w-10 h-10 p-0"
                        >
                          {icon}
                        </Button>
                      ))}
                    </div>
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

                <div>
                  <Label>Gradient Background</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {gradientOptions.map(option => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={newService.gradient === option.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewService({ ...newService, gradient: option.value })}
                        className="justify-start"
                      >
                        <div className={`w-4 h-4 rounded mr-2 ${option.preview}`}></div>
                        {option.label}
                      </Button>
                    ))}
                  </div>
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
                      <Label>Service Title</Label>
                      <Input
                        value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        className="bg-white/80"
                      />
                    </div>
                    
                    <div>
                      <Label>Icon</Label>
                      <div className="flex gap-2 flex-wrap">
                        {iconOptions.map(icon => (
                          <Button
                            key={icon}
                            type="button"
                            variant={editingService.icon === icon ? "default" : "outline"}
                            size="sm"
                            onClick={() => setEditingService({ ...editingService, icon })}
                            className="text-lg w-8 h-8 p-0"
                          >
                            {icon}
                          </Button>
                        ))}
                      </div>
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

                    <div>
                      <Label>Gradient</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {gradientOptions.map(option => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={editingService.gradient === option.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setEditingService({ ...editingService, gradient: option.value })}
                            className="justify-start text-xs"
                          >
                            <div className={`w-3 h-3 rounded mr-1 ${option.preview}`}></div>
                            {option.label.split(' ')[0]}
                          </Button>
                        ))}
                      </div>
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
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${service.gradient} text-white shadow-lg`}>
                          <span className="text-2xl">{service.icon}</span>
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
                            onClick={() => handleDelete(service.id)}
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
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceCardsTab;
