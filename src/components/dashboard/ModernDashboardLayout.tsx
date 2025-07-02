
import { ReactNode } from 'react';

interface ModernDashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

const ModernDashboardLayout = ({ children, title, description, action }: ModernDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-modern">
      <div className="container-modern py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text">{title}</h1>
              {description && (
                <p className="text-slate-600 mt-2">{description}</p>
              )}
            </div>
            {action && <div>{action}</div>}
          </div>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-20"></div>
        </div>
        
        <div className="dashboard-card p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModernDashboardLayout;
