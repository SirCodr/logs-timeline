import collect from "collect.js"
import { GroupedData } from "../types/transformed-data"

interface DataCollected<T> {
  items: T[]
}

export function groupDataBy<T>(data: Array<T>, groupKey: string): GroupedData<T>[] {
  if (!data || !groupKey) return [{
    groupValue: '',
    groupLabel: '',
    items: []
  }]
  
  const dataGrouped = collect<T>(data).sortByDesc('date').groupBy(groupKey).all() as DataCollected<T>[]

  const res = Array.from(Object.entries(dataGrouped)).map((itemGrouped) => {
    const key = itemGrouped[0]
    const items = itemGrouped[1]?.items

    return { groupLabel: groupKey, groupValue: key, items }
  })

  return res
}