
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Menu, X, ShoppingBag, Globe, Users, Link2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-bold text-xl text-slate-900 hover:text-blue-600 transition-colors">
          AdRevenueBoost
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
            Home
          </Link>
          <Link to="/about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
            About
          </Link>
          <Link to="/case-studies" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
            Case Studies
          </Link>
          <Link to="/pricing" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
            Pricing
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="text-slate-700 hover:text-blue-600 transition-colors flex items-center font-medium">
              Services
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl rounded-xl p-2 min-w-[280px]">
              <DropdownMenuItem className="hover:bg-blue-50 rounded-lg transition-colors p-3">
                <Link to="/amazon-advertising" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">Amazon Advertising</span>
                    <p className="text-xs text-slate-500">PPC & marketplace optimization</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-blue-50 rounded-lg transition-colors p-3">
                <Link to="/walmart-advertising" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-bold">W</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">Walmart Advertising</span>
                    <p className="text-xs text-slate-500">Walmart Connect campaigns</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-blue-50 rounded-lg transition-colors p-3">
                <Link to="/google-advertising" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-bold">G</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">Google Advertising</span>
                    <p className="text-xs text-slate-500">Search & display campaigns</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-blue-50 rounded-lg transition-colors p-3">
                <Link to="/meta-advertising" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-bold">M</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">Meta Advertising</span>
                    <p className="text-xs text-slate-500">Facebook & Instagram ads</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-slate-200 my-2" />
              
              <DropdownMenuItem className="hover:bg-blue-50 rounded-lg transition-colors p-3">
                <Link to="/website-development" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">Website Development</span>
                    <p className="text-xs text-slate-500">Custom web solutions</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-blue-50 rounded-lg transition-colors p-3">
                <Link to="/account-management" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-sm">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">Account Management</span>
                    <p className="text-xs text-slate-500">Professional oversight</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-blue-50 rounded-lg transition-colors p-3">
                <Link to="/shopify-development" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-sm">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">Shopify Development</span>
                    <p className="text-xs text-slate-500">Custom store builds</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-blue-50 rounded-lg transition-colors p-3">
                <Link to="/shopify-integration" className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-sm">
                    <Link2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">Shopify Integration</span>
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
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105">
              <Star className="w-4 h-4 mr-2" />
              Free Account Audit
            </Button>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-slate-700" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
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
        <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-white/20 py-4 shadow-lg">
          <nav className="flex flex-col space-y-4 px-6">
            <Link to="/" className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2">
              Home
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2">
              About
            </Link>
            <Link to="/case-studies" className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2">
              Case Studies
            </Link>
            <Link to="/pricing" className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2">
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
