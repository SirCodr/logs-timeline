import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useLogStore = create(devtools((set) => ({
  logs: [],
  logCategories: [],
  setLogs: (logs) =>
    set(() => ({logs})),
  addLogs: (newLog) =>
    set((state) => ({
      logs: [...state.logs, newLog]
    })),
  setLogCategories: (logCategories) => set(() => ({logCategories})),
  addLogCategory: (newLogCategory) => set((state) => ({ logCategories: [...state.logCategories, newLogCategory] }))
}), 'LogStore'))