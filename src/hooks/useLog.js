import { useMemo, useRef, useState } from "react"
import { useLogStore } from "../store/logs"
import { useMutation } from "react-query"
import { insertLog } from "../services/logs"
import { renderErrorToast } from "../utils/toast"
import { DateTime } from "luxon"

const useLog = () => {
  const addLogs = useLogStore((state) => state.addLogs)
  const [log, setLog] = useState({})
  const formRef = useRef(null)

  const createLog = useMutation(insertLog)

  const handleLogCreation = (onCreated = () => {}) => {
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
      }
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setLog((prevLog) => ({ ...prevLog, [name]: value }))
  }

  const isLogCreating = useMemo(() => createLog.isLoading, [createLog.isLoading])

  return (
    {
      handleLogCreation,
      handleChange,
      isLogCreating,
      formRef
    }
  )
}

export default useLog