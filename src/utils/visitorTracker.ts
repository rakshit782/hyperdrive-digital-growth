import { supabase } from '@/integrations/supabase/client';

// Get client IP address (will be proxied IP from Vercel/hosting)
async function getClientIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP:', error);
    return 'unknown';
  }
}

export async function trackVisitor() {
  try {
    const ip = await getClientIP();
    const userAgent = navigator.userAgent;
    const pageUrl = window.location.href;
    const referrer = document.referrer;

    await supabase.functions.invoke('neon-visitor-logs', {
      body: {
        action: 'insert',
        logData: {
          ip_address: ip,
          user_agent: userAgent,
          page_url: pageUrl,
          referrer: referrer || null,
        },
      },
    });

    console.log('Visitor tracked successfully');
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
}

export async function getVisitorLogs(limit: number = 100) {
  try {
    const { data, error } = await supabase.functions.invoke('neon-visitor-logs', {
      body: {
        action: 'list',
        limit,
      },
    });

    if (error) {
      throw error;
    }

    return data?.logs || [];
  } catch (error) {
    console.error('Error fetching visitor logs:', error);
    return [];
  }
}
