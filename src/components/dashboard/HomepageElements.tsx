import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MousePointer, BarChart3, Plus, Trash2, Eye, ArrowRight, Play } from "lucide-react";

interface CTAButtons {
  primaryText: string;
  secondaryText: string;
}

interface StatBlock {
  id: string;
  number: string;
  label: string;
  color: string;
}

const defaultCTA: CTAButtons = {
  primaryText: "Get Free Strategy Call",
  secondaryText: "Watch Case Study"
};

const defaultStats: StatBlock[] = [
  { id: "campaigns", number: "500+", label: "Campaigns Managed", color: "from-blue-400 to-cyan-400" },
  { id: "adspend", number: "$50M+", label: "Ad Spend Managed", color: "from-cyan-400 to-purple-400" },
  { id: "roi", number: "300%", label: "Avg ROI Increase", color: "from-purple-400 to-pink-400" },
  { id: "monitoring", number: "24/7", label: "Account Monitoring", color: "from-pink-400 to-blue-400" }
];

const HomepageElements = () => {
  const [ctaButtons, setCTAButtons] = useState<CTAButtons>(defaultCTA);
  const [statsBlocks, setStatsBlocks] = useState<StatBlock[]>(defaultStats);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedCTA = localStorage.getItem('ctaButtonsData');
    if (savedCTA) {
      try {
        const parsed = JSON.parse(savedCTA);
        setCTAButtons({ ...defaultCTA, ...parsed });
      } catch (error) {
        console.error('Failed to parse CTA settings:', error);
      }
    }

    const savedStats = localStorage.getItem('statsData');
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        if (Array.isArray(parsed)) {
          setStatsBlocks(parsed);
        }
      } catch (error) {
        console.error('Failed to parse stats settings:', error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('ctaButtonsData', JSON.stringify(ctaButtons));
    localStorage.setItem('statsData', JSON.stringify(statsBlocks));
    window.dispatchEvent(new CustomEvent('ctaButtonsUpdated', { detail: ctaButtons }));
    window.dispatchEvent(new CustomEvent('statsUpdated', { detail: statsBlocks }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const updateStatBlock = (id: string, field: keyof StatBlock, value: string) => {
    setStatsBlocks(prev => prev.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ));
  };

  const addStatBlock = () => {
    const newStat: StatBlock = {
      id: `stat-${Date.now()}`,
      number: "100+",
      label: "New Metric",
      color: "from-blue-400 to-purple-400"
    };
    setStatsBlocks(prev => [...prev, newStat]);
  };

  const removeStatBlock = (id: string) => {
    setStatsBlocks(prev => prev.filter(stat => stat.id !== id));
  };

  const colorOptions = [
    { value: "from-blue-400 to-cyan-400", label: "Blue to Cyan" },
    { value: "from-cyan-400 to-purple-400", label: "Cyan to Purple" },
    { value: "from-purple-400 to-pink-400", label: "Purple to Pink" },
    { value: "from-pink-400 to-blue-400", label: "Pink to Blue" },
    { value: "from-green-400 to-blue-400", label: "Green to Blue" },
    { value: "from-yellow-400 to-red-400", label: "Yellow to Red" }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Settings Panel */}
      <div className="xl:col-span-2">
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg mr-3">
                <MousePointer className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Homepage Elements</CardTitle>
                <CardDescription>Customize CTA buttons and statistics blocks on the homepage</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cta" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/50">
                <TabsTrigger value="cta" className="data-[state=active]:bg-white">CTA Buttons</TabsTrigger>
                <TabsTrigger value="stats" className="data-[state=active]:bg-white">Stats Blocks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cta" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryCTA" className="text-sm font-medium text-slate-700">Primary Button Text</Label>
                  <Input
                    id="primaryCTA"
                    value={ctaButtons.primaryText}
                    onChange={(e) => setCTAButtons(prev => ({ ...prev, primaryText: e.target.value }))}
                    placeholder="Get Free Strategy Call"
                    className="bg-white/50 border-white/30 focus:border-pink-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryCTA" className="text-sm font-medium text-slate-700">Secondary Button Text</Label>
                  <Input
                    id="secondaryCTA"
                    value={ctaButtons.secondaryText}
                    onChange={(e) => setCTAButtons(prev => ({ ...prev, secondaryText: e.target.value }))}
                    placeholder="Watch Case Study"
                    className="bg-white/50 border-white/30 focus:border-pink-500"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="stats" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-slate-700">Statistics Blocks</h4>
                  <Button onClick={addStatBlock} size="sm" variant="outline" className="bg-white/50">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stat
                  </Button>
                </div>
                
                {statsBlocks.map((stat, index) => (
                  <div key={stat.id} className="border border-white/30 rounded-lg p-4 space-y-3 bg-white/30">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-slate-700">Stat Block {index + 1}</h5>
                      <Button 
                        onClick={() => removeStatBlock(stat.id)} 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700 bg-white/50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Number/Value</Label>
                        <Input
                          value={stat.number}
                          onChange={(e) => updateStatBlock(stat.id, 'number', e.target.value)}
                          placeholder="500+"
                          className="bg-white/50 border-white/30 focus:border-pink-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Label</Label>
                        <Input
                          value={stat.label}
                          onChange={(e) => updateStatBlock(stat.id, 'label', e.target.value)}
                          placeholder="Campaigns Managed"
                          className="bg-white/50 border-white/30 focus:border-pink-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Color Gradient</Label>
                      <select
                        value={stat.color}
                        onChange={(e) => updateStatBlock(stat.id, 'color', e.target.value)}
                        className="w-full h-10 px-3 py-2 bg-white/50 border border-white/30 rounded-md text-sm focus:border-pink-500 focus:outline-none"
                      >
                        {colorOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
            
            <Button 
              onClick={handleSave} 
              className={`w-full mt-6 transition-all duration-300 ${
                isSaved 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              } shadow-lg`}
            >
              {isSaved ? "✓ Saved!" : "Save Homepage Elements"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Live Preview Panel */}
      <div className="xl:col-span-1">
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl sticky top-6">
          <CardHeader>
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Live Preview</CardTitle>
                <CardDescription>Hero section preview</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Hero CTA Preview */}
              <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-xl p-6 text-white">
                <h4 className="font-bold text-lg mb-4 text-center">Hero Section</h4>
                <div className="flex flex-col gap-3">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl">
                    {ctaButtons.primaryText}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" className="border-cyan-400/50 bg-white/5 text-cyan-100 hover:bg-cyan-400/10 rounded-xl">
                    <Play className="mr-2 w-4 h-4" />
                    {ctaButtons.secondaryText}
                  </Button>
                </div>
              </div>

              {/* Stats Preview */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-slate-700 mb-4 text-center">Statistics Grid</h4>
                <div className="grid grid-cols-2 gap-2">
                  {statsBlocks.map((stat) => (
                    <div key={stat.id} className="bg-white/80 rounded-lg p-3 text-center">
                      <div className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.number}
                      </div>
                      <div className="text-xs text-slate-600 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Preview */}
              <div className="bg-slate-800 rounded-xl p-4">
                <h4 className="font-medium text-white mb-3 text-center text-sm">Mobile View</h4>
                <div className="space-y-2">
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-xs">
                    {ctaButtons.primaryText}
                  </Button>
                  <div className="grid grid-cols-2 gap-1">
                    {statsBlocks.slice(0, 4).map((stat) => (
                      <div key={stat.id} className="bg-white/10 rounded p-2 text-center">
                        <div className={`text-sm font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {stat.number}
                        </div>
                        <div className="text-xs text-white/70">
                          {stat.label.split(' ')[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomepageElements;
