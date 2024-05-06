import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete'
import { Calendar } from 'primereact/calendar'
import { useEffect, useRef, useState } from 'react'
import UseLogForm from '../../../hooks/use-log-form'
import { useLogStore } from '../../../store/logs'
import Button from '../../common/buttons'
import useLogCategory from '../../../hooks/useLogCategory'
import PanelFooter from '../../autocomplete/panel-footer'
import { LogCategory } from '../../../types/log'
import { DateTime } from 'luxon'

const CreateLogForm = ({ onCreated = () => {} }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const { log, createLogMutation, handleLogCreation, handleChange, handleDateChange } = UseLogForm(formRef)
  const logCategories = useLogStore((state) => state.logCategories)
  const [selectedCategory, setCategory] = useState<string>('')
  const autocompleteRef = useRef<AutoComplete>(null)
  const { getAllUserLogCategories } = useLogCategory()

  const [filteredLogCategories, setFilteredLogCategories] = useState<LogCategory[]>([])

  const search = (event: AutoCompleteCompleteEvent) => {
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
        <input
          id='title'
          name='title'
          value={log.title}
          onChange={(e) => handleChange({ key: e.target.name, value: e.target.value })}
        />
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='category'>Categoría</label>
        <AutoComplete
          id='category'
          name='category'
          ref={autocompleteRef}
          value={selectedCategory}
          suggestions={filteredLogCategories}
          completeMethod={search}
          onChange={(e) => {
            if (e.originalEvent?.type !== 'change') return

            setCategory(e.value)
          }}
          onSelect={(e) => {
            const itemSelected: LogCategory = e.value
            setCategory(itemSelected.name)
            handleChange({ key: 'category_id', value: itemSelected.id })
          }}
          panelFooterTemplate={
            <PanelFooter
              items={filteredLogCategories}
              selectedItem={selectedCategory}
              onCreated={(newValue) => {
                 handleChange({ key: 'category_id', value: newValue.id })
                 autocompleteRef.current?.hide()
              }}
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
          value={DateTime.fromISO(log.date).toJSDate()}
          required
          onChange={(e) => handleDateChange(e.target.value ?? null)}
          showIcon
        />
      </div>
      <Button
        label='Crear'
        onClick={() => handleLogCreation(onCreated)}
        loading={createLogMutation.isLoading}
        className='font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
      />
    </form>
  )
}

export default CreateLogForm
