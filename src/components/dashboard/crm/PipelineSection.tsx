import { useMemo, useState } from "react";
import { ArrowRightLeft, BadgeCheck, CalendarClock, Mail, Phone, Plus, Search, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  crm, LEAD_STAGES, STAGE_LABEL, fmtDate, fmtMoney, userLabel,
  type CrmLead, type LeadStage, type Plan, type Task, type TeamUser,
} from "@/services/crmService";
import {
  EmptyState, ErrorState, Field, LoadingState, NativeSelect, Pill, SectionHeader, STAGE_TONE, Stat,
  errMsg, isOverdue, useLoader,
} from "./shared";
import { TaskDialog, TaskRow } from "./TasksSection";

function LeadCard({ lead, onOpen }: { lead: CrmLead; onOpen: () => void }) {
  const late = isOverdue(lead.next_follow_up) && !["won", "lost"].includes(lead.status);
  return (
    <button type="button" onClick={onOpen}
      className="w-full text-left rounded-lg border border-border bg-card p-3 hover:border-primary/50 hover:shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <p className="text-sm font-semibold text-foreground truncate">{lead.name || lead.email}</p>
      <p className="text-xs text-muted-foreground truncate">{lead.company || lead.brand_name || lead.email}</p>
      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        {lead.deal_value ? <Pill tone="green">{fmtMoney(lead.deal_value)}</Pill> : null}
        {lead.next_follow_up && <Pill tone={late ? "red" : "gray"}><CalendarClock className="h-3 w-3" />{fmtDate(lead.next_follow_up)}</Pill>}
        {lead.open_tasks > 0 && <Pill tone="indigo">{lead.open_tasks} task{lead.open_tasks > 1 ? "s" : ""}</Pill>}
        {lead.client_id && <Pill tone="green"><BadgeCheck className="h-3 w-3" />Client</Pill>}
      </div>
      <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
        <UserRound className="h-3 w-3" />{lead.owner_id ? userLabel({ full_name: lead.owner_name, email: lead.owner_email }) : "No owner"} · {fmtDate(lead.created_at)}
      </p>
    </button>
  );
}

