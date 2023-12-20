import { useRef, useState } from 'react'
import { useSearchFilter } from '../store/searchFilter'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Avatar } from 'primereact/avatar'
import CreateLogForm from './CreateLogForm'
import { logout } from '../services/auth'

const Header = () => {
  const addSearchFilter = useSearchFilter((state) => state.addSearchFilter)
  const [isModalOpen, setModalOpen] = useState(false)
  const titleInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    addSearchFilter('title', titleInputRef.current.value)
  }

  const handleLogout = async () => {
    await logout()
    location.reload()
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
      <section className='flex items-center gap-x-3'>
        <Button label='Nuevo' onClick={() => setModalOpen(true)} />
        <button onClick={handleLogout} title='Cerrar sesión'>
          <Avatar icon="pi pi-power-off" size="normal" shape="circle" />
        </button>
      </section>

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
