import { Dropdown } from 'primereact/dropdown'
import { useLogStore } from '../../store/logs'
import SignOutButton from '../common/buttons/SignOut'
import { Avatar } from 'primereact/avatar'
import { Dialog } from 'primereact/dialog'
import useAuth from '../../hooks/use-auth'
import Button from '../common/buttons'
import { useState } from 'react'
import CreateLogForm from '../logs/create-form'

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { handleLogout } = useAuth()
  const [filterKey, setFilterKey] = useLogStore(state => [state.filterKey ,state.setFilterKey])

  return (
    <header className='flex justify-between'>
      <section>
        <Dropdown 
          value={filterKey}
          onChange={e => setFilterKey(e.value)}
          options={[
            { label: 'Fecha', value: 'date' },
            { label: 'Categoria', value: 'categoryName' }
          ]}
          optionLabel='label'
          placeholder='Filtrar por grupo'
          />
      </section>
      <section className='flex gap-x-2 h-8'>
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
