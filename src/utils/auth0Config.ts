
import { supabase } from '@/integrations/supabase/client';

export interface Auth0Config {
  domain: string;
  clientId: string;
  redirectUri: string;
  audience?: string;
  scope: string;
  isActive: boolean;
}

class Auth0ConfigManager {
  private static instance: Auth0ConfigManager;
  private config: Auth0Config | null = null;
  private initialized = false;

  static getInstance(): Auth0ConfigManager {
    if (!Auth0ConfigManager.instance) {
      Auth0ConfigManager.instance = new Auth0ConfigManager();
    }
    return Auth0ConfigManager.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    await this.loadFromDatabase();
    this.initialized = true;
  }

  private async loadFromDatabase(): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('auth0_config')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Failed to load Auth0 config from database:', error);
        return;
      }

      if (data) {
        this.config = {
          domain: data.domain,
          clientId: data.client_id,
          redirectUri: data.redirect_uri,
          audience: data.audience || undefined,
          scope: data.scope,
          isActive: data.is_active,
        };
      }
    } catch (error) {
      console.error('Error loading Auth0 config:', error);
    }
  }

  async saveConfig(config: Auth0Config): Promise<void> {
    try {
      const { error } = await supabase
        .from('auth0_config')
        .upsert({
          domain: config.domain,
          client_id: config.clientId,
          redirect_uri: config.redirectUri,
          audience: config.audience,
          scope: config.scope,
          is_active: config.isActive,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      this.config = config;
      
      // Reload page to reinitialize Auth0Provider with new config
      if (config.isActive) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to save Auth0 config:', error);
      throw error;
    }
  }

  getConfig(): Auth0Config | null {
    return this.config;
  }

  isConfigured(): boolean {
    const config = this.getConfig();
    return !!(config && config.domain && config.clientId && config.isActive);
  }

  async clearConfig(): Promise<void> {
    try {
      await supabase
        .from('auth0_config')
        .update({ is_active: false })
        .eq('is_active', true);

      this.config = null;
    } catch (error) {
      console.error('Failed to clear Auth0 config:', error);
      throw error;
    }
  }
}

export const auth0ConfigManager = Auth0ConfigManager.getInstance();
