import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { crm, type Service } from "@/services/crmService";
import { EmptyState, ErrorState, Field, LoadingState, Pill, SectionHeader, errMsg, useLoader } from "./shared";

/** The services currently offered on the website, used to seed an empty catalog. */
const STARTER: Partial<Service>[] = [
  { name: "Amazon Advertising", slug: "amazon-advertising", category: "Marketplace", short_description: "Sponsored Products, Brands, Display and DSP management." },
  { name: "Walmart Advertising", slug: "walmart-advertising", category: "Marketplace", short_description: "Walmart Connect campaign management." },
  { name: "Meta & Google Ads", slug: "meta-advertising", category: "Paid acquisition", short_description: "Search, Shopping, Performance Max and Meta funnels." },
  { name: "Listing Optimization", slug: "listing-optimization", category: "Marketplace", short_description: "Keyword-rich listings and A+ Content." },
  { name: "Catalog Management", slug: "product-cataloging", category: "Marketplace", short_description: "Bulk uploads, variations and error fixing." },
  { name: "Account Support", slug: "account-management", category: "Marketplace", short_description: "Account health, appeals and reinstatement." },
  { name: "Marketplace Integration", slug: "shopify-integration", category: "Ecommerce", short_description: "Inventory, pricing and order sync across channels." },
  { name: "Shopify & Web Development", slug: "website-development", category: "Ecommerce", short_description: "Shopify and WooCommerce stores built to convert." },
];

