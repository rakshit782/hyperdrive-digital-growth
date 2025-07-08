
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
    <div className="space-y-6">
      {/* Modern Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {icon && (
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              {icon}
            </div>
          )}
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
              {category && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {category}
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">{description}</p>
            )}
          </div>
        </div>
        {action && (
          <div className="flex items-center space-x-2">
            {action}
          </div>
        )}
      </div>

      <Separator className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
      
      {/* Content Card */}
      <Card className="crm-card border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="space-y-6">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernDashboardLayout;
