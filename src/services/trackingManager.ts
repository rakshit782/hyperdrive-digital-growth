/**
 * Service to manage tracking settings and dynamic runtime updates
 */

export interface TrackerSetting {
  id: string;
  name: string;
  description: string;
  category: 'analytics' | 'ads' | 'heatmaps' | 'marketing';
  enabled: boolean;
  trackingId: string;
  defaultId: string;
}

export const DEFAULT_TRACKERS: TrackerSetting[] = [
  {
    id: 'ga4',
    name: 'Google Analytics 4 (GA4)',
    description: 'Track website traffic, visitors, events, and conversions across the entire site.',
    category: 'analytics',
    enabled: true,
    trackingId: 'G-5K1GGB3SBR',
    defaultId: 'G-5K1GGB3SBR',
  },
  {
    id: 'meta-pixel',
    name: 'Meta / Facebook Pixel',
    description: 'Measure ad effectiveness, track PageViews and lead conversions for Meta Ads.',
    category: 'ads',
    enabled: true,
    trackingId: '667154722169969',
    defaultId: '667154722169969',
  },
  {
    id: 'hotjar',
    name: 'Hotjar Heatmaps & Recordings',
    description: 'Visualize user behavior with interactive click/scroll heatmaps and session recordings.',
    category: 'heatmaps',
    enabled: true,
    trackingId: '6574226',
    defaultId: '6574226',
  },
  {
    id: 'clarity',
    name: 'Microsoft Clarity',
    description: 'Free session replays and scroll heatmaps with deep user experience insights.',
    category: 'heatmaps',
    enabled: true,
    trackingId: 'u54bu1wszh',
    defaultId: 'u54bu1wszh',
  },
  {
    id: 'gtm',
    name: 'Google Tag Manager (GTM)',
    description: 'Manage marketing tags without editing website code directly.',
    category: 'analytics',
    enabled: false,
    trackingId: '',
    defaultId: '',
  },
  {
    id: 'google-ads',
    name: 'Google Ads Conversion Tag',
    description: 'Track lead forms and conversions directly into Google Ads campaigns (AW-XXXXXXXX).',
    category: 'ads',
    enabled: false,
    trackingId: '',
    defaultId: '',
  },
  {
    id: 'tiktok',
    name: 'TikTok Pixel',
    description: 'Track conversions and create custom audiences from TikTok ad traffic.',
    category: 'ads',
    enabled: false,
    trackingId: '',
    defaultId: '',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Insight Tag',
    description: 'Power conversion tracking, website retargeting, and B2B demographics.',
    category: 'ads',
    enabled: false,
    trackingId: '',
    defaultId: '',
  },
];

const STORAGE_KEY = 'amz_tracker_settings';

export const trackingManager = {
  getTrackers(): TrackerSetting[] {
    if (typeof window === 'undefined') return DEFAULT_TRACKERS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return DEFAULT_TRACKERS;
      }
      const parsed: TrackerSetting[] = JSON.parse(stored);
      // Merge with defaults in case new trackers were added
      return DEFAULT_TRACKERS.map((def) => {
        const found = parsed.find((p) => p.id === def.id);
        return found ? { ...def, ...found } : def;
      });
    } catch {
      return DEFAULT_TRACKERS;
    }
  },

  saveTrackers(trackers: TrackerSetting[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trackers));
    window.dispatchEvent(new CustomEvent('amz_trackers_updated', { detail: trackers }));
  },

  getTracker(id: string): TrackerSetting | undefined {
    return this.getTrackers().find((t) => t.id === id);
  },
};
