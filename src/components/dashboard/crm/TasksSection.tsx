import { useMemo, useState } from "react";
import { CalendarClock, CheckCircle2, Circle, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import {
  crm, PRIORITIES, TASK_LABEL, TASK_STATUSES, fmtDate, userLabel,
  type Task, type TaskStatus, type TeamUser,
} from "@/services/crmService";
import {
  EmptyState, ErrorState, Field, LoadingState, NativeSelect, Pill, PRIORITY_TONE, SectionHeader, Stat,
  errMsg, isOverdue, useLoader,
} from "./shared";

type Draft = Partial<Task> & { title: string };

export function TaskDialog({
  open, onOpenChange, initial, users, onSaved, context,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initial?: Partial<Task> | null;
  users: TeamUser[];
  onSaved: (t: Task) => void;
  context?: string;
}) {
  const [d, setD] = useState<Draft>({ title: "", priority: "medium", status: "todo", ...initial } as Draft);
  const [saving, setSaving] = useState(false);
  const editing = !!initial?.id;
  const set = (k: keyof Task, v: unknown) => setD((p) => ({ ...p, [k]: v }));

  const save = async () => {
    if (!d.title.trim()) { toast.error("Give the task a title."); return; }
    setSaving(true);
    try {
      const payload = {
        title: d.title.trim(), description: d.description || null, status: d.status, priority: d.priority,
        due_date: d.due_date || null, assignee_id: d.assignee_id || null, lead_id: d.lead_id || null, client_id: d.client_id || null,
      };
      const r = editing ? await crm.tasks.update(initial!.id!, payload) : await crm.tasks.create(payload);
      toast.success(editing ? "Task updated" : "Task created");
      onSaved(r.task);
      onOpenChange(false);
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit task" : "New task"}</DialogTitle>
          {context && <DialogDescription>{context}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="Title" htmlFor="t-title">
            <Input id="t-title" value={d.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Send audit summary" autoFocus />
          </Field>
          <Field label="Details" htmlFor="t-desc">
            <Textarea id="t-desc" value={d.description || ""} onChange={(e) => set("description", e.target.value)} rows={3} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Assignee" htmlFor="t-assignee">
              <NativeSelect id="t-assignee" value={d.assignee_id || ""} onChange={(e) => set("assignee_id", e.target.value || null)}>
                <option value="">Unassigned</option>
                {users.map((u) => <option key={u.id} value={u.id}>{userLabel(u)}</option>)}
              </NativeSelect>
            </Field>
            <Field label="Due date" htmlFor="t-due">
              <Input id="t-due" type="date" value={d.due_date || ""} onChange={(e) => set("due_date", e.target.value || null)} />
            </Field>
            <Field label="Priority" htmlFor="t-pri">
              <NativeSelect id="t-pri" value={d.priority} onChange={(e) => set("priority", e.target.value)}>
                {PRIORITIES.map((p) => <option key={p} value={p}>{p[0].toUpperCase() + p.slice(1)}</option>)}
              </NativeSelect>
            </Field>
            <Field label="Status" htmlFor="t-status">
              <NativeSelect id="t-status" value={d.status} onChange={(e) => set("status", e.target.value)}>
                {TASK_STATUSES.map((s) => <option key={s} value={s}>{TASK_LABEL[s]}</option>)}
              </NativeSelect>
            </Field>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Saving…" : editing ? "Save changes" : "Create task"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TaskRow({ task, onToggle, onEdit, onDelete }: { task: Task; onToggle: () => void; onEdit: () => void; onDelete?: () => void }) {
  const done = task.status === "done";
  const late = !done && isOverdue(task.due_date);
  return (
    <div className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3 hover:border-primary/40 transition-colors">
      <button type="button" onClick={onToggle} aria-label={done ? "Mark as not done" : "Mark as done"} className="mt-0.5 text-muted-foreground hover:text-primary">
        {done ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</p>
        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
          <Pill tone={PRIORITY_TONE[task.priority]}>{task.priority}</Pill>
          {task.due_date && (
            <Pill tone={late ? "red" : "gray"}><CalendarClock className="h-3 w-3" />{late ? "Overdue · " : ""}{fmtDate(task.due_date)}</Pill>
          )}
          <span className="text-[11px] text-muted-foreground">{task.assignee_id ? userLabel({ full_name: task.assignee_name, email: task.assignee_email }) : "Unassigned"}</span>
          {(task.lead_name || task.client_name) && <span className="text-[11px] text-muted-foreground">· {task.client_name || task.lead_name}</span>}
        </div>
      </div>
      <div className="flex gap-1 opacity-60 group-hover:opacity-100">
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onEdit} aria-label="Edit task"><Pencil className="h-3.5 w-3.5" /></Button>
        {onDelete && <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={onDelete} aria-label="Delete task"><Trash2 className="h-3.5 w-3.5" /></Button>}
      </div>
    </div>
  );
}

export function TasksSection() {
  const { user } = useAuth();
  const tasks = useLoader(() => crm.tasks.list(), [] as Task[]);
  const users = useLoader(() => crm.users.list(), [] as TeamUser[]);
  const [filter, setFilter] = useState<"all" | "mine" | "overdue" | string>("all");
  const [dialog, setDialog] = useState<{ open: boolean; task?: Task | null }>({ open: false });

  const list = useMemo(() => tasks.data.filter((t) => {
    if (filter === "mine") return t.assignee_id === user?.id;
    if (filter === "overdue") return t.status !== "done" && isOverdue(t.due_date);
    if (filter !== "all") return t.assignee_id === filter;
    return true;
  }), [tasks.data, filter, user?.id]);

  const open = tasks.data.filter((t) => t.status !== "done");
  const overdue = open.filter((t) => isOverdue(t.due_date)).length;
  const today = new Date().toISOString().slice(0, 10);

  const upsert = (t: Task) => {
    // Re-fetch to pick up joined names (assignee, lead, client)
    tasks.setData((prev) => (prev.some((x) => x.id === t.id) ? prev.map((x) => (x.id === t.id ? { ...x, ...t } : x)) : [t, ...prev]));
    tasks.reload();
  };
  const move = async (t: Task, status: TaskStatus) => {
    const before = tasks.data;
    tasks.setData((prev) => prev.map((x) => (x.id === t.id ? { ...x, status } : x)));
    try { await crm.tasks.update(t.id, { status }); } catch (e) { tasks.setData(before); toast.error(errMsg(e)); }
  };
  const remove = async (t: Task) => {
    if (!window.confirm(`Delete "${t.title}"?`)) return;
    try { await crm.tasks.remove(t.id); tasks.setData((p) => p.filter((x) => x.id !== t.id)); toast.success("Task deleted"); }
    catch (e) { toast.error(errMsg(e)); }
  };

  return (
    <div>
      <SectionHeader
        title="Tasks"
        description="Follow-ups and to-dos for your team, linked to leads and clients."
        actions={<Button onClick={() => setDialog({ open: true, task: null })}><Plus className="h-4 w-4 mr-1.5" />New task</Button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Stat label="Open tasks" value={open.length} />
        <Stat label="Overdue" value={overdue} tone={overdue ? "warn" : undefined} />
        <Stat label="Due today" value={open.filter((t) => t.due_date === today).length} />
        <Stat label="Completed" value={tasks.data.length - open.length} tone="good" />
      </div>

      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Filter tasks">
        {[["all", "All"], ["mine", "Assigned to me"], ["overdue", "Overdue"]].map(([k, l]) => (
          <Button key={k} size="sm" variant={filter === k ? "default" : "outline"} onClick={() => setFilter(k)} aria-pressed={filter === k}>{l}</Button>
        ))}
        <NativeSelect aria-label="Filter by assignee" className="h-9 w-auto" value={["all", "mine", "overdue"].includes(filter) ? "" : filter} onChange={(e) => setFilter(e.target.value || "all")}>
          <option value="">Any teammate</option>
          {users.data.map((u) => <option key={u.id} value={u.id}>{userLabel(u)}</option>)}
        </NativeSelect>
      </div>

      {tasks.loading && !tasks.data.length ? <LoadingState /> : tasks.error ? <ErrorState message={tasks.error} onRetry={tasks.reload} /> :
        tasks.data.length === 0 ? (
          <EmptyState title="No tasks yet" body="Create a task, or add one from a lead in the Pipeline to schedule a follow-up."
            action={<Button onClick={() => setDialog({ open: true, task: null })}><Plus className="h-4 w-4 mr-1.5" />New task</Button>} />
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {TASK_STATUSES.map((s) => {
              const col = list.filter((t) => t.status === s);
              return (
                <div key={s} className="rounded-xl bg-muted/40 p-3">
                  <div className="flex items-center justify-between px-1 pb-3">
                    <p className="text-sm font-semibold">{TASK_LABEL[s]}</p>
                    <span className="text-xs text-muted-foreground tabular-nums">{col.length}</span>
                  </div>
                  <div className="grid gap-2">
                    {col.map((t) => (
                      <TaskRow key={t.id} task={t}
                        onToggle={() => move(t, t.status === "done" ? "todo" : "done")}
                        onEdit={() => setDialog({ open: true, task: t })}
                        onDelete={() => remove(t)} />
                    ))}
                    {!col.length && <p className="text-xs text-muted-foreground px-1 py-4 text-center">Nothing here</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      {dialog.open && (
        <TaskDialog open={dialog.open} onOpenChange={(o) => setDialog((p) => ({ ...p, open: o }))}
          initial={dialog.task ?? { assignee_id: user?.id }} users={users.data} onSaved={upsert} />
      )}
    </div>
  );
}
