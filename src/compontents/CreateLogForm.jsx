import { useRef, useState } from 'react'
import { useLogStore } from '../store/logs'
import { useMutation } from 'react-query'
import { insertLog } from '../services/logs'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { DateTime } from 'luxon'

const CreateLogForm = ({ onCreated = () => {} }) => {
  const addLogs = useLogStore((state) => state.addLogs)
  const [log, setLog] = useState({})
  const formRef = useRef(null)

  const insertLoginMutation = useMutation(insertLog, {
    onSuccess: (data, variables) => {
      addLogs(variables)
      setLog({})
      formRef.current.reset()
      onCreated()
    }
  })

  const handleLogCreation = () => {
    insertLoginMutation.mutate({
      ...log,
      date: DateTime.fromJSDate(log.date).toFormat('yyyy-LL-dd')
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setLog((prevLog) => ({ ...prevLog, [name]: value }))
  }

  return (
    <form className='flex flex-col gap-y-3' ref={formRef}>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='title'>Título</label>
        <input type='text' id='title' name='title' onChange={handleChange} />
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='category'>Categoría</label>
        <input
          type='text'
          id='category'
          name='category'
          onChange={handleChange}
        />
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='date'>Fecha</label>
        <Calendar id='date' name='date' onChange={handleChange} showIcon />
      </div>
      <Button type='button' label='Crear' onClick={handleLogCreation} loading={insertLoginMutation.isLoading}/>
    </form>
  )
}

export default CreateLogForm
