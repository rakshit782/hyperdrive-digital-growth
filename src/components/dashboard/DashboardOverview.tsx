
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FileText, Globe, Users, TrendingUp, Eye, MousePointer, Mail } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import RealTimeUpdater from "./RealTimeUpdater";

const DashboardOverview = () => {
  const { stats, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const overviewCards = [
    {
      title: "Total Pages",
      value: stats.totalPages,
      icon: FileText,
      description: "Published pages",
      trend: "+2 this week"
    },
    {
      title: "Blog Posts",
      value: stats.totalPosts,
      icon: FileText,
      description: "Published articles",
      trend: "+1 this week"
    },
    {
      title: "Media Files",
      value: stats.totalMedia,
      icon: Globe,
      description: "Uploaded files",
      trend: "+5 this week"
    },
    {
      title: "Active Scripts",
      value: stats.activeScripts,
      icon: BarChart3,
      description: "Tracking scripts",
      trend: "All active"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Monitor your website performance and content</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-green-600 font-medium">{card.trend}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Real-time Updates and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RealTimeUpdater />
        
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mr-3">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow text-left">
                <FileText className="w-5 h-5 text-blue-600 mb-2" />
                <div className="text-sm font-medium text-blue-900">Create Page</div>
                <div className="text-xs text-blue-600">Add new content</div>
              </button>
              
              <button className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow text-left">
                <Globe className="w-5 h-5 text-green-600 mb-2" />
                <div className="text-sm font-medium text-green-900">Update Website</div>
                <div className="text-xs text-green-600">Modify settings</div>
              </button>
              
              <button className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow text-left">
                <BarChart3 className="w-5 h-5 text-purple-600 mb-2" />
                <div className="text-sm font-medium text-purple-900">View Analytics</div>
                <div className="text-xs text-purple-600">Check performance</div>
              </button>
              
              <button className="p-3 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow text-left">
                <Mail className="w-5 h-5 text-orange-600 mb-2" />
                <div className="text-sm font-medium text-orange-900">Manage Contacts</div>
                <div className="text-xs text-orange-600">View submissions</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Website Preview */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg mr-3">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Live Website Preview</CardTitle>
                <CardDescription>See your website as visitors do</CardDescription>
              </div>
            </div>
            <button 
              onClick={() => window.open('/', '_blank')}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow text-sm font-medium"
            >
              Open Website
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-600">
              <Globe className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p className="font-medium">Website Preview</p>
              <p className="text-sm">Click "Open Website" to view your live site</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
