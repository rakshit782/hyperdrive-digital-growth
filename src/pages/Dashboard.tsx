import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DashboardUser {
  id: string;
  email?: string;
  role: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user: authUser }, error } = await supabase.auth.getUser();
      
      if (error || !authUser) {
        // For demo purposes, create a mock admin user
        setUser({
          id: "demo-user",
          email: "admin@example.com",
          role: "admin"
        });
      } else {
        // Check user role from database
        const { data: userRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', authUser.id)
          .maybeSingle();

        setUser({
          id: authUser.id,
          email: authUser.email,
          role: userRole?.role || "admin"
        });
      }
    } catch (error) {
      console.error('Error checking user:', error);
      // Fallback to demo user
      setUser({
        id: "demo-user",
        email: "admin@example.com",
        role: "admin"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      window.location.href = "/";
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title="Dashboard - E-commerce Management System"
        description="Manage your multi-platform e-commerce business with our comprehensive dashboard."
      />
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen flex w-full bg-background">
          <DashboardSidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            user={user}
            onSignOut={handleSignOut}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader user={user} onSignOut={handleSignOut} />
            <main className="flex-1 overflow-y-auto bg-slate-50/50">
              <DashboardContent activeTab={activeTab} user={user} />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Dashboard;