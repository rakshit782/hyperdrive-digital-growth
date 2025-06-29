
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, X, Plus, Trash2 } from 'lucide-react';

interface ServicePageConfig {
  serviceType: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonUrl: string;
  services: Array<{
    title: string;
    description: string;
    icon: string;
    gradient: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
}

interface ServicePageEditorProps {
  config: ServicePageConfig;
  onSave: (config: ServicePageConfig) => void;
  onCancel: () => void;
}

const ServicePageEditor = ({ config, onSave, onCancel }: ServicePageEditorProps) => {
  const [editedConfig, setEditedConfig] = useState<ServicePageConfig>(config);

  const updateConfig = (updates: Partial<ServicePageConfig>) => {
    setEditedConfig(prev => ({ ...prev, ...updates }));
  };

  const addService = () => {
    const newService = {
      title: 'New Service',
      description: 'Service description',
      icon: 'Star',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    };
    updateConfig({
      services: [...editedConfig.services, newService]
    });
  };

  const updateService = (index: number, updates: Partial<typeof editedConfig.services[0]>) => {
    const newServices = [...editedConfig.services];
    newServices[index] = { ...newServices[index], ...updates };
    updateConfig({ services: newServices });
  };

  const removeService = (index: number) => {
    const newServices = editedConfig.services.filter((_, i) => i !== index);
    updateConfig({ services: newServices });
  };

  const addBenefit = () => {
    const newBenefit = {
      title: 'New Benefit',
      description: 'Benefit description',
      icon: 'Star',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    };
    updateConfig({
      benefits: [...editedConfig.benefits, newBenefit]
    });
  };

  const updateBenefit = (index: number, updates: Partial<typeof editedConfig.benefits[0]>) => {
    const newBenefits = [...editedConfig.benefits];
    newBenefits[index] = { ...newBenefits[index], ...updates };
    updateConfig({ benefits: newBenefits });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = editedConfig.benefits.filter((_, i) => i !== index);
    updateConfig({ benefits: newBenefits });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900 capitalize">
          Edit {editedConfig.serviceType} Service Page
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={() => onSave(editedConfig)}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editedConfig.title}
                onChange={(e) => updateConfig({ title: e.target.value })}
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={editedConfig.subtitle}
                onChange={(e) => updateConfig({ subtitle: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label>Hero Description</Label>
            <Textarea
              value={editedConfig.heroDescription}
              onChange={(e) => updateConfig({ heroDescription: e.target.value })}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Primary Button Text</Label>
              <Input
                value={editedConfig.primaryButtonText}
                onChange={(e) => updateConfig({ primaryButtonText: e.target.value })}
              />
            </div>
            <div>
              <Label>Primary Button URL</Label>
              <Input
                value={editedConfig.primaryButtonUrl}
                onChange={(e) => updateConfig({ primaryButtonUrl: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Secondary Button Text</Label>
              <Input
                value={editedConfig.secondaryButtonText}
                onChange={(e) => updateConfig({ secondaryButtonText: e.target.value })}
              />
            </div>
            <div>
              <Label>Secondary Button URL</Label>
              <Input
                value={editedConfig.secondaryButtonUrl}
                onChange={(e) => updateConfig({ secondaryButtonUrl: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Services</CardTitle>
            <Button onClick={addService} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {editedConfig.services.map((service, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Service {index + 1}</h4>
                <Button
                  onClick={() => removeService(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={service.title}
                    onChange={(e) => updateService(index, { title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Icon</Label>
                  <Input
                    value={service.icon}
                    onChange={(e) => updateService(index, { icon: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={service.description}
                  onChange={(e) => updateService(index, { description: e.target.value })}
                />
              </div>
              <div>
                <Label>Gradient Classes</Label>
                <Input
                  value={service.gradient}
                  onChange={(e) => updateService(index, { gradient: e.target.value })}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Benefits</CardTitle>
            <Button onClick={addBenefit} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Benefit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {editedConfig.benefits.map((benefit, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Benefit {index + 1}</h4>
                <Button
                  onClick={() => removeBenefit(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={benefit.title}
                    onChange={(e) => updateBenefit(index, { title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Icon</Label>
                  <Input
                    value={benefit.icon}
                    onChange={(e) => updateBenefit(index, { icon: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={benefit.description}
                  onChange={(e) => updateBenefit(index, { description: e.target.value })}
                />
              </div>
              <div>
                <Label>Color Classes</Label>
                <Input
                  value={benefit.color}
                  onChange={(e) => updateBenefit(index, { color: e.target.value })}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card>
        <CardHeader>
          <CardTitle>Call to Action Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>CTA Title</Label>
            <Input
              value={editedConfig.ctaTitle}
              onChange={(e) => updateConfig({ ctaTitle: e.target.value })}
            />
          </div>
          <div>
            <Label>CTA Description</Label>
            <Textarea
              value={editedConfig.ctaDescription}
              onChange={(e) => updateConfig({ ctaDescription: e.target.value })}
              rows={2}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>CTA Button Text</Label>
              <Input
                value={editedConfig.ctaButtonText}
                onChange={(e) => updateConfig({ ctaButtonText: e.target.value })}
              />
            </div>
            <div>
              <Label>CTA Button URL</Label>
              <Input
                value={editedConfig.ctaButtonUrl}
                onChange={(e) => updateConfig({ ctaButtonUrl: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicePageEditor;
