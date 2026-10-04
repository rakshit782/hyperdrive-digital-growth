import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Compass, Search, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404 Route requested:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="404 - Page Not Found | AMZ AD SCOUT"
        description="The page you are looking for doesn't exist or has been relocated."
        robots="noindex, nofollow"
        image="https://www.amzadscout.com/logo.png"
      />
      <div className="relative min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 overflow-hidden selection:bg-orange-500 selection:text-white">
        {/* Glow gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[550px] h-[550px] rounded-full bg-orange-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />

        {/* Minimal Clean Header */}
        <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <Link to="/" className="flex flex-col items-start group">
            <img 
              src="/logo.png" 
              alt="AMZ AD SCOUT" 
              className="h-11 w-auto object-contain brightness-0 invert transition-opacity group-hover:opacity-90" 
            />
            <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-400 mt-1 ml-0.5">
              AN AMAZON SPN AGENCY
            </span>
          </Link>
          <Link 
            to="/" 
            className="text-xs font-medium text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </header>

        {/* Center 404 Hero */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-xl mx-auto text-center">
            {/* Glowing 404 Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Compass className="w-4 h-4 animate-spin [animation-duration:8s]" />
              Lost In Orbit
            </div>

            {/* Giant Graphic 404 */}
            <div className="relative mb-6 select-none">
              <span className="text-8xl sm:text-9xl font-black tracking-tighter bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 bg-clip-text text-transparent">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl sm:text-9xl font-black tracking-tighter text-orange-500/10 blur-xl">
                  404
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Oops! Page not found
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
              The page you're searching for may have been moved, renamed, or is currently undergoing maintenance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                asChild
                className="w-full sm:w-auto h-11 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200"
              >
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return to Home
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto h-11 px-6 border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm rounded-xl backdrop-blur-sm transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Help / Assistance */}
            <div className="mt-12 pt-6 border-t border-slate-900 flex items-center justify-center gap-2 text-xs text-slate-500">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Looking for our services? Reach out directly at </span>
              <a href="mailto:info@amzadscout.com" className="text-orange-400 hover:underline">
                info@amzadscout.com
              </a>
            </div>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 text-center text-xs text-slate-600 border-t border-slate-900">
          <p>© {new Date().getFullYear()} AMZ AD SCOUT. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default NotFound;
