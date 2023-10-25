import { useRef, useState } from 'react'
import { useLogStore } from '../store/logs'
import { useMutation } from 'react-query'
import { insertLog } from '../services/logs'
import { Button } from 'primereact/button'

const CreateLogForm = ({ onCreated = () => {} }) => {
  const addLogs = useLogStore((state) => state.addLogs)
  const [log, setLog] = useState({})
  const formRef = useRef(null)

  const insertLoginMutation = useMutation(insertLog, {
    onSuccess: (data, variables, context) => {
      addLogs(variables)
      setLog({})
      formRef.current.reset()
      onCreated()
    }
  })

  const createNewLog = () => insertLoginMutation.mutate(log)

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
        <input type='text' id='date' name='date' onChange={handleChange} />
      </div>
      <Button label='Crear' onClick={createNewLog} loading={insertLoginMutation.isLoading}/>
    </form>
  )
}

export default CreateLogForm
