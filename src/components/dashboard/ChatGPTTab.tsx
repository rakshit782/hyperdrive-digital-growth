
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Brain, TestTube, Wand2, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { chatGPTManager } from "@/utils/chatGPTManager";

interface ChatGPTConfig {
  apiKey: string;
  model: string;
  isActive: boolean;
  maxTokens: number;
  temperature: number;
}

const defaultConfig: ChatGPTConfig = {
  apiKey: '',
  model: 'gpt-3.5-turbo',
  isActive: false,
  maxTokens: 500,
  temperature: 0.7
};

const ChatGPTTab = () => {
  const [config, setConfig] = useState<ChatGPTConfig>(defaultConfig);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSaved, setIsSaved] = useState(false);
  const [testContent, setTestContent] = useState("Transform your Amazon business with our expert PPC management services.");
  const [optimizedContent, setOptimizedContent] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    chatGPTManager.loadSavedConfig();
    const savedConfig = chatGPTManager.getConfig();
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, []);

  const handleSave = () => {
    chatGPTManager.saveConfig(config);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('idle');
    
    try {
      const isConnected = await chatGPTManager.testConnection();
      setConnectionStatus(isConnected ? 'success' : 'error');
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const testOptimization = async () => {
    if (!config.apiKey || !config.isActive) return;
    
    setIsOptimizing(true);
    try {
      const optimized = await chatGPTManager.optimizeContent({
        type: 'content',
        content: testContent
      });
      setOptimizedContent(optimized);
    } catch (error) {
      console.error('Optimization test failed:', error);
      setOptimizedContent('Error: Failed to optimize content. Please check your API key and configuration.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const updateConfig = (field: keyof ChatGPTConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-6">
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mr-3">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">ChatGPT Integration</CardTitle>
                <CardDescription>Configure OpenAI ChatGPT for content optimization</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive" className="text-sm font-medium">Enable ChatGPT Integration</Label>
                <Switch
                  id="isActive"
                  checked={config.isActive}
                  onCheckedChange={(checked) => updateConfig('isActive', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-sm font-medium">OpenAI API Key</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="apiKey"
                    type="password"
                    value={config.apiKey}
                    onChange={(e) => updateConfig('apiKey', e.target.value)}
                    placeholder="sk-..."
                    className="bg-white/50 border-white/30"
                  />
                  <Button
                    onClick={testConnection}
                    disabled={!config.apiKey || isTestingConnection}
                    variant="outline"
                    className="bg-white/50 flex items-center space-x-2"
                  >
                    {isTestingConnection ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <TestTube className="w-4 h-4" />
                    )}
                    <span>Test</span>
                    {getConnectionStatusIcon()}
                  </Button>
                </div>
                {connectionStatus === 'success' && (
                  <p className="text-sm text-green-600">✓ Connection successful</p>
                )}
                {connectionStatus === 'error' && (
                  <p className="text-sm text-red-600">✗ Connection failed. Please check your API key.</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model" className="text-sm font-medium">Model</Label>
                <Select value={config.model} onValueChange={(value) => updateConfig('model', value)}>
                  <SelectTrigger className="bg-white/50 border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Fast & Cost-effective)</SelectItem>
                    <SelectItem value="gpt-4">GPT-4 (Higher Quality)</SelectItem>
                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo (Latest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxTokens" className="text-sm font-medium">Max Tokens: {config.maxTokens}</Label>
                <Slider
                  value={[config.maxTokens]}
                  onValueChange={([value]) => updateConfig('maxTokens', value)}
                  max={2000}
                  min={100}
                  step={50}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature" className="text-sm font-medium">Temperature (Creativity): {config.temperature}</Label>
                <Slider
                  value={[config.temperature]}
                  onValueChange={([value]) => updateConfig('temperature', value)}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>

            <Button 
              onClick={handleSave} 
              className={`w-full transition-all duration-300 ${
                isSaved 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              } shadow-lg`}
            >
              {isSaved ? "✓ Saved!" : "Save Configuration"}
            </Button>
          </CardContent>
        </Card>

        {/* Content Optimization Test */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg mr-3">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Test Content Optimization</CardTitle>
                <CardDescription>Try optimizing content with your current settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testContent">Original Content</Label>
              <Textarea
                id="testContent"
                value={testContent}
                onChange={(e) => setTestContent(e.target.value)}
                className="bg-white/50 border-white/30"
                rows={3}
              />
            </div>
            
            <Button
              onClick={testOptimization}
              disabled={!config.apiKey || !config.isActive || isOptimizing}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Optimize Content
                </>
              )}
            </Button>

            {optimizedContent && (
              <div className="space-y-2">
                <Label>Optimized Content</Label>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <p className="text-slate-700 leading-relaxed">{optimizedContent}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Status Panel */}
      <div className="xl:col-span-1">
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl sticky top-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              Integration Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Status</span>
              <Badge variant={config.isActive && config.apiKey ? "default" : "secondary"}>
                {config.isActive && config.apiKey ? "Active" : "Inactive"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Model</span>
              <span className="text-sm font-medium">{config.model}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Max Tokens</span>
              <span className="text-sm font-medium">{config.maxTokens}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Temperature</span>
              <span className="text-sm font-medium">{config.temperature}</span>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-medium text-slate-900 mb-2">Features Available:</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Content optimization</li>
                <li>• Review enhancement</li>
                <li>• SEO improvements</li>
                <li>• Service descriptions</li>
                <li>• Marketing copy</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatGPTTab;
