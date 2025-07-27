import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Star, ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface LogoSettings {
  logoUrl: string;
  logoSize: string;
  logoAlt: string;
  showInHeader?: boolean;
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const [logoSettings, setLogoSettings] = useState<LogoSettings>({
    logoUrl: "/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png",
    logoSize: "h-12",
    logoAlt: "AMZ AD SCOUT - The Growth Agency",
    showInHeader: true
  });
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    // Load logo settings from localStorage
    const savedLogo = localStorage.getItem('logoSettings');
    if (savedLogo) {
      try {
        const parsed = JSON.parse(savedLogo);
        setLogoSettings({
          logoUrl: parsed.logoUrl || "/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png",
          logoSize: parsed.logoSize || "h-12",
          logoAlt: parsed.logoAlt || "AMZ AD SCOUT - The Growth Agency",
          showInHeader: parsed.showInHeader !== false
        });
      } catch (error) {
        console.error('Failed to parse logo settings:', error);
      }
    }

    // Listen for logo updates from dashboard
    const handleLogoUpdate = (event: CustomEvent) => {
      console.log('Header received logo update:', event.detail);
      setLogoSettings(prev => ({ ...prev, ...event.detail }));
      setLogoError(false); // Reset error state on logo update
    };

    window.addEventListener('logoUpdated', handleLogoUpdate as EventListener);
    
    return () => {
      window.removeEventListener('logoUpdated', handleLogoUpdate as EventListener);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Logo failed to load:', e.currentTarget.src);
    setLogoError(true);
    // Don't set placeholder immediately to avoid infinite loop
  };

  const handleImageLoad = () => {
    console.log('Header logo loaded successfully:', logoSettings.logoUrl);
    setLogoError(false);
  };

  const services = [
    { title: "Amazon Advertising", url: "/amazon-advertising", description: "PPC & marketplace optimization" },
    { title: "Walmart Advertising", url: "/walmart-advertising", description: "Walmart Connect campaigns" },
    { title: "Google Advertising", url: "/google-advertising", description: "Search & display campaigns" },
    { title: "Meta Advertising", url: "/meta-advertising", description: "Facebook & Instagram ads" },
    { title: "Website Development", url: "/website-development", description: "Custom web solutions" },
    { title: "Account Management", url: "/account-management", description: "Professional oversight" },
    { title: "Shopify Development", url: "/shopify-development", description: "Custom store builds" },
    { title: "Shopify Integration", url: "/shopify-integration", description: "Platform connections" }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container-standard flex items-center justify-between h-20 px-6">
        {logoSettings.showInHeader && (
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            {!logoError ? (
              <img 
                src={logoSettings.logoUrl}
                alt={logoSettings.logoAlt}
                className={`${logoSettings.logoSize} w-auto object-contain`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="eager"
              />
            ) : (
              <div className={`${logoSettings.logoSize} w-auto flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-4 rounded-lg`}>
                AMZ AD SCOUT
              </div>
            )}
          </Link>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-12">
          <Link to="/" className="text-minimal hover:text-primary transition-colors font-medium font-body relative group">
            Home
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/about" className="text-minimal hover:text-primary transition-colors font-medium font-body relative group">
            About
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/case-studies" className="text-minimal hover:text-primary transition-colors font-medium font-body relative group">
            Case Studies
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/pricing" className="text-minimal hover:text-primary transition-colors font-medium font-body relative group">
            Pricing
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="text-minimal hover:text-primary transition-colors flex items-center font-medium font-body relative group focus:outline-none">
              Services
              <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" />
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[600px] bg-white border border-gray-200 shadow-2xl rounded-xl p-6 mt-2 z-50">
              <div className="grid grid-cols-2 gap-6">
                {/* First Column - Advertising Services */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 px-2">Advertising Services</h3>
                  {services.slice(0, 4).map((service) => (
                    <DropdownMenuItem key={service.title} className="rounded-lg p-3 hover:bg-blue-50 transition-all duration-200 cursor-pointer border-0 focus:bg-blue-50">
                      <Link to={service.url} className="flex flex-col w-full">
                        <span className="font-medium font-heading text-slate-800 mb-1 hover:text-blue-600 transition-colors">{service.title}</span>
                        <span className="text-sm text-slate-600 font-body">{service.description}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
                
                {/* Second Column - Development Services */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 px-2">Development Services</h3>
                  {services.slice(4).map((service) => (
                    <DropdownMenuItem key={service.title} className="rounded-lg p-3 hover:bg-blue-50 transition-all duration-200 cursor-pointer border-0 focus:bg-blue-50">
                      <Link to={service.url} className="flex flex-col w-full">
                        <span className="font-medium font-heading text-slate-800 mb-1 hover:text-blue-600 transition-colors">{service.title}</span>
                        <span className="text-sm text-slate-600 font-body">{service.description}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center space-x-6">
          {/* Dashboard Button for authenticated users */}
          {user && (
            <Link to="/dashboard" className="hidden md:block">
              <Button variant="outline" className="font-semibold font-body px-4 py-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                <Settings className="w-4 h-4 mr-2" aria-hidden="true" />
                Dashboard
              </Button>
            </Link>
          )}

          {/* Auth Button */}
          {!user && (
            <Link to="/auth" className="hidden md:block">
              <Button variant="outline" className="font-semibold font-body px-4 py-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                Sign In
              </Button>
            </Link>
          )}

          {/* Free Audit Button */}
          <Link to="/free-audit" className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold font-body px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Star className="w-4 h-4 mr-2" aria-hidden="true" />
              Free Account Audit
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-3 rounded-xl hover:bg-gray-50 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-minimal" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-minimal" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-lg border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col space-y-1 p-6">
            <Link to="/" className="text-minimal hover:text-primary transition-colors font-medium font-body py-3 px-4 rounded-xl hover:bg-gray-50">
              Home
            </Link>
            <Link to="/about" className="text-minimal hover:text-primary transition-colors font-medium font-body py-3 px-4 rounded-xl hover:bg-gray-50">
              About
            </Link>
            <Link to="/case-studies" className="text-minimal hover:text-primary transition-colors font-medium font-body py-3 px-4 rounded-xl hover:bg-gray-50">
              Case Studies
            </Link>
            <Link to="/pricing" className="text-minimal hover:text-primary transition-colors font-medium font-body py-3 px-4 rounded-xl hover:bg-gray-50">
              Pricing
            </Link>
            
            <div className="border-t border-gray-100 pt-4 mt-4">
              <p className="text-sm font-semibold font-heading text-minimal mb-3 px-4">Services</p>
              {services.map((service) => (
                <Link key={service.title} to={service.url} className="text-minimal hover:text-primary transition-colors py-2 px-6 block rounded-xl hover:bg-blue-50">
                  <div className="font-medium font-body hover:text-blue-600 transition-colors">{service.title}</div>
                  <div className="text-xs text-minimal mt-1">{service.description}</div>
                </Link>
              ))}
            </div>
            
            <div className="border-t border-gray-100 pt-4 mt-4">
              {/* Dashboard Button for authenticated users in mobile */}
              {user && (
                <Link to="/dashboard" className="block mb-3">
                  <Button variant="outline" className="w-full font-semibold font-body py-4 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    <Settings className="w-4 h-4 mr-2" aria-hidden="true" />
                    Dashboard
                  </Button>
                </Link>
              )}

              {/* Auth Button for mobile */}
              {!user && (
                <Link to="/auth" className="block mb-3">
                  <Button variant="outline" className="w-full font-semibold font-body py-4 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    Sign In
                  </Button>
                </Link>
              )}

              <Link to="/free-audit">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold font-body py-4 rounded-xl shadow-lg">
                  <Star className="w-4 h-4 mr-2" aria-hidden="true" />
                  Free Account Audit
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
