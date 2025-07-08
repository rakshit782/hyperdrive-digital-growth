
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, BarChart3, Eye } from "lucide-react";

interface StatBlock {
  id: string;
  number: string;
  label: string;
  color: string;
}

const defaultStats: StatBlock[] = [
  { id: "campaigns", number: "500+", label: "Campaigns Managed", color: "from-blue-400 to-cyan-400" },
  { id: "adspend", number: "$50M+", label: "Ad Spend Managed", color: "from-cyan-400 to-purple-400" },
  { id: "roi", number: "300%", label: "Avg ROI Increase", color: "from-purple-400 to-pink-400" },
  { id: "monitoring", number: "24/7", label: "Account Monitoring", color: "from-pink-400 to-blue-400" }
];

const StatsManagement = () => {
  const [statsBlocks, setStatsBlocks] = useState<StatBlock[]>(defaultStats);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
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
    localStorage.setItem('statsData', JSON.stringify(statsBlocks));
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
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Statistics Management</CardTitle>
                <CardDescription>Manage statistics blocks displayed on the homepage</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
                        className="bg-white/50 border-white/30 focus:border-green-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Label</Label>
                      <Input
                        value={stat.label}
                        onChange={(e) => updateStatBlock(stat.id, 'label', e.target.value)}
                        placeholder="Campaigns Managed"
                        className="bg-white/50 border-white/30 focus:border-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">Color Gradient</Label>
                    <select
                      value={stat.color}
                      onChange={(e) => updateStatBlock(stat.id, 'color', e.target.value)}
                      className="w-full h-10 px-3 py-2 bg-white/50 border border-white/30 rounded-md text-sm focus:border-green-500 focus:outline-none"
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
            </div>
            
            <Button 
              onClick={handleSave} 
              className={`w-full mt-6 transition-all duration-300 ${
                isSaved 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              } shadow-lg`}
            >
              {isSaved ? "✓ Saved!" : "Save Statistics"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Live Preview Panel */}
      <div className="xl:col-span-1">
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl sticky top-6">
          <CardHeader>
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Live Preview</CardTitle>
                <CardDescription>Statistics preview</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Hero Stats Preview */}
              <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-xl p-4 text-white">
                <h4 className="font-bold text-lg mb-4 text-center">Hero Section Stats</h4>
                <div className="grid grid-cols-2 gap-2">
                  {statsBlocks.map((stat) => (
                    <div key={stat.id} className="bg-white/10 rounded-lg p-3 text-center">
                      <div className={`text-sm font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.number}
                      </div>
                      <div className="text-xs text-white/70 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section Stats Preview */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-slate-700 mb-4 text-center">FAQ Section Stats</h4>
                <div className="grid grid-cols-2 gap-2">
                  {statsBlocks.map((stat) => (
                    <div key={stat.id} className="bg-white rounded-lg p-3 text-center border">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsManagement;
