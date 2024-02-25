import { create } from 'zustand'
import { Log, LogFilterKeyOption } from '../types/log'
import { GroupedData } from '../types/transformed-data'
import { devtools } from 'zustand/middleware'
import { DEFAULT_LOG_FILTER_KEY } from '../consts/logs'

interface LogSlice {
  originalLogs: Log[]
  transformedLogs: GroupedData[]
  logCategories: Array<T>,
  filterKey: LogFilterKeyOption,
  setOriginalLogs: (logs: Log[]) => void
  setTransformedLogs: (logs: GroupedData[]) => void
  setFilterKey: (key: LogFilterKeyOption) => void
}

export const useLogStore = create<LogSlice>()(devtools((set) => ({
  originalLogs: [],
  transformedLogs: [],
  logCategories: [],
  filterKey: DEFAULT_LOG_FILTER_KEY,
  setOriginalLogs: (logs) => set(() => ({ originalLogs: logs })),
  setTransformedLogs: (logs) => set(() => ({ transformedLogs: logs })),
  setFilterKey: (key) => set(() => ({ filterKey: key }))
})))