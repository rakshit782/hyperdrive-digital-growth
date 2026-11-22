import { useState } from "react";
import { Plus, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { crm, fmtDate, ROLES, type TeamUser } from "@/services/crmService";
import { EmptyState, ErrorState, Field, LoadingState, NativeSelect, Pill, SectionHeader, Stat, errMsg, useLoader } from "./shared";

const ROLE_HELP: Record<string, string> = {
  admin: "Full dashboard access, including users and settings.",
  user: "Can be assigned leads, clients and tasks. Can't open the dashboard.",
};

function AddUserDialog({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [d, setD] = useState({ full_name: "", email: "", password: "", role: "user" });
  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (!d.email.trim() || d.password.length < 8) { toast.error("Enter an email and a password of at least 8 characters."); return; }
    setSaving(true);
    try { await crm.users.create(d); toast.success(`${d.full_name || d.email} added`); onSaved(); onClose(); }
    catch (e) { toast.error(errMsg(e)); } finally { setSaving(false); }
  };
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add team member</DialogTitle>
          <DialogDescription>Share the password with them privately. They can sign in at /dashboard/login.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="Full name" htmlFor="u-name"><Input id="u-name" value={d.full_name} onChange={(e) => setD({ ...d, full_name: e.target.value })} autoFocus /></Field>
          <Field label="Email" htmlFor="u-email"><Input id="u-email" type="email" autoComplete="off" value={d.email} onChange={(e) => setD({ ...d, email: e.target.value })} /></Field>
          <Field label="Temporary password" htmlFor="u-pass" hint="At least 8 characters."><Input id="u-pass" type="password" autoComplete="new-password" value={d.password} onChange={(e) => setD({ ...d, password: e.target.value })} /></Field>
          <Field label="Role" htmlFor="u-role" hint={ROLE_HELP[d.role]}>
            <NativeSelect id="u-role" value={d.role} onChange={(e) => setD({ ...d, role: e.target.value })}>
              {ROLES.map((r) => <option key={r} value={r}>{r === "admin" ? "Admin" : "Team member"}</option>)}
            </NativeSelect>
          </Field>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Adding…" : "Add member"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TeamSection() {
  const { user } = useAuth();
  const users = useLoader(() => crm.users.list(), [] as TeamUser[]);
  const [adding, setAdding] = useState(false);

  const setRole = async (u: TeamUser, role: string) => {
    const before = u.role;
    users.setData((p) => p.map((x) => (x.id === u.id ? { ...x, role } : x)));
    try { await crm.users.setRole(u.id, role); toast.success(`${u.full_name || u.email} is now ${role === "admin" ? "an admin" : "a team member"}`); }
    catch (e) { users.setData((p) => p.map((x) => (x.id === u.id ? { ...x, role: before } : x))); toast.error(errMsg(e)); }
  };
  const remove = async (u: TeamUser) => {
    if (!window.confirm(`Remove ${u.full_name || u.email}? Their tasks and clients will become unassigned.`)) return;
    try { await crm.users.remove(u.id); users.setData((p) => p.filter((x) => x.id !== u.id)); toast.success("User removed"); }
    catch (e) { toast.error(errMsg(e)); }
  };

  return (
    <div>
      <SectionHeader title="Team & users" description="Everyone who can sign in, and who leads, clients and tasks can be assigned to."
        actions={<Button onClick={() => setAdding(true)}><Plus className="h-4 w-4 mr-1.5" />Add member</Button>} />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <Stat label="Users" value={users.data.length} />
        <Stat label="Admins" value={users.data.filter((u) => u.role === "admin").length} />
        <Stat label="Open tasks assigned" value={users.data.reduce((a, u) => a + u.open_tasks, 0)} />
      </div>
      {users.loading && !users.data.length ? <LoadingState /> : users.error ? <ErrorState message={users.error} onRetry={users.reload} /> :
        !users.data.length ? <EmptyState title="No users" body="Add your first team member." /> : (
          <div className="rounded-xl border border-border overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead className="text-right">Open tasks</TableHead><TableHead>Joined</TableHead><TableHead className="w-[60px]"><span className="sr-only">Actions</span></TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {users.data.map((u) => {
                  const me = u.id === user?.id;
                  return (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="h-8 w-8 rounded-full bg-primary/10 text-primary text-xs font-bold grid place-items-center shrink-0">{(u.full_name || u.email).charAt(0).toUpperCase()}</span>
                          <div className="min-w-0"><p className="font-medium truncate">{u.full_name || u.email}{me && <Pill tone="blue" className="ml-2">You</Pill>}</p><p className="text-xs text-muted-foreground truncate">{u.email}</p></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {u.role === "admin" && <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />}
                          <NativeSelect aria-label={`Role for ${u.email}`} className="h-8 w-[150px]" value={u.role} disabled={me} onChange={(e) => setRole(u, e.target.value)}>
                            {ROLES.map((r) => <option key={r} value={r}>{r === "admin" ? "Admin" : "Team member"}</option>)}
                          </NativeSelect>
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{u.open_tasks}</TableCell>
                      <TableCell className="whitespace-nowrap">{fmtDate(u.created_at)}</TableCell>
                      <TableCell>{!me && <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => remove(u)} aria-label={`Remove ${u.email}`}><Trash2 className="h-3.5 w-3.5" /></Button>}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      {adding && <AddUserDialog onClose={() => setAdding(false)} onSaved={users.reload} />}
    </div>
  );
}
