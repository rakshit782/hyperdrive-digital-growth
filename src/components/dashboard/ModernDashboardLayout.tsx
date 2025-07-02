
import { ReactNode } from 'react';

interface ModernDashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

const ModernDashboardLayout = ({ children, title, description, action }: ModernDashboardLayoutProps) => {
  return (
    <div className="min-h-screen dashboard-minimal">
      <div className="container-minimal py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="space-minimal-sm">
              <h1 className="text-minimal-3xl heading-minimal">{title}</h1>
              {description && (
                <p className="text-minimal text-minimal-base">{description}</p>
              )}
            </div>
            {action && <div>{action}</div>}
          </div>
          <div className="h-px bg-border w-16"></div>
        </div>
        
        <div className="dashboard-card-minimal p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModernDashboardLayout;
