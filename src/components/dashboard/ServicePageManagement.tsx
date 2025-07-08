
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

interface ServicePageData {
  service_type: string;
  title: string;
  subtitle: string;
  description: string;
  hero_image: string;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
}

interface ServiceCard {
  id: string;
  service_type: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: Json;
  sort_order: number;
  is_active: boolean;
}

const ServicePageManagement = () => {
  const [servicePages, setServicePages] = useState<ServicePageData[]>([]);
  const [serviceCards, setServiceCards] = useState<ServiceCard[]>([]);
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [pageFormData, setPageFormData] = useState<ServicePageData>({
    service_type: '',
    title: '',
    subtitle: '',
    description: '',
    hero_image: '',
    meta_title: '',
    meta_description: '',
    is_active: true
  });

  const [cardFormData, setCardFormData] = useState({
    id: '',
    service_type: '',
    title: '',
    description: '',
    icon: '',
    gradient: '',
    features: [] as string[],
    sort_order: 0,
    is_active: true
  });

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

  useEffect(() => {
    fetchServiceData();
  }, []);

  const fetchServiceData = async () => {
    try {
      setLoading(true);
      
      const { data: pages, error: pagesError } = await supabase
        .from('service_pages')
        .select('*')
        .order('service_type');

      if (pagesError) {
        console.error('Error fetching service pages:', pagesError);
        toast.error('Failed to load service pages');
        return;
      }

      const { data: cards, error: cardsError } = await supabase
        .from('service_cards')
        .select('*')
        .order('service_type', { ascending: true })
        .order('sort_order', { ascending: true });

      if (cardsError) {
        console.error('Error fetching service cards:', cardsError);
        toast.error('Failed to load service cards');
        return;
      }

      setServicePages(pages || []);
      setServiceCards(cards || []);
    } catch (error) {
      console.error('Error fetching service data:', error);
      toast.error('Failed to load service data');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePage = async () => {
    try {
      const { error } = await supabase
        .from('service_pages')
        .upsert(pageFormData, { onConflict: 'service_type' });

      if (error) {
        console.error('Error saving page:', error);
        toast.error('Failed to save service page');
        return;
      }

      toast.success('Service page updated successfully');
      setEditingPage(null);
      fetchServiceData();
    } catch (error) {
      console.error('Error saving page:', error);
      toast.error('Failed to save service page');
    }
  };

  const handleSaveCard = async () => {
    try {
      const cardData = {
        ...cardFormData,
        features: cardFormData.features as Json
      };

      if (cardFormData.id && cardFormData.id !== 'new') {
        const { error } = await supabase
          .from('service_cards')
          .update(cardData)
          .eq('id', cardFormData.id);
        if (error) {
          console.error('Error updating card:', error);
          toast.error('Failed to update service card');
          return;
        }
      } else {
        const { id, ...insertData } = cardData;
        const { error } = await supabase
          .from('service_cards')
          .insert(insertData);
        if (error) {
          console.error('Error creating card:', error);
          toast.error('Failed to create service card');
          return;
        }
      }

      toast.success('Service card saved successfully');
      setEditingCard(null);
      fetchServiceData();
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error('Failed to save service card');
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      const { error } = await supabase
        .from('service_cards')
        .delete()
        .eq('id', cardId);

      if (error) {
        console.error('Error deleting card:', error);
        toast.error('Failed to delete service card');
        return;
      }

      toast.success('Service card deleted successfully');
      fetchServiceData();
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Failed to delete service card');
    }
  };

  const handleEditPage = (serviceType: string) => {
    const page = servicePages.find(p => p.service_type === serviceType);
    if (page) {
      setPageFormData(page);
    } else {
      setPageFormData({
        service_type: serviceType,
        title: '',
        subtitle: '',
        description: '',
        hero_image: '',
        meta_title: '',
        meta_description: '',
        is_active: true
      });
    }
    setEditingPage(serviceType);
  };

  const handleEditCard = (cardId: string) => {
    if (cardId === 'new') {
      setCardFormData({
        id: 'new',
        service_type: '',
        title: '',
        description: '',
        icon: '',
        gradient: '',
        features: [],
        sort_order: 0,
        is_active: true
      });
    } else {
      const card = serviceCards.find(c => c.id === cardId);
      if (card) {
        setCardFormData({
          ...card,
          features: getCardFeatures(card.features)
        });
      }
    }
    setEditingCard(cardId);
  };

  // Helper function to safely get features as string array
  const getCardFeatures = (features: Json): string[] => {
    if (Array.isArray(features)) {
      return features.filter((item): item is string => typeof item === 'string');
    }
    return [];
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Service Page Management</h2>
        <Button onClick={() => handleEditCard('new')}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service Card
        </Button>
      </div>

      <Tabs defaultValue="pages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pages">Service Pages</TabsTrigger>
          <TabsTrigger value="cards">Service Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <div className="grid gap-4">
            {serviceTypes.map(serviceType => {
              const page = servicePages.find(p => p.service_type === serviceType);
              return (
                <Card key={serviceType}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="capitalize">
                      {serviceType.replace('-', ' ')} Page
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPage(serviceType)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Title:</strong> {page?.title || 'Not set'}
                      </div>
                      <div>
                        <strong>Status:</strong>
                        <Badge variant={page?.is_active ? 'default' : 'secondary'} className="ml-2">
                          {page?.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4">
            {serviceTypes.map(serviceType => {
              const cards = serviceCards.filter(c => c.service_type === serviceType);
              return (
                <Card key={serviceType}>
                  <CardHeader>
                    <CardTitle className="capitalize">
                      {serviceType.replace('-', ' ')} Cards ({cards.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {cards.map(card => (
                        <div key={card.id} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <span className="font-medium">{card.title}</span>
                            <Badge variant={card.is_active ? 'default' : 'secondary'} className="ml-2">
                              {card.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            {getCardFeatures(card.features).length > 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                Features: {getCardFeatures(card.features).length}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditCard(card.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCard(card.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {cards.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                          No cards found for this service type
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Page Modal */}
      {editingPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit {editingPage.replace('-', ' ')} Page</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={pageFormData.title}
                  onChange={(e) => setPageFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter page title" 
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input 
                  id="subtitle" 
                  value={pageFormData.subtitle}
                  onChange={(e) => setPageFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Enter page subtitle" 
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={pageFormData.description}
                  onChange={(e) => setPageFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter page description" 
                />
              </div>
              <div>
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input 
                  id="meta_title" 
                  value={pageFormData.meta_title}
                  onChange={(e) => setPageFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  placeholder="Enter meta title for SEO" 
                />
              </div>
              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea 
                  id="meta_description" 
                  value={pageFormData.meta_description}
                  onChange={(e) => setPageFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="Enter meta description for SEO" 
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="is_active"
                  checked={pageFormData.is_active}
                  onCheckedChange={(checked) => setPageFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setEditingPage(null)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSavePage}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Card Modal */}
      {editingCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingCard === 'new' ? 'Add New Service Card' : 'Edit Service Card'}
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="service-type">Service Type</Label>
                <Select 
                  value={cardFormData.service_type}
                  onValueChange={(value) => setCardFormData(prev => ({ ...prev, service_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.replace('-', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="card-title">Title</Label>
                <Input 
                  id="card-title" 
                  value={cardFormData.title}
                  onChange={(e) => setCardFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter card title" 
                />
              </div>
              <div>
                <Label htmlFor="card-description">Description</Label>
                <Textarea 
                  id="card-description" 
                  value={cardFormData.description}
                  onChange={(e) => setCardFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter card description" 
                />
              </div>
              <div>
                <Label htmlFor="icon">Icon</Label>
                <Input 
                  id="icon" 
                  value={cardFormData.icon}
                  onChange={(e) => setCardFormData(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="Enter icon name" 
                />
              </div>
              <div>
                <Label htmlFor="gradient">Gradient</Label>
                <Input 
                  id="gradient" 
                  value={cardFormData.gradient}
                  onChange={(e) => setCardFormData(prev => ({ ...prev, gradient: e.target.value }))}
                  placeholder="Enter gradient CSS class" 
                />
              </div>
              <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input 
                  id="sort_order" 
                  type="number"
                  value={cardFormData.sort_order}
                  onChange={(e) => setCardFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter sort order" 
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="card_active"
                  checked={cardFormData.is_active}
                  onCheckedChange={(checked) => setCardFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="card_active">Active</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setEditingCard(null)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSaveCard}>
                <Save className="w-4 h-4 mr-2" />
                {editingCard === 'new' ? 'Create Card' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePageManagement;
