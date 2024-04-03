import { Session } from "@supabase/supabase-js";
import { LOCAL_STORAGE_MAP } from "../consts/local-storage"
import { getLocalStorageItem } from "../utils/local-storage"
import { httpResponse } from "../types/http";

type AsyncFunction<T, U> = (args: U) => Promise<T>
type CallbackFunction = AsyncFunction<httpResponse, { userSession: Session }>;

async function handleRequest(callback: CallbackFunction) {
  try {
    const userSession = getLocalStorageItem(LOCAL_STORAGE_MAP.USER_SESSION, { isObject: true })

    const response = await callback({ userSession })

    if (response.error) throw new Error(response.error.message)

    return response
  } catch (error: unknown) {
    console.error('Something failed on request: ', error)
    throw error
  }
}

export default handleRequest