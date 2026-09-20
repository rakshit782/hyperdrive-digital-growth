import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Plus, RefreshCw, Trash2, Ban, CheckCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { certificateService, Certificate } from "@/services/certificateService";

const emptyForm = {
  certificate_id: "",
  student_name: "",
  email: "",
  role: "",
  department: "",
  start_date: "",
  end_date: "",
  issue_date: "",
  mentor_name: "",
  performance: "",
};

export function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [bulkText, setBulkText] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await certificateService.list();
      setCertificates(data.certificates || []);
    } catch (e: any) {
      toast.error(e.message || "Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.student_name || !form.role || !form.start_date || !form.end_date) {
      toast.error("Name, role, start date and end date are required");
      return;
    }
    setSaving(true);
    try {
      const { certificate } = await certificateService.create(form);
      toast.success(`Certificate ${certificate.certificate_id} created`);
      setForm({ ...emptyForm });
      load();
    } catch (e: any) {
      toast.error(e.message || "Failed to create certificate");
    } finally {
      setSaving(false);
    }
  };

  const handleBulk = async () => {
    const lines = bulkText.split("\n").map((l) => l.trim()).filter(Boolean);
    const rows = lines.map((line) => {
      const [student_name, role, start_date, end_date, email, department, mentor_name] =
        line.split(",").map((v) => (v || "").trim());
      return { student_name, role, start_date, end_date, email, department, mentor_name };
    });
    const invalid = rows.filter((r) => !r.student_name || !r.role || !r.start_date || !r.end_date);
    if (rows.length === 0 || invalid.length > 0) {
      toast.error("Each line needs: Name, Role, Start date, End date");
      return;
    }
    setSaving(true);
    try {
      const res = await certificateService.bulkCreate(rows);
      toast.success(`${res.created} certificates created`);
      setBulkText("");
      load();
    } catch (e: any) {
      toast.error(e.message || "Bulk creation failed");
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (cert: Certificate) => {
    try {
      await certificateService.setStatus(cert.id!, cert.status === "active" ? "revoked" : "active");
      load();
    } catch (e: any) {
      toast.error(e.message || "Failed to update status");
    }
  };

  const remove = async (cert: Certificate) => {
    if (!confirm(`Delete certificate ${cert.certificate_id}?`)) return;
    try {
      await certificateService.remove(cert.id!);
      toast.success("Certificate deleted");
      load();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete");
    }
  };

  const field = (key: keyof typeof emptyForm, label: string, type = "text", placeholder = "") => (
    <div className="space-y-1">
      <Label htmlFor={key}>{label}</Label>
      <Input
        id={key}
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Internship Certificates</h2>
          <p className="text-muted-foreground mt-1">
            Issue certificates and let students verify them publicly.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open("/verify-certificate", "_blank")}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Verification page
          </Button>
          <Button variant="outline" onClick={load}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="single">
        <TabsList>
          <TabsTrigger value="single">Add certificate</TabsTrigger>
          <TabsTrigger value="bulk">Bulk add</TabsTrigger>
        </TabsList>

        <TabsContent value="single">
          <Card>
            <CardHeader>
              <CardTitle>New certificate</CardTitle>
              <CardDescription>
                Leave the certificate ID blank to generate one automatically (AAS-INT-YEAR-0001).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
                {field("student_name", "Student name")}
                {field("role", "Internship role", "text", "e.g. Amazon PPC Intern")}
                {field("start_date", "Start date", "date")}
                {field("end_date", "End date", "date")}
                {field("email", "Email (optional)", "email")}
                {field("department", "Department (optional)")}
                {field("mentor_name", "Mentor (optional)")}
                {field("performance", "Performance (optional)", "text", "e.g. Excellent")}
                {field("issue_date", "Issue date (optional)", "date")}
                {field("certificate_id", "Certificate ID (optional)")}
                <div className="md:col-span-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    Create certificate
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle>Bulk add</CardTitle>
              <CardDescription>
                One student per line: Name, Role, Start date (YYYY-MM-DD), End date, Email, Department, Mentor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
                placeholder={"Riya Sharma, Amazon PPC Intern, 2026-01-05, 2026-04-05, riya@mail.com, Advertising, Rahul"}
              />
              <Button onClick={handleBulk} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                Create all
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Issued certificates ({certificates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : certificates.length === 0 ? (
            <p className="text-muted-foreground">No certificates issued yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs">{c.certificate_id}</TableCell>
                      <TableCell>{c.student_name}</TableCell>
                      <TableCell>{c.role}</TableCell>
                      <TableCell className="text-xs">
                        {String(c.start_date).slice(0, 10)} → {String(c.end_date).slice(0, 10)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={c.status === "active" ? "default" : "destructive"}>
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button size="sm" variant="ghost" onClick={() => toggleStatus(c)}>
                          {c.status === "active" ? (
                            <Ban className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => remove(c)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
