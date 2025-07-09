
import React, { useState } from 'react';
import { useSEOData, SEOPage } from '@/hooks/useSEOData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit, Plus, Search, Eye, AlertTriangle } from 'lucide-react';

const SCHEMA_TYPES = [
  { value: 'WebPage', label: 'Web Page' },
  { value: 'Article', label: 'Article' },
  { value: 'Product', label: 'Product' },
  { value: 'Organization', label: 'Organization' },
  { value: 'LocalBusiness', label: 'Local Business' },
  { value: 'FAQ', label: 'FAQ Page' },
  { value: 'BreadcrumbList', label: 'Breadcrumb List' }
];

const DEFAULT_PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/about', name: 'About Us' },
  { path: '/contact', name: 'Contact' },
  { path: '/services', name: 'Services' },
  { path: '/blog', name: 'Blog' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/free-audit', name: 'Free Audit' }
];

const SEOManagement = () => {
  const { pages, globalSettings, loading, createPage, updatePage, deletePage, updateGlobalSetting } = useSEOData();
  const [selectedPage, setSelectedPage] = useState<SEOPage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pages');
  const [formData, setFormData] = useState({
    page_path: '',
    page_name: '',
    title_tag: '',
    meta_description: '',
    canonical_url: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    schema_type: 'WebPage',
    schema_data: {},
    robots_index: true,
    robots_follow: true,
    include_in_sitemap: true,
    is_active: true
  });

  const filteredPages = pages.filter(page => 
    page.page_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.page_path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (page: SEOPage) => {
    setSelectedPage(page);
    setFormData({
      page_path: page.page_path,
      page_name: page.page_name,
      title_tag: page.title_tag || '',
      meta_description: page.meta_description || '',
      canonical_url: page.canonical_url || '',
      og_title: page.og_title || '',
      og_description: page.og_description || '',
      og_image: page.og_image || '',
      twitter_title: page.twitter_title || '',
      twitter_description: page.twitter_description || '',
      twitter_image: page.twitter_image || '',
      schema_type: page.schema_type,
      schema_data: page.schema_data || {},
      robots_index: page.robots_index,
      robots_follow: page.robots_follow,
      include_in_sitemap: page.include_in_sitemap,
      is_active: page.is_active
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedPage(null);
    setFormData({
      page_path: '',
      page_name: '',
      title_tag: '',
      meta_description: '',
      canonical_url: '',
      og_title: '',
      og_description: '',
      og_image: '',
      twitter_title: '',
      twitter_description: '',
      twitter_image: '',
      schema_type: 'WebPage',
      schema_data: {},
      robots_index: true,
      robots_follow: true,
      include_in_sitemap: true,
      is_active: true
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (selectedPage) {
        await updatePage(selectedPage.id, formData);
      } else {
        await createPage(formData);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving SEO page:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this SEO page?')) {
      await deletePage(id);
    }
  };

  const getCharacterCount = (text: string, type: 'title' | 'description') => {
    const limits = { title: 60, description: 160 };
    const count = text.length;
    const limit = limits[type];
    return {
      count,
      limit,
      isOver: count > limit,
      isGood: count >= (type === 'title' ? 50 : 120) && count <= limit
    };
  };

  const renderSearchPreview = () => {
    if (!formData.title_tag && !formData.meta_description) return null;

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-sm">Search Result Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-white">
            <div className="text-blue-600 text-lg hover:underline cursor-pointer">
              {formData.title_tag || 'Page Title'}
            </div>
            <div className="text-green-700 text-sm">
              {formData.canonical_url || 'https://yourdomain.com' + formData.page_path}
            </div>
            <div className="text-gray-600 text-sm mt-1">
              {formData.meta_description || 'Meta description will appear here...'}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">SEO Management</h2>
          <p className="text-muted-foreground">Manage SEO settings for all pages</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pages">Page SEO</TabsTrigger>
          <TabsTrigger value="global">Global Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Add Page
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredPages.map((page) => {
              const titleCheck = getCharacterCount(page.title_tag || '', 'title');
              const descCheck = getCharacterCount(page.meta_description || '', 'description');

              return (
                <Card key={page.id} className={`${!page.is_active ? 'opacity-60' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{page.page_name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {page.page_path}
                          </Badge>
                          <Badge variant={page.is_active ? "default" : "secondary"} className="text-xs">
                            {page.is_active ? "Active" : "Inactive"}
                          </Badge>
                          {(!page.title_tag || titleCheck.isOver) && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Title Issue
                            </Badge>
                          )}
                          {(!page.meta_description || descCheck.isOver) && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Description Issue
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(page)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(page.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium">Title Tag</p>
                        <p className="text-sm text-muted-foreground">
                          {page.title_tag || 'No title set'} 
                          {page.title_tag && (
                            <span className={`ml-2 ${titleCheck.isOver ? 'text-red-500' : titleCheck.isGood ? 'text-green-500' : 'text-yellow-500'}`}>
                              ({titleCheck.count}/{titleCheck.limit})
                            </span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Meta Description</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {page.meta_description || 'No description set'}
                          {page.meta_description && (
                            <span className={`ml-2 ${descCheck.isOver ? 'text-red-500' : descCheck.isGood ? 'text-green-500' : 'text-yellow-500'}`}>
                              ({descCheck.count}/{descCheck.limit})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Add Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Add Pages</CardTitle>
              <CardDescription>Add common pages that might be missing from your SEO setup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {DEFAULT_PAGES.filter(defaultPage => 
                  !pages.some(page => page.page_path === defaultPage.path)
                ).map((defaultPage) => (
                  <Button
                    key={defaultPage.path}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPage(null);
                      setFormData({
                        ...formData,
                        page_path: defaultPage.path,
                        page_name: defaultPage.name,
                        canonical_url: `https://yourdomain.com${defaultPage.path}`
                      });
                      setIsDialogOpen(true);
                    }}
                  >
                    Add {defaultPage.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global SEO Settings</CardTitle>
              <CardDescription>Configure site-wide SEO settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Robots.txt Content</Label>
                <Textarea
                  value={globalSettings.find(s => s.setting_key === 'robots_txt')?.setting_value?.content || ''}
                  onChange={(e) => updateGlobalSetting('robots_txt', { content: e.target.value })}
                  rows={6}
                  placeholder="User-agent: *&#10;Allow: /&#10;Sitemap: https://yourdomain.com/sitemap.xml"
                />
              </div>
              <div className="space-y-2">
                <Label>XML Sitemap URL</Label>
                <Input
                  value={globalSettings.find(s => s.setting_key === 'sitemap_url')?.setting_value?.url || ''}
                  onChange={(e) => updateGlobalSetting('sitemap_url', { url: e.target.value })}
                  placeholder="https://yourdomain.com/sitemap.xml"
                />
              </div>
              <div className="space-y-2">
                <Label>Google Site Verification Code</Label>
                <Input
                  value={globalSettings.find(s => s.setting_key === 'google_site_verification')?.setting_value?.code || ''}
                  onChange={(e) => updateGlobalSetting('google_site_verification', { code: e.target.value })}
                  placeholder="Enter Google Search Console verification code"
                />
              </div>
              <div className="space-y-2">
                <Label>Default Open Graph Image</Label>
                <Input
                  value={globalSettings.find(s => s.setting_key === 'default_og_image')?.setting_value?.url || ''}
                  onChange={(e) => updateGlobalSetting('default_og_image', { url: e.target.value })}
                  placeholder="https://yourdomain.com/default-og-image.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedPage ? 'Edit SEO Page' : 'Create SEO Page'}
            </DialogTitle>
            <DialogDescription>
              Configure SEO settings for this page
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic SEO</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="schema">Schema Markup</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Page Path</Label>
                  <Input
                    value={formData.page_path}
                    onChange={(e) => setFormData(prev => ({ ...prev, page_path: e.target.value }))}
                    placeholder="/example-page"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Page Name</Label>
                  <Input
                    value={formData.page_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, page_name: e.target.value }))}
                    placeholder="Example Page"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Title Tag</Label>
                <Input
                  value={formData.title_tag}
                  onChange={(e) => setFormData(prev => ({ ...prev, title_tag: e.target.value }))}
                  placeholder="Page Title | Your Brand"
                />
                {formData.title_tag && (
                  <p className={`text-sm ${getCharacterCount(formData.title_tag, 'title').isOver ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {getCharacterCount(formData.title_tag, 'title').count}/60 characters (50-60 recommended)
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="Brief description of the page content..."
                  rows={3}
                />
                {formData.meta_description && (
                  <p className={`text-sm ${getCharacterCount(formData.meta_description, 'description').isOver ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {getCharacterCount(formData.meta_description, 'description').count}/160 characters (120-160 recommended)
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Canonical URL</Label>
                <Input
                  value={formData.canonical_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, canonical_url: e.target.value }))}
                  placeholder="https://yourdomain.com/page"
                />
              </div>

              {renderSearchPreview()}
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Open Graph (Facebook, LinkedIn)</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>OG Title</Label>
                      <Input
                        value={formData.og_title}
                        onChange={(e) => setFormData(prev => ({ ...prev, og_title: e.target.value }))}
                        placeholder="Title for social media sharing"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>OG Description</Label>
                      <Textarea
                        value={formData.og_description}
                        onChange={(e) => setFormData(prev => ({ ...prev, og_description: e.target.value }))}
                        placeholder="Description for social media sharing"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>OG Image URL</Label>
                      <Input
                        value={formData.og_image}
                        onChange={(e) => setFormData(prev => ({ ...prev, og_image: e.target.value }))}
                        placeholder="https://yourdomain.com/og-image.jpg"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Twitter Card</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Twitter Title</Label>
                      <Input
                        value={formData.twitter_title}
                        onChange={(e) => setFormData(prev => ({ ...prev, twitter_title: e.target.value }))}
                        placeholder="Title for Twitter sharing"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Twitter Description</Label>
                      <Textarea
                        value={formData.twitter_description}
                        onChange={(e) => setFormData(prev => ({ ...prev, twitter_description: e.target.value }))}
                        placeholder="Description for Twitter sharing"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Twitter Image URL</Label>
                      <Input
                        value={formData.twitter_image}
                        onChange={(e) => setFormData(prev => ({ ...prev, twitter_image: e.target.value }))}
                        placeholder="https://yourdomain.com/twitter-image.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schema" className="space-y-4">
              <div className="space-y-2">
                <Label>Schema Type</Label>
                <Select
                  value={formData.schema_type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, schema_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SCHEMA_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Schema Data (JSON)</Label>
                <Textarea
                  value={JSON.stringify(formData.schema_data, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setFormData(prev => ({ ...prev, schema_data: parsed }));
                    } catch {
                      // Invalid JSON, don't update
                    }
                  }}
                  placeholder='{"@context": "https://schema.org", "@type": "WebPage"}'
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.robots_index}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, robots_index: checked }))}
                  />
                  <Label>Allow search engines to index this page</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.robots_follow}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, robots_follow: checked }))}
                  />
                  <Label>Allow search engines to follow links on this page</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.include_in_sitemap}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, include_in_sitemap: checked }))}
                  />
                  <Label>Include this page in XML sitemap</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                  />
                  <Label>Page is active</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {selectedPage ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SEOManagement;
