import { AutoComplete } from 'primereact/autocomplete'
import { Calendar } from 'primereact/calendar'
import { useEffect, useRef, useState } from 'react'
import UseLogForm from '../../../hooks/use-log-form'
import { useLogStore } from '../../../store/logs'
import Button from '../../common/buttons'
import useLogCategory from '../../../hooks/useLogCategory'
import PanelFooter from '../../autocomplete/panel-footer'
import { LogCategory } from '../../../types/log'

const CreateLogForm = ({ onCreated = () => {} }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const { createLogMutation, handleLogCreation, handleChange, handleDateChange, log } = UseLogForm(formRef)
  const logCategories = useLogStore((state) => state.logCategories)
  const [selectedCategory, setCategory] = useState<LogCategory | null>(null)
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

  useEffect(() => {
    handleChange({ name: 'category_id', value: selectedCategory ? selectedCategory.id : null })
  }, [selectedCategory])

  return (
    <form className='flex flex-col gap-y-3' ref={formRef}>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='title'>Título</label>
        <input
          id='title'
          name='title'
          onChange={(e) => handleChange(e.target)}
        />
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='category'>Categoría</label>
        <AutoComplete
          id='category'
          name='category'
          value={selectedCategory ? selectedCategory.name : null}
          suggestions={filteredLogCategories}
          completeMethod={search}
          onChange={(e) => setCategory(e.value)}
          panelFooterTemplate={
            <PanelFooter
              items={filteredLogCategories}
              selectedItem={selectedCategory}
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
          onChange={(e) => handleDateChange(e.target.value)}
          showIcon
        />
      </div>
      <Button
        type='button'
        label='Crear'
        onClick={() => handleLogCreation(onCreated)}
        loading={createLogMutation.isLoading}
        className='font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
      />
    </form>
  )
}

export default CreateLogForm