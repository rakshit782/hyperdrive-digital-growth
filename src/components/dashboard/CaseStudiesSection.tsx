import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ArrowDown, ArrowUp, GripVertical, MoreHorizontal, Plus } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import {
  ADMIN_CASE_STUDIES_KEY,
  CaseStudiesApiError,
  compareCaseStudies,
  deleteCaseStudy,
  fetchAllCaseStudies,
  reorderCaseStudies,
  shouldFallbackReorder,
  updateCaseStudy,
  useAdminCaseStudies,
  type CaseStudy,
} from "@/hooks/useCaseStudies";
import { CHANNELS, channelLabel, formatMetricValue, metricAccessibleText } from "@/content/caseStudiesCopy";
import { brandInitials } from "@/lib/caseStudyFormat";
import { CaseStudyFormSheet } from "@/components/dashboard/case-studies/CaseStudyFormSheet";
import { CaseStudyCsvDialog } from "@/components/dashboard/case-studies/CaseStudyCsvDialog";
import {
  UNSAVED_CASE_STUDY_KEY,
  draftFromCaseStudy,
  draftToWrite,
  emptyDraft,
  validateDraft,
  type CaseStudyDraft,
  type FieldErrors,
} from "@/components/dashboard/case-studies/form";

type StatusTab = "all" | "published" | "drafts";
type MoveDirection = "up" | "down";

function visibleMoveButton(id: string, direction: MoveDirection): HTMLButtonElement | undefined {
  return Array.from(
    document.querySelectorAll<HTMLButtonElement>(
      `button[data-move="${direction}"][data-study-id="${CSS.escape(id)}"]`,
    ),
  ).find((button) => button.getClientRects().length > 0);
}

function focusMoveButton(id: string, direction: MoveDirection) {
  const preferred = visibleMoveButton(id, direction);
  if (preferred && !preferred.disabled) {
    preferred.focus();
    return;
  }
  const other = visibleMoveButton(id, direction === "up" ? "down" : "up");
  if (other && !other.disabled) other.focus();
}

