
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MousePointer, BarChart3, Plus, Trash2 } from "lucide-react";

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
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <MousePointer className="w-5 h-5 mr-2 text-purple-600" />
          <CardTitle>Homepage Elements</CardTitle>
        </div>
        <CardDescription>Customize CTA buttons and statistics blocks on the homepage</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cta" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cta">CTA Buttons</TabsTrigger>
            <TabsTrigger value="stats">Stats Blocks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cta" className="space-y-4">
            <div>
              <Label htmlFor="primaryCTA">Primary Button Text</Label>
              <Input
                id="primaryCTA"
                value={ctaButtons.primaryText}
                onChange={(e) => setCTAButtons(prev => ({ ...prev, primaryText: e.target.value }))}
                placeholder="Get Free Strategy Call"
              />
            </div>
            
            <div>
              <Label htmlFor="secondaryCTA">Secondary Button Text</Label>
              <Input
                id="secondaryCTA"
                value={ctaButtons.secondaryText}
                onChange={(e) => setCTAButtons(prev => ({ ...prev, secondaryText: e.target.value }))}
                placeholder="Watch Case Study"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Statistics Blocks</h4>
              <Button onClick={addStatBlock} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Stat
              </Button>
            </div>
            
            {statsBlocks.map((stat, index) => (
              <div key={stat.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium">Stat Block {index + 1}</h5>
                  <Button 
                    onClick={() => removeStatBlock(stat.id)} 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Number/Value</Label>
                    <Input
                      value={stat.number}
                      onChange={(e) => updateStatBlock(stat.id, 'number', e.target.value)}
                      placeholder="500+"
                    />
                  </div>
                  
                  <div>
                    <Label>Label</Label>
                    <Input
                      value={stat.label}
                      onChange={(e) => updateStatBlock(stat.id, 'label', e.target.value)}
                      placeholder="Campaigns Managed"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Color Gradient</Label>
                  <select
                    value={stat.color}
                    onChange={(e) => updateStatBlock(stat.id, 'color', e.target.value)}
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
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
        
        <Button onClick={handleSave} className={`w-full mt-6 ${isSaved ? "bg-green-600" : ""}`}>
          {isSaved ? "Saved!" : "Save Homepage Elements"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomepageElements;
