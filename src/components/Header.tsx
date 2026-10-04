import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronDown, 
  ChevronRight, 
  Mail, 
  Search, 
  ArrowRight, 
  Menu, 
  X,
  TrendingUp,
  FileText,
  Boxes,
  UserCheck,
  Store,
  Layers,
  Link2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogoData } from "@/hooks/useLogoData";
import { useHeaderSettings } from "@/hooks/useHeaderSettings";
import amazonAdsPartnerLogo from "@/assets/amazon-ads-partner-logo.png";
import amazonSpnLogo from "@/assets/amazon-spn-certified.png";

// Custom SVG Icons for Social Media
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.4 9.74v-8.37H5.06v8.37h2.8Z"/>
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12Z"/>
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export default function Header() {
  const location = useLocation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { settings } = useHeaderSettings();

  let logoData;
  try {
    logoData = useLogoData();
  } catch {
    logoData = { text: 'AMZ AD SCOUT', imageUrl: '/logo.png', faviconUrl: '/favicon.ico', size: 70 };
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
      {/* 1. TOP BAR */}
      <div className="w-full bg-slate-50/80 border-b border-slate-100 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-y-2">
          
          {/* Left: Partner Badges & Tagline */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-4">
            <Link 
              to={settings.topBarTextLink || "/services"} 
              className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-orange-600 transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
              <span>{settings.topBarText}</span>
            </Link>

            <span className="text-slate-300 hidden sm:inline">|</span>

            {/* Amazon Ads Partner Badge */}
            {settings.showAmazonAdsPartner && (
              <Link 
                to={settings.amazonAdsPartnerLink || "/amazon-ads-partner"}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-slate-200/80 hover:border-orange-300 transition-all shadow-2xs group"
                title="Amazon Ads Verified Partner"
              >
                <img 
                  src={amazonAdsPartnerLogo} 
                  alt="Amazon Ads Verified Partner" 
                  className="h-3.5 w-auto object-contain"
                />
                <span className="text-[10px] font-semibold text-slate-700 group-hover:text-orange-600">
                  Verified Partner
                </span>
              </Link>
            )}

            {/* Amazon SPN Partner Badge */}
            {settings.showAmazonSpnPartner && (
              <Link 
                to={settings.amazonSpnPartnerLink || "/services/amazon-advertising"}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-slate-200/80 hover:border-orange-300 transition-all shadow-2xs group"
                title="Amazon Service Provider Network"
              >
                <img 
                  src={amazonSpnLogo} 
                  alt="Amazon SPN Partner" 
                  className="h-3.5 w-auto object-contain"
                />
                <span className="text-[10px] font-semibold text-slate-700 group-hover:text-orange-600">
                  SPN Partner
                </span>
              </Link>
            )}
          </div>

          {/* Right: Email & Social Icons (No Phone Number, Only LinkedIn, FB, IG) */}
          <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            {/* Email link */}
            <a 
              href={settings.emailLink || `mailto:${settings.email}`} 
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-orange-600 transition-colors font-medium text-xs"
            >
              <Mail className="w-3.5 h-3.5 text-orange-500" />
              <span>{settings.email}</span>
            </a>

            <span className="text-slate-300 hidden sm:inline">|</span>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-slate-500">
              {settings.linkedinUrl && (
                <a 
                  href={settings.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#0A66C2] transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {settings.facebookUrl && (
                <a 
                  href={settings.facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#1877F2] transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {settings.instagramUrl && (
                <a 
                  href={settings.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#E4405F] transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex flex-col items-start select-none">
            {logoData.imageUrl ? (
              <img 
                src={logoData.imageUrl} 
                alt={logoData.text} 
                style={{ height: `${logoData.size || 58}px` }}
                className="w-auto object-contain" 
              />
            ) : (
              <span className="text-2xl font-black tracking-tight text-slate-900">
                {logoData.text}
              </span>
            )}
            <span className="text-[9px] font-bold tracking-[0.2em] text-slate-500 mt-0.5 ml-0.5">
              AN AMAZON SPN AGENCY
            </span>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-slate-700 text-sm">
            <Link 
              to="/" 
              className={`px-3.5 py-2 rounded-lg transition-colors hover:text-blue-600 ${
                location.pathname === "/" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Home
            </Link>

            <Link 
              to="/about" 
              className={`px-3.5 py-2 rounded-lg transition-colors hover:text-blue-600 ${
                location.pathname === "/about" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              About
            </Link>

            {/* SERVICES MEGA-DROPDOWN */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                type="button"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-lg transition-colors hover:text-blue-600 ${
                  isServicesOpen || location.pathname.startsWith("/services") 
                    ? "bg-blue-50/70 text-blue-600 font-semibold" 
                    : ""
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega-menu Panel */}
              {isServicesOpen && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50 grid grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-150"
                >
                  {/* Column 1: Amazon Services */}
                  <div className="space-y-3">
                    <Link 
                      to="/services/amazon-advertising"
                      className="flex items-center justify-between pb-2 border-b border-slate-100 text-slate-900 font-bold text-base hover:text-orange-600 group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                          a
                        </span>
                        <span>Amazon Services</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <div className="space-y-1">
                      <Link 
                        to="/services/amazon-advertising"
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mt-0.5 shrink-0">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">Amazon Advertising</div>
                            <div className="text-xs text-slate-500">PPC management to maximize sales & ROI</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                      </Link>

                      <Link 
                        to="/services/listing-optimization"
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mt-0.5 shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600">Listing Optimization</div>
                            <div className="text-xs text-slate-500">SEO-rich listings that rank and convert</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                      </Link>

                      <Link 
                        to="/services/product-cataloging"
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mt-0.5 shrink-0">
                            <Boxes className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-purple-600">Catalog Management</div>
                            <div className="text-xs text-slate-500">Bulk uploads, variation setup & maintenance</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                      </Link>

                      <Link 
                        to="/services/account-management"
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mt-0.5 shrink-0">
                            <UserCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-rose-600">Account Support</div>
                            <div className="text-xs text-slate-500">Reinstatement, compliance & full account management</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </div>
                  </div>

                  {/* Column 2: Walmart & Multi-Marketplace Services */}
                  <div className="space-y-3">
                    <Link 
                      to="/services/walmart-advertising"
                      className="flex items-center justify-between pb-2 border-b border-slate-100 text-slate-900 font-bold text-base hover:text-blue-600 group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold text-sm">
                          ✱
                        </span>
                        <span>Walmart & Growth Services</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <div className="space-y-1">
                      <Link 
                        to="/services/walmart-advertising"
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mt-0.5 shrink-0">
                            <Store className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">Walmart Advertising</div>
                            <div className="text-xs text-slate-500">Campaign management for profitable growth</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                      </Link>

                      <Link 
                        to="/services/meta-advertising"
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mt-0.5 shrink-0">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600">Meta & Google Ads</div>
                            <div className="text-xs text-slate-500">Cross-channel funnel acquisition & retargeting</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                      </Link>

                      <Link 
                        to="/services/shopify-integration"
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mt-0.5 shrink-0">
                            <Link2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-red-600">Marketplace Integration</div>
                            <div className="text-xs text-slate-500">Amazon-Walmart-Shopify multi-sync tools</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
                      </Link>

                      <Link 
                        to="/services/website-development"
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mt-0.5 shrink-0">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600">Shopify & Web Development</div>
                            <div className="text-xs text-slate-500">High-converting stores engineered for speed</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/case-studies" 
              className={`px-3.5 py-2 rounded-lg transition-colors hover:text-blue-600 ${
                location.pathname.startsWith("/case-studies") ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Case Studies
            </Link>

            <Link 
              to="/pricing" 
              className={`px-3.5 py-2 rounded-lg transition-colors hover:text-blue-600 ${
                location.pathname === "/pricing" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Pricing
            </Link>

            <Link 
              to="/blog" 
              className={`px-3.5 py-2 rounded-lg transition-colors hover:text-blue-600 ${
                location.pathname.startsWith("/blog") ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* Right Action: Search Icon + CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/services"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              title="Search Services"
              aria-label="Search Services"
            >
              <Search className="w-4 h-4" />
            </Link>

            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 h-11 rounded-xl shadow-md shadow-blue-500/20 text-sm gap-2"
            >
              <Link to={settings.ctaLink || "/contact"}>
                <span>{settings.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE MENU COLLAPSIBLE */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50"
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Services
            </div>
            <Link to="/services/amazon-advertising" className="block px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
              Amazon Advertising & PPC
            </Link>
            <Link to="/services/listing-optimization" className="block px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
              Listing Optimization
            </Link>
            <Link to="/services/product-cataloging" className="block px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
              Catalog Management
            </Link>
            <Link to="/services/walmart-advertising" className="block px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
              Walmart Advertising
            </Link>
            <Link to="/services/meta-advertising" className="block px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
              Meta & Google Ads
            </Link>
            <Link to="/services/shopify-integration" className="block px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
              Shopify & Marketplace Integration
            </Link>
          </div>

          <div className="pt-4">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              <Link to={settings.ctaLink || "/contact"}>
                {settings.ctaText}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
