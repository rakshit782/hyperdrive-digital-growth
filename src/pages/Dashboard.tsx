
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
  Phone
} from "lucide-react";
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

  const tabs = [
    { id: "stats", label: "Stats", icon: BarChart3 },
    { id: "case-studies", label: "Case Studies", icon: FileText },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "pricing", label: "Pricing", icon: Database },
    { id: "seo", label: "SEO", icon: Globe },
    { id: "integrations", label: "Integrations", icon: Settings },
    { id: "email", label: "Email", icon: Mail },
    { id: "leads", label: "Leads", icon: Users },
    { id: "media", label: "Media", icon: Image },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "website", label: "Website", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <nav className="mt-6">
            {tabs.map((tab) => {
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
  );
};

export default Dashboard;
