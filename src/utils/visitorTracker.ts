import { adminCall, publicCall } from '@/services/apiClient';

export type VisitorLogEnvironment = 'frontend' | 'backend' | 'localhost';

export interface VisitorLog {
  id: string;
  ip_address: string;
  user_agent: string;
  page_url: string;
  referrer?: string | null;
  country?: string | null;
  city?: string | null;
  region?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  created_at: string;
  environment?: VisitorLogEnvironment;
  source_type?: 'frontend' | 'backend';
  is_local?: boolean;
}

// Get client IP address
// The server records the visitor's IP from the request, so no third-party IP lookup is needed.
async function getClientIP(): Promise<string> {
  return 'recorded by server';
}

/**
 * Determine log environment based on URL, referrer, and IP
 */
export function classifyVisitorEnvironment(log: Partial<VisitorLog>): VisitorLogEnvironment {
  const url = (log.page_url || '').toLowerCase();
  const ref = (log.referrer || '').toLowerCase();
  const ip = (log.ip_address || '').toLowerCase();

  // Localhost (both frontend dev and backend dev test calls from local machine)
  const isLocal =
    url.includes('localhost') ||
    url.includes('127.0.0.1') ||
    url.includes(':8080') ||
    url.includes(':5173') ||
    url.includes(':3000') ||
    ref.includes('localhost') ||
    ref.includes('127.0.0.1') ||
    ip === '127.0.0.1' ||
    ip === '::1';

  if (isLocal) {
    return 'localhost';
  }

  // Backend / Edge Function logs
  const isBackend =
    url.includes('/functions/v1') ||
    url.includes('/api/') ||
    url.includes('supabase.co') ||
    ref.includes('backend') ||
    ref.includes('api') ||
    ref.includes('postman') ||
    ref.includes('curl') ||
    ref.includes('server');

  if (isBackend) {
    return 'backend';
  }

  // Public Production Frontend
  return 'frontend';
}

/**
 * Tracks a frontend visitor session
 */
export async function trackVisitor() {
  try {
    const ip = await getClientIP();
    const userAgent = navigator.userAgent;
    const pageUrl = window.location.href;
    const referrer = document.referrer;
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // Embed tag in referrer if local so backend edge function records it cleanly
    const enrichedReferrer = referrer 
      ? referrer 
      : isLocal 
      ? '[Localhost Client Dev]' 
      : '[Direct Frontend Visitor]';

    try {
      await publicCall('visitor.track', { page_url: pageUrl, referrer: enrichedReferrer });
    } catch (err) {
      console.warn('Visitor log not saved:', err);
    }

    // Also persist local record for instant offline/dev viewing
    saveLocalVisitorLog({
      ip_address: ip,
      user_agent: userAgent,
      page_url: pageUrl,
      referrer: enrichedReferrer,
      created_at: new Date().toISOString(),
      source_type: 'frontend',
    });
  } catch (error) {
    console.warn('Visitor tracking notice:', error);
  }
}

/**
 * Tracks a backend API operation
 */
export async function trackBackendApiCall(endpoint: string, metadata?: Record<string, any>) {
  try {
    const userAgent = typeof navigator !== 'undefined' ? `${navigator.userAgent} [Backend API]` : 'System/EdgeFunction';
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.amzadscout.com';
    const pageUrl = `${baseUrl}/api/${endpoint.replace(/^\//, '')}`;
    const referrer = isLocal ? '[Localhost Backend Call]' : '[Production Backend Service]';
    const finalReferrer = `${referrer} ${metadata ? JSON.stringify(metadata) : ''}`.trim();

    try {
      await adminCall('visitor_logs.backend_test', { user_agent: userAgent, page_url: pageUrl, referrer: finalReferrer });
    } catch (err) {
      console.warn('Backend test log not saved:', err);
    }

    saveLocalVisitorLog({
      ip_address: isLocal ? '127.0.0.1' : 'Server',
      user_agent: userAgent,
      page_url: pageUrl,
      referrer: referrer,
      created_at: new Date().toISOString(),
      source_type: 'backend',
    });
  } catch (err) {
    console.warn('Backend tracking notice:', err);
  }
}

/**
 * Fetch and categorize all visitor logs into Frontend, Backend, and Localhost
 */
export async function getVisitorLogs(limit: number = 200): Promise<VisitorLog[]> {
  try {
    const { logs: rows } = await adminCall<{ logs: any[] }>('visitor_logs.list', { limit });

    const neonLogs: VisitorLog[] = (rows || []).map((raw: any) => {
      const env = classifyVisitorEnvironment(raw);
      const isLocal = env === 'localhost';
      const isBackend = env === 'backend' || raw.page_url?.includes('/api/') || raw.referrer?.includes('Backend');
      return {
        ...raw,
        environment: env,
        is_local: isLocal,
        source_type: isBackend ? 'backend' : 'frontend',
      };
    });

    // Merge with any offline local logs recorded in session
    const localStored = getStoredLocalVisitorLogs();
    const all = [...neonLogs];
    localStored.forEach((local) => {
      if (!all.some((l) => l.page_url === local.page_url && Math.abs(new Date(l.created_at).getTime() - new Date(local.created_at).getTime()) < 3000)) {
        all.unshift(local);
      }
    });

    return all.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (error) {
    console.warn('Error fetching visitor logs from Neon; using local fallback:', error);
    return getStoredLocalVisitorLogs();
  }
}

const LOCAL_STORAGE_KEY = 'amz_visitor_local_logs';

function saveLocalVisitorLog(log: Partial<VisitorLog>) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredLocalVisitorLogs();
    const env = classifyVisitorEnvironment(log);
    const newEntry: VisitorLog = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      ip_address: log.ip_address || '127.0.0.1',
      user_agent: log.user_agent || navigator.userAgent,
      page_url: log.page_url || window.location.href,
      referrer: log.referrer || null,
      created_at: log.created_at || new Date().toISOString(),
      country: log.country || (env === 'localhost' ? 'Local Development' : 'Online'),
      city: log.city || (env === 'localhost' ? 'Local Machine' : 'Client'),
      region: log.region || '',
      environment: env,
      source_type: log.source_type || (env === 'backend' ? 'backend' : 'frontend'),
      is_local: env === 'localhost',
    };
    const updated = [newEntry, ...existing].slice(0, 100);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

function getStoredLocalVisitorLogs(): VisitorLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
