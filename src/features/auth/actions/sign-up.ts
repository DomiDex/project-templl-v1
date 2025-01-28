'use server';

import { createClient } from '@/utils/supabase/server';
import { SignUpFormData, SignUpSchema } from '../types';

export async function signUp(formData: SignUpFormData) {
  try {
    // Validate the form data first
    const validatedData = SignUpSchema.parse(formData);

    const supabase = await createClient();

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        data: {
          username: validatedData.username,
        },
      },
    });

    if (authError) {
      console.error('Auth error:', authError);
      return { error: authError.message };
    }

    if (!authData.user) {
      return { error: 'Failed to create user' };
    }

    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select()
      .eq('id', authData.user.id)
      .single();

    if (existingProfile) {
      return { success: true };
    }

    // Create profile
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      profile_username: validatedData.username,
      profile_email: validatedData.email,
      path: `/profile/${validatedData.username}`,
    });

    if (profileError) {
      console.error('Profile error:', profileError);
      return { error: 'Failed to create profile. Please try again.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Sign up error:', error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unexpected error occurred' };
  }
}
