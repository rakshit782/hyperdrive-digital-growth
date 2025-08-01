
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Free Audit", href: "/free-audit" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-gray-900">
              Your Logo
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="ml-10 hidden space-x-8 lg:block">
            {navigation.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Auth Section */}
          <div className="ml-10 hidden lg:flex lg:items-center lg:space-x-4">
            {loading ? (
              <Button variant="outline" disabled>
                <User className="w-4 h-4 mr-2" />
                Loading...
              </Button>
            ) : user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Hello, {user.email}
                </span>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                <Button asChild>
                  <a href="/dashboard">Dashboard</a>
                </Button>
              </div>
            ) : (
              <Button asChild>
                <a href="/auth">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </a>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                {loading ? (
                  <Button variant="outline" disabled className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Loading...
                  </Button>
                ) : user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-600">
                      Hello, {user.email}
                    </div>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                    <Button asChild className="w-full">
                      <a href="/dashboard">Dashboard</a>
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full">
                    <a href="/auth">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
