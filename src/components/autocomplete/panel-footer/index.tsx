import Button from '../../common/buttons'
import useLogCategory from '../../../hooks/useLogCategory'
import { useEffect } from 'react'
import { LogCategory } from '../../../types/log'

function PanelFooter({
  items = [], selectedItem, onCreated = () => { }
}: {
  items: LogCategory[]
  selectedItem: string
  onCreated: (item: LogCategory) => void
}) {
  const { handleChange, handleLogCategoryCreation, createLogCategoryAndFetchLast } = useLogCategory()
  const isItemSelected = items.some((item) =>  item.name === selectedItem)

  useEffect(() => {
    handleChange(selectedItem)
  }, [selectedItem])

  if (!items.length && !selectedItem) return <></>

  return (
    <div className='py-2 px-3'>
      {Boolean(items.length) && isItemSelected && (
        <span>
          <b>{selectedItem}</b> selected.
        </span>
      )}
      {Boolean(items.length) && !isItemSelected && 'Sin seleccionar'}

      {!items.length && selectedItem && Boolean(selectedItem.length) && (
        <Button
          type='button'
          label='Crear categoría'
          disabled={createLogCategoryAndFetchLast.isLoading}
          loading={createLogCategoryAndFetchLast.isLoading}
          onClick={() => handleLogCategoryCreation({ onSuccess: onCreated })} />
      )}
    </div>
  )
}

export default PanelFooter
