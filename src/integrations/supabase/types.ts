export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
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
          ip_address: unknown
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
          ip_address?: unknown
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
          ip_address?: unknown
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      auth0_config: {
        Row: {
          audience: string | null
          client_id: string
          created_at: string
          domain: string
          id: string
          is_active: boolean
          redirect_uri: string
          scope: string
          updated_at: string
        }
        Insert: {
          audience?: string | null
          client_id: string
          created_at?: string
          domain: string
          id?: string
          is_active?: boolean
          redirect_uri: string
          scope?: string
          updated_at?: string
        }
        Update: {
          audience?: string | null
          client_id?: string
          created_at?: string
          domain?: string
          id?: string
          is_active?: boolean
          redirect_uri?: string
          scope?: string
          updated_at?: string
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
      case_studies: {
        Row: {
          client_name: string | null
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          industry: string | null
          is_active: boolean | null
          is_featured: boolean | null
          results: Json | null
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
          results?: Json | null
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
          results?: Json | null
          service_type?: string
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      clerk_config: {
        Row: {
          after_sign_in_url: string | null
          after_sign_up_url: string | null
          created_at: string
          id: string
          is_active: boolean
          publishable_key: string
          sign_in_url: string | null
          sign_up_url: string | null
          updated_at: string
        }
        Insert: {
          after_sign_in_url?: string | null
          after_sign_up_url?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          publishable_key: string
          sign_in_url?: string | null
          sign_up_url?: string | null
          updated_at?: string
        }
        Update: {
          after_sign_in_url?: string | null
          after_sign_up_url?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          publishable_key?: string
          sign_in_url?: string | null
          sign_up_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      clientele_logos: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_active: boolean
          name: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean
          name: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean
          name?: string
          sort_order?: number | null
          updated_at?: string
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
      cta_data: {
        Row: {
          background_style: string | null
          created_at: string
          description: string
          id: string
          is_active: boolean | null
          primary_button_link: string
          primary_button_text: string
          secondary_button_link: string | null
          secondary_button_text: string | null
          show_secondary_button: boolean | null
          subtitle: string
          title: string
          updated_at: string
        }
        Insert: {
          background_style?: string | null
          created_at?: string
          description: string
          id?: string
          is_active?: boolean | null
          primary_button_link: string
          primary_button_text: string
          secondary_button_link?: string | null
          secondary_button_text?: string | null
          show_secondary_button?: boolean | null
          subtitle: string
          title: string
          updated_at?: string
        }
        Update: {
          background_style?: string | null
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean | null
          primary_button_link?: string
          primary_button_text?: string
          secondary_button_link?: string | null
          secondary_button_text?: string | null
          show_secondary_button?: boolean | null
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          average_order_value: number | null
          created_at: string
          customer_since: string | null
          default_billing_address: Json | null
          default_shipping_address: Json | null
          email: string | null
          external_customer_id: string | null
          id: string
          last_order_date: string | null
          name: string
          notes: string | null
          phone: string | null
          platform: string
          status: string | null
          tags: string[] | null
          total_orders: number | null
          total_spent: number | null
          updated_at: string
        }
        Insert: {
          average_order_value?: number | null
          created_at?: string
          customer_since?: string | null
          default_billing_address?: Json | null
          default_shipping_address?: Json | null
          email?: string | null
          external_customer_id?: string | null
          id?: string
          last_order_date?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          platform: string
          status?: string | null
          tags?: string[] | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string
        }
        Update: {
          average_order_value?: number | null
          created_at?: string
          customer_since?: string | null
          default_billing_address?: Json | null
          default_shipping_address?: Json | null
          email?: string | null
          external_customer_id?: string | null
          id?: string
          last_order_date?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          platform?: string
          status?: string | null
          tags?: string[] | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      email_settings: {
        Row: {
          created_at: string
          from_email: string
          from_name: string
          id: string
          is_active: boolean
          smtp_host: string
          smtp_pass: string
          smtp_port: number
          smtp_secure: boolean
          smtp_user: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_email: string
          from_name: string
          id?: string
          is_active?: boolean
          smtp_host: string
          smtp_pass: string
          smtp_port: number
          smtp_secure?: boolean
          smtp_user: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_email?: string
          from_name?: string
          id?: string
          is_active?: boolean
          smtp_host?: string
          smtp_pass?: string
          smtp_port?: number
          smtp_secure?: boolean
          smtp_user?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          subject: string
          trigger_event: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          subject: string
          trigger_event: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          subject?: string
          trigger_event?: string
          updated_at?: string
        }
        Relationships: []
      }
      facebook_pixel_config: {
        Row: {
          access_token: string | null
          created_at: string
          id: string
          is_active: boolean
          pixel_id: string
          test_event_code: string | null
          updated_at: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          pixel_id: string
          test_event_code?: string | null
          updated_at?: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          pixel_id?: string
          test_event_code?: string | null
          updated_at?: string
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
      google_analytics_config: {
        Row: {
          created_at: string
          custom_events: boolean
          enable_conversion_tracking: boolean
          enable_enhanced_measurement: boolean
          id: string
          is_active: boolean
          measurement_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          custom_events?: boolean
          enable_conversion_tracking?: boolean
          enable_enhanced_measurement?: boolean
          id?: string
          is_active?: boolean
          measurement_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          custom_events?: boolean
          enable_conversion_tracking?: boolean
          enable_enhanced_measurement?: boolean
          id?: string
          is_active?: boolean
          measurement_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      google_search_console_config: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          site_url: string
          updated_at: string
          verification_code: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          site_url: string
          updated_at?: string
          verification_code?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          site_url?: string
          updated_at?: string
          verification_code?: string | null
        }
        Relationships: []
      }
      google_tag_manager_config: {
        Row: {
          container_id: string
          created_at: string
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          container_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          container_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          updated_at?: string
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
          audit_type: string | null
          company: string | null
          created_at: string | null
          current_spend: string | null
          email: string
          form_security: Json | null
          goals: string | null
          id: string
          lead_data: Json | null
          lead_number: string | null
          name: string
          notes: string | null
          phone: string | null
          source: string | null
          status: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          assigned_to?: string | null
          audit_type?: string | null
          company?: string | null
          created_at?: string | null
          current_spend?: string | null
          email: string
          form_security?: Json | null
          goals?: string | null
          id?: string
          lead_data?: Json | null
          lead_number?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          assigned_to?: string | null
          audit_type?: string | null
          company?: string | null
          created_at?: string | null
          current_spend?: string | null
          email?: string
          form_security?: Json | null
          goals?: string | null
          id?: string
          lead_data?: Json | null
          lead_number?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      newsletter_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          source: string | null
          status: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          source?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          source?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          platform_listing_id: string | null
          product_id: string | null
          product_title: string
          quantity: number
          sku: string
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          platform_listing_id?: string | null
          product_id?: string | null
          product_title: string
          quantity: number
          sku: string
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          platform_listing_id?: string | null
          product_id?: string | null
          product_title?: string
          quantity?: number
          sku?: string
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_platform_listing_id_fkey"
            columns: ["platform_listing_id"]
            isOneToOne: false
            referencedRelation: "platform_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_address: Json | null
          created_at: string
          currency: string | null
          customer_email: string | null
          customer_id: string | null
          customer_name: string | null
          discount_amount: number | null
          external_order_id: string
          fulfillment_status: string | null
          id: string
          notes: string | null
          order_date: string
          order_number: string
          payment_status: string | null
          platform: string
          shipped_date: string | null
          shipping_address: Json | null
          shipping_amount: number | null
          status: string | null
          tax_amount: number | null
          total_amount: number
          tracking_number: string | null
          updated_at: string
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string
          currency?: string | null
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string | null
          discount_amount?: number | null
          external_order_id: string
          fulfillment_status?: string | null
          id?: string
          notes?: string | null
          order_date: string
          order_number: string
          payment_status?: string | null
          platform: string
          shipped_date?: string | null
          shipping_address?: Json | null
          shipping_amount?: number | null
          status?: string | null
          tax_amount?: number | null
          total_amount: number
          tracking_number?: string | null
          updated_at?: string
        }
        Update: {
          billing_address?: Json | null
          created_at?: string
          currency?: string | null
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string | null
          discount_amount?: number | null
          external_order_id?: string
          fulfillment_status?: string | null
          id?: string
          notes?: string | null
          order_date?: string
          order_number?: string
          payment_status?: string | null
          platform?: string
          shipped_date?: string | null
          shipping_address?: Json | null
          shipping_amount?: number | null
          status?: string | null
          tax_amount?: number | null
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      partner_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_active: boolean
          name: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean
          name: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean
          name?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      platform_integrations: {
        Row: {
          api_credentials: Json | null
          created_at: string
          id: string
          is_active: boolean
          last_sync_at: string | null
          platform: string
          sync_errors: Json | null
          sync_settings: Json | null
          sync_status: string | null
          updated_at: string
          webhook_url: string | null
        }
        Insert: {
          api_credentials?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean
          last_sync_at?: string | null
          platform: string
          sync_errors?: Json | null
          sync_settings?: Json | null
          sync_status?: string | null
          updated_at?: string
          webhook_url?: string | null
        }
        Update: {
          api_credentials?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean
          last_sync_at?: string | null
          platform?: string
          sync_errors?: Json | null
          sync_settings?: Json | null
          sync_status?: string | null
          updated_at?: string
          webhook_url?: string | null
        }
        Relationships: []
      }
      platform_listings: {
        Row: {
          created_at: string
          external_id: string
          external_sku: string | null
          id: string
          last_synced_at: string | null
          platform: string
          platform_price: number | null
          platform_stock: number | null
          platform_title: string | null
          product_id: string
          status: string | null
          sync_errors: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          external_id: string
          external_sku?: string | null
          id?: string
          last_synced_at?: string | null
          platform: string
          platform_price?: number | null
          platform_stock?: number | null
          platform_title?: string | null
          product_id: string
          status?: string | null
          sync_errors?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          external_id?: string
          external_sku?: string | null
          id?: string
          last_synced_at?: string | null
          platform?: string
          platform_price?: number | null
          platform_stock?: number | null
          platform_title?: string | null
          product_id?: string
          status?: string | null
          sync_errors?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "platform_listings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_pages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean
          last_updated: string
          page_type: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          last_updated: string
          page_type: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          last_updated?: string
          page_type?: string
          title?: string
          updated_at?: string
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
      products: {
        Row: {
          brand: string | null
          category: string | null
          cost: number | null
          created_at: string
          description: string | null
          dimensions: Json | null
          id: string
          images: Json | null
          min_stock_level: number | null
          price: number | null
          sku: string
          status: string | null
          stock_quantity: number | null
          tags: string[] | null
          title: string
          updated_at: string
          weight: number | null
        }
        Insert: {
          brand?: string | null
          category?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          dimensions?: Json | null
          id?: string
          images?: Json | null
          min_stock_level?: number | null
          price?: number | null
          sku: string
          status?: string | null
          stock_quantity?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
          weight?: number | null
        }
        Update: {
          brand?: string | null
          category?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          dimensions?: Json | null
          id?: string
          images?: Json | null
          min_stock_level?: number | null
          price?: number | null
          sku?: string
          status?: string | null
          stock_quantity?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          weight?: number | null
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
      reviews: {
        Row: {
          avatar: string | null
          company: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          rating: number
          review: string
          service_type: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          company: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          rating: number
          review: string
          service_type?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          company?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          rating?: number
          review?: string
          service_type?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id?: string | null
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
      services: {
        Row: {
          bg_gradient: string | null
          created_at: string | null
          description: string
          features: Json | null
          gradient: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          link: string | null
          service_type: string
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          bg_gradient?: string | null
          created_at?: string | null
          description: string
          features?: Json | null
          gradient?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          link?: string | null
          service_type: string
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          bg_gradient?: string | null
          created_at?: string | null
          description?: string
          features?: Json | null
          gradient?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          link?: string | null
          service_type?: string
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      stats: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          sort_order: number | null
          stat_key: string
          stat_label: string
          stat_value: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          sort_order?: number | null
          stat_key: string
          stat_label: string
          stat_value: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          sort_order?: number | null
          stat_key?: string
          stat_label?: string
          stat_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tracking_scripts: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          location: string
          name: string
          pages: string
          script: string
          selected_pages: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          location?: string
          name: string
          pages?: string
          script: string
          selected_pages?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          location?: string
          name?: string
          pages?: string
          script?: string
          selected_pages?: string[] | null
          updated_at?: string
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
      cleanup_old_lead_files: { Args: never; Returns: undefined }
      generate_lead_number: { Args: never; Returns: string }
      get_current_user_role: { Args: never; Returns: string }
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
