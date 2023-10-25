import { useQuery } from 'react-query'
import { fetchAllLogs } from './services/logs'
import { ProgressSpinner } from 'primereact/progressspinner'
import ProtectedRoute from './compontents/routes/ProtectedRoute'

function App() {
  const {
    isLoading: isLogsLoading,
    error: logsError,
    data: logsFetched
  } = useQuery({
    queryKey: ['logs'],
    queryFn: fetchAllLogs
  })

  if (isLogsLoading) return <ProgressSpinner className='w-12 h-12' />

  return <ProtectedRoute />
}

export default App
