import { LOCAL_STORAGE_MAP } from "../consts/localStorage"
import { getLocalStorageItem } from "../utils/localStorage"

const handleRequest = async (callback = async () => {}) => {
  try {
    const userSession = getLocalStorageItem(LOCAL_STORAGE_MAP.USER_SESSION, { isObject: true })

    const response = await callback({ userSession })
    
    if (response.error) throw new Error(response.error.message)

    return response.data
  } catch (error) {
    console.error('Something failed on request: ', error)
    throw new Error(error)
  }
}

export default handleRequest