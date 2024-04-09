export interface GroupedData<T = unknown> {
  groupLabel: string
  groupValue: string
  items: T[]
}