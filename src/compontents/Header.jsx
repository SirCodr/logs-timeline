import { useRef } from 'react'
import { useSearchFilter } from '../store/searchFilter'
import { Button } from 'primereact/button'

const Header = () => {
  const addSearchFilter = useSearchFilter(state => state.addSearchFilter)
  const titleInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    addSearchFilter('title', titleInputRef.current.value)
  }

  return (
    <form
      className='flex gap-x-2 px-2 py-3 border border-gray-400 rounded-md w-max'
      onSubmit={handleSubmit}
    >
      <input
        placeholder='Buscar por título'
        type='search'
        className='h-auto outline-none border-none'
        ref={titleInputRef}
      />
      <Button label='Buscar' />
    </form>
  )
}

export default Header
