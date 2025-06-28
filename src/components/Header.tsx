import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LogoSettings {
  logoUrl: string;
  logoSize: string;
  logoAlt: string;
}

interface MenuItem {
  id: string;
  title: string;
  href: string;
  enabled: boolean;
  role?: 'admin' | 'user' | 'public';
  order: number;
}

interface MenuSettings {
  items: MenuItem[];
  servicesDropdownEnabled: boolean;
  mobileMenuEnabled: boolean;
}

interface HeaderSettings {
  logoSize: string;
  logoAlt: string;
  menuGap: number;
  logoMenuGap: number;
  ctaMenuGap: number;
  ctaButtonText: string;
  ctaButtonStyle: string;
  mobileMenuEnabled: boolean;
  servicesDropdownEnabled: boolean;
  headerBackground: string;
  headerOpacity: number;
  headerBarColor: string;
  headerCustomColor: string;
  menuItems: Array<{
    title: string;
    href: string;
    enabled: boolean;
  }>;
}

const defaultMenuItems: MenuItem[] = [
  { id: '1', title: "Home", href: "/", enabled: true, role: 'public', order: 0 },
  { id: '2', title: "Pricing", href: "/pricing", enabled: true, role: 'public', order: 1 },
  { id: '3', title: "About", href: "/about", enabled: true, role: 'public', order: 2 },
  { id: '4', title: "Case Studies", href: "/case-studies", enabled: true, role: 'public', order: 3 },
  { id: '5', title: "Contact", href: "/contact", enabled: true, role: 'public', order: 4 },
];

