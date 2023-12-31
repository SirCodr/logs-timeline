import { useRef, useState } from 'react'
import { useSearchFilter } from '../store/searchFilter'
import { Dialog } from 'primereact/dialog'
import { Avatar } from 'primereact/avatar'
import CreateLogForm from './CreateLogForm'
import { logout } from '../services/auth'
import Button from './common/buttons'
import SignOutButton from './common/buttons/SignOut'

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
    <header className='flex justify-end'>
      <section className='flex items-center gap-x-3'>
        <Button label='Nuevo' onClick={() => setModalOpen(true)}/>
        <SignOutButton onClick={handleLogout} title='Cerrar sesión'>
          <Avatar icon="pi pi-power-off" size="normal" shape="circle" className='bg-red-primary hover:bg-red-700' />
        </SignOutButton>
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
