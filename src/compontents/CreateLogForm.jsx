import { AutoComplete } from 'primereact/autocomplete'
import { Calendar } from 'primereact/calendar'
import useLog from '../hooks/useLog'
import { useEffect, useState } from 'react'
import PanelFooter from './inputs/autocomplete/PanelFooter'
import useLogCategory from '../hooks/useLogCategory'
import { useLogStore } from '../store/logs'
import Button from './common/buttons'

const CreateLogForm = ({ onCreated = () => {} }) => {
  const { handleLogCreation, handleChange, handleDateChange, isLogCreating, formRef, log } =
    useLog()
  const logCategories = useLogStore((state) => state.logCategories)
  const { getAllUserLogCategories } = useLogCategory()

  const [filteredLogCategories, setFilteredLogCategories] = useState([])

  const search = (event) => {
    let filteredItems

    if (!event.query.trim().length) {
      filteredItems = [...logCategories]
    } else {
      filteredItems = logCategories.filter((country) => {
        return country.name.toLowerCase().startsWith(event.query.toLowerCase())
      })
    }

    setFilteredLogCategories(filteredItems)
  }

  useEffect(() => {
    if (!logCategories || !logCategories.length) {
      getAllUserLogCategories()
    }
  }, [])

  return (
    <form className='flex flex-col gap-y-3' ref={formRef}>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='title'>Título</label>
        <input id='title' name='title' onChange={(e) => handleChange(e.target)} />
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='category'>Categoría</label>
        <AutoComplete
          id='category'
          name='category'
          value={log.category}
          suggestions={filteredLogCategories}
          completeMethod={search}
          onChange={(e) => handleChange(e.target)}
          panelFooterTemplate={
            <PanelFooter
              items={filteredLogCategories}
              selectedItem={log.category}
              onCreated={(newValue) => handleChange({ name: 'category', value: newValue })}
            />
          }
          showEmptyMessage
          emptyMessage='Sin resultados'
          field='name'
          dropdown
        />
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='date'>Fecha</label>
        <Calendar
          id='date'
          name='date'
          required
          onChange={e => handleDateChange(e.target.value)}
          showIcon
        />
      </div>
      <Button 
        type='button'
        label='Crear'
        onClick={() => handleLogCreation(onCreated)}
        loading={isLogCreating}
        className='font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
      />
    </form>
  )
}

export default CreateLogForm
