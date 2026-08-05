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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      campaigns: {
        Row: {
          campaign_name: string
          created_at: string
          id: string
          platform: string | null
          status: string
          updated_at: string
        }
        Insert: {
          campaign_name: string
          created_at?: string
          id?: string
          platform?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          campaign_name?: string
          created_at?: string
          id?: string
          platform?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          item_slug: string
          item_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_slug: string
          item_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_slug?: string
          item_type?: string
          user_id?: string
        }
        Relationships: []
      }
      funnel_settings: {
        Row: {
          checkout_url: string
          id: string
          updated_at: string
        }
        Insert: {
          checkout_url: string
          id?: string
          updated_at?: string
        }
        Update: {
          checkout_url?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      lead_events: {
        Row: {
          created_at: string
          event_name: string
          funnel_step: string | null
          id: string
          lead_id: string | null
          metadata: Json | null
          page_url: string | null
          session_id: string
        }
        Insert: {
          created_at?: string
          event_name: string
          funnel_step?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          page_url?: string | null
          session_id: string
        }
        Update: {
          created_at?: string
          event_name?: string
          funnel_step?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          page_url?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          browser: string | null
          campaign: string | null
          city: string | null
          content: string | null
          country: string | null
          created_at: string
          current_step: string
          device: string | null
          email: string | null
          id: string
          last_action_at: string
          medium: string | null
          name: string | null
          phone: string | null
          referrer: string | null
          session_id: string
          source: string | null
          status: string
          term: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          browser?: string | null
          campaign?: string | null
          city?: string | null
          content?: string | null
          country?: string | null
          created_at?: string
          current_step?: string
          device?: string | null
          email?: string | null
          id?: string
          last_action_at?: string
          medium?: string | null
          name?: string | null
          phone?: string | null
          referrer?: string | null
          session_id: string
          source?: string | null
          status?: string
          term?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          browser?: string | null
          campaign?: string | null
          city?: string | null
          content?: string | null
          country?: string | null
          created_at?: string
          current_step?: string
          device?: string | null
          email?: string | null
          id?: string
          last_action_at?: string
          medium?: string | null
          name?: string | null
          phone?: string | null
          referrer?: string | null
          session_id?: string
          source?: string | null
          status?: string
          term?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          baby_birth_date: string | null
          baby_name: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          baby_birth_date?: string | null
          baby_name?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          baby_birth_date?: string | null
          baby_name?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      quiz_answers: {
        Row: {
          answer: string | null
          created_at: string
          id: string
          lead_id: string | null
          question_id: string
          question_text: string | null
          session_id: string
        }
        Insert: {
          answer?: string | null
          created_at?: string
          id?: string
          lead_id?: string | null
          question_id: string
          question_text?: string | null
          session_id: string
        }
        Update: {
          answer?: string | null
          created_at?: string
          id?: string
          lead_id?: string | null
          question_id?: string
          question_text?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_answers_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
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
    }
    Enums: {
      app_role: "admin"
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
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
