import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Clear stale/invalid tokens automatically so the error doesn't loop
if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
      if (!session) {
        // Remove all supabase auth keys from localStorage
        const keys = Object.keys(localStorage).filter((key) =>
          key.startsWith('sb-')
        )
        keys.forEach((key) => localStorage.removeItem(key))
      }
    }
  })
}
