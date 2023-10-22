import { Timeline } from 'primereact/timeline'
import { events } from './consts/data'
import { useEffect, useState } from 'react'
import ItemTemplate from './compontents/Timeline/ItemTemplate'
import { groupAndFilterData, groupDataBy } from './utils/collect';

function App() {
  const [data, setData] = useState([])
  const [titleFilter, setTitleFilter] = useState(null)

  const handleSubmit = (e) => {
    setTitleFilter(e.target.value)
  }

  useEffect(() => {
    if (titleFilter) {
      const dataFiltered = groupAndFilterData({
        data: events, groupBy: 'date', filterBy: 'title', filterValue: titleFilter
      })
      setData(dataFiltered)
    } else {
      setData(groupDataBy(events,'date'))
    }
  }, [titleFilter])

  return (
    <main className='h-screen'>
      <div className=' flex flex-col gap-y-3 p-4'>
        <input placeholder='Search' type='search' onChange={handleSubmit} />
        <Timeline
          value={data}
          align='alternate'
          content={item => <ItemTemplate item={item} />}
          pt={{
            marker: { className: 'border-2 border-red-500' }
          }}
        />
      </div>
    </main>
  )
}

export default App
