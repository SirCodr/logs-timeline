import { logout, signInWithGoogle } from "../services/auth"

const useAuth = () => {
  async function handleSignIn(): Promise<void> {
    const { data } = await signInWithGoogle()
    
    if (data.url)location.assign(data.url)
  }

  async function handleLogout(): Promise<void> {
    const { error } = await logout()
    
    if (!error) location.reload()
  }

  return (
    { handleSignIn, handleLogout }
  )
}

export default useAuth
