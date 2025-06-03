
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X } from "lucide-react";
import { ServiceCard } from "@/types/dashboard";

interface ServiceEditModalProps {
  service: ServiceCard;
  isNew: boolean;
  onSave: (service: ServiceCard) => void;
  onCancel: () => void;
  onChange: (service: ServiceCard) => void;
}

const ServiceEditModal = ({ service, isNew, onSave, onCancel, onChange }: ServiceEditModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {isNew ? 'Add New Service' : 'Edit Service'}
            </h3>
            <Button variant="outline" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={service.title}
                onChange={(e) => onChange({...service, title: e.target.value})}
              />
            </div>
            
            <div>
              <Label>Description</Label>
              <Textarea
                value={service.description}
                onChange={(e) => onChange({...service, description: e.target.value})}
              />
            </div>
            
            <div>
              <Label>Features (comma separated)</Label>
              <Input
                value={service.features.join(', ')}
                onChange={(e) => onChange({
                  ...service, 
                  features: e.target.value.split(',').map(f => f.trim())
                })}
              />
            </div>
            
            <div>
              <Label>Link</Label>
              <Input
                value={service.link}
                onChange={(e) => onChange({...service, link: e.target.value})}
              />
            </div>
            
            <div>
              <Label>Icon</Label>
              <Select value={service.icon} onValueChange={(value) => onChange({...service, icon: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ShoppingCart">Shopping Cart</SelectItem>
                  <SelectItem value="Store">Store</SelectItem>
                  <SelectItem value="Users">Users</SelectItem>
                  <SelectItem value="Settings">Settings</SelectItem>
                  <SelectItem value="Link2">Link</SelectItem>
                  <SelectItem value="Code">Code</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button onClick={() => onSave(service)}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceEditModal;
