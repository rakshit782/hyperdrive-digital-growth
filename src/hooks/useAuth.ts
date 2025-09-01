import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    userRole: null,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        setAuthState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
          loading: false,
        }));
        
        // Fetch user role after auth state changes
        if (session?.user) {
          setTimeout(() => {
            fetchUserRole(session.user.id);
          }, 0);
        } else {
          setAuthState(prev => ({ ...prev, userRole: null }));
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
      }));
      
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user role:', error);
        return;
      }

      setAuthState(prev => ({ 
        ...prev, 
        userRole: data?.role || 'user' 
      }));
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Confirmed",
            description: "Please check your email and click the confirmation link, or contact support for demo accounts.",
            variant: "destructive",
          });
        } else if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Invalid Credentials",
            description: "Please check your email and password and try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive",
          });
        }
        return { success: false, error: error.message };
      }

      // Log security event
      await logSecurityEvent('user_login', { email });

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Connection Error",
        description: "Unable to connect to authentication service. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Account Exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registration Error",
            description: error.message,
            variant: "destructive",
          });
        }
        return { success: false, error: error.message };
      }

      // Create default user role
      if (data.user) {
        try {
          await supabase
            .from('user_roles')
            .insert([
              {
                user_id: data.user.id,
                role: 'user',
              },
            ]);
        } catch (roleError) {
          console.error('Failed to create user role:', roleError);
        }
      }

      // Log security event
      await logSecurityEvent('user_registration', { email });

      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account.",
      });

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred during registration.",
        variant: "destructive",
      });
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Sign Out Error",
          description: error.message,
          variant: "destructive",
        });
        return { success: false, error: error.message };
      }

      // Log security event
      await logSecurityEvent('user_logout', {});

      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });

      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logSecurityEvent = async (eventType: string, eventData: any) => {
    try {
      await supabase.from('security_logs').insert([
        {
          event_type: eventType,
          user_id: authState.user?.id || null,
          ip_address: null, // Could be enhanced with IP detection
          user_agent: navigator.userAgent,
          event_data: eventData,
        },
      ]);
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  const hasRole = (requiredRole: string | string[]) => {
    if (!authState.userRole) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(authState.userRole);
    }
    
    return authState.userRole === requiredRole;
  };

  const isAdmin = () => hasRole('admin');
  const isEditor = () => hasRole(['admin', 'editor']);

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    hasRole,
    isAdmin,
    isEditor,
    logSecurityEvent,
  };
};
