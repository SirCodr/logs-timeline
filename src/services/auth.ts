import { supabase } from "../supabase";
import { AuthError, OAuthResponse, Session } from "@supabase/supabase-js";

export async function signInWithGoogle(): Promise<OAuthResponse> {
  return await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
}

export async function logout(): Promise<{error: AuthError | null}> {
  return await supabase.auth.signOut()
}

export async function getUserSession(): Promise<Session | null>{
  const { data, error } = await supabase.auth.getSession()

  if (error) return null

  return data.session  
}