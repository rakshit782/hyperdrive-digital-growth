// Calls the Vercel functions in api/. The browser never talks to the database directly.
import { authService } from "@/services/authService";

async function post(url: string, body: unknown, headers: Record<string, string> = {}) {
  return fetch(url, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) });
}

async function parse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).error || `Request failed (${res.status}).`);
  return data as T;
}

/** Admin-only action on /api/admin. Refreshes the session first and retries once on 401. */
export async function adminCall<T = any>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  const send = async () => {
    const token = await authService.getValidAccessToken();
    if (!token) throw new Error("Your session has expired. Sign in again.");
    return post("/api/admin", { action, ...payload }, { "x-admin-token": token });
  };
  let res = await send();
  if (res.status === 401) {
    const refreshed = await authService.refreshToken();
    if (!refreshed.data) throw new Error("Your session has expired. Sign in again.");
    res = await send();
  }
  return parse<T>(res);
}

/** Public action on /api/public (no sign-in). */
export async function publicCall<T = any>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  return parse<T>(await post("/api/public", { action, ...payload }));
}
