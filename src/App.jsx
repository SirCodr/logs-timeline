import { Timeline } from 'primereact/timeline'
import { events } from './consts/data'
import { useEffect, useState } from 'react'
import ItemTemplate from './compontents/Timeline/ItemTemplate'

function App() {
  const [data, setData] = useState(events)
  const [titleFilter, setTitleFilter] = useState(null)

  const handleSubmit = (e) => {
    setTitleFilter(e.target.value)
  }

  useEffect(() => {
    if (titleFilter) {
      const dataFiltered = data.filter(item => item.status.toLocaleLowerCase().includes(titleFilter))
      setData(dataFiltered)
    } else {
      setData(events)
    }
  }, [titleFilter])

  return (
    <main className='h-screen'>
      <div className=' flex flex-col gap-y-3 p-4'>
        <input placeholder='Search' type='search' onChange={handleSubmit} />
        <Timeline
          value={data}
          align='alternate'
          content={item => <ItemTemplate item={item} showCategory={true} />}
          pt={{
            marker: { className: 'border-2 border-red-500' }
          }}
        />
      </div>
    </main>
  )
}

export default App
