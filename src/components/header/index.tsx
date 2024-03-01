import { Dropdown } from 'primereact/dropdown'
import { useLogStore } from '../../store/logs'
import SignOutButton from '../common/buttons/SignOut'
import { Avatar } from 'primereact/avatar'
import useAuth from '../../hooks/use-auth'

const Header = () => {
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
      <section>
        <SignOutButton onClick={handleLogout} title='Cerrar sesión'>
          <Avatar icon="pi pi-power-off" size="normal" shape="circle" className='bg-red-primary hover:bg-red-700' />
        </SignOutButton>
      </section>
    </header>
  )
}

export default Header
