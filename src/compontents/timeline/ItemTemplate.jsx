import { Card } from 'primereact/card'
import { Badge } from 'primereact/badge'

const ItemTemplate = ({ item }) => {
  const { groupLabel, groupValue, items } = item
  return (
    <Card>
      <p className='mb-3'>
        <strong>{groupValue}</strong>
      </p>
      <ul className='flex flex-col gap-y-3'>
        {items.map((item, index) => (
          <li key={index} className='flex items-baseline gap-x-2'>
            <Badge className='bg-black' />
            {item.title}
          </li>
        ))}
      </ul>
    </Card>
  )
}
export default ItemTemplate
