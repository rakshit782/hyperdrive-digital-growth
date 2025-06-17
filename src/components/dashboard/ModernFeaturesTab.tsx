
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Eye, Star } from "lucide-react";

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  metric: string;
  label: string;
  isActive: boolean;
}

const defaultFeatures: Feature[] = [
  {
    id: "roi",
    icon: "TrendingUp",
    title: "ROI-Driven Results",
    description: "Average 300% increase in ROAS within 90 days",
    metric: "300%",
    label: "ROAS Increase",
    isActive: true
  },
  {
    id: "security",
    icon: "Shield",
    title: "Enterprise Security",
    description: "SOC 2 compliant with advanced data protection",
    metric: "100%",
    label: "Data Security",
    isActive: true
  },
  {
    id: "speed",
    icon: "Zap",
    title: "Lightning Fast Setup",
    description: "Get campaigns running in 24 hours or less",
    metric: "24hrs",
    label: "Setup Time",
    isActive: true
  },
  {
    id: "support",
    icon: "Users",
    title: "Dedicated Support",
    description: "Expert account managers for personalized growth",
    metric: "24/7",
    label: "Support Available",
    isActive: true
  },
  {
    id: "experts",
    icon: "Award",
    title: "Certified Experts",
    description: "Amazon, Meta, and Google certified professionals",
    metric: "50+",
    label: "Certifications",
    isActive: true
  },
  {
    id: "satisfaction",
    icon: "Star",
    title: "Client Satisfaction",
    description: "98% client retention rate with proven results",
    metric: "98%",
    label: "Retention Rate",
    isActive: true
  }
];

const iconOptions = [
  "TrendingUp", "Shield", "Zap", "Users", "Award", "Star", "CheckCircle", "Target", "Rocket", "Globe"
];

const ModernFeaturesTab = () => {
  const [features, setFeatures] = useState<Feature[]>(defaultFeatures);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedFeatures = localStorage.getItem('modernFeaturesData');
    if (savedFeatures) {
      try {
        const parsed = JSON.parse(savedFeatures);
        if (Array.isArray(parsed)) {
          setFeatures(parsed);
        }
      } catch (error) {
        console.error('Failed to parse modern features data:', error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('modernFeaturesData', JSON.stringify(features));
    window.dispatchEvent(new CustomEvent('modernFeaturesUpdated', { detail: features }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const updateFeature = (id: string, field: keyof Feature, value: string | boolean) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === id ? { ...feature, [field]: value } : feature
    ));
  };

  const addFeature = () => {
    const newFeature: Feature = {
      id: `feature-${Date.now()}`,
      icon: "Star",
      title: "New Feature",
      description: "Feature description",
      metric: "100%",
      label: "New Metric",
      isActive: true
    };
    setFeatures(prev => [...prev, newFeature]);
  };

  const removeFeature = (id: string) => {
    setFeatures(prev => prev.filter(feature => feature.id !== id));
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2">
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Modern Features Management</CardTitle>
                <CardDescription>Customize the "Why Leading Brands Choose Us" section</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-slate-700">Features</h4>
                <Button onClick={addFeature} size="sm" variant="outline" className="bg-white/50">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feature
                </Button>
              </div>
              
              {features.map((feature, index) => (
                <div key={feature.id} className="border border-white/30 rounded-lg p-4 space-y-3 bg-white/30">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <h5 className="font-medium text-slate-700">Feature {index + 1}</h5>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={feature.isActive}
                          onCheckedChange={(checked) => updateFeature(feature.id, 'isActive', checked)}
                        />
                        <Label className="text-sm text-slate-600">Active</Label>
                      </div>
                    </div>
                    <Button 
                      onClick={() => removeFeature(feature.id)} 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 hover:text-red-700 bg-white/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Title</Label>
                      <Input
                        value={feature.title}
                        onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                        placeholder="Feature title"
                        className="bg-white/50 border-white/30 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Icon</Label>
                      <select
                        value={feature.icon}
                        onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                        className="w-full h-10 px-3 py-2 bg-white/50 border border-white/30 rounded-md text-sm focus:border-blue-500 focus:outline-none"
                      >
                        {iconOptions.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">Description</Label>
                    <Input
                      value={feature.description}
                      onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                      placeholder="Feature description"
                      className="bg-white/50 border-white/30 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Metric</Label>
                      <Input
                        value={feature.metric}
                        onChange={(e) => updateFeature(feature.id, 'metric', e.target.value)}
                        placeholder="300%"
                        className="bg-white/50 border-white/30 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Metric Label</Label>
                      <Input
                        value={feature.label}
                        onChange={(e) => updateFeature(feature.id, 'label', e.target.value)}
                        placeholder="ROAS Increase"
                        className="bg-white/50 border-white/30 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={handleSave} 
              className={`w-full mt-6 transition-all duration-300 ${
                isSaved 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              } shadow-lg`}
            >
              {isSaved ? "✓ Saved!" : "Save Features"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="xl:col-span-1">
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl sticky top-6">
          <CardHeader>
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Live Preview</CardTitle>
                <CardDescription>Features preview</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-xl p-4">
              <h4 className="font-bold text-lg mb-4 text-center text-slate-900">Modern Features</h4>
              <div className="grid grid-cols-1 gap-3">
                {features.filter(f => f.isActive).slice(0, 3).map((feature) => (
                  <div key={feature.id} className="bg-white/90 rounded-lg p-3 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {feature.metric}
                        </div>
                        <div className="text-xs text-slate-500">{feature.label}</div>
                      </div>
                    </div>
                    <h5 className="text-sm font-semibold text-slate-900 mb-1">
                      {feature.title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-tight">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModernFeaturesTab;