function ServiceDialog({ initial, onClose, onSaved }: { initial: Partial<Service> | null; onClose: () => void; onSaved: () => void }) {
  const [d, setD] = useState<Partial<Service>>({ is_active: true, ...initial });
  const [saving, setSaving] = useState(false);
  const editing = !!initial?.id;
  const set = (k: keyof Service, v: unknown) => setD((p) => ({ ...p, [k]: v }));
  const save = async () => {
    if (!d.name?.trim()) { toast.error("Give the service a name."); return; }
    setSaving(true);
    const payload = { name: d.name, slug: d.slug || d.name, category: d.category || null, short_description: d.short_description || null, description: d.description || null, is_active: d.is_active, sort_order: Number(d.sort_order) || 0 };
    try {
      if (editing) await crm.services.update(initial!.id!, payload); else await crm.services.create(payload);
      toast.success(editing ? "Service updated" : "Service added");
      onSaved(); onClose();
    } catch (e) { toast.error(errMsg(e)); } finally { setSaving(false); }
  };
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader><DialogTitle>{editing ? "Edit service" : "Add service"}</DialogTitle></DialogHeader>
        <div className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" htmlFor="s-name"><Input id="s-name" value={d.name || ""} onChange={(e) => set("name", e.target.value)} autoFocus /></Field>
            <Field label="Category" htmlFor="s-cat"><Input id="s-cat" value={d.category || ""} onChange={(e) => set("category", e.target.value)} placeholder="Marketplace" /></Field>
          </div>
          <Field label="URL slug" htmlFor="s-slug" hint="Matches the page at /services/<slug>. Leave blank to generate from the name.">
            <Input id="s-slug" value={d.slug || ""} onChange={(e) => set("slug", e.target.value)} placeholder="amazon-advertising" />
          </Field>
          <Field label="Short description" htmlFor="s-short"><Input id="s-short" value={d.short_description || ""} onChange={(e) => set("short_description", e.target.value)} /></Field>
          <Field label="Full description" htmlFor="s-desc"><Textarea id="s-desc" rows={4} value={d.description || ""} onChange={(e) => set("description", e.target.value)} /></Field>
          <label className="flex items-center justify-between rounded-md border border-border px-3 py-2.5 text-sm">
            <span className="font-medium">Offered</span><Switch checked={!!d.is_active} onCheckedChange={(v) => set("is_active", v)} />
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Saving…" : editing ? "Save changes" : "Add service"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ServicesSection() {
  const services = useLoader(() => crm.services.list(), [] as Service[]);
  const [edit, setEdit] = useState<Partial<Service> | null | undefined>(undefined);
  const [seeding, setSeeding] = useState(false);

  const seed = async () => {
    setSeeding(true);
    try {
      for (const [i, s] of STARTER.entries()) await crm.services.create({ ...s, sort_order: i, is_active: true });
      toast.success("Added your 8 website services");
      services.reload();
    } catch (e) { toast.error(errMsg(e)); services.reload(); } finally { setSeeding(false); }
  };
  const toggle = async (s: Service, is_active: boolean) => {
    services.setData((p) => p.map((x) => (x.id === s.id ? { ...x, is_active } : x)));
    try { await crm.services.update(s.id, { is_active }); } catch (e) { services.reload(); toast.error(errMsg(e)); }
  };
  const move = async (i: number, dir: -1 | 1) => {
    const list = [...services.data];
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    services.setData(list.map((s, k) => ({ ...s, sort_order: k })));
    try { await Promise.all([crm.services.update(list[i].id, { sort_order: i }), crm.services.update(list[j].id, { sort_order: j })]); }
    catch (e) { services.reload(); toast.error(errMsg(e)); }
  };
  const remove = async (s: Service) => {
    if (!window.confirm(`Delete ${s.name}? It will be removed from any plans that include it.`)) return;
    try { await crm.services.remove(s.id); services.setData((p) => p.filter((x) => x.id !== s.id)); toast.success("Service deleted"); }
    catch (e) { toast.error(errMsg(e)); }
  };

  return (
    <div>
      <SectionHeader title="Services" description="The services you offer. Use them to build plans and keep your catalog in one place."
        actions={<Button onClick={() => setEdit(null)}><Plus className="h-4 w-4 mr-1.5" />Add service</Button>} />
      {services.loading && !services.data.length ? <LoadingState /> : services.error ? <ErrorState message={services.error} onRetry={services.reload} /> :
        !services.data.length ? (
          <EmptyState title="Your service catalog is empty" body="Start with the 8 services on your website, or add your own."
            action={<div className="flex flex-wrap justify-center gap-2">
              <Button onClick={seed} disabled={seeding}><Wand2 className="h-4 w-4 mr-1.5" />{seeding ? "Adding…" : "Add website services"}</Button>
              <Button variant="outline" onClick={() => setEdit(null)}>Add one manually</Button>
            </div>} />
        ) : (
          <div className="rounded-xl border border-border overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead className="w-[80px]">Order</TableHead><TableHead>Service</TableHead><TableHead>Category</TableHead><TableHead>Page</TableHead><TableHead>Offered</TableHead><TableHead className="w-[90px]"><span className="sr-only">Actions</span></TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {services.data.map((s, i) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="flex gap-0.5">
                        <Button size="icon" variant="ghost" className="h-7 w-7" disabled={i === 0} onClick={() => move(i, -1)} aria-label={`Move ${s.name} up`}><ArrowUp className="h-3.5 w-3.5" /></Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7" disabled={i === services.data.length - 1} onClick={() => move(i, 1)} aria-label={`Move ${s.name} down`}><ArrowDown className="h-3.5 w-3.5" /></Button>
                      </div>
                    </TableCell>
                    <TableCell><p className="font-medium">{s.name}</p>{s.short_description && <p className="text-xs text-muted-foreground max-w-md">{s.short_description}</p>}</TableCell>
                    <TableCell>{s.category ? <Pill tone="blue">{s.category}</Pill> : "—"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground font-mono">/services/{s.slug}</TableCell>
                    <TableCell><Switch checked={s.is_active} onCheckedChange={(v) => toggle(s, v)} aria-label={`${s.name} offered`} /></TableCell>
                    <TableCell>
                      <div className="flex gap-1 justify-end">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEdit(s)} aria-label={`Edit ${s.name}`}><Pencil className="h-3.5 w-3.5" /></Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => remove(s)} aria-label={`Delete ${s.name}`}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      {edit !== undefined && <ServiceDialog initial={edit} onClose={() => setEdit(undefined)} onSaved={services.reload} />}
    </div>
  );
}
