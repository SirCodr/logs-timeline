import { useQuery } from "react-query"
import { fetchAllLogs, fetchAllLogsByUserId } from "../services/logs"
import { httpResponse } from "../types/http"
import { Log } from "../types/log"
import { useLogStore } from "../store/logs"

const useLog = () => {
  const [
    setOriginalLogs,
  ] = useLogStore((state) => [
    state.setOriginalLogs,
  ])

  const logsQuery = useQuery({
    queryKey: ['logs', 'all', 'user'],
    queryFn: fetchAllLogsByUserId,
    enabled: false,
    onSuccess: (data: httpResponse) => {
      if (data) {
        setOriginalLogs(data.data as Log[])
      }
    }
  })

  async function getAllLogs(): Promise<Log[]> {
    try {
      const req = await fetchAllLogs<Log>()
      const res = req.data

      if (res) return res

      return []
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener logs')
    }
  }

  async function getAllUserLogs(): Promise<void> {
    try {
      await logsQuery.refetch()
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener logs del usuario')
    }
  }

  return (
    {
      logsQuery,
      getAllLogs,
      getAllUserLogs
    }
  )
}

export default useLog