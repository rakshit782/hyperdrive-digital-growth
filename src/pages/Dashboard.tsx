import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';
import { OverviewSection } from '@/components/dashboard/OverviewSection';
import { ContactsSection } from '@/components/dashboard/ContactsSection';
import { LeadsSection } from '@/components/dashboard/LeadsSection';
import { NewsletterSection } from '@/components/dashboard/NewsletterSection';
import { SecuritySection } from '@/components/dashboard/SecuritySection';
import { SettingsSection } from '@/components/dashboard/SettingsSection';
import { LegalPagesSection } from '@/components/dashboard/LegalPagesSection';
import { PricingSection } from '@/components/dashboard/PricingSection';
import { databaseService } from '@/services/databaseService';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [contacts, setContacts] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [securityLogs, setSecurityLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/dashboard/login');
        return;
      }

      if (user.role !== 'admin') {
        toast.error('Access denied. Admin role required.');
        navigate('/dashboard/login');
        return;
      }

      loadAllData();
    }
  }, [user, authLoading, navigate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [contactsData, leadsData, newslettersData, logsData] = await Promise.all([
        databaseService.getContactSubmissions(100),
        databaseService.getLeads(100),
        databaseService.getSecurityLogs(100),
        databaseService.getSecurityLogs(50),
      ]);

      setContacts(contactsData.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
      setLeads(leadsData.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
      
      // Note: newsletters need a separate endpoint - for now using empty array
      setNewsletters([]);
      setSecurityLogs(logsData.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: string) => {
    // Implement delete via API
    toast.info('Delete functionality coming soon');
  };

  const deleteLead = async (id: string) => {
    // Implement delete via API
    toast.info('Delete functionality coming soon');
  };

  const deleteNewsletter = async (id: string) => {
    // Implement delete via API
    toast.info('Delete functionality coming soon');
  };

  const handleLogout = () => {
    logout();
    navigate('/dashboard/login');
  };

  const stats = {
    contacts: contacts.length,
    leads: leads.length,
    newsletters: newsletters.length,
    securityLogs: securityLogs.length,
  };

  const renderSection = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      );
    }

    switch (activeSection) {
      case 'overview':
        return <OverviewSection stats={stats} />;
      case 'contacts':
        return (
          <ContactsSection
            contacts={contacts}
            onDelete={deleteContact}
            onRefresh={loadAllData}
          />
        );
      case 'leads':
        return (
          <LeadsSection leads={leads} onDelete={deleteLead} onRefresh={loadAllData} />
        );
      case 'newsletter':
        return (
          <NewsletterSection
            newsletters={newsletters}
            onDelete={deleteNewsletter}
            onRefresh={loadAllData}
          />
        );
      case 'security':
        return <SecuritySection logs={securityLogs} onRefresh={loadAllData} />;
      case 'settings':
        return <SettingsSection />;
      case 'legal':
        return <LegalPagesSection />;
      case 'pricing-management':
        return <PricingSection />;
      default:
        return <OverviewSection stats={stats} />;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={handleLogout}
        />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card flex items-center px-6 gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            {user && (
              <div className="ml-auto text-sm text-muted-foreground">
                {user.email}
              </div>
            )}
          </header>

          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">{renderSection()}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
