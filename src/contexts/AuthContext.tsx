
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  fullName?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // For now, we're using Auth0 for authentication which is handled by the Auth0Provider
        // No need to check for current user here as Auth0 handles this
        console.log('Auth system initialized - using Auth0 for authentication');
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleSignIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // This is a placeholder - actual Auth0 authentication is handled by the Auth0Provider and useAuth0 hook
      // Users should use the Auth0 login components instead
      return { success: false, error: 'Please use Auth0 authentication. Configure Auth0 in the dashboard and use the Auth0 login components.' };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: String(error) };
    }
  };

  const handleSignUp = async (email: string, password: string, fullName?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // This is a placeholder - actual Auth0 registration is handled by the Auth0Provider
      // Users should use the Auth0 signup components instead
      return { success: false, error: 'Please use Auth0 for user registration. Configure Auth0 in the dashboard and use the Auth0 signup components.' };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: String(error) };
    }
  };

  const handleSignOut = async () => {
    try {
      // This is a placeholder - actual Auth0 signout is handled by the Auth0Provider
      // Users should use the Auth0 logout components instead
      setUser(null);
      console.log('Please use Auth0 logout functionality');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    user,
    loading,
    signOut: handleSignOut,
    signIn: handleSignIn,
    signUp: handleSignUp,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
