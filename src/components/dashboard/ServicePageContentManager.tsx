
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Eye, Save, X, Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ServicePageContentManagerProps {
  serviceType: string;
  onClose: () => void;
}

const ServicePageContentManager = ({ serviceType, onClose }: ServicePageContentManagerProps) => {
  const { toast } = useToast();
  
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, [serviceType]);

  const fetchData = async () => {
    try {
      const [caseStudiesRes, statsRes, reviewsRes] = await Promise.all([
        supabase.from('service_case_studies').select('*').eq('service_type', serviceType),
        supabase.from('service_stats').select('*').eq('service_type', serviceType),
        supabase.from('service_reviews').select('*').eq('service_type', serviceType)
      ]);

      setCaseStudies(caseStudiesRes.data || []);
      setStats(statsRes.data || []);
      setReviews(reviewsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (type: string) => {
    const newItem = {
      service_type: serviceType,
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
          image_url: ''
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
    }
    setEditingType(type);
  };

  const handleEdit = (item: any, type: string) => {
    setEditingItem(item);
    setEditingType(type);
  };

  const handleSave = async () => {
    try {
      if (editingType === 'case-study') {
        if (editingItem.id) {
          await supabase.from('service_case_studies').update(editingItem).eq('id', editingItem.id);
        } else {
          await supabase.from('service_case_studies').insert(editingItem);
        }
      } else if (editingType === 'stat') {
        if (editingItem.id) {
          await supabase.from('service_stats').update(editingItem).eq('id', editingItem.id);
        } else {
          await supabase.from('service_stats').insert(editingItem);
        }
      } else if (editingType === 'review') {
        if (editingItem.id) {
          await supabase.from('service_reviews').update(editingItem).eq('id', editingItem.id);
        } else {
          await supabase.from('service_reviews').insert(editingItem);
        }
      }

      toast({
        title: "Success",
        description: `${editingType} saved successfully`,
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
      if (type === 'case-study') {
        await supabase.from('service_case_studies').delete().eq('id', id);
      } else if (type === 'stat') {
        await supabase.from('service_stats').delete().eq('id', id);
      } else if (type === 'review') {
        await supabase.from('service_reviews').delete().eq('id', id);
      }

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
      if (type === 'case-study') {
        await supabase
          .from('service_case_studies')
          .update({ is_active: !item.is_active })
          .eq('id', item.id);
      } else if (type === 'stat') {
        await supabase
          .from('service_stats')
          .update({ is_active: !item.is_active })
          .eq('id', item.id);
      } else if (type === 'review') {
        await supabase
          .from('service_reviews')
          .update({ is_active: !item.is_active })
          .eq('id', item.id);
      }

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
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold capitalize">
                {serviceType.replace('-', ' ')} - Content Management
              </h2>
              <p className="text-gray-600">
                Manage case studies, stats, and reviews for this service page
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          <Tabs defaultValue="case-studies" className="space-y-4">
            <TabsList>
              <TabsTrigger value="case-studies">Case Studies ({caseStudies.length}/8)</TabsTrigger>
              <TabsTrigger value="stats">Stats ({stats.length}/4)</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length}/6)</TabsTrigger>
            </TabsList>

            <TabsContent value="case-studies" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Case Studies</h3>
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
                <h3 className="text-lg font-semibold">Statistics</h3>
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
                            <p className="text-sm text-gray-600">{item.stat_value} - {item.stat_description}</p>
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
                <h3 className="text-lg font-semibold">Reviews</h3>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Industry</Label>
                        <Input
                          value={editingItem.industry || ''}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, industry: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Image URL</Label>
                        <Input
                          value={editingItem.image_url || ''}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, image_url: e.target.value }))}
                        />
                      </div>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Rating</Label>
                        <Select 
                          value={editingItem.rating?.toString() || '5'} 
                          onValueChange={(value) => setEditingItem(prev => ({ ...prev, rating: parseInt(value) }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map(rating => (
                              <SelectItem key={rating} value={rating.toString()}>
                                {rating} Stars
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Results Achieved</Label>
                        <Input
                          value={editingItem.results_achieved || ''}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, results_achieved: e.target.value }))}
                        />
                      </div>
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

export default ServicePageContentManager;
