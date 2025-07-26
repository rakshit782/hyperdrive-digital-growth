
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
  fallbackPath?: string;
}

export const AuthGuard = ({ 
  children, 
  requiredRole, 
  fallbackPath = '/auth' 
}: AuthGuardProps) => {
  const { user, loading, hasRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    // Check if user is authenticated
    if (!user) {
      navigate(fallbackPath, { 
        state: { from: location },
        replace: true 
      });
      return;
    }

    // Check role requirements if specified
    if (requiredRole && !hasRole(requiredRole)) {
      navigate('/', { replace: true });
      return;
    }
  }, [user, loading, hasRole, requiredRole, navigate, location, fallbackPath]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Don't render children if not authenticated or doesn't have required role
  if (!user || (requiredRole && !hasRole(requiredRole))) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
