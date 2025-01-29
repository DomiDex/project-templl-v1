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
          is_pro: boolean;
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
      stacks: {
        Row: {
          id: string;
          stack_name: string;
          path: string;
          meta_description: string | null;
          long_description: string | null;
          icon: string | null;
          og_image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['stacks']['Row'],
          'id' | 'path' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['stacks']['Insert']>;
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          category_name: string;
          path: string;
          meta_description: string | null;
          long_description: string | null;
          icon: string | null;
          og_image: string | null;
          stack_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['categories']['Row'],
          'id' | 'path' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
        Relationships: [
          {
            foreignKeyName: 'categories_stack_id_fkey';
            columns: ['stack_id'];
            referencedRelation: 'stacks';
            referencedColumns: ['id'];
          }
        ];
      };
      projects: {
        Row: {
          id: string;
          project_name: string;
          path: string;
          stack_id: string;
          user_id: string;
          project_link: string | null;
          meta_title: string | null;
          meta_description: string | null;
          long_description: string | null;
          og_image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['projects']['Row'],
          'id' | 'path' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
        Relationships: [
          {
            foreignKeyName: 'projects_stack_id_fkey';
            columns: ['stack_id'];
            referencedRelation: 'stacks';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'projects_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      templates: {
        Row: {
          id: string;
          template_name: string;
          path: string;
          category_id: string;
          stack_id: string;
          user_id: string;
          featured: boolean;
          template_link: string | null;
          meta_title: string | null;
          meta_description: string | null;
          long_description: string | null;
          og_image_url: string | null;
          thumbnail_image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['templates']['Row'],
          'id' | 'path' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['templates']['Insert']>;
        Relationships: [
          {
            foreignKeyName: 'templates_category_id_fkey';
            columns: ['category_id'];
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'templates_stack_id_fkey';
            columns: ['stack_id'];
            referencedRelation: 'stacks';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'templates_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      services: {
        Row: {
          id: string;
          service_name: string;
          path: string;
          stack_id: string;
          user_id: string;
          project_id: string;
          template_id: string;
          featured: boolean;
          price: number;
          meta_title: string | null;
          meta_description: string | null;
          long_description: string | null;
          og_image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['services']['Row'],
          'id' | 'path' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['services']['Insert']>;
        Relationships: [
          {
            foreignKeyName: 'services_stack_id_fkey';
            columns: ['stack_id'];
            referencedRelation: 'stacks';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'services_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'services_project_id_fkey';
            columns: ['project_id'];
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'services_template_id_fkey';
            columns: ['template_id'];
            referencedRelation: 'templates';
            referencedColumns: ['id'];
          }
        ];
      };
      project_counts: {
        Row: {
          id: string;
          user_id: string;
          project_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['project_counts']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<
          Database['public']['Tables']['project_counts']['Insert']
        >;
        Relationships: [
          {
            foreignKeyName: 'project_counts_user_id_fkey';
            columns: ['user_id'];
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

// Add new utility types for the new tables
export type Stack = Tables['stacks']['Row'];
export type Category = Tables['categories']['Row'];
export type Project = Tables['projects']['Row'];
export type Template = Tables['templates']['Row'];
export type Service = Tables['services']['Row'];
export type ProjectCount = Tables['project_counts']['Row'];

// Type for the Supabase client
export type TypedSupabaseClient = SupabaseClient<Database>;

// Helper type for getting table types
export type TableRow<T extends keyof Tables> = Tables[T]['Row'];
export type TableInsert<T extends keyof Tables> = Tables[T]['Insert'];
export type TableUpdate<T extends keyof Tables> = Tables[T]['Update'];
