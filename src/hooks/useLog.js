import { useMemo, useRef, useState } from "react"
import { useLogStore } from "../store/logs"
import { useMutation, useQuery } from "react-query"
import { fetchAllLogsByUserId, insertLog } from "../services/logs"
import { renderErrorToast } from "../utils/toast"
import { DateTime } from "luxon"
import { arePropsValid } from "../utils/schema"
import { CREATE_LOG_SCHEMA } from "../schemas/logs"

const useLog = () => {
  const [addLogs, setLogs] = useLogStore((state) =>[ state.addLogs, state.setLogs])
  const [log, setLog] = useState({})
  const formRef = useRef(null)

  const AllUserLogsQuery = useQuery({
    queryKey: ['logs', 'all', 'user'],
    queryFn: fetchAllLogsByUserId,
    onSuccess: (data) => {
      setLogs(data)
    },
    enabled: false
  })
  const createLog = useMutation(insertLog)

  const getAllUserLogs = () => AllUserLogsQuery.refetch()

  const handleLogCreation = (onCreated = () => {}) => {
    if (!validateCreationLog()) return renderErrorToast('Invalid log data')

     createLog.mutate({
      ...log,
      date: DateTime.fromJSDate(log.date).toFormat('yyyy-LL-dd')
    }, {
      onSuccess: () => {
        addLogs(log)
        formRef.current.reset()
        onCreated()
      },
      onError: (error) => {
        renderErrorToast(error.message)
        console.error(error)
      }
    })
  }

  const validateCreationLog = () => arePropsValid(log, CREATE_LOG_SCHEMA)

  const handleChange = (e) => {
    const { name, value } = e.target

    setLog((prevLog) => ({ ...prevLog, [name]: value }))
  }

  const isLogCreating = useMemo(() => createLog.isLoading, [createLog.isLoading])

  const areAllLogsQuering = useMemo(() => AllUserLogsQuery.isLoading, [AllUserLogsQuery.isLoading])

  return (
    {
      handleLogCreation,
      getAllUserLogs,
      handleChange,
      isLogCreating,
      areAllLogsQuering,
      formRef
    }
  )
}

export default useLog