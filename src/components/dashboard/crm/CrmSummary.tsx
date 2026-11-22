import { AlertTriangle, ArrowRight } from "lucide-react";
import { crm, fmtMoney, type CrmSummary as Summary } from "@/services/crmService";
import { Stat, useLoader } from "./shared";

/** CRM headline numbers for the dashboard Overview. Stays quiet if the CRM function isn't deployed yet. */
export function CrmSummary({ onNavigate }: { onNavigate: (s: string) => void }) {
  const s = useLoader<Summary | null>(() => crm.summary(), null);
  if (s.error) {
    return (
      <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm flex items-start gap-3">
        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
        <p><span className="font-semibold">CRM figures unavailable.</span> <span className="text-muted-foreground">{s.error}</span></p>
      </div>
    );
  }
  const d = s.data;
  const open = d ? ["new", "contacted", "qualified", "proposal"].reduce((a, k) => a + (d.leadsByStage[k] || 0), 0) : 0;
  const card = (label: string, value: React.ReactNode, section: string, hint?: string, tone?: "warn" | "good") => (
    <button type="button" onClick={() => onNavigate(section)} className="text-left group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <div className="relative">
        <Stat label={label} value={s.loading && !d ? "…" : value} hint={hint} tone={tone} />
        <ArrowRight className="h-3.5 w-3.5 absolute right-3 top-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {card("Open leads", open, "pipeline", d ? `${d.leadsByStage.new || 0} new · ${d.followUpsDue} follow-ups due` : undefined, d?.followUpsDue ? "warn" : undefined)}
      {card("Open tasks", d?.open_tasks ?? 0, "tasks", d ? `${d.overdue_tasks} overdue · ${d.due_today} due today` : undefined, d?.overdue_tasks ? "warn" : undefined)}
      {card("Active clients", d?.active_clients ?? 0, "clients", d ? `${d.renewals_30d} renewing in 30 days` : undefined)}
      {card("Monthly recurring revenue", fmtMoney(d?.mrr ?? 0), "plans", "From active clients", "good")}
    </div>
  );
}
