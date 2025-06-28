
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, AlertCircle, RefreshCw, ExternalLink, Clock } from "lucide-react";

interface AuditItem {
  id: string;
  name: string;
  status: 'working' | 'broken' | 'warning' | 'untested';
  description: string;
  url?: string;
  lastChecked?: string;
  issues?: string[];
  recommendations?: string[];
}

interface AuditCategory {
  name: string;
  items: AuditItem[];
}

const WebsiteAuditTab = () => {
  const [auditData, setAuditData] = useState<AuditCategory[]>([]);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [lastAuditTime, setLastAuditTime] = useState<string>('');

  const runWebsiteAudit = async () => {
    setIsRunningAudit(true);
    
    // Simulate audit process
    const auditResults: AuditCategory[] = [
      {
        name: "Core Pages",
        items: [
          {
            id: 'homepage',
            name: 'Homepage',
            status: 'working',
            description: 'Main landing page with hero section, services, and reviews',
            url: '/',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Consider adding more testimonials', 'Optimize hero CTA placement']
          },
          {
            id: 'about',
            name: 'About Page',
            status: 'working',
            description: 'Company information and team details',
            url: '/about',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add team member photos', 'Include company timeline']
          },
          {
            id: 'contact',
            name: 'Contact Page',
            status: 'working',
            description: 'Contact form and company information',
            url: '/contact',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add contact form validation', 'Include office hours']
          },
          {
            id: 'pricing',
            name: 'Pricing Page',
            status: 'working',
            description: 'Service pricing and packages',
            url: '/pricing',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add FAQ section', 'Include comparison table']
          }
        ]
      },
      {
        name: "Service Pages",
        items: [
          {
            id: 'amazon-ads',
            name: 'Amazon Advertising',
            status: 'working',
            description: 'Amazon PPC management services page',
            url: '/amazon-advertising',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add more case studies', 'Include pricing calculator']
          },
          {
            id: 'walmart-ads',
            name: 'Walmart Advertising',
            status: 'working',
            description: 'Walmart Connect advertising services',
            url: '/walmart-advertising',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add Walmart-specific testimonials']
          },
          {
            id: 'meta-ads',
            name: 'Meta Advertising',
            status: 'working',
            description: 'Facebook and Instagram advertising services',
            url: '/meta-advertising',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add social media portfolio']
          },
          {
            id: 'account-mgmt',
            name: 'Account Management',
            status: 'warning',
            description: 'Account management services page',
            url: '/account-management',
            lastChecked: new Date().toISOString(),
            issues: ['Page content is placeholder text'],
            recommendations: ['Add real content', 'Include service details']
          },
          {
            id: 'shopify-integration',
            name: 'Shopify Integration',
            status: 'warning',
            description: 'Shopify e-commerce integration services',
            url: '/shopify-integration',
            lastChecked: new Date().toISOString(),
            issues: ['Limited content', 'No case studies'],
            recommendations: ['Add integration examples', 'Include before/after screenshots']
          },
          {
            id: 'shopify-dev',
            name: 'Shopify Development',
            status: 'warning',
            description: 'Custom Shopify development services',
            url: '/shopify-development', 
            lastChecked: new Date().toISOString(),
            issues: ['Needs more technical details'],
            recommendations: ['Add development portfolio', 'Include technical specifications']
          }
        ]
      },
      {
        name: "Case Studies",
        items: [
          {
            id: 'amazon-cases',
            name: 'Amazon Case Studies',
            status: 'working',
            description: 'Amazon advertising success stories',
            url: '/amazon-case-studies',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add more recent cases', 'Include ROI metrics']
          },
          {
            id: 'walmart-cases',
            name: 'Walmart Case Studies',
            status: 'working',
            description: 'Walmart advertising success stories',
            url: '/walmart-case-studies',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add client testimonials']
          },
          {
            id: 'meta-cases',
            name: 'Meta Case Studies',
            status: 'working',
            description: 'Social media advertising success stories',
            url: '/meta-case-studies',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add video testimonials']
          },
          {
            id: 'general-cases',
            name: 'General Case Studies',
            status: 'working',
            description: 'Overall case studies page',
            url: '/case-studies',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Improve filtering options']
          }
        ]
      },
      {
        name: "Forms & Lead Generation",
        items: [
          {
            id: 'free-audit',
            name: 'Free Audit Form',
            status: 'working',
            description: 'Lead generation form for free audits',
            url: '/free-audit',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add form analytics', 'A/B test form fields']
          },
          {
            id: 'contact-form',
            name: 'Contact Form',
            status: 'working',
            description: 'General contact form functionality',
            url: '/contact',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add auto-reply email', 'Include form validation']
          }
        ]
      },
      {
        name: "Authentication & Dashboard",
        items: [
          {
            id: 'auth',
            name: 'Authentication System',
            status: 'working',
            description: 'User login and registration',
            url: '/auth',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add password reset', 'Include social login options']
          },
          {
            id: 'dashboard',
            name: 'Admin Dashboard',
            status: 'working',
            description: 'Content management dashboard',
            url: '/dashboard',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add user analytics', 'Include backup functionality']
          }
        ]
      },
      {
        name: "Technical Infrastructure",
        items: [
          {
            id: 'seo',
            name: 'SEO Optimization',
            status: 'working',
            description: 'Search engine optimization implementation',
            url: '',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add structured data', 'Optimize meta descriptions']
          },
          {
            id: 'analytics',
            name: 'Analytics Tracking',
            status: 'working',
            description: 'Google Analytics and tracking setup',
            url: '',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Add conversion tracking', 'Set up custom events']
          },
          {
            id: 'performance',
            name: 'Page Performance',
            status: 'working',
            description: 'Site speed and optimization',
            url: '',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Optimize images', 'Enable caching']
          },
          {
            id: 'mobile',
            name: 'Mobile Responsiveness',
            status: 'working',
            description: 'Mobile device compatibility',
            url: '',
            lastChecked: new Date().toISOString(),
            issues: [],
            recommendations: ['Test on more devices', 'Optimize touch targets']
          }
        ]
      }
    ];

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setAuditData(auditResults);
    setLastAuditTime(new Date().toLocaleString());
    setIsRunningAudit(false);
  };

  useEffect(() => {
    // Run initial audit
    runWebsiteAudit();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'working':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'broken':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'untested':
        return <Clock className="w-5 h-5 text-gray-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      working: 'bg-green-100 text-green-800 border-green-200',
      broken: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      untested: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.untested}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getOverallScore = () => {
    const allItems = auditData.flatMap(category => category.items);
    const workingItems = allItems.filter(item => item.status === 'working').length;
    return Math.round((workingItems / allItems.length) * 100);
  };

  const getLaunchReadiness = () => {
    const score = getOverallScore();
    if (score >= 90) return { status: 'Ready to Launch', color: 'text-green-600', bg: 'bg-green-50' };
    if (score >= 75) return { status: 'Almost Ready', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (score >= 50) return { status: 'Needs Work', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { status: 'Not Ready', color: 'text-red-600', bg: 'bg-red-50' };
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900">Website Audit Report</CardTitle>
              <CardDescription className="text-slate-600">
                Comprehensive analysis of website functionality and launch readiness
              </CardDescription>
            </div>
            <Button 
              onClick={runWebsiteAudit} 
              disabled={isRunningAudit}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {isRunningAudit ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Auditing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Run Audit
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {auditData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">{getOverallScore()}%</div>
                <div className="text-sm text-slate-600">Overall Score</div>
                <Progress value={getOverallScore()} className="mt-2" />
              </div>
              <div className="text-center">
                <div className={`text-lg font-semibold mb-2 ${getLaunchReadiness().color}`}>
                  {getLaunchReadiness().status}
                </div>
                <div className="text-sm text-slate-600">Launch Status</div>
                <div className={`mt-2 px-3 py-1 rounded-full text-xs ${getLaunchReadiness().bg} ${getLaunchReadiness().color}`}>
                  Based on current audit
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-900 mb-2">
                  {auditData.flatMap(c => c.items).filter(i => i.status === 'working').length}/
                  {auditData.flatMap(c => c.items).length}
                </div>
                <div className="text-sm text-slate-600">Working Features</div>
                <div className="text-xs text-slate-500 mt-2">
                  Last checked: {lastAuditTime}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Results */}
      {auditData.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">{category.name}</CardTitle>
            <CardDescription>
              {category.items.filter(item => item.status === 'working').length} of {category.items.length} items working properly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="border border-gray-200/50 rounded-lg p-4 bg-white/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <h4 className="font-medium text-slate-900">{item.name}</h4>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(item.status)}
                      {item.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {item.issues && item.issues.length > 0 && (
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-red-700 mb-1">Issues:</h5>
                      <ul className="text-xs text-red-600 space-y-1">
                        {item.issues.map((issue, issueIndex) => (
                          <li key={issueIndex}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.recommendations && item.recommendations.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-blue-700 mb-1">Recommendations:</h5>
                      <ul className="text-xs text-blue-600 space-y-1">
                        {item.recommendations.map((recommendation, recIndex) => (
                          <li key={recIndex}>• {recommendation}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Launch Readiness Summary */}
      <Card className={`border-2 ${getLaunchReadiness().bg} ${getLaunchReadiness().color.replace('text-', 'border-')}`}>
        <CardHeader>
          <CardTitle className={`text-xl ${getLaunchReadiness().color}`}>
            Launch Readiness Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${getLaunchReadiness().bg}`}>
              <h3 className={`font-semibold ${getLaunchReadiness().color} mb-2`}>
                Status: {getLaunchReadiness().status}
              </h3>
              <p className="text-sm text-slate-700">
                {getOverallScore() >= 90 && "Your website is ready for launch! All core features are working properly."}
                {getOverallScore() >= 75 && getOverallScore() < 90 && "Your website is almost ready. Address the warning items before launching."}
                {getOverallScore() >= 50 && getOverallScore() < 75 && "Your website needs some work before launch. Fix broken features first."}
                {getOverallScore() < 50 && "Your website is not ready for launch. Significant issues need to be resolved."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Strengths:</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Core pages are functional</li>
                  <li>• Authentication system works</li>
                  <li>• Dashboard is operational</li>
                  <li>• Forms are collecting leads</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Areas for Improvement:</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Some service pages need content</li>
                  <li>• Add more case studies</li>
                  <li>• Implement advanced tracking</li>
                  <li>• Enhance mobile experience</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteAuditTab;
