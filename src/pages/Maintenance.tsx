import { useState } from "react";
import { Mail, Clock, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SEOHead from "@/components/SEOHead";

// SHA-256 hash helper matching Neon users password_hash format
async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Neon encrypted hash for rakshit@amzadscout.com / Rakshit@@1234
const NEON_AUTHORIZED_EMAIL = "rakshit@amzadscout.com";
const NEON_AUTHORIZED_HASH = "6b54031250ed150b4e6bd9c3c5e3842289fccb82bcfed46fcb702f4b9d7272c6";

export default function Maintenance() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Login modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsAuthenticating(true);

    try {
      // Encrypt entered password with SHA-256 matching the Neon DB stored hash
      const computedHash = await sha256(loginPassword);
      const normalizedEmail = loginEmail.trim().toLowerCase();

      if (
        normalizedEmail === NEON_AUTHORIZED_EMAIL &&
        computedHash === NEON_AUTHORIZED_HASH
      ) {
        // Store authenticated session token for bypass
        localStorage.setItem(
          "neon_auth_session",
          JSON.stringify({
            email: normalizedEmail,
            role: "admin",
            timestamp: Date.now(),
          })
        );
        setIsLoginOpen(false);
        navigate("/home");
      } else {
        setLoginError("Invalid credentials. Access restricted.");
      }
    } catch {
      setLoginError("Authentication error. Please try again.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <>
      <SEOHead
        title="We're Upgrading | AMZ AD SCOUT"
        description="We are currently upgrading our platform with high-speed performance and enhanced growth tools. Back shortly."
        canonical="https://www.amzadscout.com/"
      />
      <div className="relative min-h-screen flex flex-col justify-between bg-slate-950 text-slate-50 overflow-hidden selection:bg-orange-500 selection:text-white">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[140px] pointer-events-none" />

        {/* Header / Top bar */}
        <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex flex-col items-start">
            <img 
              src="/logo.png" 
              alt="AMZ AD SCOUT" 
              className="h-12 w-auto object-contain brightness-0 invert" 
            />
            <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-400 mt-1 ml-0.5">
              AN AMAZON SPN AGENCY
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-orange-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Scheduled System Upgrade
            </div>

            {/* Login button */}
            <Button
              onClick={() => setIsLoginOpen(true)}
              variant="outline"
              size="sm"
              className="border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-medium gap-1.5 h-8 px-3 rounded-lg backdrop-blur-sm"
            >
              <Lock className="w-3.5 h-3.5 text-orange-400" />
              Admin Login
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Engineering a Next-Gen E-Commerce Experience</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Something extraordinary is in the works.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
              We are currently fine-tuning our high-performance infrastructure to provide you with the fastest, most reliable marketplace scaling platform.
            </p>

            {/* Key highlights row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <Clock className="w-5 h-5 text-orange-400 mb-2" />
                <h2 className="text-sm font-semibold text-white">Estimated Downtime</h2>
                <p className="text-xs text-slate-400 mt-0.5">Brief maintenance window</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5 text-blue-400 mb-2" />
                <h2 className="text-sm font-semibold text-white">High Security</h2>
                <p className="text-xs text-slate-400 mt-0.5">Direct encrypted databases</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-emerald-400 mb-2" />
                <h2 className="text-sm font-semibold text-white">Highest Speed</h2>
                <p className="text-xs text-slate-400 mt-0.5">Sub-millisecond page loads</p>
              </div>
            </div>

            {/* Notify box */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
              {submitted ? (
                <div className="flex items-center justify-center space-x-2 text-emerald-400 py-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium text-sm">Thank you! We'll notify you as soon as we go live.</span>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-slate-300 mb-3">
                    Want to be notified first when we launch?
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <Input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your business email"
                        className="pl-10 h-11 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-orange-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-11 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium shadow-md shadow-orange-500/20"
                    >
                      {loading ? "Submitting..." : (
                        <span className="flex items-center gap-1.5">
                          Notify Me <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>

            {/* Emergency direct contact */}
            <p className="mt-8 text-xs text-slate-500">
              Need immediate assistance? Reach our client desk directly at{" "}
              <a href="mailto:info@amzadscout.com" className="text-orange-400 hover:underline">
                info@amzadscout.com
              </a>
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 text-center text-xs text-slate-600 border-t border-slate-900">
          <p>© {new Date().getFullYear()} AMZ AD SCOUT. All rights reserved.</p>
        </footer>

        {/* Admin Login Dialog */}
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-slate-100 p-6 shadow-2xl">
            <DialogHeader>
              <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-2 mx-auto">
                <Lock className="w-5 h-5 text-orange-400" />
              </div>
              <DialogTitle className="text-center text-xl font-bold text-white">
                Authorized Access
              </DialogTitle>
              <DialogDescription className="text-center text-slate-400 text-xs">
                Enter your encrypted Neon administrator credentials to access the live website.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAdminLogin} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Email Address</label>
                <Input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter administrator email"
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-orange-500 text-sm h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <Input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-orange-500 text-sm h-10"
                />
              </div>

              {loginError && (
                <div className="p-2.5 rounded-lg bg-red-950/50 border border-red-800/60 text-red-400 text-xs text-center">
                  {loginError}
                </div>
              )}

              <Button
                type="submit"
                disabled={isAuthenticating}
                className="w-full h-10 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium text-sm mt-2 shadow-lg shadow-orange-500/20"
              >
                {isAuthenticating ? "Verifying..." : (
                  <span className="flex items-center justify-center gap-1.5">
                    <LogIn className="w-4 h-4" /> Login & Access Website
                  </span>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
