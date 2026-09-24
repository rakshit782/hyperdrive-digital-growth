import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, XCircle, Search, Printer, Loader2, Download } from "lucide-react";
import QRCode from "qrcode";
import { certificateService, Certificate } from "@/services/certificateService";

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

  useEffect(() => {
    const initial = params.get("id");
    if (initial) runSearch(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const cert = result?.certificate;
  const isValid = result?.found && cert?.status === "active";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Verify Internship Certificate | AMZ AD SCOUT"
        description="Verify the authenticity of an AMZ AD SCOUT internship certificate using the certificate ID."
        canonical="https://amzadscout.com/verify-certificate"
      />
      <div className="print:hidden">
        <Header />
      </div>

      <section className="bg-slate-900 text-white py-16 print:hidden">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Internship Certificate Verification</h1>
          <p className="text-slate-300">
            Enter the certificate ID printed on the certificate to confirm it was issued by AMZ AD SCOUT.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto pt-2">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. AAS-INT-2026-0001"
              className="bg-white text-slate-900 h-12"
            />
            <Button type="submit" size="lg" disabled={loading} className="h-12">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
              Verify
            </Button>
          </form>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {result && !result.found && (
          <Card className="border-destructive/40">
            <CardContent className="p-8 text-center space-y-3">
              <XCircle className="h-12 w-12 text-destructive mx-auto" />
              <h2 className="text-xl font-semibold">No certificate found</h2>
              <p className="text-muted-foreground text-sm">
                We could not find a certificate with that ID. Please check the ID and try again.
              </p>
            </CardContent>
          </Card>
        )}

        {cert && (
          <div className="space-y-6">
            <div
              className={`flex items-center gap-3 rounded-lg p-4 ${
                isValid ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
              }`}
            >
              {isValid ? <BadgeCheck className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
              <div>
                <p className="font-semibold">
                  {isValid ? "Verified certificate" : "This certificate has been revoked"}
                </p>
                <p className="text-sm opacity-80">Certificate ID: {cert.certificate_id}</p>
              </div>
            </div>

            {/* Printable certificate */}
            <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm print:shadow-none print:border-0">
              <div className="border-2 border-slate-900 rounded-md px-6 py-10 md:px-14 text-center overflow-hidden">
                {/* Header */}
                <div className="flex flex-col items-center gap-2">
                  <img src="/logo.png" alt="AMZ AD SCOUT" className="h-12 w-auto" />
                  <p className="text-[10px] tracking-[0.35em] font-semibold text-slate-900 uppercase">
                    AMZ AD SCOUT
                  </p>
                  <p className="text-[9px] tracking-[0.25em] text-slate-400 uppercase">
                    An Amazon SPN Agency
                  </p>
                </div>

                {/* Ornamental divider */}
                <div className="flex items-center justify-center gap-3 my-8" aria-hidden="true">
                  <span className="h-px w-16 bg-slate-300" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-amber-500" />
                  <span className="h-px w-16 bg-slate-300" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                  Certificate of Internship
                </h2>

                <p className="mt-6 text-slate-500 text-sm">This is to certify that</p>
                <p className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  {cert.student_name}
                </p>
                <p className="mt-5 text-slate-600 text-sm leading-relaxed max-w-lg mx-auto">
                  has successfully completed an internship as{" "}
                  <strong className="text-slate-900">{cert.role}</strong>
                  {cert.department ? ` in the ${cert.department} team` : ""} from{" "}
                  <strong className="text-slate-900">{formatDate(cert.start_date)}</strong> to{" "}
                  <strong className="text-slate-900">{formatDate(cert.end_date)}</strong>.
                  {cert.performance ? ` Performance: ${cert.performance}.` : ""}
                </p>

                {/* Details — symmetric 2x2 grid */}
                <div className="mt-10 -mx-6 md:-mx-14 border-t border-slate-200 grid grid-cols-2 text-sm">
                  <div className="py-4 px-4 border-r border-slate-200">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Issued on</p>
                    <p className="mt-1 font-medium text-slate-900">{formatDate(cert.issue_date)}</p>
                  </div>
                  <div className="py-4 px-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Mentor</p>
                    <p className="mt-1 font-medium text-slate-900">{cert.mentor_name || "—"}</p>
                  </div>
                  <div className="py-4 px-4 border-t border-r border-slate-200">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Certificate ID</p>
                    <p className="mt-1 font-medium text-slate-900 break-all text-xs md:text-sm">
                      {cert.certificate_id}
                    </p>
                  </div>
                  <div className="py-4 px-4 border-t border-slate-200">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Status</p>
                    <span
                      className={`mt-2 inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${
                        cert.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {cert.status === "active" ? "Active" : "Revoked"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center print:hidden">
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" />
                Print / Save as PDF
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
