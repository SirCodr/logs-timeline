import { useRef, useState } from 'react'
import { useLogStore } from '../store/logs'

const CreateLogForm = ({ onCreated = () => {} }) => {
  const addLogs = useLogStore((state) => state.addLogs)
  const [log, setLog] = useState({})
  const formRef = useRef(null)

  const createNewLog = () => {
    addLogs(log)
    setLog({})
    formRef.current.reset()
    onCreated()
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
        <input type='text' id='date' name='date' onChange={handleChange} />
      </div>
      <button type='button' onClick={createNewLog}>
        Crear
      </button>
    </form>
  )
}

export default CreateLogForm
