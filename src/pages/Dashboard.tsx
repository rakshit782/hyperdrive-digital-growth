
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  BarChart3, 
  FileText, 
  Database,
  Globe,
  Mail,
  Users,
  Image,
  Phone,
  LogOut,
  Layout,
  Star
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import AuthGuard from "@/components/AuthGuard";
import StatsTab from "@/components/dashboard/StatsTab";
import CaseStudiesTab from "@/components/dashboard/CaseStudiesTab";
import BlogTab from "@/components/dashboard/BlogTab";
import PricingTab from "@/components/dashboard/PricingTab";
import SEOTab from "@/components/dashboard/SEOTab";
import IntegrationsTab from "@/components/dashboard/IntegrationsTab";
import EmailTab from "@/components/dashboard/EmailTab";
import LeadsTab from "@/components/dashboard/LeadsTab";
import MediaTab from "@/components/dashboard/MediaTab";
import ContactTab from "@/components/dashboard/ContactTab";
import WebsiteSettingsTab from "@/components/dashboard/WebsiteSettingsTab";
import ServicePageManagement from "@/components/dashboard/ServicePageManagement";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const { user, signOut, userRole } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      // Redirect handled by auth state change
    }
  };

  const tabs = [
    { id: "stats", label: "Analytics", icon: BarChart3, roles: ['admin', 'editor'], color: "text-blue-600" },
    { id: "case-studies", label: "Case Studies", icon: FileText, roles: ['admin', 'editor'], color: "text-green-600" },
    { id: "blog", label: "Blog", icon: FileText, roles: ['admin', 'editor'], color: "text-purple-600" },
    { id: "service-pages", label: "Services", icon: Layout, roles: ['admin', 'editor'], color: "text-indigo-600" },
    { id: "pricing", label: "Pricing", icon: Database, roles: ['admin'], color: "text-emerald-600" },
    { id: "seo", label: "SEO", icon: Globe, roles: ['admin'], color: "text-cyan-600" },
    { id: "integrations", label: "Integrations", icon: Settings, roles: ['admin'], color: "text-orange-600" },
    { id: "email", label: "Email", icon: Mail, roles: ['admin'], color: "text-red-600" },
    { id: "leads", label: "Leads", icon: Users, roles: ['admin', 'editor'], color: "text-pink-600" },
    { id: "media", label: "Media", icon: Image, roles: ['admin'], color: "text-yellow-600" },
    { id: "contact", label: "Contact", icon: Phone, roles: ['admin'], color: "text-teal-600" },
    { id: "website", label: "Settings", icon: Settings, roles: ['admin'], color: "text-gray-600" },
  ];

  // Filter tabs based on user role
  const availableTabs = tabs.filter(tab => 
    tab.roles.includes(userRole || 'user')
  );

  return (
    <AuthGuard requiredRole={['admin', 'editor']}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex">
          {/* Modern Sidebar */}
          <div className="w-72 bg-white/95 backdrop-blur-sm shadow-xl border-r border-gray-200/50">
            {/* Header */}
            <div className="p-8 border-b border-gray-200/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
                <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200">
                  {userRole}
                </Badge>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              {availableTabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                        : "text-gray-700 hover:bg-gray-50 hover:scale-105"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      activeTab === tab.id 
                        ? "bg-white/20" 
                        : "bg-gray-100 group-hover:bg-gray-200"
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        activeTab === tab.id ? "text-white" : tab.color
                      }`} />
                    </div>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
              
              {/* Sign Out Button */}
              <div className="pt-4 mt-4 border-t border-gray-200/50">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 text-red-600 hover:bg-red-50 hover:scale-105 group"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-red-100 group-hover:bg-red-200">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              <div className="max-w-7xl mx-auto">
                {/* Content Cards with modern styling */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                  <div className="p-8">
                    {activeTab === "stats" && <StatsTab />}
                    {activeTab === "case-studies" && <CaseStudiesTab />}
                    {activeTab === "blog" && <BlogTab />}
                    {activeTab === "service-pages" && <ServicePageManagement />}
                    {activeTab === "pricing" && <PricingTab />}
                    {activeTab === "seo" && <SEOTab />}
                    {activeTab === "integrations" && <IntegrationsTab />}
                    {activeTab === "email" && <EmailTab />}
                    {activeTab === "leads" && <LeadsTab />}
                    {activeTab === "media" && <MediaTab />}
                    {activeTab === "contact" && <ContactTab />}
                    {activeTab === "website" && <WebsiteSettingsTab />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
