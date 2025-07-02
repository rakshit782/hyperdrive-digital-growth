
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

interface ServiceCardsTabProps {
  services: Service[];
  updateServices: (services: Service[]) => void;
}

const ServiceCardsTab = ({ services, updateServices }: ServiceCardsTabProps) => {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Services Updated",
      description: "Service cards have been updated successfully.",
    });
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
  };

  const handleUpdate = (updatedService: Service) => {
    const updatedServices = services.map(s => 
      s.id === updatedService.id ? updatedService : s
    );
    updateServices(updatedServices);
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Service Cards Management</CardTitle>
          <CardDescription>
            Manage your service cards displayed on the homepage
          </CardDescription>
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
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={service.isActive ? "default" : "secondary"}>
                    {service.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit className="w-4 h-4" />
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
