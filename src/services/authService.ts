const SUPABASE_URL = "https://hznbshxhmhtenxcuffhx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bmJzaHhobWh0ZW54Y3VmZmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzEzMjEsImV4cCI6MjA2NDIwNzMyMX0.jydxpMEn5Z-fDDJXA9XAbx_mHEi_eQPFNEYikM21gnY";

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  private session: AuthSession | null = null;

  constructor() {
    this.loadSession();
  }

  private loadSession() {
    if (typeof localStorage === 'undefined') return;
    const stored = localStorage.getItem('auth_session');
    if (stored) {
      try {
        this.session = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored session:', e);
        localStorage.removeItem('auth_session');
      }
    }
  }

  private saveSession(session: AuthSession | null) {
    this.session = session;
    if (session) {
      localStorage.setItem('auth_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('auth_session');
    }
  }

  async signup(email: string, password: string, full_name?: string) {
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/neon-auth-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ email, password, full_name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      const session: AuthSession = {
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };

      this.saveSession(session);
      return { data: session, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/neon-auth-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      const session: AuthSession = {
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };

      this.saveSession(session);
      return { data: session, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  /** Reads the `exp` claim (ms since epoch) from a JWT, or null when unreadable. */
  private tokenExpiry(token: string): number | null {
    try {
      const payload = token.split('.')[1];
      if (!payload) return null;
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(normalized));
      return typeof decoded.exp === 'number' ? decoded.exp * 1000 : null;
    } catch {
      return null;
    }
  }

  /** True when the token is already expired, or expires inside the safety window. */
  private isTokenExpired(token: string, safetyMs = 30_000): boolean {
    const exp = this.tokenExpiry(token);
    return exp !== null && exp <= Date.now() + safetyMs;
  }

  /**
   * Returns an access token that is still valid, refreshing it first when needed.
   * An expired token is never sent to an edge function.
   */
  async getValidAccessToken(): Promise<string | null> {
    if (!this.session?.accessToken) return null;
    if (!this.isTokenExpired(this.session.accessToken)) return this.session.accessToken;
    if (!this.session.refreshToken || this.isTokenExpired(this.session.refreshToken)) {
      this.logout();
      return null;
    }
    const refreshed = await this.refreshToken();
    return refreshed.data ? this.session?.accessToken ?? null : null;
  }

  async verifyToken(): Promise<{ data: User | null; error: string | null }> {
    if (!this.session?.accessToken) {
      return { data: null, error: 'No session' };
    }

    // Refresh proactively so an expired token never reaches the server.
    const token = await this.getValidAccessToken();
    if (!token) {
      return { data: null, error: 'Session expired. Please sign in again.' };
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/neon-auth-verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'apikey': SUPABASE_ANON_KEY,
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401) {
          this.logout();
          return { data: null, error: 'Session expired. Please sign in again.' };
        }
        throw new Error(data.error || 'Token verification failed');
      }

      // Update user info in session
      if (this.session) {
        this.session.user = data.user;
        this.saveSession(this.session);
      }

      return { data: data.user, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  async refreshToken() {
    if (!this.session?.refreshToken) {
      return { data: null, error: 'No refresh token' };
    }

    // The refresh token itself has expired — end the session without calling the server.
    if (this.isTokenExpired(this.session.refreshToken)) {
      this.logout();
      return { data: null, error: 'Session expired. Please sign in again.' };
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/neon-auth-refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ refreshToken: this.session.refreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Token refresh failed');
      }

      if (this.session) {
        this.session.accessToken = data.accessToken;
        this.saveSession(this.session);
      }

      return { data: data.accessToken, error: null };
    } catch (error: any) {
      this.logout();
      return { data: null, error: error.message };
    }
  }

  logout() {
    this.saveSession(null);
  }

  getSession(): AuthSession | null {
    return this.session;
  }

  getUser(): User | null {
    return this.session?.user || null;
  }

  getAccessToken(): string | null {
    return this.session?.accessToken || null;
  }

  isAuthenticated(): boolean {
    return !!this.session?.accessToken;
  }
}

export const authService = new AuthService();
