import Button from '../../common/buttons'
import useLogCategory from '../../../hooks/useLogCategory'
import { useEffect } from 'react'

function PanelFooter<T = unknown>({
  items = [], selectedItem, onCreated = () => { }
}: {
  items: T[]
  selectedItem: unknown
  onCreated: () => void
}) {
  const { handleChange, handleLogCategoryCreation, createLogCategoryMutation } = useLogCategory()
  const isItemSelected = items.some((item) => item['name'] === selectedItem)

  useEffect(() => {
    handleChange({ target: { value: selectedItem } })
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
          loading={createLogCategoryMutation.isLoading}
          onClick={() => handleLogCategoryCreation({ onSuccess: onCreated })} />
      )}
    </div>
  )
}

export default PanelFooter
