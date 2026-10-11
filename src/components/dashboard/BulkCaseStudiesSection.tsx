import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Trash2, 
  Eye, 
  Search, 
  ArrowUpRight,
  Database
} from "lucide-react";
import { toast } from "sonner";
import { allBulkCaseStudies, FormattedCaseStudy } from "@/data/bulkCaseStudiesAdapter";

export function BulkCaseStudiesSection() {
  const [caseStudies, setCaseStudies] = useState<FormattedCaseStudy[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [isUploading, setIsUploading] = useState(false);
  const [previewDetail, setPreviewDetail] = useState<FormattedCaseStudy | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage or initialize with 160 bulk items
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const saved = localStorage.getItem("caseStudiesData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCaseStudies(parsed);
          return;
        }
      } catch (err) {
        console.error("Failed to parse saved case studies:", err);
      }
    }
    // Default to the 160 items from the sample file
    setCaseStudies(allBulkCaseStudies);
    localStorage.setItem("caseStudiesData", JSON.stringify(allBulkCaseStudies));
  };

  const syncToFrontend = (data: FormattedCaseStudy[]) => {
    setCaseStudies(data);
    localStorage.setItem("caseStudiesData", JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("caseStudiesUpdated", { detail: data }));
  };

  const handleResetToSample = () => {
    syncToFrontend(allBulkCaseStudies);
    toast.success(`Reset successfully to all ${allBulkCaseStudies.length} sample case studies!`);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all active case studies from the frontend?")) {
      syncToFrontend([]);
      toast.info("Cleared all case studies");
    }
  };

  // Robust CSV Parser
  const parseCSV = (text: string): string[][] => {
    const lines: string[][] = [];
    let row: string[] = [];
    let inQuotes = false;
    let current = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        row.push(current.trim());
        current = "";
      } else if ((char === "\r" || char === "\n") && !inQuotes) {
        if (char === "\r" && nextChar === "\n") i++;
        row.push(current.trim());
        current = "";
        if (row.length > 1 || (row.length === 1 && row[0] !== "")) {
          lines.push(row);
        }
        row = [];
      } else {
        current += char;
      }
    }
    if (current || row.length > 0) {
      row.push(current.trim());
      lines.push(row);
    }
    return lines;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) throw new Error("Empty file content");

        const rows = parseCSV(text);
        if (rows.length < 2) {
          throw new Error("File must contain at least a header row and one data row");
        }

        const headers = rows[0].map((h) => h.trim());
        const headerIndexMap: Record<string, number> = {};
        headers.forEach((h, idx) => {
          headerIndexMap[h.toLowerCase()] = idx;
        });

        const findVal = (row: string[], colNames: string[]): string => {
          for (const name of colNames) {
            const idx = headerIndexMap[name.toLowerCase()];
            if (idx !== undefined && row[idx] !== undefined) {
              return row[idx].trim();
            }
          }
          return "";
        };

        const parsedStudies: FormattedCaseStudy[] = [];

        for (let i = 1; i < rows.length; i++) {
          const r = rows[i];
          if (!r || r.length === 0 || (r.length === 1 && !r[0])) continue;

          const caseId = findVal(r, ["Case ID", "case_id", "id"]) || `CS-${String(i).padStart(4, "0")}`;
          const service = findVal(r, ["Service", "service_type"]) || "Amazon Advertising";
          const serviceCategory = findVal(r, ["Service Category", "category"]) || "Amazon Services";
          const clientName = findVal(r, ["Client Profile (Mock)", "client_name", "brand_name"]) || "Confidential Client";
          const industry = findVal(r, ["Industry", "industry"]) || "E-commerce";
          const channel = findVal(r, ["Marketplace / Channel", "channel", "platform"]) || "Amazon US";
          const duration = findVal(r, ["Duration (months)", "duration", "time_period"]);
          const challenge = findVal(r, ["Challenge", "challenge"]);
          const solution = findVal(r, ["Solution", "solution"]);
          const res1 = findVal(r, ["Result 1", "metric1_label"]) || "Growth";
          const val1 = findVal(r, ["Value 1", "metric1_after"]) || "—";
          const res2 = findVal(r, ["Result 2", "metric2_label"]) || "Efficiency";
          const val2 = findVal(r, ["Value 2", "metric2_after"]) || "—";
          const res3 = findVal(r, ["Result 3", "metric3_label"]) || "Impact";
          const val3 = findVal(r, ["Value 3", "metric3_after"]) || "—";
          const successFactorsStr = findVal(r, ["Key Success Factors", "key_factors"]);
          const dataStatus = findVal(r, ["Data Status", "status"]) || "Published";

          const successFactors = successFactorsStr
            ? successFactorsStr.split(",").map((s) => s.trim()).filter(Boolean)
            : ["Expert Execution", "Data-Driven Decisions", "Strategic Optimization"];

          // Dynamic metrics
          const detailedMetrics: Array<{ label: string; value: string }> = [];
          for (let m = 1; m <= 19; m++) {
            const mLabel = findVal(r, [`Metric ${m}`, `metric${m}_label`]);
            const mVal = findVal(r, [`Metric ${m} Value`, `metric${m}_after`]);
            if (mLabel && mVal) {
              detailedMetrics.push({ label: mLabel, value: mVal });
            }
          }

          const description = challenge && solution 
            ? `${challenge} ${solution}` 
            : challenge || solution || `Comprehensive ${service} strategy executed for ${clientName}.`;

          parsedStudies.push({
            id: caseId.toLowerCase().replace(/[^a-z0-9]/g, "-"),
            caseId,
            title: `${clientName}: ${val1} ${res1}`,
            service,
            serviceCategory,
            client_name: clientName,
            industry,
            channel,
            platform: channel,
            durationMonths: duration ? `${duration} Months` : "",
            challenge,
            solution,
            description,
            keySuccessFactors: successFactors,
            dataStatus,
            results: {
              metric1: { label: res1, value: val1 },
              metric2: { label: res2, value: val2 },
              metric3: { label: res3, value: val3 },
            },
            metrics: detailedMetrics,
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
            image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
          });
        }

        if (parsedStudies.length === 0) {
          throw new Error("No valid data rows found in the CSV file");
        }

        syncToFrontend(parsedStudies);
        toast.success(`Successfully uploaded and pushed ${parsedStudies.length} case studies to frontend!`);
      } catch (err: any) {
        toast.error(err.message || "Failed to parse CSV file");
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read the file");
      setIsUploading(false);
    };

    reader.readAsText(file);
  };

  // Filtered case studies
  const filteredStudies = caseStudies.filter((study) => {
    const matchesSearch =
      study.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.industry.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || study.serviceCategory === selectedCategory;

    const matchesService =
      selectedService === "all" || study.service === selectedService;

    return matchesSearch && matchesCategory && matchesService;
  });

  const categories = Array.from(new Set(caseStudies.map((c) => c.serviceCategory))).filter(Boolean);
  const services = Array.from(new Set(caseStudies.map((c) => c.service))).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <FileSpreadsheet className="h-8 w-8 text-blue-600" />
            Bulk Case Studies Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Upload custom CSV sheets or use sample data to instantly update frontend case studies.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() => window.open("/templates/case-studies-sample.csv", "_blank")}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Sample CSV
          </Button>
          <Button
            variant="outline"
            onClick={handleResetToSample}
            className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <RefreshCw className="h-4 w-4" />
            Push Sample (160 Rows)
          </Button>
          <Button
            variant="destructive"
            onClick={handleClearAll}
            size="sm"
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Live Case Studies</CardDescription>
            <CardTitle className="text-3xl font-bold text-blue-600">
              {caseStudies.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Active in frontend store</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Service Categories</CardDescription>
            <CardTitle className="text-3xl font-bold text-purple-600">
              {categories.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Amazon, Walmart & Growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Services</CardDescription>
            <CardTitle className="text-3xl font-bold text-green-600">
              {services.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Advertising, Listing, Catalog...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Frontend Status</CardDescription>
            <CardTitle className="text-xl font-bold text-emerald-600 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Synced & Ready
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Available on /case-studies</p>
          </CardContent>
        </Card>
      </div>

      {/* Upload Zone Card */}
      <Card className="border-2 border-dashed border-primary/20 bg-muted/20">
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Upload Case Studies File (CSV)</h3>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-1">
                Upload your completed CSV sheet with columns: <br />
                <code className="text-xs bg-muted px-2 py-1 rounded inline-block mt-2">
                  Case ID, Service, Service Category, Client Profile, Industry, Marketplace, Challenge, Solution, Result 1-3, Metrics...
                </code>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
                id="case-study-csv-upload"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isUploading ? "Processing File..." : "Select & Upload CSV File"}
              </Button>
              <Button
                variant="outline"
                asChild
              >
                <a href="/case-studies" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  View Public Page
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by client, ID, service, or marketplace..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-9 px-3 rounded-md border border-input bg-background text-sm font-medium focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Categories ({caseStudies.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="h-9 px-3 rounded-md border border-input bg-background text-sm font-medium focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Services</option>
            {services.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table Preview */}
      <Card>
        <CardHeader className="py-4 px-6 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Live Case Studies Records ({filteredStudies.length} of {caseStudies.length})
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              Instant sync enabled
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto max-h-[600px]">
            <Table>
              <TableHeader className="bg-muted/50 sticky top-0 z-10">
                <TableRow>
                  <TableHead className="w-[100px]">Case ID</TableHead>
                  <TableHead>Client Profile</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Marketplace</TableHead>
                  <TableHead>Key Results</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No case studies matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudies.slice(0, 100).map((study) => (
                    <TableRow key={study.caseId} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs font-semibold text-blue-600">
                        {study.caseId}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">{study.client_name}</div>
                        <div className="text-xs text-muted-foreground">{study.industry}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs font-normal">
                          {study.service}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-medium">
                          {study.channel}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs space-y-0.5">
                          <span className="text-green-600 font-semibold">{study.results.metric1.value}</span>{" "}
                          <span className="text-muted-foreground">{study.results.metric1.label}</span>
                          {study.results.metric2.value && study.results.metric2.value !== "—" && (
                            <div className="text-[11px] text-muted-foreground">
                              <span className="text-purple-600 font-medium">{study.results.metric2.value}</span>{" "}
                              {study.results.metric2.label}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={study.dataStatus === "Published" ? "default" : "secondary"}
                          className="text-[11px]"
                        >
                          {study.dataStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewDetail(study)}
                          className="h-8 px-2 text-xs"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {filteredStudies.length > 100 && (
            <div className="p-3 text-center text-xs text-muted-foreground border-t bg-muted/20">
              Showing first 100 of {filteredStudies.length} matching rows. Use search or filters to narrow down.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {previewDetail && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewDetail(null)}
        >
          <div 
            className="bg-background max-w-2xl w-full rounded-xl shadow-2xl p-6 border max-h-[90vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600">{previewDetail.caseId}</span>
                <h3 className="text-xl font-bold text-foreground mt-0.5">{previewDetail.client_name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{previewDetail.service}</Badge>
                  <Badge variant="secondary">{previewDetail.channel}</Badge>
                  <Badge variant="secondary">{previewDetail.industry}</Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setPreviewDetail(null)}>
                ✕
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Challenge</h4>
                <p className="text-sm text-foreground mt-1 bg-muted/40 p-3 rounded-lg">{previewDetail.challenge || "N/A"}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Solution</h4>
                <p className="text-sm text-foreground mt-1 bg-muted/40 p-3 rounded-lg">{previewDetail.solution || "N/A"}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Key Metric Results</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-700">{previewDetail.results.metric1.value}</div>
                    <div className="text-xs text-green-800">{previewDetail.results.metric1.label}</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-700">{previewDetail.results.metric2.value}</div>
                    <div className="text-xs text-purple-800">{previewDetail.results.metric2.label}</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-700">{previewDetail.results.metric3.value}</div>
                    <div className="text-xs text-blue-800">{previewDetail.results.metric3.label}</div>
                  </div>
                </div>
              </div>

              {previewDetail.metrics.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Detailed Metrics ({previewDetail.metrics.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-muted/30 p-3 rounded-lg max-h-48 overflow-y-auto">
                    {previewDetail.metrics.map((m, idx) => (
                      <div key={idx} className="bg-background p-2 rounded border text-xs">
                        <div className="text-muted-foreground text-[10px] truncate">{m.label}</div>
                        <div className="font-semibold text-foreground">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {previewDetail.keySuccessFactors.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Key Success Factors</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {previewDetail.keySuccessFactors.map((factor, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                        ✓ {factor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-4 flex justify-end">
              <Button onClick={() => setPreviewDetail(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
