// Supabase client for auth and progress sync
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });
  
  if (error) {
    return { data: null, error: { message: translateError(error.message) } };
  }
  
  return { data, error: null };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    return { data: null, error: { message: translateError(error.message) } };
  }
  
  return { data, error: null };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

export const signInAsGuest = async () => {
  // Guest mode: localStorage only (no cloud sync, no account needed)
  // Progress will be saved locally on this device
  localStorage.setItem('mulk30_guest_mode', 'true');
  
  // Generate or reuse guest ID
  let guestId = localStorage.getItem('mulk30_guest_id');
  if (!guestId) {
    guestId = crypto.randomUUID().slice(0, 8);
    localStorage.setItem('mulk30_guest_id', guestId);
  }
  
  // Track guest session in Supabase (anonymous)
  try {
    await supabase.from('guest_sessions').upsert({
      guest_id: guestId,
      last_active: new Date().toISOString()
    }, { onConflict: 'guest_id' });
  } catch (e) {
    console.log('[Guest] Tracking failed:', e);
  }
  
  window.location.href = '/app';
};

// Track guest activity (call when viewing a day)
export const trackGuestDay = async (dayIndex: number) => {
  const guestId = localStorage.getItem('mulk30_guest_id');
  if (!guestId) return;
  
  try {
    // Get current days_viewed
    const { data } = await supabase
      .from('guest_sessions')
      .select('days_viewed')
      .eq('guest_id', guestId)
      .single();
    
    const currentDays = data?.days_viewed || [];
    if (!currentDays.includes(dayIndex)) {
      currentDays.push(dayIndex);
      currentDays.sort((a: number, b: number) => a - b);
    }
    
    await supabase.from('guest_sessions').upsert({
      guest_id: guestId,
      last_active: new Date().toISOString(),
      days_viewed: currentDays
    }, { onConflict: 'guest_id' });
  } catch (e) {
    console.log('[Guest] Day tracking failed:', e);
  }
};

// Translate common Supabase errors to Albanian
function translateError(message: string): string {
  const translations: Record<string, string> = {
    'Invalid login credentials': 'Email ose fjalëkalimi i gabuar',
    'Email not confirmed': 'Emaili nuk është konfirmuar',
    'User already registered': 'Ky email është i regjistruar',
    'Password should be at least 6 characters': 'Fjalëkalimi duhet të ketë të paktën 6 karaktere',
    'Unable to validate email address: invalid format': 'Formati i emailit nuk është i vlefshëm',
  };
  return translations[message] || message;
}
