
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Header logo failed to load:", e.currentTarget.src);
  };

  const handleImageLoad = () => {
    console.log("Header logo loaded successfully");
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200/50 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/d76be5e2-f99d-4fae-aef6-a92d04f82d8e.png" 
              alt="AMZ AD SCOUT Logo" 
              className="h-10 w-auto object-contain bg-white p-1 rounded"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ maxWidth: '120px', display: 'block' }}
            />
            <div className="font-bold text-xl text-slate-900">
              <span className="text-blue-600">AMZ AD</span> SCOUT
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Services
            </a>
            <a href="#about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              About
            </a>
            <a href="#case-studies" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Case Studies
            </a>
            <a href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </a>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold">
              Get Free Audit
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50">
            <nav className="flex flex-col space-y-4">
              <a href="#services" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Services
              </a>
              <a href="#about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                About
              </a>
              <a href="#case-studies" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Case Studies
              </a>
              <a href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Contact
              </a>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold w-full">
                Get Free Audit
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
