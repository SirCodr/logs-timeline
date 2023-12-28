import { Button } from 'primereact/button'
import { AutoComplete } from 'primereact/autocomplete'
import { Calendar } from 'primereact/calendar'
import useLog from '../hooks/useLog'
import { useEffect, useState } from 'react'
import PanelFooter from './inputs/autocomplete/PanelFooter'
import useLogCategory from '../hooks/useLogCategory'
import { useLogStore } from '../store/logs'

const CreateLogForm = ({ onCreated = () => {} }) => {
  const { handleLogCreation, handleChange, isLogCreating, formRef } =
    useLog()
  const logCategories = useLogStore((state) => state.logCategories)
  const { getAllUserLogCategories } = useLogCategory()

  const [filteredLogCategories, setFilteredLogCategories] = useState([])
  const [selectedLogCategory, setSelectedLogCategory] = useState(null)

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
        <input id='title' name='title' onChange={handleChange} />
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='category'>Categoría</label>
        <AutoComplete
          value={selectedLogCategory}
          suggestions={filteredLogCategories}
          completeMethod={search}
          onChange={(e) => setSelectedLogCategory(e.value)}
          panelFooterTemplate={
            <PanelFooter
              items={filteredLogCategories}
              selectedItem={selectedLogCategory}
              onCreated={(newValue) => setSelectedLogCategory(newValue)}
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
          onChange={handleChange}
          showIcon
        />
      </div>
      <Button
        type='button'
        label='Crear'
        onClick={() => handleLogCreation(onCreated)}
        loading={isLogCreating}
        className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
      />
    </form>
  )
}

export default CreateLogForm
