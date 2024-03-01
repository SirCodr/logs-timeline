import { Dropdown } from 'primereact/dropdown';
import { useLogStore } from '../../store/logs';

const Header = () => {
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
    </header>
  )
}

export default Header
