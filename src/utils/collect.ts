import collect from "collect.js"
import { GroupedData } from "../types/transformed-data"

export function groupDataBy(data: Array<T>, groupKey: string): GroupedData[] {
  if (!data || !groupKey) return [{
    groupValue: '',
    groupLabel: '',
    items: []
  }]

  const dataGrouped = collect(data).groupBy(groupKey).all()

  const res = Array.from(Object.entries(dataGrouped)).map((itemGrouped) => {
    const key = itemGrouped[0]
    const items = itemGrouped[1]?.items

    return { groupLabel: groupKey, groupValue: key, items }
  })

  return res
}