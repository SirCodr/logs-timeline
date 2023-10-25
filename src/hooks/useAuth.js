import { supabase } from "../supabaseClient"

const useAuth = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    location.reload()
  }

  const getUserSession = async () => {
    const res = await supabase.auth.getSession()
    return res.data
  }

  return (
    { handleSignOut, getUserSession }
  )
}

export default useAuth
