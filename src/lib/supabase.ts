import { createClient } from '@supabase/supabase-js';

// We'll need to set up environment variables for production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select();
  
  return { data, error };
}

export async function saveStory(story: Omit<import('../types').Story, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('stories')
    .insert([story])
    .select();
  
  return { data, error };
}

export async function getUserStories(userId: string) {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
}

export async function updateStory(id: string, updates: Partial<import('../types').Story>) {
  const { data, error } = await supabase
    .from('stories')
    .update(updates)
    .eq('id', id)
    .select();
  
  return { data, error };
}

export async function deleteStory(id: string) {
  const { error } = await supabase
    .from('stories')
    .delete()
    .eq('id', id);
  
  return { error };
}

export async function getSubscriptionTiers() {
  const { data, error } = await supabase
    .from('subscription_tiers')
    .select('*')
    .order('price', { ascending: true });
  
  return { data, error };
}

export async function resetMonthlyStories() {
  const { data, error } = await supabase.rpc('reset_monthly_stories');
  return { data, error };
}

export async function getDaysUntilReset() {
  const { data, error } = await supabase.rpc('get_days_until_reset');
  return { data: data || 0, error };
}