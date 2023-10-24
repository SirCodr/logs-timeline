const ItemTemplate = ({ item }) => {
  const { groupLabel, groupValue, items } = item
  return <div>
    <p>{groupValue}</p>
    {
      items.map((item, index) => (
        <p key={index}>
          {item.title}
        </p>
      ))
    }
    </div>
}
export default ItemTemplate
