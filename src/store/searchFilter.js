import { create } from 'zustand'

export const useSearchFilter = create((set) => ({
  currentFilters: null,
  addSearchFilter: (label, value) =>
    set((state) => ({
      currentFilters: { ...state.currentFilters, [label]: value }
    }))
}))
