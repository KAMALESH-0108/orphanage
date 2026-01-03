import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';

// Helper to ensure we always pass a valid URL to createClient
// This prevents the app from crashing if the user hasn't set up their .env file yet
const getSupabaseUrl = () => {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  // Check if url exists, starts with http/https, and isn't the default placeholder
  if (url && url.startsWith('http') && !url.includes('YOUR_API_KEY')) {
    return url;
  }
  return 'https://placeholder.supabase.co';
};

const getSupabaseKey = () => {
  const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
  if (key && !key.includes('YOUR_API_KEY')) {
    return key;
  }
  return 'placeholder-key';
};

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseKey();

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: (key) => null,
      setItem: (key, value) => {},
      removeItem: (key) => {},
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// AppState listener for Supabase auth (optional but good practice)
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
