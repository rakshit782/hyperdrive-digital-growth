
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Image,
  BarChart3,
  Star,
  FileText,
  CheckCircle,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ServicePageCustomizerProps {
  serviceType: string;
  onClose: () => void;
}

interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  heroImage: string;
  badge: string;
}

interface StatBlock {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: string;
  isActive: boolean;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
  isActive: boolean;
}

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  isActive: boolean;
}

interface IntegrationPlatform {
  id: string;
  name: string;
  logo: string;
  description: string;
  isActive: boolean;
}

interface CTASection {
  title: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
}

const ServicePageCustomizer: React.FC<ServicePageCustomizerProps> = ({ serviceType, onClose }) => {
  const [heroSection, setHeroSection] = useState<HeroSection>({
    title: '',
    subtitle: '',
    description: '',
    primaryButtonText: '',
    secondaryButtonText: '',
    heroImage: '',
    badge: ''
  });
  const [statBlocks, setStatBlocks] = useState<StatBlock[]>([]);
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [benefitItems, setBenefitItems] = useState<BenefitItem[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [integrationPlatforms, setIntegrationPlatforms] = useState<IntegrationPlatform[]>([]);
  const [ctaSection, setCTASection] = useState<CTASection>({
    title: '',
    description: '',
    buttonText: '',
    backgroundImage: ''
  });
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadServiceData();
  }, [serviceType]);

  const loadServiceData = () => {
    const savedHero = localStorage.getItem(`service_hero_${serviceType}`);
    const savedStats = localStorage.getItem(`service_stats_${serviceType}`);
    const savedServices = localStorage.getItem(`service_items_${serviceType}`);
    const savedBenefits = localStorage.getItem(`service_benefits_${serviceType}`);
    const savedProcess = localStorage.getItem(`service_process_${serviceType}`);
    const savedIntegrations = localStorage.getItem(`service_integrations_${serviceType}`);
    const savedCTA = localStorage.getItem(`service_cta_${serviceType}`);

    if (savedHero) setHeroSection(JSON.parse(savedHero));
    if (savedStats) setStatBlocks(JSON.parse(savedStats));
    if (savedServices) setServiceItems(JSON.parse(savedServices));
    if (savedBenefits) setBenefitItems(JSON.parse(savedBenefits));
    if (savedProcess) setProcessSteps(JSON.parse(savedProcess));
    if (savedIntegrations) setIntegrationPlatforms(JSON.parse(savedIntegrations));
    if (savedCTA) setCTASection(JSON.parse(savedCTA));
  };

  const saveData = (type: string, data: any) => {
    localStorage.setItem(`service_${type}_${serviceType}`, JSON.stringify(data));
    toast({
      title: "Success",
      description: `${type} updated successfully`,
    });
  };

  const handleAddNew = (type: string) => {
    const newItem = {
      id: Math.random().toString(36).substring(2, 15),
      isActive: true,
    };

    switch (type) {
      case 'stat':
        setEditingItem({ ...newItem, label: '', value: '', description: '', icon: 'BarChart3' });
        break;
      case 'service':
        setEditingItem({ ...newItem, title: '', description: '', icon: 'Star', gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500', features: [] });
        break;
      case 'benefit':
        setEditingItem({ ...newItem, title: '', description: '', icon: 'CheckCircle', color: 'bg-gradient-to-r from-green-500 to-emerald-500' });
        break;
      case 'process':
        setEditingItem({ ...newItem, stepNumber: '1', title: '', description: '' });
        break;
      case 'integration':
        setEditingItem({ ...newItem, name: '', logo: '🔗', description: '' });
        break;
    }
    setEditingType(type);
  };

  const handleSave = () => {
    if (!editingItem || !editingType) return;

    switch (editingType) {
      case 'stat':
        const newStats = editingItem.id && statBlocks.find(item => item.id === editingItem.id) ? 
          statBlocks.map(item => item.id === editingItem.id ? editingItem : item) :
          [...statBlocks, editingItem];
        setStatBlocks(newStats);
        saveData('stats', newStats);
        break;
      case 'service':
        const newServices = editingItem.id && serviceItems.find(item => item.id === editingItem.id) ? 
          serviceItems.map(item => item.id === editingItem.id ? editingItem : item) :
          [...serviceItems, editingItem];
        setServiceItems(newServices);
        saveData('items', newServices);
        break;
      case 'benefit':
        const newBenefits = editingItem.id && benefitItems.find(item => item.id === editingItem.id) ? 
          benefitItems.map(item => item.id === editingItem.id ? editingItem : item) :
          [...benefitItems, editingItem];
        setBenefitItems(newBenefits);
        saveData('benefits', newBenefits);
        break;
      case 'process':
        const newProcess = editingItem.id && processSteps.find(item => item.id === editingItem.id) ? 
          processSteps.map(item => item.id === editingItem.id ? editingItem : item) :
          [...processSteps, editingItem];
        setProcessSteps(newProcess);
        saveData('process', newProcess);
        break;
      case 'integration':
        const newIntegrations = editingItem.id && integrationPlatforms.find(item => item.id === editingItem.id) ? 
          integrationPlatforms.map(item => item.id === editingItem.id ? editingItem : item) :
          [...integrationPlatforms, editingItem];
        setIntegrationPlatforms(newIntegrations);
        saveData('integrations', newIntegrations);
        break;
    }

    setEditingItem(null);
    setEditingType(null);
  };

  const handleDelete = (type: string, id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    switch (type) {
      case 'stat':
        const filteredStats = statBlocks.filter(item => item.id !== id);
        setStatBlocks(filteredStats);
        saveData('stats', filteredStats);
        break;
      case 'service':
        const filteredServices = serviceItems.filter(item => item.id !== id);
        setServiceItems(filteredServices);
        saveData('items', filteredServices);
        break;
      case 'benefit':
        const filteredBenefits = benefitItems.filter(item => item.id !== id);
        setBenefitItems(filteredBenefits);
        saveData('benefits', filteredBenefits);
        break;
      case 'process':
        const filteredProcess = processSteps.filter(item => item.id !== id);
        setProcessSteps(filteredProcess);
        saveData('process', filteredProcess);
        break;
      case 'integration':
        const filteredIntegrations = integrationPlatforms.filter(item => item.id !== id);
        setIntegrationPlatforms(filteredIntegrations);
        saveData('integrations', filteredIntegrations);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mr-3">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 capitalize">
                  Customize {serviceType} Service Page
                </CardTitle>
                <CardDescription>
                  Manage all sections, images, and content for your service page
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="hero" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="cta">CTA</TabsTrigger>
            </TabsList>

            <TabsContent value="hero" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Hero Section</h3>
                <Button onClick={() => saveData('hero', heroSection)} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Hero
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={heroSection.title}
                      onChange={(e) => setHeroSection(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Service Title"
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={heroSection.subtitle}
                      onChange={(e) => setHeroSection(prev => ({ ...prev, subtitle: e.target.value }))}
                      placeholder="Service Subtitle"
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={heroSection.description}
                    onChange={(e) => setHeroSection(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Hero description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Primary Button Text</Label>
                    <Input
                      value={heroSection.primaryButtonText}
                      onChange={(e) => setHeroSection(prev => ({ ...prev, primaryButtonText: e.target.value }))}
                      placeholder="Get Started"
                    />
                  </div>
                  <div>
                    <Label>Secondary Button Text</Label>
                    <Input
                      value={heroSection.secondaryButtonText}
                      onChange={(e) => setHeroSection(prev => ({ ...prev, secondaryButtonText: e.target.value }))}
                      placeholder="Learn More"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Hero Image URL</Label>
                    <Input
                      value={heroSection.heroImage}
                      onChange={(e) => setHeroSection(prev => ({ ...prev, heroImage: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div>
                    <Label>Badge Text</Label>
                    <Input
                      value={heroSection.badge}
                      onChange={(e) => setHeroSection(prev => ({ ...prev, badge: e.target.value }))}
                      placeholder="Expert Service"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Statistics Blocks</h3>
                <Button onClick={() => handleAddNew('stat')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stat Block
                </Button>
              </div>

              <div className="grid gap-4">
                {statBlocks.map((stat) => (
                  <Card key={stat.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-semibold">{stat.label}</h4>
                            <p className="text-sm text-gray-600">{stat.value} - {stat.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={stat.isActive} 
                            onCheckedChange={(checked) => {
                              const updated = statBlocks.map(item => 
                                item.id === stat.id ? { ...item, isActive: checked } : item
                              );
                              setStatBlocks(updated);
                              saveData('stats', updated);
                            }}
                          />
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditingItem(stat);
                            setEditingType('stat');
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete('stat', stat.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Service Items</h3>
                <Button onClick={() => handleAddNew('service')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>

              <div className="grid gap-4">
                {serviceItems.map((service) => (
                  <Card key={service.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Star className="w-5 h-5 text-orange-600" />
                          <div>
                            <h4 className="font-semibold">{service.title}</h4>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={service.isActive} 
                            onCheckedChange={(checked) => {
                              const updated = serviceItems.map(item => 
                                item.id === service.id ? { ...item, isActive: checked } : item
                              );
                              setServiceItems(updated);
                              saveData('items', updated);
                            }}
                          />
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditingItem(service);
                            setEditingType('service');
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete('service', service.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Benefits</h3>
                <Button onClick={() => handleAddNew('benefit')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Benefit
                </Button>
              </div>

              <div className="grid gap-4">
                {benefitItems.map((benefit) => (
                  <Card key={benefit.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <h4 className="font-semibold">{benefit.title}</h4>
                            <p className="text-sm text-gray-600">{benefit.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={benefit.isActive} 
                            onCheckedChange={(checked) => {
                              const updated = benefitItems.map(item => 
                                item.id === benefit.id ? { ...item, isActive: checked } : item
                              );
                              setBenefitItems(updated);
                              saveData('benefits', updated);
                            }}
                          />
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditingItem(benefit);
                            setEditingType('benefit');
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete('benefit', benefit.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="process" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Process Steps</h3>
                <Button onClick={() => handleAddNew('process')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
              </div>

              <div className="grid gap-4">
                {processSteps.map((step) => (
                  <Card key={step.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.stepNumber}
                          </div>
                          <div>
                            <h4 className="font-semibold">{step.title}</h4>
                            <p className="text-sm text-gray-600">{step.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={step.isActive} 
                            onCheckedChange={(checked) => {
                              const updated = processSteps.map(item => 
                                item.id === step.id ? { ...item, isActive: checked } : item
                              );
                              setProcessSteps(updated);
                              saveData('process', updated);
                            }}
                          />
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditingItem(step);
                            setEditingType('process');
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete('process', step.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Integration Platforms</h3>
                <Button onClick={() => handleAddNew('integration')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Integration
                </Button>
              </div>

              <div className="grid gap-4">
                {integrationPlatforms.map((platform) => (
                  <Card key={platform.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{platform.logo}</div>
                          <div>
                            <h4 className="font-semibold">{platform.name}</h4>
                            <p className="text-sm text-gray-600">{platform.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={platform.isActive} 
                            onCheckedChange={(checked) => {
                              const updated = integrationPlatforms.map(item => 
                                item.id === platform.id ? { ...item, isActive: checked } : item
                              );
                              setIntegrationPlatforms(updated);
                              saveData('integrations', updated);
                            }}
                          />
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditingItem(platform);
                            setEditingType('integration');
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete('integration', platform.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cta" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Call to Action Section</h3>
                <Button onClick={() => saveData('cta', ctaSection)} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save CTA
                </Button>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label>CTA Title</Label>
                  <Input
                    value={ctaSection.title}
                    onChange={(e) => setCTASection(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ready to Get Started?"
                  />
                </div>
                <div>
                  <Label>CTA Description</Label>
                  <Textarea
                    value={ctaSection.description}
                    onChange={(e) => setCTASection(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Contact us today for a free consultation"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Button Text</Label>
                    <Input
                      value={ctaSection.buttonText}
                      onChange={(e) => setCTASection(prev => ({ ...prev, buttonText: e.target.value }))}
                      placeholder="Get Started Today"
                    />
                  </div>
                  <div>
                    <Label>Background Image URL</Label>
                    <Input
                      value={ctaSection.backgroundImage}
                      onChange={(e) => setCTASection(prev => ({ ...prev, backgroundImage: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Edit Modal */}
          {editingItem && editingType && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle>Edit {editingType}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingType === 'stat' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Label</Label>
                          <Input
                            value={editingItem.label}
                            onChange={(e) => setEditingItem(prev => ({ ...prev, label: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label>Value</Label>
                          <Input
                            value={editingItem.value}
                            onChange={(e) => setEditingItem(prev => ({ ...prev, value: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={editingItem.description}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Icon</Label>
                        <Input
                          value={editingItem.icon}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, icon: e.target.value }))}
                        />
                      </div>
                    </>
                  )}

                  {editingType === 'service' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={editingItem.title}
                            onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label>Icon</Label>
                          <Input
                            value={editingItem.icon}
                            onChange={(e) => setEditingItem(prev => ({ ...prev, icon: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={editingItem.description}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Gradient Classes</Label>
                        <Input
                          value={editingItem.gradient}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, gradient: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Features (comma separated)</Label>
                        <Textarea
                          value={Array.isArray(editingItem.features) ? editingItem.features.join(', ') : ''}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, features: e.target.value.split(', ').filter(f => f.trim()) }))}
                        />
                      </div>
                    </>
                  )}

                  {editingType === 'benefit' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={editingItem.title}
                            onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label>Icon</Label>
                          <Input
                            value={editingItem.icon}
                            onChange={(e) => setEditingItem(prev => ({ ...prev, icon: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={editingItem.description}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Color Classes</Label>
                        <Input
                          value={editingItem.color}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, color: e.target.value }))}
                        />
                      </div>
                    </>
                  )}

                  {editingType === 'process' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Step Number</Label>
                          <Input
                            value={editingItem.stepNumber}
                            onChange={(e) => setEditingItem(prev => ({ ...prev, stepNumber: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={editingItem.title}
                            onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={editingItem.description}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                    </>
                  )}

                  {editingType === 'integration' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={editingItem.name}
                            onChange={(e) => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label>Logo (emoji or text)</Label>
                          <Input
                            value={editingItem.logo}
                            onChange={(e) => setEditingItem(prev => ({ ...prev, logo: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={editingItem.description}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                    </>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => {
                      setEditingItem(null);
                      setEditingType(null);
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicePageCustomizer;
