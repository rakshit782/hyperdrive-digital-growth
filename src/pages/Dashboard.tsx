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
import { HeaderSettingsSection } from '@/components/dashboard/HeaderSettingsSection';
import { LegalPagesSection } from '@/components/dashboard/LegalPagesSection';
import { TrackingSection } from '@/components/dashboard/TrackingSection';
import { VisitorLogsSection } from '@/components/dashboard/VisitorLogsSection';
import { CertificatesSection } from '@/components/dashboard/CertificatesSection';
import { BulkCaseStudiesSection } from '@/components/dashboard/BulkCaseStudiesSection';
import { SystemStatusSection } from '@/components/dashboard/SystemStatusSection';
import { databaseService } from '@/services/databaseService';
import { getVisitorLogs } from '@/utils/visitorTracker';
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
  const [visitorLogs, setVisitorLogs] = useState<any[]>([]);
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

  const loadAllData = async (forceRefresh: boolean = false) => {
    setLoading(true);
    try {
      const [contactsData, leadsData, newslettersData, logsData, visitorLogsData] = await Promise.all([
        databaseService.getContactSubmissions(100, forceRefresh).catch(() => []),
        databaseService.getLeads(100, forceRefresh).catch(() => []),
        databaseService.getNewsletters(100).catch(() => []),
        databaseService.getSecurityLogs(100, forceRefresh).catch(() => []),
        getVisitorLogs(100).catch(() => []),
      ]);

      const safeContacts = Array.isArray(contactsData) ? contactsData : [];
      const safeLeads = Array.isArray(leadsData) ? leadsData : [];
      const safeNewsletters = Array.isArray(newslettersData) ? newslettersData : [];
      const safeLogs = Array.isArray(logsData) ? logsData : [];
      const safeVisitorLogs = Array.isArray(visitorLogsData) ? visitorLogsData : [];

      setContacts(safeContacts.sort((a: any, b: any) => 
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      ));
      setLeads(safeLeads.sort((a: any, b: any) => 
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      ));
      setNewsletters(safeNewsletters.sort((a: any, b: any) => 
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      ));
      setSecurityLogs(safeLogs.sort((a: any, b: any) => 
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      ));
      setVisitorLogs(safeVisitorLogs.sort((a: any, b: any) => 
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      ));
    } catch (error) {
      console.warn('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => loadAllData(true);

  const deleteContact = async (id: string) => {
    try {
      await databaseService.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      toast.success('Contact submission deleted from database');
    } catch (error) {
      console.error('Failed to delete contact:', error);
      toast.error('Failed to delete contact submission');
    }
  };

  const deleteLead = async (id: string) => {
    try {
      await databaseService.deleteLead(id);
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
      toast.success('Lead permanently deleted from database');
    } catch (error) {
      console.error('Failed to delete lead:', error);
      toast.error('Failed to delete lead from database');
    }
  };

  const deleteLeadsBulk = async (ids: string[]) => {
    try {
      await databaseService.deleteLeadsBulk(ids);
      setLeads((prev) => prev.filter((lead) => !ids.includes(lead.id)));
      toast.success(`${ids.length} leads permanently deleted from database`);
    } catch (error) {
      console.error('Failed to bulk delete leads:', error);
      toast.error('Failed to delete selected leads');
    }
  };

  const deleteNewsletter = async (id: string) => {
    try {
      await databaseService.deleteNewsletter(id);
      setNewsletters((prev) => prev.filter((item) => item.id !== id));
      toast.success('Subscriber deleted from database');
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
      toast.error('Failed to delete subscriber');
    }
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

    if (activeSection === 'leads') {
      return (
        <LeadsSection
          leads={leads}
          onDelete={deleteLead}
          onBulkDelete={deleteLeadsBulk}
          onRefresh={handleRefresh}
        />
      );
    }

    if (activeSection === 'settings' || activeSection.startsWith('settings-')) {
      const sub = activeSection.startsWith('settings-') ? activeSection.replace('settings-', '') : 'general';
      return <SettingsSection activeSubSection={sub} onSubSectionChange={(s) => setActiveSection(`settings-${s}`)} />;
    }

    switch (activeSection) {
      case 'overview':
        return (
          <OverviewSection 
            stats={stats} 
            leads={leads}
            contacts={contacts}
            onNavigate={setActiveSection}
            onRefresh={handleRefresh}
          />
        );
      case 'contacts':
        return (
          <ContactsSection
            contacts={contacts}
            onDelete={deleteContact}
            onRefresh={handleRefresh}
          />
        );
      case 'newsletter':
        return (
          <NewsletterSection
            newsletters={newsletters}
            onDelete={deleteNewsletter}
            onRefresh={handleRefresh}
          />
        );
      case 'security':
        return <SecuritySection logs={securityLogs} onRefresh={handleRefresh} />;
      case 'visitor-logs':
        return <VisitorLogsSection logs={visitorLogs} onRefresh={handleRefresh} />;
      case 'tracking':
        return <TrackingSection />;
      case 'status':
        return <SystemStatusSection />;
      case 'header-settings':
        return <HeaderSettingsSection />;
      case 'certificates':
        return <CertificatesSection />;
      case 'case-studies':
        return <BulkCaseStudiesSection />;
      case 'legal':
        return <LegalPagesSection />;
      default:
        return <OverviewSection stats={stats} />;
    }
  };

  if (authLoading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground font-medium">Verifying authorization...</p>
        </div>
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
          <header className="h-16 border-b border-border/60 bg-card/70 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6 gap-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="h-4 w-px bg-border/80 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:inline">
                  Admin
                </span>
                <span className="text-muted-foreground/40 hidden sm:inline">/</span>
                <h1 className="text-sm sm:text-base font-bold capitalize text-foreground">
                  {activeSection.replace('settings-', 'Settings: ').replace('-', ' ')}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleRefresh}
                title="Refresh Database Data"
                className="h-8 px-2.5 rounded-lg border border-border/80 bg-background hover:bg-accent text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">Neon Sync</span>
              </button>

              {user && (
                <div className="flex items-center gap-2 pl-2 border-l border-border/60">
                  <div className="h-7 w-7 rounded-full bg-primary/10 text-primary font-semibold text-xs flex items-center justify-center border border-primary/20">
                    {user.email?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-medium text-foreground leading-tight truncate max-w-[140px]">
                      {user.email}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-tight capitalize">
                      {user.role || 'Super Admin'}
                    </p>
                  </div>
                </div>
              )}
            </div>
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
