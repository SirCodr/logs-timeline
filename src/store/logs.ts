import { create } from 'zustand'
import { Log, LogCategory } from '../types/log'
import { GroupedData } from '../types/transformed-data'
import { devtools } from 'zustand/middleware'
import { DEFAULT_LOG_FILTER_KEY } from '../consts/logs'

interface LogSlice {
  originalLogs: Log[]
  transformedLogs: GroupedData<Log>[]
  logCategories: LogCategory[]
  filterKey: keyof Log
  setOriginalLogs: (logs: Log[]) => void
  setTransformedLogs: (logs: GroupedData<Log>[]) => void
  setLogCategories: (logs: LogCategory[]) => void
  setFilterKey: (key: keyof Log) => void
  addToOriginalLog: (log: Log) => void
  addLogCategory: (log: LogCategory) => void
}

export const useLogStore = create<LogSlice>()(devtools((set) => ({
  originalLogs: [],
  transformedLogs: [],
  logCategories: [],
  filterKey: DEFAULT_LOG_FILTER_KEY,
  setOriginalLogs: (logs) => set(() => ({ originalLogs: logs })),
  setTransformedLogs: (logs) => set(() => ({ transformedLogs: logs })),
  setLogCategories: (logCategories) => set(() => ({logCategories})),
  setFilterKey: (key) => set(() => ({ filterKey: key })),
  addToOriginalLog: (log) => set((state) => ({ originalLogs: [...state.originalLogs, log] })),
  addLogCategory: (newLogCategory) => set((state) => ({ logCategories: [...state.logCategories, newLogCategory] }))
})))