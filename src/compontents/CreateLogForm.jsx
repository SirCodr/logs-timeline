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

  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  const search = (event) => {
    let _filteredCountries

    if (!event.query.trim().length) {
      _filteredCountries = [...logCategories]
    } else {
      _filteredCountries = logCategories.filter((country) => {
        return country.name.toLowerCase().startsWith(event.query.toLowerCase())
      })
    }

    setFilteredCountries(_filteredCountries)
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
          value={selectedCountry}
          suggestions={filteredCountries}
          completeMethod={search}
          onChange={(e) => setSelectedCountry(e.value)}
          panelFooterTemplate={
            <PanelFooter
              items={filteredCountries}
              selectedItem={selectedCountry}
              onCreated={(newValue) => setSelectedCountry(newValue)}
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
