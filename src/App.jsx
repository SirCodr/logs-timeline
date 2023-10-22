import { Timeline } from 'primereact/timeline'
import { events } from './consts/data'
import { useEffect, useState } from 'react'
import ItemTemplate from './compontents/Timeline/ItemTemplate'
import { groupAndFilterData, groupDataBy } from './utils/collect'
import Header from './compontents/Header'
import { useSearchFilter } from './store/searchFilter'

function App() {
  const  currentFilters = useSearchFilter(state => state.currentFilters)
  const [data, setData] = useState([])

  useEffect(() => {
    if (currentFilters && currentFilters.title) {
      const dataFiltered = groupAndFilterData({
        data: events,
        groupBy: 'date',
        filterBy: 'title',
        filterValue: currentFilters.title
      })
      setData(dataFiltered)
    } else {
      setData(groupDataBy(events, 'date'))
    }
  }, [currentFilters])

  return (
    <main className='h-screen'>
      <div className=' flex flex-col gap-y-3 p-4'>
        <Header />
        <Timeline
          value={data}
          align='alternate'
          content={(item) => <ItemTemplate item={item} />}
          pt={{
            marker: { className: 'border-2 border-red-500' }
          }}
        />
      </div>
    </main>
  )
}

export default App
