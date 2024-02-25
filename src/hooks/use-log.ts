import { fetchAllLogs, fetchAllLogsByUserId } from "../services/logs"
import { httpResponse } from "../types/http"
import { Log } from "../types/log"

const useLog = () => {
  async function getAllLogs(): Promise<Log[]> {
    try {
      const req = await fetchAllLogs()
      const res: httpResponse = req.data

      if (res.data) return res.data as Log[]

      return []
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener logs')
    }
  }

  async function getAllUserLogs(): Promise<Log[]> {
    try {
      const req = await fetchAllLogsByUserId()
      const res: httpResponse = req.data

      if (res.data) return res.data as Log[]

      return []
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener logs del usuario')
    }
  }

  return (
    {
      getAllLogs,
      getAllUserLogs
    }
  )
}

export default useLog