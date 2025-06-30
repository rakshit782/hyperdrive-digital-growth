
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Eye,
  BarChart3,
  Star,
  FileText,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ServicePageCustomizerProps {
  serviceType: string;
  onClose: () => void;
}

interface StatBlock {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: string;
  isActive: boolean;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  results: Record<string, string>;
  isSelected: boolean;
}

interface Review {
  id: string;
  clientName: string;
  company: string;
  rating: number;
  reviewText: string;
  isSelected: boolean;
}

interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

const ServicePageCustomizer: React.FC<ServicePageCustomizerProps> = ({ serviceType, onClose }) => {
  const [statBlocks, setStatBlocks] = useState<StatBlock[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [whyChooseUsItems, setWhyChooseUsItems] = useState<WhyChooseUsItem[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<'stat' | 'case-study' | 'review' | 'why-choose-us' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadServiceData();
  }, [serviceType]);

  const loadServiceData = () => {
    // Load from localStorage or API
    const savedStats = localStorage.getItem(`service_stats_${serviceType}`);
    const savedCaseStudies = localStorage.getItem(`service_case_studies_${serviceType}`);
    const savedReviews = localStorage.getItem(`service_reviews_${serviceType}`);
    const savedWhyChooseUs = localStorage.getItem(`service_why_choose_us_${serviceType}`);

    if (savedStats) setStatBlocks(JSON.parse(savedStats));
    if (savedCaseStudies) setCaseStudies(JSON.parse(savedCaseStudies));
    if (savedReviews) setReviews(JSON.parse(savedReviews));
    if (savedWhyChooseUs) setWhyChooseUsItems(JSON.parse(savedWhyChooseUs));
  };

  const saveData = (type: string, data: any[]) => {
    localStorage.setItem(`service_${type}_${serviceType}`, JSON.stringify(data));
    toast({
      title: "Success",
      description: `${type} updated successfully`,
    });
  };

  const handleAddNew = (type: 'stat' | 'case-study' | 'review' | 'why-choose-us') => {
    const newItem = {
      id: Math.random().toString(36).substring(2, 15),
      isActive: true,
      isSelected: true,
    };

    switch (type) {
      case 'stat':
        setEditingItem({ ...newItem, label: '', value: '', description: '', icon: 'BarChart3' });
        break;
      case 'case-study':
        setEditingItem({ ...newItem, title: '', client: '', industry: '', description: '', results: {} });
        break;
      case 'review':
        setEditingItem({ ...newItem, clientName: '', company: '', rating: 5, reviewText: '' });
        break;
      case 'why-choose-us':
        setEditingItem({ ...newItem, title: '', description: '', icon: 'CheckCircle' });
        break;
    }
    setEditingType(type);
  };

  const handleSave = () => {
    if (!editingItem || !editingType) return;

    switch (editingType) {
      case 'stat':
        const newStats = editingItem.id ? 
          statBlocks.map(item => item.id === editingItem.id ? editingItem : item) :
          [...statBlocks, editingItem];
        setStatBlocks(newStats);
        saveData('stats', newStats);
        break;
      case 'case-study':
        const newCaseStudies = editingItem.id ? 
          caseStudies.map(item => item.id === editingItem.id ? editingItem : item) :
          [...caseStudies, editingItem];
        setCaseStudies(newCaseStudies);
        saveData('case_studies', newCaseStudies);
        break;
      case 'review':
        const newReviews = editingItem.id ? 
          reviews.map(item => item.id === editingItem.id ? editingItem : item) :
          [...reviews, editingItem];
        setReviews(newReviews);
        saveData('reviews', newReviews);
        break;
      case 'why-choose-us':
        const newWhyChooseUs = editingItem.id ? 
          whyChooseUsItems.map(item => item.id === editingItem.id ? editingItem : item) :
          [...whyChooseUsItems, editingItem];
        setWhyChooseUsItems(newWhyChooseUs);
        saveData('why_choose_us', newWhyChooseUs);
        break;
    }

    setEditingItem(null);
    setEditingType(null);
  };

  const handleDelete = (type: 'stat' | 'case-study' | 'review' | 'why-choose-us', id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    switch (type) {
      case 'stat':
        const filteredStats = statBlocks.filter(item => item.id !== id);
        setStatBlocks(filteredStats);
        saveData('stats', filteredStats);
        break;
      case 'case-study':
        const filteredCaseStudies = caseStudies.filter(item => item.id !== id);
        setCaseStudies(filteredCaseStudies);
        saveData('case_studies', filteredCaseStudies);
        break;
      case 'review':
        const filteredReviews = reviews.filter(item => item.id !== id);
        setReviews(filteredReviews);
        saveData('reviews', filteredReviews);
        break;
      case 'why-choose-us':
        const filteredWhyChooseUs = whyChooseUsItems.filter(item => item.id !== id);
        setWhyChooseUsItems(filteredWhyChooseUs);
        saveData('why_choose_us', filteredWhyChooseUs);
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
                  Manage stats, case studies, reviews, and features for your service page
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stats">Stat Blocks</TabsTrigger>
              <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>

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

            <TabsContent value="case-studies" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Case Studies</h3>
                <Button onClick={() => handleAddNew('case-study')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Case Study
                </Button>
              </div>

              <div className="grid gap-4">
                {caseStudies.map((caseStudy) => (
                  <Card key={caseStudy.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-green-600" />
                          <div>
                            <h4 className="font-semibold">{caseStudy.title}</h4>
                            <p className="text-sm text-gray-600">{caseStudy.client} - {caseStudy.industry}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={caseStudy.isSelected} 
                            onCheckedChange={(checked) => {
                              const updated = caseStudies.map(item => 
                                item.id === caseStudy.id ? { ...item, isSelected: checked } : item
                              );
                              setCaseStudies(updated);
                              saveData('case_studies', updated);
                            }}
                          />
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditingItem(caseStudy);
                            setEditingType('case-study');
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete('case-study', caseStudy.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <Button onClick={() => handleAddNew('review')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Review
                </Button>
              </div>

              <div className="grid gap-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Star className="w-5 h-5 text-yellow-600" />
                          <div>
                            <h4 className="font-semibold">{review.clientName}</h4>
                            <p className="text-sm text-gray-600">{review.company} - {review.rating}/5 stars</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={review.isSelected} 
                            onCheckedChange={(checked) => {
                              const updated = reviews.map(item => 
                                item.id === review.id ? { ...item, isSelected: checked } : item
                              );
                              setReviews(updated);
                              saveData('reviews', updated);
                            }}
                          />
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditingItem(review);
                            setEditingType('review');
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete('review', review.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Why Choose Us Features</h3>
                <Button onClick={() => handleAddNew('why-choose-us')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feature
                </Button>
              </div>

              <div className="grid gap-4">
                {whyChooseUsItems.map((feature) => (
                  <Card key={feature.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-purple-600" />
                          <div>
                            <h4 className="font-semibold">{feature.title}</h4>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={feature.isActive} 
                            onCheckedChange={(checked) => {
                              const updated = whyChooseUsItems.map(item => 
                                item.id === feature.id ? { ...item, isActive: checked } : item
                              );
                              setWhyChooseUsItems(updated);
                              saveData('why_choose_us', updated);
                            }}
                          />
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditingItem(feature);
                            setEditingType('why-choose-us');
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete('why-choose-us', feature.id)}>
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
        </CardContent>
      </Card>

      {/* Editing Modal */}
      {editingItem && editingType && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">
              {editingItem.id ? 'Edit' : 'Add New'} {editingType.replace('-', ' ').toUpperCase()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editingType === 'stat' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Label</Label>
                    <Input
                      value={editingItem.label || ''}
                      onChange={(e) => setEditingItem({...editingItem, label: e.target.value})}
                      placeholder="Conversion Rate"
                    />
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Input
                      value={editingItem.value || ''}
                      onChange={(e) => setEditingItem({...editingItem, value: e.target.value})}
                      placeholder="4.5x"
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    placeholder="Average improvement"
                  />
                </div>
              </>
            )}

            {editingType === 'case-study' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                      placeholder="Case Study Title"
                    />
                  </div>
                  <div>
                    <Label>Client</Label>
                    <Input
                      value={editingItem.client || ''}
                      onChange={(e) => setEditingItem({...editingItem, client: e.target.value})}
                      placeholder="Client Name"
                    />
                  </div>
                </div>
                <div>
                  <Label>Industry</Label>
                  <Input
                    value={editingItem.industry || ''}
                    onChange={(e) => setEditingItem({...editingItem, industry: e.target.value})}
                    placeholder="E-commerce"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    placeholder="Case study description"
                    rows={4}
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
                      value={editingItem.clientName || ''}
                      onChange={(e) => setEditingItem({...editingItem, clientName: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={editingItem.company || ''}
                      onChange={(e) => setEditingItem({...editingItem, company: e.target.value})}
                      placeholder="ABC Corp"
                    />
                  </div>
                </div>
                <div>
                  <Label>Rating</Label>
                  <Select 
                    value={editingItem.rating?.toString() || '5'}
                    onValueChange={(value) => setEditingItem({...editingItem, rating: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Review Text</Label>
                  <Textarea
                    value={editingItem.reviewText || ''}
                    onChange={(e) => setEditingItem({...editingItem, reviewText: e.target.value})}
                    placeholder="Review text"
                    rows={4}
                  />
                </div>
              </>
            )}

            {editingType === 'why-choose-us' && (
              <>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    placeholder="Feature Title"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    placeholder="Feature description"
                    rows={3}
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
              <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServicePageCustomizer;
