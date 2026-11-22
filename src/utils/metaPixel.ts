/**
 * Meta Pixel helpers: visitor ID for match quality, advanced matching on leads,
 * and a server-side (Conversions API) copy of each Lead with the same event ID.
 */
export const META_PIXEL_ID = '667154722169969';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || 'https://hznbshxhmhtenxcuffhx.supabase.co').replace(/\/$/, '');
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const VISITOR_KEY = 'amz_vid';

/** Stable anonymous visitor ID (also set by index.html). Sent to Meta as external_id. */
export function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return '';
  }
}

function cookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/** _fbc normally comes from the pixel; build it from ?fbclid= if the cookie isn't there yet. */
function fbc(): string | undefined {
  const c = cookie('_fbc');
  if (c) return c;
  try {
    const clid = new URLSearchParams(window.location.search).get('fbclid');
    return clid ? `fb.1.${Date.now()}.${clid}` : undefined;
  } catch {
    return undefined;
  }
}

interface LeadInfo {
  leadId: string;
  email?: string;
  phone?: string;
  name?: string;
  contentName?: string;
  contentCategory?: string;
  value?: number;
}

/**
 * Fire one Meta Lead for a saved lead:
 * 1. browser pixel, with advanced matching (the pixel hashes these values before sending)
 * 2. server-side copy through the meta-capi function, deduplicated by the shared event ID
 */
export function trackMetaLead(info: LeadInfo) {
  if (typeof window === 'undefined' || !info.leadId || info.leadId === 'filtered') return;
  const eventId = `lead-${info.leadId}`;
  const externalId = getVisitorId();
  const [fn, ...rest] = (info.name || '').trim().toLowerCase().split(/\s+/);
  const userData: Record<string, string> = {};
  if (info.email) userData.em = info.email.trim().toLowerCase();
  if (info.phone) { const ph = info.phone.replace(/\D/g, ''); if (ph.length >= 7) userData.ph = ph; }
  if (fn) userData.fn = fn;
  if (rest.length) userData.ln = rest[rest.length - 1];
  if (externalId) userData.external_id = externalId;

  try {
    if (window.fbq) {
      window.fbq('init', META_PIXEL_ID, userData);
      window.fbq('track', 'Lead', {
        content_name: info.contentName || 'Website Lead',
        content_category: info.contentCategory || 'General',
        currency: 'USD',
        value: info.value ?? 100,
      }, { eventID: eventId });
    }
  } catch (e) {
    console.warn('Meta Pixel Lead not sent:', e);
  }

  // Server-side copy. Fire-and-forget; keepalive lets it finish if the page navigates.
  try {
    fetch(`${SUPABASE_URL}/functions/v1/meta-capi`, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json', ...(SUPABASE_KEY ? { apikey: SUPABASE_KEY } : {}) },
      body: JSON.stringify({
        lead_id: info.leadId,
        event_id: eventId,
        event_source_url: window.location.href,
        fbp: cookie('_fbp'),
        fbc: fbc(),
        external_id: externalId,
        value: info.value ?? 100,
        content_name: info.contentName,
      }),
    }).catch(() => { /* expected when the function isn't deployed yet */ });
  } catch {
    /* ignore */
  }
}
