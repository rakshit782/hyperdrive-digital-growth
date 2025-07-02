
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Save, Target, Sparkles, TrendingUp } from 'lucide-react';

interface CTAData {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  showSecondaryButton: boolean;
  backgroundStyle: string;
}

const defaultCTAData: CTAData = {
  title: "Ready to Scale Your Business?",
  subtitle: "Get Your Free Strategy Session Today",
  description: "Join hundreds of successful e-commerce businesses that have transformed their advertising results with our expert team. Let's discuss how we can help you achieve your growth goals.",
  primaryButtonText: "Get Free Strategy Call",
  primaryButtonLink: "/free-audit",
  secondaryButtonText: "View Case Studies",
  secondaryButtonLink: "/case-studies",
  showSecondaryButton: true,
  backgroundStyle: "gradient"
};

const CTAManagementTab = () => {
  const { toast } = useToast();
  const [ctaData, setCTAData] = useState<CTAData>(defaultCTAData);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedCTA = localStorage.getItem('ctaData');
    if (savedCTA) {
      try {
        const parsed = JSON.parse(savedCTA);
        if (parsed && typeof parsed === 'object') {
          setCTAData({ ...defaultCTAData, ...parsed });
        }
      } catch (error) {
        console.error('Failed to parse CTA data:', error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('ctaData', JSON.stringify(ctaData));
    
    // Dispatch custom event to update CTA component
    window.dispatchEvent(new CustomEvent('ctaUpdated', { detail: ctaData }));
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    
    toast({
      title: "CTA Updated",
      description: "Your CTA section has been saved successfully."
    });
  };

  const updateField = (field: keyof CTAData, value: string | boolean) => {
    setCTAData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">CTA Management</CardTitle>
                <CardDescription>Configure your call-to-action section</CardDescription>
              </div>
            </div>
            <Button 
              onClick={handleSave}
              className={`transition-all duration-300 ${
                isSaved 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              } shadow-lg`}
            >
              {isSaved ? "✓ Saved!" : "Save Changes"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <Input
                  value={ctaData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Ready to Scale Your Business?"
                  className="bg-white/50 border-white/30 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle</label>
                <Input
                  value={ctaData.subtitle}
                  onChange={(e) => updateField('subtitle', e.target.value)}
                  placeholder="Get Your Free Strategy Session Today"
                  className="bg-white/50 border-white/30 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <Textarea
                  value={ctaData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Join hundreds of successful e-commerce businesses..."
                  rows={4}
                  className="bg-white/50 border-white/30 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Primary Button Text</label>
                  <Input
                    value={ctaData.primaryButtonText}
                    onChange={(e) => updateField('primaryButtonText', e.target.value)}
                    placeholder="Get Free Strategy Call"
                    className="bg-white/50 border-white/30 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Primary Button Link</label>
                  <Input
                    value={ctaData.primaryButtonLink}
                    onChange={(e) => updateField('primaryButtonLink', e.target.value)}
                    placeholder="/free-audit"
                    className="bg-white/50 border-white/30 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  checked={ctaData.showSecondaryButton}
                  onCheckedChange={(checked) => updateField('showSecondaryButton', checked)}
                />
                <label className="text-sm font-medium text-slate-700">Show Secondary Button</label>
              </div>

              {ctaData.showSecondaryButton && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Secondary Button Text</label>
                    <Input
                      value={ctaData.secondaryButtonText}
                      onChange={(e) => updateField('secondaryButtonText', e.target.value)}
                      placeholder="View Case Studies"
                      className="bg-white/50 border-white/30 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Secondary Button Link</label>
                    <Input
                      value={ctaData.secondaryButtonLink}
                      onChange={(e) => updateField('secondaryButtonLink', e.target.value)}
                      placeholder="/case-studies"
                      className="bg-white/50 border-white/30 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Background Style</label>
                <Select value={ctaData.backgroundStyle} onValueChange={(value) => updateField('backgroundStyle', value)}>
                  <SelectTrigger className="bg-white/50 border-white/30 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gradient">Gradient (Default)</SelectItem>
                    <SelectItem value="solid">Solid Dark</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Right Side - Live Preview */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-slate-800 mb-4">Live Preview</h4>
            <div className={`relative p-8 rounded-2xl text-white overflow-hidden ${
              ctaData.backgroundStyle === 'solid' ? 'bg-slate-900' :
              ctaData.backgroundStyle === 'blue' ? 'bg-blue-900' :
              'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900'
            }`}>
              {/* Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-4 left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-4 right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              </div>

              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>

                {/* Subtitle */}
                <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-4">
                  <TrendingUp className="w-3 h-3 mr-2 text-cyan-400" />
                  <span className="text-xs font-medium text-cyan-100">{ctaData.subtitle}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {ctaData.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {ctaData.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 hover:from-blue-600 hover:via-blue-700 hover:to-purple-600 text-white px-6 py-2 text-sm font-semibold rounded-xl shadow-lg"
                  >
                    <Target className="mr-2 w-4 h-4" />
                    {ctaData.primaryButtonText}
                  </Button>
                  
                  {ctaData.showSecondaryButton && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border border-cyan-400/50 bg-white/5 backdrop-blur-sm text-cyan-100 hover:bg-cyan-400/10 px-6 py-2 text-sm font-semibold rounded-xl"
                    >
                      {ctaData.secondaryButtonText}
                    </Button>
                  )}
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-400 mb-1">500+</div>
                    <div className="text-slate-400 text-xs">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-400 mb-1">$50M+</div>
                    <div className="text-slate-400 text-xs">Ad Spend Managed</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-cyan-400 mb-1">300%</div>
                    <div className="text-slate-400 text-xs">Avg ROI Increase</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CTAManagementTab;
