import { useState } from 'react'
import { useLogStore } from '../store/logs'
import { useMutation } from 'react-query'
import { renderErrorToast } from '../utils/toast'
import { LogForServer } from '../types/log'
import { arePropsValid } from '../utils/schema'
import { DateTime } from "luxon"
import { insertLog } from '../services/logs'

const INITIAL_LOG:LogForServer = {
  title: '',
  date: '',
  category_id: '',
}

const UseLogForm = (ref: HTMLFormElement) => {
  const [log, setLog] = useState<LogForServer>(INITIAL_LOG)
  const [addToOriginalLog] = useLogStore((state) => [
    state.addToOriginalLog
  ])
  const createLogMutation = useMutation(insertLog)

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
        onError: (error: Error) => {
          renderErrorToast(error.message)
          console.error(error)
        }
      }
    )
  }

  function handleChange(event) {
    const { name, value } = event

    setLog((prevLog) => ({ ...prevLog, [name]: value }))
  }

  function handleDateChange (date) {
    setLog((prevLog) => ({ ...prevLog, date: DateTime.fromJSDate(date).toString() }))
  }

  function validateCreationLog() {
    return arePropsValid(log)
  }

  return { log, createLogMutation, handleLogCreation, handleChange, handleDateChange }
}

export default UseLogForm
