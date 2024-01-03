import { Timeline } from 'primereact/timeline'
import { useEffect, useState } from 'react'
import ItemTemplate from '../../compontents/timeline/ItemTemplate'
import { groupDataBy } from '../../utils/collect'
import Header from '../../compontents/Header'
import { useLogStore } from '../../store/logs'
import { ProgressSpinner } from 'primereact/progressspinner';
import useLog from '../../hooks/useLog'
import EmptyState from '../../compontents/states/empty'
import { formatDate } from '../../utils/date'

function HomePage() {
  const { getAllUserLogs, areAllLogsQuering }  = useLog()
  const [logs] = useLogStore(state => [state.logs])
  const [data, setData] = useState([])

  useEffect(() => {
    getAllUserLogs()
  }, [])

  useEffect(() => {
    const logsTransformed = logs.map(log => ({...log, date: formatDate(log.date)}))
    setData(groupDataBy(logsTransformed, 'date'))
  }, [logs])

  if (areAllLogsQuering) return <ProgressSpinner className='w-12 h-12' />

  return (
    <main className='h-screen'>
      <div className='w-screen h-screen absolute inset-0 -z-10 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]'></div>
      </div>
      <div className=' flex flex-col gap-y-3 p-4 w-full h-full'>
        <Header />
        {data && data.length ? (
          <Timeline
            value={data}
            align='alternate'
            content={(item) => <ItemTemplate item={item} />}
            pt={{
              marker: { className: 'border-2 border-red-500' }
            }}
          />
        ) : (
          <div className='w-full h-full grid place-items-center'>
            <EmptyState />
          </div>
        )}
      </div>
    </main>
  )
}

export default HomePage
