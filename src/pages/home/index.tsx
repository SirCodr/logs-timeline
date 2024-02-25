import { Timeline } from 'primereact/timeline'
import { useQuery } from 'react-query'
import useLog from '../../hooks/use-log'
import { useLogStore } from '../../store/logs'
import { groupDataBy } from '../../utils/collect'
import { GroupedData } from '../../types/transformed-data'
import ItemTemplate from '../../components/timeline/item-template'
import { useEffect } from 'react'

const Home = () => {
  const { getAllUserLogs } = useLog()

  const [originalLogs, transformedLogs, setOriginalLogs, setTransformedLogs, filterKey] = useLogStore((state) => [
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
    <Timeline
      value={transformedLogs}
      align='alternate'
      content={(item: GroupedData) => <ItemTemplate item={item} />}
      pt={{
        marker: { className: 'border-2 border-red-500' }
      }}
    />
  )
}

export default Home
