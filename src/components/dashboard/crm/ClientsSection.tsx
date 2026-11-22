import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  crm, CLIENT_STATUSES, fmtDate, fmtMoney, userLabel, type CrmClient, type Plan, type TeamUser,
} from "@/services/crmService";
import {
  CLIENT_TONE, EmptyState, ErrorState, Field, LoadingState, NativeSelect, Pill, SectionHeader, Stat, errMsg, useLoader,
} from "./shared";

function ClientDialog({ initial, plans, users, onClose, onSaved }: {
  initial: Partial<CrmClient> | null; plans: Plan[]; users: TeamUser[]; onClose: () => void; onSaved: () => void;
}) {
  const [d, setD] = useState<Partial<CrmClient>>({ plan_status: "active", ...initial });
  const [saving, setSaving] = useState(false);
  const editing = !!initial?.id;
  const set = (k: keyof CrmClient, v: unknown) => setD((p) => ({ ...p, [k]: v }));
  const save = async () => {
    if (!d.name?.trim()) { toast.error("Enter the client's name."); return; }
    setSaving(true);
    const payload = {
      name: d.name, company: d.company || null, email: d.email || null, phone: d.phone || null, website: d.website || null,
      plan_id: d.plan_id || null, plan_status: d.plan_status, start_date: d.start_date || null, renewal_date: d.renewal_date || null,
      monthly_value: d.monthly_value === undefined || d.monthly_value === null || (d.monthly_value as unknown) === "" ? null : Number(d.monthly_value),
      owner_id: d.owner_id || null, notes: d.notes || null,
    };
    try {
      if (editing) await crm.clients.update(initial!.id!, payload); else await crm.clients.create(payload);
      toast.success(editing ? "Client updated" : "Client added");
      onSaved(); onClose();
    } catch (e) { toast.error(errMsg(e)); } finally { setSaving(false); }
  };
  const v = (k: keyof CrmClient) => (d[k] as string | number | null | undefined) ?? "";
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{editing ? "Edit client" : "Add client"}</DialogTitle></DialogHeader>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Contact name" htmlFor="c-name"><Input id="c-name" value={v("name")} onChange={(e) => set("name", e.target.value)} autoFocus /></Field>
          <Field label="Company / brand" htmlFor="c-co"><Input id="c-co" value={v("company")} onChange={(e) => set("company", e.target.value)} /></Field>
          <Field label="Email" htmlFor="c-email"><Input id="c-email" type="email" value={v("email")} onChange={(e) => set("email", e.target.value)} /></Field>
          <Field label="Phone" htmlFor="c-phone"><Input id="c-phone" value={v("phone")} onChange={(e) => set("phone", e.target.value)} /></Field>
          <Field label="Plan" htmlFor="c-plan">
            <NativeSelect id="c-plan" value={v("plan_id")} onChange={(e) => set("plan_id", e.target.value || null)}>
              <option value="">No plan</option>
              {plans.map((p) => <option key={p.id} value={p.id}>{p.name}{p.is_active ? "" : " (inactive)"}</option>)}
            </NativeSelect>
          </Field>
          <Field label="Plan status" htmlFor="c-status">
            <NativeSelect id="c-status" value={v("plan_status")} onChange={(e) => set("plan_status", e.target.value)}>
              {CLIENT_STATUSES.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
            </NativeSelect>
          </Field>
          <Field label="Monthly value (USD)" htmlFor="c-val" hint="Used for MRR. Only active clients count."><Input id="c-val" type="number" min="0" inputMode="decimal" value={v("monthly_value")} onChange={(e) => set("monthly_value", e.target.value)} /></Field>
          <Field label="Account owner" htmlFor="c-owner">
            <NativeSelect id="c-owner" value={v("owner_id")} onChange={(e) => set("owner_id", e.target.value || null)}>
              <option value="">Unassigned</option>
              {users.map((u) => <option key={u.id} value={u.id}>{userLabel(u)}</option>)}
            </NativeSelect>
          </Field>
          <Field label="Start date" htmlFor="c-start"><Input id="c-start" type="date" value={String(v("start_date")).slice(0, 10)} onChange={(e) => set("start_date", e.target.value)} /></Field>
          <Field label="Renewal date" htmlFor="c-ren"><Input id="c-ren" type="date" value={String(v("renewal_date")).slice(0, 10)} onChange={(e) => set("renewal_date", e.target.value)} /></Field>
          <div className="sm:col-span-2"><Field label="Website or store URL" htmlFor="c-web"><Input id="c-web" value={v("website")} onChange={(e) => set("website", e.target.value)} /></Field></div>
          <div className="sm:col-span-2"><Field label="Notes" htmlFor="c-notes"><Textarea id="c-notes" rows={3} value={v("notes")} onChange={(e) => set("notes", e.target.value)} /></Field></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Saving…" : editing ? "Save changes" : "Add client"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ClientsSection() {
  const clients = useLoader(() => crm.clients.list(), [] as CrmClient[]);
  const plans = useLoader(() => crm.plans.list(), [] as Plan[]);
  const users = useLoader(() => crm.users.list(), [] as TeamUser[]);
  const [edit, setEdit] = useState<Partial<CrmClient> | null | undefined>(undefined);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [planF, setPlanF] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return clients.data.filter((c) => (!status || c.plan_status === status) && (!planF || c.plan_id === planF) &&
      (!s || [c.name, c.company, c.email].some((x) => x?.toLowerCase().includes(s))));
  }, [clients.data, q, status, planF]);

  const active = clients.data.filter((c) => c.plan_status === "active");
  const mrr = active.reduce((a, c) => a + (Number(c.monthly_value) || 0), 0);
  const today = new Date(); const in30 = new Date(Date.now() + 30 * 864e5);
  const renewals = active.filter((c) => c.renewal_date && new Date(c.renewal_date) >= new Date(today.toDateString()) && new Date(c.renewal_date) <= in30).length;

  const remove = async (c: CrmClient) => {
    if (!window.confirm(`Delete ${c.name}? Their tasks will be deleted too.`)) return;
    try { await crm.clients.remove(c.id); clients.setData((p) => p.filter((x) => x.id !== c.id)); toast.success("Client deleted"); }
    catch (e) { toast.error(errMsg(e)); }
  };

  return (
    <div>
      <SectionHeader title="Clients" description="Brands you work with, the plan each one is on, and what they're worth each month."
        actions={<Button onClick={() => setEdit(null)}><Plus className="h-4 w-4 mr-1.5" />Add client</Button>} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Stat label="Active clients" value={active.length} />
        <Stat label="Monthly recurring revenue" value={fmtMoney(mrr)} tone="good" />
        <Stat label="Average per client" value={active.length ? fmtMoney(mrr / active.length) : "—"} />
        <Stat label="Renewals in 30 days" value={renewals} />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input aria-label="Search clients" placeholder="Search clients…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <NativeSelect aria-label="Filter by status" className="w-auto" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>{CLIENT_STATUSES.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
        </NativeSelect>
        <NativeSelect aria-label="Filter by plan" className="w-auto" value={planF} onChange={(e) => setPlanF(e.target.value)}>
          <option value="">All plans</option>{plans.data.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </NativeSelect>
      </div>

      {clients.loading && !clients.data.length ? <LoadingState /> : clients.error ? <ErrorState message={clients.error} onRetry={clients.reload} /> :
        !clients.data.length ? (
          <EmptyState title="No clients yet" body="Add a client here, or open a lead in the Pipeline and choose Convert to client."
            action={<Button onClick={() => setEdit(null)}><Plus className="h-4 w-4 mr-1.5" />Add client</Button>} />
        ) : (
          <div className="rounded-xl border border-border overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead>Client</TableHead><TableHead>Plan</TableHead><TableHead>Status</TableHead>
                <TableHead className="text-right">Monthly</TableHead><TableHead>Renewal</TableHead><TableHead>Owner</TableHead><TableHead className="w-[90px]"><span className="sr-only">Actions</span></TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {list.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell><p className="font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{c.company || c.email}</p></TableCell>
                    <TableCell>{c.plan_name || <span className="text-muted-foreground">—</span>}</TableCell>
                    <TableCell><Pill tone={CLIENT_TONE[c.plan_status]}>{c.plan_status}</Pill></TableCell>
                    <TableCell className="text-right tabular-nums">{fmtMoney(c.monthly_value)}</TableCell>
                    <TableCell className="whitespace-nowrap">{fmtDate(c.renewal_date)}</TableCell>
                    <TableCell className="text-sm">{c.owner_id ? userLabel({ full_name: c.owner_name, email: c.owner_email }) : <span className="text-muted-foreground">—</span>}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 justify-end">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEdit(c)} aria-label={`Edit ${c.name}`}><Pencil className="h-3.5 w-3.5" /></Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => remove(c)} aria-label={`Delete ${c.name}`}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!list.length && <TableRow><TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-8">No clients match these filters.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </div>
        )}
      {edit !== undefined && <ClientDialog initial={edit} plans={plans.data} users={users.data} onClose={() => setEdit(undefined)} onSaved={clients.reload} />}
    </div>
  );
}
