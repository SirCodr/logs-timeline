import { RefObject, useState } from 'react'
import { useLogStore } from '../store/logs'
import { useMutation } from 'react-query'
import { renderErrorToast } from '../utils/toast'
import { Log, LogForServer } from '../types/log'
import { DateTime } from "luxon"
import { insertLog } from '../services/logs'

const INITIAL_LOG:LogForServer = {
  title: '',
  date: DateTime.now().toISO(),
  category_id: '',
}

const UseLogForm = (ref: RefObject<HTMLFormElement>) => {
  const [log, setLog] = useState<LogForServer>(INITIAL_LOG)
  const [addToOriginalLog] = useLogStore((state) => [
    state.addToOriginalLog
  ])
  const createLogMutation = useMutation(insertLog<Log>)

  function handleLogCreation(onCreated = () => {}) {
    if (!validateCreationLog()) return renderErrorToast('Invalid log data')

    createLogMutation.mutate(log,
      {
        onSuccess: (res) => {
          const { data } = res
          addToOriginalLog(data[0])
          ref.current!.reset()
          onCreated()
        },
        onError: (error) => {
          renderErrorToast(error as string)
          console.error(error)
        }
      }
    )
  }

  function handleChange({ key, value}: { key: string, value: unknown}) {
    setLog((prevLog) => ({ ...prevLog, [key]: value }))
  }

  function handleDateChange (date: Date | null) {
    setLog((prevLog) => ({ ...prevLog, date: date ? DateTime.fromJSDate(date).toString() : 'null' }))
  }

  function validateCreationLog() {
    return true
  }

  return { log, createLogMutation, handleLogCreation, handleChange, handleDateChange }
}

export default UseLogForm
