
import { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ModernDashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  category?: string;
  icon?: ReactNode;
}

const ModernDashboardLayout = ({ 
  children, 
  title, 
  description, 
  action, 
  category,
  icon 
}: ModernDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="ml-[280px] p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {icon && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                    {icon}
                  </div>
                )}
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
                    {category && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                        {category}
                      </Badge>
                    )}
                  </div>
                  {description && (
                    <p className="text-gray-600 text-base max-w-2xl leading-relaxed">{description}</p>
                  )}
                </div>
              </div>
              {action && (
                <div className="flex items-center space-x-3">
                  {action}
                </div>
              )}
            </div>
          </div>

          {/* Content Card */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-8">
              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboardLayout;
