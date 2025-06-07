import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface LogoSettings {
  logoUrl: string;
  logoSize: string;
  logoAlt: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [logoSettings, setLogoSettings] = useState<LogoSettings>({
    logoUrl: "/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png",
    logoSize: "h-12",
    logoAlt: "AMZ AD SCOUT - The Growth Agency"
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load logo settings from localStorage on mount
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
        console.log('Header: Loaded logo settings on mount:', newSettings);
      } catch (error) {
        console.error('Header: Failed to parse logo settings:', error);
      }
    }

    // Listen for logo updates from dashboard
    const handleLogoUpdate = (event: CustomEvent<LogoSettings>) => {
      console.log('Header: Received logo update event:', event.detail);
      setLogoSettings(event.detail);
    };

    window.addEventListener('logoUpdated', handleLogoUpdate as EventListener);
    return () => window.removeEventListener('logoUpdated', handleLogoUpdate as EventListener);
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Header: Logo failed to load:", e.currentTarget.src);
    e.currentTarget.src = "/placeholder.svg";
  };

  const handleImageLoad = () => {
    console.log("Header: Logo loaded successfully:", logoSettings.logoUrl);
  };

  const servicePages = [
    { title: "Amazon Advertising", href: "/amazon-advertising", description: "Scale your Amazon presence" },
    { title: "Walmart Advertising", href: "/walmart-advertising", description: "Grow on Walmart marketplace" },
    { title: "Meta Advertising", href: "/meta-advertising", description: "Social media marketing" },
    { title: "Account Management", href: "/account-management", description: "Professional account oversight" },
    { title: "Shopify Integration", href: "/shopify-integration", description: "E-commerce solutions" },
    { title: "Shopify Development", href: "/shopify-development", description: "Custom store development" },
  ];

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Pricing", href: "/pricing" },
    { title: "About", href: "/about" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/60 backdrop-blur-xl border-b border-gray-200/40 shadow-lg shadow-black/5' 
        : 'bg-white/50 backdrop-blur-lg border-b border-gray-200/30'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center group flex-shrink-0">
            <a href="/" className="block">
              <img 
                src={logoSettings.logoUrl}
                alt={logoSettings.logoAlt}
                className={`${logoSettings.logoSize} w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{ maxWidth: '200px', display: 'block' }}
              />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 ml-4">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href}
                className="relative text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-4 py-2.5 rounded-lg hover:bg-blue-50/80 group"
              >
                {item.title}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
              </a>
            ))}
            
            {/* Modern Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className="relative text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-4 py-2.5 rounded-lg hover:bg-blue-50/80 flex items-center group"
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
          </nav>
          
          {/* Enhanced CTA Button */}
          <div className="hidden lg:block flex-shrink-0">
            <Button 
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-0 text-sm tracking-wide"
              onClick={() => window.location.href = '/free-audit'}
            >
              Get Free Audit
            </Button>
          </div>
          
          {/* Modern Mobile Menu Button */}
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
        </div>
        
        {/* Enhanced Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100 border-t border-gray-200/50' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-6 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <a 
                  key={item.href}
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
              
              <div className="px-6 pt-6">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold w-full rounded-2xl py-4 shadow-lg shadow-blue-500/25 transition-all duration-300"
                  onClick={() => {
                    window.location.href = '/free-audit';
                    setIsMenuOpen(false);
                  }}
                >
                  Get Free Audit
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
