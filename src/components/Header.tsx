
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, Globe, Users, Link2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
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
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoSettings, setLogoSettings] = useState<LogoSettings>({
    logoUrl: "/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png",
    logoSize: "h-12",
    logoAlt: "AMZ AD SCOUT - The Growth Agency"
  });

  useEffect(() => {
    // Load logo settings from localStorage
    const savedLogo = localStorage.getItem('logoData');
    if (savedLogo) {
      try {
        const parsed = JSON.parse(savedLogo);
        setLogoSettings({
          logoUrl: parsed.logoUrl || "/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png",
          logoSize: parsed.logoSize || "h-12",
          logoAlt: parsed.logoAlt || "AMZ AD SCOUT - The Growth Agency"
        });
      } catch (error) {
        console.error('Failed to parse logo settings:', error);
      }
    }

    // Listen for logo updates from dashboard
    const handleLogoUpdate = (event: CustomEvent) => {
      console.log('Header received logo update:', event.detail);
      setLogoSettings(event.detail);
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
    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img 
            src={logoSettings.logoUrl}
            alt={logoSettings.logoAlt}
            className={`${logoSettings.logoSize} w-auto object-contain`}
            onError={handleImageError}
            onLoad={() => console.log('Header logo loaded:', logoSettings.logoUrl)}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-slate-700 hover:text-blue-600 transition-colors font-medium relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/case-studies" className="text-slate-700 hover:text-blue-600 transition-colors font-medium relative group">
            Case Studies
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/pricing" className="text-slate-700 hover:text-blue-600 transition-colors font-medium relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="text-slate-700 hover:text-blue-600 transition-colors flex items-center font-medium relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-slate-200/50 shadow-xl rounded-xl p-2 min-w-[320px]">
              <DropdownMenuItem className="hover:bg-blue-50/80 rounded-lg transition-all duration-200 p-3">
                <Link to="/amazon-advertising" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Amazon Advertising</span>
                    <p className="text-xs text-slate-500">PPC & marketplace optimization</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-blue-50/80 rounded-lg transition-all duration-200 p-3">
                <Link to="/walmart-advertising" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">W</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Walmart Advertising</span>
                    <p className="text-xs text-slate-500">Walmart Connect campaigns</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-blue-50/80 rounded-lg transition-all duration-200 p-3">
                <Link to="/google-advertising" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">G</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Google Advertising</span>
                    <p className="text-xs text-slate-500">Search & display campaigns</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-blue-50/80 rounded-lg transition-all duration-200 p-3">
                <Link to="/meta-advertising" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">M</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Meta Advertising</span>
                    <p className="text-xs text-slate-500">Facebook & Instagram ads</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-slate-200/60 my-2" />
              
              <DropdownMenuItem className="hover:bg-blue-50/80 rounded-lg transition-all duration-200 p-3">
                <Link to="/website-development" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Website Development</span>
                    <p className="text-xs text-slate-500">Custom web solutions</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-blue-50/80 rounded-lg transition-all duration-200 p-3">
                <Link to="/account-management" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Account Management</span>
                    <p className="text-xs text-slate-500">Professional oversight</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-blue-50/80 rounded-lg transition-all duration-200 p-3">
                <Link to="/shopify-development" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-md">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Shopify Development</span>
                    <p className="text-xs text-slate-500">Custom store builds</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-blue-50/80 rounded-lg transition-all duration-200 p-3">
                <Link to="/shopify-integration" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                    <Link2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Shopify Integration</span>
                    <p className="text-xs text-slate-500">Platform connections</p>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Free Audit Button */}
          <Link to="/free-audit" className="hidden md:block">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Star className="w-4 h-4 mr-2" />
              Free Account Audit
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/50 py-4 shadow-lg">
          <nav className="flex flex-col space-y-4 px-6">
            <Link to="/" className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2 border-b border-transparent hover:border-blue-600">
              Home
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2 border-b border-transparent hover:border-blue-600">
              About
            </Link>
            <Link to="/case-studies" className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2 border-b border-transparent hover:border-blue-600">
              Case Studies
            </Link>
            <Link to="/pricing" className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2 border-b border-transparent hover:border-blue-600">
              Pricing
            </Link>
            
            <div className="border-t pt-4">
              <p className="text-sm font-semibold text-slate-600 mb-3">Services</p>
              <Link to="/amazon-advertising" className="text-slate-700 hover:text-blue-600 transition-colors py-2 pl-4 block">
                Amazon Advertising
              </Link>
              <Link to="/walmart-advertising" className="text-slate-700 hover:text-blue-600 transition-colors py-2 pl-4 block">
                Walmart Advertising
              </Link>
              <Link to="/google-advertising" className="text-slate-700 hover:text-blue-600 transition-colors py-2 pl-4 block">
                Google Advertising
              </Link>
              <Link to="/meta-advertising" className="text-slate-700 hover:text-blue-600 transition-colors py-2 pl-4 block">
                Meta Advertising
              </Link>
              <Link to="/website-development" className="text-slate-700 hover:text-blue-600 transition-colors py-2 pl-4 block">
                Website Development
              </Link>
              <Link to="/account-management" className="text-slate-700 hover:text-blue-600 transition-colors py-2 pl-4 block">
                Account Management
              </Link>
              <Link to="/shopify-development" className="text-slate-700 hover:text-blue-600 transition-colors py-2 pl-4 block">
                Shopify Development
              </Link>
              <Link to="/shopify-integration" className="text-slate-700 hover:text-blue-600 transition-colors py-2 pl-4 block">
                Shopify Integration
              </Link>
            </div>
            
            <div className="border-t pt-4">
              <Link to="/free-audit">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-full shadow-lg">
                  <Star className="w-4 h-4 mr-2" />
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
