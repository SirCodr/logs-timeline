import { useRef, useState } from 'react'
import { useSearchFilter } from '../store/searchFilter'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import CreateLogForm from './CreateLogForm'

const Header = () => {
  const addSearchFilter = useSearchFilter((state) => state.addSearchFilter)
  const [isModalOpen, setModalOpen] = useState(false)
  const titleInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    addSearchFilter('title', titleInputRef.current.value)
  }

  return (
    <header className='flex justify-between'>
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
      <Button label='Nuevo' onClick={() => setModalOpen(true)} />

      <Dialog
        header='Nuevo registro'
        visible={isModalOpen}
        onHide={() => setModalOpen(false)}
        draggable={false}
      >
        <CreateLogForm onCreated={() => setModalOpen(false)} />
      </Dialog>
    </header>
  )
}

export default Header
