
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users,
  Globe,
  LogOut,
  Menu,
  Lock,
  MousePointer,
  Mail,
  UserCheck,
  Search,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { auth0ConfigManager } from '@/utils/auth0Config';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardLayout = ({ children, activeTab, onTabChange }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Check if Auth0 is configured
  const auth0Config = auth0ConfigManager.getConfig();
  const isAuth0Configured = auth0Config && auth0Config.isActive && auth0Config.domain && auth0Config.clientId;
  
  // Only use Auth0 hooks if it's configured
  const auth0Result = isAuth0Configured ? useAuth0() : { user: null, isAuthenticated: false, isLoading: false, logout: () => {} };
  const { user, isAuthenticated, isLoading, logout } = auth0Result;

  // Show loading only if Auth0 is configured and loading
  if (isAuth0Configured && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const navigation = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'website', name: 'Website', icon: Globe },
    { id: 'auth0', name: 'Auth0 Setup', icon: Lock },
    { id: 'pages', name: 'Pages', icon: FileText },
    { id: 'homepage', name: 'Homepage', icon: MousePointer },
    { id: 'blog', name: 'Blog', icon: FileText },
    { id: 'contacts', name: 'Contacts', icon: Mail },
    { id: 'leads', name: 'Leads', icon: UserCheck },
    { id: 'seo', name: 'SEO', icon: Search },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-sm border-r transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {isAuth0Configured && user ? (user.name || user.email) : 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {isAuth0Configured ? 'Authenticated' : 'Demo Mode'}
                </p>
              </div>
            )}
            {isAuth0Configured && isAuthenticated && (
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {!isAuth0Configured && activeTab !== 'auth0' && (
              <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-yellow-600 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Authentication Not Configured</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      You're in demo mode. Configure Auth0 authentication for production use.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
