
import { createContext, useContext, useEffect, useState } from 'react';
import { clerkManager } from '@/utils/clerkManager';
import { auth0Manager } from '@/utils/auth0Manager';

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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
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
    // Check which auth provider is active and initialize accordingly
    const initializeAuth = async () => {
      try {
        if (clerkManager.isActive()) {
          // Initialize Clerk if active
          console.log('Initializing Clerk authentication...');
          // Clerk initialization would happen here
        } else if (auth0Manager.isActive()) {
          // Initialize Auth0 if active
          console.log('Initializing Auth0 authentication...');
          // Auth0 initialization would happen here
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (clerkManager.isActive()) {
        // Implement Clerk sign in
        console.log('Signing in with Clerk...');
        return { success: true };
      } else if (auth0Manager.isActive()) {
        // Implement Auth0 sign in
        console.log('Signing in with Auth0...');
        return { success: true };
      } else {
        return { success: false, error: 'No authentication provider is active' };
      }
    } catch (error) {
      return { success: false, error: String(error) };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (clerkManager.isActive()) {
        // Implement Clerk sign up
        console.log('Signing up with Clerk...');
        return { success: true };
      } else if (auth0Manager.isActive()) {
        // Implement Auth0 sign up
        console.log('Signing up with Auth0...');
        return { success: true };
      } else {
        return { success: false, error: 'No authentication provider is active' };
      }
    } catch (error) {
      return { success: false, error: String(error) };
    }
  };

  const signOut = async () => {
    try {
      if (clerkManager.isActive()) {
        // Implement Clerk sign out
        console.log('Signing out with Clerk...');
      } else if (auth0Manager.isActive()) {
        // Implement Auth0 sign out
        console.log('Signing out with Auth0...');
      }
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    user,
    loading,
    signOut,
    signIn,
    signUp,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