const defaultHeaderSettings: HeaderSettings = {
  logoSize: "h-12",
  logoAlt: "AMZ AD SCOUT - The Growth Agency",
  menuGap: 1,
  logoMenuGap: 2,
  ctaMenuGap: 2,
  ctaButtonText: "Get Free Audit",
  ctaButtonStyle: "gradient",
  mobileMenuEnabled: true,
  servicesDropdownEnabled: true,
  headerBackground: "blur",
  headerOpacity: 80,
  headerBarColor: "white",
  headerCustomColor: "#ffffff",
  menuItems: [
    { title: "Home", href: "/", enabled: true },
    { title: "Pricing", href: "/pricing", enabled: true },
    { title: "About", href: "/about", enabled: true },
    { title: "Case Studies", href: "/case-studies", enabled: true },
    { title: "Contact", href: "/contact", enabled: true },
  ]
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [logoSettings, setLogoSettings] = useState<LogoSettings>({
    logoUrl: "/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png",
    logoSize: "h-12",
    logoAlt: "AMZ AD SCOUT - The Growth Agency"
  });
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings>(defaultHeaderSettings);
  const [menuSettings, setMenuSettings] = useState<MenuSettings>({
    items: defaultMenuItems,
    servicesDropdownEnabled: true,
    mobileMenuEnabled: true,
  });
  
  const { user, signOut } = useAuth();

  // Check user role (simplified for demo - in real app, this would come from user profile/roles table)
  const getUserRole = () => {
    if (!user) return 'public';
    // In a real app, you'd check the user's role from your database
    // For demo purposes, assume first user is admin
    return user.email?.includes('admin') ? 'admin' : 'user';
  };

  const userRole = getUserRole();

  // Filter menu items based on user role and enabled status
  const getVisibleMenuItems = () => {
    return menuSettings.items
      .filter(item => item.enabled)
      .filter(item => {
        if (item.role === 'public') return true;
        if (item.role === 'user' && user) return true;
        if (item.role === 'admin' && userRole === 'admin') return true;
        return false;
      })
      .sort((a, b) => a.order - b.order);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load logo settings
    const savedLogo = localStorage.getItem('logoData');
    if (savedLogo) {
      try {
        const parsed = JSON.parse(savedLogo);
        const newSettings = {
          logoUrl: parsed.logoUrl || "/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png",
          logoSize: parsed.logoSize || "h-12",
          logoAlt: parsed.logoAlt || "AMZ AD SCOUT - The Growth Agency"
        };
        setLogoSettings(newSettings);
      } catch (error) {
        console.error('Header: Failed to parse logo settings:', error);
      }
    }

    // Load header settings
    const savedHeaderSettings = localStorage.getItem('headerSettings');
    if (savedHeaderSettings) {
      try {
        const parsed = JSON.parse(savedHeaderSettings);
        setHeaderSettings({ ...defaultHeaderSettings, ...parsed });
      } catch (error) {
        console.error('Header: Failed to parse header settings:', error);
      }
    }

    // Load menu settings
    const savedMenuSettings = localStorage.getItem('menuSettings');
    if (savedMenuSettings) {
      try {
        const parsed = JSON.parse(savedMenuSettings);
        setMenuSettings(parsed);
      } catch (error) {
        console.error('Header: Failed to parse menu settings:', error);
      }
    }

    // Event listeners
    const handleLogoUpdate = (event: CustomEvent<LogoSettings>) => {
      setLogoSettings(event.detail);
    };

    const handleHeaderSettingsUpdate = (event: CustomEvent<HeaderSettings>) => {
      setHeaderSettings(event.detail);
    };

    const handleMenuSettingsUpdate = (event: CustomEvent<MenuSettings>) => {
      setMenuSettings(event.detail);
    };

    window.addEventListener('logoUpdated', handleLogoUpdate as EventListener);
    window.addEventListener('headerSettingsUpdated', handleHeaderSettingsUpdate as EventListener);
    window.addEventListener('menuSettingsUpdated', handleMenuSettingsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('logoUpdated', handleLogoUpdate as EventListener);
      window.removeEventListener('headerSettingsUpdated', handleHeaderSettingsUpdate as EventListener);
      window.removeEventListener('menuSettingsUpdated', handleMenuSettingsUpdate as EventListener);
    };
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Header: Logo failed to load:", e.currentTarget.src);
    e.currentTarget.src = "/placeholder.svg";
  };

  const handleImageLoad = () => {
    console.log("Header: Logo loaded successfully:", logoSettings.logoUrl);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const servicePages = [
    { title: "Amazon Advertising", href: "/amazon-advertising", description: "Scale your Amazon presence" },
    { title: "Walmart Advertising", href: "/walmart-advertising", description: "Grow on Walmart marketplace" },
    { title: "Meta Advertising", href: "/meta-advertising", description: "Social media marketing" },
    { title: "Account Management", href: "/account-management", description: "Professional account oversight" },
    { title: "Shopify Integration", href: "/shopify-integration", description: "E-commerce solutions" },
    { title: "Shopify Development", href: "/shopify-development", description: "Custom store development" },
  ];

  const visibleMenuItems = getVisibleMenuItems();

  const getHeaderBarColor = () => {
    return 'bg-white';
  };

  const getHeaderBackgroundStyle = () => {
    const opacity = headerSettings.headerOpacity / 100;
    return { 
      className: `bg-white/${Math.round(opacity * 100)} backdrop-blur-xl border-b border-gray-200/40 shadow-lg shadow-black/5`,
      style: {}
    };
  };

  const getCTAButtonClass = () => {
    const baseClass = "font-semibold px-6 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-0 text-sm tracking-wide";
    
    switch (headerSettings.ctaButtonStyle) {
      case 'solid':
        return `${baseClass} bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30`;
      case 'outline':
        return `${baseClass} border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent`;
      case 'gradient':
      default:
        return `${baseClass} bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 text-white shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30`;
    }
  };

  const headerBgStyle = getHeaderBackgroundStyle();

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${headerBgStyle.className}`}
      style={headerBgStyle.style}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center group flex-shrink-0">
            <a href="/" className="block">
              <img 
                src={logoSettings.logoUrl}
                alt={headerSettings.logoAlt || logoSettings.logoAlt}
                className={`${headerSettings.logoSize || logoSettings.logoSize} w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{ maxWidth: '300px', display: 'block' }}
              />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav 
            className="hidden lg:flex items-center" 
            style={{ 
              marginLeft: `${headerSettings.logoMenuGap * 0.25}rem`,
              gap: `${headerSettings.menuGap * 0.25}rem` 
            }}
          >
            {visibleMenuItems.map((item) => (
              <a 
                key={item.id}
                href={item.href}
                className="relative text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-3 py-2.5 rounded-lg hover:bg-blue-50/80 group"
              >
                {item.title}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
              </a>
            ))}
            
            {/* Services Dropdown */}
            {menuSettings.servicesDropdownEnabled && (
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  className="relative text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-3 py-2.5 rounded-lg hover:bg-blue-50/80 flex items-center group"
                >
                  Services
                  <ChevronDown className={`ml-1.5 h-4 w-4 transition-all duration-300 ${isServicesOpen ? 'rotate-180 text-blue-600' : 'group-hover:text-blue-600'}`} />
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
                </button>
                
                {isServicesOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-96 bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden"
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <div className="p-2">
                      {servicePages.map((service, index) => (
                        <a
                          key={service.href}
                          href={service.href}
                          className="block p-4 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-700 transition-all duration-300 rounded-xl group"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="font-semibold text-sm mb-1 group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </div>
                          <div className="text-xs text-slate-500 group-hover:text-blue-500 transition-colors">
                            {service.description}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>
          
          {/* Auth Section */}
          <div 
            className="hidden lg:flex items-center space-x-4"
            style={{ marginLeft: `${headerSettings.ctaMenuGap * 0.25}rem` }}
          >
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {userRole === 'admin' && (
                    <DropdownMenuItem onClick={() => window.location.href = '/dashboard'}>
                      Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            
            <Button 
              className={getCTAButtonClass()}
              onClick={() => window.location.href = '/free-audit'}
            >
              {headerSettings.ctaButtonText}
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          {menuSettings.mobileMenuEnabled && (
            <button 
              className="lg:hidden p-3 rounded-xl hover:bg-gray-100/80 transition-all duration-300 flex-shrink-0 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}`} />
              </div>
            </button>
          )}
        </div>
        
        {/* Mobile Navigation */}
        {menuSettings.mobileMenuEnabled && (
          <div className={`lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen 
              ? 'max-h-screen opacity-100 border-t border-gray-200/50' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="py-6 bg-white/95 backdrop-blur-sm">
              <nav className="flex flex-col space-y-1">
                {visibleMenuItems.map((item) => (
                  <a 
                    key={item.id}
                    href={item.href}
                    className="text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 font-medium py-4 px-6 rounded-xl mx-2 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative">
                      {item.title}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                ))}
                
                {/* Mobile Services */}
                {menuSettings.servicesDropdownEnabled && (
                  <div className="mx-2 mt-2">
                    <div className="text-slate-700 font-medium py-4 px-6 text-sm uppercase tracking-wider text-slate-500">Services</div>
                    <div className="ml-4 space-y-1">
                      {servicePages.map((service) => (
                        <a 
                          key={service.href}
                          href={service.href}
                          className="block text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 py-3 px-6 rounded-xl group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="font-medium text-sm mb-1">{service.title}</div>
                          <div className="text-xs text-slate-400 group-hover:text-blue-400">{service.description}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Mobile Auth */}
                <div className="px-6 pt-6 space-y-3">
                  {user ? (
                    <>
                      <div className="text-sm text-slate-600 mb-2">Signed in as {user.email}</div>
                      {userRole === 'admin' && (
                        <Button 
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            window.location.href = '/dashboard';
                            setIsMenuOpen(false);
                          }}
                        >
                          Dashboard
                        </Button>
                      )}
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : null}
                  
                  <Button 
                    className={getCTAButtonClass() + " w-full py-4"}
                    onClick={() => {
                      window.location.href = '/free-audit';
                      setIsMenuOpen(false);
                    }}
                  >
                    {headerSettings.ctaButtonText}
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
