import { useState } from "react";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { crm, fmtMoney, PERIOD_LABEL, PLAN_PERIODS, type Plan, type Service } from "@/services/crmService";
import { EmptyState, ErrorState, Field, LoadingState, NativeSelect, Pill, SectionHeader, Stat, errMsg, useLoader } from "./shared";

const PERIOD_NAME: Record<string, string> = { monthly: "Monthly", quarterly: "Quarterly", annual: "Annual", one_time: "One-time" };

function PlanDialog({ initial, services, onClose, onSaved }: { initial: Partial<Plan> | null; services: Service[]; onClose: () => void; onSaved: () => void }) {
  const [d, setD] = useState<Partial<Plan>>({ currency: "USD", billing_period: "monthly", is_active: true, features: [], service_ids: [], ...initial });
  const [features, setFeatures] = useState((initial?.features || []).join("\n"));
  const [saving, setSaving] = useState(false);
  const editing = !!initial?.id;
  const set = (k: keyof Plan, v: unknown) => setD((p) => ({ ...p, [k]: v }));
  const toggleSvc = (id: string) => set("service_ids", (d.service_ids || []).includes(id) ? (d.service_ids || []).filter((x) => x !== id) : [...(d.service_ids || []), id]);
  const save = async () => {
    if (!d.name?.trim()) { toast.error("Give the plan a name."); return; }
    setSaving(true);
    const payload = {
      name: d.name, description: d.description || null, price: d.price === undefined || d.price === null || (d.price as unknown) === "" ? null : Number(d.price),
      currency: d.currency, billing_period: d.billing_period, features: features.split("\n").map((f) => f.trim()).filter(Boolean),
      service_ids: d.service_ids, is_active: d.is_active, sort_order: Number(d.sort_order) || 0,
    };
    try {
      if (editing) await crm.plans.update(initial!.id!, payload); else await crm.plans.create(payload);
      toast.success(editing ? "Plan updated" : "Plan created");
      onSaved(); onClose();
    } catch (e) { toast.error(errMsg(e)); } finally { setSaving(false); }
  };
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit plan" : "New plan"}</DialogTitle>
          <DialogDescription>Plans are internal. They're used to track what each client is on and aren't shown on the website.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Plan name" htmlFor="p-name"><Input id="p-name" value={d.name || ""} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Growth" autoFocus /></Field>
            <Field label="Billing" htmlFor="p-period">
              <NativeSelect id="p-period" value={d.billing_period} onChange={(e) => set("billing_period", e.target.value)}>
                {PLAN_PERIODS.map((p) => <option key={p} value={p}>{PERIOD_NAME[p]}</option>)}
              </NativeSelect>
            </Field>
            <Field label="Price" htmlFor="p-price"><Input id="p-price" type="number" min="0" inputMode="decimal" value={d.price ?? ""} onChange={(e) => set("price", e.target.value)} /></Field>
            <Field label="Currency" htmlFor="p-cur">
              <NativeSelect id="p-cur" value={d.currency} onChange={(e) => set("currency", e.target.value)}>
                {["USD", "GBP", "EUR", "INR", "AED", "CAD", "AUD"].map((c) => <option key={c}>{c}</option>)}
              </NativeSelect>
            </Field>
          </div>
          <Field label="Short description" htmlFor="p-desc"><Input id="p-desc" value={d.description || ""} onChange={(e) => set("description", e.target.value)} placeholder="Who this plan is for" /></Field>
          <Field label="What's included" htmlFor="p-feat" hint="One item per line.">
            <Textarea id="p-feat" rows={5} value={features} onChange={(e) => setFeatures(e.target.value)} placeholder={"Weekly bid optimization\nMonthly strategy call\nSKU-level profit report"} />
          </Field>
          {services.length > 0 && (
            <fieldset>
              <legend className="text-sm font-medium mb-2">Services in this plan</legend>
              <div className="grid sm:grid-cols-2 gap-2">
                {services.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 text-sm rounded-md border border-border px-3 py-2 cursor-pointer hover:bg-accent">
                    <Checkbox checked={(d.service_ids || []).includes(s.id)} onCheckedChange={() => toggleSvc(s.id)} />{s.name}
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <label className="flex items-center justify-between rounded-md border border-border px-3 py-2.5 text-sm">
            <span><span className="font-medium">Active</span><span className="block text-xs text-muted-foreground">Inactive plans can't be assigned to new clients.</span></span>
            <Switch checked={!!d.is_active} onCheckedChange={(v) => set("is_active", v)} />
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Saving…" : editing ? "Save changes" : "Create plan"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PlansSection() {
  const plans = useLoader(() => crm.plans.list(), [] as Plan[]);
  const services = useLoader(() => crm.services.list(), [] as Service[]);
  const [edit, setEdit] = useState<Partial<Plan> | null | undefined>(undefined);
  const svcName = (id: string) => services.data.find((s) => s.id === id)?.name;
  const totalMrr = plans.data.reduce((a, p) => a + (Number(p.mrr) || 0), 0);

  const remove = async (p: Plan) => {
    const warn = p.active_clients ? ` ${p.active_clients} client(s) on it will be left without a plan.` : "";
    if (!window.confirm(`Delete the ${p.name} plan?${warn}`)) return;
    try { await crm.plans.remove(p.id); plans.setData((x) => x.filter((y) => y.id !== p.id)); toast.success("Plan deleted"); }
    catch (e) { toast.error(errMsg(e)); }
  };

  return (
    <div>
      <SectionHeader title="Subscription plans" description="The retainers and packages you sell. Assign them to clients to track revenue by plan."
        actions={<Button onClick={() => setEdit(null)}><Plus className="h-4 w-4 mr-1.5" />New plan</Button>} />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <Stat label="Active plans" value={plans.data.filter((p) => p.is_active).length} />
        <Stat label="Clients on a plan" value={plans.data.reduce((a, p) => a + p.active_clients, 0)} />
        <Stat label="MRR from plans" value={fmtMoney(totalMrr)} tone="good" />
      </div>
      {plans.loading && !plans.data.length ? <LoadingState /> : plans.error ? <ErrorState message={plans.error} onRetry={plans.reload} /> :
        !plans.data.length ? (
          <EmptyState title="No plans yet" body="Create your first plan, for example a monthly PPC management retainer, then assign it to clients."
            action={<Button onClick={() => setEdit(null)}><Plus className="h-4 w-4 mr-1.5" />New plan</Button>} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {plans.data.map((p) => (
              <div key={p.id} className={`rounded-xl border bg-card p-5 flex flex-col gap-4 ${p.is_active ? "border-border" : "border-dashed border-border opacity-70"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2"><h3 className="text-lg font-bold">{p.name}</h3>{!p.is_active && <Pill>Inactive</Pill>}</div>
                    {p.description && <p className="text-sm text-muted-foreground mt-0.5">{p.description}</p>}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEdit(p)} aria-label={`Edit ${p.name}`}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => remove(p)} aria-label={`Delete ${p.name}`}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <p><span className="text-3xl font-bold tracking-tight tabular-nums">{p.price == null ? "Custom" : fmtMoney(p.price, p.currency)}</span>{p.price != null && <span className="text-sm text-muted-foreground ml-1">{PERIOD_LABEL[p.billing_period]}</span>}</p>
                {p.features?.length > 0 && (
                  <ul className="grid gap-1.5 text-sm">
                    {p.features.map((f, i) => <li key={i} className="flex gap-2"><Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />{f}</li>)}
                  </ul>
                )}
                {p.service_ids?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">{p.service_ids.map((id) => svcName(id) && <Pill key={id} tone="blue">{svcName(id)}</Pill>)}</div>
                )}
                <div className="mt-auto pt-3 border-t border-border grid grid-cols-2 text-sm">
                  <div><p className="text-xs text-muted-foreground">Active clients</p><p className="font-semibold tabular-nums">{p.active_clients}</p></div>
                  <div><p className="text-xs text-muted-foreground">MRR</p><p className="font-semibold tabular-nums">{fmtMoney(p.mrr)}</p></div>
                </div>
              </div>
            ))}
          </div>
        )}
      {edit !== undefined && <PlanDialog initial={edit} services={services.data} onClose={() => setEdit(undefined)} onSaved={plans.reload} />}
    </div>
  );
}
