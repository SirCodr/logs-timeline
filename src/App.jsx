import { Timeline } from 'primereact/timeline'
import { useEffect, useState } from 'react'
import ItemTemplate from './compontents/Timeline/ItemTemplate'
import { groupAndFilterData, groupDataBy } from './utils/collect'
import Header from './compontents/Header'
import { useSearchFilter } from './store/searchFilter'
import { useLogStore } from './store/logs'
import { events } from './consts/data'
import EmptyResult from './compontents/EmptyResult'

function App() {
  const  currentFilters = useSearchFilter(state => state.currentFilters)
  const [logs, setLogs] = useLogStore(state => [state.logs, state.setLogs])
  const [data, setData] = useState([])

  useEffect(() => {
    setLogs([events])
  }, [])

  useEffect(() => {
    if (currentFilters && currentFilters.title) {
      const dataFiltered = groupAndFilterData({
        data: logs,
        groupBy: 'date',
        filterBy: 'title',
        filterValue: currentFilters.title
      })
      setData(dataFiltered)
    } else {
      setData(groupDataBy(logs, 'date'))
    }
  }, [logs, currentFilters])

  return (
    <main className='h-screen bg-gray-400'>
      <div className=' flex flex-col gap-y-3 p-4'>
        <Header />
        {
          data && data.length ? (
            <Timeline
          value={data}
          align='alternate'
          content={(item) => <ItemTemplate item={item} />}
          pt={{
            marker: { className: 'border-2 border-red-500' }
          }}
        />
          ) : <EmptyResult />
        }
      </div>
    </main>
  )
}

export default App
