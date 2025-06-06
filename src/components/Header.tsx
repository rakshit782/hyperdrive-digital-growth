
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
    { title: "Amazon Advertising", href: "/amazon-advertising" },
    { title: "Walmart Advertising", href: "/walmart-advertising" },
    { title: "Meta Advertising", href: "/meta-advertising" },
    { title: "Account Management", href: "/account-management" },
    { title: "Shopify Integration", href: "/shopify-integration" },
    { title: "Shopify Development", href: "/shopify-development" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/75 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-black/5' 
        : 'bg-white/70 backdrop-blur-lg border-b border-gray-200/30'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center group flex-shrink-0">
            <a href="/" className="block">
              <img 
                src={logoSettings.logoUrl}
                alt={logoSettings.logoAlt}
                className={`${logoSettings.logoSize} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{ maxWidth: '200px', display: 'block' }}
              />
            </a>
          </div>
          
          {/* Desktop Navigation - moved closer to logo */}
          <nav className="hidden lg:flex items-center space-x-1 ml-4">
            <a 
              href="/"
              className="text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-3 py-2 rounded-md hover:bg-blue-50"
            >
              Home
            </a>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className="text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-3 py-2 rounded-md hover:bg-blue-50 flex items-center"
              >
                Services
                <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg z-50"
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="py-2">
                    {servicePages.map((service) => (
                      <a
                        key={service.href}
                        href={service.href}
                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <a 
              href="/pricing"
              className="text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-3 py-2 rounded-md hover:bg-blue-50"
            >
              Pricing
            </a>
            
            <a 
              href="/about"
              className="text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-3 py-2 rounded-md hover:bg-blue-50"
            >
              About
            </a>
            
            <a 
              href="/case-studies"
              className="text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-3 py-2 rounded-md hover:bg-blue-50"
            >
              Case Studies
            </a>
            
            <a 
              href="/contact"
              className="text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-3 py-2 rounded-md hover:bg-blue-50"
            >
              Contact
            </a>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden lg:block flex-shrink-0">
            <Button 
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              onClick={() => window.location.href = '/free-audit'}
            >
              Get Free Audit
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation - Fixed */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-sm">
            <div className="py-4">
              <nav className="flex flex-col space-y-2">
                <a 
                  href="/"
                  className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-3 px-4 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                
                {/* Mobile Services */}
                <div className="space-y-2">
                  <div className="text-slate-700 font-medium py-3 px-4">Services</div>
                  <div className="pl-4 space-y-1">
                    {servicePages.map((service) => (
                      <a 
                        key={service.href}
                        href={service.href}
                        className="block text-slate-600 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50 text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                </div>
                
                <a 
                  href="/pricing"
                  className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-3 px-4 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </a>
                
                <a 
                  href="/about"
                  className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-3 px-4 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                
                <a 
                  href="/case-studies"
                  className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-3 px-4 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Case Studies
                </a>
                
                <a 
                  href="/contact"
                  className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-3 px-4 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold w-full mt-4 rounded-xl"
                  onClick={() => {
                    window.location.href = '/free-audit';
                    setIsMenuOpen(false);
                  }}
                >
                  Get Free Audit
                </Button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
