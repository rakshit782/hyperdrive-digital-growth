import { authService } from "@/services/authService";

const SUPABASE_URL = "https://hznbshxhmhtenxcuffhx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bmJzaHhobWh0ZW54Y3VmZmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzEzMjEsImV4cCI6MjA2NDIwNzMyMX0.jydxpMEn5Z-fDDJXA9XAbx_mHEi_eQPFNEYikM21gnY";

const ENDPOINT = `${SUPABASE_URL}/functions/v1/neon-certificates`;

export interface Certificate {
  id?: string;
  certificate_id: string;
  student_name: string;
  email?: string | null;
  role: string;
  department?: string | null;
  city?: string | null;
  start_date: string;
  end_date: string;
  issue_date?: string;
  mentor_name?: string | null;
  performance?: string | null;
  status?: string;
  notes?: string | null;
  created_at?: string;
}

async function call(body: Record<string, unknown>, withAdmin = false) {
  const request = async () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
    };
    if (withAdmin) {
      const token = authService.getAccessToken();
      if (!token) throw new Error("Session expired. Please sign in again.");
      headers["x-admin-token"] = token;
    }

    return fetch(ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  };

  let response = await request();
  if (withAdmin && response.status === 401) {
    const refreshed = await authService.refreshToken();
    if (!refreshed.data) {
      throw new Error("Session expired. Please sign in again.");
    }
    response = await request();
  }

  const data = await response.json().catch(() => ({ error: "Request failed" }));
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const certificateService = {
  verify: (certificate_id: string) =>
    call({ action: "verify", certificate_id }) as Promise<{
      found: boolean;
      certificate?: Certificate;
    }>,
  list: () => call({ action: "list" }, true) as Promise<{ certificates: Certificate[] }>,
  create: (certificate: Partial<Certificate>) =>
    call({ action: "create", certificate }, true) as Promise<{ certificate: Certificate }>,
  bulkCreate: (certificates: Partial<Certificate>[]) =>
    call({ action: "bulk_create", certificates }, true) as Promise<{ created: number }>,
  setStatus: (id: string, status: string) => call({ action: "set_status", id, status }, true),
  remove: (id: string) => call({ action: "delete", id }, true),
};
