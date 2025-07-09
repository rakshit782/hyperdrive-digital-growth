export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean | null
          section_name: string
          sort_order: number | null
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          section_name: string
          sort_order?: number | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          section_name?: string
          sort_order?: number | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_name: string
          id: string
          ip_address: unknown | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_name: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_name?: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          address: string | null
          business_hours: Json | null
          company_name: string | null
          created_at: string | null
          email: string | null
          id: string
          phone: string | null
          social_links: Json | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          business_hours?: Json | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          social_links?: Json | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          business_hours?: Json | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          social_links?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          form_type: string
          id: string
          message: string | null
          name: string
          phone: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          form_type: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          form_type?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          question: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          question: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          question?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      form_security_logs: {
        Row: {
          created_at: string
          csrf_valid: boolean | null
          form_type: string
          honeypot_triggered: boolean | null
          id: string
          ip_address: unknown | null
          recaptcha_score: number | null
          submission_data: Json | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          csrf_valid?: boolean | null
          form_type: string
          honeypot_triggered?: boolean | null
          id?: string
          ip_address?: unknown | null
          recaptcha_score?: number | null
          submission_data?: Json | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          csrf_valid?: boolean | null
          form_type?: string
          honeypot_triggered?: boolean | null
          id?: string
          ip_address?: unknown | null
          recaptcha_score?: number | null
          submission_data?: Json | null
          user_agent?: string | null
        }
        Relationships: []
      }
      integrations: {
        Row: {
          api_keys: Json | null
          config: Json | null
          created_at: string | null
          id: string
          integration_name: string
          integration_type: string
          is_active: boolean | null
          last_sync: string | null
          updated_at: string | null
          webhook_url: string | null
        }
        Insert: {
          api_keys?: Json | null
          config?: Json | null
          created_at?: string | null
          id?: string
          integration_name: string
          integration_type: string
          is_active?: boolean | null
          last_sync?: string | null
          updated_at?: string | null
          webhook_url?: string | null
        }
        Update: {
          api_keys?: Json | null
          config?: Json | null
          created_at?: string | null
          id?: string
          integration_name?: string
          integration_type?: string
          is_active?: boolean | null
          last_sync?: string | null
          updated_at?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          assigned_to: string | null
          company: string | null
          created_at: string | null
          email: string
          form_security: Json | null
          id: string
          lead_data: Json | null
          name: string
          notes: string | null
          phone: string | null
          source: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          form_security?: Json | null
          id?: string
          lead_data?: Json | null
          name: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          form_security?: Json | null
          id?: string
          lead_data?: Json | null
          name?: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          billing_period: string | null
          created_at: string | null
          description: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          name: string
          price: number | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          billing_period?: string | null
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name: string
          price?: number | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          billing_period?: string | null
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name?: string
          price?: number | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      seo_global_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      seo_pages: {
        Row: {
          canonical_url: string | null
          created_at: string
          id: string
          include_in_sitemap: boolean | null
          is_active: boolean | null
          meta_description: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          page_name: string
          page_path: string
          robots_follow: boolean | null
          robots_index: boolean | null
          schema_data: Json | null
          schema_type: string | null
          title_tag: string | null
          twitter_description: string | null
          twitter_image: string | null
          twitter_title: string | null
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          id?: string
          include_in_sitemap?: boolean | null
          is_active?: boolean | null
          meta_description?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_name: string
          page_path: string
          robots_follow?: boolean | null
          robots_index?: boolean | null
          schema_data?: Json | null
          schema_type?: string | null
          title_tag?: string | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          id?: string
          include_in_sitemap?: boolean | null
          is_active?: boolean | null
          meta_description?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_name?: string
          page_path?: string
          robots_follow?: boolean | null
          robots_index?: boolean | null
          schema_data?: Json | null
          schema_type?: string | null
          title_tag?: string | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      service_cards: {
        Row: {
          created_at: string | null
          description: string
          features: Json | null
          gradient: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          service_type: string
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          features?: Json | null
          gradient?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          service_type: string
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          features?: Json | null
          gradient?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          service_type?: string
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      service_case_studies: {
        Row: {
          client_name: string | null
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          industry: string | null
          is_active: boolean | null
          is_featured: boolean | null
          results: Json
          service_type: string
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          client_name?: string | null
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          industry?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          results?: Json
          service_type: string
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          client_name?: string | null
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          industry?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          results?: Json
          service_type?: string
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      service_pages: {
        Row: {
          created_at: string | null
          description: string | null
          hero_image: string | null
          is_active: boolean | null
          meta_description: string | null
          meta_title: string | null
          service_type: string
          subtitle: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          hero_image?: string | null
          is_active?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          service_type: string
          subtitle?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          hero_image?: string | null
          is_active?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          service_type?: string
          subtitle?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      service_reviews: {
        Row: {
          avatar_url: string | null
          client_name: string
          company: string
          created_at: string | null
          id: string
          is_active: boolean | null
          rating: number
          results_achieved: string | null
          review_text: string
          service_type: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          client_name: string
          company: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          rating: number
          results_achieved?: string | null
          review_text: string
          service_type: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          client_name?: string
          company?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          rating?: number
          results_achieved?: string | null
          review_text?: string
          service_type?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      service_stats: {
        Row: {
          created_at: string | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          service_type: string
          sort_order: number | null
          stat_description: string | null
          stat_label: string
          stat_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          service_type: string
          sort_order?: number | null
          stat_description?: string | null
          stat_label: string
          stat_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          service_type?: string
          sort_order?: number | null
          stat_description?: string | null
          stat_label?: string
          stat_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          permissions: Json | null
          role: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      website_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_type: string | null
          setting_value: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_type?: string | null
          setting_value?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_type?: string | null
          setting_value?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
