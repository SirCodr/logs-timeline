import { useQuery } from "react-query"
import useAuth from "../../hooks/useAuth"
import HomePage from "../../pages/home"
import LoginPage from "../../pages/login"
import { setLocalStorageItem } from "../../utils/localStorage"
import { LOCAL_STORAGE_MAP } from "../../consts/localStorage"

const ProtectedRoute = () => {
  const { getUserSession } = useAuth()

  const { isLoading: userSessionLoading, error: userSessionError, data: userSession } = useQuery({
    queryKey: ['userSession'],
    queryFn: getUserSession,
    onSuccess: ({ session }) => setLocalStorageItem(LOCAL_STORAGE_MAP.USER_SESSION, session, { isObject: true })
  })

  if (userSessionLoading) return <span>Loading user session</span>

  if (!userSession || !userSession.session) return <LoginPage />

  return <HomePage />
}

export default ProtectedRoute