
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseInstance = null;

try {
    if (supabaseUrl && supabaseAnonKey) {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    } else {
        console.error('Supabase credentials missing! Check .env file.')
    }
} catch (error) {
    console.error('Failed to initialize Supabase client:', error);
}

export const supabase = supabaseInstance;
