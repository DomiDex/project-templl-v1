import { SupabaseClient } from '@supabase/supabase-js';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          profile_image: string | null;
          profile_description: string | null;
          profile_email: string;
          profile_username: string;
          path: string;
          website_url: string | null;
          x_profile_url: string | null;
          linkedin_profile_url: string | null;
          github_profile_url: string | null;
          whatsapp_phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['profiles']['Row'],
          'id' | 'path' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Utility types for easier usage
export type Tables = Database['public']['Tables'];
export type Profile = Tables['profiles']['Row'];
export type ProfileInsert = Tables['profiles']['Insert'];
export type ProfileUpdate = Tables['profiles']['Update'];

// Type for the Supabase client
export type TypedSupabaseClient = SupabaseClient<Database>;

// Helper type for getting table types
export type TableRow<T extends keyof Tables> = Tables[T]['Row'];
export type TableInsert<T extends keyof Tables> = Tables[T]['Insert'];
export type TableUpdate<T extends keyof Tables> = Tables[T]['Update'];
