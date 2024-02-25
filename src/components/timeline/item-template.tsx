import { GroupedData } from "../../types/transformed-data"
import { Card } from 'primereact/card'
import { Badge } from 'primereact/badge'
import { Tag } from 'primereact/tag'
import { Log } from "../../types/log"

const ItemTemplate = ({ item }: { item: GroupedData }) => {
  const { groupValue, items } = item

  return (
    <Card>
      <p className='mb-3'>
        <strong>{groupValue}</strong>
      </p>
      <ul className='flex flex-col gap-y-3'>
        {items && items.map((item: Log) => {
          const { id, title, categoryName } = item
          return (
            (
            <li key={id} className='flex items-baseline gap-x-2'>
              <Badge className='bg-black' />
              {title}
              <Tag value={categoryName} />
            </li>
          )
          )
        })}
      </ul>
    </Card>
  )
}

export default ItemTemplate