const ItemTemplate = ({ item, showCategory }) => {
  const { title, category, date } = item
  return <div>
    <p>{title}</p>
    {showCategory && <small>{category}</small>}
    </div>
}
export default ItemTemplate
