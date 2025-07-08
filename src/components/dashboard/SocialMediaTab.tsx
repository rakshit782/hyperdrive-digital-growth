
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Share2, Trash2, Plus } from "lucide-react";

interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
  icon: string;
}

const defaultSocialLinks: SocialMediaLink[] = [
  { id: "facebook", platform: "Facebook", url: "https://facebook.com/yourbusiness", isActive: true, icon: "Facebook" },
  { id: "instagram", platform: "Instagram", url: "https://instagram.com/yourbusiness", isActive: true, icon: "Instagram" },
  { id: "linkedin", platform: "LinkedIn", url: "https://linkedin.com/company/yourbusiness", isActive: true, icon: "Linkedin" },
  { id: "twitter", platform: "Twitter", url: "https://twitter.com/yourbusiness", isActive: true, icon: "Twitter" },
  { id: "youtube", platform: "YouTube", url: "https://youtube.com/@yourbusiness", isActive: true, icon: "Youtube" }
];

const SocialMediaTab = () => {
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>(defaultSocialLinks);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedLinks = localStorage.getItem('socialMediaLinks');
    if (savedLinks) {
      try {
        const parsed = JSON.parse(savedLinks);
        setSocialLinks(parsed);
      } catch (error) {
        console.error('Failed to parse social media links:', error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('socialMediaLinks', JSON.stringify(socialLinks));
    setIsSaved(true);
    
    window.dispatchEvent(new CustomEvent('socialMediaUpdated', { detail: socialLinks }));
    
    setTimeout(() => setIsSaved(false), 2000);
  };

  const updateLink = (id: string, field: keyof SocialMediaLink, value: string | boolean) => {
    setSocialLinks(prev => prev.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const deleteLink = (id: string) => {
    setSocialLinks(prev => prev.filter(link => link.id !== id));
  };

  const addNewLink = () => {
    const newLink: SocialMediaLink = {
      id: `custom-${Date.now()}`,
      platform: "Custom Platform",
      url: "https://example.com",
      isActive: true,
      icon: "Share2"
    };
    setSocialLinks(prev => [...prev, newLink]);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Facebook": return <Facebook className="w-5 h-5" />;
      case "Instagram": return <Instagram className="w-5 h-5" />;
      case "Linkedin": return <Linkedin className="w-5 h-5" />;
      case "Twitter": return <Twitter className="w-5 h-5" />;
      case "Youtube": return <Youtube className="w-5 h-5" />;
      default: return <Share2 className="w-5 h-5" />;
    }
  };

  const handleReset = () => {
    setSocialLinks(defaultSocialLinks);
    localStorage.removeItem('socialMediaLinks');
    window.dispatchEvent(new CustomEvent('socialMediaUpdated', { detail: defaultSocialLinks }));
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg mr-3">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">Social Media Links</CardTitle>
              <CardDescription>Manage your social media presence across the website</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleReset} variant="outline" className="bg-white/50">
              Reset to Defaults
            </Button>
            <Button onClick={addNewLink} variant="outline" className="bg-white/50">
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {socialLinks.map((link) => (
            <Card key={link.id} className="bg-white/50 border border-gray-200/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getIcon(link.icon)}
                    <h3 className="font-semibold">{link.platform}</h3>
                    <Badge variant={link.isActive ? "default" : "secondary"}>
                      {link.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={link.isActive}
                      onCheckedChange={(checked) => updateLink(link.id, 'isActive', checked)}
                    />
                    <Button
                      onClick={() => deleteLink(link.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`platform-${link.id}`} className="text-sm font-medium">Platform Name</Label>
                    <Input
                      id={`platform-${link.id}`}
                      value={link.platform}
                      onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                      className="bg-white/50 border-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`url-${link.id}`} className="text-sm font-medium">URL</Label>
                    <Input
                      id={`url-${link.id}`}
                      value={link.url}
                      onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                      placeholder="https://..."
                      className="bg-white/50 border-white/30"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Preview:</h4>
          <div className="flex items-center space-x-4">
            {socialLinks.filter(link => link.isActive).map((link) => (
              <div key={link.id} className="flex items-center space-x-2 text-sm text-blue-700">
                {getIcon(link.icon)}
                <span>{link.platform}</span>
              </div>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleSave} 
          className={`w-full mt-6 transition-all duration-300 ${
            isSaved 
              ? "bg-green-600 hover:bg-green-700" 
              : "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
          } shadow-lg`}
        >
          {isSaved ? "✓ Saved!" : "Save Social Media Links"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SocialMediaTab;
