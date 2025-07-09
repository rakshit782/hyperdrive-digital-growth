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
import { Plus, Edit, Trash2, Save, X, Eye, Database, Star, Users, BarChart3 } from 'lucide-react';
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
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-700 font-medium">Loading service data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl border">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold capitalize">
                  {serviceType.replace('-', ' ')} Data Editor
                </h2>
                <p className="text-blue-100 mt-1">
                  Manage stats, case studies, and reviews in real-time
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(95vh - 140px)' }}>
          {!editingType ? (
            <div className="space-y-6">
              {/* Enhanced Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-900">{stats.length}/4</div>
                    <div className="text-sm text-blue-700">Statistics</div>
                  </CardContent>
                </Card>
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4 text-center">
                    <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-900">{caseStudies.length}/8</div>
                    <div className="text-sm text-green-700">Case Studies</div>
                  </CardContent>
                </Card>
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-900">{reviews.length}/6</div>
                    <div className="text-sm text-purple-700">Reviews</div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="stats" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger value="stats" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Statistics
                  </TabsTrigger>
                  <TabsTrigger value="case-studies" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Star className="w-4 h-4 mr-2" />
                    Case Studies
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Users className="w-4 h-4 mr-2" />
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="stats" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Statistics</h3>
                      <p className="text-gray-600">Manage your service statistics and performance metrics</p>
                    </div>
                    <Button 
                      onClick={() => handleEdit('stat')} 
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Statistic
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    {stats.map((stat) => (
                      <Card key={stat.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <Badge variant={stat.is_active ? 'default' : 'secondary'} className="text-xs">
                              {stat.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit('stat', stat)} className="h-8 w-8 p-0">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDelete('stat', stat.id)} className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-3xl font-bold text-blue-600 mb-2">{stat.stat_value}</div>
                          <h4 className="font-semibold text-gray-900 mb-2">{stat.stat_label}</h4>
                          <p className="text-sm text-gray-600">{stat.stat_description}</p>
                        </CardContent>
                      </Card>
                    ))}
                    {stats.length === 0 && (
                      <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">No statistics found</p>
                        <p className="text-gray-500 text-sm">Add your first statistic to get started</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="case-studies" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Case Studies</h3>
                      <p className="text-gray-600">Showcase your success stories and client achievements</p>
                    </div>
                    <Button 
                      onClick={() => handleEdit('case-study')} 
                      className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Case Study
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {caseStudies.map((study) => (
                      <Card key={study.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex gap-2">
                              <Badge variant={study.is_active ? 'default' : 'secondary'} className="text-xs">
                                {study.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                              {study.is_featured && (
                                <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-600">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit('case-study', study)} className="h-8 w-8 p-0">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDelete('case-study', study.id)} className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{study.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{study.client_name} • {study.industry}</p>
                          <p className="text-xs text-gray-500 line-clamp-3 mb-4">{study.description}</p>
                          {study.image_url && (
                            <div className="w-full h-24 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                              <img src={study.image_url} alt={study.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                    {caseStudies.length === 0 && (
                      <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">No case studies found</p>
                        <p className="text-gray-500 text-sm">Add your first case study to showcase your work</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Reviews</h3>
                      <p className="text-gray-600">Manage client testimonials and feedback</p>
                    </div>
                    <Button 
                      onClick={() => handleEdit('review')} 
                      className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Review
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {reviews.map((review) => (
                      <Card key={review.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <Badge variant={review.is_active ? 'default' : 'secondary'} className="text-xs">
                              {review.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit('review', review)} className="h-8 w-8 p-0">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDelete('review', review.id)} className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center mb-3">
                            {review.avatar_url ? (
                              <img src={review.avatar_url} alt={review.client_name} className="w-10 h-10 rounded-full mr-3" />
                            ) : (
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-purple-600 font-semibold">{review.client_name.charAt(0)}</span>
                              </div>
                            )}
                            <div>
                              <h4 className="font-semibold text-gray-900">{review.client_name}</h4>
                              <p className="text-sm text-gray-600">{review.company}</p>
                            </div>
                          </div>
                          <div className="flex text-yellow-400 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-3 mb-3">"{review.review_text}"</p>
                          {review.results_achieved && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                              <p className="text-xs text-green-800 font-medium">Results: {review.results_achieved}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                    {reviews.length === 0 && (
                      <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">No reviews found</p>
                        <p className="text-gray-500 text-sm">Add your first client review to build trust</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 capitalize">
                    {editingItem ? 'Edit' : 'Add'} {editingType?.replace('-', ' ')}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {editingItem ? 'Update the information below' : 'Fill in the details to create a new item'}
                  </p>
                </div>
                <Button variant="outline" onClick={() => setEditingType(null)} className="bg-white">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>

              <Card className="shadow-lg">
                <CardContent className="p-6">
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

                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <Button variant="outline" onClick={() => setEditingType(null)} className="px-6">
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave}
                      className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingItem ? 'Update' : 'Create'} {editingType?.replace('-', ' ')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDataEditor;
