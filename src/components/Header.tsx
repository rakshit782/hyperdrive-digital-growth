
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLogoData } from "@/hooks/useLogoData";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  let logoData;
  try {
    logoData = useLogoData();
  } catch (error) {
    console.error('Error in useLogoData:', error);
    logoData = { text: 'AMZ AD SCOUT', imageUrl: '/logo.png', faviconUrl: '/favicon.ico', size: 40 };
  }

  const serviceItems = [
    { name: "Amazon Ads Management", href: "/services/amazon-advertising" },
    { name: "Meta Ads Management", href: "/services/meta-advertising" },
    { name: "Google Ads Management", href: "/services/google-advertising" },
    { name: "Walmart Ads Management", href: "/services/walmart-advertising" },
    { name: "Shopify Multi-Marketplace Integration", href: "/services/shopify-integration" },
    { name: "Shopify Store Development", href: "/services/shopify-development" },
    { name: "Website Development", href: "/services/website-development" },
    { name: "Account Management", href: "/services/account-management" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {logoData.imageUrl ? (
              <img 
                src={logoData.imageUrl} 
                alt={logoData.text} 
                style={{ height: `${logoData.size || 40}px` }}
                className="w-auto object-cover object-center" 
              />
            ) : (
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {logoData.text}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link 
                    to="/services" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold border-b border-gray-100"
                  >
                    All Services
                  </Link>
                  {serviceItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/case-studies" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Case Studies
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button>Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link 
                to="/" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {/* Mobile Services */}
              <div className="px-3 py-2">
                <div className="text-base font-medium text-gray-700 mb-2">Services</div>
                <Link 
                  to="/services" 
                  className="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Services
                </Link>
                {serviceItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link 
                to="/case-studies" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Case Studies
              </Link>
              <Link 
                to="/pricing" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/blog" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              
              <div className="px-3 py-2">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
