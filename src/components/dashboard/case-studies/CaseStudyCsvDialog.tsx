import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CaseStudiesApiError, importCaseStudies, type ImportPreview } from "@/hooks/useCaseStudies";

interface CaseStudyCsvDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImported: (count: number) => void;
  onAuthExpired: () => void;
  onForbidden: () => void;
}

const STEPS = ["Upload", "Preview", "Confirm"];

export function CaseStudyCsvDialog({ open, onOpenChange, onImported, onAuthExpired, onForbidden }: CaseStudyCsvDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [csv, setCsv] = useState("");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [errorsOnly, setErrorsOnly] = useState(false);
  const [lastAction, setLastAction] = useState<"dry" | "import" | null>(null);

  const reset = () => {
    setStep(0);
    setLoading(false);
    setNetworkError(null);
    setFileError(null);
    setCsv("");
    setFileName("");
    setPreview(null);
    setErrorsOnly(false);
    setLastAction(null);
  };

  const handleApiError = (error: unknown) => {
    if (error instanceof CaseStudiesApiError && error.status === 401) {
      onAuthExpired();
      return;
    }
    if (error instanceof CaseStudiesApiError && error.status === 403) {
      onForbidden();
      return;
    }
    if (error instanceof CaseStudiesApiError) {
      setFileError(error.message);
      setNetworkError(null);
      return;
    }
    setNetworkError(error instanceof Error ? error.message : "The upload failed.");
  };

  const runDry = async (text: string) => {
    setLoading(true);
    setNetworkError(null);
    setFileError(null);
    setLastAction("dry");
    try {
      const result = await importCaseStudies(text, true);
      setPreview(result);
      setStep(1);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const readFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setFileError("Choose a .csv file.");
      return;
    }
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
    if (lines.length > 202) {
      setFileError("CSV uploads are limited to 200 data rows.");
      return;
    }
    setCsv(text);
    setFileName(file.name);
    setFileError(null);
    await runDry(text);
  };

  const confirmImport = async () => {
    if (!csv || (preview && preview.errors.length > 0)) return;
    setLoading(true);
    setNetworkError(null);
    setLastAction("import");
    try {
      const result = await importCaseStudies(csv, false);
      const count = result.imported ?? preview?.rows.length ?? 0;
      const noun = count === 1 ? "case study" : "case studies";
      toast.success(`${count} ${noun} imported as drafts`);
      onImported(count);
      onOpenChange(false);
      reset();
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const errorCount = preview?.errors.length ?? 0;
  const readyCount = preview ? preview.rows.filter((row) => row.errors.length === 0).length : 0;
  const shownRows = preview ? (errorsOnly ? preview.rows.filter((row) => row.errors.length > 0) : preview.rows) : [];
  const noun = readyCount === 1 ? "case study" : "case studies";

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Bulk upload CSV</DialogTitle>
          <DialogDescription>Everything imports as a draft so each case study can be reviewed before it is published.</DialogDescription>
        </DialogHeader>
        <ol className="flex flex-wrap gap-3" aria-label="Import steps">
          {STEPS.map((label, index) => (
            <li key={label} className="flex items-center gap-2" aria-current={step === index ? "step" : undefined}>
              <span className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold ${step === index ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 text-slate-700"}`}>
                {index + 1}
              </span>
              <span className="text-sm font-medium">{label}</span>
            </li>
          ))}
        </ol>

        {networkError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
              <span>{networkError}</span>
              <Button
                type="button"
                variant="outline"
                className="min-h-11"
                onClick={() => (lastAction === "import" ? confirmImport() : runDry(csv))}
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        ) : null}
        {fileError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription>{fileError}</AlertDescription>
          </Alert>
        ) : null}

        {step === 0 ? (
          <div className="space-y-4">
            <div
              className="rounded-lg border border-dashed border-slate-300 p-8 text-center"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const file = event.dataTransfer.files?.[0];
                if (file) void readFile(file);
              }}
            >
              <p className="mb-4 text-sm text-slate-600">Drop a CSV here, or choose a file. Up to 200 rows.</p>
              <Button type="button" className="min-h-11" disabled={loading} onClick={() => inputRef.current?.click()}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                Choose file
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept=".csv,text/csv"
                className="sr-only"
                aria-label="Choose file"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void readFile(file);
                  event.target.value = "";
                }}
              />
              {fileName ? <p className="mt-3 text-sm text-slate-700">{fileName}</p> : null}
            </div>
            <p className="text-sm text-slate-600">Rows whose brand starts with EXAMPLE are always rejected.</p>
            <p className="text-sm text-slate-600">The template includes up to 4 metrics. Metrics 5 and 6 are added in the form.</p>
            <a className="inline-flex min-h-11 items-center text-sm font-medium text-blue-800 underline" href="/templates/case-studies-template.csv">
              Download CSV template
            </a>
          </div>
        ) : null}

        {step === 1 && preview ? (
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-800">
              {readyCount} {readyCount === 1 ? "row" : "rows"} ready, {errorCount} {errorCount === 1 ? "row" : "rows"} with errors
            </p>
            <div className="flex min-h-11 items-center gap-3">
              <Switch id="errors-only" checked={errorsOnly} onCheckedChange={setErrorsOnly} />
              <Label htmlFor="errors-only">Show only rows with errors</Label>
            </div>
            <div className="max-h-80 overflow-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Row</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Metrics</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shownRows.map((row) => (
                    <TableRow key={row.row} className={row.errors.length ? "bg-red-50" : undefined}>
                      <TableCell>{row.row}</TableCell>
                      <TableCell>{row.brand_name}</TableCell>
                      <TableCell>{row.channel}</TableCell>
                      <TableCell>{row.metrics}</TableCell>
                      <TableCell>
                        {row.errors.length ? (
                          <span className="inline-flex items-center gap-1 text-sm text-red-800">
                            <XCircle className="h-4 w-4" aria-hidden="true" />
                            Error
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-sm text-emerald-800">
                            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                            Ready
                          </span>
                        )}
                        {row.errors.length ? (
                          <ul className="mt-2 space-y-1 text-sm text-red-900">
                            {row.errors.map((error, index) => (
                              <li key={`${error.column}-${index}`}>
                                {error.column ? `${error.column}: ` : ""}
                                {error.message}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {errorCount > 0 ? (
              <p id="import-blocked" className="text-sm text-slate-700">Fix these rows in your file and upload it again.</p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" className="min-h-11" disabled={loading} onClick={() => { setStep(0); setPreview(null); }}>
                Re-upload
              </Button>
              {errorCount > 0 ? (
                <Button type="button" variant="outline" className="min-h-11" onClick={() => downloadErrors(preview)}>
                  Download error list
                </Button>
              ) : null}
              <Button
                type="button"
                className="min-h-11"
                data-testid="csv-import"
                disabled={loading || errorCount > 0}
                aria-describedby={errorCount > 0 ? "import-blocked" : undefined}
                onClick={() => setStep(2)}
              >
                Import
              </Button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <p className="text-base text-slate-800">Import {readyCount} {noun} as drafts?</p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" className="min-h-11" disabled={loading} onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" className="min-h-11" data-testid="csv-confirm" disabled={loading || errorCount > 0} onClick={() => void confirmImport()}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                Import
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function downloadErrors(preview: ImportPreview) {
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const lines = ["row,column,message", ...preview.errors.map((error) => `${error.row},${escape(error.column)},${escape(error.message)}`)];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "case-study-import-errors.csv";
  link.click();
  URL.revokeObjectURL(url);
}
