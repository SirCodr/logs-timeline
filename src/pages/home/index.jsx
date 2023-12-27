import { Timeline } from 'primereact/timeline'
import { useEffect, useState } from 'react'
import ItemTemplate from '../../compontents/timeline/ItemTemplate'
import { groupAndFilterData, groupDataBy } from '../../utils/collect'
import Header from '../../compontents/Header'
import { useSearchFilter } from '../../store/searchFilter'
import { useLogStore } from '../../store/logs'
import EmptyResult from '../../compontents/EmptyResult'
import { ProgressSpinner } from 'primereact/progressspinner';
import useLog from '../../hooks/useLog'

function HomePage() {
  const { getAllUserLogs, areAllLogsQuering }  = useLog()
  const  currentFilters = useSearchFilter(state => state.currentFilters)
  const [logs] = useLogStore(state => [state.logs])
  const [data, setData] = useState([])

  useEffect(() => {
    getAllUserLogs()
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

  if (areAllLogsQuering) return <ProgressSpinner className='w-12 h-12' />

  return (
    <main className='h-screen'>
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

export default HomePage
