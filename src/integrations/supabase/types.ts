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
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      admin_tasks: {
        Row: {
          assignee: string | null
          category: string
          completed_at: string | null
          created_at: string
          created_by: string | null
          due_date: string | null
          id: string
          notes: string | null
          start_date: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assignee?: string | null
          category?: string
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          start_date?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assignee?: string | null
          category?: string
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      choreographies: {
        Row: {
          archived_at: string | null
          category: string
          created_at: string
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          reel_url: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          archived_at?: string | null
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          reel_url?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          archived_at?: string | null
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          reel_url?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      dance_styles: {
        Row: {
          archived_at: string | null
          benefits: string[]
          created_at: string
          display_order: number
          faq: Json
          hero_image_url: string | null
          id: string
          image_url: string | null
          is_active: boolean
          learning_points: string[]
          long_description: string | null
          name: string
          reel_url: string | null
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          benefits?: string[]
          created_at?: string
          display_order?: number
          faq?: Json
          hero_image_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          learning_points?: string[]
          long_description?: string | null
          name: string
          reel_url?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          benefits?: string[]
          created_at?: string
          display_order?: number
          faq?: Json
          hero_image_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          learning_points?: string[]
          long_description?: string | null
          name?: string
          reel_url?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      enrollment_campaigns: {
        Row: {
          created_at: string
          cta_label: string
          dance_style_id: string | null
          display_order: number
          end_date: string | null
          id: string
          is_active: boolean
          start_date: string | null
          style_label: string | null
          title: string
          updated_at: string
          whatsapp_message: string | null
        }
        Insert: {
          created_at?: string
          cta_label?: string
          dance_style_id?: string | null
          display_order?: number
          end_date?: string | null
          id?: string
          is_active?: boolean
          start_date?: string | null
          style_label?: string | null
          title: string
          updated_at?: string
          whatsapp_message?: string | null
        }
        Update: {
          created_at?: string
          cta_label?: string
          dance_style_id?: string | null
          display_order?: number
          end_date?: string | null
          id?: string
          is_active?: boolean
          start_date?: string | null
          style_label?: string | null
          title?: string
          updated_at?: string
          whatsapp_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_campaigns_dance_style_id_fkey"
            columns: ["dance_style_id"]
            isOneToOne: false
            referencedRelation: "dance_styles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          archived_at: string | null
          created_at: string
          end_date: string | null
          event_type: string | null
          external_url: string | null
          facebook_event_url: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_featured: boolean
          location: string | null
          registration_url: string | null
          short_description: string | null
          slug: string | null
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          end_date?: string | null
          event_type?: string | null
          external_url?: string | null
          facebook_event_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          location?: string | null
          registration_url?: string | null
          short_description?: string | null
          slug?: string | null
          start_date: string
          title: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          end_date?: string | null
          event_type?: string | null
          external_url?: string | null
          facebook_event_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          location?: string | null
          registration_url?: string | null
          short_description?: string | null
          slug?: string | null
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          admin_notes: string | null
          allow_testimonial: boolean
          course_label: string | null
          created_at: string
          email: string | null
          id: string
          instructor_id: string | null
          instructor_label: string | null
          message: string | null
          name: string | null
          rating: number | null
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          allow_testimonial?: boolean
          course_label?: string | null
          created_at?: string
          email?: string | null
          id?: string
          instructor_id?: string | null
          instructor_label?: string | null
          message?: string | null
          name?: string | null
          rating?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          allow_testimonial?: boolean
          course_label?: string | null
          created_at?: string
          email?: string | null
          id?: string
          instructor_id?: string | null
          instructor_label?: string | null
          message?: string | null
          name?: string | null
          rating?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submission_log: {
        Row: {
          created_at: string
          form_type: string
          id: string
          ip_hash: string
        }
        Insert: {
          created_at?: string
          form_type: string
          id?: string
          ip_hash: string
        }
        Update: {
          created_at?: string
          form_type?: string
          id?: string
          ip_hash?: string
        }
        Relationships: []
      }
      instructors: {
        Row: {
          achievements: string | null
          archived_at: string | null
          biography: string | null
          created_at: string
          dance_history: string | null
          dance_meaning: string | null
          display_order: number
          facebook_url: string | null
          id: string
          image_url: string | null
          instagram_url: string | null
          is_active: boolean
          name: string
          role_title: string | null
          short_description: string | null
          slug: string
          styles: string[]
          tiktok_url: string | null
          updated_at: string
        }
        Insert: {
          achievements?: string | null
          archived_at?: string | null
          biography?: string | null
          created_at?: string
          dance_history?: string | null
          dance_meaning?: string | null
          display_order?: number
          facebook_url?: string | null
          id?: string
          image_url?: string | null
          instagram_url?: string | null
          is_active?: boolean
          name: string
          role_title?: string | null
          short_description?: string | null
          slug: string
          styles?: string[]
          tiktok_url?: string | null
          updated_at?: string
        }
        Update: {
          achievements?: string | null
          archived_at?: string | null
          biography?: string | null
          created_at?: string
          dance_history?: string | null
          dance_meaning?: string | null
          display_order?: number
          facebook_url?: string | null
          id?: string
          image_url?: string | null
          instagram_url?: string | null
          is_active?: boolean
          name?: string
          role_title?: string | null
          short_description?: string | null
          slug?: string
          styles?: string[]
          tiktok_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      party_events: {
        Row: {
          archived_at: string | null
          created_at: string
          display_order: number
          external_url: string | null
          facebook_album_url: string | null
          id: string
          image_url: string | null
          is_active: boolean
          party_date: string | null
          short_description: string | null
          title: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          display_order?: number
          external_url?: string | null
          facebook_album_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          party_date?: string | null
          short_description?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          display_order?: number
          external_url?: string | null
          facebook_album_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          party_date?: string | null
          short_description?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pricing_packages: {
        Row: {
          archived_at: string | null
          category: string
          created_at: string
          description: string | null
          discounted_price: number | null
          display_order: number
          eligibility_notes: string | null
          id: string
          is_active: boolean
          is_featured: boolean
          name: string
          price: number
          price_unit: string
          sessions_count: number | null
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          category?: string
          created_at?: string
          description?: string | null
          discounted_price?: number | null
          display_order?: number
          eligibility_notes?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          name: string
          price: number
          price_unit?: string
          sessions_count?: number | null
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          category?: string
          created_at?: string
          description?: string | null
          discounted_price?: number | null
          display_order?: number
          eligibility_notes?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          name?: string
          price?: number
          price_unit?: string
          sessions_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          admin_notes: string | null
          created_at: string
          email: string
          first_name: string
          gdpr_consent: boolean
          gdpr_consent_at: string | null
          id: string
          last_name: string
          message: string | null
          phone: string
          selected_course: string | null
          source_page: string | null
          status: string
          updated_at: string
          who_am_i: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          email: string
          first_name: string
          gdpr_consent?: boolean
          gdpr_consent_at?: string | null
          id?: string
          last_name: string
          message?: string | null
          phone: string
          selected_course?: string | null
          source_page?: string | null
          status?: string
          updated_at?: string
          who_am_i?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          email?: string
          first_name?: string
          gdpr_consent?: boolean
          gdpr_consent_at?: string | null
          id?: string
          last_name?: string
          message?: string | null
          phone?: string
          selected_course?: string | null
          source_page?: string | null
          status?: string
          updated_at?: string
          who_am_i?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_order: number
          id: string
          is_active: boolean
          rating: number
          review_date: string | null
          review_text: string | null
          reviewer_name: string
          source: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          rating?: number
          review_date?: string | null
          review_text?: string | null
          reviewer_name: string
          source?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          rating?: number
          review_date?: string | null
          review_text?: string | null
          reviewer_name?: string
          source?: string
          updated_at?: string
        }
        Relationships: []
      }
      schedule_entries: {
        Row: {
          archived_at: string | null
          created_at: string
          dance_style_id: string | null
          day_of_week: number
          display_order: number
          end_time: string | null
          id: string
          instructor_ids: string[]
          instructor_names: string | null
          is_active: boolean
          is_special: boolean
          level: string | null
          notes: string | null
          room: string
          start_time: string
          status: string
          style_label: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          dance_style_id?: string | null
          day_of_week: number
          display_order?: number
          end_time?: string | null
          id?: string
          instructor_ids?: string[]
          instructor_names?: string | null
          is_active?: boolean
          is_special?: boolean
          level?: string | null
          notes?: string | null
          room?: string
          start_time: string
          status?: string
          style_label: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          dance_style_id?: string | null
          day_of_week?: number
          display_order?: number
          end_time?: string | null
          id?: string
          instructor_ids?: string[]
          instructor_names?: string | null
          is_active?: boolean
          is_special?: boolean
          level?: string | null
          notes?: string | null
          room?: string
          start_time?: string
          status?: string
          style_label?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_entries_dance_style_id_fkey"
            columns: ["dance_style_id"]
            isOneToOne: false
            referencedRelation: "dance_styles"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          is_public: boolean
          key: string
          label: string | null
          updated_at: string
          value: string | null
        }
        Insert: {
          is_public?: boolean
          key: string
          label?: string | null
          updated_at?: string
          value?: string | null
        }
        Update: {
          is_public?: boolean
          key?: string
          label?: string | null
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_notifications: {
        Row: {
          created_at: string
          error: string | null
          id: string
          provider_message_id: string | null
          recipient: string
          registration_id: string | null
          status: string
          status_updated_at: string | null
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: string
          provider_message_id?: string | null
          recipient: string
          registration_id?: string | null
          status?: string
          status_updated_at?: string | null
        }
        Update: {
          created_at?: string
          error?: string | null
          id?: string
          provider_message_id?: string | null
          recipient?: string
          registration_id?: string | null
          status?: string
          status_updated_at?: string | null
        }
        Relationships: []
      }
      whatsapp_webhook_events: {
        Row: {
          delivery_id: string
          event: string
          id: string
          payload: Json
          processed_at: string | null
          processing_error: string | null
          received_at: string
        }
        Insert: {
          delivery_id: string
          event: string
          id?: string
          payload: Json
          processed_at?: string | null
          processing_error?: string | null
          received_at?: string
        }
        Update: {
          delivery_id?: string
          event?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          processing_error?: string | null
          received_at?: string
        }
        Relationships: []
      }
      why_magnitude_items: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean
          reel_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          reel_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          reel_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user"],
    },
  },
} as const
