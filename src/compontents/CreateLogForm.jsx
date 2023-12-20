import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import useLog from '../hooks/useLog'

const CreateLogForm = ({ onCreated = () => {} }) => {
  const { handleLogCreation, handleChange, isLogCreating, formRef } =
    useLog()

  return (
    <form className='flex flex-col gap-y-3' ref={formRef}>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='title'>Título</label>
        <InputText
          id='title'
          name='title'
          onChange={handleChange}
          className='border border-black'
        />
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='category'>Categoría</label>
        <input
          type='text'
          id='category'
          name='category'
          onChange={handleChange}
          className='border border-black'
        />
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='date'>Fecha</label>
        <Calendar
          id='date'
          name='date'
          required
          onChange={handleChange}
          className='border border-black'
          showIcon
        />
      </div>
      <Button
        type='button'
        label='Crear'
        onClick={() => handleLogCreation(onCreated)}
        loading={isLogCreating}
      />
    </form>
  )
}

export default CreateLogForm
