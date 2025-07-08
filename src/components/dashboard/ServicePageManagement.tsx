
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
  features: Json; // Changed from string[] to Json to match database schema
  sort_order: number;
  is_active: boolean;
}

const ServicePageManagement = () => {
  const [servicePages, setServicePages] = useState<ServicePageData[]>([]);
  const [serviceCards, setServiceCards] = useState<ServiceCard[]>([]);
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      
      // Fetch service pages
      const { data: pages, error: pagesError } = await supabase
        .from('service_pages')
        .select('*')
        .order('service_type');

      if (pagesError) {
        console.error('Error fetching service pages:', pagesError);
        toast.error('Failed to load service pages');
        return;
      }

      // Fetch service cards
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

  const handleSavePage = async (pageData: ServicePageData) => {
    try {
      const { error } = await supabase
        .from('service_pages')
        .upsert(pageData, { onConflict: 'service_type' });

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

  const handleSaveCard = async (cardData: Omit<ServiceCard, 'id'> & { id?: string }) => {
    try {
      if (cardData.id) {
        const { error } = await supabase
          .from('service_cards')
          .update(cardData)
          .eq('id', cardData.id);
        if (error) {
          console.error('Error updating card:', error);
          toast.error('Failed to update service card');
          return;
        }
      } else {
        const { error } = await supabase
          .from('service_cards')
          .insert(cardData);
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
        <Button onClick={() => setEditingCard('new')}>
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
                      onClick={() => setEditingPage(serviceType)}
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
                              onClick={() => setEditingCard(card.id)}
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

      {/* Edit Page Modal - Placeholder for now */}
      {editingPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Edit {editingPage.replace('-', ' ')} Page</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter page title" />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input id="subtitle" placeholder="Enter page subtitle" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter page description" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setEditingPage(null)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={() => setEditingPage(null)}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Card Modal - Placeholder for now */}
      {editingCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {editingCard === 'new' ? 'Add New Service Card' : 'Edit Service Card'}
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="service-type">Service Type</Label>
                <Select>
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
                <Input id="card-title" placeholder="Enter card title" />
              </div>
              <div>
                <Label htmlFor="card-description">Description</Label>
                <Textarea id="card-description" placeholder="Enter card description" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setEditingCard(null)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={() => setEditingCard(null)}>
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
