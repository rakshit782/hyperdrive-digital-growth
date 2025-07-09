
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Eye, RefreshCw, Settings, FileText, Database } from 'lucide-react';
import { useServicePageConfig } from '@/hooks/useServicePageConfig';
import ServicePageEditor from './ServicePageEditor';
import ServicePageCustomizer from './ServicePageCustomizer';
import UnifiedServiceContentManager from './UnifiedServiceContentManager';
import ServiceDataEditor from './ServiceDataEditor';

const ServicePagesManagementTab = () => {
  const { configs, loading, saveConfig, refetch } = useServicePageConfig();
  const [editingService, setEditingService] = useState<string | null>(null);
  const [customizingService, setCustomizingService] = useState<string | null>(null);
  const [showUnifiedManager, setShowUnifiedManager] = useState(false);
  const [editingData, setEditingData] = useState<string | null>(null);

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

  if (customizingService) {
    return (
      <ServicePageCustomizer
        serviceType={customizingService}
        onClose={() => setCustomizingService(null)}
      />
    );
  }

  if (showUnifiedManager) {
    return (
      <UnifiedServiceContentManager
        onClose={() => setShowUnifiedManager(false)}
      />
    );
  }

  if (editingData) {
    return (
      <ServiceDataEditor
        serviceType={editingData}
        onClose={() => setEditingData(null)}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Service Pages Management</h2>
        <div className="flex gap-3">
          <Button 
            onClick={() => setShowUnifiedManager(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Unified Content Manager
          </Button>
          <Button onClick={refetch} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(configs).map(([serviceType, config]) => (
          <Card key={serviceType} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg capitalize">{serviceType.replace('-', ' ')} Service</CardTitle>
                  <CardDescription>{config.title}</CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/${serviceType === 'meta' ? 'meta-advertising' : serviceType === 'amazon' ? 'amazon-advertising' : serviceType === 'walmart' ? 'walmart-advertising' : serviceType}`, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingData(serviceType)}
                  >
                    <Database className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCustomizingService(serviceType)}
                  >
                    <Settings className="w-4 h-4" />
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
                  <strong>Services:</strong> {config.services?.length || 0} items
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Benefits:</strong> {config.benefits?.length || 0} items
                </p>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {config.heroDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">✨ NEW: Unified Content Management</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Unified Features:</h4>
            <ul className="space-y-1">
              <li>• Manage all 8 service pages from one interface</li>
              <li>• Switch between services instantly</li>
              <li>• Consistent content management experience</li>
              <li>• Real-time content updates across all pages</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Content Types:</h4>
            <ul className="space-y-1">
              <li>• Case Studies with detailed information</li>
              <li>• Statistics and performance metrics</li>
              <li>• Client reviews and testimonials</li>
              <li>• Service features and benefits</li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <Button 
            onClick={() => setShowUnifiedManager(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Open Unified Content Manager
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicePagesManagementTab;
