
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  TestTube, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Facebook,
  BarChart3,
  Brain,
  Cloud,
  Shield,
  Users,
  Mail,
  Database,
  HardDrive
} from "lucide-react";
import { integrationManager } from "@/utils/integrationManager";
import { googleAnalyticsManager } from "@/utils/googleAnalyticsManager";
import { chatGPTManager } from "@/utils/chatGPTManager";

interface TestResult {
  integration: string;
  status: 'success' | 'error' | 'testing';
  message: string;
  timestamp: Date;
}

const IntegrationTestTab = () => {
  const { toast } = useToast();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [testInput, setTestInput] = useState("This is a demo test string for integration testing. Please optimize this content for better engagement and SEO performance.");

  const integrationTests = [
    {
      name: 'Facebook Pixel',
      icon: Facebook,
      color: 'from-blue-500 to-blue-600',
      testFunction: async () => {
        const config = localStorage.getItem('facebookPixel_config');
        if (!config) throw new Error('Facebook Pixel not configured');
        
        const parsed = JSON.parse(config);
        if (!parsed.isActive || !parsed.pixelId) {
          throw new Error('Facebook Pixel is not active or missing Pixel ID');
        }
        
        // Check if fbq is loaded
        if (typeof window !== 'undefined' && window.fbq) {
          // Test firing a custom event
          window.fbq('track', 'Integration_Test', { test_data: 'dashboard_test' });
          return 'Facebook Pixel integration test successful - Custom event fired';
        } else {
          throw new Error('Facebook Pixel script not loaded');
        }
      }
    },
    {
      name: 'Google Analytics',
      icon: BarChart3,
      color: 'from-orange-500 to-red-600',
      testFunction: async () => {
        const config = googleAnalyticsManager.getConfig();
        if (!config || !config.isActive) {
          throw new Error('Google Analytics not configured or inactive');
        }
        
        if (typeof window !== 'undefined' && window.gtag) {
          // Test firing a custom event
          window.gtag('event', 'integration_test', {
            custom_parameter: 'dashboard_test',
            value: 1
          });
          return 'Google Analytics integration test successful - Custom event tracked';
        } else {
          throw new Error('Google Analytics gtag not loaded');
        }
      }
    },
    {
      name: 'ChatGPT AI',
      icon: Brain,
      color: 'from-green-500 to-emerald-600',
      testFunction: async () => {
        const isActive = chatGPTManager.isActive();
        if (!isActive) {
          throw new Error('ChatGPT integration not configured or inactive');
        }
        
        const testResult = await chatGPTManager.testConnection();
        if (testResult) {
          return 'ChatGPT AI integration test successful - Connection verified';
        } else {
          throw new Error('ChatGPT AI connection test failed');
        }
      }
    },
    {
      name: 'Contact Management',
      icon: Mail,
      color: 'from-purple-500 to-indigo-600',
      testFunction: async () => {
        const contactData = localStorage.getItem('contactData');
        if (!contactData) {
          throw new Error('Contact data not configured');
        }
        
        const parsed = JSON.parse(contactData);
        if (!parsed.email || !parsed.phone) {
          throw new Error('Contact data incomplete - missing email or phone');
        }
        
        // Dispatch test event
        window.dispatchEvent(new CustomEvent('contactUpdated', { detail: parsed }));
        return 'Contact Management test successful - Data sync verified';
      }
    },
    {
      name: 'Social Media Links',
      icon: Users,
      color: 'from-pink-500 to-rose-600',
      testFunction: async () => {
        const socialData = localStorage.getItem('socialMediaLinks');
        if (!socialData) {
          throw new Error('Social media links not configured');
        }
        
        const parsed = JSON.parse(socialData);
        const activeLinks = parsed.filter((link: any) => link.isActive);
        if (activeLinks.length === 0) {
          throw new Error('No active social media links found');
        }
        
        // Dispatch test event
        window.dispatchEvent(new CustomEvent('socialMediaUpdated', { detail: parsed }));
        return `Social Media integration test successful - ${activeLinks.length} active links verified`;
      }
    },
    {
      name: 'Services Data',
      icon: Database,
      color: 'from-cyan-500 to-blue-600',
      testFunction: async () => {
        const servicesData = localStorage.getItem('servicesData');
        if (!servicesData) {
          throw new Error('Services data not found');
        }
        
        const parsed = JSON.parse(servicesData);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          throw new Error('Invalid services data structure');
        }
        
        // Dispatch test event
        window.dispatchEvent(new CustomEvent('servicesUpdated', { detail: parsed }));
        return `Services integration test successful - ${parsed.length} services verified`;
      }
    },
    {
      name: 'Reviews Data',
      icon: HardDrive,
      color: 'from-yellow-500 to-orange-600',
      testFunction: async () => {
        const reviewsData = localStorage.getItem('reviewsData');
        if (!reviewsData) {
          throw new Error('Reviews data not found');
        }
        
        const parsed = JSON.parse(reviewsData);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          throw new Error('Invalid reviews data structure');
        }
        
        // Dispatch test event
        window.dispatchEvent(new CustomEvent('reviewsUpdated', { detail: parsed }));
        return `Reviews integration test successful - ${parsed.length} reviews verified`;
      }
    },
    {
      name: 'FAQ Data',
      icon: Shield,
      color: 'from-indigo-500 to-purple-600',
      testFunction: async () => {
        const faqData = localStorage.getItem('faqData');
        if (!faqData) {
          throw new Error('FAQ data not found');
        }
        
        const parsed = JSON.parse(faqData);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          throw new Error('Invalid FAQ data structure');
        }
        
        // Dispatch test event
        window.dispatchEvent(new CustomEvent('faqUpdated', { detail: parsed }));
        return `FAQ integration test successful - ${parsed.length} FAQ items verified`;
      }
    }
  ];

  const runSingleTest = async (integration: any) => {
    const testResult: TestResult = {
      integration: integration.name,
      status: 'testing',
      message: 'Running test...',
      timestamp: new Date()
    };
    
    setTestResults(prev => {
      const filtered = prev.filter(r => r.integration !== integration.name);
      return [...filtered, testResult];
    });

    try {
      const result = await integration.testFunction();
      const successResult: TestResult = {
        integration: integration.name,
        status: 'success',
        message: result,
        timestamp: new Date()
      };
      
      setTestResults(prev => {
        const filtered = prev.filter(r => r.integration !== integration.name);
        return [...filtered, successResult];
      });
    } catch (error) {
      const errorResult: TestResult = {
        integration: integration.name,
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      };
      
      setTestResults(prev => {
        const filtered = prev.filter(r => r.integration !== integration.name);
        return [...filtered, errorResult];
      });
    }
  };

  const runAllTests = async () => {
    setIsTesting(true);
    setTestResults([]);
    
    try {
      for (const integration of integrationTests) {
        await runSingleTest(integration);
        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      toast({
        title: "Integration Tests Complete",
        description: "All integration tests have been executed. Check the results below.",
      });
    } catch (error) {
      toast({
        title: "Test Error",
        description: "An error occurred while running tests.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const testChatGPTWithDemo = async () => {
    if (!testInput.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to test ChatGPT optimization.",
        variant: "destructive",
      });
      return;
    }

    try {
      const isActive = chatGPTManager.isActive();
      if (!isActive) {
        toast({
          title: "ChatGPT Not Configured",
          description: "Please configure ChatGPT integration first.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Testing ChatGPT",
        description: "Sending test content for optimization...",
      });

      const optimizedContent = await chatGPTManager.optimizeContent(testInput, 'general');
      
      if (optimizedContent) {
        toast({
          title: "ChatGPT Test Successful",
          description: "Content optimized successfully!",
        });
        
        setTestInput(optimizedContent);
      } else {
        throw new Error('No optimized content returned');
      }
    } catch (error) {
      toast({
        title: "ChatGPT Test Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'testing':
        return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Passed</Badge>;
      case 'error':
        return <Badge variant="destructive">Failed</Badge>;
      case 'testing':
        return <Badge variant="outline">Testing...</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Test Controls */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                <TestTube className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Integration Testing</CardTitle>
                <CardDescription>Test all integrations to ensure they're working correctly</CardDescription>
              </div>
            </div>
            <Button 
              onClick={runAllTests} 
              disabled={isTesting}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isTesting ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4 mr-2" />
                  Run All Tests
                </>
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Individual Test Buttons */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg">Individual Integration Tests</CardTitle>
          <CardDescription>Test specific integrations individually</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {integrationTests.map((integration) => {
              const Icon = integration.icon;
              const result = testResults.find(r => r.integration === integration.name);
              
              return (
                <Button
                  key={integration.name}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 relative"
                  onClick={() => runSingleTest(integration)}
                  disabled={result?.status === 'testing'}
                >
                  <div className={`p-2 bg-gradient-to-r ${integration.color} rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-center">{integration.name}</span>
                  {result && (
                    <div className="absolute -top-2 -right-2">
                      {getStatusIcon(result.status)}
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ChatGPT Demo Test */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            ChatGPT Content Optimization Test
          </CardTitle>
          <CardDescription>Test ChatGPT integration with demo content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Enter text to test ChatGPT optimization..."
            rows={4}
            className="bg-white/50"
          />
          <Button 
            onClick={testChatGPTWithDemo}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Brain className="w-4 h-4 mr-2" />
            Test ChatGPT Optimization
          </Button>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              <CardTitle className="text-lg">Test Results</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-white/50 rounded-lg border">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <h4 className="font-medium text-slate-900">{result.integration}</h4>
                      <p className="text-sm text-slate-600 mt-1">{result.message}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {result.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(result.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integration Status Summary */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg">Integration Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {testResults.filter(r => r.status === 'success').length}
              </div>
              <div className="text-sm text-green-700">Passed</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {testResults.filter(r => r.status === 'error').length}
              </div>
              <div className="text-sm text-red-700">Failed</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">
                {testResults.filter(r => r.status === 'testing').length}
              </div>
              <div className="text-sm text-yellow-700">Testing</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationTestTab;