export function CaseStudiesSection() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const query = useAdminCaseStudies();
  const studies = useMemo(() => [...(query.data || [])].sort(compareCaseStudies), [query.data]);
  const [tab, setTab] = useState<StatusTab>("all");
  const [channel, setChannel] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const [draft, setDraft] = useState<CaseStudyDraft | null>(null);
  const [formSession, setFormSession] = useState(0);
  const [formErrors, setFormErrors] = useState<FieldErrors>({});
  const [adminAlert, setAdminAlert] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<CaseStudy | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [reorderStatus, setReorderStatus] = useState("");
  const focusIntent = useRef<{ id: string; direction: MoveDirection } | null>(null);

  useEffect(() => {
    const intent = focusIntent.current;
    if (!intent) return;
    focusMoveButton(intent.id, intent.direction);
  }, [studies]);

  const publishedCount = studies.filter((study) => study.published).length;
  const draftCount = studies.length - publishedCount;

  const visible = studies.filter((study) => {
    if (tab === "published" && !study.published) return false;
    if (tab === "drafts" && study.published) return false;
    if (channel !== "all" && study.channel !== channel) return false;
    if (search && !study.brand_name.toLowerCase().includes(search.trim().toLowerCase())) return false;
    return true;
  });

  const openForm = (next: CaseStudyDraft, errors: FieldErrors = {}) => {
    setDraft(next);
    setFormErrors(errors);
    setFormSession((value) => value + 1);
    setSheetOpen(true);
  };

  const refresh = () => queryClient.invalidateQueries({ queryKey: ADMIN_CASE_STUDIES_KEY });

  useEffect(() => {
    if (query.error instanceof CaseStudiesApiError && query.error.status === 401) {
      toast.error("Session expired, please log in again");
      navigate("/dashboard/login");
    }
  }, [query.error, navigate]);

  const handleAuth = (current?: CaseStudyDraft) => {
    if (current) sessionStorage.setItem(UNSAVED_CASE_STUDY_KEY, JSON.stringify(current));
    toast.error("Session expired, please log in again");
    navigate("/dashboard/login");
  };

  const handleForbidden = () => {
    setAdminAlert("Your account doesn't have admin access.");
  };

  const onTogglePublish = async (study: CaseStudy, next: boolean) => {
    if (next) {
      const nextDraft = draftFromCaseStudy(study);
      const errors = validateDraft(nextDraft, "publish");
      if (Object.keys(errors).length) {
        openForm(nextDraft, errors);
        toast.error("This case study is missing details required to publish.");
        return;
      }
    }
    const previous = queryClient.getQueryData<CaseStudy[]>(ADMIN_CASE_STUDIES_KEY);
    queryClient.setQueryData<CaseStudy[]>(ADMIN_CASE_STUDIES_KEY, (current) =>
      (current || []).map((item) => (item.id === study.id ? { ...item, published: next } : item)),
    );
    try {
      await updateCaseStudy(study.id, draftToWrite(draftFromCaseStudy({ ...study, published: next }), next));
      toast.success(next ? "Published" : "Moved to drafts");
    } catch (error) {
      queryClient.setQueryData(ADMIN_CASE_STUDIES_KEY, previous);
      if (error instanceof CaseStudiesApiError && error.status === 401) {
        handleAuth();
        return;
      }
      if (error instanceof CaseStudiesApiError && error.status === 403) {
        handleForbidden();
        return;
      }
      toast.error(error instanceof Error ? error.message : "Could not update publishing.");
    }
  };

  const releaseMoveFocus = () => {
    setTimeout(() => {
      focusIntent.current = null;
    }, 0);
  };

  const refetchAdminList = async () => {
    try {
      const server = await fetchAllCaseStudies();
      queryClient.setQueryData(ADMIN_CASE_STUDIES_KEY, server);
    } catch (error) {
      if (error instanceof CaseStudiesApiError && error.status === 401) {
        handleAuth();
        return;
      }
      if (error instanceof CaseStudiesApiError && error.status === 403) handleForbidden();
    }
  };

  const reportOrderFailure = async (error: unknown) => {
    if (error instanceof CaseStudiesApiError && error.status === 401) {
      handleAuth();
      return;
    }
    if (error instanceof CaseStudiesApiError && error.status === 403) handleForbidden();
    toast.error(error instanceof Error ? error.message : "Couldn't save the new order.");
    await refetchAdminList();
  };

  const persistOrder = async (next: CaseStudy[], previous: CaseStudy[]) => {
    queryClient.setQueryData(ADMIN_CASE_STUDIES_KEY, next);
    const order = next.map((study) => ({ id: study.id, sort_order: study.sort_order }));
    try {
      const saved = await reorderCaseStudies(order);
      queryClient.setQueryData(ADMIN_CASE_STUDIES_KEY, saved);
    } catch (error) {
      if (!shouldFallbackReorder(error)) {
        await reportOrderFailure(error);
        return;
      }
      const changed = next.filter((study) => {
        const before = previous.find((item) => item.id === study.id);
        return before && before.sort_order !== study.sort_order;
      });
      try {
        await Promise.all(
          changed.map((study) =>
            updateCaseStudy(study.id, { brand_name: study.brand_name, sort_order: study.sort_order }),
          ),
        );
      } catch (fallbackError) {
        await reportOrderFailure(fallbackError);
      }
    } finally {
      releaseMoveFocus();
    }
  };

  const moveVisible = (id: string, toIndex: number, direction?: MoveDirection) => {
    const fromIndex = visible.findIndex((study) => study.id === id);
    if (fromIndex < 0 || toIndex < 0 || toIndex >= visible.length || fromIndex === toIndex) return;
    const previous = studies;
    const sorted = [...studies].sort(compareCaseStudies);
    const movingIndex = sorted.findIndex((study) => study.id === id);
    const [moving] = sorted.splice(movingIndex, 1);
    const targetId = visible[toIndex].id;
    let insertAt = sorted.findIndex((study) => study.id === targetId);
    if (fromIndex < toIndex) insertAt += 1;
    sorted.splice(insertAt, 0, moving);
    const next = sorted.map((study, index) => ({ ...study, sort_order: index }));
    if (direction) {
      focusIntent.current = { id, direction };
      setReorderStatus(`Moved ${moving.brand_name} to position ${toIndex + 1}`);
    }
    void persistOrder(next, previous);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const target = pendingDelete;
    setPendingDelete(null);
    try {
      await deleteCaseStudy(target.id);
      toast.success(`Deleted ${target.brand_name}`);
      refresh();
    } catch (error) {
      if (error instanceof CaseStudiesApiError && error.status === 401) {
        handleAuth();
        return;
      }
      if (error instanceof CaseStudiesApiError && error.status === 403) {
        handleForbidden();
        return;
      }
      toast.error(error instanceof Error ? error.message : "Could not delete that case study.");
    }
  };

  useEffect(() => {
    const raw = sessionStorage.getItem(UNSAVED_CASE_STUDY_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as CaseStudyDraft;
      sessionStorage.removeItem(UNSAVED_CASE_STUDY_KEY);
      openForm(saved);
      toast.message("Restored your unsaved case study.");
    } catch {
      sessionStorage.removeItem(UNSAVED_CASE_STUDY_KEY);
    }
  }, []);

  return (
    <div className="space-y-6" data-testid="case-studies-section">
      <p className="sr-only" aria-live="polite" data-testid="reorder-status">
        {reorderStatus}
      </p>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Case Studies</h2>
          <p className="mt-1 text-muted-foreground">
            {publishedCount} published, {draftCount} {draftCount === 1 ? "draft" : "drafts"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="min-h-11" data-testid="add-case-study" onClick={() => openForm(emptyDraft(studies.length))}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add case study
          </Button>
          <Button variant="outline" className="min-h-11" data-testid="bulk-upload" onClick={() => setCsvOpen(true)}>
            Bulk upload CSV
          </Button>
          <a className="inline-flex min-h-11 items-center px-2 text-sm font-medium text-primary underline" href="/templates/case-studies-template.csv">
            Download CSV template
          </a>
        </div>
      </div>

      {adminAlert ? (
        <Alert variant="destructive">
          <AlertDescription>{adminAlert}</AlertDescription>
        </Alert>
      ) : null}
      {query.isError ? (
        <Alert variant="destructive">
          <AlertDescription>
            {query.error instanceof CaseStudiesApiError && query.error.status === 403
              ? "Your account doesn't have admin access."
              : query.error instanceof Error
                ? query.error.message
                : "Could not load case studies."}
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <Tabs value={tab} onValueChange={(value) => setTab(value as StatusTab)}>
          <TabsList className="h-auto">
            <TabsTrigger className="min-h-11" value="all">All</TabsTrigger>
            <TabsTrigger className="min-h-11" value="published">Published</TabsTrigger>
            <TabsTrigger className="min-h-11" value="drafts" data-testid="tab-drafts">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="space-y-1">
          <Label htmlFor="channel-filter">Channel</Label>
          <Select value={channel} onValueChange={setChannel}>
            <SelectTrigger id="channel-filter" className="min-h-11 w-[180px]" data-testid="channel-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {CHANNELS.map((item) => (
                <SelectItem key={item} value={item}>{channelLabel(item)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 space-y-1">
          <Label htmlFor="brand-search">Search by brand name</Label>
          <Input id="brand-search" value={search} data-testid="brand-search" onChange={(event) => setSearch(event.target.value)} />
        </div>
      </div>

      {query.isLoading ? <p className="text-muted-foreground">Loading case studies…</p> : null}

      {!query.isLoading && studies.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-slate-700">No case studies yet. Add one, or upload a CSV of several.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button className="min-h-11" onClick={() => openForm(emptyDraft(0))}>Add case study</Button>
            <Button variant="outline" className="min-h-11" onClick={() => setCsvOpen(true)}>Bulk upload CSV</Button>
            <a className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline" href="/templates/case-studies-template.csv">
              Download CSV template
            </a>
          </div>
        </div>
      ) : null}

      {studies.length > 0 && visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">No case studies match these filters.</p>
      ) : null}

      {visible.length > 0 ? (
        <>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"><span className="sr-only">Reorder</span></TableHead>
                  <TableHead>Logo</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Headline metric</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((study, index) => (
                  <TableRow
                    key={study.id}
                    data-testid="case-study-row"
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => {
                      if (draggingId) moveVisible(draggingId, index);
                      setDraggingId(null);
                    }}
                  >
                    <TableCell>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          draggable
                          aria-label={`Reorder ${study.brand_name}`}
                          onDragStart={(event) => {
                            event.dataTransfer.setData("text/plain", study.id);
                            setDraggingId(study.id);
                          }}
                          onDragEnd={() => setDraggingId(null)}
                        >
                          <GripVertical className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center" aria-label={`Move ${study.brand_name} up`} data-testid="move-up" data-move="up" data-study-id={study.id} disabled={index === 0} onClick={() => moveVisible(study.id, index - 1, "up")}>
                          <ArrowUp className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center" aria-label={`Move ${study.brand_name} down`} data-testid="move-down" data-move="down" data-study-id={study.id} disabled={index === visible.length - 1} onClick={() => moveVisible(study.id, index + 1, "down")}>
                          <ArrowDown className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell><Logo study={study} /></TableCell>
                    <TableCell className="font-medium">{study.brand_name}</TableCell>
                    <TableCell>{study.channel ? <Badge variant="outline">{channelLabel(study.channel)}</Badge> : "—"}</TableCell>
                    <TableCell><Headline study={study} /></TableCell>
                    <TableCell>
                      <label className="inline-flex min-h-11 min-w-11 items-center">
                        <Switch
                          checked={study.published}
                          data-testid="publish-switch"
                          aria-label={`${study.published ? "Unpublish" : "Publish"} ${study.brand_name}`}
                          onCheckedChange={(checked) => void onTogglePublish(study, checked)}
                        />
                      </label>
                    </TableCell>
                    <TableCell>{relativeTime(study.updated_at)}</TableCell>
                    <TableCell>
                      <RowMenu
                        study={study}
                        onEdit={() => openForm(draftFromCaseStudy(study))}
                        onDuplicate={() => openForm(draftFromCaseStudy(study, true))}
                        onDelete={() => setPendingDelete(study)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ul className="space-y-3 md:hidden">
            {visible.map((study, index) => (
              <li key={study.id} className="rounded-lg border p-4" data-testid="case-study-row">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Logo study={study} />
                    <div>
                      <p className="font-semibold">{study.brand_name}</p>
                      {study.channel ? <Badge variant="outline">{channelLabel(study.channel)}</Badge> : null}
                    </div>
                  </div>
                  <RowMenu
                    study={study}
                    onEdit={() => openForm(draftFromCaseStudy(study))}
                    onDuplicate={() => openForm(draftFromCaseStudy(study, true))}
                    onDelete={() => setPendingDelete(study)}
                  />
                </div>
                <div className="mt-3"><Headline study={study} /></div>
                <div className="mt-3 flex items-center justify-between">
                  <label className="inline-flex min-h-11 items-center gap-2 text-sm">
                    <Switch
                      checked={study.published}
                      aria-label={`${study.published ? "Unpublish" : "Publish"} ${study.brand_name}`}
                      onCheckedChange={(checked) => void onTogglePublish(study, checked)}
                    />
                    {study.published ? "Published" : "Draft"}
                  </label>
                  <div className="flex">
                    <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center" aria-label={`Move ${study.brand_name} up`} data-testid="move-up" data-move="up" data-study-id={study.id} disabled={index === 0} onClick={() => moveVisible(study.id, index - 1, "up")}>
                      <ArrowUp className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center" aria-label={`Move ${study.brand_name} down`} data-testid="move-down" data-move="down" data-study-id={study.id} disabled={index === visible.length - 1} onClick={() => moveVisible(study.id, index + 1, "down")}>
                      <ArrowDown className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <CaseStudyFormSheet
        open={sheetOpen}
        draft={draft}
        formSession={formSession}
        initialErrors={formErrors}
        onOpenChange={setSheetOpen}
        onSaved={refresh}
        onAuthExpired={handleAuth}
        onForbidden={handleForbidden}
      />
      <CaseStudyCsvDialog
        open={csvOpen}
        onOpenChange={setCsvOpen}
        onImported={() => {
          setTab("drafts");
          refresh();
        }}
        onAuthExpired={() => handleAuth()}
        onForbidden={handleForbidden}
      />
      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {pendingDelete?.brand_name}?</AlertDialogTitle>
            <AlertDialogDescription>This removes the case study. This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-11">Cancel</AlertDialogCancel>
            <AlertDialogAction className="min-h-11 bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => void confirmDelete()}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Logo({ study }: { study: CaseStudy }) {
  const [failed, setFailed] = useState(false);
  if (!study.logo_url || failed) {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-800">
        {brandInitials(study.brand_name)}
      </span>
    );
  }
  return (
    <img
      src={study.logo_url}
      alt=""
      className="h-8 w-8 object-contain"
      width={32}
      height={32}
      onError={() => setFailed(true)}
    />
  );
}

function Headline({ study }: { study: CaseStudy }) {
  const metric = study.results[0];
  if (!metric) return <span className="text-slate-500">—</span>;
  const text = metricAccessibleText(metric);
  const visual = metric.before
    ? `${metric.label} ${formatMetricValue(metric.before, metric.unit)} → ${formatMetricValue(metric.after, metric.unit)}`
    : `${metric.label} ${formatMetricValue(metric.after, metric.unit)}`;
  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{visual}</span>
    </span>
  );
}

function RowMenu({
  study,
  onEdit,
  onDuplicate,
  onDelete,
}: {
  study: CaseStudy;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="min-h-11 min-w-11" aria-label={`Actions for ${study.brand_name}`}>
          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={onDuplicate}>Duplicate</DropdownMenuItem>
        {study.published ? (
          <DropdownMenuItem asChild>
            <a href={`/case-studies/${study.slug}`} target="_blank" rel="noreferrer">View on site</a>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem className="text-destructive" onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function relativeTime(value: string): string {
  const time = Date.parse(value);
  if (!Number.isFinite(time)) return "—";
  return formatDistanceToNow(time, { addSuffix: true });
}
