
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Eye, Save, X, Plus, Edit, Trash2, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UnifiedServiceContentManagerProps {
  onClose: () => void;
}

const UnifiedServiceContentManager = ({ onClose }: UnifiedServiceContentManagerProps) => {
  const { toast } = useToast();
  
  const [selectedService, setSelectedService] = useState<string>('amazon-advertising');
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<string>('');

  const serviceTypes = [
    { value: 'amazon-advertising', label: 'Amazon Advertising' },
    { value: 'walmart-advertising', label: 'Walmart Advertising' },
    { value: 'google-advertising', label: 'Google Advertising' },
    { value: 'meta-advertising', label: 'Meta Advertising' },
    { value: 'website-development', label: 'Website Development' },
    { value: 'account-management', label: 'Account Management' },
    { value: 'shopify-development', label: 'Shopify Development' },
    { value: 'shopify-integration', label: 'Shopify Integration' }
  ];

  useEffect(() => {
    fetchData();
  }, [selectedService]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Mock data for demonstration - in real app, this would fetch from Supabase
      setCaseStudies([
        { id: '1', title: 'Sample Case Study 1', is_active: true, client_name: 'Client A', industry: 'Tech' },
        { id: '2', title: 'Sample Case Study 2', is_active: false, client_name: 'Client B', industry: 'Retail' }
      ]);
      setStats([
        { id: '1', stat_label: 'ROI Increase', stat_value: '450%', is_active: true },
        { id: '2', stat_label: 'Cost Reduction', stat_value: '65%', is_active: true }
      ]);
      setReviews([
        { id: '1', client_name: 'John Doe', company: 'Company A', rating: 5, is_active: true },
        { id: '2', client_name: 'Jane Smith', company: 'Company B', rating: 5, is_active: true }
      ]);
      setFeatures([
        { id: '1', title: 'Feature 1', description: 'Description 1', is_active: true },
        { id: '2', title: 'Feature 2', description: 'Description 2', is_active: true }
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (type: string) => {
    const newItem = {
      service_type: selectedService,
      is_active: true,
      sort_order: 0
    };

    switch (type) {
      case 'case-study':
        setEditingItem({
          ...newItem,
          title: '',
          description: '',
          client_name: '',
          industry: '',
          results: {},
          challenge: '',
          solution: '',
          key_success_factors: [],
          timeline: '',
          testimonial: ''
        });
        break;
      case 'stat':
        setEditingItem({
          ...newItem,
          stat_label: '',
          stat_value: '',
          stat_description: '',
          icon_name: ''
        });
        break;
      case 'review':
        setEditingItem({
          ...newItem,
          client_name: '',
          company: '',
          review_text: '',
          rating: 5,
          avatar_url: '',
          results_achieved: ''
        });
        break;
      case 'feature':
        setEditingItem({
          ...newItem,
          title: '',
          description: '',
          icon_name: '',
          gradient: ''
        });
        break;
    }
    setEditingType(type);
  };

  const handleEdit = (item: any, type: string) => {
    setEditingItem(item);
    setEditingType(type);
  };

  const handleSave = async () => {
    try {
      // In a real app, this would save to Supabase
      toast({
        title: "Success",
        description: `${editingType} saved successfully for ${selectedService}`,
      });

      setEditingItem(null);
      setEditingType('');
      fetchData();
    } catch (error) {
      console.error('Error saving:', error);
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string, type: string) => {
    try {
      // In a real app, this would delete from Supabase
      toast({
        title: "Success",
        description: `${type} deleted successfully`,
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive"
      });
    }
  };

  const toggleActive = async (item: any, type: string) => {
    try {
      // In a real app, this would update in Supabase
      fetchData();
    } catch (error) {
      console.error('Error toggling active state:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">
                Unified Service Content Management
              </h2>
              <p className="text-gray-600">
                Manage all content for service pages in one place
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="service-select">Select Service</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <Tabs defaultValue="case-studies" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="case-studies">Case Studies ({caseStudies.length})</TabsTrigger>
              <TabsTrigger value="stats">Stats ({stats.length})</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="features">Features ({features.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="case-studies" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Case Studies for {serviceTypes.find(s => s.value === selectedService)?.label}</h3>
                <Button onClick={() => handleAdd('case-study')} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Case Study
                </Button>
              </div>

              <div className="grid gap-4">
                {caseStudies.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={item.is_active}
                            onCheckedChange={() => toggleActive(item, 'case-study')}
                          />
                          <div>
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.client_name} - {item.industry}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item, 'case-study')}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(item.id, 'case-study')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Statistics for {serviceTypes.find(s => s.value === selectedService)?.label}</h3>
                <Button onClick={() => handleAdd('stat')} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stat
                </Button>
              </div>

              <div className="grid gap-4">
                {stats.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={item.is_active}
                            onCheckedChange={() => toggleActive(item, 'stat')}
                          />
                          <div>
                            <h4 className="font-semibold">{item.stat_label}</h4>
                            <p className="text-sm text-gray-600">{item.stat_value}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item, 'stat')}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(item.id, 'stat')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Reviews for {serviceTypes.find(s => s.value === selectedService)?.label}</h3>
                <Button onClick={() => handleAdd('review')} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Review
                </Button>
              </div>

              <div className="grid gap-4">
                {reviews.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={item.is_active}
                            onCheckedChange={() => toggleActive(item, 'review')}
                          />
                          <div>
                            <h4 className="font-semibold">{item.client_name}</h4>
                            <p className="text-sm text-gray-600">{item.company} - {item.rating}/5 stars</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item, 'review')}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(item.id, 'review')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Features for {serviceTypes.find(s => s.value === selectedService)?.label}</h3>
                <Button onClick={() => handleAdd('feature')} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feature
                </Button>
              </div>

              <div className="grid gap-4">
                {features.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={item.is_active}
                            onCheckedChange={() => toggleActive(item, 'feature')}
                          />
                          <div>
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item, 'feature')}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(item.id, 'feature')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Edit Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto m-4">
              <CardHeader>
                <CardTitle>Edit {editingType.replace('-', ' ')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingType === 'case-study' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={editingItem.title || ''}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Client Name</Label>
                        <Input
                          value={editingItem.client_name || ''}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, client_name: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={editingItem.description || ''}
                        onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Industry</Label>
                      <Input
                        value={editingItem.industry || ''}
                        onChange={(e) => setEditingItem(prev => ({ ...prev, industry: e.target.value }))}
                      />
                    </div>
                  </>
                )}

                {editingType === 'stat' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Label</Label>
                        <Input
                          value={editingItem.stat_label || ''}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, stat_label: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Value</Label>
                        <Input
                          value={editingItem.stat_value || ''}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, stat_value: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={editingItem.stat_description || ''}
                        onChange={(e) => setEditingItem(prev => ({ ...prev, stat_description: e.target.value }))}
                      />
                    </div>
                  </>
                )}

                {editingType === 'review' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Client Name</Label>
                        <Input
                          value={editingItem.client_name || ''}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, client_name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Company</Label>
                        <Input
                          value={editingItem.company || ''}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, company: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Review Text</Label>
                      <Textarea
                        value={editingItem.review_text || ''}
                        onChange={(e) => setEditingItem(prev => ({ ...prev, review_text: e.target.value }))}
                      />
                    </div>
                  </>
                )}

                {editingType === 'feature' && (
                  <>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editingItem.title || ''}
                        onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={editingItem.description || ''}
                        onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => { setEditingItem(null); setEditingType(''); }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedServiceContentManager;
