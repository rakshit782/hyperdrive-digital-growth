
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Eye, RefreshCw } from 'lucide-react';
import { useServicePageConfig } from '@/hooks/useServicePageConfig';
import ServicePageEditor from './ServicePageEditor';

const ServicePagesManagementTab = () => {
  const { configs, loading, saveConfig, refetch } = useServicePageConfig();
  const [editingService, setEditingService] = useState<string | null>(null);

  const handleSave = async (config: any) => {
    await saveConfig(config.serviceType, config);
    setEditingService(null);
  };

  const handleCancel = () => {
    setEditingService(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (editingService && configs[editingService]) {
    return (
      <ServicePageEditor
        config={configs[editingService]}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Service Pages Management</h2>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(configs).map(([serviceType, config]) => (
          <Card key={serviceType} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg capitalize">{serviceType} Advertising</CardTitle>
                  <CardDescription>{config.title}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/${serviceType}-advertising`, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingService(serviceType)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Services:</strong> {config.services.length} items
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Benefits:</strong> {config.benefits.length} items
                </p>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {config.heroDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Service Page Management Features:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Customize hero sections with titles, descriptions, and call-to-action buttons</li>
          <li>• Manage service offerings with custom icons and gradients</li>
          <li>• Edit benefits sections with different color schemes</li>
          <li>• Configure CTA sections for maximum conversion</li>
          <li>• Real-time preview available for all changes</li>
        </ul>
      </div>
    </div>
  );
};

export default ServicePagesManagementTab;
