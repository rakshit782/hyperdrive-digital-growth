import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AlertCircle, ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import {
  CaseStudiesApiError,
  createCaseStudy,
  slugifyBrand,
  updateCaseStudy,
  type CaseStudy,
} from "@/hooks/useCaseStudies";
import {
  CHANNELS,
  channelLabel,
  metricAccessibleText,
} from "@/content/caseStudiesCopy";
import {
  METRIC_UNITS,
  UNSAVED_CASE_STUDY_KEY,
  draftFingerprint,
  draftToWrite,
  emptyMetric,
  firstErrorId,
  matchServerField,
  validateDraft,
  type CaseStudyDraft,
  type FieldErrors,
  type MetricDraft,
} from "@/components/dashboard/case-studies/form";

interface CaseStudyFormSheetProps {
  open: boolean;
  draft: CaseStudyDraft | null;
  formSession: number;
  initialErrors?: FieldErrors;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
  onAuthExpired: (draft: CaseStudyDraft) => void;
  onForbidden: () => void;
}

export function CaseStudyFormSheet({
  open,
  draft,
  formSession,
  initialErrors = {},
  onOpenChange,
  onSaved,
  onAuthExpired,
  onForbidden,
}: CaseStudyFormSheetProps) {
  const [form, setForm] = useState<CaseStudyDraft | null>(draft);
  const [baseline, setBaseline] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [preview, setPreview] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);

  useEffect(() => {
    if (!open || !draft) return;
    setForm(draft);
    setBaseline(draftFingerprint(draft));
    setErrors(initialErrors);
    setTouched({});
    setShowAllErrors(Object.keys(initialErrors).length > 0);
    setBanner(null);
    setPreview(false);
    setLogoFailed(false);
    // Reload only when a new editing session starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, formSession]);

  const dirty = !!form && draftFingerprint(form) !== baseline;
  const visibleErrors = (key: string) => (showAllErrors || touched[key] ? errors[key] : undefined);

  const previewStudy = useMemo(() => (form ? toPreviewStudy(form) : null), [form]);

  const update = (patch: Partial<CaseStudyDraft>) => {
    setForm((current) => (current ? { ...current, ...patch } : current));
  };

  const updateMetric = (index: number, patch: Partial<MetricDraft>) => {
    setForm((current) => {
      if (!current) return current;
      const results = current.results.map((metric, metricIndex) =>
        metricIndex === index ? { ...metric, ...patch } : metric,
      );
      return { ...current, results };
    });
  };

  const moveMetric = (index: number, direction: -1 | 1) => {
    setForm((current) => {
      if (!current) return current;
      const next = index + direction;
      if (next < 0 || next >= current.results.length) return current;
      const results = [...current.results];
      const [item] = results.splice(index, 1);
      results.splice(next, 0, item);
      return { ...current, results };
    });
  };

  const requestClose = (next: boolean) => {
    if (!next && dirty) {
      setConfirmClose(true);
      return;
    }
    onOpenChange(next);
  };

  const blur = (key: string) => {
    setTouched((current) => ({ ...current, [key]: true }));
    if (!form) return;
    const next = validateDraft(form, "publish");
    const draftErrors = validateDraft(form, "draft");
    setErrors((current) => ({
      ...current,
      [key]: draftErrors[key] || next[key] || "",
    }));
  };

  const save = async (mode: "draft" | "publish") => {
    if (!form) return;
    const nextErrors = validateDraft(form, mode);
    setErrors(nextErrors);
    setShowAllErrors(true);
    const keys = Object.keys(nextErrors);
    if (keys.length) {
      const id = firstErrorId(nextErrors);
      if (id) document.getElementById(id)?.focus();
      return;
    }
    setSaving(mode);
    setBanner(null);
    try {
      const body = draftToWrite(form, mode === "publish");
      if (form.id) await updateCaseStudy(form.id, body);
      else await createCaseStudy(body);
      toast.success(mode === "publish" ? "Case study published" : "Draft saved");
      sessionStorage.removeItem(UNSAVED_CASE_STUDY_KEY);
      onSaved();
      onOpenChange(false);
    } catch (error) {
      if (error instanceof CaseStudiesApiError && error.status === 401) {
        sessionStorage.setItem(UNSAVED_CASE_STUDY_KEY, JSON.stringify(form));
        onAuthExpired(form);
        return;
      }
      if (error instanceof CaseStudiesApiError && error.status === 403) {
        onForbidden();
        return;
      }
      if (error instanceof CaseStudiesApiError && error.status === 400) {
        const field = matchServerField(error.message);
        if (field) {
          setErrors((current) => ({ ...current, [field]: error.message }));
          setShowAllErrors(true);
          document.getElementById(`field-${field}`)?.focus();
        } else {
          setBanner(error.message);
        }
        return;
      }
      setBanner(error instanceof Error ? error.message : "Something went wrong. Try again.");
    } finally {
      setSaving(null);
    }
  };

  if (!form) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={requestClose}>
        <SheetContent className="flex h-full w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-[640px]">
          <SheetHeader className="border-b px-6 py-4 pr-12 text-left">
            <SheetTitle>{form.id ? "Edit case study" : "Add case study"}</SheetTitle>
            <SheetDescription>A draft only needs a brand name. Publishing needs the story and at least one metric.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 space-y-8 overflow-y-auto px-6 py-5">
            {banner ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                <AlertDescription>{banner}</AlertDescription>
              </Alert>
            ) : null}

            <section className="space-y-4" aria-labelledby="group-brand">
              <h3 id="group-brand" className="text-base font-semibold">Brand</h3>
              <Field label="Brand name" id="field-brand_name" required error={visibleErrors("brand_name")}>
                <Input
                  id="field-brand_name"
                  value={form.brand_name}
                  aria-invalid={!!visibleErrors("brand_name")}
                  onBlur={() => blur("brand_name")}
                  onChange={(event) => {
                    const brand_name = event.target.value;
                    update({
                      brand_name,
                      slug: form.slugTouched ? form.slug : slugifyBrand(brand_name),
                    });
                  }}
                />
              </Field>
              <Field label="Slug" id="field-slug" error={visibleErrors("slug")} hint={`Preview: /case-studies/${form.slug || "slug"}`}>
                <Input
                  id="field-slug"
                  value={form.slug}
                  aria-invalid={!!visibleErrors("slug")}
                  onBlur={() => blur("slug")}
                  onChange={(event) => update({ slug: slugifyBrand(event.target.value), slugTouched: true })}
                />
              </Field>
              <Field label="Channel" id="field-channel" required={false} error={visibleErrors("channel")}>
                <Select
                  value={form.channel || undefined}
                  onValueChange={(value) => {
                    update({ channel: value as CaseStudyDraft["channel"] });
                    setTouched((current) => ({ ...current, channel: true }));
                  }}
                >
                  <SelectTrigger id="field-channel" className="min-h-11" aria-invalid={!!visibleErrors("channel")}>
                    <SelectValue placeholder="Select a channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {CHANNELS.map((channel) => (
                      <SelectItem key={channel} value={channel}>
                        {channelLabel(channel)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Category" id="field-category">
                <Input id="field-category" value={form.category} placeholder="e.g. Home" onChange={(event) => update({ category: event.target.value })} />
              </Field>
              <Field label="Logo URL" id="field-logo_url" error={logoFailed ? "That image could not be loaded." : visibleErrors("logo_url")}>
                <Input
                  id="field-logo_url"
                  value={form.logo_url}
                  placeholder="https://"
                  onChange={(event) => {
                    setLogoFailed(false);
                    update({ logo_url: event.target.value });
                  }}
                />
                {form.logo_url ? (
                  <img
                    src={form.logo_url}
                    alt=""
                    className="mt-2 h-10 max-w-[120px] object-contain"
                    onError={() => setLogoFailed(true)}
                    onLoad={() => setLogoFailed(false)}
                  />
                ) : null}
              </Field>
            </section>

            <section className="space-y-4" aria-labelledby="group-story">
              <h3 id="group-story" className="text-base font-semibold">Story</h3>
              <Field label="Challenge" id="field-challenge" error={visibleErrors("challenge")} count={`${form.challenge.length}/600`}>
                <Textarea
                  id="field-challenge"
                  value={form.challenge}
                  maxLength={600}
                  rows={4}
                  aria-invalid={!!visibleErrors("challenge")}
                  onBlur={() => blur("challenge")}
                  onChange={(event) => update({ challenge: event.target.value })}
                />
              </Field>
              <Field label="Solution" id="field-solution" error={visibleErrors("solution")} count={`${form.solution.length}/800`}>
                <Textarea
                  id="field-solution"
                  value={form.solution}
                  maxLength={800}
                  rows={5}
                  aria-invalid={!!visibleErrors("solution")}
                  onBlur={() => blur("solution")}
                  onChange={(event) => update({ solution: event.target.value })}
                />
              </Field>
              <Field label="Time period" id="field-time_period">
                <Input
                  id="field-time_period"
                  value={form.time_period}
                  placeholder="e.g. Jan-Jun 2025"
                  onChange={(event) => update({ time_period: event.target.value })}
                />
              </Field>
            </section>

            <section className="space-y-4" aria-labelledby="group-results">
              <div className="flex items-center justify-between gap-3">
                <h3 id="group-results" className="text-base font-semibold">Results</h3>
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11"
                  disabled={form.results.length >= 6}
                  onClick={() => update({ results: [...form.results, emptyMetric()] })}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Add metric
                </Button>
              </div>
              {visibleErrors("results") ? <FieldError message={visibleErrors("results")} /> : null}
              {form.results.map((metric, index) => (
                <div key={metric.key} className="space-y-3 rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Metric {index + 1}</p>
                    <div className="flex gap-1">
                      <IconButton label="Move metric up" disabled={index === 0} onClick={() => moveMetric(index, -1)}>
                        <ArrowUp className="h-4 w-4" aria-hidden="true" />
                      </IconButton>
                      <IconButton label="Move metric down" disabled={index === form.results.length - 1} onClick={() => moveMetric(index, 1)}>
                        <ArrowDown className="h-4 w-4" aria-hidden="true" />
                      </IconButton>
                      <IconButton
                        label="Remove metric"
                        disabled={form.results.length === 1}
                        onClick={() => update({ results: form.results.filter((_, metricIndex) => metricIndex !== index) })}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </IconButton>
                    </div>
                  </div>
                  <Field label="Label" id={`field-metric-${index}-label`} error={visibleErrors(`metric-${index}-label`)}>
                    <Input
                      id={`field-metric-${index}-label`}
                      value={metric.label}
                      placeholder="e.g. ACoS"
                      aria-invalid={!!visibleErrors(`metric-${index}-label`)}
                      onBlur={() => blur(`metric-${index}-label`)}
                      onChange={(event) => updateMetric(index, { label: event.target.value })}
                    />
                  </Field>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Before" id={`field-metric-${index}-before`}>
                      <Input
                        id={`field-metric-${index}-before`}
                        value={metric.before}
                        placeholder="Optional"
                        onChange={(event) => updateMetric(index, { before: event.target.value })}
                      />
                    </Field>
                    <Field label="After" id={`field-metric-${index}-after`} error={visibleErrors(`metric-${index}-after`)}>
                      <Input
                        id={`field-metric-${index}-after`}
                        value={metric.after}
                        aria-invalid={!!visibleErrors(`metric-${index}-after`)}
                        onBlur={() => blur(`metric-${index}-after`)}
                        onChange={(event) => updateMetric(index, { after: event.target.value })}
                      />
                    </Field>
                    <Field label="Unit" id={`field-metric-${index}-unit`}>
                      <Select value={presetUnit(metric.unit)} onValueChange={(value) => updateMetric(index, { unit: value === "custom" ? "" : value })}>
                        <SelectTrigger id={`field-metric-${index}-unit`} className="min-h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {METRIC_UNITS.map((unit) => (
                            <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                          ))}
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      {presetUnit(metric.unit) === "custom" ? (
                        <Input
                          className="mt-2"
                          aria-label="Custom unit"
                          value={metric.unit}
                          placeholder="e.g. pts"
                          onChange={(event) => updateMetric(index, { unit: event.target.value })}
                        />
                      ) : null}
                    </Field>
                  </div>
                  <p className="text-sm text-slate-600">
                    {metric.label.trim() && metric.after.trim()
                      ? metricAccessibleText({ label: metric.label, before: metric.before || null, after: metric.after, unit: metric.unit })
                      : "Preview appears when a label and after value are filled in."}
                  </p>
                </div>
              ))}
            </section>

            <section className="space-y-4" aria-labelledby="group-quote">
              <h3 id="group-quote" className="text-base font-semibold">Testimonial (optional)</h3>
              <Field label="Quote" id="field-testimonial_quote" error={visibleErrors("testimonial_quote")} count={`${form.testimonial_quote.length}/300`}>
                <Textarea
                  id="field-testimonial_quote"
                  value={form.testimonial_quote}
                  maxLength={300}
                  rows={3}
                  onBlur={() => blur("testimonial_quote")}
                  onChange={(event) => update({ testimonial_quote: event.target.value })}
                />
              </Field>
              <Field label="Author" id="field-testimonial_author" error={visibleErrors("testimonial_author")}>
                <Input
                  id="field-testimonial_author"
                  value={form.testimonial_author}
                  placeholder="Name and title"
                  aria-invalid={!!visibleErrors("testimonial_author")}
                  onBlur={() => blur("testimonial_author")}
                  onChange={(event) => update({ testimonial_author: event.target.value })}
                />
              </Field>
            </section>

            <div className="flex min-h-11 items-center justify-between gap-3 rounded-lg border px-3">
              <Label htmlFor="preview-card">Preview card</Label>
              <Switch id="preview-card" checked={preview} onCheckedChange={setPreview} />
            </div>
            {preview && previewStudy ? <CaseStudyCard study={previewStudy} preview /> : null}
          </div>
          <div className="flex flex-col gap-2 border-t bg-background px-6 py-4 sm:flex-row sm:justify-end">
            <Button type="button" variant="ghost" className="min-h-11" onClick={() => requestClose(false)} disabled={!!saving}>
              Cancel
            </Button>
            <Button type="button" variant="outline" className="min-h-11" data-testid="save-draft" disabled={!!saving} onClick={() => save("draft")}>
              {saving === "draft" ? "Saving…" : "Save draft"}
            </Button>
            <Button type="button" className="min-h-11" data-testid="save-publish" disabled={!!saving} onClick={() => save("publish")}>
              {saving === "publish" ? "Publishing…" : "Save & publish"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <AlertDialog open={confirmClose} onOpenChange={setConfirmClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
            <AlertDialogDescription>The case study form has changes that are not saved yet.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-11">Keep editing</AlertDialogCancel>
            <AlertDialogAction
              className="min-h-11"
              onClick={() => {
                setConfirmClose(false);
                onOpenChange(false);
              }}
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function presetUnit(unit: string): string {
  return (METRIC_UNITS as readonly string[]).includes(unit) ? unit : "custom";
}

function toPreviewStudy(draft: CaseStudyDraft): CaseStudy {
  const body = draftToWrite(draft, false);
  return {
    id: draft.id || "preview",
    slug: body.slug || "preview",
    brand_name: body.brand_name,
    channel: body.channel || "",
    category: body.category || null,
    logo_url: body.logo_url || null,
    challenge: body.challenge || null,
    solution: body.solution || null,
    results: body.results || [],
    time_period: body.time_period || null,
    testimonial_quote: body.testimonial_quote || null,
    testimonial_author: body.testimonial_author || null,
    published: false,
    sort_order: draft.sort_order,
    created_at: "",
    updated_at: "",
  };
}

function Field({
  label,
  id,
  error,
  hint,
  count,
  required = false,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  count?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const described = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>
          {label}
          {required ? <span className="text-destructive"> *</span> : null}
        </Label>
        {count ? <span className="text-xs text-slate-500">{count}</span> : null}
      </div>
      <div aria-describedby={described}>{children}</div>
      {hint ? <p id={`${id}-hint`} className="text-xs text-slate-500">{hint}</p> : null}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ message, id }: { message?: string; id?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-start gap-1 text-sm text-destructive" role="alert">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}

function IconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button type="button" variant="outline" size="icon" className="min-h-11 min-w-11" aria-label={label} disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
}
