import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { DEFAULT_LOG_FILTER_KEY } from '../../consts/logs';
import { useLogStore } from '../../store/logs';
import { LogFilterKeyOption } from '../../types/log';

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
