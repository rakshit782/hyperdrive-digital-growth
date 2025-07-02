
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ServiceCard } from "@/types/dashboard";

interface ServiceCardsTabProps {
  services: ServiceCard[];
  updateServices: (services: ServiceCard[]) => void;
}

const ServiceCardsTab = ({ services, updateServices }: ServiceCardsTabProps) => {
  const [editingService, setEditingService] = useState<ServiceCard | null>(null);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Services Updated",
      description: "Service cards have been updated successfully.",
    });
  };

  const handleEdit = (service: ServiceCard) => {
    setEditingService(service);
  };

  const handleUpdate = (updatedService: ServiceCard) => {
    const updatedServices = services.map(s => 
      s.id === updatedService.id ? updatedService : s
    );
    updateServices(updatedServices);
    setEditingService(null);
  };

  const handleDelete = (id: string) => {
    const updatedServices = services.filter(s => s.id !== id);
    updateServices(updatedServices);
    toast({
      title: "Service Deleted",
      description: "Service has been removed successfully.",
    });
  };

  const handleAdd = () => {
    const newService: ServiceCard = {
      id: `service-${Date.now()}`,
      title: "New Service",
      description: "Service description",
      features: ["Feature 1", "Feature 2"],
      icon: "💼",
      gradient: "from-blue-500 to-purple-600"
    };
    updateServices([...services, newService]);
    setEditingService(newService);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Service Cards Management</CardTitle>
              <CardDescription>
                Manage your service cards displayed on the homepage
              </CardDescription>
            </div>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{service.icon}</div>
                  <div>
                    <h3 className="font-medium">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    <p className="text-xs text-gray-500">Features: {service.features.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceCardsTab;
