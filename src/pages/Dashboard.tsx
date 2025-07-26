import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  LogOut
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
    { id: "stats", label: "Stats", icon: BarChart3, roles: ['admin', 'editor'] },
    { id: "case-studies", label: "Case Studies", icon: FileText, roles: ['admin', 'editor'] },
    { id: "blog", label: "Blog", icon: FileText, roles: ['admin', 'editor'] },
    { id: "pricing", label: "Pricing", icon: Database, roles: ['admin'] },
    { id: "seo", label: "SEO", icon: Globe, roles: ['admin'] },
    { id: "integrations", label: "Integrations", icon: Settings, roles: ['admin'] },
    { id: "email", label: "Email", icon: Mail, roles: ['admin'] },
    { id: "leads", label: "Leads", icon: Users, roles: ['admin', 'editor'] },
    { id: "media", label: "Media", icon: Image, roles: ['admin'] },
    { id: "contact", label: "Contact", icon: Phone, roles: ['admin'] },
    { id: "website", label: "Website", icon: Settings, roles: ['admin'] },
  ];

  // Filter tabs based on user role
  const availableTabs = tabs.filter(tab => 
    tab.roles.includes(userRole || 'user')
  );

  return (
    <AuthGuard requiredRole={['admin', 'editor']}>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-lg">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <div className="mt-2 text-sm text-gray-500">
                Welcome, {user?.email}
                <br />
                Role: {userRole}
              </div>
            </div>
            <nav className="mt-6">
              {availableTabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 border-r-2 border-blue-500 text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
              
              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors text-red-600 mt-4 border-t"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              {activeTab === "stats" && <StatsTab />}
              {activeTab === "case-studies" && <CaseStudiesTab />}
              {activeTab === "blog" && <BlogTab />}
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
    </AuthGuard>
  );
};

export default Dashboard;
