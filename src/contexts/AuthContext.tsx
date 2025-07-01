
import { createContext, useContext, useEffect, useState } from 'react';
import { amplifyManager } from '@/utils/amplifyManager';
import { cognitoManager } from '@/utils/cognitoManager';
import { signUp, signIn, signOut, getCurrentUser } from 'aws-amplify/auth';
import { integrationManager } from '@/utils/integrationManager';

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
        // Initialize all integrations on app start
        integrationManager.initializeAllIntegrations();

        // Check for current user if authentication is configured
        if (amplifyManager.isActive()) {
          try {
            const currentUser = await getCurrentUser();
            if (currentUser) {
              setUser({
                id: currentUser.userId,
                email: currentUser.signInDetails?.loginId || '',
                fullName: currentUser.signInDetails?.loginId || '',
              });
            }
          } catch (error) {
            console.log('No current Amplify user found');
          }
        } else if (cognitoManager.isActive()) {
          try {
            const currentUser = cognitoManager.getCurrentUser();
            if (currentUser) {
              currentUser.getSession((err: any, session: any) => {
                if (!err && session.isValid()) {
                  const accessToken = session.getAccessToken();
                  setUser({
                    id: accessToken.payload.sub,
                    email: accessToken.payload.username || accessToken.payload.email,
                    fullName: accessToken.payload.given_name || accessToken.payload.username,
                  });
                }
              });
            }
          } catch (error) {
            console.log('No current Cognito user found');
          }
        }
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
      if (amplifyManager.isActive()) {
        const result = await signIn({ username: email, password });
        if (result.isSignedIn) {
          const currentUser = await getCurrentUser();
          setUser({
            id: currentUser.userId,
            email: email,
            fullName: email,
          });
          integrationManager.notifyIntegrationUpdate();
          return { success: true };
        }
        return { success: false, error: 'Sign in not completed' };
      } else if (cognitoManager.isActive()) {
        const result = await cognitoManager.signIn(email, password);
        const accessToken = result.getAccessToken();
        if (accessToken) {
          setUser({
            id: accessToken.payload.sub,
            email: email,
            fullName: accessToken.payload.given_name || email,
          });
          integrationManager.notifyIntegrationUpdate();
          return { success: true };
        }
        return { success: false, error: 'Authentication failed' };
      } else {
        return { success: false, error: 'No authentication provider is configured. Please configure AWS Amplify or Cognito in the dashboard.' };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: String(error) };
    }
  };

  const handleSignUp = async (email: string, password: string, fullName?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (amplifyManager.isActive()) {
        const result = await signUp({
          username: email,
          password,
          options: {
            userAttributes: {
              email,
              given_name: fullName || '',
            },
          },
        });
        
        if (result.userId) {
          return { success: true };
        }
        return { success: false, error: 'Sign up failed' };
      } else if (cognitoManager.isActive()) {
        const result = await cognitoManager.signUp(email, password, {
          given_name: fullName || '',
          email: email,
        });
        
        if (result.user) {
          return { success: true };
        }
        return { success: false, error: 'Sign up failed' };
      } else {
        return { success: false, error: 'No authentication provider is configured. Please configure AWS Amplify or Cognito in the dashboard.' };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: String(error) };
    }
  };

  const handleSignOut = async () => {
    try {
      if (amplifyManager.isActive()) {
        await signOut();
      } else if (cognitoManager.isActive()) {
        cognitoManager.signOut();
      }
      setUser(null);
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
