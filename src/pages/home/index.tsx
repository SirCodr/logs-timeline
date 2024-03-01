import { Timeline } from 'primereact/timeline'
import { useQuery } from 'react-query'
import useLog from '../../hooks/use-log'
import { useLogStore } from '../../store/logs'
import { groupDataBy } from '../../utils/collect'
import { GroupedData } from '../../types/transformed-data'
import ItemTemplate from '../../components/timeline/item-template'
import { useEffect } from 'react'
import Header from '../../components/header'

const HomePage = () => {
  const { getAllUserLogs } = useLog()

  const [
    originalLogs,
    transformedLogs,
    setOriginalLogs,
    setTransformedLogs,
    filterKey
  ] = useLogStore((state) => [
    state.originalLogs,
    state.transformedLogs,
    state.setOriginalLogs,
    state.setTransformedLogs,
    state.filterKey
  ])
  const logsQuery = useQuery({
    queryKey: ['logs', 'all', 'user'],
    queryFn: getAllUserLogs,
    onSuccess: (res) => {
      setOriginalLogs(res)
    }
  })

  useEffect(() => {
    if (originalLogs && originalLogs.length) {
      const transformedData = groupDataBy(originalLogs, filterKey)
      setTransformedLogs(transformedData)
    }
  }, [originalLogs, filterKey])

  if (logsQuery.isLoading) return 'loading'

  if (!transformedLogs.length) return 'no data'
  return (
    <main className='h-screen'>
      <div className='w-screen h-screen absolute inset-0 -z-10 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]'></div>
      </div>
      <div className='flex flex-col gap-y-3 p-4 w-full h-full'>
        <Header />
        <Timeline
          value={transformedLogs}
          align='alternate'
          content={(item: GroupedData) => <ItemTemplate item={item} />}
          pt={{
            marker: { className: 'border-2 border-red-500' }
          }}
        />
      </div>
    </main>
  )
}

export default HomePage
