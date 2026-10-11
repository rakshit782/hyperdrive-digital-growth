import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BadgeCheck, XCircle, Search, Printer, Loader2, Download, 
  ShieldCheck, Award, Calendar, UserCheck, MapPin, Building,
  Sparkles, ExternalLink, ArrowRight, Share2, CheckCircle2
} from "lucide-react";
import QRCode from "qrcode";
import { certificateService, Certificate } from "@/services/certificateService";
import { toast } from "sonner";

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  const d = new Date(value);
  return isNaN(d.getTime())
    ? String(value)
    : d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
};

const VerifyCertificate = () => {
  const [params, setParams] = useSearchParams();
  const [code, setCode] = useState(params.get("id") || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ found: boolean; certificate?: Certificate } | null>(null);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const runSearch = async (value: string) => {
    if (!value.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await certificateService.verify(value.trim());
      setResult(data);
    } catch (e) {
      setResult({ found: false });
    } finally {
      setLoading(false);
    }
  };

  const cert = result?.certificate;
  const isValid = result?.found && cert?.status === "active";

  useEffect(() => {
    const initial = params.get("id");
    if (initial) runSearch(initial);
  }, []);

  useEffect(() => {
    if (!cert) {
      setQrUrl("");
      return;
    }
    const verifyUrl = `${window.location.origin}/verify-certificate?id=${encodeURIComponent(cert.certificate_id)}`;
    QRCode.toDataURL(verifyUrl, {
      width: 320,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
    })
      .then(setQrUrl)
      .catch(() => setQrUrl(""));
  }, [cert]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParams(code.trim() ? { id: code.trim() } : {});
    runSearch(code);
  };

  const handleShare = () => {
    if (!cert) return;
    const url = `${window.location.origin}/verify-certificate?id=${encodeURIComponent(cert.certificate_id)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Verification link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans selection:bg-primary/20 selection:text-primary">
      <SEOHead
        title="Verify Internship Certificate | AMZ AD SCOUT"
        description="Verify the authenticity and credentials of an official AMZ AD SCOUT internship certificate."
        canonical="https://www.amzadscout.com/verify-certificate"
        robots="noindex, follow"
      />
      <div className="print:hidden">
        <Header />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-20 pb-28 px-4 sm:px-6 print:hidden">
        {/* Subtle Decorative Ambient Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-primary/20 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-cyan-300 border border-white/15 backdrop-blur-md shadow-inner">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            Official Credential Verification Portal
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Authenticate Internship Certificates
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Verify issued credentials, internship tenures, departments, and official mentoring endorsements registered under <span className="text-white font-medium">AMZ AD SCOUT</span>.
          </p>

          {/* Search Box */}
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-2.5 max-w-xl mx-auto pt-4"
          >
            <div className="relative flex-1">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Certificate ID (e.g. AMZ/JAI/HROPS/2026/09/884710)"
                className="bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white border-white/20 h-13 pl-4 pr-10 text-sm sm:text-base shadow-xl rounded-xl focus-visible:ring-2 focus-visible:ring-primary font-mono tracking-wide placeholder:font-sans placeholder:text-muted-foreground placeholder:text-sm"
              />
              {code && (
                <button
                  type="button"
                  onClick={() => setCode("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <Button 
              type="submit" 
              size="lg" 
              disabled={loading || !code.trim()} 
              className="h-13 px-7 rounded-xl font-semibold shadow-lg shadow-primary/25 cursor-pointer bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-primary/95 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Verify ID
                </>
              )}
            </Button>
          </form>

          {/* Quick Helper */}
          <p className="text-xs text-slate-400 font-mono">
            Sample format: <span className="text-slate-300">AMZ/JAI/HROPS/2026/09/884710</span>
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 mb-20 relative z-20">
        {/* Certificate Not Found State */}
        {result && !result.found && (
          <Card className="border-rose-500/30 bg-card shadow-xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <CardContent className="p-8 sm:p-12 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <XCircle className="h-8 w-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Certificate Not Found
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  We could not find an issued record matching <span className="font-mono text-foreground font-semibold">"{code}"</span>. Please check for typos or contact administration.
                </p>
              </div>
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCode("")}
                  className="text-xs"
                >
                  Clear & Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Found Certificate */}
        {cert && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Verification Status Header Banner */}
            <div
              className={`rounded-2xl p-5 sm:p-6 border shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isValid
                  ? "bg-white dark:bg-slate-900 border-emerald-500/40 text-slate-900 dark:text-slate-100"
                  : "bg-white dark:bg-slate-900 border-rose-500/40 text-slate-900 dark:text-slate-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0 ${
                    isValid
                      ? "bg-emerald-500 text-white shadow-emerald-500/30"
                      : "bg-rose-500 text-white shadow-rose-500/30"
                  }`}
                >
                  {isValid ? <BadgeCheck className="h-7 w-7" /> : <XCircle className="h-7 w-7" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-black tracking-tight">
                      {isValid ? "Authentic Verified Credential" : "Certificate Revoked"}
                    </span>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isValid
                          ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                          : "bg-rose-500/20 text-rose-700 dark:text-rose-300"
                      }`}
                    >
                      {cert.status === "active" ? "Valid" : "Revoked"}
                    </span>
                  </div>
                  <p className="text-xs opacity-80 font-mono mt-0.5">
                    Certificate Serial: {cert.certificate_id}
                  </p>
                </div>
              </div>

              {/* Action Buttons in header */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end print:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="text-xs h-9 gap-1.5 bg-background/80 hover:bg-background cursor-pointer"
                >
                  {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Share"}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => window.print()}
                  className="text-xs h-9 gap-1.5 shadow-xs cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print / PDF
                </Button>
              </div>
            </div>

            {/* Certificate Canvas / Card */}
            <div className="relative rounded-3xl bg-white text-slate-900 border-8 border-slate-900/10 p-4 sm:p-8 shadow-2xl overflow-hidden print:p-0 print:border-0 print:shadow-none">
              {/* Elegant Geometric Border Frame */}
              <div className="relative border-4 border-double border-slate-900/80 rounded-2xl p-6 sm:p-14 text-center overflow-hidden bg-gradient-to-b from-white via-slate-50/40 to-white">
                {/* Watermark Logo Background */}
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none"
                  aria-hidden="true"
                >
                  <img src="/logo.png" alt="" className="w-96 h-96 object-contain grayscale" />
                </div>

                {/* Top Corner Accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-500" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-500" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-500" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-500" />

                {/* Organization Brand Header */}
                <div className="flex flex-col items-center gap-2 mb-4">
                  <img src="/logo.png" alt="AMZ AD SCOUT" className="h-14 sm:h-16 w-auto object-contain" />
                  <div className="space-y-0.5">
                    <p className="text-xs sm:text-sm tracking-[0.4em] font-extrabold text-slate-900 uppercase">
                      AMZ AD SCOUT
                    </p>
                    <p className="text-[10px] tracking-[0.25em] text-slate-500 uppercase font-semibold">
                      Official Amazon SPN & Ads Partner Agency
                    </p>
                  </div>
                </div>

                {/* Ornamental Ribbon Divider */}
                <div className="flex items-center justify-center gap-3 my-6 sm:my-8" aria-hidden="true">
                  <span className="h-px w-20 sm:w-28 bg-gradient-to-r from-transparent via-slate-400 to-slate-400" />
                  <Award className="h-5 w-5 text-amber-500 shrink-0" />
                  <span className="h-px w-20 sm:w-28 bg-gradient-to-l from-transparent via-slate-400 to-slate-400" />
                </div>

                {/* Certificate Title */}
                <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 uppercase">
                  Certificate of Internship
                </h2>

                <p className="mt-6 text-slate-500 text-xs sm:text-sm uppercase tracking-widest font-medium">
                  This is proudly presented to
                </p>

                {/* Candidate Name */}
                <div className="relative inline-block my-4 sm:my-6">
                  <h3 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight px-4 pb-2 border-b-2 border-slate-900">
                    {cert.student_name}
                  </h3>
                </div>

                {/* Citation Statement */}
                <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-serif">
                  for successfully completing the professional internship program as{" "}
                  <strong className="text-slate-900 font-sans font-semibold underline decoration-amber-500 underline-offset-4">
                    {cert.role}
                  </strong>
                  {cert.department ? ` within the ${cert.department} division` : ""} from{" "}
                  <strong className="text-slate-900 font-sans font-semibold">{formatDate(cert.start_date)}</strong> to{" "}
                  <strong className="text-slate-900 font-sans font-semibold">{formatDate(cert.end_date)}</strong>.
                  {cert.performance && (
                    <span className="block mt-2 font-medium text-slate-700 italic">
                      Performance Evaluation: "{cert.performance}"
                    </span>
                  )}
                </p>

                {/* 4-Column Structured Credential Metadata Grid */}
                <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-primary" /> Issue Date
                    </p>
                    <p className="mt-1.5 font-semibold text-slate-900 text-sm">
                      {formatDate(cert.issue_date)}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                      <UserCheck className="h-3.5 w-3.5 text-primary" /> Lead Mentor
                    </p>
                    <p className="mt-1.5 font-semibold text-slate-900 text-sm break-words">
                      {cert.mentor_name || "Operations Team"}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Certificate ID
                    </p>
                    <p className="mt-1.5 font-mono font-bold text-slate-900 text-xs sm:text-[13px] break-all leading-snug select-all" title={cert.certificate_id}>
                      {cert.certificate_id}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5 text-primary" /> Department
                    </p>
                    <p className="mt-1.5 font-semibold text-slate-900 text-sm break-words">
                      {cert.department || "Operations"}
                    </p>
                  </div>
                </div>

                {/* QR Code and Signatures Footer */}
                <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Left: Organization Seal */}
                  <div className="flex items-center gap-3 text-left">
                    <div className="h-14 w-14 rounded-full border-2 border-dashed border-amber-600 flex items-center justify-center p-1 text-amber-700">
                      <div className="h-full w-full rounded-full border border-amber-600 flex items-center justify-center text-[9px] font-black uppercase text-center leading-tight">
                        SEAL OF<br/>AUTHENTICITY
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">AMZ AD SCOUT INDIA</p>
                      <p className="text-[10px] text-slate-500 font-mono">Digital Signature Verified</p>
                    </div>
                  </div>

                  {/* Center: Dynamic QR code verification */}
                  {qrUrl && (
                    <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-white shadow-xs border border-slate-200">
                      <img 
                        src={qrUrl} 
                        alt="Scan QR Code to verify certificate online" 
                        className="h-20 w-20 rounded" 
                      />
                      <p className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">
                        Scan to Validate
                      </p>
                    </div>
                  )}

                  {/* Right: Authorizing Officer */}
                  <div className="text-center sm:text-right space-y-1">
                    <p className="font-serif italic text-lg sm:text-xl text-slate-800">
                      AMZ Authorized Signatory
                    </p>
                    <div className="w-40 h-px bg-slate-300 mx-auto sm:ml-auto" />
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                      Director of Operations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions for users */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 print:hidden">
              <Button 
                variant="outline" 
                onClick={() => window.print()}
                className="gap-2 shadow-xs"
              >
                <Printer className="h-4 w-4" />
                Print Certificate / Download PDF
              </Button>
              {qrUrl && (
                <Button 
                  variant="outline" 
                  asChild
                  className="gap-2 shadow-xs"
                >
                  <a href={qrUrl} download={`verify-qr-${cert.certificate_id.replace(/\//g, "-")}.png`}>
                    <Download className="h-4 w-4" />
                    Save QR Code
                  </a>
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Copy Verification URL
              </Button>
            </div>
          </div>
        )}
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default VerifyCertificate;
