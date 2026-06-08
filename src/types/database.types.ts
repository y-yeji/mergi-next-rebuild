export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      notifications: {
        Row: {
          checked: boolean | null;
          created_at: string;
          id: number;
          post_id: number | null;
          post_title: string | null;
          seen: boolean | null;
          sender_id: number | null;
          sender_name: string | null;
          type: string | null;
          user_id: string | null;
        };
        Insert: {
          checked?: boolean | null;
          created_at?: string;
          id?: number;
          post_id?: number | null;
          post_title?: string | null;
          seen?: boolean | null;
          sender_id?: number | null;
          sender_name?: string | null;
          type?: string | null;
          user_id?: string | null;
        };
        Update: {
          checked?: boolean | null;
          created_at?: string;
          id?: number;
          post_id?: number | null;
          post_title?: string | null;
          seen?: boolean | null;
          sender_id?: number | null;
          sender_name?: string | null;
          type?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      post: {
        Row: {
          author: string;
          call_link: string;
          call_method: string;
          content: string;
          created_at: string;
          end_date: string;
          finished: boolean | null;
          id: number;
          on_offline: string;
          post_img_path: string[] | null;
          recruit_count: number;
          recruit_deadline: string;
          recruit_field: string;
          recruit_type: string;
          saved_position_and_stack: Json[] | null;
          start_date: string;
          title: string;
        };
        Insert: {
          author: string;
          call_link: string;
          call_method: string;
          content: string;
          created_at?: string;
          end_date: string;
          finished?: boolean | null;
          id?: number;
          on_offline: string;
          post_img_path?: string[] | null;
          recruit_count: number;
          recruit_deadline: string;
          recruit_field: string;
          recruit_type: string;
          saved_position_and_stack?: Json[] | null;
          start_date: string;
          title: string;
        };
        Update: {
          author?: string;
          call_link?: string;
          call_method?: string;
          content?: string;
          created_at?: string;
          end_date?: string;
          finished?: boolean | null;
          id?: number;
          on_offline?: string;
          post_img_path?: string[] | null;
          recruit_count?: number;
          recruit_deadline?: string;
          recruit_field?: string;
          recruit_type?: string;
          saved_position_and_stack?: Json[] | null;
          start_date?: string;
          title?: string;
        };
        Relationships: [];
      };
      post_apply_list: {
        Row: {
          accepted: boolean | null;
          created_at: string;
          finished: boolean | null;
          host_id: string | null;
          id: number;
          post_id: number | null;
          post_title: string | null;
          proposer_id: string;
          proposer_img_path: string | null;
          proposer_name: string | null;
          proposer_positions: string | null;
        };
        Insert: {
          accepted?: boolean | null;
          created_at?: string;
          finished?: boolean | null;
          host_id?: string | null;
          id?: number;
          post_id?: number | null;
          post_title?: string | null;
          proposer_id?: string;
          proposer_img_path?: string | null;
          proposer_name?: string | null;
          proposer_positions?: string | null;
        };
        Update: {
          accepted?: boolean | null;
          created_at?: string;
          finished?: boolean | null;
          host_id?: string | null;
          id?: number;
          post_id?: number | null;
          post_title?: string | null;
          proposer_id?: string;
          proposer_img_path?: string | null;
          proposer_name?: string | null;
          proposer_positions?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_apply_list_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
        ];
      };
      post_bookmark: {
        Row: {
          created_at: string;
          id: number;
          post_id: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_bookmark_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
        ];
      };
      post_comments: {
        Row: {
          commenter_image_pathcommenter_image_path: string | null;
          commenter_name: string;
          content: string;
          created_at: string;
          id: number;
          parent_id: number;
          post_id: number;
          user_list_id: number | null;
        };
        Insert: {
          commenter_image_pathcommenter_image_path?: string | null;
          commenter_name: string;
          content: string;
          created_at: string;
          id?: number;
          parent_id: number;
          post_id: number;
          user_list_id?: number | null;
        };
        Update: {
          commenter_image_pathcommenter_image_path?: string | null;
          commenter_name?: string;
          content?: string;
          created_at?: string;
          id?: number;
          parent_id?: number;
          post_id?: number;
          user_list_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_comments_user_list_id_fkey";
            columns: ["user_list_id"];
            isOneToOne: false;
            referencedRelation: "user_list";
            referencedColumns: ["id"];
          },
        ];
      };
      post_like: {
        Row: {
          created_at: string;
          id: number;
          post_id: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_like_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
        ];
      };
      post_positions: {
        Row: {
          created_at: string;
          id: number;
          position: string | null;
          post_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          position?: string | null;
          post_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          position?: string | null;
          post_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_positions_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
        ];
      };
      post_stacks: {
        Row: {
          created_at: string;
          id: number;
          post_id: number | null;
          stack: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id?: number | null;
          stack?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: number | null;
          stack?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_stacks_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
        ];
      };
      user_list: {
        Row: {
          bookmarks: Json[] | null;
          created_at: string;
          id: number;
          link: string[] | null;
          long_introduce: string | null;
          name: string | null;
          profile_img_path: string | null;
          short_introduce: string | null;
          user_id: string | null;
        };
        Insert: {
          bookmarks?: Json[] | null;
          created_at: string;
          id?: number;
          link?: string[] | null;
          long_introduce?: string | null;
          name?: string | null;
          profile_img_path?: string | null;
          short_introduce?: string | null;
          user_id?: string | null;
        };
        Update: {
          bookmarks?: Json[] | null;
          created_at?: string;
          id?: number;
          link?: string[] | null;
          long_introduce?: string | null;
          name?: string | null;
          profile_img_path?: string | null;
          short_introduce?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      user_list_positions: {
        Row: {
          created_at: string;
          id: number;
          position: string | null;
          profile_id: number | null;
        };
        Insert: {
          created_at: string;
          id?: number;
          position?: string | null;
          profile_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          position?: string | null;
          profile_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_list_positions_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "user_list";
            referencedColumns: ["id"];
          },
        ];
      };
      user_list_stacks: {
        Row: {
          created_at: string;
          id: number;
          position_id: number | null;
          stacks: string[] | null;
        };
        Insert: {
          created_at: string;
          id?: number;
          position_id?: number | null;
          stacks?: string[] | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          position_id?: number | null;
          stacks?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_list_stacks_position_id_fkey";
            columns: ["position_id"];
            isOneToOne: false;
            referencedRelation: "user_list_positions";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
