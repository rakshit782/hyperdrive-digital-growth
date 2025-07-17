
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Tag,
  Search,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseData, BlogPost, FAQ, PricingPlan } from "@/hooks/useSupabaseData";

const ContentManagementTab = () => {
  const { useBlogPosts, useFAQs, usePricingPlans } = useSupabaseData();
  const { posts, createPost, updatePost, deletePost } = useBlogPosts();
  const { faqs, createFAQ, updateFAQ, deleteFAQ } = useFAQs();
  const { plans, createPlan, updatePlan, deletePlan } = usePricingPlans();
  
  const [activeTab, setActiveTab] = useState('blog');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  // Blog post form data
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft' as const,
    tags: [] as string[],
    meta_title: '',
    meta_description: ''
  });

  // FAQ form data  
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: '',
    is_active: true,
    sort_order: 0
  });

  // Pricing form data
  const [pricingForm, setPricingForm] = useState({
    name: '',
    description: '',
    price: 0,
    billing_period: 'monthly' as const,
    features: [] as string[],
    is_popular: false,
    is_active: true,
    sort_order: 0
  });

  const resetForms = () => {
    setBlogForm({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      status: 'draft',
      tags: [],
      meta_title: '',
      meta_description: ''
    });
    setFaqForm({
      question: '',
      answer: '',
      category: '',
      is_active: true,
      sort_order: 0
    });
    setPricingForm({
      name: '',
      description: '',
      price: 0,
      billing_period: 'monthly',
      features: [],
      is_popular: false,
      is_active: true,
      sort_order: 0
    });
    setEditingItem(null);
  };

  const handleSaveBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      const postData = { ...blogForm, slug };
      
      if (editingItem) {
        await updatePost(editingItem.id, postData);
      } else {
        await createPost(postData);
      }
      
      resetForms();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving blog post:', error);
    }
  };

  const handleSaveFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateFAQ(editingItem.id, faqForm);
      } else {
        await createFAQ(faqForm);
      }
      
      resetForms();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updatePlan(editingItem.id, pricingForm);
      } else {
        await createPlan(pricingForm);
      }
      
      resetForms();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving pricing plan:', error);
    }
  };

  const handleEdit = (item: any, type: string) => {
    setEditingItem(item);
    
    if (type === 'blog') {
      setBlogForm({
        title: item.title,
        slug: item.slug,
        content: item.content || '',
        excerpt: item.excerpt || '',
        status: item.status,
        tags: item.tags || [],
        meta_title: item.meta_title || '',
        meta_description: item.meta_description || ''
      });
    } else if (type === 'faq') {
      setFaqForm({
        question: item.question,
        answer: item.answer,
        category: item.category || '',
        is_active: item.is_active,
        sort_order: item.sort_order
      });
    } else if (type === 'pricing') {
      setPricingForm({
        name: item.name,
        description: item.description || '',
        price: item.price,
        billing_period: item.billing_period,
        features: item.features || [],
        is_popular: item.is_popular,
        is_active: item.is_active,
        sort_order: item.sort_order
      });
    }
    
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string, type: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (type === 'blog') {
          await deletePost(id);
        } else if (type === 'faq') {
          await deleteFAQ(id);
        } else if (type === 'pricing') {
          await deletePlan(id);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const addFeature = (newFeature: string) => {
    if (newFeature.trim()) {
      setPricingForm({
        ...pricingForm,
        features: [...pricingForm.features, newFeature.trim()]
      });
    }
  };

  const removeFeature = (index: number) => {
    setPricingForm({
      ...pricingForm,
      features: pricingForm.features.filter((_, i) => i !== index)
    });
  };

  const addTag = (newTag: string) => {
    if (newTag.trim() && !blogForm.tags.includes(newTag.trim())) {
      setBlogForm({
        ...blogForm,
        tags: [...blogForm.tags, newTag.trim()]
      });
    }
  };

  const removeTag = (index: number) => {
    setBlogForm({
      ...blogForm,
      tags: blogForm.tags.filter((_, i) => i !== index)
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg mr-3">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Content Management</CardTitle>
                <CardDescription>Manage your website's blog posts, FAQs, and pricing</CardDescription>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForms} className="bg-gradient-to-r from-green-600 to-teal-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Content
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? 'Edit' : 'Add'} {activeTab === 'blog' ? 'Blog Post' : activeTab === 'faq' ? 'FAQ' : 'Pricing Plan'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingItem ? 'Update' : 'Create'} your {activeTab === 'blog' ? 'blog post' : activeTab === 'faq' ? 'FAQ' : 'pricing plan'}
                  </DialogDescription>
                </DialogHeader>

                {/* Blog Post Form */}
                {activeTab === 'blog' && (
                  <form onSubmit={handleSaveBlogPost} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                          id="slug"
                          value={blogForm.slug}
                          onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                          placeholder="auto-generated from title"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        rows={6}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={blogForm.status} onValueChange={(value: any) => setBlogForm({ ...blogForm, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tags">Tags</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {blogForm.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <button type="button" onClick={() => removeTag(index)} className="ml-1 text-xs">×</button>
                            </Badge>
                          ))}
                        </div>
                        <Input
                          placeholder="Add tag and press Enter"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTag(e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="meta_title">Meta Title</Label>
                        <Input
                          id="meta_title"
                          value={blogForm.meta_title}
                          onChange={(e) => setBlogForm({ ...blogForm, meta_title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="meta_description">Meta Description</Label>
                        <Input
                          id="meta_description"
                          value={blogForm.meta_description}
                          onChange={(e) => setBlogForm({ ...blogForm, meta_description: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gradient-to-r from-green-600 to-teal-600">
                        {editingItem ? 'Update' : 'Create'} Post
                      </Button>
                    </div>
                  </form>
                )}

                {/* FAQ Form */}
                {activeTab === 'faq' && (
                  <form onSubmit={handleSaveFAQ} className="space-y-4">
                    <div>
                      <Label htmlFor="question">Question *</Label>
                      <Input
                        id="question"
                        value={faqForm.question}
                        onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="answer">Answer *</Label>
                      <Textarea
                        id="answer"
                        value={faqForm.answer}
                        onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={faqForm.category}
                          onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                          placeholder="General, Pricing, Services, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor="sort_order">Sort Order</Label>
                        <Input
                          id="sort_order"
                          type="number"
                          value={faqForm.sort_order}
                          onChange={(e) => setFaqForm({ ...faqForm, sort_order: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gradient-to-r from-green-600 to-teal-600">
                        {editingItem ? 'Update' : 'Create'} FAQ
                      </Button>
                    </div>
                  </form>
                )}

                {/* Pricing Form */}
                {activeTab === 'pricing' && (
                  <form onSubmit={handleSavePricing} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Plan Name *</Label>
                        <Input
                          id="name"
                          value={pricingForm.name}
                          onChange={(e) => setPricingForm({ ...pricingForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Price *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={pricingForm.price}
                          onChange={(e) => setPricingForm({ ...pricingForm, price: parseFloat(e.target.value) || 0 })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={pricingForm.description}
                        onChange={(e) => setPricingForm({ ...pricingForm, description: e.target.value })}
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billing_period">Billing Period</Label>
                        <Select value={pricingForm.billing_period} onValueChange={(value: any) => setPricingForm({ ...pricingForm, billing_period: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                            <SelectItem value="one-time">One-time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="sort_order">Sort Order</Label>
                        <Input
                          id="sort_order"
                          type="number"
                          value={pricingForm.sort_order}
                          onChange={(e) => setPricingForm({ ...pricingForm, sort_order: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Features</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {pricingForm.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {feature}
                            <button type="button" onClick={() => removeFeature(index)} className="ml-1 text-xs">×</button>
                          </Badge>
                        ))}
                      </div>
                      <Input
                        placeholder="Add feature and press Enter"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addFeature(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={pricingForm.is_popular}
                          onChange={(e) => setPricingForm({ ...pricingForm, is_popular: e.target.checked })}
                        />
                        <span>Popular Plan</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={pricingForm.is_active}
                          onChange={(e) => setPricingForm({ ...pricingForm, is_active: e.target.checked })}
                        />
                        <span>Active</span>
                      </label>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gradient-to-r from-green-600 to-teal-600">
                        {editingItem ? 'Update' : 'Create'} Plan
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
              <TabsTrigger value="pricing">Pricing Plans</TabsTrigger>
            </TabsList>

            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {activeTab === 'blog' && (
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Posts</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <TabsContent value="blog" className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{post.title}</h3>
                            <Badge className={
                              post.status === 'published' ? 'bg-green-100 text-green-800' :
                              post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {post.status}
                            </Badge>
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex gap-1">
                                {post.tags.slice(0, 3).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          {post.excerpt && (
                            <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.created_at).toLocaleDateString()}
                            </div>
                            <div>/{post.slug}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(post, 'blog')}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(post.id, 'blog')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No blog posts found</h3>
                  <p className="text-gray-600 mb-4">Create your first blog post to get started</p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Blog Post
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="faq" className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => (
                  <Card key={faq.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                            {faq.category && (
                              <Badge variant="outline" className="text-xs">
                                {faq.category}
                              </Badge>
                            )}
                            <Badge className={faq.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {faq.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{faq.answer}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(faq, 'faq')}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(faq.id, 'faq')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs found</h3>
                  <p className="text-gray-600 mb-4">Create your first FAQ to help your customers</p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create FAQ
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => (
                  <Card key={plan.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                            <Badge variant="outline" className="text-lg font-bold">
                              ${plan.price}/{plan.billing_period === 'one-time' ? 'once' : plan.billing_period.slice(0, -2)}
                            </Badge>
                            {plan.is_popular && (
                              <Badge className="bg-purple-100 text-purple-800">Popular</Badge>
                            )}
                            <Badge className={plan.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {plan.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          {plan.description && (
                            <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {plan.features.slice(0, 5).map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {plan.features.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{plan.features.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(plan, 'pricing')}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(plan.id, 'pricing')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No pricing plans found</h3>
                  <p className="text-gray-600 mb-4">Create your first pricing plan</p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Pricing Plan
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagementTab;
