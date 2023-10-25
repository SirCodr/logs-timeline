import { supabase } from '../supabaseClient'

export const signInWithGoogle = async () =>
  await supabase.auth.signInWithOAuth({
    provider: 'google'
  })

export const logout = async () => await supabase.auth.signOut()