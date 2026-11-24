import { authService } from "@/services/authService";

// Vercel function in api/crm.ts (talks to Neon directly).
const ENDPOINT = "/api/crm";

export const LEAD_STAGES = ["new", "contacted", "qualified", "proposal", "won", "lost"] as const;
export type LeadStage = (typeof LEAD_STAGES)[number];
export const TASK_STATUSES = ["todo", "in_progress", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];
export const PRIORITIES = ["low", "medium", "high"] as const;
export type Priority = (typeof PRIORITIES)[number];
export const PLAN_PERIODS = ["monthly", "quarterly", "annual", "one_time"] as const;
export type PlanPeriod = (typeof PLAN_PERIODS)[number];
export const CLIENT_STATUSES = ["active", "trial", "paused", "cancelled"] as const;
export type ClientStatus = (typeof CLIENT_STATUSES)[number];
export const ROLES = ["admin", "user"] as const;

export const STAGE_LABEL: Record<LeadStage, string> = {
  new: "New", contacted: "Contacted", qualified: "Qualified", proposal: "Proposal", won: "Won", lost: "Lost",
};
export const TASK_LABEL: Record<TaskStatus, string> = { todo: "To do", in_progress: "In progress", done: "Done" };
export const PERIOD_LABEL: Record<PlanPeriod, string> = { monthly: "/ month", quarterly: "/ quarter", annual: "/ year", one_time: "one-time" };

export interface CrmLead {
  id: string; name: string; email: string; phone?: string | null; company?: string | null; brand_name?: string | null;
  website_url?: string | null; amazon_store_url?: string | null; source?: string | null; status: LeadStage;
  notes?: string | null; lead_number?: string | null; audit_type?: string | null; current_spend?: string | null;
  goals?: string | null; created_at: string; owner_id?: string | null; owner_name?: string | null; owner_email?: string | null;
  next_follow_up?: string | null; deal_value?: number | null; open_tasks: number; client_id?: string | null;
}
export interface Task {
  id: string; title: string; description?: string | null; status: TaskStatus; priority: Priority; due_date?: string | null;
  assignee_id?: string | null; assignee_name?: string | null; assignee_email?: string | null;
  lead_id?: string | null; lead_name?: string | null; client_id?: string | null; client_name?: string | null;
  completed_at?: string | null; created_at: string;
}
export interface CrmClient {
  id: string; name: string; company?: string | null; email?: string | null; phone?: string | null; website?: string | null;
  lead_id?: string | null; plan_id?: string | null; plan_name?: string | null; billing_period?: PlanPeriod | null;
  plan_status: ClientStatus; start_date?: string | null; renewal_date?: string | null; monthly_value?: number | null;
  owner_id?: string | null; owner_name?: string | null; owner_email?: string | null; notes?: string | null; open_tasks: number; created_at: string;
}
export interface Plan {
  id: string; name: string; description?: string | null; price?: number | null; currency: string; billing_period: PlanPeriod;
  features: string[]; service_ids: string[]; is_active: boolean; sort_order: number; active_clients: number; mrr: number;
}
export interface Service {
  id: string; slug: string; name: string; category?: string | null; short_description?: string | null;
  description?: string | null; is_active: boolean; sort_order: number;
}
export interface TeamUser {
  id: string; email: string; full_name?: string | null; role: string; created_at: string; open_tasks: number;
}
export interface CrmSummary {
  leadsByStage: Record<string, number>; open_tasks: number; overdue_tasks: number; due_today: number;
  active_clients: number; mrr: number; renewals_30d: number; followUpsDue: number;
}

async function call<T>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  const send = async () => {
    const token = await authService.getValidAccessToken();
    if (!token) throw new Error("Your session has expired. Sign in again.");
    return fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ action, ...payload }),
    });
  };
  let res: Response;
  try {
    res = await send();
    if (res.status === 401) {
      const refreshed = await authService.refreshToken();
      if (!refreshed.data) throw new Error("Your session has expired. Sign in again.");
      res = await send();
    }
  } catch (e) {
    if (e instanceof Error && e.message.includes("session")) throw e;
    throw new Error("Couldn't reach the CRM service. Check your connection and try again.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status}).`);
  return data as T;
}

export const fmtMoney = (n?: number | null, currency = "USD") =>
  n == null ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(n));
export const fmtDate = (d?: string | null) =>
  d ? new Date(d.length === 10 ? d + "T00:00:00" : d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
export const todayISO = () => new Date().toISOString().slice(0, 10);
export const userLabel = (u?: { full_name?: string | null; email?: string | null } | null) => u?.full_name || u?.email || "Unassigned";

export const crm = {
  summary: () => call<CrmSummary>("summary"),
  leads: {
    list: () => call<{ leads: CrmLead[] }>("leads.list").then((r) => r.leads),
    update: (id: string, patch: Partial<Pick<CrmLead, "status" | "notes" | "owner_id" | "next_follow_up" | "deal_value">>) =>
      call("leads.update", { id, ...patch }),
    convert: (id: string, extra: { plan_id?: string | null; monthly_value?: number | null; renewal_date?: string | null } = {}) =>
      call<{ client: CrmClient }>("leads.convert", { id, ...extra }),
  },
  tasks: {
    list: () => call<{ tasks: Task[] }>("tasks.list").then((r) => r.tasks),
    create: (t: Partial<Task>) => call<{ task: Task }>("tasks.create", t),
    update: (id: string, t: Partial<Task>) => call<{ task: Task }>("tasks.update", { ...t, id }),
    remove: (id: string) => call("tasks.delete", { id }),
  },
  clients: {
    list: () => call<{ clients: CrmClient[] }>("clients.list").then((r) => r.clients),
    create: (c: Partial<CrmClient>) => call<{ client: CrmClient }>("clients.create", c),
    update: (id: string, c: Partial<CrmClient>) => call<{ client: CrmClient }>("clients.update", { ...c, id }),
    remove: (id: string) => call("clients.delete", { id }),
  },
  plans: {
    list: () => call<{ plans: Plan[] }>("plans.list").then((r) => r.plans),
    create: (p: Partial<Plan>) => call<{ plan: Plan }>("plans.create", p),
    update: (id: string, p: Partial<Plan>) => call<{ plan: Plan }>("plans.update", { ...p, id }),
    remove: (id: string) => call("plans.delete", { id }),
  },
  services: {
    list: () => call<{ services: Service[] }>("services.list").then((r) => r.services),
    create: (s: Partial<Service>) => call<{ service: Service }>("services.create", s),
    update: (id: string, s: Partial<Service>) => call<{ service: Service }>("services.update", { ...s, id }),
    remove: (id: string) => call("services.delete", { id }),
  },
  users: {
    list: () => call<{ users: TeamUser[] }>("users.list").then((r) => r.users),
    create: (u: { email: string; password: string; full_name?: string; role: string }) => call<{ user: TeamUser }>("users.create", u),
    setRole: (id: string, role: string) => call("users.set_role", { id, role }),
    remove: (id: string) => call("users.delete", { id }),
    setPassword: (id: string, password: string) => call("users.set_password", { id, password }),
  },
};
