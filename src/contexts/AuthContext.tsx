import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, User, AuthSession } from '@/services/authService';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: AuthSession | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (email: string, password: string, full_name?: string) => Promise<{ error: string | null }>;
  logout: () => void;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    const existingSession = authService.getSession();
    
    if (existingSession) {
      const { data, error } = await authService.verifyToken();
      if (data) {
        setUser(data);
        setSession(authService.getSession());
      } else {
        console.error('Session verification failed:', error);
        authService.logout();
      }
    }
    
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await authService.login(email, password);
      
      if (error) {
        return { error };
      }

      if (data) {
        setUser(data.user);
        setSession(data);
      }

      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const signup = async (email: string, password: string, full_name?: string) => {
    try {
      const { data, error } = await authService.signup(email, password, full_name);
      
      if (error) {
        return { error };
      }

      if (data) {
        setUser(data.user);
        setSession(data);
      }

      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setSession(null);
    toast.success('Logged out successfully');
  };

  const refreshSession = async () => {
    const { data, error } = await authService.verifyToken();
    if (data) {
      setUser(data);
      setSession(authService.getSession());
    } else if (error) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, signup, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
