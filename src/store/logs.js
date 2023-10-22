import { create } from 'zustand'

export const useLogStore = create((set) => ({
  logs: [],
  setLogs: (logs) =>
    set(() => ({logs})),
  addLogs: (newLog) =>
    set((state) => ({
      logs: [...state.logs, newLog]
    }))
}))
