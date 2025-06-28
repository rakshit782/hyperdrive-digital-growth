
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ServicePageConfig {
  id: string;
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
  const [editConfig, setEditConfig] = useState<ServicePageConfig>(config);

  const handleSave = () => {
    onSave(editConfig);
  };

  const addService = () => {
    setEditConfig({
      ...editConfig,
      services: [
        ...editConfig.services,
        {
          title: 'New Service',
          description: 'Service description',
          icon: 'Star',
          gradient: 'bg-gradient-to-r from-blue-500 to-purple-500'
        }
      ]
    });
  };

  const removeService = (index: number) => {
    setEditConfig({
      ...editConfig,
      services: editConfig.services.filter((_, i) => i !== index)
    });
  };

  const updateService = (index: number, field: string, value: string) => {
    const updatedServices = [...editConfig.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setEditConfig({ ...editConfig, services: updatedServices });
  };

  const addBenefit = () => {
    setEditConfig({
      ...editConfig,
      benefits: [
        ...editConfig.benefits,
        {
          title: 'New Benefit',
          description: 'Benefit description',
          icon: 'Star',
          color: 'bg-green-500'
        }
      ]
    });
  };

  const removeBenefit = (index: number) => {
    setEditConfig({
      ...editConfig,
      benefits: editConfig.benefits.filter((_, i) => i !== index)
    });
  };

  const updateBenefit = (index: number, field: string, value: string) => {
    const updatedBenefits = [...editConfig.benefits];
    updatedBenefits[index] = { ...updatedBenefits[index], [field]: value };
    setEditConfig({ ...editConfig, benefits: updatedBenefits });
  };

  const gradientOptions = [
    'bg-gradient-to-r from-blue-500 to-purple-500',
    'bg-gradient-to-r from-purple-500 to-pink-500',
    'bg-gradient-to-r from-orange-500 to-red-500',
    'bg-gradient-to-r from-green-500 to-blue-500',
    'bg-gradient-to-r from-blue-500 to-indigo-500',
    'bg-gradient-to-r from-pink-500 to-violet-500'
  ];

  const colorOptions = [
    'bg-green-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-indigo-500'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Service Page: {config.serviceType}</h2>
        <div className="flex space-x-2">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Main banner content and call-to-action buttons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editConfig.title}
                onChange={(e) => setEditConfig({ ...editConfig, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={editConfig.subtitle}
                onChange={(e) => setEditConfig({ ...editConfig, subtitle: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label>Hero Description</Label>
            <Textarea
              value={editConfig.heroDescription}
              onChange={(e) => setEditConfig({ ...editConfig, heroDescription: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Primary Button Text</Label>
              <Input
                value={editConfig.primaryButtonText}
                onChange={(e) => setEditConfig({ ...editConfig, primaryButtonText: e.target.value })}
              />
            </div>
            <div>
              <Label>Primary Button URL</Label>
              <Input
                value={editConfig.primaryButtonUrl}
                onChange={(e) => setEditConfig({ ...editConfig, primaryButtonUrl: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Secondary Button Text</Label>
              <Input
                value={editConfig.secondaryButtonText}
                onChange={(e) => setEditConfig({ ...editConfig, secondaryButtonText: e.target.value })}
              />
            </div>
            <div>
              <Label>Secondary Button URL</Label>
              <Input
                value={editConfig.secondaryButtonUrl}
                onChange={(e) => setEditConfig({ ...editConfig, secondaryButtonUrl: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Services Section</CardTitle>
              <CardDescription>Service offerings displayed in cards</CardDescription>
            </div>
            <Button onClick={addService}>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {editConfig.services.map((service, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold">Service {index + 1}</h4>
                    <Button variant="outline" size="sm" onClick={() => removeService(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={service.title}
                        onChange={(e) => updateService(index, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Icon (Lucide name)</Label>
                      <Input
                        value={service.icon}
                        onChange={(e) => updateService(index, 'icon', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Description</Label>
                    <Textarea
                      value={service.description}
                      onChange={(e) => updateService(index, 'description', e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <Label>Gradient</Label>
                    <select
                      value={service.gradient}
                      onChange={(e) => updateService(index, 'gradient', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {gradientOptions.map((gradient) => (
                        <option key={gradient} value={gradient}>
                          {gradient.replace('bg-gradient-to-r from-', '').replace(' to-', ' → ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Benefits Section</CardTitle>
              <CardDescription>Why choose us benefits list</CardDescription>
            </div>
            <Button onClick={addBenefit}>
              <Plus className="w-4 h-4 mr-2" />
              Add Benefit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {editConfig.benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold">Benefit {index + 1}</h4>
                    <Button variant="outline" size="sm" onClick={() => removeBenefit(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={benefit.title}
                        onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Icon (Lucide name)</Label>
                      <Input
                        value={benefit.icon}
                        onChange={(e) => updateBenefit(index, 'icon', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Description</Label>
                    <Textarea
                      value={benefit.description}
                      onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <Label>Color</Label>
                    <select
                      value={benefit.color}
                      onChange={(e) => updateBenefit(index, 'color', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {colorOptions.map((color) => (
                        <option key={color} value={color}>
                          {color.replace('bg-', '').replace('-500', '')}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card>
        <CardHeader>
          <CardTitle>Call-to-Action Section</CardTitle>
          <CardDescription>Final conversion section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>CTA Title</Label>
            <Input
              value={editConfig.ctaTitle}
              onChange={(e) => setEditConfig({ ...editConfig, ctaTitle: e.target.value })}
            />
          </div>
          <div>
            <Label>CTA Description</Label>
            <Textarea
              value={editConfig.ctaDescription}
              onChange={(e) => setEditConfig({ ...editConfig, ctaDescription: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>CTA Button Text</Label>
              <Input
                value={editConfig.ctaButtonText}
                onChange={(e) => setEditConfig({ ...editConfig, ctaButtonText: e.target.value })}
              />
            </div>
            <div>
              <Label>CTA Button URL</Label>
              <Input
                value={editConfig.ctaButtonUrl}
                onChange={(e) => setEditConfig({ ...editConfig, ctaButtonUrl: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicePageEditor;
