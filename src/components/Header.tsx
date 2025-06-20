
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderConfig {
  logoText: string;
  logoImage?: string;
  navigation: Array<{
    label: string;
    href: string;
  }>;
  ctaButton: {
    text: string;
    href: string;
  };
}

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({
    logoText: "Digital Agency",
    navigation: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/#services" },
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" }
    ],
    ctaButton: {
      text: "Get Free Audit",
      href: "/free-audit"
    }
  });

  useEffect(() => {
    const loadHeaderConfig = () => {
      const savedConfig = localStorage.getItem('headerConfig');
      if (savedConfig) {
        try {
          const parsedConfig = JSON.parse(savedConfig);
          setHeaderConfig({ ...headerConfig, ...parsedConfig });
        } catch (error) {
          console.log("Failed to parse header config:", error);
        }
      }
    };

    loadHeaderConfig();

    const handleHeaderUpdate = (event: CustomEvent) => {
      setHeaderConfig({ ...headerConfig, ...event.detail });
    };

    window.addEventListener('headerUpdated', handleHeaderUpdate as EventListener);
    
    return () => {
      window.removeEventListener('headerUpdated', handleHeaderUpdate as EventListener);
    };
  }, []);

  const handleNavigation = (href: string) => {
    if (href.startsWith('/#')) {
      const elementId = href.substring(2);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            {headerConfig.logoImage ? (
              <img 
                src={headerConfig.logoImage} 
                alt={headerConfig.logoText}
                className="h-8 w-auto"
              />
            ) : (
              <h1 className="text-xl font-bold text-gray-900">
                {headerConfig.logoText}
              </h1>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {headerConfig.navigation.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={() => handleNavigation(headerConfig.ctaButton.href)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {headerConfig.ctaButton.text}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {headerConfig.navigation.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.href)}
                  className="text-left text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={() => handleNavigation(headerConfig.ctaButton.href)}
                className="bg-blue-600 hover:bg-blue-700 text-white mt-4 rounded-lg font-medium"
              >
                {headerConfig.ctaButton.text}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
