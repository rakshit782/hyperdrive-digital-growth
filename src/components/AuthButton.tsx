
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User } from 'lucide-react';
import { auth0ConfigManager } from '@/utils/auth0Config';

const AuthButton = () => {
  const auth0Config = auth0ConfigManager.getConfig();
  
  // If Auth0 is not configured, don't render anything
  if (!auth0Config || !auth0Config.isActive) {
    return null;
  }

  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return (
      <Button variant="outline" disabled>
        <User className="w-4 h-4 mr-2" />
        Loading...
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          Hello, {user?.name || user?.email}
        </span>
        <Button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          variant="outline"
          size="sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => loginWithRedirect()} variant="outline">
      <LogIn className="w-4 h-4 mr-2" />
      Login
    </Button>
  );
};

export default AuthButton;
