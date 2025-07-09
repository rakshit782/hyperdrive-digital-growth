
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
import { Plus, Edit, Trash2, Save, X, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useServiceData } from '@/hooks/useServiceData';

interface ServiceDataEditorProps {
  serviceType: string;
  onClose: () => void;
}

const ServiceDataEditor = ({ serviceType, onClose }: ServiceDataEditorProps) => {
  const { caseStudies, stats, reviews, loading } = useServiceData(serviceType);
  const [editingType, setEditingType] = useState<'case-study' | 'stat' | 'review' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Form states for different types
  const [caseStudyForm, setCaseStudyForm] = useState({
    title: '',
    description: '',
    client_name: '',
    industry: '',
    image_url: '',
    results: { revenue_increase: '', conversion_rate: '', traffic_growth: '' },
    is_featured: false,
    sort_order: 0
  });

  const [statForm, setStatForm] = useState({
    stat_label: '',
    stat_value: '',
    stat_description: '',
    icon_name: '',
    sort_order: 0
  });

  const [reviewForm, setReviewForm] = useState({
    client_name: '',
    company: '',
    review_text: '',
    rating: 5,
    avatar_url: '',
    results_achieved: '',
    sort_order: 0
  });

  const handleEdit = (type: 'case-study' | 'stat' | 'review', item?: any) => {
    setEditingType(type);
    if (item) {
      setEditingItem(item);
      if (type === 'case-study') {
        setCaseStudyForm({
          title: item.title || '',
          description: item.description || '',
          client_name: item.client_name || '',
          industry: item.industry || '',
          image_url: item.image_url || '',
          results: typeof item.results === 'object' ? item.results : {},
          is_featured: item.is_featured || false,
          sort_order: item.sort_order || 0
        });
      } else if (type === 'stat') {
        setStatForm({
          stat_label: item.stat_label || '',
          stat_value: item.stat_value || '',
          stat_description: item.stat_description || '',
          icon_name: item.icon_name || '',
          sort_order: item.sort_order || 0
        });
      } else if (type === 'review') {
        setReviewForm({
          client_name: item.client_name || '',
          company: item.company || '',
          review_text: item.review_text || '',
          rating: item.rating || 5,
          avatar_url: item.avatar_url || '',
          results_achieved: item.results_achieved || '',
          sort_order: item.sort_order || 0
        });
      }
    } else {
      // Reset forms for new items
      setCaseStudyForm({
        title: '',
        description: '',
        client_name: '',
        industry: '',
        image_url: '',
        results: { revenue_increase: '', conversion_rate: '', traffic_growth: '' },
        is_featured: false,
        sort_order: 0
      });
      setStatForm({
        stat_label: '',
        stat_value: '',
        stat_description: '',
        icon_name: '',
        sort_order: 0
      });
      setReviewForm({
        client_name: '',
        company: '',
        review_text: '',
        rating: 5,
        avatar_url: '',
        results_achieved: '',
        sort_order: 0
      });
    }
  };

  const handleSave = async () => {
    try {
      let data: any = {};

      if (editingType === 'case-study') {
        data = {
          service_type: serviceType,
          ...caseStudyForm,
          is_active: true
        };

        if (editingItem?.id) {
          await supabase.from('service_case_studies').update(data).eq('id', editingItem.id);
        } else {
          await supabase.from('service_case_studies').insert(data);
        }
      } else if (editingType === 'stat') {
        data = {
          service_type: serviceType,
          ...statForm,
          is_active: true
        };

        if (editingItem?.id) {
          await supabase.from('service_stats').update(data).eq('id', editingItem.id);
        } else {
          await supabase.from('service_stats').insert(data);
        }
      } else if (editingType === 'review') {
        data = {
          service_type: serviceType,
          ...reviewForm,
          is_active: true
        };

        if (editingItem?.id) {
          await supabase.from('service_reviews').update(data).eq('id', editingItem.id);
        } else {
          await supabase.from('service_reviews').insert(data);
        }
      }

      toast.success(`${editingType} saved successfully`);
      setEditingType(null);
      setEditingItem(null);
      window.location.reload(); // Refresh to see changes
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save changes');
    }
  };

  const handleDelete = async (type: 'case-study' | 'stat' | 'review', id: string) => {
    try {
      if (type === 'case-study') {
        await supabase.from('service_case_studies').delete().eq('id', id);
      } else if (type === 'stat') {
        await supabase.from('service_stats').delete().eq('id', id);
      } else if (type === 'review') {
        await supabase.from('service_reviews').delete().eq('id', id);
      }

      toast.success(`${type} deleted successfully`);
      window.location.reload(); // Refresh to see changes
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Failed to delete item');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold capitalize">
                {serviceType.replace('-', ' ')} - Service Data Editor
              </h2>
              <p className="text-gray-600">
                Edit stats, case studies, and reviews in real-time
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </Button>
              <Button variant="outline" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          {!editingType ? (
            <Tabs defaultValue="stats" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stats">Stats ({stats.length}/4)</TabsTrigger>
                <TabsTrigger value="case-studies">Case Studies ({caseStudies.length}/8)</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({reviews.length}/6)</TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Statistics</h3>
                  <Button onClick={() => handleEdit('stat')} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stat
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {stats.map((stat) => (
                    <Card key={stat.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={stat.is_active ? 'default' : 'secondary'}>
                            {stat.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit('stat', stat)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete('stat', stat.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <h4 className="font-semibold text-lg">{stat.stat_value}</h4>
                        <p className="text-sm font-medium">{stat.stat_label}</p>
                        <p className="text-xs text-gray-500">{stat.stat_description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="case-studies" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Case Studies</h3>
                  <Button onClick={() => handleEdit('case-study')} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Case Study
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {caseStudies.map((study) => (
                    <Card key={study.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={study.is_active ? 'default' : 'secondary'}>
                            {study.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit('case-study', study)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete('case-study', study.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <h4 className="font-semibold">{study.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{study.client_name} - {study.industry}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">{study.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Reviews</h3>
                  <Button onClick={() => handleEdit('review')} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Review
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {reviews.map((review) => (
                    <Card key={review.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={review.is_active ? 'default' : 'secondary'}>
                            {review.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit('review', review)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete('review', review.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <h4 className="font-semibold">{review.client_name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{review.company} - {review.rating}/5 stars</p>
                        <p className="text-xs text-gray-500 line-clamp-2">{review.review_text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold capitalize">
                  {editingItem ? 'Edit' : 'Add'} {editingType?.replace('-', ' ')}
                </h3>
                <Button variant="outline" onClick={() => setEditingType(null)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>

              {editingType === 'stat' && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Stat Label</Label>
                    <Input
                      value={statForm.stat_label}
                      onChange={(e) => setStatForm(prev => ({ ...prev, stat_label: e.target.value }))}
                      placeholder="e.g., Average ROI Increase"
                    />
                  </div>
                  <div>
                    <Label>Stat Value</Label>
                    <Input
                      value={statForm.stat_value}
                      onChange={(e) => setStatForm(prev => ({ ...prev, stat_value: e.target.value }))}
                      placeholder="e.g., 450%"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={statForm.stat_description}
                      onChange={(e) => setStatForm(prev => ({ ...prev, stat_description: e.target.value }))}
                      placeholder="Brief description of the statistic"
                    />
                  </div>
                  <div>
                    <Label>Icon Name</Label>
                    <Input
                      value={statForm.icon_name}
                      onChange={(e) => setStatForm(prev => ({ ...prev, icon_name: e.target.value }))}
                      placeholder="e.g., TrendingUp"
                    />
                  </div>
                  <div>
                    <Label>Sort Order</Label>
                    <Input
                      type="number"
                      value={statForm.sort_order}
                      onChange={(e) => setStatForm(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              )}

              {editingType === 'case-study' && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={caseStudyForm.title}
                      onChange={(e) => setCaseStudyForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Case study title"
                    />
                  </div>
                  <div>
                    <Label>Client Name</Label>
                    <Input
                      value={caseStudyForm.client_name}
                      onChange={(e) => setCaseStudyForm(prev => ({ ...prev, client_name: e.target.value }))}
                      placeholder="Client company name"
                    />
                  </div>
                  <div>
                    <Label>Industry</Label>
                    <Input
                      value={caseStudyForm.industry}
                      onChange={(e) => setCaseStudyForm(prev => ({ ...prev, industry: e.target.value }))}
                      placeholder="e.g., E-commerce"
                    />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={caseStudyForm.image_url}
                      onChange={(e) => setCaseStudyForm(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={caseStudyForm.description}
                      onChange={(e) => setCaseStudyForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Detailed case study description"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={caseStudyForm.is_featured}
                      onCheckedChange={(checked) => setCaseStudyForm(prev => ({ ...prev, is_featured: checked }))}
                    />
                    <Label>Featured</Label>
                  </div>
                  <div>
                    <Label>Sort Order</Label>
                    <Input
                      type="number"
                      value={caseStudyForm.sort_order}
                      onChange={(e) => setCaseStudyForm(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              )}

              {editingType === 'review' && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Client Name</Label>
                    <Input
                      value={reviewForm.client_name}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, client_name: e.target.value }))}
                      placeholder="Client full name"
                    />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={reviewForm.company}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <Select
                      value={reviewForm.rating.toString()}
                      onValueChange={(value) => setReviewForm(prev => ({ ...prev, rating: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(rating => (
                          <SelectItem key={rating} value={rating.toString()}>
                            {rating} Star{rating !== 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Avatar URL</Label>
                    <Input
                      value={reviewForm.avatar_url}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, avatar_url: e.target.value }))}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Review Text</Label>
                    <Textarea
                      value={reviewForm.review_text}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, review_text: e.target.value }))}
                      placeholder="Client testimonial"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Results Achieved</Label>
                    <Input
                      value={reviewForm.results_achieved}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, results_achieved: e.target.value }))}
                      placeholder="e.g., 300% revenue increase, 50% cost reduction"
                    />
                  </div>
                  <div>
                    <Label>Sort Order</Label>
                    <Input
                      type="number"
                      value={reviewForm.sort_order}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingType(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save {editingType?.replace('-', ' ')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDataEditor;
