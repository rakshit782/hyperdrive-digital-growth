import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Mail, Phone, Building2, Trash2, RefreshCw, ExternalLink, 
  Send, DollarSign, Target, FileText, LayoutGrid, List, Search,
  CheckSquare, Square
} from "lucide-react";
import { toast } from "sonner";
import { useState, useMemo } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  brand_name?: string;
  source?: string;
  status: string;
  lead_number?: string;
  website_url?: string;
  audit_type?: string;
  current_spend?: string;
  goals?: string;
  notes?: string;
  created_at: string;
}

interface LeadsSectionProps {
  leads: Lead[];
  onDelete: (id: string) => void;
  onBulkDelete?: (ids: string[]) => void;
  onRefresh: () => void;
}

export function LeadsSection({ leads, onDelete, onBulkDelete, onRefresh }: LeadsSectionProps) {
  const [forwardingId, setForwardingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "cards">(() => {
    try {
      const saved = localStorage.getItem("amz_leads_view_mode");
      if (saved === "cards" || saved === "table") return saved;
    } catch {}
    return "table";
  });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const handleSetViewMode = (mode: "table" | "cards") => {
    setViewMode(mode);
    try {
      localStorage.setItem("amz_leads_view_mode", mode);
    } catch {}
  };

  const safeLeads = useMemo(() => (Array.isArray(leads) ? leads : []), [leads]);

  const filteredLeads = useMemo(() => {
    if (!searchTerm.trim()) return safeLeads;
    const q = searchTerm.toLowerCase();
    return safeLeads.filter(
      (l) =>
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.company?.toLowerCase().includes(q) ||
        l.lead_number?.toLowerCase().includes(q) ||
        l.source?.toLowerCase().includes(q)
    );
  }, [safeLeads, searchTerm]);

  const allFilteredSelected =
    filteredLeads.length > 0 &&
    filteredLeads.every((lead) => selectedIds.has(lead.id));

  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredLeads.map((l) => l.id)));
    }
  };

  const toggleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to permanently delete this lead from the database? This action cannot be undone.")) {
      onDelete(id);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    if (
      confirm(
        `Are you sure you want to permanently delete ${ids.length} selected lead(s) from the database? This action cannot be undone.`
      )
    ) {
      setBulkDeleting(true);
      try {
        if (onBulkDelete) {
          await onBulkDelete(ids);
        } else {
          for (const id of ids) {
            await onDelete(id);
          }
        }
        setSelectedIds(new Set());
      } catch (e) {
        console.error(e);
      } finally {
        setBulkDeleting(false);
      }
    }
  };

  const handleForwardLead = async (lead: Lead) => {
    setForwardingId(lead.id);
    try {
      const response = await fetch(
        "https://hznbshxhmhtenxcuffhx.supabase.co/functions/v1/neon-lead-submission",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bmJzaHhobWh0ZW54Y3VmZmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzEzMjEsImV4cCI6MjA2NDIwNzMyMX0.jydxpMEn5Z-fDDJXA9XAbx_mHEi_eQPFNEYikM21gnY",
          },
          body: JSON.stringify({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company,
            brandName: lead.brand_name,
            website: lead.website_url,
            source: `${lead.source || "Website"} (Forwarded)`,
            auditType: lead.audit_type,
            currentSpend: lead.current_spend,
            goals: lead.goals,
            notes: lead.notes,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to forward lead to email");
      }
      toast.success(`Lead ${lead.lead_number || lead.name} dispatched to your notification email!`);
    } catch (err: any) {
      toast.error(err.message || "Failed to dispatch lead email");
    } finally {
      setForwardingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
      case "contacted":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";
      case "qualified":
        return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
      case "lost":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Leads</h2>
          <p className="text-muted-foreground mt-1">
            {safeLeads.length} total leads &bull; Live database & email sync
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-md p-0.5 bg-muted/40">
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => handleSetViewMode("table")}
              className="h-8 px-2.5 gap-1.5 text-xs font-medium"
            >
              <List className="h-3.5 w-3.5" />
              Table
            </Button>
            <Button
              variant={viewMode === "cards" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => handleSetViewMode("cards")}
              className="h-8 px-2.5 gap-1.5 text-xs font-medium"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Cards
            </Button>
          </div>

          <Button onClick={onRefresh} variant="outline" size="sm" className="h-8">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filter & Bulk Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-muted/30 border rounded-lg">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search leads by name, email, company, #"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-foreground bg-primary/10 text-primary px-2.5 py-1 rounded-md">
                {selectedIds.size} selected
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                disabled={bulkDeleting}
                className="h-9 text-xs gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {bulkDeleting ? "Deleting..." : `Delete Selected (${selectedIds.size})`}
              </Button>
            </div>
          )}
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? "No leads matching your search" : "No leads yet"}
            </p>
          </CardContent>
        </Card>
      ) : viewMode === "table" ? (
        /* TABLE VIEW */
        <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={allFilteredSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all leads"
                  />
                </TableHead>
                <TableHead className="w-32">Lead #</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Audit / Spend</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => {
                const isSelected = selectedIds.has(lead.id);
                return (
                  <TableRow
                    key={lead.id}
                    className={`transition-colors ${isSelected ? "bg-primary/5" : ""}`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelectOne(lead.id)}
                        aria-label={`Select lead ${lead.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium text-muted-foreground">
                      {lead.lead_number || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-foreground text-sm">
                        {lead.name}
                      </div>
                      {lead.company && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Building2 className="h-3 w-3" />
                          {lead.company}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-0.5 text-xs">
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-primary hover:underline block font-medium"
                        >
                          {lead.email}
                        </a>
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-muted-foreground hover:underline block"
                          >
                            {lead.phone}
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs space-y-0.5">
                        {lead.audit_type && (
                          <div className="font-medium text-foreground flex items-center gap-1">
                            <FileText className="h-3 w-3 text-primary" />
                            {lead.audit_type}
                          </div>
                        )}
                        {lead.current_spend && (
                          <div className="text-muted-foreground flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-green-600" />
                            {lead.current_spend}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      <span className="bg-muted px-2 py-0.5 rounded capitalize">
                        {lead.source || "Website"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleForwardLead(lead)}
                          disabled={forwardingId === lead.id}
                          className="h-8 px-2 text-xs"
                          title="Forward lead to email"
                        >
                          <Send className="h-3.5 w-3.5 text-primary" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(lead.id)}
                          className="h-8 px-2 text-destructive hover:text-destructive"
                          title="Delete permanently"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        /* CARDS VIEW */
        <div className="grid gap-4 md:grid-cols-2">
          {filteredLeads.map((lead) => {
            const isSelected = selectedIds.has(lead.id);
            return (
              <Card
                key={lead.id}
                className={`border-l-4 transition-all ${
                  isSelected
                    ? "border-l-primary ring-2 ring-primary/30"
                    : "border-l-green-500"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2.5">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelectOne(lead.id)}
                        className="mt-1"
                        aria-label={`Select lead ${lead.name}`}
                      />
                      <div>
                        <CardTitle className="text-lg">{lead.name}</CardTitle>
                        {lead.lead_number && (
                          <p className="text-xs text-muted-foreground font-mono mt-0.5">
                            #{lead.lead_number}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                      {lead.email}
                    </a>
                  </div>
                  {lead.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                        {lead.phone}
                      </a>
                    </div>
                  )}
                  {lead.company && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.company}</span>
                    </div>
                  )}
                  {lead.website_url && (
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={lead.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate"
                      >
                        {lead.website_url}
                      </a>
                    </div>
                  )}
                  {lead.audit_type && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>Audit: <strong className="text-foreground">{lead.audit_type}</strong></span>
                    </div>
                  )}
                  {lead.current_spend && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>Spend: <strong className="text-foreground">{lead.current_spend}</strong></span>
                    </div>
                  )}
                  {lead.goals && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="h-4 w-4 text-amber-500" />
                      <span>Goals: <strong className="text-foreground">{lead.goals}</strong></span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t">
                    <span className="text-xs text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleForwardLead(lead)}
                        disabled={forwardingId === lead.id}
                        className="h-8 text-xs gap-1.5"
                      >
                        <Send className="h-3.5 w-3.5 text-primary" />
                        {forwardingId === lead.id ? "Sending..." : "Forward to Email"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(lead.id)}
                        className="text-destructive hover:text-destructive h-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
