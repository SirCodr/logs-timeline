import { LOCAL_STORAGE_MAP } from "../consts/localStorage"
import { getLocalStorageItem } from "../utils/localStorage"

const handleRequest = async (callback = async () => {}) => {
  try {
    const userSession = getLocalStorageItem(LOCAL_STORAGE_MAP.USER_SESSION, { isObject: true })

    return await callback({ userSession })
  } catch (error) {
    console.error('Something failed on request: ', error)
  }
}

export default handleRequest