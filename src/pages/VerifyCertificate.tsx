import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, XCircle, Search, Printer, Loader2 } from "lucide-react";
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
            <div className="border-4 border-slate-900 rounded-lg bg-white p-10 text-center space-y-5 print:border-2">
              <p className="text-xs tracking-[0.3em] font-semibold text-slate-500">AMZ AD SCOUT</p>
              <p className="text-[10px] tracking-[0.2em] text-slate-400">AN AMAZON SPN AGENCY</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Certificate of Internship
              </h2>
              <p className="text-slate-600 text-sm">This is to certify that</p>
              <p className="text-3xl font-bold text-slate-900">{cert.student_name}</p>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xl mx-auto">
                has successfully completed an internship as{" "}
                <strong>{cert.role}</strong>
                {cert.department ? ` in the ${cert.department} team` : ""} from{" "}
                <strong>{formatDate(cert.start_date)}</strong> to{" "}
                <strong>{formatDate(cert.end_date)}</strong>.
                {cert.performance ? ` Performance: ${cert.performance}.` : ""}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6 text-left text-sm max-w-md mx-auto">
                <div>
                  <p className="text-slate-500">Issued on</p>
                  <p className="font-medium text-slate-900">{formatDate(cert.issue_date)}</p>
                </div>
                <div>
                  <p className="text-slate-500">Mentor</p>
                  <p className="font-medium text-slate-900">{cert.mentor_name || "-"}</p>
                </div>
                <div>
                  <p className="text-slate-500">Certificate ID</p>
                  <p className="font-medium text-slate-900">{cert.certificate_id}</p>
                </div>
                <div>
                  <p className="text-slate-500">Status</p>
                  <p className="font-medium text-slate-900 capitalize">{cert.status}</p>
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
