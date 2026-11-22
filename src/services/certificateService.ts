import { adminCall, publicCall } from "@/services/apiClient";

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

export const certificateService = {
  verify: (certificate_id: string) =>
    publicCall<{ found: boolean; certificate?: Certificate }>("certificate.verify", { certificate_id }),
  list: () => adminCall("certificates.list") as Promise<{ certificates: Certificate[] }>,
  create: (certificate: Partial<Certificate>) =>
    adminCall("certificates.create", { certificate }) as Promise<{ certificate: Certificate }>,
  bulkCreate: (certificates: Partial<Certificate>[]) =>
    adminCall("certificates.bulk_create", { certificates }) as Promise<{ created: number }>,
  update: (id: string, certificate: Record<string, unknown>) =>
    adminCall("certificates.update", { id, certificate }) as Promise<{ certificate: Certificate }>,
  setStatus: (id: string, status: string) => adminCall("certificates.set_status", { id, status }),
  remove: (id: string) => adminCall("certificates.delete", { id }),
};
