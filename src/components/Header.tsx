
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Header logo failed to load:", e.currentTarget.src);
  };

  const handleImageLoad = () => {
    console.log("Header logo loaded successfully");
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
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-black/5' 
        : 'bg-white/90 backdrop-blur-lg border-b border-gray-200/30'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center group">
            <img 
              src="/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png" 
              alt="AMZ AD SCOUT - The Growth Agency" 
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ maxWidth: '140px', display: 'block' }}
            />
          </div>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/"
                  className="text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-3 py-2"
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide bg-transparent">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 bg-white">
                    {servicePages.map((service) => (
                      <NavigationMenuLink
                        key={service.href}
                        href={service.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{service.title}</div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/about"
                  className="text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-3 py-2"
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/case-studies"
                  className="text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-3 py-2"
                >
                  Case Studies
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/contact"
                  className="text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide px-3 py-2"
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              onClick={() => window.location.href = '/free-audit'}
            >
              Get Free Audit
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}>
          <div className="pt-4 border-t border-gray-200/50">
            <nav className="flex flex-col space-y-4">
              <a 
                href="/"
                className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              
              {/* Mobile Services Dropdown */}
              <div className="space-y-2">
                <div className="text-slate-700 font-medium py-2 px-4">Services</div>
                <div className="pl-4 space-y-2">
                  {servicePages.map((service) => (
                    <a 
                      key={service.href}
                      href={service.href}
                      className="block text-slate-600 hover:text-blue-600 transition-colors py-1 px-4 rounded-lg hover:bg-blue-50 text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {service.title}
                    </a>
                  ))}
                </div>
              </div>
              
              <a 
                href="/about"
                className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              
              <a 
                href="/case-studies"
                className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Case Studies
              </a>
              
              <a 
                href="/contact"
                className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
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
      </div>
    </header>
  );
};

export default Header;
