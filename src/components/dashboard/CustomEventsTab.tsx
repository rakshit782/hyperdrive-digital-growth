import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Code, Plus, Trash2, Edit, Save, X } from "lucide-react";

interface TrackingScript {
  id: string;
  name: string;
  script: string;
  location: 'head' | 'body' | 'footer';
  pages: 'all' | 'selected';
  selectedPages: string[];
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
];

const CustomEventsTab = () => {
  const [scripts, setScripts] = useState<TrackingScript[]>([]);
  const [editingScript, setEditingScript] = useState<TrackingScript | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    const savedScripts = localStorage.getItem('trackingScripts');
    console.log('CustomEventsTab: Loading scripts from localStorage:', savedScripts);
    if (savedScripts) {
      try {
        const parsedScripts = JSON.parse(savedScripts);
        setScripts(parsedScripts);
        console.log('CustomEventsTab: Loaded scripts:', parsedScripts);
      } catch (error) {
        console.error('CustomEventsTab: Failed to parse tracking scripts:', error);
      }
    }
  }, []);

  const saveScripts = (newScripts: TrackingScript[]) => {
    console.log('CustomEventsTab: Saving scripts:', newScripts);
    setScripts(newScripts);
    localStorage.setItem('trackingScripts', JSON.stringify(newScripts));
    
    // Dispatch event to update scripts on the frontend
    const event = new CustomEvent('trackingScriptsUpdated', { detail: newScripts });
    window.dispatchEvent(event);
    console.log('CustomEventsTab: Dispatched trackingScriptsUpdated event');
  };

  const addNewScript = () => {
    const newScript: TrackingScript = {
      id: `script-${Date.now()}`,
      name: 'New Tracking Script',
      script: '',
      location: 'head',
      pages: 'all',
      selectedPages: [],
      isActive: true
    };
    setEditingScript(newScript);
    setIsAddingNew(true);
  };

  const saveScript = () => {
    if (!editingScript) return;

    if (isAddingNew) {
      saveScripts([...scripts, editingScript]);
    } else {
      saveScripts(scripts.map(s => s.id === editingScript.id ? editingScript : s));
    }
    
    setEditingScript(null);
    setIsAddingNew(false);
  };

  const deleteScript = (id: string) => {
    saveScripts(scripts.filter(s => s.id !== id));
  };

  const toggleScriptStatus = (id: string) => {
    saveScripts(scripts.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const handlePageSelection = (pageValue: string, isChecked: boolean) => {
    if (!editingScript) return;

    const updatedPages = isChecked
      ? [...editingScript.selectedPages, pageValue]
      : editingScript.selectedPages.filter(p => p !== pageValue);

    setEditingScript({
      ...editingScript,
      selectedPages: updatedPages
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mr-3">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Custom Tracking Scripts</CardTitle>
                <CardDescription>Add tracking scripts and analytics code to your website</CardDescription>
              </div>
            </div>
            <Button onClick={addNewScript} className="bg-gradient-to-r from-purple-500 to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Script
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scripts.map((script) => (
              <Card key={script.id} className="bg-white/50 border border-gray-200/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-slate-900">{script.name}</h4>
                      <Badge variant={script.isActive ? "default" : "secondary"}>
                        {script.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">{script.location.toUpperCase()}</Badge>
                      <Badge variant="outline">
                        {script.pages === 'all' ? 'All Pages' : `${script.selectedPages.length} Pages`}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleScriptStatus(script.id)}
                      >
                        {script.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingScript(script)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteScript(script.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded p-3">
                    <code className="text-sm text-gray-700 break-all">
                      {script.script.substring(0, 100)}
                      {script.script.length > 100 && '...'}
                    </code>
                  </div>
                </CardContent>
              </Card>
            ))}

            {scripts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No tracking scripts added yet.</p>
                <p className="text-sm">Click "Add Script" to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Script Modal */}
      {editingScript && (
        <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{isAddingNew ? 'Add New Script' : 'Edit Script'}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingScript(null);
                  setIsAddingNew(false);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="scriptName">Script Name</Label>
              <Input
                id="scriptName"
                value={editingScript.name}
                onChange={(e) => setEditingScript({ ...editingScript, name: e.target.value })}
                placeholder="e.g., Google Analytics, Facebook Pixel"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scriptCode">Script Code</Label>
              <Textarea
                id="scriptCode"
                value={editingScript.script}
                onChange={(e) => setEditingScript({ ...editingScript, script: e.target.value })}
                placeholder="Paste your tracking script here..."
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Script Location</Label>
              <Select
                value={editingScript.location}
                onValueChange={(value) => setEditingScript({ ...editingScript, location: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="head">Head Section (&lt;head&gt;)</SelectItem>
                  <SelectItem value="body">Body Section (&lt;body&gt;)</SelectItem>
                  <SelectItem value="footer">Footer Section (&lt;footer&gt;)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Page Selection</Label>
              <Select
                value={editingScript.pages}
                onValueChange={(value) => setEditingScript({ ...editingScript, pages: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pages</SelectItem>
                  <SelectItem value="selected">Selected Pages</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {editingScript.pages === 'selected' && (
              <div className="space-y-2">
                <Label>Select Pages</Label>
                <div className="grid grid-cols-2 gap-3">
                  {defaultPages.map((page) => (
                    <div key={page.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={page.value}
                        checked={editingScript.selectedPages.includes(page.value)}
                        onCheckedChange={(checked) => handlePageSelection(page.value, checked as boolean)}
                      />
                      <Label htmlFor={page.value} className="text-sm font-normal">
                        {page.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={editingScript.isActive}
                onCheckedChange={(checked) => setEditingScript({ ...editingScript, isActive: checked as boolean })}
              />
              <Label htmlFor="isActive">Activate script immediately</Label>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingScript(null);
                  setIsAddingNew(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={saveScript} className="bg-gradient-to-r from-purple-500 to-pink-600">
                <Save className="w-4 h-4 mr-2" />
                Save Script
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomEventsTab;
