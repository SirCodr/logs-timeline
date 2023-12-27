import { Button } from "primereact/button"
import useLogCategory from "../../../hooks/useLogCategory"
import { useEffect } from "react"

const PanelFooter = ({items = [], selectedItem, onCreated = () => {}}) => {
  const { handleChange, handleLogCategoryCreation, isLogCategoryCreating } = useLogCategory()
  const isItemSelected = (items).some(
    (item) => item['name'] === selectedItem
  )

  useEffect(() => {
    handleChange({ target: { value: selectedItem } })
  }, [selectedItem])

  return (
    <div className='py-2 px-3'>
      {Boolean(items.length) && isItemSelected && (
        <span>
          <b>{selectedItem}</b> selected.
        </span>
      )}
      {Boolean(items.length) &&
        !isItemSelected &&
        'Aún no has seleccionado.'}
      {!items.length && !isItemSelected && (
        <Button 
          type='button'
          label='Crear nuevo'
          loading={isLogCategoryCreating}
          onClick={() => handleLogCategoryCreation({ onSuccess: onCreated })}
        />
      )}
    </div>
  )
}

export default PanelFooter
