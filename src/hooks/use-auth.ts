import { AuthError } from "@supabase/supabase-js"
import { logout, signInWithGoogle } from "../services/auth"

const useAuth = () => {
  async function handleSignIn(): Promise<void> {
    const { data } = await signInWithGoogle()
    
    if (data.url)location.assign(data.url)
  }

  async function handleLogout(): Promise<AuthError | null> {
    const { error } = await logout()
    return error
  }

  return (
    { handleSignIn, handleLogout }
  )
}

export default useAuth