function ConvertDialog({ lead, plans, open, onOpenChange, onDone }: {
  lead: CrmLead; plans: Plan[]; open: boolean; onOpenChange: (o: boolean) => void; onDone: () => void;
}) {
  const [planId, setPlanId] = useState("");
  const [value, setValue] = useState<string>(lead.deal_value ? String(lead.deal_value) : "");
  const [renewal, setRenewal] = useState("");
  const [saving, setSaving] = useState(false);
  const plan = plans.find((p) => p.id === planId);
  const submit = async () => {
    setSaving(true);
    try {
      await crm.leads.convert(lead.id, { plan_id: planId || null, monthly_value: value ? Number(value) : null, renewal_date: renewal || null });
      toast.success(`${lead.name || "Lead"} is now a client`);
      onOpenChange(false);
      onDone();
    } catch (e) { toast.error(errMsg(e)); } finally { setSaving(false); }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Convert to client</DialogTitle>
          <DialogDescription>Creates a client record for {lead.name || lead.email} and moves the lead to Won.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="Plan" htmlFor="cv-plan" hint={plans.length ? undefined : "Create plans in Subscription Plans to assign one."}>
            <NativeSelect id="cv-plan" value={planId} onChange={(e) => {
              setPlanId(e.target.value);
              const p = plans.find((x) => x.id === e.target.value);
              if (p?.price && !value) setValue(String(p.billing_period === "annual" ? Math.round(p.price / 12) : p.billing_period === "quarterly" ? Math.round(p.price / 3) : p.price));
            }}>
              <option value="">No plan yet</option>
              {plans.filter((p) => p.is_active).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </NativeSelect>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Monthly value (USD)" htmlFor="cv-val" hint={plan ? `Plan price: ${fmtMoney(plan.price, plan.currency)}` : undefined}>
              <Input id="cv-val" type="number" min="0" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
            </Field>
            <Field label="Renewal date" htmlFor="cv-ren">
              <Input id="cv-ren" type="date" value={renewal} onChange={(e) => setRenewal(e.target.value)} />
            </Field>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>{saving ? "Converting…" : "Convert to client"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LeadSheet({ lead, users, plans, tasks, onClose, onChanged, onTasksChanged }: {
  lead: CrmLead; users: TeamUser[]; plans: Plan[]; tasks: Task[];
  onClose: () => void; onChanged: (patch: Partial<CrmLead>) => void; onTasksChanged: () => void;
}) {
  const [notes, setNotes] = useState(lead.notes || "");
  const [taskOpen, setTaskOpen] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const leadTasks = tasks.filter((t) => t.lead_id === lead.id);

  const patch = async (p: Partial<CrmLead>, msg = "Saved") => {
    onChanged(p);
    try { await crm.leads.update(lead.id, p); toast.success(msg); } catch (e) { toast.error(errMsg(e)); }
  };

  const facts: [string, string | null | undefined][] = [
    ["Lead #", lead.lead_number], ["Company", lead.company || lead.brand_name], ["Interested in", lead.audit_type],
    ["Monthly ad spend", lead.current_spend], ["Website", lead.website_url || lead.amazon_store_url], ["Source", lead.source],
  ];

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl">{lead.name || lead.email}</SheetTitle>
          <SheetDescription>Received {fmtDate(lead.created_at)}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-wrap gap-2 mt-4">
          {lead.email && <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-accent"><Mail className="h-3.5 w-3.5" />{lead.email}</a>}
          {lead.phone && <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-accent"><Phone className="h-3.5 w-3.5" />{lead.phone}</a>}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <Field label="Stage" htmlFor="l-stage">
            <NativeSelect id="l-stage" value={lead.status} onChange={(e) => patch({ status: e.target.value as LeadStage }, "Stage updated")}>
              {LEAD_STAGES.map((s) => <option key={s} value={s}>{STAGE_LABEL[s]}</option>)}
            </NativeSelect>
          </Field>
          <Field label="Owner" htmlFor="l-owner">
            <NativeSelect id="l-owner" value={lead.owner_id || ""} onChange={(e) => {
              const u = users.find((x) => x.id === e.target.value);
              patch({ owner_id: e.target.value || null, owner_name: u?.full_name, owner_email: u?.email } as Partial<CrmLead>, "Owner updated");
            }}>
              <option value="">No owner</option>
              {users.map((u) => <option key={u.id} value={u.id}>{userLabel(u)}</option>)}
            </NativeSelect>
          </Field>
          <Field label="Next follow-up" htmlFor="l-follow">
            <Input id="l-follow" type="date" value={lead.next_follow_up?.slice(0, 10) || ""} onChange={(e) => patch({ next_follow_up: e.target.value || null }, "Follow-up date saved")} />
          </Field>
          <Field label="Deal value (monthly, USD)" htmlFor="l-value">
            <Input id="l-value" type="number" min="0" inputMode="decimal" defaultValue={lead.deal_value ?? ""}
              onBlur={(e) => { const v = e.target.value ? Number(e.target.value) : null; if (v !== (lead.deal_value ?? null)) patch({ deal_value: v }, "Deal value saved"); }} />
          </Field>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 mt-6 rounded-lg bg-muted/50 p-4 text-sm">
          {facts.filter(([, v]) => v).map(([k, v]) => (
            <div key={k} className="min-w-0"><dt className="text-[11px] text-muted-foreground">{k}</dt><dd className="font-medium break-words">{v}</dd></div>
          ))}
          {lead.goals && <div className="col-span-2"><dt className="text-[11px] text-muted-foreground">Goals</dt><dd className="font-medium whitespace-pre-wrap">{lead.goals}</dd></div>}
        </dl>

        <div className="mt-6">
          <Field label="Notes" htmlFor="l-notes">
            <Textarea id="l-notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Call notes, objections, next steps…" />
          </Field>
          <Button size="sm" variant="outline" className="mt-2" disabled={notes === (lead.notes || "")} onClick={() => patch({ notes }, "Notes saved")}>Save notes</Button>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold">Tasks</p>
            <Button size="sm" variant="outline" onClick={() => setTaskOpen(true)}><Plus className="h-3.5 w-3.5 mr-1" />Add task</Button>
          </div>
          <div className="grid gap-2">
            {leadTasks.length ? leadTasks.map((t) => (
              <TaskRow key={t.id} task={t} onEdit={() => setTaskOpen(true)}
                onToggle={async () => { try { await crm.tasks.update(t.id, { status: t.status === "done" ? "todo" : "done" }); onTasksChanged(); } catch (e) { toast.error(errMsg(e)); } }} />
            )) : <p className="text-xs text-muted-foreground">No tasks for this lead yet.</p>}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-5">
          {lead.client_id ? (
            <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"><BadgeCheck className="h-4 w-4" />Converted to a client. Manage them in Clients.</p>
          ) : (
            <Button className="w-full" onClick={() => setConvertOpen(true)}><ArrowRightLeft className="h-4 w-4 mr-1.5" />Convert to client</Button>
          )}
        </div>

        {taskOpen && (
          <TaskDialog open={taskOpen} onOpenChange={setTaskOpen} users={users}
            initial={{ lead_id: lead.id, assignee_id: lead.owner_id || null, title: `Follow up with ${lead.name || lead.email}`, due_date: lead.next_follow_up?.slice(0, 10) || null }}
            context={`Linked to ${lead.name || lead.email}`} onSaved={onTasksChanged} />
        )}
        {convertOpen && (
          <ConvertDialog lead={lead} plans={plans} open={convertOpen} onOpenChange={setConvertOpen}
            onDone={() => { onChanged({ status: "won", client_id: "pending" }); }} />
        )}
      </SheetContent>
    </Sheet>
  );
}

export function PipelineSection() {
  const leads = useLoader(() => crm.leads.list(), [] as CrmLead[]);
  const users = useLoader(() => crm.users.list(), [] as TeamUser[]);
  const plans = useLoader(() => crm.plans.list(), [] as Plan[]);
  const tasks = useLoader(() => crm.tasks.list(), [] as Task[]);
  const [q, setQ] = useState("");
  const [owner, setOwner] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [showLost, setShowLost] = useState(false);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return leads.data.filter((l) =>
      (!owner || (owner === "none" ? !l.owner_id : l.owner_id === owner)) &&
      (!s || [l.name, l.email, l.company, l.brand_name, l.lead_number].some((v) => v?.toLowerCase().includes(s))));
  }, [leads.data, q, owner]);

  const stages = LEAD_STAGES.filter((s) => showLost || s !== "lost");
  const openLeads = leads.data.filter((l) => !["won", "lost"].includes(l.status));
  const pipelineValue = openLeads.reduce((a, l) => a + (Number(l.deal_value) || 0), 0);
  const followDue = openLeads.filter((l) => l.next_follow_up && l.next_follow_up.slice(0, 10) <= new Date().toISOString().slice(0, 10)).length;
  const decided = leads.data.filter((l) => l.status === "won" || l.status === "lost").length;
  const winRate = decided ? Math.round((leads.data.filter((l) => l.status === "won").length / decided) * 100) : null;
  const current = leads.data.find((l) => l.id === openId) || null;

  const patchLead = (id: string, p: Partial<CrmLead>) => leads.setData((prev) => prev.map((l) => (l.id === id ? { ...l, ...p } : l)));
  const moveStage = async (l: CrmLead, status: LeadStage) => {
    patchLead(l.id, { status });
    try { await crm.leads.update(l.id, { status }); } catch (e) { patchLead(l.id, { status: l.status }); toast.error(errMsg(e)); }
  };

  return (
    <div>
      <SectionHeader title="Lead pipeline" description="Every website lead, from first enquiry to signed client. Drag a card to another stage, or open it to assign an owner, set a follow-up and add tasks." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Stat label="Open leads" value={openLeads.length} />
        <Stat label="Pipeline value" value={fmtMoney(pipelineValue)} hint="Sum of monthly deal values" />
        <Stat label="Follow-ups due" value={followDue} tone={followDue ? "warn" : undefined} />
        <Stat label="Win rate" value={winRate == null ? "—" : `${winRate}%`} hint="Won ÷ (won + lost)" />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input aria-label="Search leads" placeholder="Search name, email, company…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <NativeSelect aria-label="Filter by owner" className="w-auto" value={owner} onChange={(e) => setOwner(e.target.value)}>
          <option value="">All owners</option>
          <option value="none">No owner</option>
          {users.data.map((u) => <option key={u.id} value={u.id}>{userLabel(u)}</option>)}
        </NativeSelect>
        <Button variant="outline" size="sm" onClick={() => setShowLost((v) => !v)} aria-pressed={showLost}>{showLost ? "Hide lost" : "Show lost"}</Button>
      </div>

      {leads.loading && !leads.data.length ? <LoadingState label="Loading leads…" /> : leads.error ? <ErrorState message={leads.error} onRetry={leads.reload} /> :
        !leads.data.length ? <EmptyState title="No leads yet" body="Leads from the website contact form appear here automatically." /> : (
          <div className="overflow-x-auto pb-3 -mx-1 px-1">
            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(240px, 1fr))` }}>
              {stages.map((s) => {
                const col = filtered.filter((l) => l.status === s);
                const val = col.reduce((a, l) => a + (Number(l.deal_value) || 0), 0);
                return (
                  <div key={s} className="rounded-xl bg-muted/40 p-2.5 min-h-[200px]"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { const id = e.dataTransfer.getData("text/lead"); const l = leads.data.find((x) => x.id === id); if (l && l.status !== s) moveStage(l, s); }}>
                    <div className="flex items-center justify-between px-1.5 pb-2.5">
                      <div className="flex items-center gap-2"><Pill tone={STAGE_TONE[s]}>{STAGE_LABEL[s]}</Pill><span className="text-xs text-muted-foreground tabular-nums">{col.length}</span></div>
                      {val > 0 && <span className="text-[11px] text-muted-foreground tabular-nums">{fmtMoney(val)}</span>}
                    </div>
                    <div className="grid gap-2">
                      {col.map((l) => (
                        <div key={l.id} draggable onDragStart={(e) => e.dataTransfer.setData("text/lead", l.id)}>
                          <LeadCard lead={l} onOpen={() => setOpenId(l.id)} />
                        </div>
                      ))}
                      {!col.length && <p className="text-xs text-muted-foreground text-center py-6">No leads</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      {current && (
        <LeadSheet lead={current} users={users.data} plans={plans.data} tasks={tasks.data}
          onClose={() => setOpenId(null)}
          onChanged={(p) => { patchLead(current.id, p); if (p.client_id === "pending") leads.reload(); }}
          onTasksChanged={() => { tasks.reload(); leads.reload(); }} />
      )}
    </div>
  );
}
