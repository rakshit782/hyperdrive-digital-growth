import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Layers,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Compass
} from "lucide-react";
import { toast } from "sonner";
import amazonWordmarkWhite from "@/assets/amazon-wordmark-white.svg";

export const CopilotLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Authenticating session with AMZ CoPilot...");
      window.location.href = `https://copilot.amzadscout.com?email=${encodeURIComponent(email)}`;
    }, 600);
  };

  return (
    <>
      <SEOHead 
        title="Sign In to AMZ CoPilot | Multi-Marketplace Intelligence Platform"
        description="Access AMZ CoPilot to manage Amazon advertising automation, inventory analytics, SKU profitability, and multi-marketplace performance."
        keywords="AMZ CoPilot login, amazon seller copilot, e-commerce automation portal, amazon ads analytics"
        canonical="https://copilot.amzadscout.com"
        robots="noindex, nofollow"
      />

      <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-hidden font-sans">
        
        {/* Dynamic Glassmorphism Background Aurora */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-600/20 via-indigo-500/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[650px] h-[650px] bg-gradient-to-tl from-cyan-500/15 via-blue-700/20 to-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[200px] pointer-events-none" />
        
        {/* Subtle Fine Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Top Minimal Navigation Bar */}
        <header className="relative z-20 w-full px-6 py-6 max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 group text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Agency Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Systems Operational
            </span>
            <span className="text-xs font-black tracking-widest text-slate-200 uppercase bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
              AMZ AD SCOUT
            </span>
          </div>
        </header>

        {/* Main Center Container */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Modern Classic Branding & Intelligence Features */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-transparent border border-blue-400/25 text-xs font-semibold text-blue-300 backdrop-blur-md shadow-inner">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Autonomous Marketplace Cockpit</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] font-display">
                  Precision scale with <br />
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
                    AMZ CoPilot
                  </span>
                </h1>

                <p className="text-slate-300/90 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal">
                  The enterprise intelligence engine that synchronizes algorithmic PPC bidding, real-time SKU profitability, and catalog inventory protection in one glass workspace.
                </p>
              </div>

              {/* Glass Feature Cards */}
              <div className="grid gap-3.5 max-w-lg mx-auto lg:mx-0 text-left">
                
                <div className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-blue-400/30 backdrop-blur-md transition-all duration-300 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Continuous Bid Optimization
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Hour-by-hour dayparting schedules and placement multipliers targeting target TACoS.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-indigo-400/30 backdrop-blur-md transition-all duration-300 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600/30 to-purple-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20 group-hover:scale-105 transition-transform">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      Unit-Level Margin & P&L Telemetry
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Instant visibility into exact COGS, marketplace commissions, advertising costs, and net margin.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-emerald-400/30 backdrop-blur-md transition-all duration-300 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600/30 to-teal-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Multi-Marketplace Synchronization
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Unified catalog health, stock alerts, and Buy Box telemetry across Amazon and Walmart.
                    </p>
                  </div>
                </div>

              </div>

              {/* Verified Security Footnote */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Amazon SP-API Certified
                </span>
                <span className="text-slate-600">•</span>
                <span>SOC2 Type II Compliant</span>
                <span className="text-slate-600">•</span>
                <span>256-Bit TLS Encryption</span>
              </div>

            </div>

            {/* Right Column: Ultra-Glassmorphic Login Card */}
            <div className="lg:col-span-6 w-full max-w-md mx-auto">
              
              <div className="relative group">
                
                {/* Ambient Soft Card Border Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-cyan-400/25 to-indigo-500/30 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Glass Container */}
                <div className="relative rounded-3xl bg-[#0c1424]/80 backdrop-blur-2xl border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-8 sm:p-10 overflow-hidden">
                  
                  {/* Subtle Inner Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                  {/* Header */}
                  <div className="text-center space-y-2 mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 mb-3 border border-white/20">
                      <Lock className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Sign in to CoPilot
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400">
                      Access your enterprise dashboard at <span className="text-cyan-400 font-mono">copilot.amzadscout.com</span>
                    </p>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Email Input */}
                    <div className="space-y-2">
                      <Label htmlFor="copilot-email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                        <span>Work Email</span>
                        <span className="text-[10px] text-slate-400 normal-case">Authorized Account</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="copilot-email"
                          type="email"
                          placeholder="name@brand.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-white/[0.04] hover:bg-white/[0.07] border-white/10 text-white placeholder:text-slate-500 pl-10 h-12 rounded-xl focus:border-cyan-400 focus:bg-white/[0.08] focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="copilot-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Password
                        </Label>
                        <a 
                          href="https://copilot.amzadscout.com/forgot-password" 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="copilot-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="bg-white/[0.04] hover:bg-white/[0.07] border-white/10 text-white placeholder:text-slate-500 pl-10 pr-10 h-12 rounded-xl focus:border-cyan-400 focus:bg-white/[0.08] focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="text-xs text-slate-300">Keep me authenticated for 30 days</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-600/30 border border-white/10 transition-all duration-300 mt-2 flex items-center justify-center gap-2 group/btn cursor-pointer"
                    >
                      <span className="text-sm tracking-wide">
                        {isSubmitting ? "Authenticating Session..." : "Sign In to CoPilot"}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>

                  </form>

                  {/* Alternative Actions */}
                  <div className="pt-6 mt-6 border-t border-white/[0.08] text-center space-y-3">
                    <p className="text-xs text-slate-400">
                      Need custom workspace setup or enterprise access?{" "}
                      <Link to="/contact" className="text-cyan-400 hover:underline font-semibold">
                        Request a demo
                      </Link>
                    </p>

                    <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                      <a 
                        href="https://copilot.amzadscout.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="hover:text-slate-300 inline-flex items-center gap-1.5 transition-colors font-mono"
                      >
                        <span>Direct portal: copilot.amzadscout.com</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </main>

        {/* Minimal Classic Footer */}
        <footer className="relative z-20 w-full py-6 px-6 text-center text-xs text-slate-400 border-t border-white/[0.06] bg-[#070b14]/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-slate-400">
              © {new Date().getFullYear()} AMZ AD SCOUT. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
              <Link to="/amz-copilot-privacy" className="hover:text-slate-200 transition-colors">
                CoPilot Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/eula" className="hover:text-slate-200 transition-colors">
                End User License Agreement (EULA)
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-slate-200 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default CopilotLogin;
