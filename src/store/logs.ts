import { create } from 'zustand'
import { Log } from '../types/log'
import { GroupedData } from '../types/transformed-data'

interface LogSlice {
  originalLogs: Log[]
  transformedLogs: GroupedData[]
  logCategories: Array<T>
  setOriginalLogs: (logs: Log[]) => void
  setTransformedLogs: (logs: GroupedData[]) => void
}

export const useLogStore = create<LogSlice>()((set) => ({
  originalLogs: [],
  transformedLogs: [],
  logCategories: [],
  setOriginalLogs: (logs) => set(() => ({ originalLogs: logs })),
  setTransformedLogs: (logs) => set(() => ({ transformedLogs: logs }))
}))