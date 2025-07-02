import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Menu, X, ShoppingBag, Globe, Users, Link2 } from "lucide-react";
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
    <header className="bg-white/95 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-bold text-xl text-slate-900">
          AdRevenueBoost
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-slate-700 hover:text-slate-900 transition-colors">
            Home
          </Link>
          <Link to="/case-studies" className="text-slate-700 hover:text-slate-900 transition-colors">
            Case Studies
          </Link>
          <Link to="/pricing" className="text-slate-700 hover:text-slate-900 transition-colors">
            Pricing
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="text-slate-700 hover:text-slate-900 transition-colors flex items-center">
              Services
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl rounded-xl p-2 min-w-[240px]">
              <DropdownMenuItem className="hover:bg-white/50 rounded-lg transition-colors p-3">
                <Link to="/amazon-advertising" className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <span className="font-medium text-slate-700">Amazon Advertising</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-white/50 rounded-lg transition-colors p-3">
                <Link to="/walmart-advertising" className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">W</span>
                  </div>
                  <span className="font-medium text-slate-700">Walmart Advertising</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-white/50 rounded-lg transition-colors p-3">
                <Link to="/google-advertising" className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="font-medium text-slate-700">Google Advertising</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-white/50 rounded-lg transition-colors p-3">
                <Link to="/meta-advertising" className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <span className="font-medium text-slate-700">Meta Advertising</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-white/30 my-2" />
              
              <DropdownMenuItem className="hover:bg-white/50 rounded-lg transition-colors p-3">
                <Link to="/account-management" className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">Account Management</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-white/50 rounded-lg transition-colors p-3">
                <Link to="/website-development" className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">Website Development</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-white/50 rounded-lg transition-colors p-3">
                <Link to="/shopify-development" className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">Shopify Development</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-white/50 rounded-lg transition-colors p-3">
                <Link to="/shopify-integration" className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Link2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">Shopify Integration</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center space-x-4">
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
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
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
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-white/20 py-4">
          <nav className="flex flex-col space-y-4 px-6">
            <Link to="/" className="text-slate-700 hover:text-slate-900 transition-colors">
              Home
            </Link>
            <Link to="/case-studies" className="text-slate-700 hover:text-slate-900 transition-colors">
              Case Studies
            </Link>
            <Link to="/pricing" className="text-slate-700 hover:text-slate-900 transition-colors">
              Pricing
            </Link>
            <Link to="/amazon-advertising" className="text-slate-700 hover:text-slate-900 transition-colors">
              Amazon Advertising
            </Link>
            <Link to="/walmart-advertising" className="text-slate-700 hover:text-slate-900 transition-colors">
              Walmart Advertising
            </Link>
             <Link to="/google-advertising" className="text-slate-700 hover:text-slate-900 transition-colors">
              Google Advertising
            </Link>
            <Link to="/meta-advertising" className="text-slate-700 hover:text-slate-900 transition-colors">
              Meta Advertising
            </Link>
            <Link to="/account-management" className="text-slate-700 hover:text-slate-900 transition-colors">
              Account Management
            </Link>
            <Link to="/website-development" className="text-slate-700 hover:text-slate-900 transition-colors">
              Website Development
            </Link>
            <Link to="/shopify-development" className="text-slate-700 hover:text-slate-900 transition-colors">
              Shopify Development
            </Link>
            <Link to="/shopify-integration" className="text-slate-700 hover:text-slate-900 transition-colors">
              Shopify Integration
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
