const ItemTemplate = ({ item }) => {
  const { groupLabel, groupValue, items } = item
  return <div>
    <p>{groupValue}</p>
    {
      items.map(item => (
        <p key={item.title}>
          {item.title}
        </p>
      ))
    }
    </div>
}
export default ItemTemplate
