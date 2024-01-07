import collect from 'collect.js'

export const groupDataBy = (data, param = '', tagLabel) => {
  if (!data) return []

  if (!param) return data

  const dataGrouped = collect(data).groupBy(param).all()

  return Array.from(Object.entries(dataGrouped)).map((itemGrouped) => {
    const key = itemGrouped[0]
    const items = itemGrouped[1].items.map(item => {
      const hasTagProperty = tagLabel && item[tagLabel]

      return {
        ...item,
        label: hasTagProperty ? tagLabel : null
      }
    })

    return { groupLabel: param, groupValue: key, items }
  })
}

export const groupAndFilterData = ({
  data,
  groupBy,
  filterBy,
  filterValue
}) => {
  const dataGrouped = collect(data)
    .filter((item) => item[filterBy] && item[filterBy].toLowerCase().includes(filterValue.toLowerCase()))
    .groupBy(groupBy)
    .all()

  return Array.from(Object.entries(dataGrouped)).map((itemGrouped) => {
    const key = itemGrouped[0]
    const items = itemGrouped[1].items

    return { groupLabel: groupBy, groupValue: key, items }
  })
}
