import { useQuery } from "react-query";
import HomePage from "../../pages/home";
import LoginPage from "../../pages/login"
import { getUserSession } from "../../services/auth"
import { setLocalStorageItem } from "../../utils/local-storage";
import { LOCAL_STORAGE_MAP } from "../../consts/local-storage";

const ProtectedRoute = () => {
  const { isLoading: userSessionLoading, data: userSession } = useQuery({
    queryKey: ['userSession'],
    queryFn: getUserSession,
    onSuccess: (session) => setLocalStorageItem(LOCAL_STORAGE_MAP.USER_SESSION, session, { isObject: true })
  })

  if (userSessionLoading) return <span>Loading user session</span>

  if (!userSession) return <LoginPage />

  return <HomePage />
}

export default ProtectedRoute