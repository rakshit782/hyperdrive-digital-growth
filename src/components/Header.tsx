
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthButton from "@/components/AuthButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    { name: "Amazon Advertising", href: "/amazon-advertising" },
    { name: "Walmart Advertising", href: "/walmart-advertising" },
    { name: "Meta Advertising", href: "/meta-advertising" },
    { name: "Google Advertising", href: "/google-advertising" },
    { name: "Account Management", href: "/account-management" },
    { name: "Shopify Development", href: "/shopify-development" },
    { name: "Website Development", href: "/website-development" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AMZ AD SCOUT
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </a>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                Services
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {isServicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-lg border border-slate-200 py-2"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  {services.map((service) => (
                    <a
                      key={service.name}
                      href={service.href}
                      className="block px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      {service.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            <a href="/about" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
            <a href="/case-studies" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
              Case Studies
            </a>
            <a href="/blog" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
              Blog
            </a>
            <a href="/contact" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthButton />
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium"
              onClick={() => window.location.href = '/free-audit'}
            >
              Free Audit
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </a>
              
              {/* Mobile Services */}
              <div className="space-y-2">
                <div className="text-slate-700 font-medium">Services:</div>
                {services.map((service) => (
                  <a
                    key={service.name}
                    href={service.href}
                    className="block pl-4 text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {service.name}
                  </a>
                ))}
              </div>
              
              <a href="/about" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                About
              </a>
              <a href="/case-studies" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Case Studies
              </a>
              <a href="/blog" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Blog
              </a>
              <a href="/contact" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </a>
              
              <div className="pt-4 space-y-2">
                <AuthButton />
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium w-full"
                  onClick={() => window.location.href = '/free-audit'}
                >
                  Free Audit
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
