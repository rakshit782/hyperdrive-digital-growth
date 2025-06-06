
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Globe, Image, Tag, FileText, Save, Eye, Plus, Edit, Trash2 } from "lucide-react";

interface SEOSettings {
  id: string;
  page: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  canonicalUrl: string;
  isActive: boolean;
}

const defaultPages = [
  { value: '/', label: 'Home' },
  { value: '/about', label: 'About' },
  { value: '/contact', label: 'Contact' },
  { value: '/services', label: 'Services' },
  { value: '/pricing', label: 'Pricing' },
  { value: '/case-studies', label: 'Case Studies' },
  { value: '/blog', label: 'Blog' },
  { value: '/free-audit', label: 'Free Audit' },
  { value: '/amazon-advertising', label: 'Amazon Advertising' },
  { value: '/walmart-advertising', label: 'Walmart Advertising' },
  { value: '/meta-advertising', label: 'Meta Advertising' },
];

const WebsiteSEOTab = () => {
  const [seoSettings, setSeoSettings] = useState<SEOSettings[]>([]);
  const [editingSEO, setEditingSEO] = useState<SEOSettings | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string>('');

  useEffect(() => {
    const savedSEO = localStorage.getItem('seoSettings');
    if (savedSEO) {
      try {
        setSeoSettings(JSON.parse(savedSEO));
      } catch (error) {
        console.error('Failed to parse SEO settings:', error);
      }
    }
  }, []);

  const saveSEOSettings = (newSettings: SEOSettings[]) => {
    setSeoSettings(newSettings);
    localStorage.setItem('seoSettings', JSON.stringify(newSettings));
    
    // Dispatch event to update SEO on the frontend
    const event = new CustomEvent('seoSettingsUpdated', { detail: newSettings });
    window.dispatchEvent(event);
  };

  const addNewSEO = () => {
    if (!selectedPage) return;

    const newSEO: SEOSettings = {
      id: `seo-${Date.now()}`,
      page: selectedPage,
      title: '',
      description: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
      canonicalUrl: '',
      isActive: true
    };
    setEditingSEO(newSEO);
    setIsAddingNew(true);
  };

  const saveSEO = () => {
    if (!editingSEO) return;

    if (isAddingNew) {
      saveSEOSettings([...seoSettings, editingSEO]);
    } else {
      saveSEOSettings(seoSettings.map(s => s.id === editingSEO.id ? editingSEO : s));
    }
    
    setEditingSEO(null);
    setIsAddingNew(false);
    setSelectedPage('');
  };

  const deleteSEO = (id: string) => {
    saveSEOSettings(seoSettings.filter(s => s.id !== id));
  };

  const toggleSEOStatus = (id: string) => {
    saveSEOSettings(seoSettings.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const getPageLabel = (page: string) => {
    return defaultPages.find(p => p.value === page)?.label || page;
  };

  const availablePages = defaultPages.filter(page => 
    !seoSettings.some(seo => seo.page === page.value)
  );

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Website SEO Management</CardTitle>
                <CardDescription>Optimize your website's SEO and social media presence</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                  {availablePages.map((page) => (
                    <SelectItem key={page.value} value={page.value}>
                      {page.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={addNewSEO} 
                disabled={!selectedPage}
                className="bg-gradient-to-r from-green-500 to-emerald-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add SEO
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seoSettings.map((seo) => (
              <Card key={seo.id} className="bg-white/50 border border-gray-200/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-slate-900">{getPageLabel(seo.page)}</h4>
                      <Badge variant={seo.isActive ? "default" : "secondary"}>
                        {seo.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {seo.title && (
                        <Badge variant="outline">
                          <FileText className="w-3 h-3 mr-1" />
                          Title Set
                        </Badge>
                      )}
                      {seo.ogImage && (
                        <Badge variant="outline">
                          <Image className="w-3 h-3 mr-1" />
                          OG Image
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSEOStatus(seo.id)}
                      >
                        {seo.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingSEO(seo)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteSEO(seo.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {seo.title && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Title: </span>
                        <span className="text-sm text-gray-900">{seo.title}</span>
                      </div>
                    )}
                    {seo.description && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Description: </span>
                        <span className="text-sm text-gray-900">{seo.description.substring(0, 100)}...</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {seoSettings.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No SEO settings configured yet.</p>
                <p className="text-sm">Select a page and click "Add SEO" to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit SEO Modal */}
      {editingSEO && (
        <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{isAddingNew ? 'Add SEO Settings' : 'Edit SEO Settings'} - {getPageLabel(editingSEO.page)}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingSEO(null);
                  setIsAddingNew(false);
                  setSelectedPage('');
                }}
              >
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic SEO */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Basic SEO
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={editingSEO.title}
                  onChange={(e) => setEditingSEO({ ...editingSEO, title: e.target.value })}
                  placeholder="Enter page title (60 characters recommended)"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500">{editingSEO.title.length}/60 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <Textarea
                  id="description"
                  value={editingSEO.description}
                  onChange={(e) => setEditingSEO({ ...editingSEO, description: e.target.value })}
                  placeholder="Enter meta description (160 characters recommended)"
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-gray-500">{editingSEO.description.length}/160 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Meta Keywords</Label>
                <Input
                  id="keywords"
                  value={editingSEO.keywords}
                  onChange={(e) => setEditingSEO({ ...editingSEO, keywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  value={editingSEO.canonicalUrl}
                  onChange={(e) => setEditingSEO({ ...editingSEO, canonicalUrl: e.target.value })}
                  placeholder="https://yourdomain.com/page"
                />
              </div>
            </div>

            {/* Open Graph */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Open Graph (Facebook)
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="ogTitle">OG Title</Label>
                <Input
                  id="ogTitle"
                  value={editingSEO.ogTitle}
                  onChange={(e) => setEditingSEO({ ...editingSEO, ogTitle: e.target.value })}
                  placeholder="Title for social media sharing"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogDescription">OG Description</Label>
                <Textarea
                  id="ogDescription"
                  value={editingSEO.ogDescription}
                  onChange={(e) => setEditingSEO({ ...editingSEO, ogDescription: e.target.value })}
                  placeholder="Description for social media sharing"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">OG Image URL</Label>
                <Input
                  id="ogImage"
                  value={editingSEO.ogImage}
                  onChange={(e) => setEditingSEO({ ...editingSEO, ogImage: e.target.value })}
                  placeholder="https://yourdomain.com/image.jpg"
                />
              </div>
            </div>

            {/* Twitter Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Twitter Cards
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="twitterTitle">Twitter Title</Label>
                <Input
                  id="twitterTitle"
                  value={editingSEO.twitterTitle}
                  onChange={(e) => setEditingSEO({ ...editingSEO, twitterTitle: e.target.value })}
                  placeholder="Title for Twitter sharing"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterDescription">Twitter Description</Label>
                <Textarea
                  id="twitterDescription"
                  value={editingSEO.twitterDescription}
                  onChange={(e) => setEditingSEO({ ...editingSEO, twitterDescription: e.target.value })}
                  placeholder="Description for Twitter sharing"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterImage">Twitter Image URL</Label>
                <Input
                  id="twitterImage"
                  value={editingSEO.twitterImage}
                  onChange={(e) => setEditingSEO({ ...editingSEO, twitterImage: e.target.value })}
                  placeholder="https://yourdomain.com/image.jpg"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingSEO(null);
                  setIsAddingNew(false);
                  setSelectedPage('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={saveSEO} className="bg-gradient-to-r from-green-500 to-emerald-600">
                <Save className="w-4 h-4 mr-2" />
                Save SEO Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WebsiteSEOTab;
