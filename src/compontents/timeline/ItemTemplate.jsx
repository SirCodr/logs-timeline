import { Card } from 'primereact/card'
import { Badge } from 'primereact/badge'
import { Tag } from 'primereact/tag'

const ItemTemplate = ({ item }) => {
  const { groupLabel, groupValue, items } = item
  return (
    <Card>
      <p className='mb-3'>
        <strong>{groupValue}</strong>
      </p>
      <ul className='flex flex-col gap-y-3'>
        {items.map((item, index) => {
          const { id, title, category } = item
          return (
            (
            <li key={id} className='flex items-baseline gap-x-2'>
              <Badge className='bg-black' />
              {title}
              <Tag value={category.name} />
            </li>
          )
          )
        })}
      </ul>
    </Card>
  )
}
export default ItemTemplate
